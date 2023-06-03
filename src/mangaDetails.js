const path = require('path');
const fs = require('fs');

const url = "C:/Users/Metaverse Technology/Downloads/Manga";
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
document.getElementById("imageCover").onerror = function () {
    // Code to execute when "cover.jpg" is not found
    // Do something else instead, such as displaying a default image
    document.getElementById("imageCover").src = "../images/404_not_found.png";
};
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

/*
files.sort(function (a2, b2) {
    return fs.statSync(dir + a2).mtime.getTime() -
        fs.statSync(dir + b2).mtime.getTime();
});
*/
files.sort(function(a, b) {
  const fileNumberA = parseInt((a.match(/\d+/) || [])[0]);
  const fileNumberB = parseInt((b.match(/\d+/) || [])[0]);

  return fileNumberA - fileNumberB; // Sort by number in ascending order
});



files.forEach((file, index) => {
    const fileExtension = file.split('.').pop();

    // List of ignored file extensions
    const ignoredExtensions = ['jpg', 'jpeg', 'png', 'gif', 'txt'];
    
    // Check if the file extension is in the ignoredExtensions array
    if (ignoredExtensions.includes(fileExtension.toLowerCase())) {
      // File is an image or text file, ignore it
    } else {
      chapters.push(file);
    }
});


sessionStorage.setItem("chapters", JSON.stringify(chapters));

console.log(chapters);

chapters.forEach((file, index) => {
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


});







function resumeClick() {
    const filePath = path.join(chapterpath, 'current.txt');

if (fs.existsSync(filePath)) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    window.location.href = path.join("../mangaChapter.html/?chapter=", data, "&title=", newTitle);
    //console.log(newTitle);
    //console.log(data);
    

  });
} else {
  console.log('File does not exist.');

  window.location.href = path.join("../mangaChapter.html/?chapter=", chapters[0], "&title=", newTitle);

}


    
   
  }





