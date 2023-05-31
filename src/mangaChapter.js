const path = require('path');
const fs = require('fs');
const { log } = require('console');

const url = "C:/Users/Metaverse Technology/AppData/Local/Tachidesk/downloads/Mangakakalot (EN)";
const chapterPicture = [];

chapters = JSON.parse(sessionStorage.getItem("chapters"));

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const title = urlParams.get('title')

let newTitle = title.slice(1);

const chapter = urlParams.get('chapter')

let newChapter = chapter.slice(1, -1);

const chapterPath = path.join(url, newTitle);

const chapterPicturePath = path.join(chapterPath, newChapter);

document.getElementById("chapterTitle").innerHTML = newTitle + ": " + newChapter; //title

let nextChapterIndex;

const a = document.createElement('a');
const a2 = document.createElement('a');
const linkText = document.createTextNode(newTitle);
const linkText2 = document.createTextNode(newTitle);
a.appendChild(linkText);
a2.appendChild(linkText);
a.title = newTitle;
a2.title = newTitle;

document.getElementById("breadcrumbTitle").appendChild(a); //breadcrumbs
document.getElementById("breadcrumbTitle2").appendChild(a2); //breadcrumbs

const a3 = document.createElement('a');
const a4 = document.createElement('a');
const linkText3 = document.createTextNode(newChapter);
const linkText4 = document.createTextNode(newChapter);
a3.appendChild(linkText3);
a4.appendChild(linkText4);
a3.title = newChapter;
a3.title = newChapter;

document.getElementById("breadcrumbChapter").appendChild(a3); //breadcrumbs
document.getElementById("breadcrumbChapter2").appendChild(a4); //breadcrumbs

/*
chapters.forEach((file, index) => {
    const option = document.createElement('option');
    const option2 = document.createElement('option');
    option.textContent = file.name;
    option2.textContent = file.name;

    if (file.name == newChapter) {
        option.selected = newChapter;
        option2.selected = newChapter;
        nextChapterIndex = (index + 1);
    }
    option.value = file.name;
    option2.value = file.name;
    document.getElementById("chapterSelect").appendChild(option); //options
    document.getElementById("chapterSelect2").appendChild(option2); //options

});
*/

chapters.forEach((file, index) => {
    if (file == "cover.jpg") {

    }
    else {
        const option = document.createElement('option');
        const option2 = document.createElement('option');
        option.textContent = file;
        option2.textContent = file;

        if (file == newChapter) {
            option.selected = newChapter;
            option2.selected = newChapter;
            nextChapterIndex = (index + 1);
        }
        option.value = file;
        option2.value = file;
        document.getElementById("chapterSelect").appendChild(option); //options
        document.getElementById("chapterSelect2").appendChild(option2); //options
    }


});

function dropdownChange(control) {
    window.location.href = path.join("../mangaChapter.html/?chapter=", control.value, "&title=", newTitle); // function for options
}

console.log(chapters[nextChapterIndex]);
document.getElementById("nextChapter").href = path.join("../mangaChapter.html/?chapter=", chapters[nextChapterIndex], "&title=", newTitle); // next chapter button
document.getElementById("nextChapter2").href = path.join("../mangaChapter.html/?chapter=", chapters[nextChapterIndex], "&title=", newTitle); // next chapter button 2
/*
const [nokey, chapternextIndex] = (Object.entries(chapters)[nextChapterIndex]);

nextChapter = Object.values(chapternextIndex).toString();

document.getElementById("nextChapter").href = path.join("../mangaChapter.html/?chapter=", nextChapter, "&title=", newTitle); // next chapter button
document.getElementById("nextChapter2").href = path.join("../mangaChapter.html/?chapter=", nextChapter, "&title=", newTitle); // next chapter button 2
*/
document.getElementById("panelChapterInfo").innerHTML = newTitle + ": " + newChapter;


fs.readdir(chapterPicturePath,
    { withFileTypes: true },
    (err, files) => {
        if (err)
            console.log(err);
        else {


            files.forEach(file => {
                //console.log(file);
                const temp = { name: file.name };
                chapterPicture.push(temp);

            })

            chapterPicture.forEach((file, index) => {
                //console.log(file.name);
                const img = document.createElement('img');
                img.src = path.join(chapterPicturePath, file.name);
                img.alt = "Page " + (index + 1);
                img.title = "Page " + (index + 1);
                img.style = "margin-top: 5px;";

                document.getElementById("chapterImages").appendChild(img);

            });

        }
    })