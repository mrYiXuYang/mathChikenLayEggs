
cc.Class({
    extends: cc.Component,

    properties: {
        rankNb:0,
        ctrl:{
            default:null,
            type:cc.Component,
        },
        chk:{
            default:null,
            type:cc.Component,
        },
        ac:{
            default:null,
            type:cc.Prefab,
        },
        cns:{
            default:null,
            type:cc.Canvas,
        },
        acspeed:0,
        bgm:{
            default:null,
            type:cc.Component,
        },
        pltm:2,
        overFlag:false,
    },

    playVBgm:function(){
        this.bgm.getComponent("AudioPlay").onTrue();
    },
    pauseVbgm:function(){
        this.bgm.getComponent("AudioPlay").unTrue();
        this.unschedule(this.pauseVbgm);
    },

    onLoad:function(){
        this.node.getComponent(cc.Label).string=this.rankNb+"分";
    },
    setOperRankNb:function(argument) {
        var bgctrl=this.bgm.getComponent("AudioPlay");
        if(this.rankNb>=0){
            if(argument>0){
                var acn=cc.instantiate(this.ac);
                acn.parent=this.node;
                var obj=acn.getComponent("RankAc");
                obj.x=this.node.position.x;
                obj.y=this.node.position.y;
                obj.speed=this.acspeed;

                this.rankNb+=argument;
                
                acn.getComponent(cc.Label).string="+"+argument+"分";
                bgctrl.onTrue();
                this.schedule(this.pauseVbgm,1,1,this.pltm);
                this.schedule(this.addRank,1);
            }else {
                this.chk.getComponent("Chiken").dfatFlag=true;
                this.ctrl.gameEnd();
                cc.log("over");
                bgctrl.onOver();
                bgctrl.unBgm();
                this.overFlag=true;
            }
           
            
        }else{
        }
         this.ctrl.getComponent("Control").createItemOp();         
    },
    addRank:function(){
        this.node.getComponent(cc.Label).string=this.rankNb+"分";
        this.unschedule(this.addRank);
    },
});
