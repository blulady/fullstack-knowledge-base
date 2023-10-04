## Course Project
- build a recipe book & shopping list
- plan the app

## Planning the App
- lay out the structure
- plan what components you are likely to need (be flexible)
- features: shopping list & recipe book
    - will need a root component
    - header component to navigate betwen two sections
        will have a router, buisness logic & a dropdown
    - shopping list component & a shopping list edit
        list component to hold data
        edit component to manage it * will be nested into list component
        Ingredient component
    - recipe book
        list component to hold data
        recipe item nested in list component
        recipe detail area, also nested
- Modeling Data
    - clear & defined
    - ingredients: name & amount
    - recipe: title, description, ingredients

## Setting up the Application 
- ng new recipies_shopping --no-strict
- npm install --save bootstrap
- add Bootstrap node_modules/bootstrap/dist/css/bootstrap.min.css to the styles[] array in angular.json
- clear the title in app.componet.ts & the app.component.html file

## Creating the Components
- to nest a component you can cd into the folder you want to create them for or
  ng g c recipes/recipe-list --spec false
    parent folder/new_component

## Using the components
- here we place the components where we will want them to show up on the pages
- here we arrange the main components first in the app.component html (recipes & shopping list)
- then we arrange recipe-list & recipe detail next to each other in recipies.component.html using:
  <div class="row">
    <div class="col-md-5">
      <app-recipe-list></app-recipe-list>
    </div>
    <div class="col-md-7">
      <app-recipe-detail></app-recipe-detail>
    </div>
  </div>
- then in recipe-list.component.html we display the app-recipe-item
- in shopping-list.component.html we add the app-shopping-edit

## Adding the Navigation bar
- use html & bootstrap to create a navbar, which isn't working so great because npm doesn't seem to put bootstrap3 where we would normally expect to find it
- copied folder from other project & pasted it into the right place (will check to see why it's not working later)

## Creating A Recipe Model
- create a new file in recipe-book called recipe.model.ts
    - this is where we define our recipe class (what a recipe looks like) using vanilla typescript

## Adding Content to the Recipes Components
- here we type the array with the recipe model in the recipe-list component
- we create a test model
- we format the recipe-list.component.html to print out the list of our recipe items
    an impressive demonstration of the full use of bootstrap

## Outputting a List of Recipes with ngFor
- we plug the logic into the html for displaying a list of recipes using
    -ngFor
    & property binding for the img