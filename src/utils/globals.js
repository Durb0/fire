
/**
 * @fileoverview Les catégories du jeu
 */
export var categories = [];

/**
 * 
 * @param {String} name Nom de la catégorie
 */
export function getCategory(name){
    categories.forEach(category => {
        if(name == category.name){
            return category;
        }
    });
}

/**
 * 
 * @param {Array<Category>} list La liste des catégories
 */
export function setCategories(list){
    categories = list;
}

export const VALUE_BONUS_CHEF = 5;
export const VALUE_BONUS_FIREFIGHTER = 10;
