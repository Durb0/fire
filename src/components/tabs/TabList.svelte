<div class="tab-list">
	<slot></slot>
</div>

<style>

    

    .tab-list{
        --gap: 5px;
        display:flex;
        flex-direction: row;
        justify-content: end;
        gap:var(--gap);
        padding-right: var(--gap);
        padding-left: var(--gap);
    }
</style>