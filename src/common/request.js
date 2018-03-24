/**
 * Created by zhang on 2017/4/20.
 */
import axios from 'axios';

let cancels = [];
///初始化 设置钩子函数
let _before, _error, _success, _complete;
export function init(options) {
   const defaultOptions = {

     before :function () {

     }, error : function () {

     }, success : function () {

     }, complete : function () {

     }
   };
   options = Object.assign({}, defaultOptions, options);
    _before = options.before;
    _error = options.error;
    _success = options.success;
    _complete = options.complete;
}

function handleError(err) {
    const isCanceled = err && err.message && err.message.canceled;
    if(isCanceled) return;
    _error(err);
}

function setOptions(axiosInstance) {
    axiosInstance.interceptors.request.use(function (config) {
        //在发送请求之前做某事
        _before();
        return config;
    }, function (error) {
        //请求错误时做些事
        // _error(error)
        _complete();
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(function (response) {
        _success();
        _complete();
        return response;
    }, function (error) {
      if (error.message.cancel) return;
        _complete();
        handleError(error);
        return Promise.reject(error);
    });
}


export function fetch(options = {}) {
    let {globalHandle = true} = options;
    const CancelToken = axios.CancelToken;
    const instance = axios.create({
        cancelToken: new CancelToken(function executor(c) {
            /*一个执行器函数接收一个取消函数作为参数*/
            cancels.push(c);
        })
    });
    if (globalHandle) {
        setOptions(instance);
    }
    return instance;
};

export function cancelFetches() {
    cancels.forEach((cancel) => {
        cancel({canceled: true,});
    });
    cancels = [];
}

