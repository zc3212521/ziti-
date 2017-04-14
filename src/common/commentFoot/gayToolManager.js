/**
 * Created by Administrator on 2016/12/8.
 * 程序中对象对应的标识：viewGay+观点ID
 */

function gayToolManager(){
    this.gay = new gayObj();

    /**
     * 判断是否禁言，在发送评论后校验
     * @param newC 最新发送的内容
     * @param newT 最新发送的时间
     */
    gayToolManager.prototype.checkGay =function(newC,newT){
        //内容操作
        if(this.gay.c_count ===-1){
            this.gay.c_up=newC;
            this.gay.c_count =0;
        }else{
            if(this.gay.c_up ===newC){
                this.gay.c_count++;
            }else{
                this.gay.c_up =newC;
                this.gay.c_count =0;
            }
        }

        //时间间隔操作
        if(this.gay.t_count ===-1){
            this.gay.t_up=newT;
            this.gay.t_count =0;
        }else{
            if((newT -this.gay.t_up) < this.gay.interval){
                console.log(newT -this.gay.t_up);
                this.gay.t_up=newT;
                this.gay.t_count++;
            }else{
                this.gay.t_up=newT;
                this.gay.t_count =0;
            }
        }

        if(this.gay.c_count===4 ||this.gay.t_count===4){
            this.gay.gayStartTime =newT;
            this.gay.gayStatus =true;
        }
    }

    /**
     * 在点击评论按钮时校验标志
     * @param newT 校验时的时间
     * @returns {boolean} 是否禁言，true禁言，false不禁言
     */
    gayToolManager.prototype.isGay =function(newT){
        if(this.gay.gayStatus){
            if((newT -this.gay.gayStartTime) < this.gay.gayTime){
                return true;
            }else if( (newT -this.gay.gayStartTime) >= this.gay.gayTime){
                this.gay = new gayObj();
                return false;
            }
        }else{
            return false;
        }

    }
    /**
     * 更新sessionStorage的gay
     * @param vpid 观点id
     */
    gayToolManager.prototype.updateSessionStorageGay =function(vpid,content){
        var id = "viewGay"+vpid;
        var gayS = window.sessionStorage.getItem(id);
        if(gayS){
            var tempGayObj = JSON.parse(gayS);
           this.gay = tempGayObj;
            this.checkGay(content,new Date().getTime());
            window.sessionStorage.setItem(id, this.gayToStr());

        }else{
            var gayO = new gayObj();
            this.gay =gayO;
            this.checkGay(content,new Date().getTime());
            window.sessionStorage.setItem(id, this.gayToStr());
           var sessionStorageGays = window.sessionStorage.getItem("sessionStorageGays");
            if(sessionStorageGays){
                sessionStorageGays =sessionStorageGays+"#"+id;
                window.sessionStorage.setItem("sessionStorageGays",sessionStorageGays);
            }else{
                window.sessionStorage.setItem("sessionStorageGays",id);
            }
        }
    }

    gayToolManager.prototype.updateGay =function(vpid){
        var id = "viewGay"+vpid;
        var gayS = window.sessionStorage.getItem(id);
        if(gayS){
            var tempGayObj = JSON.parse(gayS);
            this.gay = tempGayObj;
        }
    }

    gayToolManager.prototype.setGay =function(newGay){
        this.gay =newGay;
    }
    gayToolManager.prototype.getGay =function(newT){
        return this.gay;
    }
    gayToolManager.prototype.gayToStr =function(){
        return JSON.stringify(this.gay);
    }

}

function gayObj(){
    //上次发送评论内容
    this.c_up ="";
    //连续内容相同次数
    this.c_count =-1;
    //上次发送评论时间
    this.t_up =0;
    //连续发送时间小于60s次数
    this.t_count =-1;
    //禁言开始时间Date.getTime( )
    this.gayStartTime =0;
    //禁言总时间毫秒
    this.gayTime =10*60*1000;
    //每次时间间隔毫秒
    this.interval =60*1000;
    //是否禁言：true禁言，false：不禁言；
    this.gayStatus =false;


}






module.exports = gayToolManager;