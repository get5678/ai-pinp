export const IMAGE = "./images/";


export const IMAGE_TITLE = `${IMAGE}aipin.png`
export const IMAGE_TITLE_WHITE = `${IMAGE}aipin-white.png`
export const IMAGE_PHONE = `${IMAGE}phone.png`
export const IMAGE_USER = `${IMAGE}user.png`
export const IMAGE_LOVE = `${IMAGE}love.png`
export const IMAGE_LOVE_PINK = `${IMAGE}love_pink.png`
export const IMAGE_LOVE_FILL = `${IMAGE}love_fill.png`
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


export const IMAGE_BACK1 = `${IMAGE}back.jpeg`
export const IMAGE_ICON = `${IMAGE}icon.png`
export const IMAGE_SOCITY_TITILE = `${IMAGE}socity-title.png`
export const IMAGE_BACK2 = `${IMAGE}back2.jpeg`

// 亮度  锐化 对比度  色调  裁剪 滤镜

export const tabList = [
    {
        index: 0,
        title: '编辑',
        key: 'edit'
    },
    {
        index: 1,
        title: '裁剪',
        key: 'tailor'
    },
    {
        index: 2,
        title: '滤镜',
        key: 'filter'
    }
];

 export const editList = [
    {
        type: 'logo',
        img: IMAGE_PEN,
    },
    {
        type: 'brightness',
        text: '亮度',
        img: IMAGE_BRIGHTNESS,
        isClicked: true,
        value: 0
    },
    {
        type: 'triangle',
        text: '锐化',
        img: IMAGE_TRIANGLE,
        isClicked: false,
        value: 0
    },
    {
        type: 'ratio',
        text: '对比度',
        img: IMAGE_RATIO,
        isClicked: false,
        value: 0
    },
    {
        type: 'palette',
        text: '色调',
        img: IMAGE_PALETTE,
        isClicked: false,
        value: 0
    }
];

export const tailorList = [
    {
        type: 'logo',
        img: IMAGE_SPLICE,
        isClicked: false
    },
    {
        type: 'adapt',
        img: IMAGE_ADAPT,
        isClicked: false
    },
    {
        type: 'one',
        img: IMAGE_ONE,
        isClicked: false
    },
    {
        type: 'three',
        img: IMAGE_THREE,
        isClicked: false
    },
    {
        type: 'four',
        img: IMAGE_FOUR,
        isClicked: false
    }
];

export const filterList = [
    {
        type: 'logo',
        img: IMGAE_GLASSES,
        isClicked: false
    },
    {
        type: 'blackwhite',
        text: '黑白',
        isClicked: false,
    },
    {
        type: 'oildpainting',
        text: '油画',
        isClicked: false
    },
    {
        type: 'fupian', // ,
        text: '负片',
        isClicked: false,
    },
    {
        type: 'relief', // 
        text: '浮雕',
        isClicked: false   
    },
    {
        type: 'gaosi',
        text: '高斯',
        isClicked: false
    },
    {
        type: 'old',
        text: '怀旧',
        isClicked: false
    }
]