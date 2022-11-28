<script>
	import Playground from "./Playground.svelte";
	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";
  import { rotate } from "svelte-hammer";
  import { faBorderStyle } from "@fortawesome/free-solid-svg-icons";

	let playground, footer;

	window.addEventListener("load", function(){
		playground = document.getElementsByClassName("playground")[0];
		footer = document.getElementsByClassName("footer")[0];
	});

</script>

<svelte:body class="body daynight"/>

<Header />
<Playground />
<Footer />

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
			display: flex;
			flex-direction:column;
			width : 100vw;
			height: 100vh;
			justify-content: space-between;
    		align-content: stretch;
    		align-items: stretch;
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


		.item-SELECTED{
			background-color: lightgreen !important;
			transform: rotate(2deg);
		}
	</style>
</svelte:head>

