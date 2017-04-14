{{#each list}}
<div class="pub thinner-bottom-border">
    {{#if (eq showPerson "1") }}
    {{else}}

    <div class="pub-wd clearfix">
        <a class="ui-window" href="shop.html?shopid={{SID}}">
            <span class="photo thinner-border-photo">
                {{#if PHOTO}}
                    <img src="{{PHOTO}}" alt=""/>
                {{else}}
                    <img src="images-ext/default-photo-small.png" alt=""/>
                {{/if}}
            </span>
        </a>
        <a class="ui-window" href="{{#if VIDEO_LIST}}vp-detail-video.html?hTitle=观点详情&vpid={{VP_ID}}&status=1&TITLE={{TITLE}}&SUMMARY={{SUMMARY}}&SNAME={{SNAME}}&PUBLISH_TIME={{PUBLISH_TIME}}&VIEW_COUNT={{VIEW_COUNT}}&PHOTO={{PHOTO}}&SID={{SID}}&VIDEO_LIST={{VIDEO_LIST}}{{else}}{{#if AUDIO_LIST}}vp-detail-audio.html?hTitle=观点详情&vpid={{VP_ID}}&status=1&TITLE={{TITLE}}&SUMMARY={{SUMMARY}}&SNAME={{SNAME}}&PUBLISH_TIME={{PUBLISH_TIME}}&VIEW_COUNT={{VIEW_COUNT}}&PHOTO={{PHOTO}}&SID={{SID}}&AUDIO_LIST={{AUDIO_LIST}}{{else}}vp-detail.html?hTitle=观点详情&vpid={{VP_ID}}&status=1&TITLE={{TITLE}}&SUMMARY={{SUMMARY}}&SNAME={{SNAME}}&PUBLISH_TIME={{PUBLISH_TIME}}&VIEW_COUNT={{VIEW_COUNT}}&PHOTO={{PHOTO}}&SID={{SID}}{{/if}}{{/if}}">
            <div class="info">
                <div class="name dots">{{SNAME}}{{#if (tag-official SID) }}<span class="guan">官方</span>{{/if}}</div>
            </div>
        </a>
    </div>
    {{/if}}


  <a class="ui-window" href="{{#if VIDEO_LIST}}vp-detail-video.html?hTitle=观点详情&vpid={{VP_ID}}&status=1&TITLE={{TITLE}}&SUMMARY={{SUMMARY}}&SNAME={{SNAME}}&PUBLISH_TIME={{PUBLISH_TIME}}&VIEW_COUNT={{VIEW_COUNT}}&PHOTO={{PHOTO}}&SID={{SID}}&VIDEO_LIST={{VIDEO_LIST}}{{else}}{{#if AUDIO_LIST}}vp-detail-audio.html?hTitle=观点详情&vpid={{VP_ID}}&status=1&listType={{listType}}&TITLE={{TITLE}}&SUMMARY={{SUMMARY}}&SNAME={{SNAME}}&PUBLISH_TIME={{PUBLISH_TIME}}&VIEW_COUNT={{VIEW_COUNT}}&PHOTO={{PHOTO}}&SID={{SID}}&AUDIO_LIST={{AUDIO_LIST}}{{else}}vp-detail.html?hTitle=观点详情&vpid={{VP_ID}}&status=1&listType={{listType}}&TITLE={{TITLE}}&SUMMARY={{SUMMARY}}&SNAME={{SNAME}}&PUBLISH_TIME={{PUBLISH_TIME}}&VIEW_COUNT={{VIEW_COUNT}}&PHOTO={{PHOTO}}&SID={{SID}}{{/if}}{{/if}}">
    <div class="pub-content">
        {{#if IMAGE_LIST}}
        <div class="pic-div">
            <img class="pub-pic" src="{{first-pic IMAGE_LIST}}_m.jpg">
           {{#if VIDEO_LIST}}
                <img class="playIcon" src="videoPlayer/html/skins/playIcon.png"/>
            {{/if}}
        </div>
        {{/if}}

      <div {{#if IMAGE_LIST}}class="text-div"{{/if}}>
        <div class="pub-title dots">
        {{TITLE}}
        </div>
        <div class="pub-body">
            {{#if AUDIO_LIST}}
                <span class="sound playsounds"></span>
            {{else}}
                {{{SUMMARY}}}
            {{/if}}
        </div>
      </div>

    </div>
  </a>

<div class="pub-bottom clearfix">
    <span class="pub-date">{{show-time PUBLISH_TIME}}</span>
    <a class="fav meizan zanButton" data-vid="{{VP_ID}}">{{ZAN_COUNT}}</a>
    <span class="pub-view">{{VIEW_COUNT}}</span>
</div>



</div>
{{/each}}