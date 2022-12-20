<!--
    @component
    
    Affiche une barre de progression
-->


<script>
    /**
     * @param {string} color - couleur de la barre
     */
    export let color = 'black';
    /**
     * @param {number} thickness - épaisseur de la barre
     */
    export let thickness = 10;
    /**
     * @param {number} value - valeur de la barre
     */
    export let value = 50;
    /**
     * @param {string} background - couleur de fond de la barre
     */
    export let background = "transparent";
    /**
     * @param {number} margin - marge de la barre
     */
    export let margin = 0;
</script>

<div class="{$$restProps.class || ''}" style="width:100%; height:{thickness}px; background: {background}; border-radius: {thickness}px; margin:{margin}px;">
    <div class="progress-bar__bar" style="width: {value}%; background-color: {color}; border-radius: {thickness}px;"></div>
</div>

<style>
    .progress-bar{
        width: 100%;
        border-radius: 5px;
    }

    .progress-bar__bar{
        height: 100%;
        transition: all 0.5s ease-in-out;
    }
</style>