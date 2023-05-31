const path = require('path');
const fs = require('fs');

const url = "C:/Users/Metaverse Technology/AppData/Local/Tachidesk/downloads/Mangakakalot (EN)";
const chapters = [];



const queryString = window.location.search;

console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const title = urlParams.get('title')

let newTitle = title.slice(1);

console.log(title);


const chapterpath = path.join(url, newTitle);


document.getElementById("chapterTitle").innerHTML = newTitle; //title


const a = document.createElement('a');
const linkText = document.createTextNode(newTitle);
a.appendChild(linkText);
a.title = newTitle;

document.getElementById("breadcrumbTitle").appendChild(a); //breadcrumbs

document.getElementById("imageCover").src = path.join(chapterpath, 'cover.jpg');  //cover image
document.getElementById("imageCover").alt = newTitle; // ^
document.getElementById("imageCover").title = newTitle; // ^


document.getElementById("chapterTitle2").innerHTML = newTitle; //title header

/*
fs.readdir(chapterpath,
    { withFileTypes: true },
    (err, files) => {
        //console.log("\nCurrent directory files:");
        if (err)
            console.log(err);
        else {



            files.forEach(file => {
                //console.log(file);
                if (file.name == 'cover.jpg') {

                }
                else {
                    const temp = { name: file.name };
                    chapters.push(temp);
                }

            })

            sessionStorage.setItem("chapters", JSON.stringify(chapters));

            chapters.forEach((file, index) => {
                //console.log(file);
                const li = document.createElement('li');
                li.classList.add('a-h');

                const a = document.createElement('a');
                a.rel = 'nofollow';
                a.classList.add('chapter-name', 'text-nowrap');
                a.href = path.join("../mangaChapter.html/?chapter=", file.name, "&title=", newTitle);
                a.title = file.name;
                a.textContent = file.name;

                li.appendChild(a);

                document.getElementById("chapters").appendChild(li);


            });

        }
    })

*/
var dir = path.join(url, newTitle, '\\');


var files = fs.readdirSync(dir);
files.sort(function (a2, b2) {
    return fs.statSync(dir + a2).mtime.getTime() -
        fs.statSync(dir + b2).mtime.getTime();
});

console.log(files);

sessionStorage.setItem("chapters", JSON.stringify(files));

files.forEach((file, index) => {
    if (file == 'cover.jpg') {

    }
    else {
        //console.log(file);
        const li = document.createElement('li');
        li.classList.add('a-h');

        const a = document.createElement('a');
        a.rel = 'nofollow';
        a.classList.add('chapter-name', 'text-nowrap');
        a.href = path.join("../mangaChapter.html/?chapter=", file, "&title=", newTitle);
        a.title = file;
        a.textContent = file;

        li.appendChild(a);

        document.getElementById("chapters").appendChild(li);
    }




});






