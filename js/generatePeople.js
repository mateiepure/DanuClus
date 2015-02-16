//            <div class = "person">
//                <div id = "ro" class = "photo left">
//                </div>
//                <div class = "presentationDiv left">
//                    <t1 class = "name">Daniel Cosnita</t1>
//                    <p>Country: Romania</p>
//                    <p>Company: <a href="inpulse.ro">InPulse Partners SRL</a></p>
//                    <p>Email: dc@inpulse.ro</p>
//                    <p>Phone Number: 0723-237-237</p>
//                    <img class="icon" src="imgs/64-facebook.png"/>
//                    <img class="icon" src="imgs/64-linkedin.png"/>
//                    <img class="icon" src="imgs/64-wordpress.png"/>
//                </div>
//            </div>
//
//#ro {
//	background: url(../imgs/ro.jpg) no-repeat;
//    background-size: 100%;
//}

function addName(container, name) {
    var title = document.createElement('t1');
    title.className = "name";
    title.innerHTML = name;
    container.appendChild(title);
}

function addCountry(container, country) {
    var paragraph = document.createElement("p");
    paragraph.innerHTML = "Country: " + country;
    
    container.appendChild(paragraph);
}

function addCompany(container, company) {
    var paragraph = document.createElement("p");
    paragraph.innerHTML = "Company: ";

    if (company.address) {
        var ref = document.createElement("a");
        ref.href = "http://"+company.address;
        ref.innerHTML = company.name;
        paragraph.appendChild(ref);
    } else {
        paragraph.innerHTML += company.name;
    }
    
    container.appendChild(paragraph);
}

function addEmail(container, email) {
    var paragraph = document.createElement("p");
    paragraph.innerHTML = "Email: ";

    var ref = document.createElement("a");
    ref.href = "mailto:" + email;
    ref.innerHTML = email;
    paragraph.appendChild(ref);

    container.appendChild(paragraph);
}

function addNumber(container, number) {
    var paragraph = document.createElement("p");
    paragraph.innerHTML = "Phone Number: "+number;
    
    container.appendChild(paragraph);
}

function addSocial(container, social) {
    for (link in social) {
        if (social[link]) {
            var ref = document.createElement("a");
            ref.href = "http://" + social[link];
            
            var img = document.createElement("img");
            img.className = "icon";
            img.src = "imgs/64-"+link+".png";
            
            ref.appendChild(img);
            
            container.appendChild(ref);
        }
    }
}

function addPersonPresentation(container, side, person) {
    var div = document.createElement("div");
    div.className = "presentationDiv " + side;
    
    addName(div, person['name']);
    addCountry(div, person['Country']);
    addCompany(div, person['Company']);
    addEmail(div, person['Email']);
    addNumber(div, person['Phone Number']);
    addSocial(div, person['Social']);
    
    container.appendChild(div);
}

function addPersonPhoto(container, side, photo) {
    var div = document.createElement("div");
    div.className = "photo " + side;
    div.style.backgroundImage = 'url(imgs/'+photo+')';
    div.style.backgroundSize = '100%';
    
    container.appendChild(div);
}

function addPerson(container, person, side) {
    var div = document.createElement("div");
    div.className = "person";

    addPersonPhoto(div, side, person['photo']);
    addPersonPresentation(div, side, person);
    
    container.appendChild(div);
    return div;
}

window.onload = function() {
    var container = document.getElementById("content");

    $.ajax ({
        url: 'json/peopleData.json',
        dataType: 'json',
        success: function (people) {
            var side = "left";
            var lastDiv;
            for (person in people) {
                lastDiv = addPerson(container, people[person], side);
                side = (side == "left" ? "right":"left");
            }
            
            lastDiv.style.paddingBottom = '30px';
        }
    });
}
