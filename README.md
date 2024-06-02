<p align="center">
  <img src="resources/img/just_sugar.svg" alt="Project Logo">
</p

Just Sugar is a sweet and simple vanila JS framework that can be used to create dynamic SPAs. Just Sugar doesn't require of it's users to learn specific and confusing syntaxes or patterns, using instead plain old JavaScript.

## How to use?
### Clone or download this repository.
### In your index file (or whatever other file you are using) inlcude the just_jugar.js configuration file.
```
  <script type="module" src="/just_sugar.js"></script>
```

### Configre the just_sugar.js file to your needs. Make sure you change the selector to match your app wrapper. If desired you can also create multiple such files and load them dinamycally.

   The app wrapper:
```
  <body id="APP"></body>
```
The just_sugar.js file
```
  import APP from '/core/app.js'
  import routes from '/src/config/routes.js'
  window.__JUST_SUGAR__ = new APP(routes, {wrapperSelector: '#APP', devMode: true})
  await __JUST_SUGAR__.init()
```

### Create your layouts and pages and have fun.


## Want to learn more? Go [here]()