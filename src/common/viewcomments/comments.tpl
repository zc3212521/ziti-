{{#each list}}
<li id="{{ID}}" class="comment thinner-bottom-border">
  <div class="userphoto">
    <span class="photo"><img src="images-ext/default-photo.png"></span>
  </div>
  <div class="commentinfo" style="width:{{../rightSideWidth}}px">
    <div style="position: relative;">
      <div style="display: inline-block;">
        <div class="name">{{CUST_NAME}}</div>
        <div class="time2">{{show-time SUBMIT_DATETIME}}</div>
      </div>

      <div class="zanbtn" style="display: inline-block;">
        <a class="fav meizan zanCommentBtn" data-vid="{{ID}}">{{UPWARD_CNT}}</a>
      </div>
    </div>
    <div class="commentContent subactionbtn commentPa" data-id="{{ID}}">{{{cmt-content CONTENT}}}</div>

    {{#if (gt subComments.list.length 0) }}
    <div class="other-list">
      <ul>
      {{#each subComments.list}}
        {{#if (gt 3 @index) }}
        <li id="{{ID}}" data-parentliid="{{ID}}">
          <div>
            <span class="name">{{{cmt-reply-name CUST_NAME}}}</span>
            <span class="time">{{show-time SUBMIT_DATETIME}}</span>
          </div>
          <div>
            <div class="commentContent subactionbtn commentSub" data-id="{{ID}}">{{{cmt-content CONTENT}}}</div>
          </div>
        </li>
        {{/if}}
      {{/each}}
      </ul>
      {{#if (gt subComments.total 3) }}
      <div class="load-all-replay all-replay-btn" data-id="{{ID}}">
        查看全部<span class="subTotal">{{subComments.total}}</span>条回复
      </div>
      {{/if}}
    </div>
    {{/if}}
  </div>
  


</li>
{{/each}}