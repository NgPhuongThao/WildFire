const forestScript = require("./script/Forest.js");

$.getJSON('res/conf.json', function (data) {
   // Declare parameters
   let height;
   let width;
   let spread_probability;

   // Get parameters from JSON file
   $.each(data, function (key, val) {
      if (key === "dimensions") {
         height = val["height"];
         width = val["width"];
      } else { spread_probability = val; }
   });

   // Create simulation
   const forest = new forestScript.Forest(height, width, spread_probability);
   const table = document.getElementsByTagName("table")[0];

   forest.Forest.forEach((row) => {
      const tr = document.createElement("tr");
      row.forEach((tile) => {
         const td = document.createElement("td");
         td.innerText = tile;

         tr.appendChild(td);
      });
      table.appendChild(tr);
   });

});