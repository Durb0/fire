<!--
  @component
  
  L'application principale, gère le rooting et le changement de page  
-->

<script>
  // import du système de routing
  import { Router, Route } from "svelte-routing";

  // import des composants
  import MainPage from "./page/MainPage.svelte";
  import GamePage from "./page/GamePage.svelte";

  //import du store
  import { w_screen} from "../utils/store.js";

  export let url = "";

  /**
   * Définit l'état de l'écran
   */
  function defineScreen(){
    let width = window.innerWidth;
    let height = window.innerHeight;
    if(width > height){
      w_screen.update(n => n = "landscape");
    }
    else{
      w_screen.update(n => n = "portrait");
    }
  }

  /**
   * Définit l'état de l'écran au chargement de la page
  */
  window.addEventListener("load", function(){
		defineScreen();
	});


  /**
   * Définit l'état de l'écran à chaque redimensionnement de la fenêtre
  */
	window.addEventListener("resize", function(){
		defineScreen();
  });

</script>



<Router url="{url}">
      <Route path="game"><GamePage/></Route>
      <Route path="/"><MainPage /></Route>
</Router>

<svelte:body class="body daynight"/>

<svelte:head>
  <style>

    @font-face {
        font-family: "F!RE";
        src: url("/assets/font/FIRE.ttf");
      }

    body, html{
        overflow: hidden;
      }

    body{
      width : 100vw;
      height: 100vh;
      /*set font*/
      font-family: 'F!RE';
    }

    .daynight{
      
      background: linear-gradient(90deg, #546c8c, #1b3059, #091026);
      background-size: 1200% 1200%;

      --time-anim: 120s;

      -webkit-animation: daynight_cycle var(--time-anim) ease infinite;
      -moz-animation: daynight_cycle var(--time-anim) ease infinite;
      -o-animation: daynight_cycle var(--time-anim) ease infinite;
      animation: daynight_cycle var(--time-anim) ease infinite;
	  }

    @-webkit-keyframes daynight_cycle {
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
    }
    @-moz-keyframes daynight_cycle {
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
    }
    @-o-keyframes daynight_cycle {
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
    }
    @keyframes daynight_cycle {
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
    }
  </style>
</svelte:head>