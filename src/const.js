export const IMAGE = "./images/";


export const IMAGE_TITLE = `${IMAGE}aipin.png`
export const IMAGE_TITLE_WHITE = `${IMAGE}aipin-white.png`
export const IMAGE_PHONE = `${IMAGE}phone.png`
export const IMAGE_USER = `${IMAGE}user.png`
export const IMAGE_LOVE = `${IMAGE}love.png`
export const IMAGE_ARROW = `${IMAGE}arrow.png`
export const IMAGE_LOCK = `${IMAGE}lock.png`
export const IMAGE_CAPTCHA = `${IMAGE}captcha.png`
export const IMAGE_EYECLOSED = `${IMAGE}eye.png`
export const IMAGE_EYEOPEND = `${IMAGE}eye_open.png`
export const IMAGE_LOADING = `${IMAGE}loading.png`
export const IMAGE_SUCCESS = `${IMAGE}success.png`
export const IMAGE_SUCCESS_PINK = `${IMAGE}success_person.png`
export const IMAGE_ERROR = `${IMAGE}error.png`
export const IMAGE_INDEX1 = `${IMAGE}test2.png`
export const IMAGE_EDIT = `${IMAGE}edit.png`
export const IMAGE_SPLICE = `${IMAGE}scissors.png` // 剪刀
export const IMAGE_MINE = `${IMAGE}mine.png`
export const IMAGE_VIDEO = `${IMAGE}movie.png`
export const IMAGE_PEN = `${IMAGE}pen.png`
export const IMAGE_BRIGHTNESS = `${IMAGE}brightness.png`
export const IMAGE_TRIANGLE = `${IMAGE}triangle.png`  //三角形。锐化
export const IMAGE_PALETTE = `${IMAGE}palette.png`  //   调色板
export const IMAGE_RATIO = `${IMAGE}ratio.png` // 对比
export const IMAGE_ADAPT = `${IMAGE}adapt.png`
export const IMAGE_THREE = `${IMAGE}three.png`
export const IMAGE_ONE = `${IMAGE}one.png`
export const IMAGE_FOUR = `${IMAGE}four.png`
export const IMGAE_GLASSES = `${IMAGE}glasses.png`


export const IMAGE_EXAMPLE1 = `${IMAGE}example1.jpeg` // 拼图模版例子1
export const IMAGE_EXAMPLE2 = `${IMAGE}example2.png` 
export const IMAGE_EXAMPLE3 = `${IMAGE}example3.jpeg` // 例子3
export const IMAGE_EXAMPLE4 = `${IMAGE}example4.png`
export const IMAGE_EXAMPLE5 = `${IMAGE}example5.jpeg`
export const IMAGE_EXAMPLE6 = `${IMAGE}example6.jpeg`

const findNode = (oriObj, num) => {

    let stack = [];
    let result = [];
    let floor = 0;
    let flag = false;

    stack.push(oriObj);

    while(stack.length > 0 && !flag) {

        // 取顶端的数据
        let node = stack.pop();

        let res = Object.assign({}, {
            departmentId: node.departmentId,
            departmentName: node.departmentName
        })


        if (node?.departmentId === num) {

            result = stack;
            flag = true;
        }else {
            // 存在子节点
            if (node?.subDepartment && node?.subDepartment.length > 0) {
                stack.push(node.subDepartment[0]);
            } else {
                // 没有找到该num
                result = null;
                flag = true;
            }
        }
    }
    console.log('result', result);
    return result;
}

const test = (data, filterArr) => {

    // 递归循环
    for (let i = 0; i < filterArr.length; i++) {
        findNode(data, filterArr[i]);
    }
}