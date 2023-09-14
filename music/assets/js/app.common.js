var App = {};
; (function($, window, undefined) {
	App.Common = {
		validateForm:function(rule, message, form, errorplace,errorclass){
			if(typeof errorclass==='undefined')errorclass='';
			form.validate({
				rules: rule,
				messages : message,
				errorElement: "div",
				errorClass: "invalid",
				errorPlacement: function(error, element) {
					error.addClass(errorclass);
					let placement = $(element).attr('data-message-placement');
					var field = element.attr("id");
					if($('#'+field+"-error").length > 0) {
						$('#'+field+"-error").html(error);
					}
					if(typeof placement!=='undefined'){
						switch(placement){
							case 'skip2':
									error.insertAfter(element.parent("div").parent('div'));
									break;
						}
					}
					else if(typeof errorplace != "undefined" && errorplace == "samediv") {
						if($('#'+field+"-error").length > 0) {
							$('#'+field+"-error").show();
						}else
							error.insertAfter(element);
					}else if(element.attr('type')=="radio")
						error.insertAfter(element.parent("div").parent('div'));
					else
						error.insertAfter(element.parent("div"));
				}
			});
		},
		placeError:function(form, errors){
            $.each(errors,function(field,value){
            	if(form.find('#'+field+"-error").length > 0) {
            		if(typeof value[0] != "undefined")
            			form.find('#'+field+"-error").html(value[0]).show();
            		else
                		form.find('#'+field+"-error").html(value).show();
            	}else {
                	form.find('input[name="'+field+'"]').parent().after('<div id="'+field+'-error" class="invalid">'+value+'</div>');
            	}
            });
        },
	}
})(jQuery, this);