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
    <a href="#" class="list-group-item clearfix"
    *ngFor="let recipe of recipes">
      <div class="pull-left">
        <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
        <p class="list-group-item-text">{{ recipe.description }}</p>
      </div>
      <span class="pull-right">
        <img [src]="recipe.imagePath"
         alt="{{ recipe.name }}"
         class="img-responsive"
         style="max-height: 50px;">
      </span>

## Displaying Recipe Details
- create the html to display the recipe details 

## Working on the Shopping List Component
- we add an output of list with clicable items
- enforce a curser that looks like a pointer (will later use this like a button & don't need the href)
- then we go to the logic side (.ts file) and add ingriedents empty array (realize we need a model)

## Creating an "ingredient" model
- need to create a shared folder because both components will be using the indgriedent model
- demos the shorthand for creating a class using
  export class Ingredient {
      constructor(public name: string, public amount: number) {
      }
  }

## Creating & Outputting the Shopping List
- we define the type for the ingredient array ( & import it)
- we create some ingredients 
- we use ngFor to out put the ingredients & their amount

## Adding a Shopping List Edit Section
- we add the html formatting to edit the shopping list
- we add two buttons the second of which does not submit the form, it will delete an ingredient
- a third button to allow us to clear the form

## Adding Navigation with Event Binding & ngIf
- load recipes or shoppping list determined by what was clicked in the header
- start with the header component template add click & function
        <li><a href="#" (click)="onSelect('recipe')">Recipes</a></li>
        <li><a href="#" (click)="onSelect('shopping-list')">Shopping List</a></li>
- then move to header component ts file & create onSelect function
      - add a new property called featureSelected, that is a new event emitter & pass the string
      - then we use the property as a value to emit an event whenever we click one of the buttons & emit feature (the string we passed in from the method call at the template)
      - then enable thi event to be listened to from outside this component
    
    @Output() featureSelected = new EventEmitter<string>();

    onSelect(feature: string) {
      this.featureSelected.emit(feature);
    }
- then in app.component.html will have the parent app listening for the featureSelected event
    <app-header (featureSelected)="onNavigate($event)">
    - $event will always refer to the event data anywhere between the quotes in the function called by (click)
- then in the app.component.ts file create onNavigate function & store the feature
      loadedFeature = 'recipe';
      onNavigate(feature: string) {
        this.loadedFeature = feature;
      }
- We can now place an if statement to determin which of the two components should be displayed
      <app-recipe-book *ngIf="loadedFeature === 'recipe'"></app-recipe-book>
      <app-shopping-list *ngIf="loadedFeature !== 'recipe'"></app-shopping-list>

