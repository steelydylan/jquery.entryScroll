(function($){
	/*オプションのデフォルト値*/
	var defopt = {
		speed:1000,
		timeSpan:5000
	}
	var entryScroll = function($ele){
		var $parent = $ele.parent(".js-entryScroll");
		var height = $ele.height();
		var opt = $parent.data("option");
		$ele.show();
		$parent.delay(opt.timeSpan).animate({scrollTop:height},opt.speed*height,"linear",function(){
			var $next = $ele.next();
			if(!$next.get(0)){
				$next = $parent.children(":first");
				if(opt.callback){
					opt.callback.apply($parent);
				}
			}
			$ele.hide();
			$parent.addClass("active");
			setTimeout(function(){
				$parent.removeClass("active");
				entryScroll($next);
			},1000);
			
		});
	}
	$.prototype.entryScroll = function(opt){
		opt = $.extend(defopt,opt);
		var $this = $(this);
		var $children = $this.children();
		var $first = $this.children(":first");
		$this.addClass("js-entryScroll");
		$this.data("option",opt);
		$children.hide();
		entryScroll($first);
	}
})(jQuery);