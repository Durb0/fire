<script>
    import { StateRessource } from "../../models/Enums";
    export let width = 100;
    export let state;
</script>

<div class="item"
style="width: {width}px;">
    <div class="item__front"
    class:item--AVAILABLE={state == StateRessource.AVAILABLE}
    class:item--SELECTED={state == StateRessource.SELECTED}
    class:item--UNAVAILABLE={state == StateRessource.UNAVAILABLE}
    >
        <slot></slot>      
    </div>
    <div class="item__back">

    </div>
</div>

<style>
    .item{
		display: flex;
        height: auto;
		cursor: pointer;
        flex-direction: column;
		transition: background 0.2s, transform 0.2s;
    }

    .item--AVAILABLE{
        transform: translateY(-10px);
    }


    .item--SELECTED{
        background-color: rgb(205, 252, 177) !important;
    }

    .item--UNAVAILABLE{
        background-color: rgb(252, 177, 177) !important;
        mix-blend-mode: luminosity;
    }

    .item__front{
        background-color: ghostwhite;
        text-transform: uppercase;
        text-align: center;
        border-radius: 5px;
        width:inherit;
        height:inherit;
        padding:10px;
        z-index: 1;
        transition: transform 0.2s;
    }

    .item__back{
        background-color: lightgrey;
        width: inherit;
        height: 20px;
        border-radius: 5px;
        transform: translateY(-20px);
    }

</style>