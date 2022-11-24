export var PositionType = {
    BASE: 0,
    MID: 1,
    END: 2,
    BRIEF: 3
};

export var OperationType = {
    FIRE : "FIRE",
    ROAD_ACCIDENT : "ROAD_ACCIDENT",
    SOCIAL: "SOCIAL",
    PERSON_ASSISTANCE: "PERSON_ASSISTANCE",
}

export var RelationLevel = {
    CRITICAL_SUCCESS : 20,
    SUCCESS : 10,
    FAILURE : -10,
    CRITICAL_FAILURE : -20,
    REFUSAL : 0,
    CRITICAL_REFUSAL : -30
}