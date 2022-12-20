<!--
    @component
    
    Affiche la page d'accueil
-->

<script>
    // import de la librairie fontawesome pour les icones
    import * as icons from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';

    // import de la librairie svelte-routing pour la navigation
    import {Link} from "svelte-routing";

    // import des evenements
    import {start_game_event} from "../../utils/event";

    // import du store
    import { w_screen } from '../../utils/store';

    export let title; // référence vers le titre
    let screen; // état de l'écran

    // effet de tremblement du titre
    let effectFireTitle = setInterval(changeTitle, 150);

    // subscribtion au store pour mettre à jour la variable screen
    w_screen.subscribe(value=>{
        screen = value;
    })

    // fonction qui déclenche l'événement start_game_event
    function startGame(){
        window.dispatchEvent(start_game_event);
    }

    // fonction qui change la position de l'ombre du titre
    function changeTitle(){
        let randx = Math.floor(Math.random() * 10 - 5);
        let randy = Math.floor(Math.random() * 10 - 5);
        if (title){
            // si le titre existe, on change l'ombre de position vers une position aléatoire
            title.style.textShadow = "red "+randx+"px "+randy+"px 3px";
        }
        else{
            // si le titre n'existe plus, on arrête l'effet
            clearInterval(effectFireTitle);
        }
    }
</script>

<div class="main-page" class:main-page--landscape={screen == "landscape"}>
    <span class="main-page__title" bind:this={title}>F!RE</span>
    <div class="main-page__btn-play">
        <Link to="game" on:click={startGame}>
            <Fa class="icon" icon={icons["faPlay"]} size="8x" color={"ghostwhite"} style="text-shadow:lightgray 0px 10px 0px;"/>
        </Link>
    </div>
</div>

<style>
    .main-page{
        display: grid;
        grid-template-rows: 33% 67%;
        grid-template-columns: 100%;
        height: inherit;
        align-items: center;
        justify-content: center;
        align-items: baseline;
    }

    .main-page__title{
        font-size: 200px;
        color: darkorange;
        transition: text-shadow 0.15s ease-in-out;
        margin: auto;
    }

    .main-page__btn-play{
        margin: auto;
    }
    .main-page--landscape{
        grid-template-columns: 60% 40%;
        grid-template-rows: 100%;

    }
</style>