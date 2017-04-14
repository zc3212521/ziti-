<li id="{{ID}}" class="comment thinner-bottom-border">
  <div class="userphoto">
    <span class="photo"><img src="images-ext/default-photo.png"></span>
  </div>
  <div class="commentinfo" style="width:{{rightSideWidth}}px">
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
  </div>
</li>