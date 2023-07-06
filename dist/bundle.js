(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

   console.log("oui");
   let forest = new forestScript.Forest(height, width, spread_probability);
   console.log(forest);

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
        this.m_forest = Array(height).fill(Array(width).fill(TileStates_1.tileStates.TREE));
        this.m_fires = [];
        // Start at least one fire
        for (let i = 0; i < Math.floor(Math.random() * ((height * width) / 2)); i++) {
            const y = Math.floor(Math.random() * (height));
            const x = Math.floor(Math.random() * (width));
            this.m_forest[y][x] = TileStates_1.tileStates.FIRE;
            this.m_fires.push(new Fire_1.Fire(x, y));
        }
    }
    get Forest() { return this.m_forest; }
    next() {
        let newFires = []; // New Fires
        // Spread fire to adgacents tiles
        this.m_fires.forEach((fire) => {
            let newFire;
            if (fire.Y < this.m_height - 1 && this.isSpread()) {
                newFire = new Fire_1.Fire(fire.X, fire.Y + 1);
                newFires.push(newFire);
                this.m_forest[newFire.Y][newFire.X] = TileStates_1.tileStates.FIRE;
            }
            if (fire.Y > 0 && this.isSpread()) {
                newFire = new Fire_1.Fire(fire.X, fire.Y - 1);
                newFires.push(newFire);
                this.m_forest[newFire.Y][newFire.X] = TileStates_1.tileStates.FIRE;
            }
            if (fire.X < this.m_width - 1 && this.isSpread()) {
                newFire = new Fire_1.Fire(fire.X + 1, fire.Y);
                newFires.push(newFire);
                this.m_forest[newFire.Y][newFire.X] = TileStates_1.tileStates.FIRE;
            }
            if (fire.X > 0 && this.isSpread()) {
                newFire = new Fire_1.Fire(fire.X - 1, fire.Y);
                newFires.push(newFire);
                this.m_forest[newFire.Y][newFire.X] = TileStates_1.tileStates.FIRE;
            }
            this.setToAsh(fire); // Old fires becomes ashes
        });
        this.m_fires = newFires;
        return this.m_forest;
    }
    isDone() { return this.m_fires.length === 0; }
    setToAsh(fire) { this.m_forest[fire.Y][fire.X] = TileStates_1.tileStates.ASH; }
    isSpread() { return Math.random() < this.m_spread_probability; }
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
