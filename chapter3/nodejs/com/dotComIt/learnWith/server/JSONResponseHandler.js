/**
 * Created by jhouser on 6/3/2016.
 */

function execute(response, data, callback){
    response.writeHead(200, {"Content-Type": "application/javascript"});
    var json = JSON.stringify(data);
    if(callback != ''){
        json = callback + "(" + json + ")";
    }
    response.write(json);
    response.end();

}

exports.execute = execute;
