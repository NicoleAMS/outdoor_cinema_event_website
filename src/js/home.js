$(function () {
	$('.anchor-link').on('click', function(e) {
		e.preventDefault();
		var sectionId = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 1000, function(){
			window.location.hash = sectionId;
		});
	});
});