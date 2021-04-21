import React, { useEffect } from 'react';

import Back from '../../components/ArrowBack';

import Tabs from 'antd-mobile/lib/tabs';
import 'antd-mobile/lib/tabs/style/css';

import WaterFall from '../../components/WaterFall';

import Test from '../../components/Water';

import { IMAGE_TITLE, IMAGE_PEN } from '../../const';

import './index.scss';

const Child = item => {
    return (
        <div style={{width: '40%'}}>
            
        </div>
    )
}

const tablist = [
    {
        title: '作品',
        key: 'works'
    },
    {
        title: '喜爱',
        key: 'love'
    }
]

const test = [
    {
        img: 'https://i.loli.net/2021/04/14/WeaLprRmMhq1VTO.jpg'
    },
    {
        img: 'https://i.loli.net/2021/04/14/ut2SXfhmaK4FinG.jpg'
    },
    {
        img: 'https://i.loli.net/2021/04/14/WeaLprRmMhq1VTO.jpg'
    },
    {
        img: 'https://i.loli.net/2021/04/14/WeaLprRmMhq1VTO.jpg'
    },
    {
        img: 'https://i.loli.net/2021/04/14/ut2SXfhmaK4FinG.jpg'
    },
    {
        img: 'https://i.loli.net/2021/04/14/ut2SXfhmaK4FinG.jpg'
    },
    {
        img: 'https://c-ssl.duitang.com/uploads/item/201803/08/20180308223406_zKyVN.jpeg'
    },
    {
        img: 'https://i.loli.net/2021/04/14/ut2SXfhmaK4FinG.jpg'
    },
    {
        img: 'https://c-ssl.duitang.com/uploads/item/201803/08/20180308223406_zKyVN.jpeg'
    },
    {
        img: 'https://i.loli.net/2021/04/14/WeaLprRmMhq1VTO.jpg'
    },
]

function Mine(props) {

    const init_signature = '还没有个性签名哟～';


    useEffect(() => {
        //   获取用户信息

        // 获取作品信息
    } ,[])



    return (
        <div className="mine-container">
            <div className="mine-information">
                <Back />
                <div className="info-all">
                    <div className="info-left">
                        <p className="info-nick">133XXXX5678</p>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img src={IMAGE_PEN} alt="个性签名" style={{width: '1.4rem', height: '1.4rem'}}/>
                            <p className="info-signature">{init_signature}</p>
                        </div>
                    </div>
                    <div className="info-face" style={{backgroundImage: `url(${IMAGE_TITLE})`}} />
                </div>
            </div>
            <Tabs
                tabs={tablist}
                onChange={(tab, index) => console.log('tab',tab, 'index', index)}
                onTabClick={(tab, index) => console.log('tab',tab, 'index', index)}
            >
               
                <div key="works" className="info-tab">
                    {
                        test.map((item, index) => (
                            <img src={item.img} key={item.img+index} alt={item.img} className="tab-img" />
                        ))
                    }
                </div>
                <div key="love" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    {/* <WaterFall items={test} Child={Child} /> */}
                    <div>11</div>
                    
                </div>  

            </Tabs>
            {/* <Test
                containerWidth={414}
                itemWidth={190}
                itemGap={10}
                itemCol={2}
            >
                {
                    test.map((item, index) => (
                        <img src={item.img} key={item.img+index} alt={item.img} className="test" />
                    ))
                }
            </Test> */}
        </div>
    );
}

export default Mine;
