function Slide(wrap,cont){
  this.winW = document.documentElement.clientWidth;
  this.winH = document.documentElement.clientHeight;
  this.wrap = document.getElementById(wrap);
  this.cont = document.getElementById(cont);
  this.cont_li = this.cont.getElementsByTagName("li");
  this.cont_li_length = this.cont_li.length;
  this.share = document.getElementById('share');
  this.debug = document.getElementById('debug');
  this.popwin = document.getElementById('popwin');
  this.guide = document.getElementById('guide');
  this.startN = 0;
  this.prev = 0;
  this.startX = 0;
  this.startY = 0;
  this.endX = 0;
  this.transX = 0;
  this.transY = 0;
}

Slide.prototype = {
  init:function(){
    this.resize();
    this.cont_li[0].style.opacity = '1';
    for(var i=1;i<this.cont_li_length;i++){
      this.cont_li[i].style.webkitTransform = 'translate3d(0,'+this.winH+'px,0)';
    }
    this.addHandler(this.wrap,"touchstart",this.bind_fn(this,this.touch_start));
    this.addHandler(this.wrap,"touchmove",this.bind_fn(this,this.touch_move));
    this.addHandler(this.wrap,"touchend",this.bind_fn(this,this.touch_end));
    //share
   // this.addHandler(this.debug,"click",this.bind_fn(this,this.fnClick));
    //this.addHandler(this.popwin,"click",this.bind_fn(this,this.fnShare));
  },
  resize : function(){
    this.winH = document.documentElement.clientHeight;
    this.wrap.style.height = this.popwin.style.height = this.winH+"px";

    for(var i=0;i<this.cont_li.length;i++){
      this.cont_li[i].style.height = this.winH+'px';
    }
  },
  addHandler : function(elem,evtype,fn){
    if(elem.attachEvent){
      elem.attachEvent('on'+evtype,fn);
    }else if(elem.addEventListener){
      elem.addEventListener(evtype,fn,false);
    }else{
      elem["on"+evtype] = fn;
    }
  },
  bind_fn : function(obj,func){
    return function(){
      func.apply(obj,arguments);
    }
  },
  touch_start : function(e){
    if(!event.touches.length) return;
    var touch = event.touches[0];
        this.startX = touch.pageX;
        this.startY = touch.pageY;
		this.transY = 0;
		this.transX = 0;
		//event.preventDefault();
  },
  touch_move : function(e){
    if(!event.touches.length) return;
    var touch = event.touches[0];
    this.transX = this.startX-touch.pageX;
    this.transY = this.startY-touch.pageY;
	
    e.preventDefault();

    if(Math.abs(this.transY)>Math.abs(this.transX)){
		
      this.transY = this.startY-touch.pageY;
      this.prev = this.transY/Math.abs(this.transY);
      var index = this.startN+this.prev;
      if(typeof this.cont_li[index] != 'undefined'){
        this.cont_li[index].style.opacity = 1;
        this.cont_li[index].style.zIndex = 50;
        this.cont_li[index].style.webkitTransitionDuration = 0;
		
        this.cont_li[index].style.webkitTransform = "translate3d(0,"+(this.prev*this.winH-(this.transY))+"px," + this.prev + "px)";
		//this.cont_li[this.startN].style.webkitPerspective = "30";
		//this.cont_li[this.startN].style.webkitTransformOrigin ="50% 50% 100px";
        this.cont_li[this.startN].style.webkitTransitionDuration = 0;
		//this.cont_li[this.startN].style.webkitTransform = "translate3d(" + this.transX + "px,80px,70px) rotate3d(1,0,0,40deg)";
        this.cont_li[this.startN].style.webkitTransform = 'translate3d(0,'+(-(0.2*this.transY))+'px,0) scale('+(1000-Math.abs(this.transY)*0.4)/1000+')';
        this.cont_li[this.startN].style.zIndex=20;
      }
    }
  },
  touch_end : function(){
    if(Math.abs(this.transY)>20){
      this.play(this.startN+this.prev);
    }else{
		if(this.transX < 0){
			movePhoto(-1);
		}else{
			movePhoto(1);
		}
		
	}
  },
  play : function(n){
    var _=this;
    if(n>=this.cont_li_length){
      n = this.cont_li_length-1;
    }
    if(n<0){
      n = 0;
    }
    if(typeof this.cont_li[n] != 'undefined'){
      this.cont_li[n].style.webkitTransitionDuration = '300ms';
      this.cont_li[n].style.webkitTransform = 'translate3d(0,0,0)';
      this.cont_li[n].style.zIndex = 50;


      if(n == this.cont_li.length-1){
        this.guide.style.display = 'none';
      }else{
        this.guide.style.display = '';
      }
	  
	  switch(n){
		case 0:init_1();break;
		case 1:init_2();break;
		case 2:init_3();break;
		case 3:init_4();break;
		case 4:init_5();break;
		case 5:init_6();break;
		default:break;  
	  }
      setTimeout(function(){
        _.startN = n;
        if(_.startN+_.prev>=0 && _.startN+_.prev<=_.cont_li_length){
          _.cont_li[_.startN-_.prev].style.opacity = 0;
        }
      },300);

      document.getElementById('video').innerHTML = '';
    }
  },
  fnShare : function(){
    if(this.popwin.style.display == "block"){
      //this.popwin.style.display = "none";
    }else{
      //this.popwin.style.display = "block";
    }
  },
  fnClick : function(e){
	alert(1);  
  }
}
var slide1 = new Slide("slide","slide_ul");
slide1.init();
window.onresize = function(){
  slide1.resize();
}