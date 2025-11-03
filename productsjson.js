const fs = require('fs');

const products = [
    { "id": 1, "name": "Laptop", "price": 999.99 },
    { "id": 2, "name": "Smartphone", "price": 499.99 },
    { "id": 3, "name": "Tablet", "price": 299.99 }
];
const jsonData = JSON.stringify(products, null, 2);
fs.writeFile('products.json', jsonData, (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File written successfully');
});