# 幻灯片

---------

## 演示

###幻灯片-s1

````html
<!-- 容器元素 -->

 <div id="slide1" class="slide1">
     <div class="slide1__content">
         <ul data-switchable-role="content">
             <li class="slide1__item"><a class="slide1__item-link" href="#"><img class="slide1__item-img" alt="" src="http://art.yypm.com/320x200x1"></a>
             </li>
             <li class="slide1__item"><a class="slide1__item-link" href="#"><img class="slide1__item-img" alt="" src="http://art.yypm.com/320x200x2"></a>
             </li>
             <li class="slide1__item"><a class="slide1__item-link" href="#"><img class="slide1__item-img" alt="" src="http://art.yypm.com/320x200x3"></a>
             </li>
         </ul>
     </div>
     <ul class="slide1__nav" data-switchable-role="nav">
         <li class="slide1__trigger"><a class="slide1__trigger-link" href="#">微软发布会总结：体感控制器Kinect非常赞！</a></li>
         <li class="slide1__trigger"><a class="slide1__trigger-link" href="#">任天堂发布会总结：N3DS和豪华游戏阵容公布！</a></li>
         <li class="slide1__trigger"><a class="slide1__trigger-link" href="#">索尼发布会总结：PS Move开创体感全新体验！</a></li>
     </ul>
 </div>

````


####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/slide', '$'], function(Slide, $) {
    var slide1 = new Slide({
        element: '#slide1',
        duration: 1000,
        effect: 'fade',
        easing: 'easeOutStrong',
        autoplay: false,
        activeTriggerClass: 'selected',
        activeIndex: 0
    }).render();

});
````

###幻灯片-s2
````html
<!-- 容器元素 -->
<div id="slide2" class="slide2">
    <div class="slide2__content">
        <ul data-switchable-role="content">
            <li class="slide2__item"><a class="slide2__item-link" href="#"><img class="slide2__item-img" alt="" src="http://art.yypm.com/320x200x1"></a>
            </li>
            <li class="slide2__item"><a class="slide2__item-link" href="#"><img class="slide2__item-img" alt="" src="http://art.yypm.com/320x200x2"></a>
            </li>
            <li class="slide2__item"><a class="slide2__item-link" href="#"><img class="slide2__item-img" alt="" src="http://art.yypm.com/320x200x3"></a>
            </li>
        </ul>
    </div>
    <ul data-switchable-role="nav" class="slide2__nav">
        <li class="slide2__trigger">1</li>
        <li class="slide2__trigger">2</li>
        <li class="slide2__trigger">3</li>
    </ul>
</div>

````


####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/slide'], function(Slide) {
    var slide2 = new Slide({
        element: '#slide2',
        duration: 300,
        effect: 'scrolly',
        easing: 'easeOutStrong',
        autoplay: true,
        activeTriggerClass: 'selected',
        activeIndex: 0
    }).render();

});
````

###幻灯片-s3
````html
<!-- 容器元素 -->
<div id="slide3" class="slide3">
    <div class="slide3__content">
        <ul data-switchable-role="content">
            <li class="slide3__item"><a class="slide3__item-link" href="#"><img class="slide3__item-img" alt="" src="http://art.yypm.com/480x240x1"></a>
            </li>
            <li class="slide3__item"><a class="slide3__item-link" href="#"><img class="slide3__item-img" alt="" src="http://art.yypm.com/480x240x2"></a>
            </li>
            <li class="slide3__item"><a class="slide3__item-link" href="#"><img class="slide3__item-img" alt="" src="http://art.yypm.com/480x240x3"></a>
            </li>
        </ul>
    </div>
    <ul data-switchable-role="nav" class="slide3__nav">
        <li class="slide3__trigger">1</li>
        <li class="slide3__trigger">2</li>
        <li class="slide3__trigger">3</li>
    </ul>
    <span class="slide3__prev" data-switchable-role="prev">上一页</span>
    <span class="slide3__next" data-switchable-role="next">下一页</span>
</div>

````


####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/carousel'], function(Carousel) {
    var carousel = new Carousel({
        element: '#slide3',
        duration: 300,
        effect: 'scrollx',
        easing: 'easeOutStrong',
        autoplay: false,
        activeTriggerClass: 'selected',
        activeIndex: 0
    }).render();
});
````

###幻灯片-s4
````html
<!-- 容器元素 -->
<div id="slide4" class="slide4">
    <div class="slide4__content">
        <ul data-switchable-role="content">
            <li class="slide4__item"><a class="slide4__item-link" href="#"><img class="slide4__item-img" alt="" src="http://art.yypm.com/650x285x1"></a>
                <p class="slide4__intro">我是长标题长标题吃标题</p>
            </li>
            <li class="slide4__item"><a class="slide4__item-link" href="#"><img class="slide4__item-img" alt="" src="http://art.yypm.com/650x285x2"></a>
                <p class="slide4__intro">我是标题吃题</p>
            </li>
            <li class="slide4__item"><a class="slide4__item-link" href="#"><img class="slide4__item-img" alt="" src="http://art.yypm.com/650x285x3"></a>
                <p class="slide4__intro">我是长标题长标题长标题吃标题</p>
            </li>
            <li class="slide4__item"><a class="slide4__item-link" href="#"><img class="slide4__item-img" alt="" src="http://art.yypm.com/650x285x4"></a>
                <p class="slide4__intro">我是标题吃题</p>
            </li>
            <li class="slide4__item"><a class="slide4__item-link" href="#"><img class="slide4__item-img" alt="" src="http://art.yypm.com/650x285x5"></a>
                <p class="slide4__intro">我是长标题长标题吃标题</p>
            </li>
            <li class="slide4__item"><a class="slide4__item-link" href="#"><img class="slide4__item-img" alt="" src="http://art.yypm.com/650x285x6"></a>
                <p class="slide4__intro">我是标题吃题</p>
            </li>
            <li class="slide4__item"><a class="slide4__item-link" href="#"><img class="slide4__item-img" alt="" src="http://art.yypm.com/650x285x7"></a>
                <p class="slide4__intro">我是长标题长标题长标题吃标题</p>
            </li>
        </ul>
    </div>
    <ul data-switchable-role="nav" class="slide4__nav">
        <li class="slide4__trigger"><i></i><img class="slide4__trigger-img" src="http://art.yypm.com/80x40x1" alt=""></li>
        <li class="slide4__trigger"><i></i><img class="slide4__trigger-img" src="http://art.yypm.com/80x40x2" alt=""></li>
        <li class="slide4__trigger"><i></i><img class="slide4__trigger-img" src="http://art.yypm.com/80x40x3" alt=""></li>
        <li class="slide4__trigger"><i></i><img class="slide4__trigger-img" src="http://art.yypm.com/80x40x4" alt=""></li>
        <li class="slide4__trigger"><i></i><img class="slide4__trigger-img" src="http://art.yypm.com/80x40x5" alt=""></li>
        <li class="slide4__trigger"><i></i><img class="slide4__trigger-img" src="http://art.yypm.com/80x40x6" alt=""></li>
        <li class="slide4__trigger"><i></i><img class="slide4__trigger-img" src="http://art.yypm.com/80x40x7" alt=""></li>
    </ul>
</div>

````


####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/slide'], function(Slide) {
    var slide4 = new Slide({
        element: '#slide4',
        duration: 300,
        effect: 'fade',
        easing: 'easeOutStrong',
        autoplay: true,
        activeTriggerClass: 'selected'
    }).render();
});
````

###幻灯片-s5
````html
<!-- 容器元素 -->
<div id="slide5" class="slide5">
    <div class="slide5__content">
        <ul data-switchable-role="content">
            <li class="slide5__item"><a class="slide5__item-link" href="#"><img class="slide5__item-img" alt="" src="http://art.yypm.com/550x235x1"></a>
                <p class="slide5__intro">我是长标题长标题吃标题</p>
            </li>
            <li class="slide5__item"><a class="slide5__item-link" href="#"><img class="slide5__item-img" alt="" src="http://art.yypm.com/550x235x2"></a>
                <p class="slide5__intro">我是标题吃题</p>
            </li>
            <li class="slide5__item"><a class="slide5__item-link" href="#"><img class="slide5__item-img" alt="" src="http://art.yypm.com/550x235x3"></a>
                <p class="slide5__intro">我是长标题长标题长标题吃标题</p>
            </li>
            <li class="slide5__item"><a class="slide5__item-link" href="#"><img class="slide5__item-img" alt="" src="http://art.yypm.com/550x235x4"></a>
                <p class="slide5__intro">我是长标题长标题长标题吃标题</p>
            </li>
            <li class="slide5__item"><a class="slide5__item-link" href="#"><img class="slide5__item-img" alt="" src="http://art.yypm.com/550x235x5"></a>
                <p class="slide5__intro">我是长标题长标题长标题吃标题</p>
            </li>
        </ul>
    </div>
    <ul data-switchable-role="nav" class="slide5__nav">
        <li class="slide5__trigger"><i></i><img class="slide5__trigger-img" src="http://art.yypm.com/80x40x1" alt=""></li>
        <li class="slide5__trigger"><i></i><img class="slide5__trigger-img" src="http://art.yypm.com/80x40x2" alt=""></li>
        <li class="slide5__trigger"><i></i><img class="slide5__trigger-img" src="http://art.yypm.com/80x40x3" alt=""></li>
        <li class="slide5__trigger"><i></i><img class="slide5__trigger-img" src="http://art.yypm.com/80x40x4" alt=""></li>
        <li class="slide5__trigger"><i></i><img class="slide5__trigger-img" src="http://art.yypm.com/80x40x5" alt=""></li>
    </ul>
</div>

````


####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/slide'], function(Slide) {
    var slide5 = new Slide({
        element: '#slide5',
        duration: 300,
        effect: 'scrollx',
        easing: 'easeOutStrong',
        autoplay: true,
        activeTriggerClass: 'selected'
    }).render();
});
````

###幻灯片-s6
````html
<!-- 容器元素 -->
<div id="slide6" class="slide6">
    <span class="slide6__prev" data-switchable-role="prev">&lsaquo; 上一页</span>
    <span class="slide6__next" data-switchable-role="next">下一页 &rsaquo;</span>
    <div class="slide6__content">
        <ul data-switchable-role="content">
            <li class="slide6__item"><img src="http://art.yypm.com/300x80x1" alt="" class="slide6__item-img"></li>
            <li class="slide6__item"><img src="http://art.yypm.com/300x80x2" alt="" class="slide6__item-img"></li>
            <li class="slide6__item"><img src="http://art.yypm.com/300x80x3" alt="" class="slide6__item-img"></li>
        </ul>
    </div>
</div>

````


####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/carousel'], function(Carousel) {
    var slide6 = new Carousel({
        element: '#slide6',
        hasTriggers: false,
        easing: 'easeOutStrong',
        effect: 'scrollx',
        step: 2,
        viewSize: [332],
        circular: false,
        autoplay: false
    }).render();
});
````



