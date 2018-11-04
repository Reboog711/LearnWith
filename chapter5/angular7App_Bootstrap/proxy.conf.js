var PROXY_CONFIG = [
  {
    context: [
      "/coldFusion"
    ],
    target: "http://local10.angular.learn-with.com",
    secure: false,
    logLevel: "debug",
    pathRewrite: {
      "^": "http://local10.angular.learn-with.com/A7/chapter5"
    },
    changeOrigin: true
  },
  {
    context: [
      "/java"
    ],
    target: "http://localhost:8085",
    secure: false,
    logLevel: "debug",
    pathRewrite: {
      "^/java": ""
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
    pathRewrite: {
      "^": "http://localphp.angular.learn-with.com:8080/A7/chapter5"
    },
    changeOrigin: true
  }
]

module.exports = PROXY_CONFIG;
