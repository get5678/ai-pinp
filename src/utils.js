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
            resolve(e.target.result);
        }

        reader.onerror = reject;

        reader.readAsDataURL(file);
    })
}

// 将base64变为file
export const base64ToFile = (urlData, filename,  imageType = "image/png") => {

    let exp = new RegExp('base64');

    if (exp.test(urlData)) {
        urlData = urlData.split(',')[1];
    }

    let data = window.atob(urlData);

    let arraybuffer = new ArrayBuffer(data.length);

    let ia = new Int8Array(arraybuffer);

    for (let i = 0; i < data.length; i++) {
        ia[i] = data.charCodeAt(i);
    }
    //canvas.toDataURL 返回的默认格式就是 image/png
    // let blob = new Blob([ia], {
    //     type: imageType
    // });

    // blob.name = filename;

    let file = new File([ia], filename, {
        type: imageType
    });

    return file;
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

function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}
// weakMap key只能为object；
export function clone(target, map = new WeakMap()) {
    if (!target) return null;
    if(typeof target === 'object') {
        let isArray = Array.isArray(target);
        let cloneTarget = isArray ? [] : {};
        if(map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);
        let keys = isArray ? undefined : Object.keys(target);
        forEach(keys || target, (value, key) => {
            if (keys) {
                key = value;
            }
            cloneTarget[key] = clone(target[key], map);
        });
        return cloneTarget;
    } else {
        return target;
    }
}