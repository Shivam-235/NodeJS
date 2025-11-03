function getData(callback) {
    let error = null;
    let data = { id: 1, name: "Sample Data" };
    if (!data) {
        error = new Error("No data found");
    }
    callback(error, data);
    getData(function(err, result) {
        if (err) {
            console.log("Error:", err.message);
        } else {
            console.log("Data received:", result);
        }
    });
}