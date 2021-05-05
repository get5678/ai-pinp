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

import Slider from 'antd-mobile/lib/slider';

import { fileReader } from '../../utils';
import { addwork } from '../../api';

import { 
    IMAGE_PEN, 
    IMAGE_BRIGHTNESS, 
    IMGAE_GLASSES,
    IMAGE_TRIANGLE, 
    IMAGE_PALETTE, 
    IMAGE_RATIO,
    IMAGE_SPLICE,
    IMAGE_ADAPT,
    IMAGE_THREE,
    IMAGE_FOUR,
    IMAGE_ONE
} from '../../const';

import './index.scss';
import { useHistory } from 'react-router';

const MyAlert = Modal.alert;

// 亮度  锐化 对比度  色调  裁剪 滤镜

const tabList = [
    {
        index: 0,
        title: '编辑',
        key: 'edit'
    },
    {
        index: 1,
        title: '裁剪',
        key: 'tailor'
    },
    {
        index: 2,
        title: '滤镜',
        key: 'filter'
    }
];

const editList = [
    {
        type: 'logo',
        img: IMAGE_PEN
    },
    {
        type: 'brightness',
        text: '亮度',
        img: IMAGE_BRIGHTNESS,
        handleToClick: () => {
            console.log('brightness')
        }
    },
    {
        type: 'triangle',
        text: '锐化',
        img: IMAGE_TRIANGLE
    },
    {
        type: 'ratio',
        text: '对比度',
        img: IMAGE_RATIO
    },
    {
        type: 'palette',
        text: '色调',
        img: IMAGE_PALETTE
    }
];

const tailorList = [
    {
        type: 'logo',
        img: IMAGE_SPLICE
    },
    {
        type: 'adapt',
        img: IMAGE_ADAPT
    },
    {
        type: 'one',
        img: IMAGE_ONE
    },
    {
        type: 'three',
        img: IMAGE_THREE
    },
    {
        type: 'four',
        img: IMAGE_FOUR
    }
];

const filterList = [
    {
        type: 'logo',
        img: IMGAE_GLASSES
    }
]

const logoStyle = {
    borderRight: '1px solid #000',
    height: '5.8rem',
    width: '8rem',
    paddingRight: '2rem',
    justifyContent: 'center'
};


function Beautify(props) {

    // const {
    //     maxWidth = 400,
    //     maxHeight = 400,
    //     fileType = 'blob',
    //     imageType ='image/png'
    // } = props;


    const CanvasRef = useRef(null);   
    const { state } = useHistory().location;
    const [img, setImg] = useState(null);

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
            ctx.drawImage(this, 0, 0, 300, 460);
            return img;
        }
        imageObj.src = src;
    }

    const handleToClickTab = (data, index) => {
        console.log('data:\n', data, 'index\n', index);
    }

    const handleToSubmit = useCallback(() => {
        let user = localStorage.getItem('user') || null;

        if (user) {
            user = JSON.parse(user);
        }

        let fd = new FormData();

       // 多文件上传，需要循环一次push，而不是直接赋值

        fd.append('file', img[0]);
        fd.append('userId', user?.userId);
        fd.append('phone', user?.phone);
        fd.append('name', 'test')

        addwork(fd).then(res => {
            console.log('res', res);
        }).catch(err => console.log('err', err))


    }, [img]);

    const renderTabItem = (arr) => (
        arr && arr.map((item) => {
            let isLogo = item?.type === 'logo';   
            return (
                <Icon 
                    key={item.type}
                    size={isLogo ? '' : 'small'}
                    style={isLogo ? logoStyle : null}
                    color={'#555'}
                    imgURL={item?.img}
                    iconText={isLogo ? '' : item?.text}
                    handleToClick={item?.handleToClick}
                />
            )
        })
    )

    useEffect(() => {
        
        setImg(state);

        if (state.length > 0) {
            handleToGetCanvas(state[0])
        }
       
    }, [])

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


           <Slider
            style={{ marginLeft: 30, marginRight: 30 }}
            defaultValue={26}
            min={0}
            max={30}
            // onChange={this.log('change')}
            // onAfterChange={this.log('afterChange')}
          />

           <div style={{height: '13rem', width: '100vw'}}>
            <Tabs
                tabs={tabList}
                animated={false}
                tabBarPosition="bottom"
                onTabClick={handleToClickTab}
                renderTab={tab => <div className={`tab-item ${tab.index === tabList.length - 1 ? 'item-last': ''}`}>{tab.title}</div>}
                tabBarUnderlineStyle={{border: 'none'}}
                tabBarBackgroundColor="rgba(248,238,238,0.38)"
            >
                <div key="edit" className="tabwrap-item">
                    { editList && renderTabItem(editList) }
                </div>
                <div key="tailor" className="tabwrap-item">
                    { tailorList && renderTabItem(tailorList) }
                </div>
                <div key="filter" className="tabwrap-item">
                    { filterList && renderTabItem(filterList) }
                </div>
            </Tabs>
           </div>

        </div>
    );
}

export default Beautify;