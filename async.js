const fs = require('fs');
fs.readfile('test.txt', 'utf8', function(err, data) {
    if (err) {
        console.log('Error reading file:', err);
    } else {
        console.log('File contents:', data);
    }
});
console.log('This message is logged while the file is being read.');
