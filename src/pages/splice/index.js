import React from 'react';

import ArrowBack from '../../components/ArrowBack';

import Tabs from 'antd-mobile/lib/tabs';
import 'antd-mobile/lib/tabs/style/css';

import './index.scss';
import { debounce } from '../../utils';
import { useHistory } from 'react-router';

import { IMAGE_EXAMPLE1 } from '../../const';

const tablist = [
    {
        title: '简约',
        key: 'concise',
        imgs: [1,2,3,4,5,6,7,8,9,10]
    },
    {
        title: '拼接',
        key: 'splice',
        imgs: [IMAGE_EXAMPLE1]
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
];

const list = [
    {
        type: 'seamless',
        text: '无缝拼接'
    },
    {
        type: 'row',
        text: '横着'
    },
    {
        type: 'column',
        text: '竖着'
    }
]

function Splice(props) {

    const history = useHistory();

    const data = ["test", "22", "23ds"];
    const handleToClick = () => {
        // history.push('/splice/edit')
        history.push({
            pathname: '/splice/edit',
            state: data
        })
    }

    const handleToChoosePic = (e, item) => {
        
        let files = e.target.files
       
        history.push(
            `/spliceedit?type=${item?.type}`,
            files
        )
    }

    return (
        <div className="splice-container">
            <ArrowBack color="#777" />

            {/* <Tabs
                tabs={tablist}
            >
                { tablist?.length > 0 &&  tablist.map((item,index) => {

                    let imgs = item?.imgs;

                    return (
                        <div key={item?.key} className="img-container">
                            {imgs && imgs.map((img) => (
                            <div className="item-container" key={img}>
                                <img 
                                    src={img} 
                                    alt={img} 
                                    key={img} 
                                    className="img-item" 
                                    // onClick={debounce(e => handleToClick(e), 300)} 
                                />
                                <input
                                    className="img-input"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleToChoosePic}
                                />
                            </div>
                            ))}
                        </div>
                    )
                })}
            </Tabs> */}


            <div className="img-container">
                {
                    list && list.map((item, index) => {
                        let img = item?.img || '';
                        let text = item?.text;

                        return (
                            <div className="item-container" key={index}>
                                <img 
                                    src={img}
                                    alt={text} 
                                    key={img} 
                                    className="img-item"
                                />
                                <input
                                    className="img-input"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => handleToChoosePic(e, item)}
                                />
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}

export default Splice;