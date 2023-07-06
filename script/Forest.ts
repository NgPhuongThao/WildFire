import { Fire } from "./Fire";
import { tileStates } from "./TileStates";

export class Forest {
    private m_forest : Array<Array<tileStates>>;
    private m_fires : Fire[];

    private m_height : number;
    private m_width : number;
    private m_spread_probability : number;
    
    constructor(height: number, width: number, spread_probability: number) {
        this.m_height = height;
        this.m_width = width;
        this.m_spread_probability = spread_probability;

        this.m_forest = [];
        for (var i = 0; i < height; i++) {
            this.m_forest[i] = [];
            for (var j = 0; j < width; j++) {
                this.m_forest[i][j] = tileStates.TREE;
            }
        }

        this.m_fires = [];

        // Start at least one fire
        const numberOfFire = Math.floor(Math.random() * ( (height * width)/2 )) + 1;
        for (let i = 0; i < numberOfFire; i++) {
            const y = Math.floor(Math.random() * ( height ));
            const x = Math.floor(Math.random() * ( width ));

            this.m_forest[y][x] = tileStates.FIRE;
            this.m_fires.push(new Fire(x, y));
        }

        this.m_fires.sort();
    }

    public get Forest() { return this.m_forest; }

    public next() {
        let newFires : Fire[] = []; // New Fires
        
        // Spread fire to adjacent tiles
        this.m_fires.forEach((fire) => {
            this.setToAsh(fire); // Old fires becomes ashes
            let newFire;
            if (fire.Y < this.m_height - 1 && this.isSpread()) {
                if (this.m_forest[fire.Y+1][fire.X] === tileStates.TREE) {
                    newFire = new Fire(fire.X, fire.Y+1);
                    newFires.push(newFire);
                    this.m_forest[newFire.Y][newFire.X] = tileStates.FIRE;

                }
            }

            if (fire.Y > 0 && this.isSpread()) {
                if (this.m_forest[fire.Y-1][fire.X] === tileStates.TREE) {
                    newFire = new Fire(fire.X, fire.Y-1);
                    newFires.push(newFire);
                    this.m_forest[newFire.Y][newFire.X] = tileStates.FIRE;

                }
            }

            if (fire.X < this.m_width - 1 && this.isSpread()) {
                if (this.m_forest[fire.Y][fire.X+1] === tileStates.TREE) {
                    newFire = new Fire(fire.X+1, fire.Y);
                    newFires.push(newFire);
                    this.m_forest[newFire.Y][newFire.X] = tileStates.FIRE;

                }
            }
                
            if (fire.X > 0 && this.isSpread()) {
                if (this.m_forest[fire.Y][fire.X-1] === tileStates.TREE) {
                    newFire = new Fire(fire.X-1, fire.Y);
                    newFires.push(newFire);
                    this.m_forest[newFire.Y][newFire.X] = tileStates.FIRE;

                }
            }

        });

        this.m_fires = newFires;
        this.m_fires.sort();
    }

    public isDone () : boolean { return this.m_fires.length === 0; }

    private setToAsh(fire : Fire) { this.m_forest[fire.Y][fire.X] = tileStates.ASH; }

    private isSpread() : boolean { 
        return Math.random() <= this.m_spread_probability; 
    }
}