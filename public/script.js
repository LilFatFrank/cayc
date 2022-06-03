const fs = require('fs');

for (let i = 1; i <= 5555; i++) {

    const fileName = `./metadata/assets/${i}.json`;
    const file = require(fileName);

    file.image = `https://cakedapeyachtclub.com/metadata/assets/${i}.png`;

    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(file));
        console.log('writing to ' + fileName);
    });

}
