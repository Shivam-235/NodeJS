const fs = require('fs');

fs.readFile('books.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    const books = JSON.parse(data);
    if (books.length > 0) {
        const randomIndex = Math.floor(Math.random() * books.length);
        console.log(books[randomIndex]); // Display a random book
    } else {
        console.log('No books found.');
    }
});