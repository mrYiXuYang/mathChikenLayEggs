

cc.Class({
    extends: cc.Component,

    properties: {
        logo:{
            default:null,
            type:cc.Component,
        },
        ovtm:0,
        x:0,
        y:0,
    },

    onLoad:function(){
        var sz=cc.director.getVisibleSize();
        this.x=sz.width;
        this.y=sz.height;
        this.node.setPosition(0,0);
    },

    gameStart:function(){
        this.node.setScale(1,1);
        this.node.setPosition(0,0);
        var seq=cc.spawn(cc.moveTo(this.ovtm,-this.x/2,this.y/2),cc.fadeOut(this.ovtm),cc.scaleTo(this.ovtm,0.25,93/235));
        this.node.runAction(seq);
        this.node.setScale(1,1);
    },

    gameEnd(){
        this.node.setPosition(-this.x/2,this.y/2);
        this.node.setScale(1,1);
        this.node.setScale(0.25,93/235);
        //this.node.setColor(cc.color(255,255,255,255));
        
        var seq=cc.spawn(cc.moveTo(this.ovtm,0,0),cc.fadeIn(this.ovtm),cc.scaleTo(this.ovtm,1,1));
        this.node.runAction(seq);
        // this.node.setScale(1,1);
    },

    start:function() {
        //this.gameStart();
        this.gameEnd();
    },

});
