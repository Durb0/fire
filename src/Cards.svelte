<script>
  import { init } from "svelte/internal";
    import Card from "./Card.svelte";
    import {initCards} from "./func.js";

    window.onload = function() {
        
        initCards();
    }
        
</script>

<div class="cards">
    <Card/>
    <Card/>
    <Card/>
</div>


<style>
.cards{
    flex-grow: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
</style>