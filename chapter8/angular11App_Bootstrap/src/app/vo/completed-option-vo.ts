export class CompletedOptionVO {
  id : number;
  label : string;
  value : boolean | null;

  constructor(id :number, label :string, value:boolean | null) {
    this.id = id;
    this.label = label;
    this.value = value;
  };

};
