// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        speed:0,
        x:0,
        y:0,
        hdt:0,
        adt:0,
        a:255,
    },
    onLoad:function(){
        this.adt=255/2/this.speed;
        this.node.setPosition(this.x,this.y-this.hdt);
        var ac=cc.moveTo(this.speed,this.x,this.y);

        this.node.runAction(ac);
        this.schedule(this.destoryNode,1,1,this.speed);
        this.schedule(this.changeColor,0.5);
    },

    changeColor:function(){
        this.a-=this.adt;
        this.node.setColor(cc.color(0,255,0,this.a))
    },

    destoryNode:function(){
        this.unschedule(this.destoryNode);
        this.unschedule(this.changeColor);
        this.node.destroy();
    },

});
