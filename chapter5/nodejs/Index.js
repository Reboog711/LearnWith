/**
 * Created by jhouser on 6/3/2016.
 */

var server = require("./com/dotComIt/learnWith/server/Server");
var requestRouter = require("./com/dotComIt/learnWith/server/RequestRouter");
var requestHandlers = require("./com/dotComIt/learnWith/server/ResponseHandlers");
server.start(requestRouter.route, requestHandlers.handlers);
