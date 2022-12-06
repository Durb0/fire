<script>
  import { w_game } from "../../utils/store";
  import ProgressBar from "../core/ProgressBar.svelte";


  
  const colors = {
    0: "#D60000",
    25: "#FF530D",
    50: "#FFC801",
    75: "#93C700",
    100: "#0E99DA"
  }

  var value = 0;
  var color = colors[100];

  w_game.subscribe(game => {
    value = game.popularity;
    updateColor();
  });


  function updateColor(){
    //get the keys of the colors object
    let keys = Object.keys(colors);
    //get the index of the key that is closest to the value
    let index = keys.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
    //return the color
    color =  colors[index];
  }
</script>

<div class="header">
  <ProgressBar color={color} thickness=25 value={value} margin="20" />

</div>

<style>
  .header {
    text-align: center;
    display: flex;
  }
</style>