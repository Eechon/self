(function(window, $){
    var Config = {
        multilogin : {
            domainMap : [
                    'video.duowan.com',
                    'duowan.com'
                ],
            domainExcludeMap : [
                 // 'udbproxy.duowan.com',
                    'ka.duowan.com'
                ],    
            urlMap : [
                    'http://www.duowan.com/s/test_login.html'
                ]
        }      
    };
    
    var Util = {
        loginCallbacks : $.Callbacks('memory'),
        intervalHandle : 0,
        
        getCookie: function(name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) return decodeURI(arr[2]);
            return null;
        },

        isLogin : function(){
            return Util.getCookie('username') ? true : false;
        },
        
        getUsername : function(){
            var username = Util.getCookie('username');
            if(!username) return "";

            var arr = username.split('_', 2);
            if(!arr || !arr[0]) return username;
            
            var nickname = Util.getCookie(arr[0] + '_nickname');
            if(!nickname|| 'null'==nickname) return username;
            
            var prefix = "";
            if( 'newqq'==arr[0] ){
                prefix = "[QQ网友]";
            }else if( 'qq'==arr[0] ){
                prefix = "[微信网友]";
            }else if( 'sina'==arr[0] ){
                prefix = "[微博网友]";
            }else{
                prefix = "[多玩网友]";
            }
            return prefix+nickname;

        },
        decorateURL : function(url) {
            if (url) {
                if (/^http/.test(url)) {
                    return url;
                }
                var protocol = "http://";
                if (/^https/.test(top.location.href)) {
                    protocol = "https://"
                }
                return protocol + window.location.host + url
            } else {
                url = window.location.href;
                var pos = url.indexOf("#");
                if (pos != -1) {
                    url = url.substring(0, pos)
                }
                return url;
            }
        },
        intervalCheckLogin : function(intervalTime, tryNum){
            if( !intervalTime ) intervalTime =100;
            if( !tryNum ) tryNum = 3000;
            
            var that = this;
            if( that.isLogin() ){
                that.loginCallbacks.fire();
            }else{
                if(that.intervalHandle){
                    clearInterval(that.intervalHandle); 
                }
                var i = 0;
                that.intervalHandle = setInterval(function(){
                    i++;
                    if( that.isLogin() ) {
                        clearInterval(that.intervalHandle);
                        that.loginCallbacks.fire();
                    }
                    if( i>tryNum ){
                       clearInterval(that.intervalHandle); 
                    }
                }, intervalTime);                 
            }           
        },

        handleSuccessURL : function(successURL, closeLoginFunc, reloadPage){
            var successFunc = function(){};
            var reloadPageFunc = function(){};
            var checkLogin = false;
            
            if( 'function' == typeof successURL ){
                successFunc = successURL;
                successURL = '/?udbSuccessCallback';
                checkLogin = true;
            }
            successURL = this.decorateURL(successURL);
            
            if('function' == typeof reloadPage){
                reloadPageFunc = function(){
                   reloadPage(successURL);
                };
                checkLogin = true;
            }
            
            if(checkLogin){
                this.loginCallbacks.empty();
                this.loginCallbacks.add(closeLoginFunc);
                this.loginCallbacks.add(reloadPageFunc);
                this.loginCallbacks.add(successFunc);
                this.intervalCheckLogin();
            }            
            return successURL;
        },
        
        isMobile: function(){
            return false;
        },
        
        useMultiLogin: function(){
            //排除的域名
            for(var i in Config.multilogin.domainExcludeMap){
                if( -1 != location.hostname.indexOf(Config.multilogin.domainExcludeMap[i])   ){
                    return false;
                }
            }
            //域名白名单
            for(var i in Config.multilogin.domainMap){
                if( -1 != location.hostname.indexOf(Config.multilogin.domainMap[i])   ){
                    return true;
                }
            }
            for(var i in Config.multilogin.urlMap){
                if( location.href == Config.multilogin.urlMap[i] ){
                    return true;
                }
            }
            return true;            
        }      
    };
    
    function UDBLogin(appid, baseURL){
        this.appid = appid || 5552;
        this.baseURL = baseURL || 'http://udbproxy.duowan.com/';
        this.getAuthorizeURL = this.baseURL + 'getAuthorizeURL?appid=' + this.appid;
        this.callbackURL     = this.baseURL + 'callback?appid=' + this.appid + '&successURL=';
        this.denyCallbackURL = this.baseURL + 'denyCallback?appid=' + this.appid;
        this.getDelCookieURL = this.baseURL + 'getDelCookieURL?appid=' + this.appid;     
        this.UDBCallbacks = $.Callbacks('memory');
        
        this.init();
    }
    
    UDBLogin.prototype = {
        init : function(){
            if( Util.isMobile() ){
                this.loadUDBSdk('MWeb'); 
            }else{
                this.loadUDBSdk('PCWeb');    
            }
        },
        
        loadUDBSdk : function(type){
            var jsMap = {
                'PCWeb':'/lgn/js/oauth/udbsdk/pcweb/udb.sdk.pcweb.popup.min.js',
                'MWeb':'/lgn/js/oauth/udbsdk/mweb/udb.sdk.mweb.embed.min.js'
            }
            if( !jsMap[type] ) {
                type = 'PCWeb';
            }
            
            var that = this;
            var isLoadUDB = function(){
                if(window.UDB && window.UDB.sdk && window.UDB.sdk[type]){
                    that.UDBCallbacks.fire(window.UDB.sdk[type]); 
                }
            };
            
            if( !isLoadUDB() ){
                $.ajax({
                    type : "GET",
                    url : "http://res.udb.duowan.com/" + jsMap[type],
                    success: function(){
                        return isLoadUDB();
                    },
                    dataType : "script",
                    cache : true
                });
            }
        },
        
        login : function(successURL){
            var that = this;
            successURL = Util.handleSuccessURL(successURL, function(){
                that.UDBCallbacks.add(function(UDBSdk){
                    UDBSdk.popupCloseLgn && UDBSdk.popupCloseLgn();
                });
            });
            
            that.UDBCallbacks.add(function(UDBSdk){
                UDBSdk.jsonpOpenLgn(that.getAuthorizeURL, that.callbackURL + encodeURIComponent(successURL), encodeURI(that.denyCallbackURL));
            });
        },
                
        embedLogin : function(sel, successURL, UIStyle, closeLoginFunc) {    
            var that = this;
            var eq = $(sel);
            if (eq.length == 0) return;              
            eq.each(function(){
                var thisObj = $(this);
                if (("function" !=typeof successURL) && !successURL) {
                    successURL = thisObj.data("callback-url");
                }
                successURL = Util.handleSuccessURL(successURL, closeLoginFunc);     
                $.getJSON(that.getAuthorizeURL+'&jsonpcallback=?', {
                        callbackURL: that.callbackURL + encodeURIComponent(successURL),
                        denyCallbackURL: that.denyCallbackURL
                    }, 
                    function(data) {
                        if("1" != data.success) {
                            alert(data.errMsg);
                            return;
                        }  
                        thisObj.append($('<iframe frameborder="0" scrolling="no" allowtransparency="true"></iframe>').attr("src", data.url + "&rdm=" +  Math.random() + "&UIStyle=" + UIStyle));
                });
            });
        },
        
        logout : function(successURL){
            var that = this;
            successURL = Util.decorateURL(successURL);
            $.getJSON(that.getDelCookieURL + '&jsonpcallback=?', function(data) {
                if("1" != data.success) {
                    alert(data.errMsg);
                    return;
                }           
                that.UDBCallbacks.add(function(UDBSdk){
                    UDBSdk.deleteCrossmainCookieWithCallBack(
                    data.delCookieURL,
                    function(){
                        top.location.href = successURL;
                    });
                });
            });
        }
    };
    
    function ThirdLogin(appid, baseURL, loginStyle){
        this.appid           = appid || 5764;
        this.baseURL         = baseURL || 'http://udbproxy.duowan.com/thirdlogin';
        this.loginStyle      = loginStyle || 'duowan';
        this.callbackURL     = '';
        this.denyCallbackURL = '';
        this.minWindow = null;        
        this.loginPopupObj = null;
        this.loginMaskObj = null;
        
        this.init();
    }
    
    ThirdLogin.prototype = {    
        init : function(){
            if( this.isVhuya() ){
                this.baseURL = 'http://l.huya.com/udb_web/udbport2.php';
                this.callbackURL = 'http://'+ window.location.host +'/udbcallback.html?do=front3Callback&successURL=';
                this.denyCallbackURL = 'http://'+ window.location.host+'udbcallback.html?do=front3DenyCallback';
            }
        },
        
        isVhuya : function(){
            return 'vhuya'==this.loginStyle ? true : false;
        },
        
        login : function(successURL){
            if( this.isVhuya() ){
                this.initVhuyaLoginPopup(successURL);
            }else{
                this.initDuowanLoginPopup(successURL);
            }
            this.loginPopupObj.show();
            this.loginMaskObj.show(); 
        },

        mobileLogin : function(successURL){
            this.loginOauth('yy', successURL);       
        },
        
        loginOauth : function(loginType, successURL){
            var that = this;
            successURL = Util.handleSuccessURL(successURL, function(){
                that.closeLoginPopup();
            }, function(successURL){
                that.reloadPage(successURL);
            });
            
            if('yy'==loginType){
                var url = 'http://udbproxy.duowan.com/mobile?calbackUrl=' + encodeURIComponent(successURL);
            }else if( this.isVhuya() ){
                callbackURL = encodeURIComponent(this.callbackURL + encodeURIComponent(successURL));
                denyCallbackURL = encodeURIComponent(this.denyCallbackURL);
                var url = this.baseURL + "?do=dummy3AuthorizeURL&loginType=" + loginType + "&fcbUrl=" + callbackURL + "&fdcbUrl=" + denyCallbackURL;
            }else{
                var url = this.baseURL + "?do=dummy3AuthorizeURL&loginType=" + loginType + "&calbackUrl=" + encodeURIComponent(successURL);
            }
            
            this.minWindow = window.open(url, "_loginWin");
            this.minWindow.focus();
        },
        
        reloadPage : function(successURL) {
            var that = this;
            if( null != that.minWindow ){
               that.minWindow.close(); 
            }
         
            this.writeOtherDomainCookie(function(){
                if( !successURL ) {
                    window.location.reload();
                }
                if( /udbSuccessCallback/.test(successURL) ){
                    that.closeLoginPopup();
                }else{
                    window.location.href = successURL;
                }                              
            });           
        },
        
        writeOtherDomainCookie : function(callback){
            var fields = ['udb_n','udb_l','udb_oar','yyuid','username','password','osinfo','oauthCookie',
                'newqq_nickname','qq_nickname','sina_nickname'
            ];
            var params = {}, field='', value='';
            for(var i in fields){
                field = fields[i];
                value = Util.getCookie( field );
                if( value!= null ){
                     params[field] = value;
                }      
            }
            if( -1 != location.hostname.indexOf('video.huya.com') ){
                $.getJSON('http://udbproxy.duowan.com/writeDuowanCookie?callback=?', params, function(){
                    callback();
                });
            }else{
                callback();
            }            
        },

        initVhuyaLoginPopup : function(successURL){
            if( $(".account-login-pop").length !=0 ) return ;
            var cssStyle = __inline("./css/vhuyaLoginPopup.css");
            var vhuyaLoginPopup = __inline("./tpl/vhuyaLoginPopup.tmpl");
           
            $("body").append('<style>'+cssStyle+'</style>');
            $("body").append(vhuyaLoginPopup());           
            
            var that = this;
            that.loginPopupObj = $(".account-login-pop");
            that.loginMaskObj = $(".account-login-mask");
            that.loginPopupObj.on("click", ".account-login-yy a",function(e) {
                e.preventDefault(),
                that.closeLoginPopup();
                __UDBLogin.login(successURL);
            }).on("click", ".account-login-qq a",function(e) {
                e.preventDefault(),
                that.loginOauth("qq", successURL)
            }).on("click", ".account-login-weibo a",function(e) {
                e.preventDefault(),
                that.loginOauth("weibo", successURL)
            }).on("click", ".account-login-pop-close",function(e) {
                e.preventDefault(),
                that.closeLoginPopup();
            });            
        },

        initDuowanLoginPopup : function(successURL){
            if( $(".account-login-pop").length !=0 ) return ;
            var cssStyle = __inline("./css/dwLoginPopup.css");
            var dwLoginPopup = __inline("./tpl/dwLoginPopup.tmpl");
           
            $("body").append('<style>'+cssStyle+'</style>');
            $("body").append(dwLoginPopup());
            
            var that = this;
            that.loginPopupObj = $(".account-login-pop");
            that.loginMaskObj = $(".account-login-mask");
            
            __UDBLogin.embedLogin("#udbsdk_login_content .udbsdk_login", successURL, 'xelogin', function(){
                that.closeLoginPopup();
            });
            that.loginPopupObj.on("click", ".login-btn-wechat",function(e) {
                e.preventDefault(),
                that.loginOauth("weixin", successURL)
            }).on("click", ".login-btn-qq",function(e) {
                e.preventDefault(),
                that.loginOauth("qq", successURL)
            }).on("click", ".login-btn-weibo",function(e) {
                e.preventDefault(),
                that.loginOauth("weibo", successURL)
            }).on("click", ".close",function(e) {
                e.preventDefault(),
                that.closeLoginPopup()
            });             
        },
        closeLoginPopup: function(){
            if(this.loginPopupObj) this.loginPopupObj.hide();
            if(this.loginMaskObj) this.loginMaskObj.hide();             
        }     
    };
    
    var _appid = '', _baseURL = '', _thirdLoginStyle= 'duowan';
    if( 'ka.duowan.com' == location.hostname ) _appid = 5033;            
    if('undefined' != typeof UDB_APPID) _appid = UDB_APPID;
    if('undefined' != typeof UDB_BASEURL) _baseURL = UDB_BASEURL;
    if( -1 != location.hostname.indexOf('video.huya.com') ) _thirdLoginStyle = 'vhuya';

    var __UDBLogin = new UDBLogin(_appid, _baseURL);
    var __ThirdLogin = new ThirdLogin(_appid, _baseURL, _thirdLoginStyle);

    var dwUDBProxy = {
        login: function(successURL){
            try{
                if( Util.useMultiLogin() ){
                   return this.multiLogin(successURL);  
                }else{
                   return __UDBLogin.login(successURL);  
                }                  
            }catch(e){}       
        },
        multiLogin: function(successURL){ 
            try{ 
                return __ThirdLogin.login(successURL); 
            }catch(e){}  
        },
        mobileLogin: function(successURL){
            return __ThirdLogin.mobileLogin(successURL);
        },
        logout: function(successURL){ 
            try{
                return __UDBLogin.logout(successURL);
            }catch(e){}             
        },
        reloadPage: function(successURL){ 
            try{
                //return __ThirdLogin.reloadPage(successURL);
            }catch(e){}              
        },
        isLogin: function(){ 
            try{
                return Util.isLogin();
            }catch(e){
                return false;
            }             
        },
        getCookie: function(name){ 
            try{
                if( 'username'==name ){
                    return Util.getUsername(); 
                }else{
                    return Util.getCookie(name); 
                }
            }catch(e){
                return "";
            }  
        },
        getUsername: function(){ 
            return Util.getUsername(); 
        }
    };

    $(function(){
        __UDBLogin.embedLogin("#login-embed", '', 'xelogin');
        __UDBLogin.embedLogin("#mlogin-embed", '', 'xemlogin');        
    })

    module.exports = dwUDBProxy;
    window.dwUDBProxy = dwUDBProxy;
})(window, $);