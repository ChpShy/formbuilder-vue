import {Message} from 'iview'

export const validateList = {
    mobile: '^[1][3,4,5,7,8][0-9]{9}$'
};

export function random_string(len) {
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

//生成文件上传的参数
export function getUploadFileParams(file, fileDirName) {
    function get_suffix(filename) {
        var pos = filename.lastIndexOf('.')
        var suffix = '';
        if (pos != -1) {
            suffix = filename.substring(pos)
        }
        return suffix;
    };
    if (!fileDirName) {
        fileDirName = 'components/formBuilder/';
    }
    var date = new Date(),
        month = (date.getMonth() + 1).toString().length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
        day = date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate(),
        fileUrl = fileDirName + date.getFullYear() + month + day + '/' + random_string(10) + date.getTime() + get_suffix(file.name),
        dateOver = new Date(date.getTime() + 5 * 60 * 1000),
        policyText = {
            "expiration": dateOver.toISOString(), //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
            "conditions": [
                ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
            ]
        },
        policyBase64 = Base64.encode(JSON.stringify(policyText)),
        bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, process.env.ACCESSKEY, {asBytes: true}),
        signature = Crypto.util.bytesToBase64(bytes);
    return {
        key: fileUrl,
        policy: policyBase64,
        success_action_status: '200',
        OSSAccessKeyId: process.env.ACCESSID,
        signature: signature
    }
}

/* json 字母排序转成字符串 */
export function sortByKey(obj) {
    if (!obj) {
        return {};
    }
    var newObj = {};
    var sortKeys = Object.keys(obj).sort(function (key1, key2) {
        return key1 > key2 ? 1 : -1;
    });
    sortKeys.forEach(v => {
        if(obj[v] != null) {
            newObj[v] = obj[v];
        }
        /*if (obj[v] && Object.prototype.toString.call(obj[v]) === '[object Object]') {
            newObj[v] = sortByKey(obj[v]);
        } else {
            if(obj[v] != null) {
                newObj[v] = obj[v];
            }
        }*/
    });
    return newObj;
}

export function checkTableHtml(tableDom) {
    var allManifestNode = tableDom.querySelectorAll('[name]'), flag = true;
    if (allManifestNode) {
        allManifestNode.forEach(v => {
            var manifest = v.getAttribute('name'),
                desc = v.getAttribute('desc'),
                manifestNodes = tableDom.querySelectorAll('[manifest="' + manifest + '"]'),
                manifestLen = manifestNodes.length;
            //校验变量名是否重复
            if (manifestLen > 1) {
                Message.error('变量名：' + desc + '重复，建议删了重新拖');
                if(flag) {
                    flag = false;
                }
            }
            if(v.type === 'checkbox' || v.type === 'radio') {
                var divNodeLen = tableDom.querySelectorAll('div[manifest="' + manifest + '"]');
                if(divNodeLen.length === 0) {
                    Message.error('变量名：' + manifest + '的生成有问题，建议删了选项框重新拖');
                    console.log(v);
                    if(flag) {
                        flag = false;
                    }
                }else {
                    var inputNodes = divNodeLen[0].querySelectorAll('input[type="checkbox"]'), values = [];
                    inputNodes.forEach(checkDom => {
                        var value = checkDom.value;
                        if (values.indexOf(value) > -1) {
                            Message.error('变量名：' + desc + '的选项框的枚举值：' +
                                value + '重复，建议删了选项框重新拖');
                            if(flag) {
                                flag = false;
                            }
                        } else {
                            values.push(value);
                        }
                    });
                }
            }
        });
    }
    return flag;
}