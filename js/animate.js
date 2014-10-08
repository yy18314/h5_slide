function pageHeight(){
	return $("#wrap").height();	
}
function pageWidth(){
	return $("#wrap").width();	
}

function zoom(obj,percentX,percentY,time,wait){
	/*
		obj:jQuery对象
		percentX:
		percentY:
		time:缩放的持续时间，0为无动画直接缩放
		wait:等待时间，既等待若干时间之后再执行缩放操作
	*/
	var percentY = percentY || percentX;
	var _width = $(obj).width();
	var _height = $(obj).height();
	
	var _dx = (1 - percentX) * _width / 2;
	var _dy = (1 - percentY) * _height / 2;
	
	var _cx = parseInt($(obj).css("left"));
	var _cy = parseInt($(obj).css("top"));
	
	var _time = time || 300;
	
	if(wait){
		setTimeout(function(){
			$(obj).animate({width:_width * percentX,height:_height * percentY,left:_cx + _dx,top:_cy + _dy},time);	
		},wait);	
	}else{
		$(obj).animate({width:_width * percentX,height:_height * percentY,left:_cx + _dx,top:_cy + _dy},time);	
	}
}

function zoomMove(obj,percent,pos,time,wait){
	/*
		obj:jQuery对象
		percent:
		pos:移动到的位置
		time:缩放的持续时间，0为无动画直接缩放
		wait:等待时间，既等待若干时间之后再执行缩放操作
	*/
	var percent = percent || 1;
	var _width = $(obj).width();
	var _height = $(obj).height();
	var _cx = parseInt($(obj).css("left"));
	var _cy = parseInt($(obj).css("top"));
	var _dx1 = pos.x - _cx;
	var _dy1 = pos.y - _cy;
	
	var _dx2 = (1 - percent) * _width / 2;
	var _dy2 = (1 - percent) * _height / 2;
	var _dx = _dx1 + _dx2;
	var _dy = _dy1 + _dy2;
	
	var _time = time || 300;
	
	if(wait){
		setTimeout(function(){
			$(obj).animate({width:_width * percent,height:_height * percent,left:_cx + _dx,top:_cy + _dy},time);	
		},wait);	
	}else{
		$(obj).animate({width:_width * percent,height:_height * percent,left:_cx + _dx,top:_cy + _dy},time);	
	}		
}

function zoomMoveWithSize(obj,size,pos,time,wait){
	/*
		obj:jQuery对象
		size:缩放到的尺寸
		pos:移动到的位置
		time:缩放的持续时间，0为无动画直接缩放
		wait:等待时间，既等待若干时间之后再执行缩放操作
	*/

	var _cx = pos.x - size.width / 2;
	var _cy = pos.y - size.height / 2;
	
	
	var _time = time || 300;
	
	if(wait){
		setTimeout(function(){
			$(obj).animate({width:size.width,height:size.height,left:_cx,top:_cy},time);	
		},wait);	
	}else{
		$(obj).animate({width:size.width,height:size.height,left:_cx,top:_cy},time);	
	}		
}

function appear(obj,_time){
	$(obj).animate({opacity:1},_time);
}

function appearAt(obj,x,y,_time,_wait){
	$(obj).animate({left:x,top:y,opacity:0},0);
	if(_wait){
		setTimeout(function(){
			$(obj).animate({opacity:1},_time);
		},_wait);
	}else{
		$(obj).animate({opacity:1},_time);	
	}
}

function flyTo(obj,pos,_dir,_time,_wait){
	var _pageWidth = pageWidth();
	var _pageHeight = pageHeight();
	var _width = $(obj).width();
	var _height = $(obj).height();
	var _cx = (_pageWidth - _width) / 2;
	var _cy = (_pageHeight - _height) / 2;
	var _sx = pos.x || _cx;
	var _sy = pos.y || _cy;
	var _ex = _sx;
	var _ey = _sy;
	
	var _dir = _dir || "left";
	
	switch(_dir){
		case "left":
			_sx = -1 * _width;
			//alert(_sx);
			break;
		case "top":
			_sy = -1 * _height;
			break;
		case "bottom":
			_sy = _pageHeight;
			break;
		case "right":
			_sx = _pageWidth;
			break;
		case "center":
			_sx = -1 * _width;
			_ex = _cx;
			break;
		case "center_right":
			_sx = _pageWidth;
			_ex = _cx;
			break;
		default:break;	
	}
	$(obj).animate({left:_sx,top:_sy},0)
	if(_wait){
		setTimeout(function(){
			fly(obj,_ex,_ey,_time);
		},_wait);
	}else{
		fly(obj,_ex,_ey,_time);
	}
}

function fly(obj,x,y,_time){
	$(obj).animate({left:x,top:y},_time);
}

function appearGroup(objs,_index,_time,_wait){
	var _index = _index || 0;
	if(_index < objs.length){
		var _wait = _index == 0?_wait : _time;
		if(_index == 0){
			$(objs).animate({opacity:0},0);
		}
		var obj = objs[_index];
		setTimeout(function(){
			appear(obj,_time);	
			appearGroup(objs,_index + 1,_time)
		},100);
	}
}

function move(selector,x,y,dir){
	if(dir){
		
	}else{
		$(selector).animate({left:x,top:y},400);
	}
}
function setPos(selector,x,y){
	$(selector).attr("style","left:" + x + "px;top:" + y + "px;");
}

function timeMove(selector,x,y,seconds){
	//延迟移动
	setTimeout(function(){
		move(selector,x,y);
	},seconds);
}