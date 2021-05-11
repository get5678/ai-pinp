import React, { useCallback, useEffect, useState } from 'react';
import ArrowBack from '../../components/ArrowBack';

import './index.scss';

import { IMAGE_ICON, IMAGE_BACK1 } from '../../const';
import { updateUser } from '../../api';
import { fileReader } from '../../utils';

import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';

import  Modal  from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';
import { useHistory } from 'react-router';

const Alert = Modal.alert;

const corresponding = {
    avater: '头像',
    name: '昵称',
    phone: '手机号码',
    password: '密码',
    signature: '个性签名'
}

const INIT_NAME = '未设置昵称';
const INIT_SIGNATURE = '还没有签名哟～'

const Item = (props) => {

    const { title, value, handleToGetValue } = props;

    const [val, setVal] = useState(value);

    const handleToChange = e => {
        let val = e.target.value;
        setVal(val);
    }

    const handleToBlur = e => {
        let value = e.target.value;

        if (typeof handleToGetValue === 'function') {
            handleToGetValue({title, value});
        }

    }


    const handleToChangeImg = () => {
       
    }

    const getImage = async(e) => {
        let file = e.target.files && e.target.files[0];
        let src = await fileReader(file);
        setVal(src);

        if (typeof handleToGetValue === 'function') {
            handleToGetValue({title, value:file});
        }
    }


    return (
        <div className="setting-item">
            <p className="item-text">{corresponding[title]}</p>
            <div style={{display: 'flex', alignItems: 'center'}}>
                {
                    title === 'avater' ? 
                    <div className="setting-avater" style={{backgroundImage: `url(${val || IMAGE_ICON})`}} onClick={handleToChangeImg}>
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="item-file" 
                            onChange={getImage} 
                        />
                    </div>
                    :
                    <input 
                        type="text" 
                        onChange={handleToChange} 
                        onBlur={handleToBlur}
                        placeholder={value}
                        value={val}
                        className="setting-input" 
                    />
                }
                <ArrowBack color="#777" disable={true} style={{transform: 'rotate(180deg) scale(0.5)'}} />
            </div>
        </div>
    )
}


function Setting(props) {

    const [userState, setUserState] = useState(null);
    const history = useHistory();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));

        const info = {
            avater: '',
            name: INIT_NAME,
            phone: '',
            signature: INIT_SIGNATURE
        };

        user = Object.assign(info, user);

        delete user.userId;

        setUserState(user);
    }, []);


    const handleToGetValue = useCallback(({title, value}) => {

        setUserState(pre => {
            return Object.assign(pre, { [title]: value})
        })

    }, [JSON.stringify(userState)]);

    const handleToSubmit = useCallback(() => {

        const fd = new FormData();
        const user = JSON.parse(localStorage.getItem('user'));

        fd.append('userId', user.userId);

        for (let key in userState) {
            let value = userState[key];
            if (value && value !== INIT_NAME && value !== INIT_SIGNATURE && user[key] !== userState[key]) {
                fd.append(key, value);
            }
        }

        updateUser(fd).then(res => {

            if (Number(res.id) === user.userId) {
                delete res.id;
                let newUser = Object.assign(user, res);
                localStorage.setItem('user', JSON.stringify(newUser));
                Toast.info('修改成功');
            }

        }).catch(err => console.log('err', err))


    }, [JSON.stringify(userState)]);

    const handleToOut = () => {
        Alert('退出登录', '确定是否退出登录？', [
            { text: '取消' },
            { text: '确定', onPress: () => {
                localStorage.clear();
                history.push('/index');
            } }
        ])
    }

    const renderItem = useCallback(() => {
        if (!userState) return;

        // object changes to array
        const arr = [];

        for (let key in userState) {
            let obj = {};
            obj.title = key;
            obj.value = userState[key];
            arr.push(obj);
        }
        return (
            <>
                {
                    arr && arr.map((item, index) => (
                        <Item 
                            title={item.title} 
                            value={item.value} 
                            key={item.title+index} 
                            handleToGetValue={handleToGetValue}
                        />
                    ))
                }
            </>
        )

    }, [userState]);

  


    return (
        <div className="setting-container" style={{backgroundImage: `url(${IMAGE_BACK1})`}}>
            
            <div className="setting-nav">
                <ArrowBack style={{position: 'absolute', left: '0.8rem'}} />
                <p className="nav-title">我的资料</p>
            </div>

            <div className="setting-content">
                {renderItem()}
            </div>

            <div className="update-password">
                <p onClick={handleToOut}>退出登录</p>
                <p>修改密码</p>
            </div>

           
            <div className="setting-item submit">
                <p onClick={handleToSubmit}>保存修改</p>
            </div>
           

        </div>
    );
}

export default Setting;