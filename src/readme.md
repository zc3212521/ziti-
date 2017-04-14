

#前端开发规范

##命名规范
	js,css,html文件的命名：xxx-xxx.html，xxx-xx-xx.js，xxx.css

##css样式命名
	.xxx-xx{
		
	}
	
	#xxx-xx{
	
	}
	
	a,div{
		
	}

##z-index的使用规范
	关于z-index的值的范围划分:
	code状态码除了0xxx以外的状态码现在更改如下:
        1111逻辑内部错误respJsonCommonErr的通用返回
        2001微店系统会话失效
        2002与第三方系统通信错误
        2006移动CRM会话失效
        3000 没有权限

        0xxx这样的返回code为正常业务状态码
	
###关于前端对于有访问权限的ajax请求，请使用$.ajaxp
	由于很多的异步数据请求均需要权限的限制，特此封装了ajaxp方法，使用和ajax没有区别
	当后台返回的数据code为1000时，表示用户未登录或者没有权限，页面会自动跳转到config.js
	
	PS：如果你的数据请求URL并不受权限限制，那么ajax和ajaxp两者都可以使用
	
	
###页面开发的时候可以复制template.html并替换里面的"template"字符串为你的html文件名
