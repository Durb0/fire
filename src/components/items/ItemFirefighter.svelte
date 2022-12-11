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
    import Item from './Item.svelte';
    import { writable } from 'svelte/store';

    export let firefighter;
    let el_avatar;
    let game;

    w_game.subscribe(value => {
        game = value;
    });

    let avatar = createAvatar(style,{
        seed: firefighter.id.toString() + firefighter.name,
        body: firefighter instanceof Chef? ['squared'] : ['small'],
        clothingColor: ['red']
    });
    onMount(() => {
        el_avatar.innerHTML = avatar;
    });

    function handleClickItem(){
        console.log("click",firefighter.state);
        if(firefighter.state == StateRessource.AVAILABLE){
            if(!game.deck[0].means_move.isFull()){
                firefighter.state = StateRessource.SELECTED;
                game.deck[0].means_move.addFireFighter(firefighter);
            }
            
        }else{
            firefighter.state = StateRessource.AVAILABLE;
            game.deck[0].means_move.removeFireFighter(firefighter);
        }
        w_game.update(game => game);
    }

</script>

<Item width=80 state={firefighter.state} >
    <div on:click={handleClickItem} on:keypress={handleClickItem}>
        <span>{firefighter.name}</span>
        {#if firefighter instanceof Crewman}
            <IconList categories={firefighter.experience}/>
        {:else}
            <div class="chef-experience">
                <span>{firefighter.power}</span>
                <IconOperationType type={firefighter.speciality}/>
            </div>
        {/if}
        <div class="avatar" bind:this={el_avatar}></div>
        <div class="bars">
            <ProgressBar color={firefighter.state == StateRessource.SICK? '#61D902' : '#0E99DA'} thickness=10 value={firefighter.fatigue}/>
            <ProgressBar color="#ff1744" thickness=10 value={firefighter.moral}/>
        </div>
    </div>
</Item>

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
</style>