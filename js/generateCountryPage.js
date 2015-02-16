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

function ContentManager() {
    this.container = document.getElementById("content");
    this.data;
    this.title;
    this.text;
    this.lastSelected;
}

function initTitle() {
    manager.title = document.createElement("t1");
    manager.title.innerHTML = manager.data.title;
    manager.title.className = "countryTitle";
    manager.container.appendChild(manager.title);
}

function makeButton(option, container) {
    var button = document.createElement("div");
    button.className = "smallButton";
    button.id = "button" + option;
    button.innerHTML = option;
    
    if (option == "News" && manager.data["News"] && manager.data["News"].length)
        button.innerHTML += "*";

    button.setAttribute("onclick","selectText(\""+option+"\")");
    container.appendChild(button);
} 

function initMenu() {
    var menu = document.createElement("nav");
    menu.id = "smallMenu";

    for (option in manager.data) {
        if (option !== "title") {
            makeButton(option, menu);
        }
    }
    
    manager.container.appendChild(menu);
}

function initTextDiv() {
    manager.text = document.createElement("div");
    manager.text.id = "countryTextDiv";

    manager.container.appendChild(manager.text);
}

function printDescription() {
    if (manager.lastSelected == "Description")
        return;

    document.getElementById("buttonNews").className = "smallButton";
    document.getElementById("buttonDescription").className = "smallButton selected";
    document.getElementById("buttonPartnership Opportunities").className = "smallButton";

    manager.text.innerHTML = "";

    var smallTitle = document.createElement("t2");
    smallTitle.id = "smallTitle";
    smallTitle.innerHTML = manager.data.Description.association;
    manager.text.appendChild(smallTitle);
    
    var text = document.createElement("p");
    text.innerHTML = manager.data.Description.text;
    manager.text.appendChild(text);
}

function printNews() {
    if (manager.lastSelected == "News")
        return;

    document.getElementById("buttonNews").className = "smallButton selected";
    document.getElementById("buttonDescription").className = "smallButton";
    document.getElementById("buttonPartnership Opportunities").className = "smallButton";
    
    manager.text.innerHTML = "";
    
    if (manager.data.News.length) {
        var list = document.createElement("ul");

        for (index in manager.data.News) {
            var par = document.createElement("li");
            par.innerHTML = manager.data.News[index];
            list.appendChild(par);
        }

        manager.text.appendChild(list);
    } else {
        var message = document.createElement("div");
        message.innerHTML = "There is no news to show.";
        manager.text.appendChild(message);
    }
}

function printPartnership() {
    if (manager.lastSelected == "Partnership Opportunities")
        return;

    document.getElementById("buttonNews").className = "smallButton";
    document.getElementById("buttonDescription").className = "smallButton";
    document.getElementById("buttonPartnership Opportunities").className = "smallButton selected";

    var link = document.createElement('a');
    link.href = manager.data["Partnership Opportunities"].url;
    link.innerHTML = manager.data["Partnership Opportunities"].name;
    
    manager.text.innerHTML = '';
    manager.text.appendChild(link);
}

function selectText(option) {
    if (option == "Description") {
        printDescription();
    } else if (option == "News") {
        printNews();
    } else {
        printPartnership();
    }

    manager.lastSelected = option;
}

function getData(country) {
    $.ajax ({
        url: 'json/countryData2.json',
        dataType: 'json',
        success: function (data) {
            manager.data = data[country];

            initTitle();
            initMenu();
            initTextDiv();
            selectText("Description");
        }
    });
}

var manager;

function buildPage(country) {
    addBackButton();
    buildCountryMenu();

    manager = new ContentManager();

    getData(country);
}