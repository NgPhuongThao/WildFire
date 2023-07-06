// const Forest = require("./script/Forest.js");

// $.getJSON('res/conf.json', function (data) {
//     // Declare parameters
//     let height;
//     let width;
//     let spread_probability;
 
//     // Get value from JSON
//     $.each(data, function (key, val) {
//        if (key === "dimensions") {
//           height = val["height"];
//           width = val["width"];
//        } else { spread_probability = val; }
//     });
// });
// const forest = new Forest(2, 2, 0.4);

// Implementation code where T is the returned data shape
fetch('res/conf.json').then(response => {
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json();
});