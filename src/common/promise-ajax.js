/**
 * Created by zhang on 2017/5/5.
 */
import axios from 'axios';

const instance = axios.create();

let cancels = [];

// 初始化 设置钩子函数
let _before, _error, _success, _complete;
export function init({
                         before = function () {

                         }, error = function () {

                         }, success = function () {

                         }, complete = function () {

                         }
                     }) {
    _before = before;
    _error = error;
    _success = success;
    _complete = complete;
}


// function setOptions(axiosInstance) {
//     axiosInstance.interceptors.request.use(function (config) {
//         //在发送请求之前做某事
//         _before();
//         return config;
//     }, function (error) {
//         //请求错误时做些事
//         // _error(error)
//         _complete();
//         return Promise.reject(error);
//     });
//
//     axiosInstance.interceptors.response.use(function (response) {
//         _success();
//         _complete();
//         return response;
//     }, function (error) {
//         _complete();
//         _error(error);
//         return Promise.reject(error);
//     });
// }
// setOptions(instance);
function fetch(url, data, method, options = {},) {
    let {successTip = false, errorTip = method === 'get' ? '获取数据失败!' : '操作失败', globeHandle = true } = options;
    const CancelToken = axios.CancelToken;
    let cancel;
    let axiosInstance = instance;
    if (globeHandle) {
        _before();
    }
    const fetchPromise = new Promise((resolve, reject) => {
        axiosInstance({
            method,
            url,
            data,
            cancelToken: new CancelToken(c => cancel = c),
            ...options,
        }).then(response => {
            if (globeHandle) {
                _success(successTip);
                _complete();
            }
            resolve(response)
        }).catch(err => {
            const isCanceled = err && err.message && err.message.canceled;
            if (globeHandle) {
                _error(err);
                _complete();
            }
            if (isCanceled) return;// 如果是用户主动cancel，不做任何处理，不会触发任何函数
            reject(err)
        });
    });


    fetchPromise.cancel = function () {
        return cancel({
            canceled: true,
        })
    };
    cancels.push(function () {
        return cancel({
            canceled: true,
        })
    });

    return fetchPromise;
}

export function get(url, params, options) {
    return fetch(url, params, 'get', options);
}

export function post(url, params, options) {
    return fetch(url, params, 'post', options);
}

export function put(url, params, options) {
    return fetch(url, params, 'put', options);
}

export function del(url, params, options) {
    return fetch(url, params, 'delete', options);
}

export function all(allRequest) {
    return new Promise(resolve, reject => {
        axios.all(allRequest).then(axios.spread((args) => {
            resolve(args);
        }))
    })
}
/**
 * 发送新的相同url的get请求，历史未结束相同url请求就会被打断，同一个url请求，最终只会触发一次
 * 用于输入框，根据输入远程获取提示等场景
 *
 * @param {string} url 请求路径
 * @param {object} [params] 传输给后端的数据
 * @param {object} [options] axios 配置参数
 * @returns {Promise}
 */
const singleGets = {};
export function singleGet(url, params, options) {
    const oldFetch = singleGets[url];
    if (oldFetch) {
        oldFetch.cancel();
    }
    const singleFetch = fetch(url, params, 'get', options);
    singleGets[url] = singleFetch;
    return singleFetch;
}
// 表单多次发送只选取第一次
const singlePosts = {};
export function singlePost(url, params, options) {
    const oldFetch = singlePosts[url];
    if (oldFetch) {
        return false;
    }
    const singleFetch = fetch(url, params, 'post', options);
    singlePosts[url] = singleFetch;
    return singleFetch;
}

// 取消所有的未完成的请求
export function cancelAllPromises() {
    cancels.forEach((item) => {
        item();
    });
    cancels = [];
}

// 请求完成时 默认清除singlePosts和 singleGets
function clearSingleObj(url, method) {
    if(method === 'get') {
        delete singleGets[url];
    } else if (method === 'post') {
        delete singlePosts[url];
    } else {
        return false;
    }
}

