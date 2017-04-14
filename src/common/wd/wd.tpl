{{#each list}}
<li class="wd-row thinner-bottom-border">
  <div class="wd-info clearfix">
      <a href="shop.html?shopid={{ID}}" class="ui-window">
          <span class="photo adjust-header thinner-border-photo">
              {{#if PHOTO}}
                <img src="{{PHOTO}}" alt=""/>
              {{else}}
                <img src="images-ext/default-photo.png" alt=""/>
              {{/if}}
          </span>
      </a>
    <a class="con ui-window" href="shop.html?shopid={{ID}}">
        <div>
            {{#if (neq PERSONALLABELS "undefined") }}
            <div class="name dots">{{NAME}}{{#if (tag-official ID) }}<span class="guan">官方</span>{{/if}}</div>
            <div class="tabParent">
                {{#each PERSONALLABELS}}
                <span class="tab"><span>{{this}}</span></span>
                {{/each}}
            </div>
            {{else}}
            <div class="name dots name-middle">{{NAME}}{{#if (tag-official ID) }}<span class="guan">官方</span>{{/if}}</div>
            {{/if}}



        </div>
    </a>


      <!--
      {{#if (neq NOTICE "undefined") }}
      <div class="notice dots">{{NOTICE}}</div>
      {{/if}}
      -->
    
    {{#if (eq isfollow "1") }}
    <a class="thinner-border focused iconfont  icon-correct"><i></i><span>已关注</span></a>
    {{else}}
    <a class="thinner-border focus-btn {{#if ../bInShell}}{{else}}zt-user{{/if}} iconfont icon-add" data-sid="{{ID}}"><i></i><span>关注</span></a>
    {{/if}}

  </div>

  <a class="con ui-window" href="shop.html?shopid={{ID}}">
  <div class="wd-info-btm clearfix">
    <div class="col3">
        <div class="lll-icon"><span data-view="{{ VIEW_COUNT }}">{{wan VIEW_COUNT}}</span></div>
      </div>
    <div class="col3">
        <div class="fs-icon"><span data-follow="{{ FOLLOW_COUNT }}">{{wan FOLLOW_COUNT}}</span></div>
    </div>
  	<div class="col3"><div class="pub-icon"><span data-vp="{{ VP_COUNT }}">{{VP_COUNT}}</span></div></div>
  </div>
  {{#if VP_SUMMARY}}
  <a class="wd-info-pub info-more-icon clearfix ui-window" href="{{#if AUDIO_LIST}}vp-detail-audio.html?vpid={{VP_ID}}&status=1{{else}}vp-detail.html?vpid={{VP_ID}}&status=1{{/if}}">
    <div class="pub-title dots">{{VP_SUMMARY}}</div>
    <div class="pub-time">{{show-time VP_TIME}}</div>
  </a>
  {{/if}}
  </a>
</li>
{{/each}}