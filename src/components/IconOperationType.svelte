<script>
    import * as icons from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';

    export let type;


</script>
{#if type.icon != null}
    <Fa class="icon" icon={icons[type.icon]} size="0.7x" color={type.color}/>
{:else}
<Fa class="icon" icon={ icons.faQuestion } size="0.7x" color="black"/>
{/if}

<style>
    svg{
        width: 18px;
        height: 18px;
    }
</style>