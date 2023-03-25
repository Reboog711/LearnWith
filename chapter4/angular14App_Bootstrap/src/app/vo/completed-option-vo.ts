export class CompletedOptionVO {

  constructor(id :number, label :string, value:Boolean | null) {
    this.id = id;
    this.label = label;
    this.value = value;
  };

  id : number;
  label : string;
  value : Boolean | null;
};
