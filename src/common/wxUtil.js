/**
 * Created by zhang on 2017/4/12.
 */
import config from '../config';
import common from './common';
import axios from 'axios';

const appid = config[process.env.NODE_ENV].weiXin.appID;
// const domain = config[process.env.NODE_ENV].domain;


/**
 * 第一步
 * 微信授权,获得code, 需要从url里取出
 */
const getWeiXinCode = function(url) {
    const config = {
        appid: appid,
        //授权后重定向的回调链接地址
        redirect_uri: url,
        //返回类型code， 继续可获得 openId
        response_type: 'code',
        //授权页面必须为snsapi_userinfo，可通过openid拿到昵称、性别、所在地
        //snsapi_base不弹出授权页面，直接跳转，只能获取用户openid
        scope: 'snsapi_base',
        state: 'STATE'
    };
    location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize' +
        '?' + $.param(config) + '#wechat_redirect';
};

/**
 * 第二步
 * 获取 OpenId 和 access_token
 * @param code 微信授权获得的code
 * @param callback  注意数据是json串
 */
const getWeiXinOpenId = function(to, from, next, callback) {
    const code = common.getCode();
    if (!code) {
        const href = location.href;
        return getWeiXinCode(href);
    }
    axios.get(`/album/wechat/login?code=${code}`,).then(function (res) {
        const openId = res.data.data;
        if (openId == '无效code') {
            return alert(1111111111);
        }
        common.setLocalOpenId(openId);
        if (callback) {
            callback(to, from, next);
        }
    }).catch(function (err) {
        console.log(err);
    });

};


// 微信配置获取api
const wxConfig = function () {
    const href = window.location.href;
    // axios({
    //     method: 'post',
    //     url: `/lepro/admin/userWechat/ticket?url=${href}`,
    // }).then(data => {
    //     data = JSON.parse(data)
    //     wx.config({
    //         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //         appId: 'wx11ecf4c4c2a986e1', // 必填，公众号的唯一标识
    //         timestamp: 1491884951, // 必填，生成签名的时间戳
    //         nonceStr: '123456', // 必填，生成签名的随机串
    //         signature: 'b16bf41746246d511368ee12215faa3811b5d1da',// 必填，签名，见附录1
    //         jsApiList: ['startRecord', 'stopRecord', 'uploadVoice', 'chooseImage', 'uploadImage', 'playVoice', 'onVoicePlayEnd'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //     });
    // }).catch(err=> {
    //     console.log(err, '000');
    // });
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx57694f856ff385d9', // 必填，公众号的唯一标识
        timestamp: 1488269863, // 必填，生成签名的时间戳
        nonceStr: '123456', // 必填，生成签名的随机串
        signature: '01f7a1a6e4f2e77a186576b6887639eadbd5d4aa',// 必填，签名，见附录1
        jsApiList: ['startRecord', 'stopRecord', 'uploadVoice', 'chooseImage', 'uploadImage', 'playVoice', 'onVoicePlayEnd'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
};


export default {
    getWeiXinOpenId,
    wxConfig
}





