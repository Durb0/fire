<script>
    import { createAvatar } from '@dicebear/avatars';
    import * as style from '@dicebear/personas';
    //import enums from personas
    import { onMount } from 'svelte';
    import { StateRessource } from '../../models/Enums';
    import { Crewman, Chef } from '../../models/FireFighter';
    import IconOperationType from '../core/IconOperationType.svelte';
    import { w_game } from '../../utils/store.js';
    import ProgressBar from '../core/ProgressBar.svelte';
    import IconList from '../core/IconList.svelte';

    export let firefighter;
    let el;

    let game;

    w_game.subscribe(value => {
        game = value;
    });

    //TODO: fonction onclick qui prend en compte l'etat actuel du pompier, si il reste de la place dans les camions,...

    let avatar = createAvatar(style,{
        seed: firefighter.id.toString() + firefighter.name,
        body: firefighter instanceof Chef? ['squared'] : ['small'],
        clothingColor: ['red']
    });
    onMount(() => {
        el.querySelector('.avatar').innerHTML = avatar;
        setStyleItem();
    });

    /**
     * Fonction qui change le style selon l'etat du pompier
     */
    function setStyleItem(){
        //remove all class with item-
        el.classList.remove(...el.classList.value.split(' ').filter(c => c.startsWith('item--')));
        //add class item-<etat>
        el.classList.add('item--'+firefighter.state);
    }

    function handleClickItem(){
        if(firefighter.state == StateRessource.AVAILABLE){
            if(!game.deck[0].means_move.isFull()){
                firefighter.state = StateRessource.SELECTED;
                game.deck[0].means_move.addFireFighter(firefighter);
            }
            
        }else{
            firefighter.state = StateRessource.AVAILABLE;
            game.deck[0].means_move.removeFireFighter(firefighter);
        }
        setStyleItem();
        w_game.update(game => game);
    }

</script>
    

<div bind:this={el} class="item item-firefighter" on:click={handleClickItem} on:keypress={handleClickItem}>

    <span>{firefighter.name}</span>
    {#if firefighter instanceof Crewman}
        <IconList categories={firefighter.experience}/>
    {:else}
        <div class="chef-experience">
            <span>{firefighter.power}</span>
            <IconOperationType type={firefighter.speciality}/>
        </div>
    {/if}
    <!--image from https://avatars.dicebear.com/api/personas/.svg-->
    <!--<img src="https://avatars.dicebear.com/api/personas/{firefighter.id}{firefighter.name}.svg" alt="">-->
    <div class="avatar"></div>
    <div class="bars">
        <ProgressBar color={firefighter.state == StateRessource.SICK? '#61D902' : '#0E99DA'} thickness=10 value={firefighter.fatigue}/>
        <ProgressBar color="#ff1744" thickness=10 value={firefighter.moral}/>
    </div>
</div>

<style>

    .chef-experience{
        display: flex;
        align-content: stretch;
        justify-content: center;
        align-items: baseline;
        gap: 5px;
    }

    .bars{
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .item-firefighter{
        flex-direction: column;
        height: fit-content;
        width: 80px;
    }
    .icon_bar{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 5px;
        align-items: center;
    }

    .bar{
        width: 100%;
        height: 10px;
        background-color: #e0e0e0;
        border-radius: 5px;
    }

    .moral_bar_inner{
        background-color: #ff1744;
    }

    .fatigue_bar_inner{
        /* blue light */
        background-color: #2979ff; ;
    }

    .bar_inner{
        height: 100%;
        border-radius: 5px;
    }
</style>