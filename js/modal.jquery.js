var Modal = (function() {
	function Modal(conf, target) {
		this.defaults = {
			width: 400,
			height: 500,
			fixed: false
		}
		this.init(conf);
		this.target = $(target).attr('href');	
	}
	Modal.prototype = {
		init: function(conf) {
			var self = this;
				self.$el = $('#modal_lite'),
				self.conf = $.extend({}, self.defaults, conf),
				conf = self.conf;

			var modal_wrap = $('<div id="modal_lite"></div>'),
				modal_body = $('<div class="modal-lite-body"></div>'),
				modal_header = modal_header = $('<div class="modal-lite-header"><a class="modal-lite-close" href="javascript:;">X</a></div>');

			self.modal_wrap = modal_wrap;
			self.modal_body = modal_body;

			if(self.$el.length === 0) {
				modal_wrap.append(modal_header).append(modal_body);
				$('body').append(modal_wrap);
				self.$el = $('#modal_lite');
			}

			$(document).off('click').on('click', '.modal-lite-close', function() {
				self.$el.hide().removeClass('show');
			});
		},
		open: function() {
			var self = this,
				conf = self.conf;
			if(self.$el.hasClass('show')) return;

			if(self.$el.data('target') === self.target) {
    			self.$el.addClass('show').show();
			} else {
				var win_height = $(window).height(),
					win_width = $(window).width();

				var m_width = conf.width,
					m_height = conf.height,
					top = (win_height - m_width) / 2,
					left = (win_width - m_width) / 2;

				if(top < 0) top = 10;
				if(left < 0) left = 10;

				var css = {
					left: left,
					top: top,
					width: conf.width,
					height: conf.height
				}
				if(conf.fixed) css = $.extend(css, {position: 'fixed'});

				self.$el
					.data('target', self.target)
					.css(css)
					.addClass('show')
					.show()
					.find('.modal-lite-body')
					.html($(self.target).html());

				if(conf.handler !== undefined) {
					self.$el.find('.modal-ok').off('click').on('click', function() {
						conf.handler.ok();
					});
					self.$el.find('.modal-cancel').off('click').on('click', function() {
						conf.handler.cancel();
						self.$el.hide().removeClass('show');
					});
				}
			}
		}
	}
	return Modal;
})();

$.fn.modal = function(conf) {
	this.each(function() {
		var modal = new Modal(conf, this);
		$(this).on('click', function(e) {
			e.preventDefault();
			modal.open();
		});
	});
	return this;
}
