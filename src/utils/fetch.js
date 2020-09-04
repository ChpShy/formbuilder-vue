import axios from 'axios';
import query from 'querystring';

var oproto = Object.prototype;
var serialize = oproto.toString;
var gxError = true;
var Rxports = {
	/**
	 * 地址host配置公用入口
	 *
	 * 10.252.252.26:9001
	 * 120.26.77.250:9001
	 * 121.40.177.106:9001"
	 * http://114.55.100.164:9001
	 * http://192.168.8.138:6060
	 * http://114.55.100.164:6060
	*/
	Host: "http://192.168.218.187:8080",
	/**
	  * 封装axios，						参数基本
	  * @param {String} type			请求的类型，默认post
	  * @param {String} url				请求地址
	  * @param {String} time			超时时间
	  * @param {Object} data			请求参数
	  * @param {String} dataType		预期服务器返回的数据类型，xml html json ...
	  * @param {Object} headers			自定义请求headers
	  * @param {Function} success
	  * 		请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
	  * @param {Function} error			发送请求前
	  * @param return 
	*/
	axios: function (opt){
		
		var opts = opt || {};
		var _this = this;
		if (!opts.url) {
			return false;
		};

		opts.data = opts.data?opts.data:{};

		//opts.data.token = window.localStorage.getItem('storagetoken');

		axios.post(opts.url, query.stringify(opts.data),{
			baseURL: Rxports.Host,
			headers: opts.headers || {'Content-Type': 'application/x-www-form-urlencoded'},
			timeout: opts.time || 100*1000,
			responseType: opts.dataType || 'json'
		}).then(function(res){

			var sRes = res.data,
				nResponseCode = res.data.code,
				sResponseMsg = res.data.msg
			;

			if(nResponseCode == 200) {
				if(opts.success){
					opts.success(sRes);
				}
			}else if(nResponseCode == 4030) {
				if(opts.limit){
					opts.limit(sRes);
				}
			}else {
				if(nResponseCode == 401) {
					if(opts.error && gxError) {
						gxError = false;
						opts.error(sRes);	
					};
					//document.getElementById("app").style.display = "none";
					window.localStorage.removeItem('storagetoken'); //清除数据
					setTimeout(function(){
						window.location.href = "../login.html"
					}, 1600);
				}else if(nResponseCode == 403) {
					if(opts.error && gxError) {
						gxError = false;
						opts.error(sRes);	
					};
				}else {
					if(opts.error) {
						opts.error(sRes);	
					};
				}
			};
		})
			
	}
};


export default Rxports;