<script>


    export let chef;
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

</div>

<style>
.item {
    background-color: red;
    border-radius: 20px;
    text-align: center;
    display: flex;
    flex-direction: row;
    height: 100%;
}
</style>