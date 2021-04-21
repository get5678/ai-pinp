import { Switch, useLocation } from 'react-router';
import { PH, PS } from './components/Form/const';

// 防抖，短时间多次触发，只执行一次
export const debounce = (fn, delay) => {
    let timer = null;

    return function() {
        let _this = this;
        let arg = arguments;

        if (timer) clearTimeout(timer);
       
        timer = setTimeout(() => {
            fn.apply(_this, arg);
        }, delay);
    }
}

// 节流, 在delay时间内多次触发，只执行一次
// apply接数组。 call接列表
export const throttle = (fn, delay) => {

    let start = 0;
    let timer = null;

    return function() {

        let _this = this;
        let arg = arguments;
        let end = +new Date();

        if (end - start < delay) {
            
            clearTimeout(timer);
            timer = setTimeout(() => {
                start = end;
                fn.apply(_this, arg);
                
            }, delay);
        } else {
            start = end;
            fn.apply(_this, arg);
        }
    }
}


// 验证
export const validate = (value, type, pattern) => {
    switch(type) {
        case PH:
            const ph_pattern = /^1[3-9]\d{9}$/;

            return ph_pattern.test(value);

        default:
            return pattern.test(value);
    }
}

// 判断数组，对象，是否为空
export const isNotNull = (arg) => {
    let str = Object.prototype.toString.call(arg);
    switch(str) {
        case "[object Object]":

            return Object.keys(arg)?.length > 0;
        case "[object Array]":
            return arg.length > 0;
        
        default:
            return arg;
    }
}


// 将file对象生成base64编码
export const  fileReader = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = e => {
            console.log('res', e.target.result)
            resolve(e.target.result);
        }

        reader.onerror = reject;

        reader.readAsDataURL(file);
    })
}

// 返回url参数
export const UrlParmas = () => {
    const objUrl = {};
    const location = window.location?.search;

    if (location) {
        let searchArr = location.split('?')[1].split('&');
        for (let i = 0; i < searchArr.length; i++) {
            let res = searchArr[i].split('=');
            objUrl[res[0]] = res[1];
        }
    }

    return objUrl;
}