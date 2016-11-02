/**
 * Created by jhouser on 6/3/2016.
 */

function execute(response, queryString) {
    response.writeHeader(200, {"Content-Type": "text/plain"});
    response.write('The Index');
    response.end();
};
exports.execute = execute;
