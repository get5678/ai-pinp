import React from "react";
import { useHistory } from "react-router-dom";

import { upload } from '../../api';

import './index.scss'


// 可跳转的组件
const LinkToRoute = (props) => {

    const {iconLink, handleToClick, imgURL, iconText, color, size = 'normal', style} = props;

    const history = useHistory();

    const chooseSize = size => {

        let px = 4.6;

        switch(size) {
            case 'normal':
                break;
            case 'large':
                px = 5.8;
                break;
            case 'small':
                px = 2.8;
                break;
            default:
                break;
        }
        return px;
    }

    const handleToLink = () => {
        if (iconLink) {
            history.push(iconLink);
        }

        if (typeof (handleToClick) === 'function') {
            handleToClick();
        }
    }

    const num = chooseSize(size);


    const imgStyle = {
        width: `${num}rem`,
        height: `${num}rem`,
        bottom: `${num}rem`,
        position: 'absolute',
        filter: `drop-shadow(0 ${num}rem 0 ${color})`
    }

    const iconWrapStyle = {
        width: `${num}rem`,
        height: `${num}rem`,
        position: 'relative',
        overflow: 'hidden'
    }

    const containerStyle = {
        width: `${num + 2.6}rem`,
        // height: `${num + 2.4}rem`,
        ...style
    }

    return (
        <div className="icon-container" onClick={handleToLink} style={containerStyle}>
            <div style={iconWrapStyle}>
                <img src={imgURL} alt={iconText} style={imgStyle} />
            </div>
            {iconText && <p style={{color: color, marginTop: '0.8rem'}}>{iconText}</p>}
        </div>
    )
}

 // 可拉起相册组件 image为图片，video 为视频
 const PullCamera = (props) => {

    const { 
        fileType,
        imgURL,
        color,
        size,
        iconText, 
        multiple = false, 
        maxWidth = 400,
        maxHeight = 400,
        inputfileType = 'blob',
        imageType ='image/png',
        iconLink,
        handleToClick
    } = props;

    const acceptType = fileType.includes('image') ? 'image/png, image/jpeg, image/gif, image/jpg' : 'video/*';
    const history = useHistory();

    // 压缩
    const compress = res => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = (e) => {
                let originWidth = e.target.width;
                let originHeight = e.target.height;

                let targetWidth = originWidth, targetHeight = originHeight;
                // 图片尺寸超过400x400的限制

                if (originWidth > maxWidth || originHeight > maxHeight) {
                    if (originWidth / originHeight > maxWidth / maxHeight) {
                        // 更宽，按照宽度限定尺寸
                        targetWidth = maxWidth;
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                    } else {
                        targetHeight = maxHeight;
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                    }
                }

                // 这里压缩
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');

                // canvas对图片进行缩放
                canvas.width = targetWidth;
                canvas.height = targetHeight;

                // 清除画布
                context.clearRect(0, 0, targetWidth, targetHeight);
                // 图片压缩
                context.drawImage(img, 0, 0, targetWidth, targetHeight);

                if (inputfileType === 'base64') {
                    const dataUrl = canvas.toDataURL(imageType);
                    resolve(dataUrl);
                } else {
                    // ios不支持tob
                    if (canvas.toBlob) {
                        canvas.toBlob(blob => {
                            resolve(blob);
                        }, imageType);
                    }else {
                        let data = canvas.toDataURL(imageType);
                        data = data.split(',')[1];
                        data = window.atob(data);
                        let ia = new Uint8Array(data.length);
                        for (let i = 0; i < data.length; i++) {
                            ia[i] = data.charCodeAt(i);
                        }
                        //canvas.toDataURL 返回的默认格式就是 image/png
                        let blob = new Blob([ia], {
                            type: imageType
                        });
                        resolve(blob);
                    }
                }

            }

            img.onerror = () => {
                reject(new Error('图片加载失败'));
            }
            img.src = res;
        })
    }


    const handleToChange = async(e) => {
        let files = e.target.files;
        const len = files.length;

        let key = multiple ? 'splice' : 'beautify';


        let newFiles = [];

        let fd = new FormData();

        fd.append('file', files[0])

        let test = files[0];
        let name = test.name;

        // console.log('test', test)
        let image = '';

        upload(fd)
        .then(res => {
            console.log('icon', res);
            image = res;
        })
        .catch(err => console.log('icon-err', err))

        const testUrl = 'https://longrou.oss-cn-chengdu.aliyuncs.com/aipin.png';

        // for (let i = 0; i < len; i++) {
        //     const res = await fileReader(files[i]);
        //     const data = await compress(res);
        //     console.log('data', data)
        //     newFiles.push(res);
        //     try {
        //         localStorage.setItem(key+i, res);
        //     }catch (err) {
        //         console.error(err);
        //     }
        // }

        iconLink && history.push(`${iconLink}?imageUrl=${testUrl}`);
        
    }

    return (
        <div className="icon-pullcamera">
            <LinkToRoute  
                imgURL={imgURL}
                iconText={iconText}
                color={color}
                size={size}
                handleToClick={handleToClick}
            />
            <input 
                type="file"
                accept={acceptType}
                multiple={multiple}
                className="icon-input"
                onChange={handleToChange}
            />
        </div>
    )
}

function Icon(props) {
    const { 
        imgURL, 
        iconText, 
        color = "#fff", 
        size,
        style,
        iconLink, 
        handleToClick, 
        fileType = undefined 
    } = props;
    
    return (
        <>
        {fileType ?
            <PullCamera 
                fileType={fileType}
                iconLink={iconLink}
                imgURL={imgURL}
                handleToClick={handleToClick}
                iconText={iconText}
                color={color}
                style={style}
            />
            :
            <LinkToRoute  
                imgURL={imgURL}
                color={color}
                iconLink={iconLink}
                handleToClick={handleToClick}
                iconText={iconText}
                size={size}
                style={style}
            />
            
        }
        </>
    )
}

export default Icon;