//readstreamExample.js
const fs = require('fs');

// Create a readable stream
const readStream = fs.createReadStream('input.txt', 'utf8');

//Listen for data events
readStream.on('data', function(chunk) {
    console.log('Received chunk:', chunk);
});

//Listen for end event
readStream.on('end', function() {
    console.log('No more data to read.');
});
//Listen for error event
readStream.on('error', function(err) {
    console.log('Error reading file:', err);
});
