let forestScript = require("./script/Forest.js");

$.getJSON('res/conf.json', function (data) {
   // Declare parameters
   let height;
   let width;
   let spread_probability;

   // Get value from JSON
   $.each(data, function (key, val) {
      if (key === "dimensions") {
         height = val["height"];
         width = val["width"];
      } else { spread_probability = val; }
   });

   let forest = new forestScript.Forest(height, width, spread_probability);

   // Create simulation
   const table = document.getElementsByTagName("table")[0];

   // Randomize the first fire
   const firstFireHeight = Math.floor(Math.random() * ( height ));
   const firstFireWidth = Math.floor(Math.random() * ( width ));

   for (let i = 0; i < height; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < width; j++) {
         const td = document.createElement("td");
         
         if (Math.floor(Math.random() * ( height * width )) === 0 
            || ( i === firstFireHeight && j === firstFireWidth )) 
            td.innerText = "🔥";
         else td.innerText = "🌳";

         tr.appendChild(td);
      }
      table.appendChild(tr);
   }
});
