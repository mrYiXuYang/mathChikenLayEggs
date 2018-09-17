var Rnd={
	randNumber:function(sm,bg){//sm>0
    	var i=0;
    	i=Math.floor(Math.random()*bg);
    	while(i<=sm||i>=bg){
    		i=Math.floor(Math.random()*bg);	
    	}
    	return i;
	},
}
module.exports=Rnd;