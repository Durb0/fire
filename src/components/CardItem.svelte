<script>
    import {pan} from 'svelte-hammer';
    import { w_cards } from './store.js';
    import { onMount } from 'svelte';
    import { initCards} from './func.js';
    import { game } from './main.js';

    let el;
    let c;

    export let card;
    export let index;

    onMount(() => {
        if(index==0){
        //add class flipped to first card
        el.style.transform = "rotateY(180deg)";
        c.style.zIndex = "1";
        }else{
            c.style.zIndex = "0";
        }
    });

    //check if card is the first card

    function handlePanStart(event) {
        event.target.classList.add("moving");
        event.target.style.transition = "none";
    }

    function handlePanMove(event) {
        /*if (event.detail.deltaX === 0) {
            return;
        }*/
        if (event.detail.center.x ===0 && event.detail.center.y === 0) {
            return;
        }
        var deltaX = event.detail.deltaX;
        var deltaY = event.detail.deltaY;

        

        var xMulti = deltaX * 0.03;
        var yMulti = deltaY * 0.02;
        var rotate = xMulti * yMulti;
        

        event.target.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px) rotate(' + rotate + 'deg)';
    }

    function handlePanEnd(event) {
        event.target.classList.remove("moving");
        event.target.style.transition = "all 0.3s ease-in-out";

        var moveOutWidth = document.body.clientWidth;
        var keep = Math.abs(event.detail.deltaX) < 80 || Math.abs(event.detail.velocityX) < 0.5;

        event.target.classList.toggle("removed", !keep);

        if(keep){
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
            //wait 0.5s
            setTimeout(function(){;
                game.removeFirstCard();
                w_cards.update(cards => cards.slice(1));
            }, 500);
        }
    }
</script>



<div 
    class="card"
    use:pan
    on:panstart = {handlePanStart}
    on:panmove = {handlePanMove}
    on:panend = {handlePanEnd}
    bind:this={c}
>
    <div class="card_inner" bind:this={el}>
        <div class="card_back">
            <img src="./assets/backCard.png" alt="">
        </div>
        <div class="card_front">
            <h1>{card.title}</h1>
            <p>{card.description}</p>        
        </div>
    </div>
</div>

<style>
    :root{
        --card_size : 300px;
        --card_radius: 8px;
    }

    .card{
        position: absolute;
        width: var(--card_size);
        height: var(--card_size);
        transition: all 0.3s ease-in-out;
        cursor: -webkit-grab;
        cursor: -moz-grab;
        cursor: grab;
        perspective: 1000px;
        background-color: transparent;
    }

    .card_inner{
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

    .card_front, .card_back{
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        border-radius: var(--card_radius);
    }

    .card_front{
        background-color: white;
        transform: rotateY(180deg);
    }

    .flipped{
        transform :rotateY(180deg);
    }

</style>