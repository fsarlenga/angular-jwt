angular.module('angular-jwt.headerCompression', [])
  .service('defaultCompression', function() {

    this.decompress = function(token)
    {
      return token;
    }
  });