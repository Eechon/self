# 选项卡

---------

## 演示

###选项卡-s1

````html
<!-- 容器元素 -->
<div id="tab1" class="tab1">
    <div class="tab1__hd">
        <h3 class="tab1__title">可去掉标题</h3>
        <ul class="tab1__nav" data-switchable-role="nav">
            <li class="tab1__trigger" data-switchable-role="trigger">1</li>
            <li class="tab1__trigger" data-switchable-role="trigger">2</li>
            <li class="tab1__trigger" data-switchable-role="trigger">3</li>
        </ul>
        <div class="tab1__act">
            <span class="tab1__act-links">
                <a href="#" class="tab1__act-link">链接1</a>|
                <a href="#" class="tab1__act-link">链接2</a>|
                <a href="#" class="tab1__act-link">链接3</a>|
                <a href="#" class="tab1__act-link">链接4</a>
            </span>
            <a class="tab1__act-more" href="#">更多»</a>
        </div>
    </div>
    <div class="tab1__content" data-switchable-role="content">
        <div class="tab1__panel"  data-switchable-role="panel">
            TOP1：《魔兽世界》 - 国服直升90级服务开启
　　上周《魔兽世界》美服宣布第五部资料片《德拉诺之王》预售开始，并将于2014年秋天上线，这是WOW在全球首次如此早就宣布了下一个资料片的发售日期。同日，国服《魔兽世界》在线商店也已上线了“角色直升90级”的服务，玩家支付150战网点数购买这项服务，便能将一个低等级角色瞬间提升到90级。《魔兽世界》上周周均上涨20.65%，排名稳居第一。
        </div>
        <div class="tab1__panel" style="display: none" data-switchable-role="panel">
            TOP2：《炉石传说》 - 国服正式运营 紧追魔兽
　　3月13日，国服《炉石传说》正式运营开始，本次正式运营与美服同步。国服更新的补丁是4944，主要包括添加了金色英雄头像，添加新的卡牌背面图案，添加了《魔兽世界》坐骑炉石天马等，而之前官网预告的金色的格尔宾•梅卡托克卡牌已经绝版，现在只能用奥术之尘合成普通版卡牌。《炉石传说》正式运营当天游戏热度指数接近17万，整体大涨101.62%，排名连升三位，55340的热度指数紧追魔兽，目前位居第二。
        </div>
        <div class="tab1__panel" style="display: none" data-switchable-role="panel">
    TOP3：《激战2》 - 3月11日免费试玩开测
　　3月11日《激战2》开启了免费试玩，此次测试版本与全球同步，采用美服最新版本“狮城逃亡”，而且在测试期间，美服还将有一次的Living World的版本更新，国服也将最快在美服更新后的18小时同步上线。空中网此次对于《激战2》的宣传很是下工夫，不过玩家对于买断制、商城、VIP的共存还是抱着疑惑的态度。不过《激战2》的热度还是涨得很高，开测当天指数有8.7万，整体周均再涨43.16%，排名提升一位，目前位居第三。
        </div>
    </div>
</div>
````

####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/tabs'], function(Tabs) {
    var tabs = new Tabs({
        element: '#tab1',
        activeTriggerClass: 'selected',
        triggerType: 'click' //default: 'hover'
    });
});
````


###选项卡-s2
````html
<!-- 容器元素 -->
<div id="tab2" class="tab2">
    <div class="tab2__hd">
        <h3 class="tab2__title">模块标题</h3>
        <ul class="tab2__nav" data-switchable-role="nav">
            <li class="tab2__trigger tab2__trigger--round-left" data-switchable-role="trigger">周</li>
            <li class="tab2__trigger" data-switchable-role="trigger">月</li>
            <li class="tab2__trigger tab2__trigger--round-right" data-switchable-role="trigger">总</li>
        </ul>
    </div>
    <div class="tab2__content" data-switchable-role="content">
        <div class="tab2__panel"  data-switchable-role="panel">
            TOP1：《魔兽世界》 - 国服直升90级服务开启
　　上周《魔兽世界》美服宣布第五部资料片《德拉诺之王》预售开始，并将于2014年秋天上线，这是WOW在全球首次如此早就宣布了下一个资料片的发售日期。同日，国服《魔兽世界》在线商店也已上线了“角色直升90级”的服务，玩家支付150战网点数购买这项服务，便能将一个低等级角色瞬间提升到90级。《魔兽世界》上周周均上涨20.65%，排名稳居第一。
        </div>
        <div class="tab2__panel" style="display: none" data-switchable-role="panel">
            TOP2：《炉石传说》 - 国服正式运营 紧追魔兽
　　3月13日，国服《炉石传说》正式运营开始，本次正式运营与美服同步。国服更新的补丁是4944，主要包括添加了金色英雄头像，添加新的卡牌背面图案，添加了《魔兽世界》坐骑炉石天马等，而之前官网预告的金色的格尔宾•梅卡托克卡牌已经绝版，现在只能用奥术之尘合成普通版卡牌。《炉石传说》正式运营当天游戏热度指数接近17万，整体大涨101.62%，排名连升三位，55340的热度指数紧追魔兽，目前位居第二。
        </div>
        <div class="tab2__panel" style="display: none" data-switchable-role="panel">
            TOP3：《激战2》 - 3月11日免费试玩开测
　　3月11日《激战2》开启了免费试玩，此次测试版本与全球同步，采用美服最新版本“狮城逃亡”，而且在测试期间，美服还将有一次的Living World的版本更新，国服也将最快在美服更新后的18小时同步上线。空中网此次对于《激战2》的宣传很是下工夫，不过玩家对于买断制、商城、VIP的共存还是抱着疑惑的态度。不过《激战2》的热度还是涨得很高，开测当天指数有8.7万，整体周均再涨43.16%，排名提升一位，目前位居第三。
        </div>
    </div>
</div>

````

####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/tabs'], function(Tabs) {
    var tabs3 = new Tabs({
        element: '#tab2',
        triggerType: 'click',
        activeIndex: 1,
        activeTriggerClass: 'selected'
    });
});
````

###选项卡-s3
````html
<!-- 容器元素 -->
<div id="tab3" class="tab3">
    <div class="tab3__hd">
        <ul class="tab3__nav" data-switchable-role="nav">
            <li class="tab3__trigger" data-switchable-role="trigger">1</li>
            <li class="tab3__trigger" data-switchable-role="trigger">2</li>
            <li class="tab3__trigger" data-switchable-role="trigger">3</li>
        </ul>
    </div>
    <div class="tab3__content" data-switchable-role="content">
        <div class="tab3__panel" data-switchable-role="panel">
            <p>1</p>
            <p>11</p>
        </div>
        <div class="tab3__panel" style="display: none" data-switchable-role="panel">
            22222
        </div>
        <div class="tab3__panel" style="display: none" data-switchable-role="panel">
            <p>3</p>
            <p>33</p>
            <p>333</p>
        </div>
    </div>
</div>

````

####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/tabs', '$'], function(Tabs, $) {
    var tabs4 = new Tabs({
        element: '#tab3',
        activeTriggerClass: 'selected'
    });
});
````

