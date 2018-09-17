var Rnd=require("Random");
var rund=new Array();
var wdth=0;
var het=0;
var count=0;
var beforeX=0;

cc.Class({
    extends: cc.Component,

    properties: {
        eggs:{
            default:null,
            type:cc.Prefab
        },
        chk:{
            default:null,
            type:cc.Label,
        },
        chkp:{
            default:null,
            type:cc.Component,
        },
        logo:{
            default:null,
            type:cc.Component,
        },
        bgm:{
            default:null,
            type:cc.Component,
        },
        rank:{
            default:null,
            type:cc.Component,
        },
        speed:0,
        result:0,
        createSpeed:0.4,
        createTrueSpeed:1,
        flusOperSpeed:5,
    },

    beforeCreate:function(){
        var sze=cc.director.getVisibleSize()
        wdth=sze.width;
        het=sze.height;
        count=wdth/10;
        rund[0]=0;
        for(var i=1;i<11;i++){
            rund[i]=rund[i-1]+count;
        }
    },

    createPosition:function(){
        var i=Rnd.randNumber(0,11);
        var x=Rnd.randNumber(rund[i-1],rund[i]);
        var result=x-wdth/2;
        return result;
    },

    createTrueEgg:function(){

        var nd=cc.instantiate(this.eggs);

        var x=0;
        do{
            x=this.createPosition();
        }while(Math.abs(x-beforeX)<100)
        beforeX=x;
        
        nd.setPosition(x,het/2);
        nd.getComponent("Egg").number=this.result;
        nd.getComponent("Egg").speed=this.speed;
        nd.parent=this.node;
    },

    createEgg:function(){
        var nd=cc.instantiate(this.eggs);
        var x=0;
        do{
            x=this.createPosition();
        }while(Math.abs(x-beforeX)<100)
        beforeX=x;
        nd.setPosition(x,het/2);
        nd.getComponent("Egg").number=Rnd.randNumber(0,100);
        nd.getComponent("Egg").speed=this.speed;
        nd.parent=this.node;

    },

    createItemOp:function(){
        var str="";
        var x=Rnd.randNumber(0,10);
        var y=Rnd.randNumber(0,10);
        var op=Rnd.randNumber(0,3);
        switch (op) {
            case 1:this.result=x+y;str=x+"+"+y;break;
            case 2:this.result=x-y;str=x+"-"+y;break;
            default:this.result=x+y;str=x+"+"+y;break;
        }
        this.chk.getComponent(cc.Label).string=str;
        this.chkp.getComponent("Chiken").result=this.result;
    },

    gameStart:function(){
        this.logo.getComponent("LogoFlash").gameStart();
        this.schedule(function call(){
            this.bgm.getComponent("AudioPlay").onBgm();
            this.rank.getComponent("Rank").overFlag=false;
            this.chkp.getComponent("Chiken").moveFlag=true;
            this.chkp.getComponent("Chiken").dfatFlag=false;
            this.beforeCreate();
            this.createItemOp();
            this.schedule(this.createEgg,this.createSpeed);
            this.schedule(this.createTrueEgg,this.createTrueSpeed);
            this.unschedule(call);
        },1,1,this.logo.getComponent("LogoFlash").ovtm);
    },

    gameEnd:function(){
        this.unscheduleAllCallbacks();
        this.logo.getComponent("LogoFlash").gameEnd();
        this.rank.getComponent(cc.Label).string="你输了";
        this.rank.getComponent("Rank").rankNb=0;
    },
    onExitGame:function(event){
        switch(event.keyCode) {
        case cc.KEY.back:cc.director.end();
            break;
         }
    },
    exitGame:function(){
        cc.director.end();
    },

    onLoad:function(){
        //this.gameStart();
        this.bgm.getComponent("AudioPlay").onBgm();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onExitGame, this);
    },
});
