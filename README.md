<p align="center">
  <img src="resources/img/just_sugar.svg" alt="Project Logo">
</p

Just Sugar is a sweet and simple vanila JS framework that can be used to create dynamic SPAs and interfaces. Just Sugar doesn't require of it's users to learn specific and confusing syntaxes or patterns, using instead plain old JavaScript. All views, layouts and components are classes and their templates are created via template literals.

## How to use?
### 1. Clone or download this repository.
### 2. Include the following script tag depending on whether or not you want to create a SPA in your HTML file:
#### 2.1 SPA
```html
  <script type="module">
    import APP from "/core/app.js";
    import routes from "/src/config/routes.js"
    new APP(routes, {wrapperSelector: '#APP', devMode: true})
  </script>
```
#### 2.2 Non SPA
```html
  <script type="module">
    import APP from "/core/app.js";
    new APP(null, {wrapperSelector: '#APP', devMode: true, layout: "default", view: "home"})
  </script>
```
### 3. Run node server.js to start the built in server for Just sugar
### 4. Create your layouts and pages and have fun.

## Want to learn more? Go [here](https://github.com/miti997/just-sugar-documentation)