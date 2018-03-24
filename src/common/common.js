/**
 * Created by zhang on 2017/4/12.
 */
import storage from './storage';
const getUrlParam = function () {
    const param = {};
    const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        if (value.indexOf('#') > 0) {
            value = value.split('#')[0];
        }
        param[key] = value;
    });
    return param;
};

const setDocumentTitle = function (title) {
    document.getElementsByTagName('title')[0].innerHTML = title;
};

const getLastParam = function () {
     const urlParams = location.href.split('/');
     const lastParam = urlParams[urlParams.length - 1];
     if (lastParam.indexOf('?')) {
         return lastParam.split('?')[0];
     }
     return lastParam;
}

// 手机正则
const MOBILE_REG = /^1[35789]\d{9}$/;

const validatorIsTel = function (tel) {
    return MOBILE_REG.test(tel);
};

// 改变

export default {
    getLocalTel() {
        return storage.local.getItem('tel');
    },
    setLocalTel(val) {
        storage.local.setItem('tel', val);
    },
    getLocalOpenId() {
        return storage.local.getItem('openId');
    },
    setLocalOpenId(val) {
        storage.local.setItem('openId', val);
    },
    getSessionOrderId() {
        return storage.session.getItem('orderId');
    },
    setSessionOrderId(val) {
        storage.session.setItem('orderId', val);
    },
    getSessionIsBindTel() {
        return storage.session.getItem('isBindTel');
    },
    setSessionIsBindTel(val) {
        storage.session.setItem('isBindTel', val);
    },
    getSessionIsAttention() {
        return storage.session.getItem('isAttention');
    },
    setSessionIsAttention(val) {
        storage.session.setItem('isAttention', val);
    },
    getCode() {
        return this.getUrlParam().code;
    },
    getOrderId() {
        return this.getUrlParam().orderId;
    },
    getId() {
        return this.getUrlParam().id;
    },
    getUrlParam,
    getLastParam,
    validatorIsTel,
    setDocumentTitle,
}
