import http from './http';

// 上传图片
export const upload = (data) => {
    return http.post('upload', data, true);
}

export const upvideo = data => {
    return http.post('upvideo', data, true);
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

export const addwork = data => {
    return http.post('addwork', data, true);
}

export const updateUser = data => {
    return http.post('updateuser', data, true);
}