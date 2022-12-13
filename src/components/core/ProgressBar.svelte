<script>
    export let color = 'black';
    export let thickness = 10;
    export let value = 50;
    export let background = "transparent";
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