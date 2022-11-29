<div class="tab-list">
	<slot></slot>
</div>

<style>

    

    .tab-list{
        --gap: 10px;
        display:flex;
        height: 50px;
        flex-direction: row;
        justify-content: end;
        gap:var(--gap);
        padding-right: var(--gap);
        padding-left: var(--gap);
    }
</style>