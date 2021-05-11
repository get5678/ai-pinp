import React, { useEffect, useContext, useState } from 'react';
import Icon from '../../components/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';


import { IMAGE_MINE, IMAGE_VIDEO, IMAGE_EDIT, IMAGE_SPLICE, IMAGE_TITLE_WHITE } from '../../const';

import './index.scss';
import { useHistory } from 'react-router';
import { WorkContext } from '../../App';
import { isNotNull } from '../../utils';
import { getlist } from '../../api';

SwiperCore.use([Pagination, Autoplay]);


function Index(props) {

    const history = useHistory();

    const { data, setData } = useContext(WorkContext);

    const [worksData, setWorksData] = useState(null);

    const handleToEnterSociaty = () => {
        history.push('/sociaty');
    }

    const indexLists = [
        {
            url: '/beautify',
            text: 'p图',
            fileType: 'image',
            img: IMAGE_EDIT
        },
        {
            url: '/splice',
            text: '拼图',
            img: IMAGE_SPLICE
        },
        {
            url: '/video',
            text: '视频',
            fileType: 'video',
            img: IMAGE_VIDEO
        },
        {
            url: '/mine',
            text: '我的',
            img: IMAGE_MINE
        },
    ]

    useEffect(() => {

        if (data?.all && isNotNull(data.all)) {

            setWorksData(data.all.slice(0, 9));
        } else {
            getlist().then(res => {
                setWorksData(res.all.slice(0,9));
                setData(pre => Object.assign(pre, res));
            }).catch(err => console.log('error', err));
        }
    }, [])

    return (
        <div className="index-container">
            <img src={IMAGE_TITLE_WHITE} alt="aipin" className="index-title"/>
            <Swiper
                direction={'horizontal'}
                loop={true}
                pagination={{ clickable: true }}
                autoplay={{delay: 4000, disableOnInteraction: false}}
            >
                { worksData && worksData.map((item) => (
                    <SwiperSlide key={item?.id}>
                        <img src={item?.src} alt={item?.name} className="index-slider" onClick={handleToEnterSociaty}/>
                    </SwiperSlide>
                )) }
            </Swiper>

            <div className="lists-container">
                {
                    indexLists.map(list => (
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


