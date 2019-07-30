angular.module('angular-jwt.options', [])
  .provider('jwtOptions', function() {
    var globalConfig = {};
    this.config = function(value) {
      globalConfig = value;
    };
    this.$get = ['defaultCompression', function(defaultCompression) {

      var options = {
        urlParam: null,
        authHeader: 'Authorization',
        authPrefix: 'Bearer ',
        whiteListedDomains: [],
        tokenGetter: function() {
          return null;
        },
        loginPath: '/',
        unauthenticatedRedirectPath: '/',
        unauthenticatedRedirector: ['$location', function($location) {
          $location.path(this.unauthenticatedRedirectPath);
        }],
        headerCompression: defaultCompression
      };

      function JwtOptions() {
        var config = this.config = angular.extend({}, options, globalConfig);
      }

      JwtOptions.prototype.getConfig = function() {
        return this.config;
      };

      return new JwtOptions();
    }]
  });
