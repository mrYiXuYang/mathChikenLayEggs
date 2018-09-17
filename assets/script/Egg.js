
var Rnd=require("Random");

cc.Class({
    extends: cc.Component,

    properties: {
        number:0,
        speed:0,
    },

    onLoad:function(){
        var r=0,g=0,b=0;
        do{
            r=Rnd.randNumber(0,266);
            g=Rnd.randNumber(0,266);
            b=Rnd.randNumber(0,266);
        }while(r+g+b>400)
        this.node.children[0].setColor(cc.color(r,g,b,255));
    },
    start:function(){
        this.node.children[0].getComponent(cc.Label).string=this.number;
        var ac=cc.moveTo(this.speed,this.node.position.x,-cc.director.getVisibleSize().height/2);
        this.node.runAction(ac);
        this.schedule(this.destroyEgg,1,1,this.speed);
    },
    destroyEgg:function(){
        this.node.destroy();
        cc.log("destroy()");
        this.unschedule(this.destroyEgg);
    },
    update:function(dt){

    },
});
