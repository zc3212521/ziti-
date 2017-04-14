

#前端开发规范

##命名规范

	js,css,html文件的命名：

	xxx-xxx.html，xxx.html,xxx-xxx-xxx.html
	xxx-xxx.js，xxx.js,xxx-xxx-xxx.js
	xxx-xxx.css，xxx.css,xxx-xxx-xxx.css



##html常用规范

    link放在head区域

    script写在body末尾

##css样式

	.xxx-xx{
		
	}
	
	#xxx-xx{
	
	}
	
	a,div{
		
	}
	.xxx .yyy .zzz{

	}

	.xxx.yyy{
	}

	.xxx>.yyy{
	}

	样式尽量不采用fixed布局,android版本兼容性



##js命名
    变量
    var xxx = null;

    方法
    var xxxAbc = function(){

    }

    function xxxAbc(){

    }

    代替this
    function aaaa(){
        var $this = this;
    }

    内部private变量
    var _xxx = null;

    常量
    var XXX = "";

    处理事件监听以Handler结尾
    $(".xx").on("click",loginHandler);






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

###关于真机远程调试
    当程序在真机上面运行出现样式布局上的问题的时候，最好的方式是直接能够在线调试，这时需要一个强大的工具:weinre
    可以通过npm install weinre -g 安装到本地，然后用这个命令启动weinre：
    ```js
    weinre --boundHost 0.0.0.0 --httpPort 8088
    ```
    将zepto.js里面最后一行的`//require("common/weinre");`释放开即可以在真机上运行，并且远程连接到启动的weinre服务器，
    这个时候，我们就可以访问weinre所在的服务器地址如：`http://10.29.28.146:8088`，
    通过这个页面就可以看到真机的页面代码和样式了

