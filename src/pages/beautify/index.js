import React, { useCallback, useEffect, useRef, useState } from 'react';
import ArrowBack from '../../components/ArrowBack';
import MyButton from '../../components/MyButton';
import Icon from '../../components/Icon';

import Tabs from 'antd-mobile/lib/tabs';
import 'antd-mobile/lib/tabs/style/css';

import  Modal  from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';

import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';

// import Slider from 'antd-mobile/lib/slider';
// import 'antd-mobile/lib/slider/style/css';

// import { Slider } from 'antd';

import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

import { fileReader, base64ToFile, hsv2rgb, conv, debounce } from '../../utils';
import { addwork } from '../../api';

import {
    tailorList,
    editList,
    filterList,
    tabList
} from '../../const';

import './index.scss';
import webworker from './worker.js';
import { useHistory } from 'react-router';

const MyAlert = Modal.alert;


const logoStyle = {
    borderRight: '1px solid #000',
    height: '5.8rem',
    width: '8rem',
    paddingRight: '2rem',
    justifyContent: 'center'
};


function Beautify(props) {

    const CanvasRef = useRef(null);   
    const { state } = useHistory().location;

    const [img, setImg] = useState(null);
    const [initImageData, setInitImageData] = useState(null);

    const [editState, setEditState] = useState(editList);
    const [tailorState, setTailorState] = useState(tailorList);
    const [filterState, setFilterState] = useState(filterList);

    const ImageWidth = 300;
    const ImageHeight = 460;

    const [currentState, setCurrentState] = useState('brightness');

    const worker = new Worker(webworker);



    // 从react-router中获取数据
    const handleToGetCanvas = async(img) => {

        let type = Object.prototype.toString.call(img);
        let src = img;

        if (type === "[object File]") {
            src = await fileReader(img);
        }

        let canva = CanvasRef.current;
        let ctx = canva.getContext('2d');
        let imageObj = new Image();
        imageObj.onload = function() {
            ctx.drawImage(this, 0, 0, ImageWidth, ImageHeight);
            let data = ctx.getImageData(0, 0, ImageWidth, ImageHeight);
            setInitImageData(data);
            return img;
        }
        imageObj.src = src;
    }

    const handleToClickTab = (data, index) => {
        console.log('data:\n', data, 'index\n', index);
    }

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

    const handleToSubmit = useCallback(() => {

        let canva = CanvasRef.current;
        let src = canva.toDataURL();

        let user = localStorage.getItem('user') || null;

        if (user) {
            user = JSON.parse(user);
        }

        let fd = new FormData();
        let image = base64ToFile(src, img[0].name);

          
      

       // 多文件上传，需要循环一次push，而不是直接赋值

        fd.append('file', image);
        fd.append('userId', user?.userId);
        fd.append('phone', user?.phone);
        fd.append('name', image.name);

       

        MyAlert('下载到本地', '是否上传到社区?', [
            { text: '保存到本地', onPress: () => {
                download(image.name, src);
            }},
            { text: '上传', onPress: () => {
                Toast.loading('上传中..')
                addwork(fd).then(res => {
                    console.log('res', res);
                    Toast.info('上传成功');
                }).catch(err => {
                    console.log('err', err);
                    Toast.fail('上传失败');
                })
            } },
        ])

        


    }, [img]);

    const copyImageData = (imageData) => {
        if (!imageData) return null;
        return new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height)
    }

    /**
     * 编辑
     */
    const handleToChange = useCallback((e, newValue) => {

        // 亮度
        function changeLight(newValue) {
            for (let i = 0; i < pixeldata.length; i+=4) {
                pixeldata[i] += newValue;
                pixeldata[i+1] += newValue;
                pixeldata[i+2] += newValue;
            }
        }

        // 锐化
        function changeTriangle(newValue) {
            newValue += 50;
            newValue = Math.floor(newValue / 100).toFixed(1);
            // conv([0, -1, 0, -1, 5, -1, 0, -1, 0], newData);
            let avrR = newValue, avgG = newValue;
            let avgB = 1 - 2 * newValue;

            for( var i = 0; i < pixeldata.length; i += 4 ) {
                   let avg = pixeldata[i] * avrR + pixeldata[i+1] * avgG + pixeldata[i+2] * avgB;
                   pixeldata[i] = avg;
                   pixeldata[i+1] = avg;
                   pixeldata[i+2] = avg;
                 }
        }


        let canva = CanvasRef.current;
        let ctx = canva.getContext('2d');
        let newData = copyImageData(initImageData);

        let pixeldata = newData.data;

       switch(currentState) {
           case 'brightness':
                changeLight(newValue);
                break;
            case 'triangle':
                changeTriangle(newValue);
                break;
            default:
                break;
       }

        ctx.putImageData(newData, 0, 0);

    }, [currentState, initImageData , CanvasRef]);

    /**
     * 滤镜
     */
    const handleToFilter = useCallback(async(item) => {

        async function filterWorker(type, data) {

            return new Promise((reslove, reject) => {
                worker.postMessage({
                    type,
                    imageData: data
                });

                worker.onmessage = e => {
                    const { type, imageData } = e?.data || null;
                    console.log('type', type, 'imageData\n', imageData)
                   
                    reslove(imageData);
                }

                worker.onerror = e => {
                    reject(e);
                }
            })
        }

    
        let type = item?.type || null;

        let canva = CanvasRef.current;
        let ctx = canva.getContext('2d');

        let image = ctx.getImageData(0, 0, ImageWidth, ImageHeight)
        
        let newData = copyImageData(initImageData);

        
        let result = await filterWorker(type, newData);       

        result && ctx.putImageData(result, 0, 0);

    }, [initImageData, CanvasRef])


    /**
     * @description 用于点击图标改变颜色
     * @param {*} item tab的标签
     * @param {*} type edit， spice， filter
     * @returns 
     */
    const handleToEdit = (item, type) => {
        if (item.type === 'logo') return;
        setCurrentState(item.type);
        
        switch(type) {
            case 'edit':
                setEditState(pre => {
                    let newEdit = pre.map((edit) => {
                        if (edit.type === item.type) {
                            return Object.assign(edit, { isClicked: true });
                        }else {
                            return Object.assign(edit, { isClicked: false });
                        }
                    });
                    return newEdit;
                });
                break;
            case 'filter':
                setFilterState(pre => {
                    let newEdit = pre.map((edit) => {
                        if (edit.type === item.type) {
                            return Object.assign(edit, { isClicked: true });
                        }else {
                            return Object.assign(edit, { isClicked: false });
                        }
                    });
                    return newEdit;
                });
                handleToFilter(item);
                break;
            default:
                break;
        }

    }



    const renderTabItem = (arr, type) => (
        arr && arr.map((item) => {
            let isLogo = item?.type === 'logo';
            return (
                <Icon 
                    key={item.type}
                    size={isLogo ? '' : 'small'}
                    style={isLogo ? logoStyle : null}
                    color={item?.isClicked ? '#D68787': '#555'}
                    imgURL={item?.img}
                    iconText={isLogo ? '' : item?.text}
                    handleToClick={() => handleToEdit(item, type)}
                />
            )
        })
    )

    useEffect(() => {
        if (!state) return;
        
        setImg(state);

        if (state.length > 0) {
            handleToGetCanvas(state[0])
        }

       
       
    }, []);

 
    const PrettoSlider = withStyles({
        root: {
          color: '#D68787',
          height: 8,
          width: '90vw'
        },
        thumb: {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
          marginTop: -8,
          marginLeft: -12,
          '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
          },
          
        },
        active: {},
        valueLabel: {
          left: 'calc(-50% + 4px)',
          fontSize: 20,
        },
        track: {
          height: 8,
          borderRadius: 4,
        },
        rail: {
          height: 8,
          borderRadius: 4,
        },
      })(Slider);

    return (
        <div className="beautify-conatiner">
            <div className="nav-all">
                <ArrowBack color="rgba(119, 119, 119, 100)" />
                <MyButton 
                    handleToSubmit={handleToSubmit}
                />
            </div>
           <canvas ref={CanvasRef} id="beautify-canvas" width="300" height="460" className="vancas-image">
               暂不支持canvas
           </canvas>
           <PrettoSlider 
                valueLabelDisplay="on" 
                aria-label="pretto slider"
                onChange={debounce(handleToChange, 500)}
                defaultValue={0} 
                min={-50}
                max={50}
            />
           <div style={{height: '13rem', width: '100vw'}}>
            <Tabs
                tabs={tabList}
                animated={false}
                tabBarPosition="bottom"
                // onTabClick={handleToClickTab}
                renderTab={tab => <div className={`tab-item ${tab.index === tabList.length - 1 ? 'item-last': ''}`}>{tab.title}</div>}
                tabBarUnderlineStyle={{border: 'none'}}
                tabBarBackgroundColor="rgba(248,238,238,0.38)"
            >
                <div key="edit" className="tabwrap-item">
                    { editState && renderTabItem(editState, "edit") }
                </div>
                <div key="tailor" className="tabwrap-item">
                    { tailorList && renderTabItem(tailorList, "tailor") }
                </div>
                <div key="filter" className="tabwrap-item">
                    { filterState && renderTabItem(filterState, "filter") }
                </div>
            </Tabs>
           </div>

        </div>
    );
}

export default Beautify;