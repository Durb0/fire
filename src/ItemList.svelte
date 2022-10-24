<script>
    import Item from "./Item.svelte";
</script>


<div class="list">
    <div class="list_inner">
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
    </div>
</div>

<style>
.list {
    background-color: white;
    border-radius: 20px;
    text-align: center;
    height: 100%;
    padding: 10px;
    width: calc(100% - 20px);
}

.list_inner{
    display: flex;
    flex-direction: row;
    height: 100%;
    gap: 10px;
    padding: 0px 10px;
    overflow-x: scroll;
    border-radius: 10px;
    max-width:auto;
}
</style>