import React from 'react';

import Back from '../../components/ArrowBack';
import FormAll, { Item } from '../../components/Form';
import Toast from '../../components/Toast';
import { isNotNull, debounce } from '../../utils';

import './index.scss';


const formType = {
    captcha: '验证码',
    password: '密码',
    repeatpassword: '确认密码',
    phone: '手机号'
}

function Login(props) {


    const formData = {};

    const handleToSubmit = () => {   

        let flag = true;

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

            Toast.info('登录成功');
           
            // 这里上传数据

            // 登录成功后跳转到首页
            
           
        }
    }

    const handleToRegister = debounce(() => {
        props.history.push('/register')
    }, 300)

    return (
    <div className="login-container">
        <Back style={{position: 'relative', top: '4rem', left: '1.2rem', width: '4rem', height: '4rem'}} />

        <FormAll>
           
            <Item type="phone" placeholder="请输入手机号码" prefix="+86" value={formData}/>
            <Item type="password" placeholder="请输入密码" open={false} value={formData}/>
            <Item type="captcha" placeholder="验证码" value={formData}/>
            <Item 
                type="button" 
                style={{ position: 'relative', top: '10rem' }} 
                onClick={handleToSubmit}
            >
                确认
            </Item>

        </FormAll>

        <div className="extral-bottons">
            <button onClick={handleToRegister}>注册账号</button>
            <button>忘记密码</button>
        </div>
    </div>
    );
}

export default Login;