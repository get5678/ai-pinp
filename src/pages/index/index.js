import React from 'react';
import Icon from '../../components/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';


import { IMAGE_INDEX1, IMAGE_MINE, IMAGE_VIDEO, IMAGE_EDIT, IMAGE_SPLICE, IMAGE_TITLE_WHITE } from '../../const';

import './index.scss';

SwiperCore.use([Pagination, Autoplay]);



function Index(props) {

    const handleToClick = () => {

    }


    const indexLists = [
        {
            url: '/beautify',
            text: 'p图',
            handleToClick,
            fileType: 'image',
            img: IMAGE_EDIT
        },
        {
            url: '/splice',
            text: '拼图',
            handleToClick,
            fileType: 'image',
            multiple: true,
            img: IMAGE_SPLICE
        },
        {
            url: '/video',
            text: '视频',
            handleToClick,
            fileType: 'video',
            img: IMAGE_VIDEO
        },
        {
            url: '/mine',
            text: '我的',
            img: IMAGE_MINE
        },
    ]


    return (
        <div className="index-container">
            <img src={IMAGE_TITLE_WHITE} alt="aipin" className="index-title"/>
            <Swiper
                direction={'horizontal'}
                loop={true}
                pagination={{ clickable: true }}
                autoplay={{delay: 4000, disableOnInteraction: false}}
            >
                <SwiperSlide>
                    <img src={IMAGE_INDEX1} alt="index1" className="index-slider" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={IMAGE_INDEX1} alt="index1" className="index-slider" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={IMAGE_INDEX1} alt="index1" className="index-slider" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={IMAGE_INDEX1} alt="index1" className="index-slider" />
                </SwiperSlide>
            </Swiper>

            <div className="lists-container">
                {
                    indexLists.map(list => (
                        // list?.handleToClick ? 
                        // <div className="list-input" key={list.img}>
                        //     <Icon
                        //         iconLink={list.url}
                        //         iconText={list.text}
                        //         imgURL={list.img}
                        //     />
                        // </div>
                        // :
                        <Icon
                            key={list.img}
                            fileType={list.fileType}
                            multiple={list?.multiple}
                            iconLink={list.url}
                            iconText={list.text}
                            imgURL={list.img}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Index;


