/**
 * Created by jhouser on 5/8/2017.
 */

import {DatePipe} from "@angular/common";
import {isObject} from "rxjs/internal/util/isObject";
import {isNumeric} from "rxjs/internal/util/isNumeric";
import {isArray} from "rxjs/internal/util/isArray";
import {isDate} from "rxjs/internal/util/isDate";

export class HttpUtils {

    static transformRequest (data:any):string {

        let param = function param(obj : any, separator : string = '=', wrapValueInQuotes : boolean = false,
                                   wrapNameInQuotes : boolean = false , ignoreName : boolean = false):string {

            let query : string = '';

            // keys are always encapsulated in quotes
            // values won't be if it is an array or object
            let nameQuote : string  = "";
            if (wrapNameInQuotes) {
                nameQuote = "\"";
            };

            let valueQuote : string = "";
            if (wrapValueInQuotes) {
                valueQuote = "\"";
            };

            for (let name of Object.keys(obj)) {
                let value : any = obj[name];

                if (isArray(value)) {
                    console.log('Array Condition');

                    // open array notation
                    if (!ignoreName) {
                        query += nameQuote + encodeURIComponent(name) + nameQuote + separator ;
                    }
                    query += '[';

                    for (let counter : number = 0; counter < value.length; ++counter) {
                        let subValue : string = value[counter];
                        let fullSubName : string = name + '[' + counter + ']';
                        let innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj, '', false, false, true ) + ',';
                    }
                    // remove last comma
                    query = query.substr(0, query.length - 1);
                    // close array notation
                    query += ']' + '&';

                } else
                // isDate has to be before isObject as dates are objects
                if (isDate(value)) {
                    // todo does not handle times
                    let datePipe: DatePipe = new DatePipe('en-US');
                    console.log('is date');
                    if (!ignoreName) {
                        query += nameQuote + encodeURIComponent(name) + nameQuote + separator;
                    }
                    query += valueQuote + encodeURIComponent(datePipe.transform(value, 'yyyy-MM-dd')) + valueQuote + '&';
//                        query += "\"" + encodeURIComponent(datePipe.transform(value, 'yyyy-MM-dd')) + "\"" + '&';
                } else
                if (isObject(value)) {
                    console.log('object condition');
                    let objectAsString : string = '';
                    for (let subName in value) {
                        if (value.hasOwnProperty(subName)) {
                            let o = {};
                            o[subName] = value[subName];
                            console.log(subName);
                            console.log(value[subName]);
                            if (isDate(value[subName])) {
                                objectAsString += param(o, ':', true, true) + ',';
                            } else if (isObject(value[subName])) {
                                objectAsString += param(o, ':', false, true) + ',';
                            } else if ( (value[subName] !== undefined) && (value[subName] !== null)) {
                                objectAsString += param(o, ':', true, true) + ',';
                            }
                            console.log(objectAsString);
                        }
                    }
                    // substr removes the final ampersand
                    objectAsString = objectAsString.length ? objectAsString.substr(0, objectAsString.length - 1) :objectAsString;
                    objectAsString = '{' + objectAsString + '}';
                    console.log(objectAsString);
                    if (!ignoreName) {
                        query += nameQuote + encodeURIComponent(name) + nameQuote + separator ;
                    }
                    query += valueQuote + objectAsString + valueQuote + '&';
                    console.log(query);
                } else
                if (typeof( value) === "boolean") {
                    console.log('is Boolean');
                    if (!ignoreName) {
                        query += nameQuote + encodeURIComponent(name) + nameQuote + separator ;
                    }
                    query += value + '&';
                } else
                if (isNumeric(value)) {
                    // honestly not sure if this needs to be called out independently or if the else condition handles it w/o issue
                    // I don't think encodeURIComponent is needed
                    console.log('is numeric condition');
                    if (!ignoreName) {
                        query += nameQuote + encodeURIComponent(name) + nameQuote + separator ;
                    }
                    query += value + '&';
                    console.log(query);
                } else
                if ( (value !== undefined) && (value !== null)) {
                    console.log('else condition');
                    if (!ignoreName) {
                        query += nameQuote + encodeURIComponent(name) + nameQuote + separator ;
                    }
                    query += valueQuote + encodeURIComponent(value) + valueQuote + '&';
                    console.log(query);
                }
            }
            console.log(query);
            // query substring removes the final ampersand
            return query.length ? query.substr(0, query.length - 1) :query;
        };
        console.log(data);
        return isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    };
}