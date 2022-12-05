<script>
    import IconOperationType from "./IconOperationType.svelte";
    export let categories;
</script>

<div class="categories">
    {#each categories as cat}
        <IconOperationType type={cat}/>
    {/each}
</div>


<style>
    .categories{
        display: flex;
        flex-direction: row;
        gap: 5px;
        height:18px;
        justify-content: center;
    }
</style>