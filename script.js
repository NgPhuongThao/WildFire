const forestScript = require("./script/Forest.js");

let forest;
let countTrials = 0;

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
   forest = new forestScript.Forest(height, width, spread_probability);
   
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

$(document).ready(function() {
   $("#next").click(function (){
      if (!forest.isDone()) {
         forest.next();

         loadSimulation()

         countTrials++;
         document.getElementById("countTrials").innerText = countTrials;
         if (forest.isDone()) document.querySelector("#next").disabled = true;
      } 

   });
});

function loadSimulation() {
   const table = document.getElementsByTagName("table")[0];

   let i = 0;
   forest.Forest.forEach((row) => {
      const tr = document.getElementsByTagName("tr")[i];
      let j = 0;
      row.forEach((tile) => {
         const td = tr.childNodes[j];
         td.innerText = tile;
         j++;
      });
      i++;
   });
}