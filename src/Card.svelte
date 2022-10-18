<script>
    import {pan} from 'svelte-hammer';

    function handlePanStart(event) {
        console.log('panstart', event);
        event.target.classList.add("moving");
    }

    function handlePanMove(event) {
        if (event.deltaX === 0) return;
        console.log('panmove');
        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;

        event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
    }

    function handlePanEnd(event) {
        console.log('panend');
        event.target.classList.remove("moving");
    }
</script>



<div 
    class="card"
    use:pan
    on:panstart = {handlePanStart}
    on:panmove = {handlePanMove}
    on:panend = {handlePanEnd}
>
    <img src="https://placeimg.com/600/300/people" alt="">
</div>

<style>
    :root{
        --card_size : 300px;
    }

    .card{
        display: inline-block;
        width: var(--card_size);
        height: var(--card_size);
        background: #FFFFFF;
        border-radius: 8px;
        overflow: hidden;
        position: absolute;
        will-change: transform;
        transition: all 0.3s ease-in-out;
        cursor: -webkit-grab;
        cursor: -moz-grab;
        cursor: grab;
    }

    .moving{
        transition: none;
        cursor: -webkit-grabbing;
        cursor: -moz-grabbing;
        cursor: grabbing;
    }
</style>