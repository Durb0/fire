<script>
    
    export let firefighter;
    export let el
    let height;

    window.addEventListener("load", function(){
        defineWidth();
    });

    window.addEventListener('resize', function() {
        defineWidth();
    });

    function defineWidth(){
        height = el.clientHeight;
        el.style.minWidth = height * 0.7 + "px";
    }
</script>
    

<div bind:this={el} class="item">

    <span>{firefighter.name}</span>
    <!--image from https://avatars.dicebear.com/api/personas/.svg-->
    <img src="https://avatars.dicebear.com/api/personas/{firefighter.id}{firefighter.name}.svg" alt="">
    <div class="fatigue_bar bar">
        <div class="fatigue_bar_inner bar_inner" style="width: {firefighter.fatigue}%;"></div>
    </div>
    <div class="moral_bar bar">
        <div class="moral_bar_inner bar_inner" style="width: {firefighter.moral}%"></div>
    </div>

</div>

<style>
.item {
    padding:10px;
    background-color: white;
    border-radius: 5px;
    text-align: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    text-transform: uppercase;
    width:65px;
    height: fit-content;
}

.bar{
    width: 100%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    margin-top: 5px;
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