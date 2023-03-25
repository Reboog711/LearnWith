var PROXY_CONFIG = [
  {
    context: [
      "/coldFusion"
    ],
    target: "http://local10.angular.learn-with.com",
    secure: false,
    logLevel: "debug",
    pathRewrite: {
      "^/coldFusion/": "http://local10.angular.learn-with.com/rest/lw4/"
    },
    changeOrigin: true
  },
  {
    context: [
      "/java"
    ],
    target: "http://localhost:8084",
    secure: false,
    logLevel: "debug",
    pathRewrite: {
      "^/java/": "http://localhost:8084/webapi/"
    }
  },
  {
    context: [
      "/nodejs"
    ],
    target: "http://127.0.0.1:8080/",
    secure: false,
    logLevel: "debug",
    pathRewrite: {
      "^/nodejs": ""
    }
  },
  {
    context: [
      "/php"
    ],
    target: "http://localphp.angular.learn-with.com:8080/",
    secure: false,
    logLevel: "debug",
    pathRewrite: function (path, req) {
      isNumeric =  (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      const resultsArray = path.split('?');
      const urlArrayDirectories = path.split('/');
      let url = resultsArray[0].replace('/php/', 'http://localphp.angular.learn-with.com:8080/A12/chapter4/php/com/dotComIt/learnWith/api/')  ;
      if (resultsArray.length > 1) {
        url += `/?${resultsArray[1]}`
      } else if (!isNumeric(urlArrayDirectories[urlArrayDirectories.length-1])) {
        url += '/'
      }
      console.log(url);
      return url;
    },
    changeOrigin: true
  }
]

module.exports = PROXY_CONFIG;
