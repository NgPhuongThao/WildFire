"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Forest_1 = require("./script/Forest");
fetch(`http://localhost/WildFire/res/conf.json`)
    .then(res => res.json())
    .then((res) => {
    const height = res["dimensions"]["height"];
    const width = res["dimensions"]["width"];
    const spread_probability = res["spread_probability"];
    let forest = new Forest_1.Forest(height, width, spread_probability);
    let countTrials = 0;
    while (!forest.isDone()) {
        forest.next();
        countTrials++;
    }
    console.log("Trial count : " + countTrials);
    console.log("Ash count : " + forest.CountAshes);
});
//# sourceMappingURL=simulateWildfire.js.map