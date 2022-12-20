<!--
	@component
	
	Affiche la page de jeu
-->

<script>
	// import des composants
	import Playground from "../layout/Playground.svelte";
	import Footer from "../layout/Footer.svelte";
	import Header from "../layout/Header.svelte";

	// import du store
	import { w_screen} from "../../utils/store.js";

	let screen; // variable qui contient l'état de l'écran
	export let play_zone; // référence à l'élément HTML du playground

	// subscribtion au store pour mettre à jour l'état de l'écran
	w_screen.subscribe(value=>{
		screen = value;
	})
</script>


<div class="game-page">
	<Header />
	<div class="play_zone" bind:this={play_zone} 
		class:landscape={screen == "landscape"}>
		<Playground />
		<Footer />
	</div>
</div>



<style>
	.game-page{
		display: grid;
		grid-template-rows: 65px 1fr;
		height: 100%;
	}
	.play_zone{
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 50% 50%;
		height: -webkit-fill-available;
	}

	.landscape{
		grid-template-columns: 50% 50%;
		grid-template-rows: calc(100vh - 65px);
	}
</style>

