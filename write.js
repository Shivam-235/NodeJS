const fs = require('fs');

fs.writeFile('output.txt', 'Hello, World!', function(err) {
    if (err) {
        console.log('Error writing file:', err);
        return;
    }
    console.log('File written successfully');
});