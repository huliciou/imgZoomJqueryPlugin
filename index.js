(function($){

	$.fn.zoomImg = function(options){
		
		this.click(function(){
			
			var $this = $(this);
			//var settings = $.extend($.fn.zoomImg.defaults,options);
			var $img = $this.clone()
							.removeAttr('id')
							.removeAttr('width')
							.removeAttr('height');
			
			var $imgZoomModal = $('<div></div>').addClass('image-zoom-modal');
			var $zoomModalClose = $('<div></div>').addClass('zoom-modal-close');
			var $zoomModalTool = $('<div></div>').addClass('zoom-modal-control');
			
			
			var $zoomInIcon = '<div class="zoom-in"></div>';
			var $zoomOutIcon = '<div class="zoom-out"></div>';
			var $zoomResetIcon = '<div class="zoom-reset"></div>';
			//var $zoomScale = '<div class="zoom-scale"></div>';
			var $zoomScaleDashed = '<div class="zoom-scale-dashed"></div>';



			var $zoomToolTable = $('<table></table>').attr('align','center');
			var $zoomToolTableTr = $('<tr></tr>');
			$zoomToolTableTr.append('<td>'+$zoomOutIcon+'</td>');
			
			var i =0;
			do{
				
				var $zoomScale = '<div class="zoom-scale zoom-scale-'+i+'""></div>';
				$zoomToolTableTr.append('<td>'
						+$zoomScale
						+$zoomScaleDashed
						+$zoomScaleDashed
						+$zoomScaleDashed
					+'</td>');
				i++;
			}while(i<6)
			var $zoomScale = '<div class="zoom-scale zoom-scale-'+i+'""></div>';
			$zoomToolTableTr.append('<td>'
						+$zoomScale
					+'</td>');
			
			$zoomToolTableTr.append('<td>'+$zoomInIcon+$zoomResetIcon+'</td>');
			$zoomToolTableTr.appendTo($zoomToolTable);


			var $zoomModalImg = $('<div></div>').addClass('zoom-modal-img');
			var $imageWrapper = $('<span></span>').addClass('image-wrapper');
			
			$zoomModalTool.append($zoomToolTable);
			$imageWrapper.appendTo($zoomModalImg);
			$imageWrapper.append($img);
			$imgZoomModal.append($zoomModalClose).append($zoomModalImg).append($zoomModalTool);
			$imgZoomModal.appendTo('body').fadeIn();

			$imgZoomModal.find('.zoom-in').on('click',function(){
				methods['zoomIn']();
			});
			$imgZoomModal.find('.zoom-out').on('click',function(){
				methods['zoomOut']();
			});
			$imgZoomModal.find('.zoom-reset').on('click',function(){
				methods['zoomReset']();
			});
			$zoomModalClose.on('click',function(){
				methods['closeModal']();
			});

			$('.zoom-scale-3').addClass('active');
			var onWheelFunction = methods['onWheelFunction'];
			//document.getElementsByClassName("zoom-modal-img").addEventListener("wheel",onWheelFunction);
		});
		var zoomScale =1;
		var mapZoomScale = 3;
		var methods = {
			initialize : function() { 
			},
			zoomIn: function( ) {
				if(zoomScale < 1.5){
					zoomScale = zoomScale+0.2;
					mapZoomScale++;
				}
				console.log(zoomScale);
				$('.zoom-modal-img img').css('transform','scale('+zoomScale+')');
				$('.zoom-scale').removeClass('active');
				$('.zoom-scale-'+mapZoomScale).addClass('active');
			},
			zoomOut:function(){
				if(zoomScale > 0.2){
					zoomScale =zoomScale-0.2;
					mapZoomScale--;
				}
				console.log(zoomScale);
				$('.zoom-modal-img img').css('transform','scale('+zoomScale+')');
				$('.zoom-scale').removeClass('active');
				$('.zoom-scale-'+mapZoomScale).addClass('active');
			},
			zoomReset:function(){
				$('.zoom-modal-img img').css("top","0px")
										.css("left","0px")
										.css("transform","none");
					zoomScale = 1;
					mapZoomScale = 3;
				$('.zoom-scale').removeClass('active');
				$('.zoom-scale-3').addClass('active');
			},
			closeModal:function(){
				$('.image-zoom-modal').fadeOut();
				zoomScale=1;
			},
			onWheelFunction:function(event){
				var der = event.deltaY;
				if(der>0){
					this.zoomOut();
				}else{
					this.zoomIn();
				}
				//console.log(event.deltaY);
			}
		};
		if(methods[options]){
			return methods[options].apply(this,Array.prototype.slice.call(arguments,1));
		}else if(typeof methods[options] === 'Object' ||
			 !methods[options]){
			// init
		}else{
			$.error('Method'+options + 'does not exist !');
		}
		
	};
	//init CSS 設定
	$.fn.zoomImg.defaults ={
			width:"50%"
		};
}(jQuery));