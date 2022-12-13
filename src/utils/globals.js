export var categories = [];

export function getCategory(name){
    categories.forEach(category => {
        if(name == category.name){
            return category;
        }
    });
}

export function setCategories(list){
    categories = list;
}

export const VALUE_BONUS_CHEF = 5;
export const VALUE_BONUS_FIREFIGHTER = 10;
