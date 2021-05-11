/* eslint-disable no-restricted-globals */

/**
 * 在react中使用webworker，会报错路径错误
 */



 const workerCode = () => {

    function heibai(imageData) {

        const data = imageData.data;
      
        for (let i = 0; i < data.length; i += 4) {
          const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = average;
          data[i + 1] = average;
          data[i + 2] = average;
        }
        return imageData;
    }
    
    function fudiao(imageData) {
        const data = imageData.data;
        const width = imageData.width
      
        for (let i = 0; i < data.length; i++) {
          //  不是最后一行像素
          if (i <= data.length - width * 4) {
      
            // 忽略alpha值
            if ((i + 1) % 4 !== 0) {
              // 如果是一行中的最后一组像素，复制前一个像素值
              if ((i + 4) % (width * 4) === 0) {
                data[i] = data[i - 4];
                data[i + 1] = data[i - 3];
                data[i + 2] = data[i - 2];
                data[i + 3] = data[i - 1];
                i += 4;
              } else {
                data[i] = 255 / 2
                  + 2 * data[i]
                  - data[i + 4]
                  - data[i + width * 4]
              }
            }
          } else {
            // 最后一行复制上一行像素
            if ((i + 1) % 4 !== 0) {
              data[i] = data[i - width * 4];
            }
          }
        }
        return imageData;
    }
    
    function fupian(imageData) {
        const data = imageData.data;
      
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
        return imageData
    }

      //2.怀旧效果     
    function old(canvasData)  {  
      for ( var x = 0; x < canvasData.width; x++) {  
        for ( var y = 0; y < canvasData.height; y++) {  
          
          // Index of the pixel in the array  
          var idx = (x + y * canvasData.width) * 4;  
          var r = canvasData.data[idx + 0];  
          var g = canvasData.data[idx + 1];  
          var b = canvasData.data[idx + 2];  
          
          var dr=.393*r+.769*g+.189*b;  
          var dg=.349*r+.686*g+.168*b;  
          var db=.272*r+.534*g+.131*b;  
          var scale=Math.random()*0.5 + 0.5;  
          var fr=scale*dr+(1-scale)*r;  
          scale=Math.random()*0.5 + 0.5;  
          var fg=scale*dg+(1-scale)*g;  
          scale=Math.random()*0.5 + 0.5;  
          var fb=scale*db+(1-scale)*b;  
          canvasData.data[idx + 0] = fr; // Red channel  
          canvasData.data[idx + 1] = fg; // Green channel  
          canvasData.data[idx + 2] = fb; // Blue channel  
          canvasData.data[idx + 3] = 255; // Alpha channel   
          // add black border  
          // if(x < 8 || y < 8 || x > (canvasData.width - 8) || y > (canvasData.height - 8)) {  
          //     canvasData.data[idx + 0] = 0;  
          //     canvasData.data[idx + 1] = 0;  
          //     canvasData.data[idx + 2] = 0;  
          // }
        }
      }  
      return canvasData;  
      } 
    
    
    function gaosi() {
    
    }
    
    function gaussBlur1(imgData, radius, sigma) {
        var pixes = imgData.data;
        var width = imgData.width;
        var height = imgData.height;
        var gaussMatrix = [],
          gaussSum = 0,
          x, y,
          r, g, b, a,
          i, j, k, len;
      
      
        radius = Math.floor(radius) || 3;
        sigma = sigma || radius / 3;
      
        a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
        b = -1 / (2 * sigma * sigma);
        //生成高斯矩阵
        for (i = 0, x = -radius; x <= radius; x++ , i++) {
          g = a * Math.exp(b * x * x);
          gaussMatrix[i] = g;
          gaussSum += g;
      
        }
        //归一化, 保证高斯矩阵的值在[0,1]之间
        for (i = 0, len = gaussMatrix.length; i < len; i++) {
          gaussMatrix[i] /= gaussSum;
        }
        //x 方向一维高斯运算
        for (y = 0; y < height; y++) {
          for (x = 0; x < width; x++) {
            r = g = b = a = 0;
            gaussSum = 0;
            for (j = -radius; j <= radius; j++) {
              k = x + j;
              if (k >= 0 && k < width) {//确保 k 没超出 x 的范围
                //r,g,b,a 四个一组
                i = (y * width + k) * 4;
                r += pixes[i] * gaussMatrix[j + radius];
                g += pixes[i + 1] * gaussMatrix[j + radius];
                b += pixes[i + 2] * gaussMatrix[j + radius];
                // a += pixes[i + 3] * gaussMatrix[j];
                gaussSum += gaussMatrix[j + radius];
              }
            }
            i = (y * width + x) * 4;
            // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
            // console.log(gaussSum)
            pixes[i] = r / gaussSum;
            pixes[i + 1] = g / gaussSum;
            pixes[i + 2] = b / gaussSum;
            // pixes[i + 3] = a ;
          }
        }
        //y 方向一维高斯运算
        for (x = 0; x < width; x++) {
          for (y = 0; y < height; y++) {
            r = g = b = a = 0;
            gaussSum = 0;
            for (j = -radius; j <= radius; j++) {
              k = y + j;
              if (k >= 0 && k < height) {//确保 k 没超出 y 的范围
                i = (k * width + x) * 4;
                r += pixes[i] * gaussMatrix[j + radius];
                g += pixes[i + 1] * gaussMatrix[j + radius];
                b += pixes[i + 2] * gaussMatrix[j + radius];
                // a += pixes[i + 3] * gaussMatrix[j];
                gaussSum += gaussMatrix[j + radius];
              }
            }
            i = (y * width + x) * 4;
            pixes[i] = r / gaussSum;
            pixes[i + 1] = g / gaussSum;
            pixes[i + 2] = b / gaussSum;
          }
        }
        //end
        imgData.data = pixes;
        return imgData;
      }

    this.onmessage = function(event) {
        let result;
        switch (event.data.type) {
            case 'relief':
                result = fudiao(event.data.imageData);
                break;
            case 'blackwhite':
                result = heibai(event.data.imageData);
                break;
            case 'fupian':
                result = fupian(event.data.imageData);
                break;
            case 'gaosi':
                result = gaussBlur1(event.data.imageData, 20);
                break;
            case 'test':
                result = 'hello world';
                break;
            case 'old':
                result = old(event.data.imageData);
                break;
            default:
            break;
        }
        self.postMessage({
            type: event.data.type,
            imageData: result
        });
    }
  };
  
  let code = workerCode.toString();
  code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));
  
  const blob = new Blob([code], { type: 'application/javascript'});
  const worker_script = URL.createObjectURL(blob);
  
  module.exports = worker_script;