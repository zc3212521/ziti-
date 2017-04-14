
##使用说明
	
###html文件中编写如下
	<ul class="add-content pro-type clearfix">
	  <li>
		<input type="radio" checked="checked"  name="pro-type" value="1"/><label>理财产品</label>
	  </li>
	  <li>
		<input type="radio" name="pro-type" value="2"/><label">服务产品</label>
	  </li>
	</ul>
	
###css定义布局样式
	.pro-type{
    }
    .pro-type li{
      float: left;
      margin-left: 10%;
      width: 40%;
      box-sizing: border-box;
    }
    
###js文件中对html中要应用复选组件进行初始化
		var radio = require("common/radio");
    	radio(".pro-type");
	
###设置不可选择
	修改html中的input，增加readonly属性即可
###根据value值选中某个项
	radio.selectByValue("fuwu");
