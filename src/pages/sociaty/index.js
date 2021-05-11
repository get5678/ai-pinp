import React, { useContext, useEffect, useState } from 'react';
import { getlist } from '../../api';
import ArrowBack from '../../components/ArrowBack';
import { isNotNull } from '../../utils';

import { WorkContext } from '../../App';

import './index.scss';
import { IMAGE_LOVE_FILL, IMAGE_SOCITY_TITILE } from '../../const';

function Sociaty(props) {

    const [worksData, setWorksData] = useState(null);

    const { data, setData } = useContext(WorkContext);

    

    useEffect(() => {

        if (data?.all && isNotNull(data.all)) {
            setWorksData(data.all);
        } else {
            getlist().then(res => {
                setWorksData(res.all);
                setData(pre => Object.assign(pre, res));
            }).catch(err => console.log('error', err));
        }

    }, [])

    const handleToDownload = (src, name) => {
        let a = document.createElement('a');
        a.style.display = 'none';
        a.download = name;
        a.href = src;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }


    

    return (
        <div className="sociaty-container">
            

            <div className="sociaty-nav">
                <ArrowBack style={{position: 'absolute', left: '0.8rem'}} color="rgba(214,135,135,0.46)" />
                <img src={IMAGE_SOCITY_TITILE} alt="看看吧" className="socity-title" />
            </div>


            <div className="sociaty-content">
                {
                    isNotNull(worksData) && worksData.map((work) => {
                        return (
                            <div className="sociaty-items" key={work.id}>
                                <img src={work.src} alt={work.name}  className="sociaty-img" onClick={() => handleToDownload(work.src, work.name)} />
                                <img src={IMAGE_LOVE_FILL} alt={work.name}  className="socity-icon" />
                            </div>
                        )
                    })
                }
            </div>
           


        </div>
    );
}

export default Sociaty;