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
//# sourceMappingURL=Forest.js.map