<script>
    import { createAvatar } from '@dicebear/avatars';
    import * as style from '@dicebear/personas';
    //import enums from personas
    import { onMount } from 'svelte';
    import IconOperationType from './IconOperationType.svelte';


    export let firefighter;
    let el;

    //TODO: fonction onclick qui prend en compte l'etat actuel du pompier, si il reste de la place dans les camions,...

    let avatar = createAvatar(style,{
        seed: firefighter.id.toString() + firefighter.name,
        body: ['squared'],
        clothingColor: ['red']
    });
    onMount(() => {
        el.querySelector('.avatar').innerHTML = avatar;
    });

</script>
    

<div bind:this={el} class="item">

    <span>{firefighter.name}</span>
    <div class="experience">
        {#each firefighter.experience as exp}
                <IconOperationType type={exp}/>
        {/each}
    </div>
    <!--image from https://avatars.dicebear.com/api/personas/.svg-->
    <!--<img src="https://avatars.dicebear.com/api/personas/{firefighter.id}{firefighter.name}.svg" alt="">-->
    <div class="avatar"></div>
    <div class="bars">
        <div class="fatigue_bar bar">
            <div class="fatigue_bar_inner bar_inner" style="width: {firefighter.fatigue}%;"></div>
        </div>
        <div class="moral_bar bar">
            <div class="moral_bar_inner bar_inner" style="width: {firefighter.moral}%"></div>
        </div>
    </div>
</div>

<style>

    .experience{
        display: flex;
        flex-direction: row;
        gap: 5px;
        height:18px;
        justify-content: center;
    }

    .bars{
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .item {
        padding:10px;
        background-color: ghostwhite;
        border-radius: 5px;
        text-align: center;
        display: flex;
        flex-direction: column;
        height: 100%;
        text-transform: uppercase;
        width:65px;
        height: fit-content;
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
        background-color: #00c853;
    }

    .fatigue_bar_inner{
        background-color: #ff1744;
    }

    .bar_inner{
        height: 100%;
        border-radius: 5px;
    }
</style>