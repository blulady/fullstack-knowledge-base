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

## Creating a New Component 
- start with the app component serves as the root component
- AppComponent is list in the end of the bootstrap array in app.model.ts & that the component angular boostraps the whole appication
1. store the new component in a subfolder of the app directory (this is where app related content goes)
2. make the folder name the same as your component name (each component should have it's own folder)
3. name_of_component.component.ts
    - in file export class Name_of_componentComponent
    - will need the @Component() decorator (& import it)
    - in the component decorator will need to put the html selector naming convention 'app-server'
    - will need a name_of_component.component.html file
    - assign the pathway of the file to templateUrl in the component ts file

    create a component folder
        create a ts file in the component folder
        import compent class & decorator from angular/core
        link the pathway to the html file/create html file

## Understanding the Role of AppModule & Component Declaration
 - angular bundles modules into packages
 - module: a bundle of functionalities of our app (what features does my app have/use)
 - starts as an empty Typescript class & then add the decorator
 - bootstrap is responsible for telling angular which component you should start with (recognize in the index.html)
 - have to register the new compoent in the declarations array under AppComponent
 - have to import the file, extension is bundled automatically

 ## Using Custom Components
 - add the app-server html selector to the app.component.html

## Creating COmponents with the CLI & Nesting Components
 - will create a new component for you
    $ng g c servers

## Working with component Templates
 - can add components directly to the template in app.component.ts by adding selector to the template (after changing templateUrl to template)
 - can add html directtly inline template