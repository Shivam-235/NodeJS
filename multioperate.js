const fs = require('fs');
//write
fs.writeFile('output.txt', 'Hello, World!', function(err) {
    if (err) {
        console.log('Error writing file:', err);
        return;
    }
    console.log('File written successfully');
});

//append
fs.appendFile('output.txt', 'Appended content.\n', function(err) {
    if (err) {
        console.log('Error appending to file:', err);
        return;
    }
    console.log('Content appended successfully');
});
//read
fs.readFile('test.txt', 'utf8', function(err, data)  {
    if (err) {
        console.log('Error reading file:', err);
        return;
    }
    console.log('File contents:', data);
});

//rename
fs.rename('output.txt', 'newFile.txt', function(err) {
    if (err) {
        console.log('Error renaming file:', err);
        return;
    }   
    console.log('File renamed successfully');
});
//delete
fs.unlink('newFile.txt', (err) => {
    if (err) {
        console.log('Error deleting file:', err);
        return;
    }
    console.log('File deleted successfully');
});
//check existence
if(fs.existsSync('example.txt')) {
    console.log('File exists');
} else {
    console.log('File does not exist');
}
