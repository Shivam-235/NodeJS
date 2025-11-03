const fs = require('fs');

//Step 1: Create a JavaScript object
const student = {
    name: "John Doe",
    age: 21,
    course: "Computer Science",
    city: "New York"
};

//Step 2: Convert the object to a JSON string
const jsonData = JSON.stringify(student, null, 2); // Pretty print with 2 spaces
//Step 3: Write the JSON string to a file
fs.writeFile('student.json', jsonData, (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File written successfully');
});