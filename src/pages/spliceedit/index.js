import React, { useCallback, useEffect, useRef, useState } from 'react';

import SparkMD5 from 'spark-md5'
import  Modal  from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';

import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';


import { fileReader, UrlParmas, base64ToFile } from '../../utils';
import { IMAGE_ARROW, IMAGE_BACK, IMAGE_MODULE, IMAGE_PHOTO, IMAGE_SUBMIT } from './public';

import { upload } from '../../api';

import './index.scss'
import ArrowBack from '../../components/ArrowBack';
import MyButton from '../../components/MyButton';
import Icon from '../../components/Icon';

// import Toast from '../../components/Toast';

const MyAlert = Modal.alert;

// 用于修改canvas的宽高
const CanvasWidth = 400;
const CanvasHeight = 640;

const barList = [
    {
        text: '换模版',
        img: IMAGE_MODULE
    },
    {
        text: '换照片',
        img: IMAGE_PHOTO
    },
    {
        text: '换背景',
        img: IMAGE_BACK
    },
    {
        text: '保存',
        img: IMAGE_SUBMIT
    },
]




function Spliceedit(props) {

    // 保存已下载的图片
    const [saveImgs, setSaveImgs] = useState([]);

    // 保存上传到社区的图片
    const [onlineImgs, setOnLineImgs] = useState([]);

    const [windowSize, setWindowSize] = useState(null);

    const canvasRef = useRef(null);
   
    const fileType = 'blob';
    const imageType ='image/png';

     //  下载到本地
    const download = (name, imgUrl, imageType = 'image/png') => {

        let local = localStorage.getItem('localImage') || '';

        let a = document.createElement('a');
        a.style.display = 'none';
        a.download = name;
        a.href = imgUrl;
        a.dataset.downloadurl = [imageType, a.download, a.href].join(':');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        if (!(local && local.includes(name))) {
            localStorage.setItem('localImage', local += `${name},`)
        }
    }

   
    // 上传到服务器
    const shareSocity = useCallback((file) => {
        let fd = new FormData();

        if (Object.prototype.toString.call(file) === '[object Blob]') {
            file = new File(file)
        }

        fd.append('file', file);

        // 如果已经存在，就返回。秒传
        for (let i = 0; i < onlineImgs.length; i++) {
            let img = onlineImgs[i];

            if (img.name === file.name) {
                Toast.info('上传成功');
                return;
            }
        }

        

        upload(fd).then(res => {
            setOnLineImgs(pre => pre.concat({
                name: file?.name,
                url: res.url
            }));
            Toast.info('上传成功');
        })
        .catch(err => console.log('spliceedit--error', err));

    }, [onlineImgs])

    // 获取图片的缩小宽高
    const getOriginWidth = (src, maxWidth, maxHeight) => {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = (e) => {
                let originWidth = e.target.width;
                let originHeight = e.target.height;
        
                let targetWidth = originWidth, targetHeight = originHeight;
    
                targetWidth = originWidth > maxWidth ? maxWidth : Math.floor((maxHeight * originWidth) / originHeight);
                targetHeight = originHeight > maxHeight ? maxHeight : Math.floor((originHeight * maxWidth) / originWidth);

                img.width = `${targetWidth}px`;
                img.height = `${targetHeight}px`;
    
                resolve({
                    img,
                    src,
                    targetHeight,
                    targetWidth
                })
            }
    
            img.onerror = () => {
                reject(new Error('图片加载失败'));
            }
            img.src = src;
        })
    }

    // 默认拼图
    const draw = async(imgsrc, gap = 2) => {

        if (!imgsrc) return;

        const maxWidth = CanvasWidth;
        const maxHeight = imgsrc &&  Math.floor(CanvasHeight/imgsrc.length);

        let canvas = canvasRef.current;
        let context = canvas.getContext('2d');

        let initHeight = 0;
        let initWidth = 0;

        context.clearRect(0, 0, CanvasWidth, CanvasHeight);
       
        for (let i = 0; i < imgsrc.length; i++) {
            let obj = await getOriginWidth(imgsrc[i], maxWidth, maxHeight);
            context.drawImage(obj.img, initWidth, initHeight, obj.targetWidth, obj.targetHeight);
            initHeight += obj.targetHeight + gap;
        }
    }

    // 将本地图片绘制到canvas
    const drawImageToCanvas = async(imgs, type) => {
        if (!imgs) return;

        const imgSrc = [];

        for (let i = 0; i < imgs.length; i++) {
            let src = await fileReader(imgs[i]);
            imgSrc.push(src);
        };

        switch(type) {
            case 'seamless':
                draw(imgSrc, 0);
                break;
            case 'column':
                console.log('column');
                break;
            case 'row':
                console.log('row');
                break;
            default:
                draw(imgSrc);
                break;
        }

    }

    // 保存图片并压缩
    const compress = useCallback(() => {
       
        let canvas = canvasRef.current;
        if (!canvas) return null;

        // base64编码获取文件链接
        let imgUrl = canvas.toDataURL(imageType);
        let namemd5 = SparkMD5.hash(imgUrl);

        let file = base64ToFile(imgUrl, `${namemd5}.png`)
        
        let local = localStorage.getItem('localImage') || null;

        // 已保存
        if ((local && local.includes(namemd5)) || saveImgs.indexOf(namemd5) !== -1) {

            MyAlert('已保存到本地', '是否重复保存?', [
                { text: '取消' },
                { text: '确定', onPress: () => {
                    download(namemd5, imgUrl);
                } },
            ])
        } else {
            MyAlert('下载到本地', '是否上传到社区?', [
                { text: '保存到本地', onPress: () => {
                    setSaveImgs(pre => pre.concat(namemd5));
                    download(namemd5, imgUrl);
                }},
                { text: '确定', onPress: () => {
                    shareSocity(file);
                    setSaveImgs(pre => pre.concat(namemd5));
                } },
            ])
        }

    }, [canvasRef , [...saveImgs]] )

    // 清除localstorage
    const handleToRemoveLocal = () => {
        localStorage.removeItem('localImage');
    }

    const handleToSubmit = useCallback(() => {

        let res = compress();

        // console.log('res', res)

    }, [saveImgs]);

    
   

    useEffect(() => {
        // 用来保存与手机屏幕大小的记录
        let { width, height } = window.screen;
        setWindowSize({ width, height})
       
        const images = props.location.state;
        const { type } = UrlParmas();

        // 绘制图形
        drawImageToCanvas(images, type);

        


        return () => {
            // alert('umount')
        }

    }, []);
    
    return (
        <div className="spliceedit-container">

            <div className="spliceedit-nav">
                <ArrowBack color="#777" imgSrc={IMAGE_ARROW} handleToClick={handleToRemoveLocal} />
                <MyButton handleToSubmit={handleToSubmit} time={500} />
            </div>

            <div className="canvas-wrap">
                <canvas ref={canvasRef} className="spice-canvas" width={CanvasWidth} height={CanvasHeight} />
            </div>

            <div className="spliceedit-bar">
                {barList && barList.map((bar => {
                    return (
                        <Icon 
                            key={bar.img}
                            iconText={bar.text}
                            imgURL={bar.img}
                            size="small"
                            color="#777"
                        />
                    )
                }))}
            </div>

        </div> 
    );
}

export default Spliceedit;