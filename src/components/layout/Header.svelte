<!--
  @component
  
  Affiche le header de la page qui contient le score et la barre de popularité
-->

<script>
  // import du store
  import { w_game } from "../../utils/store";

  // import du composant ProgressBar
  import ProgressBar from "../core/ProgressBar.svelte";


  // les couleurs de la barre de popularité
  const colors = {
    0: "#D60000",
    25: "#FF530D",
    50: "#FFC801",
    75: "#93C700",
    100: "#0E99DA"
  }

  var popularity = 0; // la popularité
  var score = 0; // le score
  var color = colors[100]; // la couleur de la barre de popularité

  // on s'abonne au store pour mettre à jour les variables
  w_game.subscribe(game => {
    popularity = game.popularity;
    //get len of operation closed
    score = game.operations_closed.length;
    updateColor();
  });

  /**
   * Fonction qui met à jour la couleur de la barre de popularité
   */
  function updateColor(){
    //récupère les clés du dictionnaire
    let keys = Object.keys(colors);
    //récupère la clé la plus proche de la popularité
    let index = keys.reduce((prev, curr) => Math.abs(curr - popularity) < Math.abs(prev - popularity) ? curr : prev);
    //met à jour la couleur
    color =  colors[index];
  }
</script>

<div class="header">
  <span class="header__score">{score}</span>
  <ProgressBar color={color} thickness=25 value={popularity} margin="20" />
</div>

<style>
  .header {
    text-align: center;
    display: flex;
    align-items: center;
  }

  .header__score{
    font-size: 2em;
    font-weight: bold;
    margin-left: 20px;
    color: #0E99DA;
  }
</style>