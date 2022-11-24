<script>
    import { OperationType } from "../models/Enums.js";
    import { faFire, faCarBurst, faPerson, faThumbsUp, faQuestion} from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';

    export let type;

    function defineIcon(){
        switch(type){
            case OperationType.FIRE:
                return {
                    icon: faFire,
                    color: "red"
                };
            case OperationType.ROAD_ACCIDENT:
                return {
                    icon: faCarBurst,
                    color: "orange"
                };
            case OperationType.SOCIAL:
                return {
                    icon: faThumbsUp,
                    color: "blue"
                };
            case OperationType.PERSON_ASSISTANCE:
                return {
                    icon: faPerson,
                    color: "green"
                };
            default:
                return {
                    icon: faQuestion,
                    color: "black"
                };
        }
    }

    let ic = defineIcon();

</script>

<Fa icon={ic.icon} size="0.5x" color={ic.color}/>