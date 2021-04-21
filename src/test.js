// 通过FileReader把图片转化为base64图像编码
const  fileReader = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = e => {
            resolve(e.target.result);
        }

        reader.onerror = reject;

        reader.readAsDataURL(file);
    })
}

// 创建Image对象，给src赋值为fileReader读取的base64结果，
// 然后同样在Image的onload方法中处理图片压缩
const compress = res => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = (e) => {
            let originWidth = e.target.width;
            let originHeight = e.target.height;

            let targetWidth = originWidth, targetHeight = originHeight;
            // 图片尺寸超过400x400的限制

            if (originWidth > maxWidth || originHeight > maxHeight) {
                if (originWidth / originHeight > maxWidth / maxHeight) {
                    // 更宽，按照宽度限定尺寸
                    targetWidth = maxWidth;
                    targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                } else {
                    targetHeight = maxHeight;
                    targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                }
            }



            // 这里压缩
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');

            // canvas对图片进行缩放
            canvas.width = targetWidth;
            canvas.height = targetHeight;

            // 清除画布
            context.clearRect(0, 0, targetWidth, targetHeight);
            // 图片压缩
            context.drawImage(img, 0, 0, targetWidth, targetHeight);

            if (fileType === 'base64') {
                const dataUrl = canvas.toDataURL(imageType);
                resolve(dataUrl);
            } else {
                // ios不支持tob
                if (canvas.toBlob) {
                    canvas.toBlob(blob => {
                        resolve(blob);
                    }, imageType);
                }else {
                    let data = canvas.toDataURL(imageType);
                    data = data.split(',')[1];
                    data = window.atob(data);
                    let ia = new Uint8Array(data.length);
                    for (let i = 0; i < data.length; i++) {
                        ia[i] = data.charCodeAt(i);
                    }
                    //canvas.toDataURL 返回的默认格式就是 image/png
                    let blob = new Blob([ia], {
                        type: imageType
                    });
                    resolve(blob);
                }
            }

        }

        img.onerror = () => {
            reject(new Error('图片加载失败'));
        }
        img.src = res;
    })
}

const handleToChange = async(e) => {
    let files = e.target.files;
    const len = files.length;
    let newFiles = [];

    for (let i = 0; i < len; i++) {
        const res = await fileReader(files[i]);
        
        const data =  await compress(res);
        newFiles.push(data);
    }

    console.log('newFiles:', newFiles)

}