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

// 判断类型
export const isType = (data, type) => {
    return Object.prototype.toString.call(data) === type;
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

  /**
     * HSL颜色值转换为RGB.
     * 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
     * h, s, 和 l 设定在 [0, 1] 之间
     * 返回的 r, g, 和 b 在 [0, 255]之间
     *
     * @param   Number  h       色相
     * @param   Number  s       饱和度
     * @param   Number  l       亮度
     * @return  Array           RGB色值数值
     */
   export function hslToRgb(h, s, l){
    let r, g, b;

    if(s === 0){
        r = g = b = l; // achromatic
    }else{
        let hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
/**
* RGB 颜色值转换为 HSL.
* 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
    * r, g, 和 b 需要在 [0, 255] 范围内
* 返回的 h, s, 和 l 在 [0, 1] 之间
*
* @param   Number  r       红色色值
* @param   Number  g       绿色色值
* @param   Number  b       蓝色色值
* @return  Array           HSL各值数组
*/
export function rgbToHsl(r, g, b){

    r /= 255;
    g /= 255; 
    b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max === min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            default: break;
        }
        h /= 6;
    }
    return [Math.floor(h*100), Math.round(s*100), Math.round(l*100)];
}

// arr: rgb数组

export function rgb2hsv (arr) {

        let rr;
    
        let gg;
    
        let bb;
    
        let r = arr[0] / 255;
    
        let g = arr[1] / 255;
    
        let b = arr[2] / 255;
    
        let h;
    
        let s;
    
        let v = Math.max(r, g, b);
    
        let diff = v - Math.min(r, g, b);
    
        let diffc = function (c) {
    
            return (v - c) / 6 / diff + 1 / 2;
    
        };
    
        if (diff === 0) {
    
            h = s = 0;
    
        } else {
    
            s = diff / v;
    
            rr = diffc(r);
    
            gg = diffc(g);
    
            bb = diffc(b);
    
            if (r === v) {
    
                h = bb - gg;
    
            } else if (g === v) {
    
                h = (1 / 3) + rr - bb;
    
            } else if (b === v) {
    
                h = (2 / 3) + gg - rr;
    
            }
    
            if (h < 0) {
    
                h += 1;
    
            } else if (h > 1) {
    
                h -= 1;
    
            }
    
        }
    
        return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)]
    
    }
    
    // 从HSV到RGB的转换
    
    // 转换的公式
    
    // 给定在HSV中 (h, s, v)值定义的一个颜色，带有如上的变化于0到360之间的h，和分别表示饱和度和明度的变化于0到1之间的s和v，在RGB空间中对应的 (r, g, b)三原色可以计算为（R,G,B变化于0到1之间）：
    
    // image-20210315233245933
    
    // javascript实现代码
    
  export  function hsv2rgb (hsv) {
    
        let _l = hsv[0];
    
        let _m = hsv[1];
    
        let _n = hsv[2];
    
        let newR;
    
        let newG;
    
        let newB;
    
        if (_m === 0) {
    
            _l = _m = _n = Math.round(255 * _n / 100);
    
            newR = _l;
    
            newG = _m;
    
            newB = _n;
    
        } else {
    
            _m = _m / 100;
    
            _n = _n / 100;
    
            let p = Math.floor(_l / 60) % 6;
    
            let f = _l / 60 - p;
    
            let a = _n * (1 - _m);
    
            let b = _n * (1 - _m * f);
    
            let c = _n * (1 - _m * (1 - f));
    
            switch (p) {
    
                case 0:
    
                    newR = _n; newG = c; newB = a;
    
                    break;
    
                case 1:
    
                    newR = b; newG = _n; newB = a;
    
                    break;
    
                case 2:
    
                    newR = a; newG = _n; newB = c;
    
                    break;
    
                case 3:
    
                    newR = a; newG = b; newB = _n;
    
                    break;
    
                case 4:
    
                    newR = c; newG = a; newB = _n;
    
                    break;
    
                case 5:
    
                    newR = _n; newG = a; newB = b;
    
                    break;
    
            }
    
            newR = Math.round(255 * newR);
    
            newG = Math.round(255 * newG);
    
            newB = Math.round(255 * newB);
    
        }
    
        return [newR, newG, newB]
    
    }
    
    // 实现亮度的调整
    
    // DEMO地址
    
    // 下面的代码是实现降低图片50%亮度的实现
    
    // <body>
    
    //   <img src="./pic.jpg" id="pic">
    
    //   <canvas id="canvas" width="200" height="273"></canvas>
    
    // </body>
    
    // const pic = document.querySelector('#pic')
    
    // const canvas = document.querySelector('#canvas')
    
    // const ctx = canvas.getContext('2d')
    
    // ctx.drawImage(pic, 0, 0, 200, 273);
    
    // const imgData = ctx.getImageData(0, 0, 200, 273)
    
    // // 降低50%的亮度
    
    // ctx.putImageData(changeLuminance(imgData, -0.5), 0, 0)
    
    // 修改图片亮度, imgdata为从canvas获取到的rgba数组，value为需要增加或减少的亮度值（0~1）
    
   export  function changeLuminance (imgdata, value) {
    
        const data = imgdata.data
    
        for (let i = 0; i < data.length; i+=4) {
    
            const hsv = rgb2hsv([data[i], data[i + 1], data[i + 2]])
    
            hsv[2] *= (1 + value)
    
            const rgb = hsv2rgb([...hsv])
    
            data[i] = rgb[0];
    
            data[i + 1] = rgb[1];
    
            data[i + 2] = rgb[2];
    
        }
    
        return imgdata
    
    }


    /**
 * 卷积核应用
 *
 * @param    {array}   mat          卷积矩阵，一维数组表示
 * @param    {object}  imgData      要处理的imageData对象
 * @param    {number}  divisor      可选，对卷积后数值归一化系数，默认为1，
 * @param    {number}  order        可选，卷积核的阶数，默认为3
 * @returns  {object}  outputImg    处理后的imageData对象
 *
 */
export function conv(mat, imgData, order = 3, divisor = 1){
    imgData = imgData || this.getImageData();
    let data = imgData.data,
        w = imgData.width,
        h = imgData.height,
        outputImg = imgData,
        outData = outputImg.data,
        radius = Math.floor(order  / 2);
    //先遍历图片像素(x, y)
    for(let y = 0; y < h; y++){
        for(let x = 0; x < w; x++){
            //遍历r,g,b三通道，做一样的处理
            for(let z = 0; z < 3; z++){
                //中心点像素(x, y)在data中的索引
                let i = (y * w + x) * 4 + z;
                //边界处理使用最简单的方法，即不做处理
                if (x < radius || y < radius || x >= w - radius || y >= h - radius){
                    outData[i] = data[i];
                }
                //非边界处矩阵卷积
                else{
                    //卷积和
                    let convSum = 0,
                        matIndex = 0;
                    //遍历矩阵行
                    for (let m = -radius; m <= radius; m++ ){
                        //矩阵列 (x-m,y)
                        let rowIndex = i + w*4*m;
                        for (let n = -radius; n <= radius; n++){
                            //(x-m, y-n)
                            let colIndex = rowIndex + n*4;
                            convSum += mat[matIndex] * data[colIndex];
                            matIndex++;
                        }
                    }
                    outData[i] = convSum / divisor;
                }
            }
            // 设置透明度
            outData[(y * w + x) * 4 + 3] = 255;
        }
    }
    return outputImg;
}