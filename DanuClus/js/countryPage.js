function countryHovered(country) {
    var nm = document.getElementById("name"+country);
    if (nm != null) {
        nm.style.color = "#091f67";
    }
}

function countryUnhovered(country) {
    var name = document.getElementById("name"+country);
    if (name != null) {
        name.style.color = "#113F94";
    }
    document.getElementById("content").setAttribute("height", "10000px");
}

function buildCountryMenu() {
    var countryMenu = document.getElementById("countryMenu");

    for (var id in countries) {
        var country = countries[id];

        var curButton = document.createElement("div");
        curButton.setAttribute("id", "name" + country);
        curButton.className = "countryName";
        curButton.innerHTML = countryName[id];
        curButton.setAttribute("onMouseOver", "countryHovered(\""+country+"\")");
        curButton.setAttribute("onMouseOut", "countryUnhovered(\""+country+"\")");
        curButton.setAttribute("onclick", "window.location = \"" + country + ".html\";");

        countryMenu.appendChild(curButton);
    }
}

function addBackButton() {
    var content = document.getElementById("content");
    var button = document.createElement("div");
    button.className = "backButton";
    button.setAttribute("onclick", "window.location = \"index.html\";");
    content.appendChild(button);
}

function addContent(country) {
    var content = document.getElementById("content");
    $.ajax ({
        url: 'json/countryData.json',
        dataType: 'json',
        success: function (data) {
            data = data.countries;
            var title = document.createElement("t1");
            title.innerHTML = data[country].name;
            title.className = "countryTitle";
            content.appendChild(title);
            
            var text = document.createElement("p");
            text.innerHTML = data[country].text;
            text.className = "countryText";
            content.appendChild(text);
        }
    });
}

function buildPage(country) {
    addBackButton();
    buildCountryMenu();
    addContent(country);
}
