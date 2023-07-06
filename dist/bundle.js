(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
      if (!forest.IsDone) {
         forest.next();

         loadSimulation()

         countTrials++;

      } else getElementById("next").remove();

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
},{"./script/Forest.js":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fire = void 0;
class Fire {
    constructor(x, y) {
        this.m_x = x;
        this.m_y = y;
    }
    get X() { return this.m_x; }
    get Y() { return this.m_y; }
}
exports.Fire = Fire;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forest = void 0;
const Fire_1 = require("./Fire");
const TileStates_1 = require("./TileStates");
class Forest {
    constructor(height, width, spread_probability) {
        this.m_height = height;
        this.m_width = width;
        this.m_spread_probability = spread_probability;
        this.m_forest = [];
        for (var i = 0; i < height; i++) {
            this.m_forest[i] = [];
            for (var j = 0; j < width; j++) {
                this.m_forest[i][j] = TileStates_1.tileStates.TREE;
            }
        }
        this.m_fires = [];
        // Start at least one fire
        const numberOfFire = Math.floor(Math.random() * ((height * width) / 2)) + 1;
        for (let i = 0; i < numberOfFire; i++) {
            const y = Math.floor(Math.random() * (height));
            const x = Math.floor(Math.random() * (width));
            this.m_forest[y][x] = TileStates_1.tileStates.FIRE;
            this.m_fires.push(new Fire_1.Fire(x, y));
        }
        this.m_fires.sort();
    }
    get Forest() { return this.m_forest; }
    next() {
        let newFires = []; // New Fires
        // Spread fire to adjacent tiles
        this.m_fires.forEach((fire) => {
            this.setToAsh(fire); // Old fires becomes ashes
            let newFire;
            if (fire.Y < this.m_height - 1 && this.isSpread()) {
                if (this.m_forest[fire.Y + 1][fire.X] === TileStates_1.tileStates.TREE) {
                    newFire = new Fire_1.Fire(fire.X, fire.Y + 1);
                    newFires.push(newFire);
                    this.m_forest[newFire.Y][newFire.X] = TileStates_1.tileStates.FIRE;
                }
            }
            if (fire.Y > 0 && this.isSpread()) {
                if (this.m_forest[fire.Y - 1][fire.X] === TileStates_1.tileStates.TREE) {
                    newFire = new Fire_1.Fire(fire.X, fire.Y - 1);
                    newFires.push(newFire);
                    this.m_forest[newFire.Y][newFire.X] = TileStates_1.tileStates.FIRE;
                }
            }
            if (fire.X < this.m_width - 1 && this.isSpread()) {
                if (this.m_forest[fire.Y][fire.X + 1] === TileStates_1.tileStates.TREE) {
                    newFire = new Fire_1.Fire(fire.X + 1, fire.Y);
                    newFires.push(newFire);
                    this.m_forest[newFire.Y][newFire.X] = TileStates_1.tileStates.FIRE;
                }
            }
            if (fire.X > 0 && this.isSpread()) {
                if (this.m_forest[fire.Y][fire.X - 1] === TileStates_1.tileStates.TREE) {
                    newFire = new Fire_1.Fire(fire.X - 1, fire.Y);
                    newFires.push(newFire);
                    this.m_forest[newFire.Y][newFire.X] = TileStates_1.tileStates.FIRE;
                }
            }
        });
        this.m_fires = newFires;
        this.m_fires.sort();
    }
    isDone() { return this.m_fires.length === 0; }
    setToAsh(fire) { this.m_forest[fire.Y][fire.X] = TileStates_1.tileStates.ASH; }
    isSpread() {
        return Math.random() <= this.m_spread_probability;
    }
}
exports.Forest = Forest;

},{"./Fire":2,"./TileStates":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tileStates = void 0;
var tileStates;
(function (tileStates) {
    tileStates["TREE"] = "\uD83C\uDF33";
    tileStates["FIRE"] = "\uD83D\uDD25";
    tileStates["ASH"] = "\uD83C\uDF2A";
})(tileStates || (exports.tileStates = tileStates = {}));

},{}]},{},[1]);
