# 手风琴

---------

## 演示

###手风琴-s1（横向折叠 click）
````html
<!-- 容器元素 -->
<div id="accordion1" class="accordion1">
    <div data-switchable-role="trigger" class="accordion1__trigger">
        <i></i>
        <h4 class="accordion1__title">标题1</h4>
    </div>
    <div data-switchable-role="panel" class="accordion1__item">
        <p>正文</p>
        <p>正文</p>
    </div>
    <div data-switchable-role="trigger" class="accordion1__trigger">
        <i></i>
        <h4 class="accordion1__title">标题2</h4>
    </div>
    <div data-switchable-role="panel" class="accordion1__item">
        <p>正文2</p>
        <p>正文2</p>
        <p>正文2</p>
        <p>正文2</p>
    </div>
    <div data-switchable-role="trigger" class="accordion1__trigger">
        <i></i>
        <h4 class="accordion1__title">标题3</h4>
    </div>
    <div data-switchable-role="panel" class="accordion1__item">
        <p>正文3</p>
        <p>正文</p>
        <p>正文</p>
    </div>
</div>

````

####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/accordion'], function(Accordion) {
    var accordion = new Accordion({
        element: '#accordion1',
        activeTriggerClass: 'selected'
    }).render();
});
````

###手风琴-s2（横向折叠 click）
````html
<!-- 容器元素 -->
<div id="accordion2" class="accordion2">
    <div data-switchable-role="trigger" class="accordion2__trigger">
        <i></i>
        <h4 class="accordion2__title">标题1</h4>
    </div>
    <div data-switchable-role="panel" class="accordion2__item">
        <p>正文</p>
        <p>正文</p>
    </div>
    <div data-switchable-role="trigger" class="accordion2__trigger">
        <i></i>
        <h4 class="accordion2__title">标题2</h4>
    </div>
    <div data-switchable-role="panel" class="accordion2__item">
        <p>正文2</p>
        <p>正文2</p>
        <p>正文2</p>
        <p>正文2</p>
    </div>
    <div data-switchable-role="trigger" class="accordion2__trigger">
        <i></i>
        <h4 class="accordion2__title">标题3</h4>
    </div>
    <div data-switchable-role="panel" class="accordion2__item">
        <p>正文3</p>
        <p>正文</p>
        <p>正文</p>
    </div>
</div>

````

####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/accordion'], function(Accordion) {
    var accordion2 = new Accordion({
        element: '#accordion2',
        activeTriggerClass: 'selected'
    }).render();
});
````

###手风琴-s3（纵向折叠 hover）
````html
<!-- 容器元素 -->
<div id="accordion3" class="accordion3">
    <div data-switchable-role="trigger" class="accordion3__trigger">
        <i></i>
        <h4 class="accordion3__title">标题1</h4>
    </div>
    <div data-switchable-role="panel" class="accordion3__item">
        <p>正文</p>
        <p>正文</p>
    </div>
    <div data-switchable-role="trigger" class="accordion3__trigger">
        <i></i>
        <h4 class="accordion3__title">标题2</h4>
    </div>
    <div data-switchable-role="panel" class="accordion3__item">
        <p>正文2</p>
        <p>正文2</p>
        <p>正文2</p>
        <p>正文2</p>
    </div>
    <div data-switchable-role="trigger" class="accordion3__trigger">
        <i></i>
        <h4 class="accordion3__title">标题3</h4>
    </div>
    <div data-switchable-role="panel" class="accordion3__item">
        <p>正文3</p>
        <p>正文</p>
        <p>正文</p>
    </div>
</div>

````



####调用方法
````javascript
seajs.use(['arale/switchable/1.0.2/accordion'], function(Accordion) {
    var accordion3 = new Accordion({
        element: '#accordion3',
        triggerType: 'hover',
        activeTriggerClass: 'selected'
    }).render();
});
````

