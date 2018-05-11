import { Toast } from 'antd-mobile';

/* 屏幕适配 */
(function (doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			var clientWidth = docEl.clientWidth;
			if (clientWidth >= 750) {
				clientWidth = 750;
			};
			if (!clientWidth) return;
			docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

/* 补零 */
export const appendZero = (n) => {
    return n >= 10 ? ('' + n) : ('0' + n);
};

export const moli = {
    // 全局请求url
    G_COMMON_URL: "http://molicloud.app.yyuap.com/moli/",
    // 添加Header信息
    getDeviceidAndToken: () => {
        let deviceId = summer.getDeviceInfo().deviceid;
		let userinfo = summer.getStorage("userinfo");
		let token = userinfo ? userinfo.token : "";
		let memberId = userinfo ? userinfo.id : "";
		return {
			"deviceId": deviceId,
            "token": token,
            "code": memberId
		}
    },
    // Token失效处理
	tokenInvalid: () => {
	    // 设置token标志
	    summer.setStorage("G-TOKEN-ERROR", true);
	    // 清除userinfo，直接退出之后，再进入可以直接跳入到登录
	    summer.setStorage("userinfo", "");
	    // 清除密码
	    let userAccount = summer.getStorage('account');
	    userAccount.password = '';
	    summer.setStorage("account", userAccount);
	    // 退出有信
	    im.logout({});
	    // 退出emm
	    emm.logout({});
	    summer.initializeWin({
	        id: 'login',
	        url: 'comps/login/index.html',
	        toId: 'homePage'
	    });
    },
    // Token过期处理
	tokenExpire: () => {
		let account = summer.getStorage('account') ? summer.getStorage('account').account : '';
		let password = summer.getStorage('account') ? summer.getStorage('account').password : '';
		moli.ajaxRequest({
			type : "post",
			url : "/auth/login",
			param : {
				userName : account,
				password : password
			},
			unLoading: true
		}, function (res) {
			if (res.flag == 0) {
				moli.userinfo = summer.getStorage("userinfo");
				moli.userinfo.token = res.data.token;
				moli.userinfo.expir = res.data.expir ? res.data.expir : '';
				moli.userinfo.imToken = res.data.imToken ? res.data.imToken : '';
				// 退出有信
	    		im.logout({});
				// 登录IM
				let params = {
					userinfo : {
						usercode : moli.userinfo.yhtId,
						userName : moli.userinfo.userName
					}
				};
				im.login(params, function () {
					summer.setStorage('userinfo', moli.userinfo);
					summer.setAppStorage('userinfo', moli.userinfo);
					//注册成功后跳转到首页
				    summer.openWin({
				        type : 'tabBar',
				        id : 'homePage',
				        addBackListener : "true",
				        url : 'index.html',
				        create : 'false',
				        isKeep : false
				    });
				}, function() {
					moli.tokenInvalid();
				});
			} else {
				moli.tokenInvalid();
			}
		}, function(err) {
			moli.tokenInvalid();
		});
	},
    // 统一ajax请求
    ajaxRequest: (paramObj, successCallback, errorCallback) => {
        // 判断网络
		if (!summer.netAvailable()) {
	        summer.refreshHeaderLoadDone();
            summer.refreshFooterLoadDone();
            Toast.offline('网络异常，请检查网络', 1);
			return false;
        }
        if(!paramObj.unLoading){
			Toast.loading(paramObj.loadingTxt ? paramObj.loadingTxt : '', 30, () => {
                Toast.offline('请求超时', 1);
                return;
            });
		}
        // 设置header
        let header = moli.getDeviceidAndToken();
        // summer.ajax
        summer.ajax({
			type: paramObj.type,
			url: moli.G_COMMON_URL + paramObj.url,
			param: paramObj.param,
			header: header
		}, function (res) {
            Toast.hide();
            let Data;
            if (Object.prototype.toString.call(res.data) === '[object String]') {
                Data = JSON.parse(res.data);
            } else {
                Data = res.data;
            }
			successCallback(Data);
		}, function (err) {
            Toast.hide();
			let tokenerror = summer.getStorage("G-TOKEN-ERROR");
			// 避免过快点击到其它页面出现连续跳转到登录页面的现象
			if (tokenerror) {
				return false;
			}
			// 判断是否token失效
			if (err.status == "401") {
				let code = JSON.parse(err.error).code;
				if (code == "402") {
					moli.tokenInvalid();
				} else {
					moli.tokenExpire();
				}
				return;
			}
			errorCallback(err);
		});
    }
};
