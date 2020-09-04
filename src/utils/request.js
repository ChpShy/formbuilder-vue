import axios from 'axios';
import {Modal} from 'iview';
import {sortByKey} from '@/utils/utils';
// import md5 from 'js-md5'

// var requestUrls = {};
// 创建axios实例
const service = axios.create({
    baseURL:  process.env.BASE_API, // api的base_url
    timeout: 15000, // 请求超时时间
});
// request拦截器
service.interceptors.request.use(config => {
    if (process.env.NODE_ENV == 'development') {
        console.log(config);
    }
    config.method = config.type ? config.type : 'POST';
    if (config.reqType !== 'other') {
        // config.withCredentials = true;
        config.data = config.data ? config.data : {};
        /*if (store.getters.token) {
            config.headers['token'] = store.getters.token;
        }*/
      /*  var jsonStr = JSON.stringify(sortByKey(config.data)), timestamp = new Date().getTime().toString();
        config.headers['sign'] = md5(jsonStr + SIGNCODE[PLATFORM] + timestamp);
        config.headers['timestamp'] = timestamp;
        config.headers['systemCode'] = SYSTEMCODE[PLATFORM];
        config.headers['appId'] = APPID[PLATFORM];*/
        // config.headers['version'] = '1.0';
    }
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
    response => {
       /* var url = md5(response.config.url);
        requestUrls[url] = false;*/
        if (process.env.NODE_ENV == 'development') {
            console.log(response);
        }
        var xhr = response.data, code = xhr.code, reqDataObj;
        //文件上传
        if (response.config.reqType == 'other') {
            if (response.status === 200) {
                return response.data;
            }
        } else {
            if (response.config.data) {
                reqDataObj = JSON.parse(response.config.data);
            }
            //其他
            if (code == 200) {
                return xhr.content;
            } else if (code == 600) {
                return Promise.reject(xhr);
            } else {
                Modal.error({
                    title: '操作失败',
                    closable: true,
                    scrollable: true,
                    content: xhr.message
                });
                return Promise.reject(xhr);
            }
        }
    },
    error => {
        /*if(error.config) {
            var url = md5(error.config.url);
            requestUrls[url] = false;
            // store.dispatch('UpdateRequestUrls', [url, false]);
        }else {
            requestUrls = {};
        }*/
        Modal.error({
            title: '服务器异常',
            closable: true,
            content: '服务器异常，建议稍后重试'
        });
        return Promise.reject(error);
    }
);

export default function (options) {
    /*var url = options.reqType === 'other' ? options.url : process.env.BASE_API + options.url,
        flag = requestUrls[md5(url)];
    if(flag) {
        return null;
    }else {
        requestUrls[md5(url)] = true;
        return  service(options);
    }*/
    return  service(options);
};