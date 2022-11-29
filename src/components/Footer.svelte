<script>
  import ItemList from "./ItemList.svelte";
  import { Tabs, TabList, Tab, TabPanel} from './tabs/tabs.js';
  import { faTruck, faPortrait, faIdBadge } from '@fortawesome/free-solid-svg-icons';
  
  import Fa from 'svelte-fa'

  const typeItem = {
    Truck: "truck",
    Chef: "chef",
    Firefighter: "firefighter"
  }

</script>



  <Tabs>
    <TabList>
      <Tab><Fa icon={faTruck} size="2x"/></Tab>
      <Tab><Fa icon={faIdBadge} size="2x"/></Tab>
      <Tab><Fa icon={faPortrait} size="2x"/></Tab>
    </TabList>

    <div class="tab__container">
      <TabPanel>
        <ItemList type={typeItem.Truck}/>
      </TabPanel>
  
      <TabPanel>
        <ItemList type={typeItem.Chef}/>
      </TabPanel>
  
      <TabPanel>
        <ItemList type={typeItem.Firefighter}/>
      </TabPanel>
    </div>
  </Tabs>

<style>

.tab__container{
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  height : calc(100% - 50px);
  padding: 20px;
  padding-bottom: 0;
  padding-top: 40px;
  background-color: #E9D0B5;
  border-radius: 10px 10px 0 0;
}
</style>