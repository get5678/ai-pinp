import axios from 'axios';

const baseUrl = 'http://127.0.0.1:7001/';

const http = {};

const result = (resolve, reject, res) => {
    let data = res.data;
    if (data.code === 0) {
        resolve(data);
    } else {
        reject(data);
    }
}

http.get = url => {
    return new Promise((resolve, reject) => {
        // axios.defaults.headers.common['token'] = localStorage.getItem('token');
        axios({
            method: 'get',
            url: baseUrl + url
        }).then((res) => {
            result(resolve, reject, res);
        }).catch((err) => {
            reject(err);
        })
    })
}


http.post = (url, data) => {

    return new Promise((resolve, reject) => {
        // axios.defaults.headers.common['token'] = localStorage.getItem('token');

        let contentType = url === 'upload' ? 'multipart/form-data' : 'application/x-www-form-urlencoded';

        axios({
            method: 'post',
            url: baseUrl + url,
            headers: { 'Content-Type': contentType },
            data
        }).then(res => {
            result(resolve, reject, res);
        }).catch(err => {
            reject(err);
        })
    })
}


export default http;