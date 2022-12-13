<script>
	import Playground from "../layout/Playground.svelte";
	import Footer from "../layout/Footer.svelte";
	import Header from "../layout/Header.svelte";
	import { w_screen} from "../../utils/store.js";

	let screen;
	export let play_zone;

	w_screen.subscribe(value=>{
		screen = value;
	})

</script>



<Header />
<div class="play_zone" bind:this={play_zone} 
	class:landscape={screen == "landscape"}>
	<Playground />
	<Footer />
</div>



<style>
	.play_zone{
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 50% 50%;
		height: -webkit-fill-available;
	}

	.landscape{
		grid-template-columns: 50% 50%;
		grid-template-rows: 1fr;
	}
</style>

