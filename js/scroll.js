var switchHeight;

$(document).ready(function() {
	var countryMenu = $("#countryMenu");
	switchHeight = (countryMenu.offset().top / 5.0) * 1.6;
    var left = countryMenu.offset().left;
    var originalLeft = countryMenu.position().left;
	var originalHeight = countryMenu.offset().top;
    var originalHeightPosition = countryMenu.position().top;
	var shouldChange = 0;

	$(window).scroll(function() {
		curPos = countryMenu.offset().top - $(window).scrollTop();

		if (curPos <= switchHeight && shouldChange == 0) {
			shouldChange = 1;
			countryMenu.removeClass("absoluteCountryMenuPosition");
			/*countryMenu.addClass("fixedPosition");*/
			countryMenu.css('top', switchHeight);
			countryMenu.css('position', 'fixed');
            countryMenu.css('left', left);
		}

		else if (countryMenu.offset().top <= originalHeight && shouldChange == 1) {
			shouldChange = 0;
/*			countryMenu.removeClass("fixedPosition");
			countryMenu.addClass("absoluteCountryMenuPosition");*/
			countryMenu.css('top', originalHeightPosition);
			countryMenu.css('position', 'absolute');
            countryMenu.css('left', originalLeft);
		}
	})
})