/**
 * Les différents types de position
 */
export var PositionType = {
    BASE: "BASE",
    MID: "MID",
    END: "END",
    BRIEF: "BRIEF"
};

/**
 * Les différents types de relation
 */
export var RelationLevel = {
    CRITICAL_SUCCESS : 20,
    SUCCESS : 10,
    FAILURE : -10,
    CRITICAL_FAILURE : -20,
    REFUSAL : -15,
    CRITICAL_REFUSAL : -30
}

/**
 * Les différents états d'une ressource
 */
export var StateRessource = {
    SELECTED : "SELECTED",
    AVAILABLE : "AVAILABLE",
    SICK: "SICK",
    UNAVAILABLE : "UNAVAILABLE"
}

/**
 * Les différents titres des cartes d'information
 */
export var TitleInformationCard = {
    DEPART_CREWMAN : "Départ d'un équipier",
    DEPART_CHEF : "Départ d'un chef",
    NOUVEAU_CHEF : "Nouveau chef",
    NOUVEAU_CREWMAN : "Nouveau équipier",
    NOUVEAU_MOYEN : "Nouveau moyen"
}