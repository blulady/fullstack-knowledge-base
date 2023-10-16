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

## Passing Recipe Data with Property Binding
- we cut the recipe-list.component.html and paste it into the recipe item (now that we know how to pass data btwen components)
    
    <a href="#" class="list-group-item clearfix">
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
    </a>

    - and then call the recipe item from recipe list
        <app-recipe-item
          *ngFor="let recipeElement of recipes"
          [recipe]="recipeElement"></app-recipe-item>
    - and then import the recipe model into the recipe-item component
        export class RecipeItemComponent {
            @Input() recipe: Recipe;

            constructor() {}

            ngOnInit() {

            }
          }

## Passing Data with Event & Property Binding
- looking to click on a single recipe item & load it in the recipe details section recipe-item.component.html
    <a href="#" class="list-group-item clearfix"
    (click)="onSelected()">
- emit an event on a single recipe item component recipe-item.component.ts emitevent
    @Output() recipeSelected = new EventEmitter<void>();
    onSelected() {
      this.recipeSelected.emit();
    }
- & output this event to the recipe-list html component to pass down the event data (which recipe was selected)
    (recipeSelected)="onRecipeSelected(recipeElement)"
    <app-recipe-detail
- we have to impliment the onRecipeSelected(recipeElement) in recipe-list.ts
    @Output() recipeWasSelected = new EventEmitter<Recipe>()
      onSelected() {
        this.recipeSelected.emit();
      }
- then go to recipes.component.html to display the recipe selected
    (recipeWasSelected)="selectedRecipe = $event"
    *ngIf="selectedRecipe; else infoText"></app-recipe-detail>
      <ng-template #infoText>
        <p>Please select a Recipe</p>
      </ng-template>

- make sure that the property exists in the recipes.component.ts file
    selectedRecipe: Recipe;
    export class RecipeBookComponent {
      selectedRecipe: Recipe;
    }
- now we pass this information to the recipe detail component & say a dummy text if a recipe hasn't been selected by creating a local refrence that we add to the else statment of the ngIf

## Allowing the User to Add Ingredients to the Shopping List
- in the form of shopping-edit.component.html add a nameInput local reference to the name input & add a local reference #amountInput to the amount input
- then the idea is to use the local references (passing them as an argument or using @ViewChild) so when you click on the button you use the value of the inputs to create a new ingrident & add it to our array of ingridents
- then take the refrences (name & amount) & create a function for the add button OnAddItem()
- in shopping-edit.component.ts add the properties using @ViewChild
- you will then create a eventemitter to send the new ingredient to the shopping-list.component.html (parent) with @Output()
- in OnAddItem() stick the properties into a new ingredient & then call the event emitter
- then in the parent component (shopping-list.component.html) we add our listener (ingredientAdded)="onIngredientAdded($event)
- then in the parent component (shopping-list.component.ts) we define the function:
    onIngredientAdded(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
    }
& add our ingredient to the list

# Directives Deep Dive

## Module Introduction
- attribute directives: sit on elements just like attributes
  - will never distroy an element on the dom, just properties
- structural directives: also change the struture of the DOM around this element
  - ngIf on a paragraph & if that condition is false this paragraph is removed from the DOM, overall view container affected
  - affect a whole area in the DOM/all the DOM

## ngFor & ngIf Recap
- can't have more than one structural directive on one element

## ngClass & ngStyle Recap
- attribute directives
- use ngClass to set a css class ig:
      [ngClass]="{odd: odd % 2!==0}"
- ngStyle asllows us to also pass an object to some property (the property) is alss named ngStyle) on the same directive
- so we can use the attribute directives to add if statements to a property ig
    [ngStyle]="{backgroundColor: odd % 2 !== 0 ? 'black': 'transparent'}"

## Creating a Basic Attribute Directive
- create a folder in app for the directive & then create a directive.ts file for the directive ig:
  basic-highlight
    basic-highlight.directive.ts
- create a directive by using the @Directive decorator & creating a BasicHighLightDirective class
- configure the directive by adding a selector,
    - without brackets around the selector would select it by element (needs to be unique)
      -if you want it attribute style wrap the 'appBasicHighlight' in brackets '[appBasicHighlight]'
        this will make it recognised without the square brakets when added to an element
- we can inject the element the directive sits on into this directive
    - inject by adding the constructor (which every TypeScript class has)
    - need specific argument: a reference to the element the directive was placed on (ElementRef)
        - to use the data in our class add private (making it a property of this class & automatically assign this value)
        - then we can access the element by using nativeElement
        ^ best to do the above in the OnInit function
- inform angular we have a new directive by
    - going to app.module.ts 
      - adding BasicHighLightDirective under declarations

## Using Renderer to build a Better Attribute Directive
- better because can get an error when directly accessing the DOM (basic example) instead of using the renderer
- ng generate directive // ng g d
- create a folder for it (will need to adjust path if you do this)
  - in the file you created for the directive 
      created a renderer with renderer2 in the constructor
        & inject the elementRefrence (in the arguments in the constructor)
      call it in the ngOnInit
        & use renderer function setStyle on the elementReference.nativeElement to change a property (background-color)

## Using HostListener to Listen to Host Events


# Changing Pages with Routing

## Module Introduction
- Angular ships with it's own router which allows you to change the URL in the Url bar & still only use one page bu exchange major parts/lots of parts of that page so it looks like a new page
- just JS changing a lot of parts in your DOM

## Why do we need a Router?
- to be able to display routes the front end application has

## Setting up & Loading Routes
- looking to display one component at a time
- register routes in the app.module.ts
    import { Routes, RouterModule } from "@angular/router";
    const appRoutes: Routes = [
      { path: 'users', component: UsersComponent }
    ];

    - in the imports array add
        RouterModule.forRoot(appRoutes)

- in app.component.html
    <router-outlet></router-outlet> -special directive that marks the place in the document where we want the angular router to load the component of the currently selected route.

## Navigating with Router Links
can but not optimal
- in app.component.html
  add paths to the hrefs
    <a href="/">Home</a>
    <a href="/servers">
    <a href="/users">
actual way to do this
- doesn't restart the app, keeps the app state & faster than reloading
- in app.component.html
  <a routerLink="/">Home</a>
  <a routerLink="/servers">
  <a [routerLink]="['/users']">

## Understanding Navigation Paths
- needs slash infront of path name
  <a routerLink="/servers">Reload Page</a>
      ^ the above is an absolute path
      vs a realtive path without the slash
- a relative path angular always apends the path you specify in the routerLink to the end of your current path
    - current path depends on what component you are currently on
- the root component is not routed through the router, it always sits at localhost:4200/
- using relative paths inside of active components is only good for nested routes
<a routerLink="../servers">
    this will work because ~~it goes back one level (in the directory)~~ it removes the currently loaded segment (so deletes it & reloads /servers again)
- absolute path "/servers"
- relative paths: "servers" or "./servers" add to the current path
- ../ or more than once to say go back ones path & always seen from the currently loaded component

## Styling Active Router Links
- angular gives us the routerLink active directive to style router links
- you can add it to a wrapping element
    <li role="presentation" routerLinkActive=""><a routerLink="/">Home</a></li>
- or to the link itself
    <li role="presentation"><a routerLink="/" routerLinkActive="">Home</a></li>
- attach the class you wish to specify between the quotes like routerLinkActive="active"
- home link is always active because the path is included for all paths
    we fix this by <li role="presentation" routerLinkActive="active"[routerLinkActiveOptions]="{exact: true}">
        - we use property pinding because we arent just passing a string but a JS object ({exact: true}) so we use []
        - exact is a reserved property on this object you passed to routerLinkActive & tells angular only add this routerLinkActive css class if the exact full pass is used (so not / plus but just /)

## Navigating Programmatically
- might want to use if finished some opperation or we want to trigger the navigation for some reason
- we can use a function to route our page somewhere by
    (click)="onLoadServers()" in home.component.html
    - and onLoadServers() {
        this.router.navigate(['/servers']);
      }



