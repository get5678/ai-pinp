import http from './http';

// 上传图片
export const upload = (data) => {
    return http.post('upload', data);
}

export const test = () => {
    return http.get('test')
}

// user register
export const register = data => {
    return http.post('register', data);
}

// user register
export const login = data => {
    return http.post('login', data);
}

export const getlist = (params) => {
    return http.get('getlist', params);
}