<!--
    @component
    
    Affiche un item de type FireFighter, pour les chefs et les pompiers
-->

<script>
    // import de la librairie dicebear pour les avatars
    import { createAvatar } from '@dicebear/avatars';
    import * as style from '@dicebear/personas';

    // import de la methode onMount pour lancer des actions au chargement du composant
    import { onMount } from 'svelte';

    // import des modèles
    import { StateRessource } from '../../models/Enums';
    import { Crewman, Chef } from '../../models/FireFighter';

    // import du store
    import { w_game } from '../../utils/store.js';

    // import des composants
    import ProgressBar from '../core/ProgressBar.svelte';
    import IconList from '../core/IconList.svelte';
    import Item from './Item.svelte';
    import IconOperationType from '../core/IconOperationType.svelte';

    /**
     * @param {FireFighter} firefighter - le pompier à afficher
     */
    export let firefighter;
    
    let el_avatar; // l'element html de l'avatar
    let game; // le jeu

    // subscribtion au store pour mettre à jour la variable game
    w_game.subscribe(value => {
        game = value;
    });

    /**
     * Fonction appelée au chargement du composant, génère l'avatar
     * @param firefighter
     * @returns {string}
     */
    let avatar = createAvatar(style,{
        seed: firefighter.id.toString() + firefighter.name,
        body: firefighter instanceof Chef? ['squared'] : ['small'],
        clothingColor: ['red']
    });

    // lance la fonction au chargement du composant
    onMount(() => {
        el_avatar.innerHTML = avatar;
    });

    /**
     * Fonction appelée lors du clic sur l'item
     */
    function handleClickItem(){
        //récupère la première carte de la liste
        var firstCard = game.firstCard();
        // si il n'y pas de carte on ne fait rien
        if(firstCard == null) return;
        // si le pompier est disponible on l'ajoute à la carte
        if(firefighter.state == StateRessource.AVAILABLE){
            // si la carte n'est pas pleine on l'ajoute
            if(!firstCard.means_move.isFull()){
                // on change l'état du pompier
                firefighter.state = StateRessource.SELECTED;
                // on l'ajoute à la carte
                firstCard.means_move.addFireFighter(firefighter);
            }
            
        }else{
            // si le pompier est sélectionné on le retire de la carte
            firefighter.state = StateRessource.AVAILABLE;
            // on retire le pompier de la carte
            firstCard.means_move.removeFireFighter(firefighter);
        }
        // on met à jour le store
        w_game.update(game => game);
    }
</script>

<Item width=80 state={firefighter.state} >
    <div on:click={handleClickItem} on:keypress={handleClickItem}>
        <span>{firefighter.name}</span>
        {#if firefighter instanceof Crewman}
            <!--
                Affiche si le pompier est un equipier
            -->
            <IconList categories={firefighter.experience}/>
        {:else}
            <!--
                Affiche si le pompier est un chef
            -->
            <div class="chef-experience">
                <span>{firefighter.power}</span>
                <IconOperationType type={firefighter.speciality}/>
            </div>
        {/if}
        <div class="avatar" bind:this={el_avatar}></div>
        <div class="bars">
            <ProgressBar color="#0E99DA" thickness=10 value={firefighter.moral}/>
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