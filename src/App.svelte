<script>
  import Header from "./Header.svelte";
  import Playground from "./Playground.svelte";
  import Footer from "./Footer.svelte";

	let name = 'world';
</script>

<main>
	<Header />
	<Playground />
	<Footer />
</main>

<style>
	main{
		display: grid;
		grid-template-rows: repeat(6, 1fr);
		height: 100vh;
		width: 100vw;
	}
</style>
