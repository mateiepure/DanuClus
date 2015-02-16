var doneLoading = false;
var maps = {};
var names = {};

function countryHovered(country) {
    if (typeof(maps[country]) != "undefined") {
        maps[country].attr({fill: "grey"});
    }

    var nm = document.getElementById("name"+country);
    if (nm != null) {
        nm.style.color = "#091f67";
    }
}

function countryUnhovered(country) {
    if (typeof(maps[country]) != "undefined") {
        maps[country].attr({fill: "lightgrey"});
    }

    var name = document.getElementById("name"+country);
    if (name != null) {
        name.style.color = "#113F94";
    }
}

window.onload = function () {
	var map = Raphael("map");
    map.setViewBox(0,0,210,210);

	var attr = {
		fill: "lightgrey",
		stroke: "white",
		"stroke-width": "2",
		"stroke-linejoin": "round"
	};

//    countries.sort();

    var countryMenu = document.getElementById("countryMenu");

    for (var id in countries) {
        var country = countries[id];

        maps[country] = map.path(paths[country]).attr(attr);
        maps[country].node.id = "map" + country;
        maps[country].hover(function() {countryHovered(this.node.id.replace("map", ""))}, function () {countryUnhovered(this.node.id.replace("map", ""))}).click(function () { if (doneLoading == true) window.location = this.node.id.replace("map", "") + '.html'});

        names[country] = document.createElement("div");
        names[country].setAttribute("id", "name" + country);
        names[country].className = "countryName";
        names[country].innerHTML = countryName[id];
        names[country].setAttribute("onMouseOver", "countryHovered(\""+country+"\")");
        names[country].setAttribute("onMouseOut", "countryUnhovered(\""+country+"\")");
        names[country].setAttribute("onclick", "window.location = \"" + country + ".html\";");

        countryMenu.appendChild(names[country]);
    }
    
    doneLoading = true;
}