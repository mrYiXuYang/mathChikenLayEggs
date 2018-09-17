var nb=0;
var x=0;
var y=0;
cc.Class({
    extends: cc.Component,

    properties: {
        speed:0,

        flag:0,
        moveFlag:true,
        dfatFlag:false,
        rank:{
            default:null,
            type:cc.Label,
        },
        result:0,
    },
    update:function(dt){
        if(!this.moveFlag){
            return;
        }
        if(this.dfatFlag){
            return;
        }
        switch (this.flag) {
            case 0:break;
            case 1:this.node.setPosition(this.node.position.x+dt*this.speed,this.node.position.y);break;
            case 2:this.node.setPosition(this.node.position.x-dt*this.speed,this.node.position.y);break;
        }
        if(this.node.position.x<-x/2){
            this.node.setPosition(-x/2,this.node.position.y);
        }
        if(this.node.position.x>x/2){
            this.node.setPosition(x/2,this.node.position.y);
        }
    },
    onLoad:function(){
        var manager = cc.director.getCollisionManager();
        manager.enabled=true;
        x=cc.director.getVisibleSize().width;
        y=cc.director.getVisibleSize().height;
        this.node.setPosition(0,-y/2+40);
    },
    onCollisionEnter:function(other, slef){
        cc.log("on collision");
        nb= other.getComponent("Egg").number;
        var rk=this.rank.getComponent("Rank");
        if(!rk.overFlag){
            if(nb==this.result){
                rk.setOperRankNb(3);
                other.node.destroy();
            }else{
                rk.setOperRankNb(-2);
            }

        }
    },
});
