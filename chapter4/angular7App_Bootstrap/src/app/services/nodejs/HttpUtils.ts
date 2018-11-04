import {DatePipe} from "@angular/common";
import {isNumeric} from "rxjs/internal/util/isNumeric";

export class HttpUtils {

  static objToJSONString (obj : any) :string {
    let datePipe : DatePipe = new DatePipe('en-US');
    let str : string = '';
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        console.log(p);
        console.log(obj[p]);
        // checks for item numeric
        // so that 0s don't fail the defined check
        if (isNumeric(obj[p])) {
          console.log('is numeric');
          str += "\"" + p + "\":\"" + obj[p] + "\",";
          // checks for item defined
        } else if (typeof(obj[p]) === "boolean") {
          debugger;
          console.log('is Boolean');
          str += "\"" + p + "\":" + obj[p] + ",";
//          str += "\"" + p + "\":\"" + obj[p] + "\",";
        } else if (obj[p]) {
          if (obj[p] instanceof Date) {
            console.log('is date');
            str += "\"" + p + "\":\"" + datePipe.transform(obj[p], 'yyyy-MM-dd') + "\",";
          } else {
            console.log('is something else');
            str += "\"" + p + "\":\"" + obj[p] + "\",";
          }
        }
      }
    }
    if(str.length > 0){
      str = str.substr(0,str.length-1)
    }
    return '{' + str + '}';
  }
}
