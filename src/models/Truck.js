export class Truck{
    constructor(id,wear = 100,name,nb_seat_min,nb_seat_max){
        this.id = id; //TODO: generate id by service/store 
        this.wear = wear;
        this.name = name;
        this.nb_seat_min = nb_seat_min;
        this.nb_seat_max = nb_seat_max;
    }
}