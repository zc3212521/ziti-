
##使用说明
	
###html文件中编写如下
	<ul class="add-content pro-type1 clearfix">
	  <li>
		<input type="checkbox" checked="checked"  name="pro-type1" value="1"/><label>理财产品</label>
	  </li>
	  <li>
		<input type="checkbox" name="pro-type1" value="2"/><label>服务产品</label>
	  </li>
	  <li>
		<input type="checkbox" name="pro-type1" value="2"/><label>服务产品1</label>
	  </li>
	</ul>
	
###css定义布局样式
	.pro-type1{
    }
    
    .pro-type1 li{
      float: left;
      margin-left: 10%;
      width: 23.33%;
      box-sizing: border-box;
    }
    
###js文件中对html中要应用复选组件进行初始化
		var checkbox = require("common/checkbox");
    	var check = new checkbox(".pro-type1");
    	//全选 和 取消全选接口
    	check.selectAll(true);
    	check.selectAll(false);
    	
###增加val方法
	check.val()，将返回所有选中的值，多个为数组，单个为值
	
###设置不可选择
	修改html中的input，增加readonly属性即可
	
###根据value值选中某些项
	check.selectByValue(1);
	check.selectByValue([1,2]);
	