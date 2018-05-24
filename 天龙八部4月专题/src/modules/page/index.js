var seaLoader = require('seaLoader');
var dialog = require('dialog.js');
require('dwudbproxy');

var codeTpl = __inline("/src/tpl/code.tmpl"); //验证码
var comfirmTpl = __inline("/src/tpl/comfirm.tmpl"); //消耗金币确认框
var bindWxTpl = __inline("/src/tpl/bindWx.tmpl");//绑定微信弹框
var turnWxTpl = __inline("/src/tpl/turnWx.tmpl");//扫码领取弹框
var lotteryTpl = __inline('/src/tpl/lottery.tmpl'); //抽奖结果弹窗
var dialog_code;
// var gift_id, gold; //当前礼包id，花费金币数
var bind_wx;
var dialog_lottery, scoreRet;

var domain = "http://ka.duowan.com";

var $count = $('#lotteryCount')
var lottery_id = $('.btn-lottery').attr('data-id')
var $lotterys = $('.lottery-item')
var lotteryTimer, lotteryIndex, lottering = false;

seaLoader(function (seajs) {
    seajs.use(['arale/qrcode/1.0.3/qrcode'], function (Qrcode) {
        var M = {
            linqustate: function () {
                var $linquWrap = $(".lingqu-wrap")

                $linquWrap.each(function (i, wrap) {
                    var gift_id = $(wrap).attr('data-giftid');
                    $.ajax({
                        url: domain+'/open/getGiftInfo',
                        dataType: 'jsonp',
                        data: { gift_id: gift_id },
                        jsonp: 'callback',
                        success: function (ret) {
                            if (ret.code == 0) {
                                var linqu_sn = ret.data.giftInfo.linqu_sn;
                                if (linqu_sn) {
                                    $(wrap).addClass("is-active").find('input').val(linqu_sn);
                                    $(wrap).find(".btn-copy").attr('data-clipboard-text', linqu_sn);
                                }
                            } else {
                                V.showTip(ret.msg);
                            }
                        }
                    })
                })

            },
            linqu: function (gift_id, code) {
                var data = {
                    gift_id: gift_id
                }
                if (code) {
                    data._phrase = code;
                }
                $.ajax({
                    url: domain+'/gift/receive',
                    dataType: 'jsonp',
                    data: data,
                    jsonp: 'callback',
                    success: function (ret) {
                        if (ret.code == 0) {
                            var linqu_sn = ret.data;
                            if (linqu_sn) {
                                var $wrap = $('[data-giftid=' + gift_id + ']')

                                $wrap.addClass("is-active").find('input').val(linqu_sn);

                                $wrap.find(".btn-copy").attr('data-clipboard-text', linqu_sn);

                                $count.text(parseInt($count.text()) + 1)
                            }
                        } else if (ret.code == -8011) { //绑定微信
                            bind_wx = dialog({
                                content: bindWxTpl({
                                }),
                                skin: "popup-ui"
                            }).showModal();
                        } else if (ret.code == -8001) { //扫码领礼包
                            var turnWx = dialog({
                                content: turnWxTpl({
                                    url: ret.url
                                }),
                                skin: "popup-ui"
                            }).showModal();
                            V.renderQrcode();
                        } else if (ret.code == -21) {
                            var codeImg = ret.data;
                            dialog_code = dialog({
                                title: "请填写验证码",
                                content: codeTpl({
                                    $data: {
                                        gift_id: gift_id,
                                        submitClass: 'gift-codeSubmit',
                                        inputClass: 'card-input'
                                    }
                                }),
                                skin: "popup-ui"
                            }).showModal();
                            $("body .code-img").append('<img src="' + codeImg + '&' + new Date().getTime() + '" alt=""/>');
                        } else {
                            V.showTip(ret.msg);
                        }
                    }
                })
            },
            bindWx: function () {
                $.ajax({
                    url: domain+'/login/weixin',
                    data: { url: location.href },
                    dataType: 'jsonp',
                    success: function (ret) {
                        if (ret.code == -7) {
                            location.href = ret.data
                        }
                    }
                })
            },
            getCount: function (callback) {
                $.ajax({
                    url: domain+'/lottery/count',
                    data: { lottery_id: lottery_id },
                    dataType: 'jsonp',
                    success: function (ret) {
                        if (ret.code == 0) {
                            callback && callback(ret.data)
                        } else {
                            V.showTip(ret.msg)
                        }
                    }
                })
            },
            getLottery: function () {
                lottering = true;

                V.startLottery()

                $.ajax({
                    url: domain+'/lottery/gacha',
                    data: { lottery_id: lottery_id },
                    dataType: 'jsonp',
                    success: function (ret) {
                        if (ret.code == 0) {
                            setTimeout(function () {
                                scoreRet = ret.data;
                            }, 4000);
                        } else {
                            setTimeout(function () {
                                $count.text(parseInt($count.text()) - 1)
                                V.showTip(ret.msg);
                                clearInterval(lotteryTimer);
                            }, 4000);
                        }
                    }
                })

            },
            //初始化任务状态
            inittask: function () {
                var task_id = $(".mod-reward .lucky-wrap").attr('data-taskid');
                $.ajax({
                    url: 'http://kaplus.duowan.com/open/taskInfo',
                    dataType: 'jsonp',
                    data: {task_id: task_id},
                    jsonp: 'callback',
                    success: function (ret) {
                        if (ret.code == 0) {
                            var task = ret.data.task;
                            $("#taskClock").attr('data-time', task.end_time);
                           if (task.status == 3) {
                                $('.mod-reward .btn-lucky').removeClass('is-disabled');
                            }
                        }
                    }
                })
            },
            //领取任务奖励
            reward: function (task_id) {
                $.ajax({
                    url: 'http://kaplus.duowan.com/task/reward',
                    dataType: 'jsonp',
                    data: {task_id: task_id},
                    jsonp: 'callback',
                    success: function (ret) {
                        if (ret.code == 0) {
                            V.showTip("领取成功！");
                            $('.mod-reward .btn-lucky').addClass('is-disabled');
                        } else {
                            V.showTip(ret.msg);
                        }
                    }
                })
            }
        }
        var V = {
            init: function () {
                M.linqustate();
                M.inittask();
                this.checkLogin();
                this.renderCount();
                this.renderClock($("#taskClock"));
                V.interval = setInterval(function () {
                    V.renderClock($("#taskClock"));
                }, 1000);
            },
            startLottery: function () {
                var len = $lotterys.length
                scoreRet = null
                lotteryIndex = 0
                lotteryTimer = setInterval(function () {
                    $lotterys.removeClass('active')

                    var $current = $lotterys.filter('[data-order=' + lotteryIndex + ']').addClass('active')

                    if (scoreRet && $current.data('score') == scoreRet.gold) {
                        V.showLottery(scoreRet, $current.children('p').text())
                        $count.text(parseInt($count.text()) - 1)
                        lottering = false;
                        clearInterval(lotteryTimer)
                    }

                    lotteryIndex = (lotteryIndex + 1) % len
                }, 300)
            },
            showLottery: function (scoreRet, reward) {
                dialog_lottery = dialog({
                    title: ' ',
                    content: lotteryTpl({
                        gold: scoreRet.gold,
                        count: parseInt($count.text()) - 1,
                        reward: reward
                    }),
                    skin: 'base-ui'
                }).showModal()
            },
            renderCount: function (num) {
                M.getCount(function (ret) {
                    $count.text(ret)
                })

            },
            checkLogin: function () {
                if (dwUDBProxy.isLogin()) {
                    $('.login-btn').remove()
                }
            },
            showTip: function (msg, timeout) {
                if (!msg) {
                    return;
                }
                timeout = timeout || 2000;

                var d = dialog({
                    title: "提示",
                    content: msg,
                    skin: "base-ui"
                }).showModal();

                //2秒后自动关闭
                setTimeout(function () {
                    d.close().remove();
                }, timeout);
            },
            showComfirm: function (gold, gift_id) {
                var dom = comfirmTpl({
                    data: {
                        gold: gold,
                        gift_id: gift_id
                    }
                });

                comfirmDialog = dialog({
                    title: "提示",
                    content: dom,
                    skin: "base-ui"
                }).showModal();
            },
            getCookie: function (name) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return unescape(arr[2]);
                else
                    return null;
            },
            renderQrcode: function () {
                var $qrcode = $("#qrcode");
                var qrcode = new Qrcode({
                    text: $qrcode.attr("data-url"),
                    width: 160,
                    height: 160
                });
                $qrcode.html(qrcode);
            },
            renderClock: function ($span) {
                var endTime = $span.attr("data-time");
                if ($span.hasClass('yuding_start_time')) {
                    endTime = new Date(endTime).getTime() / 1000;
                }
                if ($span && endTime) {

                    var now = new Date();
                    var nowTime = now.getTime() / 1000;
                    var restTime = endTime - nowTime;

                    var day = V.paserTime(restTime / (60 * 60 * 24));
                    var hour = V.paserTime(restTime % (60 * 60 * 24) / (60 * 60));
                    var min = V.paserTime(restTime % (60 * 60 * 24) % (60 * 60) / (60));
                    var second = V.paserTime(restTime % (60 * 60 * 24) % (60 * 60) % 60);

                    if (parseInt(day)) {
                        var str = parseInt(day) + '天 ' + hour + ":" + min + ":" + second;
                    } else {
                        var str = hour + ":" + min + ":" + second;
                    }
                    $span.text(str);
                    if (Math.round(nowTime) >= endTime) {
                        //location.reload();
                        $span.text('00:00:00');
                        window.clearInterval(V.interval);
                    }
                }
                return this;
            },
            paserTime: function (data) {
                var str = data.toString();
                var arr = str.split(".");

                if (arr[0].length == 1) {
                    return "0" + arr[0];
                }
                return arr[0];
            },
        }

        var C = {
            init: function () {
                $('#toTop').on('click', function () {
                    $('html,body').animate({
                        scrollTop: 0
                    }, 1000)

                    return false
                })

                $('#toLucky').on('click', function () {
                    $('html,body').animate({
                        scrollTop: 2360
                    }, 1000)

                    return false
                })

                $('body').on('click', '.bind-btn', function () {
                    M.bindWx();
                })
                //复制
                if (window.clipboardData) {
                    $("body").on("click", ".btn-copy", function () {
                        var text = $(this).siblings("input").val();
                        window.clipboardData.setData('text', text);
                        var copyText = window.clipboardData.getData("text");
                        if (copyText == text) {
                            V.showTip('复制成功');
                        }
                    })
                } else {
                    var clipboard = new Clipboard('.btn-copy');
                    clipboard.on('success', function () {
                        V.showTip('复制成功');
                    });
                }

                $('body').on('click', '.btn-lottery', function () {
                    if (lottering) return;
                    if (parseInt($count.text()) <= 0) {
                        dialog_lottery = dialog({
                            title: ' ',
                            content: lotteryTpl({
                                gold: -10086,
                                count: 0
                            })
                        }).showModal()
                    } else {
                        M.getLottery()
                    }
                })

                //验证码回车
                $("body").on("keypress", ".dialog-code .card-input", function (e) {
                    var gift_id = $(this).closest('.dialog-code').find('span[data-giftid]').data('giftid')
                    if (e.keyCode == "13") {
                        var code = $(".dialog-code input").val();
                        dialog_code.remove();
                        M.linqu(gift_id, code);
                    }
                });

                //验证码换一张
                $("body").on("click", ".change-codeimg", function () {
                    var $img = $(this).parent().prev().children();
                    var img = $img.attr("src");
                    img = img.slice(0, img.indexOf("&"));
                    var imgSrc = img + "&" + new Date().getTime() + "&fresh=1";
                    $img.attr("src", imgSrc);
                })

                //验证码弹窗确认
                $("body").on("click", ".gift-codeSubmit", function () {
                    var gift_id = $(this).data('giftid')
                    var code = $(".dialog-code input").val();
                    dialog_code.remove();
                    M.linqu(gift_id, code);
                });

                //播放视频
                $(".icon-play").click(function () {
                    $(this).parent().hide().siblings().show();
                })

                //领取卡码
                $(".lingqu-wrap").on('click', '.btn-lingqu', function () {
                    var gold = parseFloat($(this).attr("data-gold")),
                        gift_id = $(this).closest('.lingqu-wrap').data('giftid')

                    if (!dwUDBProxy.isLogin()) {
                        dwUDBProxy.login();
                    } else {
                        if (gold > 0) {
                            V.showComfirm(gold, gift_id);
                        } else {
                            M.linqu(gift_id);
                        }
                    }
                })

                //登录按钮
                $('body').on('click', '.login-btn', function (e) {
                    if (!dwUDBProxy.isLogin()) {
                        dwUDBProxy.login();
                    }

                    return false;
                })

                //花费钻石弹窗确认
                $(document).on("click", ".question-tips-dialog .btn-submit", function () {
                    var gift_id = $(this).data('giftid')
                    comfirmDialog.close().remove();
                    M.linqu(gift_id);
                });

                C.move();

                //领取任务奖励
                $(".mod-reward").on('click', '.btn-lucky', function () {
                    var $this = $(this);
 
                    if($this.hasClass("is-disabled")) {
                        return;
                    }

                    M.reward($this.parents(".lucky-wrap").attr("data-taskid"));
                })
            },
            move: function () {
                if (!V.getCookie('__rp') && V.getCookie('yyuid')) {
                    $(document).one('mousemove.body', function () {
                        var a = new Image();
                        a.src = domain+"/img/favicon.ico";

                        setTimeout(C.move, 2000);
                    });
                }
            }
        }
        $(function () {
            C.init();
            V.init();
        });
    });
});