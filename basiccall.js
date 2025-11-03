function greet(name, callback) {
    console.log("Starting greeting...");
    const message = `Hello, ${name}!`;
    callback(message);
    console.log("Greeting finished.");
}