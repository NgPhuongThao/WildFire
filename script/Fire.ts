export class Fire {
    private m_x : number;
    private m_y : number;

    constructor( x : number, y : number) {
        this.m_x = x;
        this.m_y = y;
    }

    public get X () : number { return this.m_x; }
    public get Y () : number { return this.m_y; }

}