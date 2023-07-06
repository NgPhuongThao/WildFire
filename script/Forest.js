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
//# sourceMappingURL=Forest.js.map