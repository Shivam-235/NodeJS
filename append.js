const fs = require('fs');
fs.appendFile('output.txt', 'Appended content.\n', function(err) {
    if (err) {
        console.log('Error appending to file:', err);
        return;
    }
    console.log('Content appended successfully');
});