<!--
    @component
    
    Affiche une carte de jeu
-->

<script>
    // import de la librairie hammer pour les gestes
    import { Hammer,pan } from 'svelte-hammer';

    // import du store
    import { w_game } from '../../utils/store.js';

    // import des modèles
    import { Card, DilemmeCard, InformationCard, InterventionCard } from '../../models/Card.js';
    import { PositionType } from '../../models/Enums.js';

    // import de la librairie fontawesome pour les icones
    import Fa from 'svelte-fa'
    import { faTruck, faUser } from '@fortawesome/free-solid-svg-icons';

    // import des composants
    import IconOperationType from '../core/IconOperationType.svelte';
    import ProgressBar from '../core/ProgressBar.svelte';

    let el; // Réference html de l'interieur de la carte
    let c; // Réference html de la carte
    let game; // Le jeu

    /**
     * @param {Card} card - carte à afficher
     */
    export let card;
    /**
     * @param {number} index - index de la carte dans la liste
     */
    export let index;

    // subscribtion au store pour mettre à jour la variable game
    w_game.subscribe(value => {
        game = value;
    });

    /**
     * Fonction appelée lors du début du glissement de la carte
     * @param event
     */
    function handlePanStart(event) {
        // si la carte est la première de la liste, on lui ajoute la classe moving
        if(index == 0){
            event.target.classList.add("moving");
            event.target.style.transition = "none";
        }
    }

    /**
     * Fonction appelée lors du mouvement de la carte
     * @param event
     */
    function handlePanMove(event) {
        if (event.detail.center.x ===0 && event.detail.center.y === 0) {
            return;
        }

        // on récupère les déplacements
        var deltaX = event.detail.deltaX;
        var deltaY = event.detail.deltaY;

        
        // on calcule la rotation et la translation
        var xMulti = deltaX * 0.03;
        var yMulti = deltaY * 0.02;
        var rotate = xMulti * yMulti;
        
        // on applique la transformation
        event.target.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px) rotate(' + rotate + 'deg)';
    }

    /**
     * Fonction appelée lors de la fin du glissement de la carte
     * @param event
     */
    function handlePanEnd(event) {
        // on supprime la classe moving
        event.target.classList.remove("moving");
        event.target.style.transition = "all 0.3s ease-in-out";

        var moveOutWidth = document.body.clientWidth;

        // on récupère les déplacements
        var keep = (Math.abs(event.detail.deltaX) < 80 && Math.abs(event.detail.deltaY) < 80) || (Math.abs(event.detail.velocityX) < 0.5 && Math.abs(event.detail.velocityY) < 0.5) ;

        event.target.classList.toggle("removed", !keep);

        // on vérifie que la carte est une intervention et que la vitesse est valide
        if(keep || (card.constructor.name == "InterventionCard" && !card.means_move.isValideForIntervention())){
            console.log("Impossible d'envoyer ces moyens sur une intervention ou la carte est lachée sans vitesse.")
            event.target.style.transform = '';
        } else {
            var endX = Math.max(Math.abs(event.detail.velocityX) * moveOutWidth, moveOutWidth);
            var toX = event.detail.deltaX > 0 ? endX : -endX;
            var endY = Math.abs(event.detail.velocityY) * moveOutWidth;
            var toY = event.detail.deltaY > 0 ? endY : -endY;
            var xMulti = event.detail.deltaX * 0.03;
            var yMulti = event.detail.deltaY / 80;
            var rotate = xMulti * yMulti;
            event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.detail.deltaY) + 'px) rotate(' + rotate + 'deg)';

            // on supprime la carte de la liste et on applique ses effets
            card.swipeCard(game);
        }
    }
</script>



<div 
    class="card"
    use:pan={{ direction : Hammer.DIRECTION_ALL}}
    on:panstart = {handlePanStart}
    on:panmove = {handlePanMove}
    on:panend = {handlePanEnd}
    bind:this={c}
    class:card--flipped={index == 0}
>
    <div class="card__inner"
    bind:this={el}
    class:card__inner--flipped={index == 0}
    >
        <div class="card__back">
            <img src="./assets/backCard.png" alt="">
        </div>
        <div class="card__front" 
        class:front--intervention={card instanceof InterventionCard}
        class:front--information={card instanceof InformationCard}
        class:front--dilemme={card instanceof DilemmeCard}>
            <div class="front__text">
                <div class="front__text--header">
                    <p class="text__title">{card.title}</p>
                    {#if card instanceof InterventionCard && card.position == PositionType.BASE}
                        <p class="text__new">new</p>
                    {/if}
                </div>
                <p class="text__description">{card.description}</p>
            </div>
            
            {#if card instanceof InterventionCard}
                <div class="front__bottom front__bottom--intervention">
                    <div class="intervention intervention__trucks">
                        <Fa icon={faTruck} color="black"/>
                        <div class="categories">
                            {#each card.means_move.getNumbersOfCategories("truck") as dictCategory}
                                <span>{dictCategory.number}</span>
                                <IconOperationType type={dictCategory.category}/>
                            {/each}
                        </div>
                    </div>
                    <div class="intervention intervention__chefs">
                        <Fa icon={faUser} color="black"/>
                        <div class="categories">
                            {#each card.means_move.getNumbersOfCategories("chef") as dictCategory}
                                <span>{dictCategory.number}</span>
                                <IconOperationType type={dictCategory.category}/>
                            {/each}
                        </div>
                    </div>
                    <div class="intervention__seats">
                        <div class="seats__container--bars">
                            <ProgressBar class="progress_bar--grid" color="#ffcf40" background="lightgrey" value="{card.means_move.ratioSeatsMinMax()}" thickness=20/>
                            <ProgressBar class="progress_bar--grid" color="lightgreen" value="{card.means_move.ratioSeatsSelectedMax()}" thickness=20/>
                        </div>
                    </div>
                </div>
            {/if}    
        </div>
    </div>
</div>

<style>
    :root{
        --card_size : 70%;
        --card_radius: 20px;
    }

    .card{
        position: absolute;
        width: var(--card_size);
        aspect-ratio: 1/1;
        transition: all 0.3s ease-in-out;
        cursor: -webkit-grab;
        cursor: -moz-grab;
        cursor: grab;
        perspective: 1000px;
        background-color: transparent;
    }

    .card__inner{
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.3s ease-in-out;
        transform-style: preserve-3d;
        background-color: transparent;
    }

    .card img{
        pointer-events: none;
        width: 100%;
        height: 100%;
        border-radius: var(--card_radius);
    }

    .card__front, .card__back{
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        border-radius: var(--card_radius);
    }

    .card__front{
        background-color: white;
        transform: rotateY(180deg);
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 66% 34%;
        padding: 10px;
    }

    .front__text--header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .text__title{
        text-align: left;
        padding-left: 5px;
    }
    .text__new{
        color: red;
    }

    .text__description{
        font-size: larger;
    }

    .front--information{
        border: 5px solid #B5F2FA;
    }
    .front--intervention{
        border: 5px solid #F5CB77;
    }
    .front--dilemme{
        border: 5px solid #D5A5F8;
    }
    .front__bottom--intervention{
        display: grid;
        grid-gap:5px;
        justify-content: center;
        grid-template-columns: 50% 50%;
        grid-template-rows: 66% 34%;
    }
    .intervention{
        padding: 10px;
        border-radius: 10px;
        background-color: lightgrey;
    }
    .categories{
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: 5px;
    }
    .intervention__seats{
        grid-column: 1 / 3;
    }

    .card--flipped{
        z-index: 3;
    }

    .card__inner--flipped{
        animation: rotateCard 0.3s ease-in-out;
        transform: rotateY(180deg);
    }

    @keyframes rotateCard{
        0%{
            transform: rotateY(0deg);
        }
        100%{
            transform: rotateY(180deg);
        }
    }

    .seats__container--bars{
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }  
    
    .seats__container--bars :global(.progress_bar--grid){
        grid-row: 1;
        grid-column: 1;
    }
</style>