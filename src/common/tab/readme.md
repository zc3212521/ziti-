#���ʹ��tab���

```
    var myTab1 = new tab(".my-tab1");

    var myTab2 = new tab(".my-tab2",0);

    var myTab3 = new tab(".my-tab3",0,true);

```

###myTab1��myTab2

####html����
```
<ul class="tab-menu live-tab">
  <li class="first menu on" data-tab-panel="#main-chat-area">
      <a>ֱ����</a>
  </li>
  <li class="menu" data-tab-panel="#second-chat-area">
      <a>������</a>
  </li>
</ul>

<div class="tab-panel" id="main-chat-area">
</div>
<div class="tab-panel" id="second-chat-area">
</div>
```


###myTab3

####html����
```
<ul class="tab-menu live-tab">
  <li class="first menu on" data-tab-panel="#main-chat-area">
      <a>ֱ����</a>
  </li>
  <li class="menu" data-tab-panel="#second-chat-area">
      <a>������</a>
  </li>
</ul>
<div class="tab-content">
    <div class="tab-panel wrapper" id="main-chat-area">
      <div class="scroller">
        <ul class="list">
        </ul>
      </div>
    </div>
    <div class="tab-panel wrapper" id="second-chat-area">
      <div class="scroller">
        <ul class="list">
        </ul>
      </div>
    </div>
</div>
```