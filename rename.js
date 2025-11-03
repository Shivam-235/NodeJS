const fs = require('fs');

fs.rename('output.txt', 'newFile.txt', function(err) {
    if (err) {
        console.log('Error renaming file:', err);
        return;
    }
    console.log('File renamed successfully');
});