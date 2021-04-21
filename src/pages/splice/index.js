import React from 'react';

import ArrowBack from '../../components/ArrowBack';

import Tabs from 'antd-mobile/lib/tabs';
import 'antd-mobile/lib/tabs/style/css';

import './index.scss';
import { debounce } from '../../utils';
import { useHistory } from 'react-router';

const tablist = [
    {
        title: '简约',
        key: 'concise',
        imgs: [1,2,3,4,5,6,7,8,9,10]
    },
    {
        title: '拼接',
        key: 'splice'
    },
    {
        title: '无缝',
        key: 'seamless'
    },
    {
        title: '明信片',
        key: 'postcard'
    },
    {
        title: '长图',
        key: 'long'
    },
    {
        title: '封面',
        key: 'cover'
    }
]

function Splice(props) {

    const history = useHistory();

    const handleToClick = () => {
        history.push('/splice/edit')

    }

    return (
        <div className="splice-container">
            <ArrowBack color="#777" />

            <Tabs
                tabs={tablist}
            >
                { tablist?.length > 0 &&  tablist.map((item,index) => {

                    let imgs = item?.imgs;

                    return (
                        <div key={item?.key} className="img-container">
                            {imgs && imgs.map((img) => (
                                <img src={img} alt={img} key={img} className="img-item" onClick={debounce(e => handleToClick(e), 300)} />
                            ))}
                        </div>
                    )
                })}
            </Tabs>
        </div>
    );
}

export default Splice;