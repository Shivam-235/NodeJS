const fs = require('fs');

fs.readFile('test.txt', 'utf8', function(err, data)  {
    if (err) {
        console.log('Error reading file:', err);
        return;
    }
    console.log('File contents:', data);
});