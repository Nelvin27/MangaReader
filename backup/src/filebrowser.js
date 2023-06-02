const { shell, dialog } = require('electron');
const { log } = require('console');
const fs = require('fs');
const path = require('path');


const filess = [];


const url = "C:/Users/Metaverse Technology/Pictures/ai/AI Generated/New folder";

fs.readdir(url,
  { withFileTypes: true },
  (err, files) => {
    //console.log("\nCurrent directory files:");
    if (err)
      console.log(err);
    else {


      files.forEach(file => {
        //console.log(file);
        const temp = { name: file.name };
        filess.push(temp);
      })

      filess.forEach((file, index) => {
        var img = document.createElement("img");
        img.src = path.join(url, file.name);
        var src = document.getElementById("picHere");
        src.appendChild(img);
        img.onclick = function() {alert(file.name)};
      });

    }
  })





