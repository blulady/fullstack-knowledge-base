# The Basics

## How An Angular Aapp gets Loaded
 - server is at localhost:4200
 - app-root is not a default HTML element it is a component the angular cli created for us
 - all the files in the app folder are components
 - the index.html file has the root-app selector that is being called from the app.component.html
 - there are scripts at the end of index.html that you can see with the development tools that are injected automatically by the cli
    - whenever the ng serve process rebuilds the project it will create the scripts/bundles & add the right imports in the html file

- main.ts is the first code that gets executed
    `platformBrowserDynamic().bootstrapModule(AppModule)`
        this line bootstrap starts the angular application by passing AppModule to the boostrapModule method
    `AppModule` refers to app.module.ts
    -then angular reads the app.component.ts into the index.html file

    ## Components are Important
- angular is a js framework changing your DOM ('HTML') at run time
- components are a key feature in angular
- whole application is made from a couple of components
- root componet that contains the entire application
- each component has it's own html, own styling & own business logic
- breaks it into reusable parts
- easier to update, exchange & is reusable


