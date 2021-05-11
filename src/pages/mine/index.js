import React, { useContext, useEffect, useState } from 'react';

import Back from '../../components/ArrowBack';

import Tabs from 'antd-mobile/lib/tabs';
import 'antd-mobile/lib/tabs/style/css';

import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';

import { IMAGE_ICON, IMAGE_PEN, IMAGE_LOVE_PINK } from '../../const';

import { getlist } from '../../api';

import './index.scss';
import { useHistory } from 'react-router';
import { isNotNull } from '../../utils';

import { WorkContext } from '../../App';

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

const init_signature = '还没有个性签名哟～';

function Mine(props) {

    // userSate = { name, userId, phone, avater, signature, love}
    const [userState, setUserState] = useState(null);
    const history = useHistory();
    const { data, setData } = useContext(WorkContext);


    const handleToUpdate = () => {

        console.log('suer', userState)

        if (!isNotNull(userState)) {
            Toast.info('请先登录')
        } else {
            // 跳转到修改页面
            history.push('/setting');
        }
        
    }

    const handleToDownload = (src, name) => {
        let a = document.createElement('a');
        a.style.display = 'none';
        a.download = name;
        a.href = src;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    useEffect(() => {
        //   获取用户信息
        let user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            Toast.info('请先登录～');
            return;
        }

        if (data?.own && isNotNull(data.own)) {
            setUserState(Object.assign(user, data));
        } else {
            // 获取作品信息
            getlist({userId: user.userId}).then(res => {
                user = Object.assign(user, res);
                setUserState(user);
                setData(pre => Object.assign(pre, res))
            }).catch(err => {
                console.log('err', err);
            });
        }
    } ,[]);


    return (
        <div className="mine-container">
            <div className="mine-information">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '2rem'}}>
                    <Back />
                    <div style={{color: '#fff', fontSize: '2rem'}} onClick={handleToUpdate} >设置</div>
                </div>
               
                <div className="info-all">
                    <div className="info-left">
                        <p className="info-nick">用户：{userState?.name || userState?.phone}</p>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img src={IMAGE_PEN} alt="个性签名" style={{width: '1.4rem', height: '1.4rem'}}/>
                            <p className="info-signature">{ userState?.signature || init_signature}</p>
                        </div>
                    </div>
                    <div className="info-face" style={{backgroundImage: `url(${ userState?.avater || IMAGE_ICON})`}} />
                </div>
                
            </div>
            {
                isNotNull(userState) ? 
                <Tabs
                tabs={tablist}
                >
                    <div key="works" className="info-tab">
                        {
                            Array.isArray(userState?.own) && userState.own.map((item) => {
                                return (
                                    <img src={item.src} key={`works${item.id}`} alt={item.name} className="tab-img" onClick={() => handleToDownload(item.src, item.name)} />
                                )
                            })
                        }
                    </div>
                    <div key="love" className="info-tab">
                    {
                            Array.isArray(userState?.love) && userState.love.map((item) => {
                                return (
                                    <div className="tab-love" key={`love${item.id}`}>
                                        <img src={item.src} alt={item.name} className="love-img" />
                                        <img src={IMAGE_LOVE_PINK} alt="love" className="love-icon" />
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </Tabs>
            : 
            <div className="bu-tologin" onClick={() => history.push('/login')}>点击前往登录页面</div>
            }
        </div>
    );
}

export default Mine;
