# 图片滚动

---------

## 演示

###图片滚动-s1 
````html
<!-- 容器元素 -->
<div id="scrollpic1" class="scrollpic1">
    <div class="scrollpic1__content">
        <ul data-switchable-role="content" class="list-pic">
            <li class="scrollpic1__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x1" alt="">
                    <em class="list-pic_tit">x也玩非主流</em></a>
            </li>
            <li class="scrollpic1__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x2" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic1__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x3" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic1__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x4" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic1__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x5" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic1__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x6" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic1__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x7" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic1__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x8" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
        </ul>
    </div>
    <div data-switchable-role="nav" class="remove"></div>
    <span class="scrollpic1__prev" data-switchable-role="prev">左</span>
    <span class="scrollpic1__next" data-switchable-role="next">右</span>
</div>

````

####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/carousel'], function(Carousel) {
    var carousel = new Carousel({
        element: '#scrollpic1',
        viewSize: [536],
        step: 4,
        easing: 'easeOutStrong',
        effect: 'scrollx',
        autoplay: true,
        duration: 300
    }).render();
});
````

###图片滚动-s2 
````html
<!-- 容器元素 -->
<div id="scrollpic2" class="scrollpic2">
    <div class="scrollpic2__content">
        <ul data-switchable-role="content" class="list-pic">
            <li class="scrollpic2__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x1" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic2__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x2" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic2__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x3" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic2__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x4" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic2__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x5" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic2__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x6" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic2__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x7" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic2__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/120x90x8" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
        </ul>
    </div>
    <div data-switchable-role="nav" class="remove"></div>
    <span class="scrollpic2__prev" data-switchable-role="prev">左</span>
    <span class="scrollpic2__next" data-switchable-role="next">右</span>
    <span class="step">
        <span id="currNum" class="step-curr">1</span>
        <span class="step-total">/4</span>
    </span>
</div>

````



####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/carousel'], function(Carousel) {
    var carousel2 = new Carousel({
        element: '#scrollpic2',
        viewSize: [284],
        step: 2,
        easing: 'easeOutStrong',
        effect: 'scrollx',
        autoplay: true,
        duration: 300
    }).render();

    carousel2.on('change:activeIndex', function(toIndex, fromIndex) {
        var currNum = document.getElementById('currNum');
        currNum.innerHTML = toIndex+1;
    });
});
````

###图片滚动-s3
````html
<!-- 容器元素 -->
<div id="scrollpic3" class="scrollpic3">
    <div class="scrollpic3__content">
        <ul data-switchable-role="content" class="list-pic">
            <li class="scrollpic3__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x1" alt="">
                    <em class="list-pic_tit">也玩非主流</em>
                </a>
            </li>
            <li class="scrollpic3__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x2" alt="">
                    <em class="list-pic_tit">也玩非主流</em>
                </a>
            </li>
            <li class="scrollpic3__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x3" alt="">
                    <em class="list-pic_tit">也玩非主流</em>
                </a>
            </li>
            <li class="scrollpic3__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x4" alt="">
                    <em class="list-pic_tit">也玩非主流</em>
                </a>
            </li>
            <li class="scrollpic3__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x5" alt="">
                    <em class="list-pic_tit">也玩非主流</em>
                </a>
            </li>
            <li class="scrollpic3__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x6" alt="">
                    <em class="list-pic_tit">也玩非主流</em>
                </a>
            </li>
            <li class="scrollpic3__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x7" alt="">
                    <em class="list-pic_tit">也玩非主流</em>
                </a>
            </li>
            <li class="scrollpic3__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x8" alt="">
                    <em class="list-pic_tit">也玩非主流</em>
                </a>
            </li>
        </ul>
    </div>
    <ul data-switchable-role="nav" class="scrollpic3__nav">
        <li class="scrollpic3__trigger"></li>
        <li class="scrollpic3__trigger"></li>
        <li class="scrollpic3__trigger"></li>
    </ul>
    <span class="scrollpic3__prev" data-switchable-role="prev">左</span>
    <span class="scrollpic3__next" data-switchable-role="next">右</span>
</div>

````


####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/carousel'], function(Carousel) {
    var carousel3 = new Carousel({
        element: '#scrollpic3',
        viewSize: [444],
        step: 3,
        easing: 'easeOutStrong',
        effect: 'scrollx',
        autoplay: true,
        activeTriggerClass: 'selected',
        duration: 300
    }).render();
});
````


###图片滚动-s4
````html
<!-- 容器元素 -->

<div id="scrollpic4" class="scrollpic4">
    <div class="scrollpic4__content">
        <ul data-switchable-role="content" class="list-pic">
            <li class="scrollpic4__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x1" alt="">
                    <em class="list-pic_tit">也玩非也玩非主流也玩非主流也玩非主流</em></a>
            </li>
            <li class="scrollpic4__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x2" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic4__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x3" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic4__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x4" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic4__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x5" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic4__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x6" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic4__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x7" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
            <li class="scrollpic4__item list-pic_item">
                <a class="list-pic_link" href="#">
                    <img class="list-pic_img" src="http://art.yypm.com/130x90x8" alt="">
                    <em class="list-pic_tit">也玩非主流</em></a>
            </li>
        </ul>
    </div>
    <div class="scrollpic4__ft">
        <span class="scrollpic4__prev" data-switchable-role="prev">左</span>
        <ul data-switchable-role="nav" class="scrollpic4__nav">
            <li class="scrollpic4__trigger"><a href="#">1</a></li>
            <li class="scrollpic4__trigger"><a href="#">2</a></li>
            <li class="scrollpic4__trigger"><a href="#">3</a></li>
        </ul>
        <span class="scrollpic4__next" data-switchable-role="next">右</span>
    </div>
</div>

````

####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/carousel'], function(Carousel) {
    var carousel3 = new Carousel({
        element: '#scrollpic4',
        viewSize: [444],
        step: 3,
        easing: 'easeOutStrong',
        effect: 'scrollx',
        autoplay: true,
        activeTriggerClass: 'selected',
        duration: 300
    }).render();
});
````