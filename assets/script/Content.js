
cc.Class({
    extends: cc.Component,

    properties: {
        chk:{
            default:null,
            type:cc.Component,
        },
        wh:{
            default:0,
            type:cc.Integer,
            visible:false,
        },
        ht:{
            default:0,
            type:cc.Integer,
            visible:false,
        },
        bfFlag:0,
    },

    setFlag:function(event){
        var x=event.getLocationX();
        var px=this.chk.node.position.x;
        var ck=this.chk.getComponent("Chiken"); 
        if(x>this.wh/2){
            ck.flag=1;

        }else if(x<this.wh/2){
            ck.flag=2;
        }else{
            this.chk.getComponent("Chiken").flag=0;
        }
    },
    setOverFlag:function(event){
        this.chk.getComponent("Chiken").flag=0;
    },
    onLoad () {

        var wnsize=cc.director.getVisibleSize();
        this.wh=wnsize.width;
        this.ht=wnsize.height;

        this.node.on(cc.Node.EventType.TOUCH_START,this.setFlag,this);
        this.node.on(cc.Node.EventType.MOUSE_DOWN,this.setFlag,this);
        this.node.on(cc.Node.EventType.MOUSE_UP,this.setOverFlag,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.setOverFlag,this);        

    },
});
