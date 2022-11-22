import { Ressource } from "./Ressource";

export class Card {
    constructor(title, description, time_before_trigger, position) {
        this.title = title;
        this.description = description;
        this.time_before_trigger = time_before_trigger;
        this.position = position;
    }


    swipe_card(game,direction){
        console.log("swipe_card");
    }
}


export class InterventionCard extends Card{

    constructor(title, description, time_before_trigger, position, ratio_success, ration_critic_success, ratio_critic_failure, ratio_refusal, categories)
    {
        super(title, description, time_before_trigger, position);
        this.ratio_success = ratio_success;
        this.ration_critic_success = ration_critic_success;
        this.ratio_critic_failure = ratio_critic_failure;
        this.ratio_refusal = ratio_refusal;
        this.categories = categories;
        this.means = new Ressource();
    }



    swipe_card(game,direction){
        console.log("TODO : swipe_card InterventionCard");
    }
}


export class InformationCard extends Card{

    constructor(title, description, time_before_trigger, position, actions){
        super(title, description, time_before_trigger, position);
        this.actions = actions;
    }

    swipe_card(game,direction){
        console.log("TODO : swipe_card InformationCard");
    }
}

export class DilemmeCard extends Card{
    
    constructor(title, description, time_before_trigger, position, actions_left,actions_right){
        super(title, description, time_before_trigger, position);
        this.actions_left = actions_left;
        this.actions_right = actions_right;
    }

    swipe_card(game,direction){
        console.log("TODO : swipe_card DilemmeCard");
    }
}