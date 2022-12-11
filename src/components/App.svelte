<script>
	import Playground from "./layout/Playground.svelte";
	import Footer from "./layout/Footer.svelte";
	import Header from "./layout/Header.svelte";
	import { w_screen} from "../utils/store.js";

	let playground, footer;
	export let play_zone;

	window.addEventListener("load", function(){
		playground = document.getElementsByClassName("playground")[0];
		footer = document.getElementsByClassName("footer")[0];
		defineGrid();
	});

	window.addEventListener("resize", function(){
		defineGrid();
	});


	function defineGrid(){
		let width = window.innerWidth;
		let height = window.innerHeight;
		if(width > height){
			play_zone.classList.add("landscape");
			w_screen.update(n => n = "landscape");
		}
		else{
			play_zone.classList.remove("landscape");
			w_screen.update(n => n = "portrait");
		}
	}

</script>

<svelte:body class="body daynight"/>

<Header />
<div class="play_zone" bind:this={play_zone}>
	<Playground />
	<Footer />
</div>


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
			display: grid;
			grid-template-rows: 65px 1fr;
			width : 100vw;
			height: 100vh;
			/*set font*/
			font-family: 'F!RE';
		}

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

		.tabs-landscape{
			height: calc(100vh - 65px);
		}
	</style>
</svelte:head>

