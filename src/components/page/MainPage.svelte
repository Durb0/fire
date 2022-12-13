<script>
    import * as icons from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';
    import {Link} from "svelte-routing";



    export let title;

    //while url is not changed, this function will be called
    let inter = setInterval(changeTitle, 150);



    function changeTitle(){
        let randx = Math.floor(Math.random() * 10 - 5);
        let randy = Math.floor(Math.random() * 10 - 5);
        if (title){
            title.style.textShadow = "red "+randx+"px "+randy+"px 3px";
        }
        else{
            clearInterval(inter);
        }
    }


</script>

<div class="main-page">
    <span class="main-page__title" bind:this={title}>F!RE</span>
    <Link to="game">
        <Fa class="icon" icon={icons["faPlay"]} size="8x" color={"ghostwhite"} style="text-shadow:lightgray 0px 10px 0px;"/>
    </Link>
</div>

<style>
    .main-page{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .main-page__title{
        font-size: 200px;
        color: darkorange;
        transition: text-shadow 0.15s ease-in-out;
    }
</style>