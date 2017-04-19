# angular-sp-digest
An AngularJS module that keeps the Sharepoint 2013 RequestDigest refreshed

## Requirements

 - AngularJS

## Installing

### NPM

<pre>npm install angular-sp-digest</pre>

Inject the module into your page:

```html
<script type="text/javascript" src="../node_modules/angular-sp-digest/dist/angular-sp-digest.min.js"></script>
```

Include this module as a dependency in your app:

```javascript
angular.module('myApp', ['angular.sp.digest']);
```

Configure and start the RequestDigestIntervalService on app start

```javascript
angular.module('myApp', ['angular.sp.digest'])
    .config(function(){
        window._spFormDigestRefreshInterval = 1440000;
        window._spPageContextInfo = window._spPageContextInfo || {
            siteAbsoluteUrl: '/OAA' //this is the site or subsite you want to write to
        };
})
.run(['RequestDigestIntervalService', function(RequestDigestIntervalService){
    //this refreshes the request digest every 24 minutes, allowing us to post info to SharePoint
    RequestDigestIntervalService.startInterval();
}]);
```

### Bower

<pre>bower install angular-sp-digest</pre>

## Contributing

<pre>git clone https://github.com/mcleanra/angular-sp-digest.git</pre>

### Install dependencies

<pre>npm install</pre>

### Build

Build the app

<pre>gulp</pre>