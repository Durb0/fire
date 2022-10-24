<script>
  import ItemList from "./ItemList.svelte";

  export let el;

</script>


<div class="footer" bind:this={el}>
  <ItemList/>
  <ItemList/>
  <ItemList/>
</div>

<style>
.footer {
  background-color: blue;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width:calc(100vw - 40px);
  padding: 20px;
  
}
</style>