import http from './http';

// 上传图片
export const upload = (data) => {
    return http.post('upload', data);
}

export const test = () => {
    return http.get('test')
}