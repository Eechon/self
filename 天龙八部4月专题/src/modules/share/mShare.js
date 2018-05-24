var share = {
    shareTpml : __inline("../../tpl/m-share.tmpl"),
    init : function () {
        var _ts = this;
        $(".oh5-wrap").on("click",".btn-share",function(){
            var dom = _ts.shareTpml();
            _ts._popup();
        });
    },
    _popup : function () {
        var dom = this.shareTpml();

        $(".oh5-wrap").append(dom);

        if(this._ifwx()){
            $(".ui-share .icon-wechat").parent().removeClass("u-hide");
        }
        this._initEvent();
    },
    _initEvent : function () {
        var _ts = this;
        $(".ui-share").on("click","i",function(){
            var index = $(this).attr("data-index");
            _ts._shareTo(index);
        });
        $(".ui-share").on("click",".btn-cancle",function(){
            $(".ui-share").remove();
        });
    },
    _ifwx : function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        if (u.indexOf('MicroMessenger')>-1) {
            return true;
        } else {
            return false;
        }
    },
    _shareTo : function (index) {
        var url = encodeURIComponent(location.href);
        var title = document.title;

        switch (index) {
            case "wx":
                $(".ui-share .tip-wx").removeClass("u-hide");
                break;
            case "qqZone":
                location.href = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+url+"&title="+title;
                break;
            case "douban":
                location.href = "http://www.douban.com/recommend/?url="+url+"&title="+title;
                break;
            case "wb":
                location.href = "http://service.weibo.com/share/share.php?url="+url+"&title="+title;
                break;
            default :
                break;
        }
    }
}

share.init();