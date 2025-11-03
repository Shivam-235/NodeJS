const fs = require('fs');
fs.readFile('test.txt', 'utf8', function(err, data)  {
    if (err) {
        console.log('Error reading file:', err);
    } else {
        fs.readFile('additional.txt', 'utf8', function(err2, data2)  {
            if (err) {
                console.log('Error reading additional file:', err2);
            } else {
                console.log('Additional file contents:', data2);
            }
        }); 