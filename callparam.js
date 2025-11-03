function calculate(a, b, callback) {
    const result = a + b;
    callback(result);
}

calculate(5, 10, function(sum) {
    console.log(`The sum is: ${sum}`);
}