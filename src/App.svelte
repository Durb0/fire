<script>
  	import Header from "./Header.svelte";
  	import Playground from "./Playground.svelte";
  	import Footer from "./Footer.svelte";
  import { construct_svelte_component } from "svelte/internal";

	var width =0;
	var height =0;

	let header, playground, footer;

	window.addEventListener("load", function(){
		header = document.getElementsByClassName("header")[0];
		playground = document.getElementsByClassName("playground")[0];
		footer = document.getElementsByClassName("footer")[0];

		calculateGridLayout();
	});

	window.addEventListener('resize', function() {
			calculateGridLayout();
	});
	
	function calculateGridLayout(){
		width = window.innerWidth;
		height = window.innerHeight;
		if (!header || !playground || !footer){
			console.log("header not found");
			return;
		}
		

		if(width > height){
			//landscape
			//change grid layout
			document.body.style.gridTemplateColumns = 'repeat(2, 1fr)';
			document.body.style.gridTemplateRows = 'repeat(2, 1fr)';
			header.style.gridRow = "1";
			header.style.gridColumn = "1";
			playground.style.gridRow = "1 / 3";
			playground.style.gridColumn = "2";
			footer.style.gridRow = "2";
			footer.style.gridColumn = "1";
			footer.style.width = "calc(50vw - 40px)";
		}else{
			//portrait
			document.body.style.gridTemplateColumns = '1fr';
			document.body.style.gridTemplateRows ='repeat(6, 1fr)';
			header.style.gridRow = "1 / 2";
			header.style.gridColumn = "1";
			playground.style.gridRow = "2 / 5";
			playground.style.gridColumn = "1";
			footer.style.gridRow = "5 / 7";
			footer.style.gridColumn = "1";
			footer.style.width = "calc(100vw - 40px)";
		}
	}

</script>

<svelte:body class="body"/>

<Header />
<Playground />
<Footer />

<svelte:head>
	<style>
		body{
			display: grid;
			width : 100vw;
			height: 100vh;
			overflow: hidden;
		}
	</style>
</svelte:head>

