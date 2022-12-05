<script>
    import { w_game } from '../../utils/store.js';
    import { StateRessource } from '../../models/Enums';
    import { onMount } from 'svelte';
    import { Snackbar, Button, MaterialApp } from 'svelte-materialify';
    import { url } from "../../utils/socket.js";
    import IconList from '../core/IconList.svelte';
    import ProgressBar from '../core/ProgressBar.svelte';

    export let truck;
    let el;

    let snackbar = false;

    let game;

    w_game.subscribe(value => {
        game = value;
    });

    onMount(() => {
        setStyleItem();
    });

    /**
     * Fonction qui change le style selon l'etat du truck
     */
    function setStyleItem(){
        //remove all class with item-
        el.classList.remove(...el.classList.value.split(' ').filter(c => c.startsWith('item--')));
        //add class item-<etat>
        el.classList.add('item--'+truck.state);
    }

    function handleClickItem(){
        console.log(truck);
        console.log(game);
        if(truck.state == StateRessource.AVAILABLE){
                truck.state = StateRessource.SELECTED;
                game.deck[0].means_move.addTruck(truck);
        }else{
            if(game.deck[0].means_move.countFireFighters() <= (game.deck[0].means_move.getSizeMaxOfTrucks() - truck.nb_seat_max)){
                truck.state = StateRessource.AVAILABLE;
                game.deck[0].means_move.removeTruck(truck);
            } else {
                snackbar = true;
            }
        }
        setStyleItem();
        w_game.update(game => game);
    }

</script>
    
<div bind:this={el} class="item item-truck" on:click={handleClickItem} on:keypress={handleClickItem} >
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
    .item-truck{
        display: flex;
        flex-direction: column;
        width: 100px;
        height: fit-content;
        gap: 5px;
    }
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
    }
    .item-truck__seat{
        border-radius: 50%;
        width: 8px;
        aspect-ratio: 1/1;
    }
    .seat--min{
        background-color: black;
    }
    .seat--bonus{
        background-color: white;
        border: 1px solid black;
    }
</style>