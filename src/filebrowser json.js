const { shell, dialog } = require('electron');
const { log } = require('console');
const fs = require('fs');
const path = require('path');


const filess = [];

const url = "C:/Users/Metaverse Technology/Downloads/Manga";

const mangaDirectory = "C:/Users/Metaverse Technology/Downloads/Manga"; // Replace with your manga directory path

function getDirectories(srcPath) {
  return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
}

function getFiles(srcPath) {
  return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isFile());
}

function createMangaJSON() {
  const mangaJSON = [];

  const mangaTitles = getDirectories(mangaDirectory);
  mangaTitles.forEach(title => {
    const mangaTitlePath = path.join(mangaDirectory, title);
    const chapters = getDirectories(mangaTitlePath)
      .map(chapter => {
        const chapterPath = path.join(mangaTitlePath, chapter);
        const pictures = getFiles(chapterPath);
        return {
          chapter,
          pictures,
        };
      })
      .sort((a, b) => {
        const aTime = fs.statSync(path.join(mangaTitlePath, a.chapter)).ctimeMs;
        const bTime = fs.statSync(path.join(mangaTitlePath, b.chapter)).ctimeMs;
        return aTime - bTime;
      });

    const coverImage = findCoverImage(mangaTitlePath);

    mangaJSON.push({
      title,
      chapters,
      coverImage,
    });
  });

  return mangaJSON;
}

function findCoverImage(titlePath) {
  const files = getFiles(titlePath);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (isImageFile(file)) {
      return file;
    }
  }
  return null;
}

function isImageFile(fileName) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const extension = path.extname(fileName).toLowerCase();
  return imageExtensions.includes(extension);
}

const mangaData = createMangaJSON();
const outputPath = 'C:/Users/Metaverse Technology/Downloads/Manga/output.json'; // Replace with your desired output path
fs.writeFileSync(outputPath, JSON.stringify(mangaData, null, 2));

console.log('JSON file created successfully!');


try {
  const jsonData = fs.readFileSync(outputPath, 'utf-8');
  const mangaData = JSON.parse(jsonData);

  mangaData.forEach(manga => {
    console.log('Title:', manga.title);
    console.log('Cover Image:', manga.coverImage);


    const div = document.createElement('div');
    div.classList.add('content-homepage-item');

    const a = document.createElement('a');
    a.classList.add('tooltip', 'item-img', 'bookmark_check');
    a.dataset.tooltip = 'sticky_43828';
    a.dataset.id = 'NDM4Mjg=';
    a.rel = 'nofollow';
    a.href = path.join("mangaDetails.html/?title=", manga.title);
    a.title = manga.title;

    const img = document.createElement('img');
    img.classList.add('img-loading');
    img.alt = manga.title;
    if (manga.coverImage == null) {
      img.src = "./images/404_not_found.png";
    } else {
      img.src = path.join(url, manga.title, manga.coverImage);

    }

    a.appendChild(img);

    div.appendChild(a);

    document.getElementById("new-content").appendChild(div);

    const divRight = document.createElement('div');
    divRight.classList.add('content-homepage-item-right');

    const h3 = document.createElement('h3');
    h3.classList.add('item-title');

    const a2 = document.createElement('a');
    a2.classList.add('tooltip', 'a-h', 'text-nowrap');
    a2.dataset.tooltip = 'sticky_43828';
    a2.href = path.join("mangaDetails.html/?title=", manga.title);
    a2.title = manga.title;
    a2.textContent = manga.title;

    
    h3.appendChild(a2);
    divRight.appendChild(h3);

    div.appendChild(a)
    div.appendChild(divRight);


  });
} catch (error) {
  console.error('Error reading or parsing the JSON file:', error);
}


/*

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


  
  
*/




/*  for all manga titles

try {
  const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
  const mangaData = JSON.parse(jsonData);

  mangaData.forEach(manga => {
    console.log('Title:', manga.title);
    console.log('Cover Image:', manga.coverImage);
    console.log('Chapters:');
    manga.chapters.forEach(chapter => {
      console.log('  Chapter:', chapter.chapter);
      console.log('  Pictures:', chapter.pictures);
      console.log('-----------------');
    });
    console.log('======================================');
  });
} catch (error) {
  console.error('Error reading JSON file:', error);
}

*/

/*  for all chapters

try {
  const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
  const mangaData = JSON.parse(jsonData);

  const chapters = [];

  mangaData.forEach(manga => {
    manga.chapters.forEach(chapter => {
      chapters.push({
        title: manga.title,
        chapter: chapter.chapter,
        pictures: chapter.pictures
      });
    });
  });

  console.log('Chapters:', chapters);
} catch (error) {
  console.error('Error reading JSON file:', error);

*/

/*  for all pictures

try {
  const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
  const mangaData = JSON.parse(jsonData);

  const pictures = [];

  mangaData.forEach(manga => {
    manga.chapters.forEach(chapter => {
      chapter.pictures.forEach(picture => {
        pictures.push({
          title: manga.title,
          chapter: chapter.chapter,
          picture: picture
        });
      });
    });
  });

  console.log('Pictures:', pictures);
} catch (error) {
  console.error('Error reading JSON file:', error);
}

*/