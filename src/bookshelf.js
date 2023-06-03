const fs = require('fs');
const path = require('path');


const filess = [];


const url = "C:/Users/Metaverse Technology/Downloads/Manga";


function bookClicked(url) {
    window.location.href = url; // Navigate to the specified URL
}

let bookshelfCount = 0;


fs.readdir(url, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach((file, index) => {
            if (file.isDirectory()) {
                const temp = { name: file.name };
                filess.push(temp);
            }
        });

        filess.forEach((file, index) => {
            if (index % 4 === 0) {
                bookshelfCount++;
                bookshelf = document.createElement('div');
                bookshelf.classList.add('bookshelf-innercontainer');
                document.getElementById('bookshelf-container').appendChild(bookshelf);

                div2 = document.createElement('div');
                div2.classList.add('bookshelf');
                bookshelf.appendChild(div2);
            }

            const encodedUrl = url.replace(/ /g, '%20');
            const encodedUrl2 = encodeURI(file.name).replace(/\'/g, '%27');
            const imageUrl = `file:///${encodedUrl}/${encodedUrl2}/cover.jpg`;
            console.log(file.name);

            const imageUrl2 = path.join(url, file.name,'cover.jpg');

            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.onclick = function() {
                bookClicked(path.join("mangaDetails.html/?title=", file.name));
            };

            if (fs.existsSync(imageUrl2)) {
                bookDiv.style.setProperty('--bg-image', `url(${imageUrl})`);
            } else {
                bookDiv.style.setProperty('--bg-image', "url('./images/404_not_found.png')");
            }

            div2.appendChild(bookDiv);
        });
    }
});