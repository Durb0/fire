<script>
    import {pan, swipe} from 'svelte-hammer';
    import { initCards } from './func.js';

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
        event.target.style.transition = "0.3s ease-in-out";

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
            initCards();
        }
    }
</script>



<div 
    class="card"
    use:pan
    on:panstart = {handlePanStart}
    on:panmove = {handlePanMove}
    on:pandown = {handlePanMove}
    on:panend = {handlePanEnd}
>
    <div class="card_inner">
        <div class="card_back">
            <img src="./assets/backCard.png" alt="">
        </div>
        <div class="card_front">
            <h1>Bonjour</h1>        
        </div>
    </div>
</div>

<style>
    :root{
        --card_size : 300px;
    }

    .card{
        position: absolute;
        width: var(--card_size);
        height: var(--card_size);
        border-radius: 8px;
        transition: all 0.3s ease-in-out;
        cursor: -webkit-grab;
        cursor: -moz-grab;
        cursor: grab;
        perspective: 1000px;
    }

    .card_inner{
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        transition: transform 0.3s ease-in-out;
        transform-style: preserve-3d;
    }

    .card img{
        pointer-events: none;
        width: 100%;
        height: 100%;
    }

    .card_front, .card_back{
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        border-radius: 10px;
    }

    .card_front{
        background-color: white;
        transform: rotateY(180deg);
    }

</style>