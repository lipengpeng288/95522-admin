import axios from 'axios';


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 15000;
axios.interceptors.request.use((config) => {
    return config;
})


axios.interceptors.response.use((response) => {
    if (response.status === 200) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(response);
    }
}, (error) => {

})

export default {
    post(url: string, data: any) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'post',
                    url,
                    data,
                })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    },

    get(url: string, data: any) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'get',
                    url,
                    params: data,
                })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}