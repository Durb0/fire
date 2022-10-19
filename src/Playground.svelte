<script>
  import { construct_svelte_component } from "svelte/internal";
    import Cards from "./Cards.svelte";

    let width, height;
    let element;
    window.addEventListener("load", function(){
        element = document.getElementsByClassName("playground")[0];
        resizeCard();
    });

    window.addEventListener('resize', function() {
        resizeCard();
    });

    function resizeCard(){
        var size = 0;
        
        width = element.clientWidth;
        height = element.clientHeight;
        if(width > height){
            //height size
            size = height*0.7;
        }else{
            //width size
            size = width*0.7;
        }
        document.body.style.setProperty('--card_size', size+'px');
    }

</script>
<div class="playground">
    <Cards/>
</div>

<style>
.playground{
  background-color: orange;
  text-align: center;
  grid-row: 2 / 5;
  display: flex;
  justify-content: center;
  align-items: center;
  }
</style>