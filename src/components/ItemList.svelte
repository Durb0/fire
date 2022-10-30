<script>
    import ItemChef from "./ItemChef.svelte";
    import ItemFirefighter from "./ItemFirefighter.svelte";
    import ItemTruck from "./ItemTruck.svelte";
    import {game} from "./main.js";

    export let type;
</script>


<div class="list">
    <div class="list_inner">
        {#if type=='truck'}
            {#await game.stock.trucks}
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
            {#await game.stock.chefs}
                <div>loading...</div>
            {:then chefs}
                {#each chefs as chef}
                    <ItemChef chef={chef}/>
                {/each}
            {:catch error}
                <div>error</div>
            {/await}
        {/if}

        {#if type=='firefighter'}
            {#await game.stock.firefighters}
                <div>loading...</div>
            {:then firefighters}
            {(console.log({ firefighters }), '')}
                {#each firefighters as firefighter}
                    <ItemFirefighter firefighter={firefighter}/>
                {/each}
            {:catch error}
                <div>error</div>
            {/await}
        {/if}
    </div>
</div>

<style>
.list {
    background-color: white;
    border-radius: 20px;
    text-align: center;
    height: 100%;
    padding: 10px;
    width: calc(100% - 20px);
}

.list_inner{
    display: flex;
    flex-direction: row;
    height: 100%;
    gap: 10px;
    padding: 0px 10px;
    overflow-x: scroll;
    border-radius: 10px;
    max-width:auto;
}
</style>