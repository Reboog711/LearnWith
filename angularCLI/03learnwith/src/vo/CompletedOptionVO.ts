/**
 * Created by jhouser on 4/26/2017.
 */

export class CompletedOptionVO {

    constructor(id :number, label :string, value:boolean) {
        this.id = id;
        this.label = label;
        this.value = value;
    };

    id : number;
    label : string;
    value :boolean;
};