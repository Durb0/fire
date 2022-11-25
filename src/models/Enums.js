export var PositionType = {
    BASE: "BASE",
    MID: "MID",
    END: "END",
    BRIEF: "BRIEF"
};
//TODO: icon
export var OperationType = {
    FIRE : {name: "FIRE", icon: null, color: null, is_gain: true},
    ROAD_ACCIDENT : {name: "ROAD_ACCIDENT", icon: null, color: null, is_gain: true},
    SOCIAL: {name: "SOCIAL", icon: null, color: null, is_gain: true},
    PERSONNAL_ASSISTANCE: {name: "PERSONNAL_ASSISTANCE", icon: null, color: null, is_gain: true},
    MULTI_PURPOSE: {name: "MULTI_PURPOSE", icon: null, color: null, is_gain: true},
    SPEED: {name: "SPEED", icon: null, color: null, is_gain: true},
    WATER: {name: "WATER", icon: null, color: null, is_gain: true},
    HIGH: {name: "HIGH", icon: null, color: null, is_gain: true}
}

export var RelationLevel = {
    CRITICAL_SUCCESS : 20,
    SUCCESS : 10,
    FAILURE : -10,
    CRITICAL_FAILURE : -20,
    REFUSAL : 0,
    CRITICAL_REFUSAL : -30
}