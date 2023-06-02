const { shell, dialog } = require('electron');
const { log } = require('console');
const fs = require('fs');
const path = require('path');


const filess = [];


const url = "C:/Users/Metaverse Technology/Downloads/Manga";

fs.readdir(url,
  { withFileTypes: true },
  (err, files) => {
    //console.log("\nCurrent directory files:");
    if (err)
      console.log(err);
    else {


      files.forEach(file => {
        //console.log(file);
        if (file.isDirectory()){
          const temp = { name: file.name };
          filess.push(temp);
        }
        
      })

      filess.forEach((file, index) => {
        const div = document.createElement('div');
        div.classList.add('content-homepage-item');


        const a = document.createElement('a');
        a.classList.add('tooltip', 'item-img', 'bookmark_check');
        a.dataset.tooltip = 'sticky_43828';
        a.dataset.id = 'NDM4Mjg=';
        a.rel = 'nofollow';
        a.href = path.join("mangaDetails.html/?title=", file.name);
        a.title = file.name;

        document.getElementById("new-content").appendChild(div);

        const img = document.createElement('img');
        img.classList.add('img-loading');
        img.alt = file.name;
        img.onerror = function() {
          // Code to execute when "cover.jpg" is not found
          // Do something else instead, such as displaying a default image
          img.src = "./images/404_not_found.png";
        };
        img.src = path.join(url, file.name,'cover.jpg');

        const em = document.createElement('em');
        em.classList.add('item-rate');
        em.textContent = '3.5';

        a.appendChild(img);
        a.appendChild(em);

        const divRight = document.createElement('div');
        divRight.classList.add('content-homepage-item-right');

        const h3 = document.createElement('h3');
        h3.classList.add('item-title');

        const a2 = document.createElement('a');
        a2.classList.add('tooltip', 'a-h', 'text-nowrap');
        a2.dataset.tooltip = 'sticky_43828';
        a2.href = path.join("mangaDetails.html/?title=", file.name);
        a2.title = file.name;
        a2.textContent = file.name;

        h3.appendChild(a2);
        divRight.appendChild(h3);

        div.appendChild(a)
        div.appendChild(divRight);
        
      });

    }
  })



