<script>
  import ItemList from "./ItemList.svelte";

  const typeItem = {
    Truck: "truck",
    Chef: "chef",
    Firefighter: "firefighter"
  }

</script>


<div class="footer">
  <ItemList type={typeItem.Truck}/>
  <ItemList type={typeItem.Chef}/>
  <ItemList type={typeItem.Firefighter}/>
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