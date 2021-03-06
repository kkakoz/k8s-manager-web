import axios from 'axios';
import {
    showMessage
} from "./status"; // 引入状态码文件
import { message } from 'ant-design-vue';
// 设置接口超时时间
axios.defaults.timeout = 60000;

axios.defaults.baseURL = "http://172.19.94.246:9010/api";
// import.meta.env.VITE_API_DOMAIN;

//http request 拦截器
axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem("user:token")
        if (token) {
            config.headers = {
                'Content-Type': 'application/json;charset=UTF-8', // 传参方式json
                "X-Authorization": token // 这里自定义配置，这里传的是token
            };
        } else {
            config.headers = {
                'Content-Type': 'application/json;charset=UTF-8', // 传参方式json
            };
        }
        let localNs = localStorage.getItem("namespace")

        if (localNs) {
            config.headers.Namespace = localNs
        }
        

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// http response 拦截器
axios.interceptors.response.use(
//     (response) => {
//     if (response.status == 200) {
//         return Promise.resolve(response);
//     } else {
//         return Promise.reject(response);
//     }
// }
    response => {
        // return response
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        return Promise.resolve(response.data);
    },
    error => {
        const {
            response
        } = error;
        if (response) {
            if (response.data.msg) {
                message.error(response.data.msg)
                return Promise.reject(response.data);
            } else {
                message.error(showMessage(response.status))
                return Promise.reject(response.data);
            }
            // if (response.data.msg)
            // return Promise.resolve(response.data.msg);
        } else {
            console.log("err", error)
            message.error("网络连接异常,请稍后再试!")
            return Promise.reject();
        }
    }
);

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    })
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    });
}

export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    });
}

export function del(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {data: params})
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    });
}
