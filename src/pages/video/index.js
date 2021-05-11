import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';

import ArrowBack from '../../components/ArrowBack';
import MyButton from '../../components/MyButton';
import { isType } from '../../utils';

import { IMAGE_BACK2 } from '../../const';
import { upvideo } from '../../api';


import './index.scss';

const CanvasWidth = 300;
const CanvasHeight = 230;


function Video(props) {

    // 传递过来的视频数据
    const { state } = useHistory().location;
    const CanvasRef = useRef(null);

    // 用来保存图片
    const [imageState, setImageState] = useState(null);

    // 保存图片url
    const [imageUrl, setImageUrl] = useState(null);

    // 记录屏数
    const [screenNumber, setScreenNumber] = useState(2);


    // 绘制图片到canvas
    const getImageToCanvas =  useCallback((data) => {
        let file = data;

        // let imgsrc = 'https://longrou.oss-cn-chengdu.aliyuncs.com/sansan-wallpaper2.jpg';

        if (Object.prototype.toString.call(data) === '[object FileList]') {
            file = data[0];
        } 

        // if (!CanvasRef.current) return;

        getFirstFrame(file);

        // ctx.drawImage(file, 0, 0, CanvasWidth, CanvasHeight)

    }, [CanvasRef]);

    // 获取视频文件第一帧
    const getFirstFrame = data => {

        let src = data;

        if (isType(src, '[object FileList]') || isType(src, '[object File]')) {
            src = URL.createObjectURL(src);
        }


        setImageUrl(src);

        const video = document.createElement('video');


        video.src = src;
        // video.srcObject = src;
        // video.srcObject = new window.webkitMediaStream(src);
        video.preload = 'metadata'; // 用户不需要查看视频，但是提前抓取数据
        video.crossOrigin = 'anonymous';



        video.onloadstart = e => {
            console.log('start')
        }

        video.onloadedmetadata = e => {
            console.log('onloadedmetadata')
            
        }

        video.onloadeddata = e => {
            console.log('onloadeddata\n')
            // let canvas = CanvasRef.current;
            // let ctx = canvas.getContext('2d');
        
            // ctx.drawImage(video, 0, 0, CanvasWidth, CanvasHeight);
            // let src = canvas.toDataURL('image/png');
            // console.log('src', src)
        }


    };

    const handleToSubmit = e => {

        let number = Number(screenNumber);

        let fd = new FormData();

        fd.append('video', imageState);
        fd.append('screenumber', number);
        
        console.log('imageState',imageState)
        console.log('submit', number, typeof number)

        upvideo(fd).then(res => {
            console.log('res', res)
        }).catch(err => console.log('err',err))

    }

    // 页面一加载，保存router传过来的视频信息
    useEffect(() => {
       
        if (!state) return;
        setImageState(state[0]);
    }, []);

    useEffect(() => {
       
        if (!imageState) return;

        getImageToCanvas(imageState)
    }, [imageState]);


    return (
        <div className="video-container" style={{backgroundImage: `url(${IMAGE_BACK2})`}}>
            <div className="video-nav">
                <ArrowBack color="#777" />
            </div>

            <div className="video-content">

                {/* <canvas width={CanvasWidth} height={CanvasHeight} ref={CanvasRef} className="video-canvas">
                    您的软件不支持canvas
                </canvas> */}

                <video src={imageUrl} width={CanvasWidth}>
                    您的软件不支持video
                </video>

                <div className="video-screen-wrap">
                    <label htmlFor="screen">请选择屏数:</label>
                    <select name="screen" id="screen" defaultValue={screenNumber} className="video-select" onChange={(e) => setScreenNumber(e.target.value)}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                </div>

                <MyButton 
                    text="确定" 
                    handleToSubmit={handleToSubmit} 
                    style={{
                        marginTop: '6rem', 
                        width: '20rem', 
                        height: '5.6rem', 
                        borderRadius: '2.8rem',
                        fontSize: '3rem',
                        lineHeight: '5.4rem'
                    }}
                />
            </div>
        </div>
    );
}

export default Video;