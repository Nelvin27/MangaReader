const { shell, dialog } = require('electron');
const { log } = require('console');
const fs = require('fs');
const path = require('path');

const url = "C:/Users/Metaverse Technology/Downloads/Manga";


function getAllFiles(dirPath, fileArray) {
    // Read all the files and directories within the current directory
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile() && file === 'current.txt') {
            // If the current item is a file named 'current.txt', add its path, folder name, and last modified time to the array
            const folderName = path.basename(dirPath);
            fileArray.push({ path: filePath, folderName, modifiedTime: stat.mtimeMs });
        } else if (stat.isDirectory()) {
            // If the current item is a directory, recursively call the function to explore its contents
            getAllFiles(filePath, fileArray);
        }
    });
}

// Function to sort files by their modified time in descending order
function sortByModifiedTime(a, b) {
    return b.modifiedTime - a.modifiedTime;
}

// Array to store the file paths, folder names, and modified times
const filesArray = [];

// Call the function to populate the filesArray
getAllFiles(url, filesArray);

// Sort the filesArray by modified time in descending order
filesArray.sort(sortByModifiedTime);

// Read and print the contents of each 'current.txt' file
filesArray.forEach(file => {

    chapterpath = path.join(url, file.folderName);
    chapters = [];

    console.log(`Path: ${file.path}`);
    console.log(`Folder Name: ${file.folderName}`);
    console.log(`Modified Time: ${new Date(file.modifiedTime)}`);
    console.log('Contents:');
    const contents = fs.readFileSync(file.path, 'utf-8');
    console.log(contents);
    console.log('-------------------');


    const div = document.createElement('div');

    div.classList.add('content-genres-item');

    const a = document.createElement("a");
    a.rel = "nofollow";
    a.classList.add("genres-item-img", "bookmark_check");
    a.href = path.join("mangaDetails.html/?title=", file.folderName);
    a.title = file.folderName;

    div.appendChild(a);

    const img = document.createElement('img');
    img.classList.add('img-loading');
    img.src = path.join(chapterpath, 'cover.jpg');

    img.onerror = function () {
        // Code to execute when "cover.jpg" is not found
        // Do something else instead, such as displaying a default image
        img.src = './images/404_not_found.png';
    };

    img.alt = file.folderName;

    a.appendChild(img);


    const div2 = document.createElement('div');
    div2.classList.add('genres-item-info')

    div.appendChild(div2);

    const h3 = document.createElement('h3');
    div2.appendChild(h3);

    const a2 = document.createElement("a");
    a2.rel = "nofollow";
    a2.classList.add("genres-item-name", "text-nowrap", "a-h");
    a2.href = path.join("mangaDetails.html/?title=", file.folderName);
    a2.title = file.folderName;
    a2.innerHTML = file.folderName;
    h3.appendChild(a2);

    const a3 = document.createElement('a');
    a3.rel = "nofollow";
    a3.classList.add("genres-item-chap", "text-nowrap", "a-h");
    a3.href = path.join("mangaChapter.html/?chapter=", contents, "&title=", file.folderName);
    a3.title = contents;
    a3.innerHTML = contents;
    div2.appendChild(a3);

    document.getElementById('panel-content-genres').appendChild(div)



});







