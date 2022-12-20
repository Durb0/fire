<!--
    @component
    
    Affiche un item de camion
-->

<script>
    // import du store
    import { w_game } from '../../utils/store.js';

    // import des modèles
    import { InterventionCard } from '../../models/Card.js';
    import { StateRessource } from '../../models/Enums';
    import { Truck } from '../../models/Truck.js';

    //import de Snackbar pour afficher un message
    import { Snackbar} from 'svelte-materialify';

    // import de l'url du serveur pour les requêtes (il aurait fallu utiliser un service)
    import { url } from "../../utils/socket.js";

    // import des composants
    import IconList from '../core/IconList.svelte';
    import ProgressBar from '../core/ProgressBar.svelte';
    import Item from './Item.svelte';
    
    /**
     * @param {Truck} truck - camion
     */
    export let truck;

    let snackbar = false; // variable pour afficher le snackbar

    let game; // le jeu

    // subscribtion au store pour mettre à jour la variable game
    w_game.subscribe(value => {
        game = value;
    });

    /**
     * Fonction appelée lors du clic sur l'item
    */
    function handleClickItem(){
        //récupère la première carte de la liste
        var firstCard = game.firstCard();
        // si il n'y pas de carte on ne fait rien
        if(firstCard == null){ return; }
        // si la carte est une carte d'intervention
        if(firstCard instanceof InterventionCard){
            // si le camion est disponible on le sélectionne et on l'ajoute à la carte
            if(truck.state == StateRessource.AVAILABLE){
                truck.state = StateRessource.SELECTED;
                firstCard.means_move.addTruck(truck);
        }else{
            // sinon on le retire de la carte et on le rend disponible
            if(firstCard.means_move.countFirefighters() <= (game.deck[0].means_move.getSizeMaxOfTrucks() - truck.nb_seat_max)){
                truck.state = StateRessource.AVAILABLE;
                firstCard.means_move.removeTruck(truck);
            } else {
                snackbar = true;
            }
        }
        // on met à jour le store
        w_game.update(game => game);
        }
    }
</script>

<Item width=150 state={truck.state}>
    <div on:click={handleClickItem} on:keypress={handleClickItem} >
        <div class="item-truck__head">
            <span>{truck.name}</span>
            <IconList categories={truck.categories}/>
        </div>
        <img src="{url}/truck/{truck.name}.svg" alt="{truck.name}" width="100%" height=50 />
        <div class="item-truck__seats">
            {#each Array(truck.nb_seat_min) as _}
                <div class="item-truck__seat seat--min"></div>
            {/each}
            {#each Array(truck.nb_seat_max - truck.nb_seat_min) as _}
                <div class="item-truck__seat seat--bonus"></div>
            {/each}
        </div>
        <ProgressBar color="#ff1744" value={truck.wear}/>
    
    
    </div>
</Item>    
<Snackbar class="flex-column" style="border-radius:10px; background-color: rgb(255, 207, 64); color: black;" bind:active={snackbar} bottom center timeout={5000}>
    <h5>Impossible de retirer le véhicule</h5>
    <p>Retirez les pompiers necessaires avant de retirer votre vehicule</p>
</Snackbar>


<style>
    .item-truck__head{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
    }
    .item-truck__seats{
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 5px;
        margin-bottom: 5px;
    }
    .item-truck__seat{
        border-radius: 50%;
        width: 8px;
        aspect-ratio: 1/1;
    }
    .seat--min{
        background-color: grey;
    }
    .seat--bonus{
        background-color: lightgrey;
    }
</style>