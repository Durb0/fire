<script>
    import { w_game } from '../../utils/store.js';
    import { StateRessource } from '../../models/Enums';
    import { onMount } from 'svelte';
    import { Snackbar, Button, MaterialApp } from 'svelte-materialify';
    import { url } from "../../utils/socket.js";
    import IconList from '../core/IconList.svelte';
    import ProgressBar from '../core/ProgressBar.svelte';
    import Item from './Item.svelte';
    import { InterventionCard } from '../../models/Card.js';

    export let truck;

    let snackbar = false;

    let game;

    w_game.subscribe(value => {
        game = value;
    });

    function handleClickItem(){
        if(game.deck[0] instanceof InterventionCard){
            if(truck.state == StateRessource.AVAILABLE){
                truck.state = StateRessource.SELECTED;
                game.deck[0].means_move.addTruck(truck);
        }else{
            if(game.deck[0].means_move.countFirefighters() <= (game.deck[0].means_move.getSizeMaxOfTrucks() - truck.nb_seat_max)){
                truck.state = StateRessource.AVAILABLE;
                game.deck[0].means_move.removeTruck(truck);
            } else {
                snackbar = true;
            }
        }
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

<Snackbar class="flex-column" bind:active={snackbar} bottom center timeout={2000}>
    <h5>Impossible de retirer le véhicule</h5>
    <p>Trop de Sapeurs-pompiers sur l'opération par rapport au nombre de places dans les véhicules</p>
    <div class="mt-1">
        <Button text class="success-text">Accept</Button>
        <Button
        class="red-text"
        text
        on:click={() => {
            snackbar = false;
        }}>
        Dismiss
        </Button>
    </div>
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