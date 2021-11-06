export class CompletedOptionVO {
  id : number;
  label : string;
  value : Boolean | null;

  constructor(id :number, label :string, value:Boolean | null) {
    this.id = id;
    this.label = label;
    this.value = value;
  };

};
