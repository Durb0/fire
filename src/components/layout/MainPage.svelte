<script>
    import * as icons from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';
</script>

<div class="main-page">
    <span class="main-page__title">F!RE</span>
    <button class="main-page__play-button">
        <Fa class="icon" icon={icons["faPlay"]} size="8x" color={"ghostwhite"} style="text-shadow:lightgray 0px 10px 0px;"/>
    </button>
    <span class="main-page__best-score">Meilleur score :</span>
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