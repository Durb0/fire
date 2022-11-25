<script>
  import { sleep } from "../utils/time";
  import { w_game } from "../utils/store";


  
  const colors = {
    0: "#D60000",
    25: "#FF530D",
    50: "#FFC801",
    75: "#93C700",
    100: "#0E99DA"
  }

  w_game.subscribe(game => {
    value = game.popularity;
    updateColor();
  });

  var value = 100;
  var color = colors[100];

  


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
  <div class="popularity__bar">
    <div class="popularity__bar__value" style="width: {value}%; background-color:{color};"></div>
  </div>
</div>

<style>
  .header {
    text-align: center;
    height: 100px; /*temp*/
    display: flex;
  }

  .popularity__bar{
    height: 25px;
    margin: 20px;
    box-sizing: border-box;
    border-radius: 50px;
    width: -webkit-fill-available;
    display: flex;
    flex-direction: column;
  }

  .popularity__bar__value{
    height: 100%;
    border-radius: 50px;
    max-width: 100%;
    transition: background 1s ease-in-out, width 1s ease-in-out;
  }
</style>