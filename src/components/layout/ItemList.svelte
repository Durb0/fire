<!--
    @component
    
    Affiche une liste d'item
-->

<script>
    // import des composants
    import ItemFirefighter from "../items/ItemFirefighter.svelte";
    import ItemTruck from "../items/ItemTruck.svelte";

    // import du store
    import {w_game} from "../../utils/store.js";

    // import des modèles
    import { StateRessource } from "../../models/Enums";
    import { InterventionCard } from "../../models/Card";

    /**
     * @param {string} type - type d'item à afficher
     */
    export let type;

    let ressource, first_card;

    // subscribtion au store pour mettre à jour ressource et first_card
    w_game.subscribe(value => {
        ressource = value.ressource;
        first_card = value.deck[0];
    });


    /**
     * Fonction qui trie la liste en fonction de l'ordre des états
     * @param list - liste à trier
     */
    function sorted(list){
        return list.sort((a,b) => {
            if (!((
                a.state == StateRessource.AVAILABLE && 
                b.state == StateRessource.SELECTED) || 
                (a.state == StateRessource.SELECTED && 
                b.state == StateRessource.AVAILABLE))){
                    return statesOrder.indexOf(a.state) - statesOrder.indexOf(b.state)
            }
        })
    }

    const statesOrder = Object.values(StateRessource);

</script>


<div class="list">
    {#if type=='truck'}
        {#await sorted(ressource.trucks)}
            <div>loading...</div>
        {:then trucks}
            {#each trucks as truck}
                <ItemTruck truck={truck}/>
            {/each}
        {:catch error}
            <div>error</div>
        {/await}
    {/if}

    {#if type=='chef'}
        {#await sorted(ressource.chefs)}
            <div>loading...</div>
        {:then chefs}
            {#each chefs as chef}
                <ItemFirefighter firefighter={chef}/>
            {/each}
        {:catch error}
            <div>error</div>
        {/await}
    {/if}

    {#if type=='firefighter'}
        {#await sorted(ressource.crewmans)}
            <div>loading...</div>
        {:then firefighters}
            {#each firefighters as firefighter}
                <ItemFirefighter firefighter={firefighter}/>
            {/each}
        {:catch error}
            <div>error</div>
        {/await}
    {/if}
</div>
<div class="door"
class:door--closed={!(first_card instanceof InterventionCard) && (first_card != null)}></div>

<style>
.list {
    background: rgb(41,41,41);
    background: linear-gradient(0deg, rgba(41,41,41,1) 0%, rgba(0,0,0,1) 100%);
    text-align: center;
    border-radius: 10px 10px 0 0;
    grid-row: 1;
    grid-column: 1;
    display: flex;
    height: -webkit-fill-available;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: auto;
    align-content: flex-start;
    justify-content: space-evenly;
    padding: 10px;
    padding-top: 20px;
    gap:10px;
}

.door{
    width: inherit;
    z-index: 2;
    background: repeating-linear-gradient(
        gray, gray 40px, darkgray 40px,darkgray 50px);
    height: 0%;
    grid-row: 1;
    grid-column: 1;
    border-radius:10px 10px 0 0;
    transition: height 0.5s ease-out;
    opacity: 0.9;
}

.door--closed{
    height: 100%;
}
</style>