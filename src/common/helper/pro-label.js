/**
 * Created by lee on 16-3-14.
 */

module.exports = function(){
    //0,1,2,3,4,5
    var fxpj = (typeof this.FXPJ == "undefined")?"tag-fxpj":"tag-fxpj tag-fxpj"+this.FXPJ;
    return ("<span class='thinner-border "+fxpj+"'><i>"+this.FXPJ_MC+"</i></span>"||"") + " " + ("<span class='thinner-border "+fxpj+"'><i>"+this.CPLX_MC+"</i></span>"||"");
};