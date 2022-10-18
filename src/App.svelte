<script>
  	import Header from "./Header.svelte";
  	import Playground from "./Playground.svelte";
  	import Footer from "./Footer.svelte";

	let name = 'world';
	var width =0;
	var height =0;

	window.addEventListener('resize', function() {
		calculateGridLayout();
	});

	calculateGridLayout();

	function calculateGridLayout(){
		width = window.innerWidth;
		height = window.innerHeight;

		if(width > height){
			//landscape
			console.log("landscape");
			//change grid layout
			document.documentElement.style.setProperty('--grid-template-columns', '1fr 1fr');
			document.documentElement.style.setProperty('--grid-template-rows', '1fr 1fr 1fr');
		}else{
			//portrait
			console.log("portrait");
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
			grid-template-rows: repeat(6, 1fr);
			height: 100vh;
			width: 100vw;
			overflow: hidden;
		}
	</style>
</svelte:head>

