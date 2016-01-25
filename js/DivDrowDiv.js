

if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); 
+(function ($) {

	  
	
  var DivDrowDiv   = function (el,option) {
  	
  	this.moving=false;
  	
  	this.activeColor='rgba(139, 195, 74,0.7)';

		this.resizeing=false;
		this.resizeh=false;
		this.resizew=false;
		this.resizex=false;
		this.resizey=false;
		this.resizerh=false;
		this.resizerw=false;
		
		this.drawing=false;
		this.startx=0;
		this.straty=0;
		this.endx=0;
		this.endy=0;
		this.drawingdiv=null;
		this.catchdiv=null;


		this.catchdivpreX=null;
		this.catchdivpreY=null;
		
		this.$draw=$(el);
		
		var self= this;
		function mousedown(e) {
	self.drawing=true;
	self.startx=e.offsetX;
	self.starty=e.offsetY;
	self.$draw.find('.draweddiv').css('pointer-events','none');
	}
		
	 function mouseup (e) {
	
//	if (catchdiv) {
		self.$draw.find('.draweddiv').css('pointer-events','initial');
//	}
	
	self.catchdiv=null;
	self.catchdivpreX=null;
	self.catchdivpreY=null;
	self.drawing=false;
	self.resizeing=false;
	self.moving=false;
	
	if (self.drawingdiv) {
	
	self.drawingdiv.on('mousedown',divmousedown);
//	drawingdiv.on('mouseup',divmouseup);
//	drawingdiv.on('mousemove',divmousemove);
	self.drawingdiv.css('pointer-events','initial');
	self.drawingdiv=null;
	}



}	
		
		 function mousemove(e) {

	
	
	
	if (self.catchdiv&&self.moving&&self.drawing==false) {
		
		if (self.catchdivpreX&&self.catchdivpreY) {
			self.catchdiv.css('left',(parseInt(self.catchdiv.css('left'))+e.offsetX-self.catchdivpreX));
			self.catchdiv.css('top',(parseInt(self.catchdiv.css('top'))+e.offsetY-self.catchdivpreY));
		}
		
				console.log(e.offsetX-self.catchdivpreX)
		
		
		self.catchdivpreX=e.offsetX;
		self.catchdivpreY=e.offsetY;

		
		return;
	}
	
	if (self.catchdiv&&self.resizeing&&self.drawing==false) {
		
		if (self.catchdivpreX&&self.resizex) {
			self.catchdiv.css('left',(parseInt(self.catchdiv.css('left'))+e.offsetX-self.catchdivpreX));	
		}
		if (self.catchdivpreY&&self.resizey) {
			self.catchdiv.css('top',(parseInt(self.catchdiv.css('top'))+e.offsetY-self.catchdivpreY));
		}
		if (self.catchdivpreX&&self.resizew) {
			self.catchdiv.css('width',(parseInt(self.catchdiv.css('width'))+(self.resizerw==true?-(e.offsetX-self.catchdivpreX):+(e.offsetX-self.catchdivpreX))));	
		}
		if (self.catchdivpreY&&self.resizeh) {
			self.catchdiv.css('height',(parseInt(self.catchdiv.css('height'))+(self.resizerh==true?-(e.offsetY-self.catchdivpreY):+(e.offsetY-self.catchdivpreY))));
		}
		
		
		self.catchdivpreX=e.offsetX;
		self.catchdivpreY=e.offsetY;

		
		return;
	}
	
	
	if (self.drawing==false) {
		return;
	}
	
	

	self.endx=e.offsetX;
	self.endy=e.offsetY;
	
	var sy=self.starty;
	var sx=self.startx;
	var ey=self.endy;
	var ex=self.endx;
	
	
	
	
	if (sy>ey) {
		var temp=sy;
		sy=ey;
		ey=temp;
		
	}
	if (sx>ex) {
		var temp=sx;
		sx=ex;
		ex=temp;
	}
	
	
	if (self.drawingdiv) {

	}
	else
	{
		
			self.$draw.find('.draweddiv').css('z-index','0');
			self.$draw.find('.draweddiv').css('background-color','');
			
			self.drawingdiv=$('<div class="draweddiv" style="pointer-events: none;">'+
			'<div class="draweddivtop" data-resizeh="true" data-resizey="true"></div>'+
			'<div class="draweddivleft" data-resizew="true" data-resizex="true"></div>'+
			'<div class="draweddivright" data-resizew="true"></div>'+
			'<div class="draweddivbottom" data-resizeh="true"></div>'+
			'<div class="draweddivnw" data-resizeh="true" data-resizew="true" data-resizey="true" data-resizex="true"></div>'+
			'<div class="draweddivne" data-resizeh="true" data-resizew="true" data-resizey="true"></div>'+
			'<div class="draweddivsw" data-resizeh="true" data-resizew="true" data-resizex="true"></div>'+
			'<div class="draweddivse" data-resizeh="true" data-resizew="true"></div>'+
			'</div>');
			self.drawingdiv.appendTo(self.$draw);
			self.drawingdiv.children().on('mousedown',resizestart);
//			drawingdiv.children().on('mouseup',resizeend);
	}

		self.drawingdiv.css('z-index','1');
		self.drawingdiv.css('background-color',self.activeColor);
		self.drawingdiv.css('top',sy);
		self.drawingdiv.css('left',sx);
		self.drawingdiv.css('width',(ex-sx));
		self.drawingdiv.css('height',(ey-sy));
	

	
	
	
}
		 
		 
		 
		 
function  divmousedown(e) {
	
	
	
	if (self.drawing) {
		return;
	}
	self.moving=true;
	e.stopPropagation();
	e.preventDefault();
	self.catchdiv=$(e.currentTarget);
	
	
	self.$draw.find('.draweddiv').css('z-index','0');
	self.$draw.find('.draweddiv').css('background-color','');
	self.catchdiv.css('z-index','1');
	self.catchdiv.css('background-color',self.activeColor);
	
	self.$draw.find('.draweddiv').css('pointer-events','none');
}





function resizestart (e) {
	if (self.drawing) {
		return;
	}
	self.resizeing=true;
	self.resizeh=false;
	self.resizew=false;
	self.resizex=false;
	self.resizey=false;
	
	self.resizeh=$(e.currentTarget).data("resizeh");
	self.resizew=$(e.currentTarget).data("resizew");
	self.resizex=$(e.currentTarget).data("resizex");
	self.resizey=$(e.currentTarget).data("resizey");
	
	self.resizerh=(self.resizeh&&self.resizey);
	self.resizerw=(self.resizew&&self.resizex);
	
	
	e.stopPropagation();
	e.preventDefault();
	self.catchdiv=$(e.currentTarget).parent();
	self.$draw.find('.draweddiv').css('z-index','0');
	self.$draw.find('.draweddiv').css('background-color','');
	self.catchdiv.css('z-index','1');
	self.catchdiv.css('background-color',self.activeColor);
	self.$draw.find('.draweddiv').css('pointer-events','none');
}
		
		
		$(el).on('mousedown',function (e) {
			mousedown(e);
		}).on('mouseup',function (e) {
			mouseup(e);
		}).on('mousemove',function (e) {
			mousemove(e);
		});












  }

	
	
	
	
	
	
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data  = $this.data('my.divDrowDiv');
      var options = typeof option == 'object' && option;
      if (!data) $this.data('my.divDrowDiv', (data = new DivDrowDiv(this,options)));
      if (typeof option == 'string') data[option]()
    })
  }
	
	
	$.fn.divDrowDiv=Plugin;
	$.fn.divDrowDiv.Constructor=DivDrowDiv;
	
	
	
$(window).on('load.my.likeABook.data-api', function () {
    $('[data-divDrowDiv="true"]').each(function () {
      var $book = $(this)
      Plugin.call($book)
    })
  })
	
})(jQuery)

