export var categories = [
    {name: "FIRE",                  icon: "faFire", color: "red", is_gain: true},
    {name: "ROAD_ACCIDENT",         icon: "faCarBurst", color: "orange", is_gain: true},
    {name: "SOCIAL",                icon: "faThumbsUp", color: "deepskyblue", is_gain: true},
    {name: "PERSONNAL_ASSISTANCE",  icon: "faPerson", color: "green", is_gain: true},
    {name: "MULTI_PURPOSE",         icon: "faWrench", color: "grey", is_gain: true},
    {name: "SPEED",                 icon: "faGaugeHigh", color: "purple", is_gain: false},
    {name: "WATER",                 icon: "faDroplet", color: "blue", is_gain: false},
    {name: "HIGH",                  icon: "faLadder", color: "brown", is_gain: false}
];

export function getCategory(name){
    categories.forEach(category => {
        if(name == category.name){
            return category;
        }
    });
}


export const VALUE_BONUS_CHEF = 5;
export const VALUE_BONUS_FIREFIGHTER = 5;
