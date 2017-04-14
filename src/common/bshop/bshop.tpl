{{#each list}}
<li class="bs-row thinner-bottom-border">
    <div class="bs-info clearfix">
        <a href="branch-shop.html?shopid={{ID}}" class="ui-window">
            <span class="photo thinner-border-photo">
              {{#if PHOTO}}
                <img src="{{PHOTO}}" alt=""/>
              {{else}}
                <img src="images-ext/default-photo.png" alt=""/>
              {{/if}}
            </span>
        </a>
        <a class="con ui-window" href="branch-shop.html?shopid={{ID}}">
            {{#if (neq NOTICE "undefined") }}
            <div class="name dots">{{ NAME }}</div>
            <div class="notice dots">{{NOTICE}}</div>
            {{else}}
            <div class="name dots name-middle">{{ NAME }}</div>
            {{/if}}
        </a>
        {{#if (eq isfollow "1") }}
        <a class="thinner-border focused iconfont  icon-correct"><i></i><span>已关注</span></a>
        {{else}}
        <a class="thinner-border focus-btn {{#if ../bInShell}}{{else}}zt-user{{/if}} iconfont icon-add" data-sid="{{ID}}"><i></i><span>关注</span></a>
        {{/if}}
    </div>
    <div class="bs-info-btm clearfix">
        <div class="col3">
            <div class="lll-icon"><span data-view="{{VIEW_COUNT}}">{{VIEW_COUNT}}</span></div>
        </div>
        <div class="col3">
            <div class="fs-icon"><span data-follow="{{ FOLLOW_COUNT }}">{{ FOLLOW_COUNT }}</span></div>
        </div>
        <div class="col3">
            <div class="pub-icon"><span data-vp="{{ VP_COUNT }}">{{ VP_COUNT }}</span></div>
        </div>
    </div>
    {{#if VP_SUMMARY }}
    <a class="bs-info-pub info-more-icon clearfix ui-window" href="{{#if AUDIO_LIST}}vp-detail-audio.html?vpid={{VP_ID}}&status=1{{else}}vp-detail.html?vpid={{VP_ID}}&status=1{{/if}}">
        <div class="pub-title dots">{{ VP_SUMMARY }}</div>
        <div class="pub-time">{{show-time VP_TIME}}</div>
    </a>
    {{/if}}
</li>


{{/each}}