<script>
    import ItemFirefighter from "../items/ItemFirefighter.svelte";
    import ItemTruck from "../items/ItemTruck.svelte";
    import {w_game} from "../../utils/store.js";

    export let type;

    let ressource;

    w_game.subscribe(value => {
        ressource = value.ressource;
    });


</script>


<div class="list">
    {#if type=='truck'}
        {#await ressource.trucks}
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
        {#await ressource.chefs}
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
        {#await ressource.crewmans}
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

<style>
.list {
    background: rgb(41,41,41);
    background: linear-gradient(0deg, rgba(41,41,41,1) 0%, rgba(0,0,0,1) 100%);
    text-align: center;
    border-radius: 10px 10px 0 0;
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
</style>