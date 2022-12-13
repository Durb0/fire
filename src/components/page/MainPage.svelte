<script>
    import * as icons from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';
    import {Link} from "svelte-routing";

    import {start_game_event} from "../../utils/event";

    function startGame(){
        window.dispatchEvent(start_game_event);
    }
</script>

<div class="main-page">
    <span class="main-page__title">F!RE</span>
    <Link to="GamePage" on:click={startGame}>
        <Fa class="icon" icon={icons["faPlay"]} size="8x" color={"ghostwhite"} style="text-shadow:lightgray 0px 10px 0px;"/>
    </Link>
</div>

<style>
    .main-page{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .main-page__title{
        font-size: 200px;
        color: darkorange;
        text-shadow: red 0px 10px 0px;
    }
</style>