import React, { useState } from 'react';
import Back from '../../components/ArrowBack';
import FormAll, { Item } from '../../components/Form';

import Toast from '../../components/Toast';
import { isNotNull } from '../../utils';

import './index.scss';

import { register } from '../../api';

const formType = {
    captcha: '验证码',
    password: '密码',
    repeatpassword: '确认密码',
    phone: '手机号'
}

function Register(props) {

    const [registerData, setRegisterData] = useState({});

    
    const formData = {};

    const handleToSubmit = () => {   

        let flag = true;
        console.log('formada', formData)

        if (!isNotNull(formData)) {
            Toast.info('请填写完整信息')
        }


        for (let key in formData) {
           
            if (formData[key] === false) {
                flag = false;
                if (key === 'repeatpassword') {
                    Toast.info('请重新确认密码')
                } else if (key === 'password') {
                    Toast.info('密码不得小于6位数')
                } else {
                    Toast.info(`请重新输入${formType[key]}`);
                }
            }
        }


        if (flag === true && isNotNull(formData)) {
           
            // 这里上传数据

            const info = {
                phone: formData.phone,
                password: formData.password
            }

            register(info).then(res => {
                if (res.code === 200) {
                    // 注册成功后跳转到登录页面
                    Toast.dialog({
                        title: '注册成功',
                        content: '即将跳往登录界面',
                        onSubmit: () => {
                            props.history.push('/login');
                        }
                    })
                }
            }).catch(err => console.log('err', err))
        }
    }

    return (
        <div className="register-container">
            <Back style={{position: 'relative', top: '4rem', left: '1.2rem', width: '4rem', height: '4rem'}} />

            <FormAll>
               
                <Item type="phone" placeholder="请输入手机号码" prefix="+86" value={formData}/>
                <Item type="password" placeholder="请输入密码" open={false} value={formData}/>
                <Item type="password" placeholder="请确认密码" open={false} value={formData} twice/>
                <Item type="captcha" placeholder="验证码" value={formData}/>
                <Item 
                    type="button" 
                    style={{ position: 'relative', top: '10rem' }} 
                    onClick={handleToSubmit}
                >
                    确认
                </Item>

            </FormAll>
            
        </div>
    );
}

export default Register;