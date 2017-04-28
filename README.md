# angular-sp-digest
An AngularJS module that keeps the Sharepoint 2013 RequestDigest refreshed

## Requirements

 - AngularJS

## Installing

### NPM

<pre>npm install angular-sp-digest</pre>

### Bower

<pre>bower install angular-sp-digest</pre>

## Usage

>Inject the module into your page:

```html
<script type="text/javascript" src="../node_modules/angular-sp-digest/dist/angular-sp-digest.min.js"></script>
```

>Include this module as a dependency in your app:

```javascript
angular.module('myApp', ['angular.sp.digest']);
```

>Start the RequestDigestIntervalService on app start

```javascript
angular.module('myApp', ['angular.sp.digest'])
})
.run(['RequestDigestIntervalService', function(RequestDigestIntervalService){

    //defaults to 24 minutes if you don't set this
    RequestDigestIntervalService.setInterval(1440000);

    RequestDigestIntervalService.start('/mysite');
    RequestDigestIntervalService.start('/mysite/mysubsite');
    RequestDigestIntervalService.start('/my-other-site');
    RequestDigestIntervalService.start('/');
}]);
```

>To get your digest:
```javascript
    RequestDigestCacheService.get('/mysite');
```

>To get a promise for a fresh digest from the server:
```javascript
    RequestDigestService.get('/mysite');
```

## Contributing

<pre>git clone https://github.com/mcleanra/angular-sp-digest.git</pre>

### Install dependencies

<pre>npm install</pre>

### Build

Build the app

<pre>gulp</pre>