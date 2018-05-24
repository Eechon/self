# 文章滚动

---------

## 演示

###文章滚动-s1 
````html
<!-- 容器元素 -->
<div id="scrolltxt1" class="scrolltxt1">
    <ul data-switchable-role="content" class="scrolltxt1__content list-txt">
        <li class="scrolltxt1__item list-txt_item"><a href="#">CAPCOM表示中国《怪物猎人OL》计划明年发表</a>
        </li>
        <li class="scrolltxt1__item list-txt_item"><a href="#">命苦不能怪政府 游戏史上转瞬即逝短命鬼小盘点</a>
        </li>
        <li class="scrolltxt1__item list-txt_item"><a href="#">收费网游高风险中高机遇 动视暴雪占据半壁江山</a>
        </li>
    </ul>
    <span class="scrolltxt1__prev" data-switchable-role="prev"></span>
    <span class="scrolltxt1__next" data-switchable-role="next"></span>
</div>

````



####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/carousel', '$'], function(Carousel, $) {
    var carousel = new Carousel({
        element: '#scrolltxt1',
        duration: 300,
        effect: 'scrolly',
        easing: 'easeOutStrong',
        autoplay: true,
        activeIndex: 0
    }).render();

});
````

###文章滚动-s2 
````html
<!-- 容器元素 -->
<div id="scrolltxt2" class=" scrolltxt2">
    <ul data-switchable-role="content" class="scrolltxt2__content list-txt">
        <li class="scrolltxt2__item list-txt_item"><a href="#">CAPCOM表示中国《怪物猎人OL》计划明年发表</a></li>
        <li class="scrolltxt2__item list-txt_item"><a href="#">游戏史上转瞬即逝短命鬼小盘点</a></li>
        <li class="scrolltxt2__item list-txt_item"><a href="#">收费网游高风险中高机遇 动视暴雪占据半壁江山</a></li>
        <li class="scrolltxt2__item list-txt_item"><a href="#">收费网游高风险中高机遇 动视暴雪占据半壁江山</a></li>
        <li class="scrolltxt2__item list-txt_item"><a href="#">收费网游高风险中高机遇 动视暴雪占据半壁江山</a></li>
        <li class="scrolltxt2__item list-txt_item"><a href="#">收费网游高风险中高机遇 动视暴雪占据半壁江山</a></li>
        <li class="scrolltxt2__item list-txt_item"><a href="#">收费网游高风险中高机遇 动视暴雪占据半壁江山</a></li>
        <li class="scrolltxt2__item list-txt_item"><a href="#">收费网游高风险中高机遇 动视暴雪占据半壁江山</a></li>
    </ul>
    <span class="scrolltxt2__prev" data-switchable-role="prev"></span>
    <span class="scrolltxt2__next" data-switchable-role="next"></span>
</div>

````



####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/carousel', '$'], function(Carousel, $) {
    var $context = $('#scrolltxt2'),
        contentHeight = $context.find('[data-switchable-role="content"]').height(),
        maxHeight = $context.height();
    if(contentHeight < maxHeight){
        $context.find('[data-switchable-role="prev"]').hide();
        $context.find('[data-switchable-role="next"]').hide();
        return;
    }
    var carousel = new Carousel({
        element: $context,
        duration: 300,
        effect: 'scrolly',
        easing: 'easeOutStrong',
        autoplay: false,
        activeIndex: 0
    }).render();
});
````