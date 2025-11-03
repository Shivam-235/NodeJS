const fs = require('fs');

// Step 1: Read the existing JSON file
fs.readFile('student.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    // Step 2: Parse the JSON data
    try {
        const students = JSON.parse(data);
        
        // Step 3: Increase marks by 5
        if (Array.isArray(students)) {
            // If it's an array of students
            students.forEach(student => {
                if (student.marks) {
                    student.marks += 5;
                }
            });
        } else if (students.marks) {
            // If it's a single student object
            students.marks += 5;
        }
        
        // Step 4: Convert back to JSON string
        const jsonData = JSON.stringify(students, null, 2);

        // Step 5: Write the updated JSON string back to the file
        fs.writeFile('student.json', jsonData, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('File updated successfully');
        });
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
    }
});