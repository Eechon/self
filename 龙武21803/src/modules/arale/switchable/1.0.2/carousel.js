define("arale/switchable/1.0.2/carousel",["./switchable","$","arale/widget/1.1.1/widget","arale/base/1.1.1/base","arale/class/1.1.0/class","arale/events/1.1.0/events","./plugins/effects","arale/easing/1.0.0/easing","./plugins/autoplay","./plugins/circular"],function(a,b,c){var d=a("./switchable"),e=a("$");c.exports=d.extend({attrs:{circular:!0,prevBtn:{getter:function(a){return e(a).eq(0)}},nextBtn:{getter:function(a){return e(a).eq(0)}},disabledBtnClass:{getter:function(a){return a?a:this.get("classPrefix")+"-disabled-btn"}}},_initTriggers:function(a){d.prototype._initTriggers.call(this,a);var b=this.get("prevBtn"),c=this.get("nextBtn");!b[0]&&a.prev&&(b=a.prev,this.set("prevBtn",b)),!c[0]&&a.next&&(c=a.next,this.set("nextBtn",c)),b.addClass(this.CONST.PREV_BTN_CLASS),c.addClass(this.CONST.NEXT_BTN_CLASS)},_getDatasetRole:function(){var a=d.prototype._getDatasetRole.call(this),b=this,c=["next","prev"];return e.each(c,function(c,d){var e=b.$("[data-switchable-role="+d+"]");e.length&&(a[d]=e)}),a},_bindTriggers:function(){d.prototype._bindTriggers.call(this);var a=this,b=this.get("circular");this.get("prevBtn").click(function(c){c.preventDefault(),(b||a.get("activeIndex")>0)&&a.prev()}),this.get("nextBtn").click(function(c){c.preventDefault();var d=a.get("length")-1;(b||a.get("activeIndex")<d)&&a.next()}),b||this.on("switch",function(b){a._updateButtonStatus(b)})},_updateButtonStatus:function(a){var b=this.get("prevBtn"),c=this.get("nextBtn"),d=this.get("disabledBtnClass");b.removeClass(d),c.removeClass(d),0===a?b.addClass(d):a===this.get("length")-1&&c.addClass(d)}})}),define("arale/switchable/1.0.2/switchable",["$","arale/widget/1.1.1/widget","arale/base/1.1.1/base","arale/class/1.1.0/class","arale/events/1.1.0/events","arale/switchable/1.0.2/plugins/effects","arale/easing/1.0.0/easing","arale/switchable/1.0.2/plugins/autoplay","arale/switchable/1.0.2/plugins/circular"],function(a,b,c){function d(a,b,c,d){for(var e=f("<ul>"),g=0;a>g;g++){var h=g===b?c:"";f("<li>",{"class":h,html:g+1}).appendTo(e)}return d?e.children():e}function e(a){return{UI_SWITCHABLE:a||"",NAV_CLASS:a?a+"-nav":"",CONTENT_CLASS:a?a+"-content":"",TRIGGER_CLASS:a?a+"-trigger":"",PANEL_CLASS:a?a+"-panel":"",PREV_BTN_CLASS:a?a+"-prev-btn":"",NEXT_BTN_CLASS:a?a+"-next-btn":""}}var f=a("$"),g=a("arale/widget/1.1.1/widget"),h=a("arale/switchable/1.0.2/plugins/effects"),i=a("arale/switchable/1.0.2/plugins/autoplay"),j=a("arale/switchable/1.0.2/plugins/circular"),k=g.extend({attrs:{triggers:{value:[],getter:function(a){return f(a)}},panels:{value:[],getter:function(a){return f(a)}},classPrefix:"ui-switchable",hasTriggers:!0,triggerType:"hover",delay:100,activeIndex:{value:0,setter:function(a){return parseInt(a)||0}},step:1,length:{readOnly:!0,getter:function(){return Math.ceil(this.get("panels").length/this.get("step"))}},viewSize:[],activeTriggerClass:{getter:function(a){return a?a:this.get("classPrefix")+"-active"}}},setup:function(){this._initConstClass(),this._initElement();var a=this._getDatasetRole();this._initPanels(a),this._initTriggers(a),this._bindTriggers(),this._initPlugins(),this.render()},_initConstClass:function(){this.CONST=e(this.get("classPrefix"))},_initElement:function(){this.element.addClass(this.CONST.UI_SWITCHABLE)},_getDatasetRole:function(){var a=this,b={},c=["trigger","panel","nav","content"];return f.each(c,function(c,d){var e=a.$("[data-switchable-role="+d+"]");e.length&&(b[d]=e)}),b},_initPanels:function(a){var b=this.get("panels");if(b.length>0||(a.panel?this.set("panels",b=a.panel):a.content&&(this.set("panels",b=a.content.find("> *")),this.content=a.content)),0===b.length)throw new Error("panels.length is ZERO");this.content||(this.content=b.parent()),this.content.addClass(this.CONST.CONTENT_CLASS),this.get("panels").addClass(this.CONST.PANEL_CLASS)},_initTriggers:function(a){var b=this.get("triggers");b.length>0||(a.trigger?this.set("triggers",b=a.trigger):a.nav?(b=a.nav.find("> *"),0===b.length&&(b=d(this.get("length"),this.get("activeIndex"),this.get("activeTriggerClass"),!0).appendTo(a.nav)),this.set("triggers",b),this.nav=a.nav):this.get("hasTriggers")&&(this.nav=d(this.get("length"),this.get("activeIndex"),this.get("activeTriggerClass")).appendTo(this.element),this.set("triggers",b=this.nav.children()))),!this.nav&&b.length&&(this.nav=b.parent()),this.nav&&this.nav.addClass(this.CONST.NAV_CLASS),b.addClass(this.CONST.TRIGGER_CLASS).each(function(a,b){f(b).data("value",a)})},_bindTriggers:function(){function a(a){c._onFocusTrigger(a.type,f(this).data("value"))}function b(){clearTimeout(c._switchTimer)}var c=this,d=this.get("triggers");"click"===this.get("triggerType")?d.click(a):d.hover(a,b)},_onFocusTrigger:function(a,b){var c=this;"click"===a?this.switchTo(b):this._switchTimer=setTimeout(function(){c.switchTo(b)},this.get("delay"))},_initPlugins:function(){this._plugins=[],this._plug(h),this._plug(i),this._plug(j)},switchTo:function(a){this.set("activeIndex",a)},_onRenderActiveIndex:function(a,b){this._switchTo(a,b)},_switchTo:function(a,b){this.trigger("switch",a,b),this._switchTrigger(a,b),this._switchPanel(this._getPanelInfo(a,b)),this.trigger("switched",a,b),this._isBackward=void 0},_switchTrigger:function(a,b){var c=this.get("triggers");c.length<1||(c.eq(b).removeClass(this.get("activeTriggerClass")),c.eq(a).addClass(this.get("activeTriggerClass")))},_switchPanel:function(a){a.fromPanels.hide(),a.toPanels.show()},_getPanelInfo:function(a,b){var c,d,e=this.get("panels").get(),g=this.get("step");return b>-1&&(c=e.slice(b*g,(b+1)*g)),d=e.slice(a*g,(a+1)*g),{toIndex:a,fromIndex:b,toPanels:f(d),fromPanels:f(c)}},prev:function(){this._isBackward=!0;var a=this.get("activeIndex"),b=(a-1+this.get("length"))%this.get("length");this.switchTo(b)},next:function(){this._isBackward=!1;var a=this.get("activeIndex"),b=(a+1)%this.get("length");this.switchTo(b)},_plug:function(a){var b=a.attrs;if(b)for(var c in b)!b.hasOwnProperty(c)||c in this.attrs||this.set(c,b[c]);a.isNeeded.call(this)&&(a.install&&a.install.call(this),this._plugins.push(a))},destroy:function(){var a=this;f.each(this._plugins,function(b,c){c.destroy&&c.destroy.call(a)}),k.superclass.destroy.call(this)}});c.exports=k}),define("arale/switchable/1.0.2/plugins/effects",["$","arale/easing/1.0.0/easing"],function(a,b,c){var d=a("$");a("arale/easing/1.0.0/easing");var e="scrollx",f="scrolly",g="fade";c.exports={attrs:{effect:"none",easing:"linear",duration:500},isNeeded:function(){return"none"!==this.get("effect")},install:function(){var a=this.get("panels");a.show();var b=this.get("effect"),c=this.get("step"),f=d.isFunction(b);if(f||0!==b.indexOf("scroll")){if(!f&&b===g){var i=this.get("activeIndex"),j=i*c,k=j+c-1;a.each(function(a,b){var c=a>=j&&k>=a;d(b).css({opacity:c?1:0,position:"absolute",zIndex:c?9:1})})}}else{var l=this.content,m=a.eq(0);l.css("position","relative"),"static"===l.parent().css("position")&&l.parent().css("position","relative"),b===e&&(a.css("float","left"),l.width("35791197px"));var n=this.get("viewSize");if(n[0]||(n[0]=m.outerWidth()*c,n[1]=m.outerHeight()*c,this.set("viewSize",n)),!n[0])throw new Error("Please specify viewSize manually")}this._switchPanel=function(a){var b=this.get("effect"),c=d.isFunction(b)?b:h[b];c.call(this,a)}}};var h={fade:function(a){if(this.get("step")>1)throw new Error('Effect "fade" only supports step === 1');var b=a.fromPanels.eq(0),c=a.toPanels.eq(0);if(this.anim&&this.anim.stop(!1,!0),c.css("opacity",1),c.show(),a.fromIndex>-1){var d=this,e=this.get("duration"),f=this.get("easing");this.anim=b.animate({opacity:0},e,f,function(){d.anim=null,c.css("zIndex",9),b.css("zIndex",1),b.css("display","none")})}else c.css("zIndex",9)},scroll:function(a){var b=this.get("effect")===e,c=this.get("viewSize")[b?0:1]*a.toIndex,d={};if(d[b?"left":"top"]=-c+"px",this.anim&&this.anim.stop(),a.fromIndex>-1){var f=this,g=this.get("duration"),h=this.get("easing");this.anim=this.content.animate(d,g,h,function(){f.anim=null})}else this.content.css(d)}};h[f]=h.scroll,h[e]=h.scroll,c.exports.Effects=h}),define("arale/switchable/1.0.2/plugins/autoplay",["$"],function(a,b,c){function d(a,b){function c(){c.stop(),d=setTimeout(a,b)}b=b||200;var d;return c.stop=function(){d&&(clearTimeout(d),d=0)},c}function e(a){var b=g.scrollTop(),c=b+g.height(),d=a.offset().top,e=d+a.height();return c>d&&e>b}var f=a("$"),g=f(window);c.exports={attrs:{autoplay:!1,interval:5e3},isNeeded:function(){return this.get("autoplay")},install:function(){function a(){b(),j.paused=!1,c=setInterval(function(){j.paused||j.next()},i)}function b(){c&&(clearInterval(c),c=null),j.paused=!0}var c,f=this.element,h="."+this.cid,i=this.get("interval"),j=this;a(),this.stop=b,this.start=a,this._scrollDetect=d(function(){j[e(f)?"start":"stop"]()}),g.on("scroll"+h,this._scrollDetect),this.element.hover(b,a)},destroy:function(){var a="."+this.cid;this.stop&&this.stop(),this._scrollDetect&&(this._scrollDetect.stop(),g.off("scroll"+a))}}}),define("arale/switchable/1.0.2/plugins/circular",["$","arale/switchable/1.0.2/plugins/effects","arale/easing/1.0.0/easing"],function(a,b,c){function d(a,b,c){var d=this.get("step"),e=this.get("length"),g=a?e-1:0,h=g*d,i=(g+1)*d,j=a?c:-c*e,k=a?-c*e:c*e,l=f(this.get("panels").get().slice(h,i));return l.css("position","relative"),l.css(b,k+"px"),j}function e(a,b,c){var d=this.get("step"),e=this.get("length"),g=a?e-1:0,h=g*d,i=(g+1)*d,j=f(this.get("panels").get().slice(h,i));j.css("position",""),j.css(b,""),this.content.css(b,a?-c*(e-1):"")}var f=a("$"),g="scrollx",h="scrolly",i=a("arale/switchable/1.0.2/plugins/effects").Effects;c.exports={isNeeded:function(){var a=this.get("effect"),b=this.get("circular");return b&&(a===g||a===h)},install:function(){this._scrollType=this.get("effect"),this.set("effect","scrollCircular")}},i.scrollCircular=function(a){var b=a.toIndex,c=a.fromIndex,f=this._scrollType===g,h=f?"left":"top",i=this.get("viewSize")[f?0:1],j=-i*b,k={};if(k[h]=j+"px",c>-1){this.anim&&this.anim.stop(!1,!0);var l=this.get("length"),m=0===c&&b===l-1,n=c===l-1&&0===b,o=void 0===this._isBackward?c>b:this._isBackward,p=o&&m||!o&&n;p&&(j=d.call(this,o,h,i),k[h]=j+"px");var q=this.get("duration"),r=this.get("easing"),s=this;this.anim=this.content.animate(k,q,r,function(){s.anim=null,p&&e.call(s,o,h,i)})}else this.content.css(k)}});
