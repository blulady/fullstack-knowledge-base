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

# Using Services & Dependency Injection

## Why would you need services?
- to simplify the app

## Creating a Logging Service
- choose a place (depending on what it does & what it needs access to)
- naming convention name.service.ts
- export a class (just a normal typescript class)
    `export class LoggingService {logStatusChange(status: string) {console.log('A server status changed, new status: ' + status);}}`

- you can do this but this is not how you use a service in angular DONT CREATE MANUALLY
  ig: import into new-account
    import { LoggingService } from '../logging.service';
    const service = new LoggingService();
    service.logStatusChange(accountStatus);

## Injecting the Logging Service into Components
- Hierarchical Injector
- dependecy injector: code our class will depend on 
    - using a hierarchical injector
    `import { LoggingService } from '../logging.service';`
    `providers: [LoggingService]`
    `constructor(private loggingService: LoggingService) {}`
    gives the class access to the service upon
    `this.loggingService.logStatusChange(accountStatus);`
    this calls the service

- better than manual because 'it stays in the angular ecosystem'

## Creating a Data Service *bad example (see next note)
- to keep it from overwriting in the child components we remove it from the providers array when we are injecting the service
- to store & manage data
- in the root app 
  account.service.ts
    `export class AccountsService {accounts = [{name: 'Master Account',status: 'active'}, {name: 'Testaccount', status: 'inactive'},{name: 'Hidden Account',status: 'unknown'}]; addAccount(name: string, status: string) {this.accounts.push({name: name, status: status});} updateStatus(id: number, status: string) {this.accounts[id].status = status;}}`
- in app.component.ts we inject the service & initalize an accounts array (can call them in the html from this file)

    export class AppComponent implements OnInit {
      accounts: {name:string, status: string} [] = [];

      constructor(private accountsService: AccountsService) {
      }

      ngOnInit() {
        this.accounts = this.accountsService.accounts;
      }
    }
- in new-account.component.ts we inject the accountsService
  `export class NewAccountComponent {constructor(private loggingService: LoggingService, private accountsService: AccountsService) {}`
  - we call the addAccount function in onCreateAccount
    `onCreateAccount(accountName: string, accountStatus: string) {this.accountsService.addAccount(accountName, accountStatus);`
- in account-component.ts we inject accountsService to update status through the onSetTo function
    `onSetTo(status: string) {this.accountsService.updateStatus(this.id, status);`

## Understanding the Hierarchical Injector
- The angular dependecy injector is a hierarchical injector if we provide a service, angular will provide an instance of that service for this component & all of it's child components & the child's childs components. It will be the same instance of the service. 
- The highest level is at the AppModule & the same instance of the service is available application wide.
- The next level below AppModule would be the AppComponent, if we provide the service here all of the children will have the same instance
- The lowest level is a single component with no child components. Instance of this service will only be available for this component. It would overwrite if we provided the same service on a higher level

## How Many Instances of Service Should It be?
- depends on if you want to have the same instance or not
- in the bad example we have 3 different instances & the child instances overwrite the instance we get from the app.component
- to keep it from overwriting in the child components we remove it from the providers array
- why does adding it to the providers create a new instance?

## Injecting Services into Services
- moving service to app.module.ts
- to mv to app.module.ts pull the service from the providers in the app.component.ts 
    - & add it to the providers array in app.module.ts
    - this guarantees that the whole app recieves the same instance of the service
- inject a service into another service
  - to inject logging into accountsService we clear the calls to loggin in the child componennts (account & newAccount)
  - then inject the logging service into the account service in the constructor ( & import it)
  - the service needs metadata attached to it => use @Injectable on the class you are looking to inject into (accounting)
        `@Injectable()`
        `export class AccountsService {`
        * don't forget the import `import { Injectable } from '@angular/core';`
- in newer versions of angular it is recommended that you always add @Inectable

## Using Services for Cross-Component Communication
- provide some event which we can trigger one component & listen to in aother
- in accounts.service.ts
    `statusUpdated = new EventEmitter<string>();`
- in account.component.ts
    `onSetTo(status: string) {this.accountsService.statusUpdated.emit(status);`
- in new-account.components.ts
    `{this.accountsService.statusUpdated.subscribe((status: string) => alert('New Status: ' + status));}`
- here we emit an event in account.component.ts & listen for it in new-account.component.ts
- aka cross-component communication through a service with the event emitter 

## services in Angular 6+
- can provide application-wide services in a different way. 
- Instead of adding a service class to the providers[] array in AppModule , you can set the following config in @Injectable()
  `@Injectable({providedIn: 'root'})`
  `export class MyService {`
  same as
  `export class MyService { ... }`
  & in app.module.ts
  `import { MyService } from './path/to/my.service';`
  `providers: [MyService]`
- Services can be loaded lazily This can lead to a better performance and loading speed


# Changing Pages with Routing

## Module Introduction
- Angular ships with it's own router which allows you to change the URL in the Url bar & still only use one page bu exchange major parts/lots of parts of that page so it looks like a new page
- just JS changing a lot of parts in your DOM

## Why do we need a Router?
- to be able to display routes the front end application has

## Setting up & Loading Routes
- looking to display one component at a time
- `{ path: 'users' }` == localhost:4200/users
- register routes in the app.module.ts
    import { Routes, RouterModule } from "@angular/router";
    const appRoutes: Routes = [
      { path: 'users', component: UsersComponent }
    ];

    - in the imports array add
        RouterModule.forRoot(appRoutes)
        - forRoot: allows us to register routes, recieves our appRoutes constant here as an argument 

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

## Using Relative Paths in Programmatic Navigation
- create a button in servers.html 
    <button class="btn btn-primary" (click)="onReload()">Reload Page</button>
- create a function in servers.ts
  - inject a router into the constructor
    constructor(private serversService: ServersService, private router: Router) { }
    onReload() {
      this.router.navigate(['/servers']);
    }
    - this works (vs the routerLink) because it doesn't know what component you are on

    we can pass router.navigate another argument to tell it where were are
      - inject a route into the constructor private route: ActivatedRoute
      this.router.navigate(['servers'], {relativeTo: this.route});

- Activated route injects the currently active routes (the route which loaded this component)

- and now the button is broken lol

## Passing Parameters to Routes
- to be able to access individual users dynamically
  { path: 'users/:id', component: UserComponent }
  - retreve id from path, anthing after the slash & colon would be interpreted as the id
  - the colon indicates the parameter

## Fetching Route Parameters
- we inject the private route into the user.component.ts constructor & we get the currently loaded route 
      - it will give us access to the id passed in the url (selected user)
      - we retrieve the user from the url in ngOnInit() by using the snapshot.params property on the router object
            id: this.route.snapshot.params['id']
            name: this.route.snapshot.params['name']
      - then in user.component.html
        {{ user.id }} {{ user.name }}

## Fetching Route Parameters Reactively
- can hard code a url   
    <a [routerLink]="['/users', 10, 'Anna']">Load Anna</a>
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    - since the link is on the user component, the URL still changes but because we are on the component, angular doesn't reinstantiate it
- for subsequent changes we need a different approach

- paramsSuscribe is an observable (a feature added by a 3rd party package) to work with asynchrous tasks
  - an easy way to subscribe to an event which might happen in the future & execute when it happens
  - recieves 3 arguments (3 functions)
      - fired whenever new data is sent through whenever the params change 
          (params: Params) => {this.user.id = params['id']} // update our user objects id

      this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      )
      `(params: Params)` we get the updated params as an argument, params will always be an object that holds the parameters you defined in route as properties
      `this.user.id = params['id'];` now we update the user object (the user.id should now be params[id])

  - use snapshot for cases where you know your component will be recreated
  - use params to get informed about any changes in your route parameters
       
## An Important Note about Route Observables
- angular cleans up the subscription you set up here whenever this component is destroyed
  - the component gets destroyed but the subscription we created isn't (not coupled closely together)
- might want to implement ngOnDestroy but in order to destroy a thing, you have to make it so
    - we import Subscription
    - create paramsSubscription: Subscription;
    - then attach the property to a value
        this.paramsSubscription = this.route.params
          .subscribe(
            (params: Params) => {
              this.user.id = params['id'];
              this.user.name = params['name'];
            }
    - then destroy the paramsSubscription with OnDestroy (implement like onInit)
        export class UserComponent implements OnInit, OnDestroy {
        
        ngOnDestroy(): void {
          this.paramsSubscription.unsubscribe();
      }
        
## Passing Query Parameters & Fragments
- how to pass info using the routerLink directive & the navigate method
- first we add another path to the routers array in apt.module.ts 
    { path: 'servers/:id/edit', component: ServerComponent },
- then to be able to load this route on my servers component in the servers html add
    [routerLink]="['/servers', 5, 'edit']"
- we can add queryParams which is just another bindable property of the routerLink directive & add key/value pairs of the aprameters you want to edit >> localhost:46191/servers/5/edit?allowedit=1
- add a fragment: fragment="loading" >>/edit?allowedit=1#loading
  onLoadServer(id: number) {
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment:'loading'});
    } >> http://localhost:46191/servers/1/edit?allowEdit=1#loading

    
## Retrieving Query Parameters & Fragments
- we need to inject our activated route into the EditServerComponent Class in edit-server.ts
  `constructor(private serversService: ServersService,
    private route: ActivatedRoute) { }`
- can see query params & fragment by consoling 
  <!-- -// Actually cannot -->
    console.log(this.route.snapshot.queryParams)
    console.log(this.route.snapshot.fragment)

- subscribing will allow you to react to changed query parameters
    this.route.queryParams.subscribe();
    this.route.fragment.subscribe();

## Practicing & Some Common Gotchas?

- here we add [routerLink]="['/users', user.id, user.name]" to users.html
(route has alread been created in the app.module.ts
 {path:'users/:id/:name'})
- here we change the [routerLink]="['/servers', server.id, 'edit']" in servers.html
  need to create the route in app.module.ts
    { path: 'servers/:id', component: ServerComponent },

- getting data that we are passing in the route path from server.ts to the server.html 
  1. inject the ActivatedRoute into the server.ts constructor
  `constructor(private serversService: ServersService, private route: ActivatedRoute) { }`

  2. then in ngOnInit get your ide from this activated route
  `const id = +this.route.snapshot.params['id']; this.server = this.serversService.getServer(id);` 
      - this gotcha is not converting id to a number us + at beging to convert to a number
  
  3. subscribe to params observable to get any changes
  `this.route.params.subscribe((params: Params) => {this.server = this.serversService.getServer(+params['id']))`
      - don't forget to add the + to turn this id into a number as well


  ** will throw error because we are calling the server component on the servers component even if we don't have an id available comment out <!-- <app-server></app-server> --> in servers html

## Setting up Child (Nested) Routes
- const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id/:name', component: UserComponent },
  { path: 'servers', component: ServersComponent },
  { path: 'servers/:id', component: ServerComponent },
  { path: 'servers/:id/edit', component: EditServerComponent },
  ];
  vs setting up nested/child Routes
  { path: 'servers', component: ServersComponent, children: [
    { path: ':id', component: ServerComponent },
    { path: ':id/edit', component: EditServerComponent },
  ] },

- child routes of servers need a separte outlet because should be loaded nested into this servers component
- the original html 
      <div class="col-xs-12 col-sm-4">
        <button class="btn btn-primary" (click)="onReload()">Reload Page</button>
        <app-edit-server></app-edit-server>
        <hr>
        <!-- <app-server></app-server> -->
      </div>
- instead
      <router-outlet></router-outlet>
      this adds a new hook which will be used on all the child routes of the route being loaded on the servers
- the same for users
      { path: 'users', component: UsersComponent, children: [
        { path: ':id/:name', component: UserComponent },
      ] },
  -in users html
      <!-- <app-user></app-user> -->
      <router-outlet></router-outlet>
  - & now it loads the endpoint info next to where we make the selection

## Using Query Parameters
- reaching edit-server component
  - we add a button to access edit 
    <button class="btn btn-primary" (click)="onEdit()">Edit Server</button>
  - create the onEdit function in .ts
    onEdit() {
      this.router.navigate(['edit'], {relativeTo: this.route});
    }
    in the above function we navigate to the edit-server compoment
       - call the navigate method (from the Router class), pass it an array ( edit, to add it to the end of the currently loaded route)
        - we get the currently loaded route by using the realativeTo property on the secondargument & refrerencing `this.route`
        - we need to access the router  
            inject the router into the construction method
            `private router: Router)`
- To control where the user is allowed to update
  - we want to control access based on the server id in the servers component html
    `[queryParams]="{allowedit: server.id === 3 ?'1': '0'}"`
      so only if server ID equals 3, will users be allowed to edit, the above is a ternary expression checkin the server id & if it's not equal to 3 we will set it to zero (the allowEdit parameter to 0)
  - add a allowEdit property on class EditServerComponent in edit-server ts
            `allowEdit = false;`
  - then in edit server we want to be able to retrieve our query params
      this.route.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
        - when ever the queryParams change, get the query params & if they are true/'1' set it equal to true otherwise set it equal to false
  - then we add this to edit-server html
    <h4 *ngIf="!allowEdit">You're not allowed to edit </h4>
    <div *ngIf="allowEdit">
    - this will only show the edit form if `allowedEdit` equals true

## Configuring the Handling of Query Parameters
- passing on the server id query parameter on from the server to the edit-server component
- another property to the JS object we use to configure our navigation 
og :
  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
modified to pass on server id:
  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
   - using preserve, if we add new ones, the old ones would actually overwrite the new ones

merge our old query params with new:
  onEdit() {
      this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'merge'});
    }

## Redirecting & Wildcard Routes
-  404 error handling
- redirect a vistor to a specific page when they try to visit a page we don't have
    - setting up a router which handles all routes
    - redirecting requests
- Redirecting: create a new component called page-not-found
  - in the html template say <h3> Page Not Found </h3>
  - in the app.module.ts add the path
      { path: 'not-found', component: PageNotFoundComponent }
  - then add another new route & use a property to redirect to another path
      { path: 'something', redirectTo: '/not-found' }
  - can use double asterisk route, that is the wildcare route which catches all paths not listed in the routes array
    - needs to be the last one in the array of routes, because once angular hits this route it doesn't look for others

      - `{ path: '**', redirectTo: '/not-found' }`

## Redirection Path Matching
- angular matches path by prefix
- `{ path: '', redirectTo: '/somewhere-else' }`
    - will match `/recipes` & `/`
    - Angular checks if the path you entered in the URL does start with the path specified in the route. Of course every path starts with '' 
- To fix this behavior, you need to change the matching strategy to "full" : 
      `{ path: '', redirectTo: '/somewhere-else', pathMatch: 'full' }`
      - Now, you only get redirected, if the full path is '' (so only if you got NO other content in your path in this example). 

## Outsourcing the Route Configuration
- if you have more than a few routes you create a file for routing called
  app-routing.module.ts
  add the appRoutes array to the file (make sure to add all the imports) 
  add   
      @NgModule({
        imports: [
          RouterModule.forRoot(appRoutes)
        ],
        exports: [RouterModule]
      })

      export class AppRoutingModule {}
- then in app.module.ts import your router in the imports array
    AppRoutingModule,

## An Introduction to Guards
- route guards: basic functionality, logic, code which ise executed before a route or loaded once you want to leave a route
- for example if you only want to give access to your server component/single server component/edit server component only if they are logged in
- use the CanActivateGuard: a feature built into the angular router running code before the component is loaded

## Protecting Routes with canActivate
- add a file to root called auth-guard.service.ts
  in this file import the CanActivate method from Angular router
    - the CanActivate method has two arguments 1, the ActivatedRouteSnapShot & the state of the Router
      `canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)` (will need to be imported from '@angular/router')
    - CanActivate returns either an observable 
      - which will also need to be imported from 'rxjs/Observable'
      - will wrap a boolean `Observable<boolean>` (async)
      or 
      - a Promise also returning a boolean `Promise<boolean>` (async)
      or 
      - a boolean (sync)
- we create a fake service auth.service.ts to login or out by returning a boolean, we use @Injectable (in auth-guard) & put it in the constructor to be able to reach out to our fake service
- then we reach out to check if the fake authService.isAuthenticated() `return this.authService.isAuthenticated()` 
- then if it's true, we return true allowing access
      (authenticated: boolean) => {
          if (authenticated) {
            return true;
- if it's not true we navigate away from the pages we are guarding by going to home '/', using router.navigate method
        `else {this.router.navigate(['/']);`
- have to add canActivate to the pathe you want to apply it to, our paths are currently in app-routing.module.ts
  - can activate taeks an array of all the guards you want to apply to that path/route
      `{ path: 'servers', canActivate: [AuthGuard], component: ServersComponent, children:`
- we also need to go to the app.module.ts & add the two services under providers
      `providers: [ServersService, AuthService,  AuthGuard],`

## Protecting Child (nested) Routes with CanActivateChild
- use CanActivateChild instead by importing it & implementing it `export class AuthGuard implements CanActivate, CanActivateChild`
- need to create a canActivateChild function that takes the same args as CanActivate
    `canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean`
- since it uses the same logic as CanActivate & returns a bool, we just call canActivate passing the route & state as arguments
    `{return this.canActivate(childRoute, state);`
- we added the CanActivateChild interface & can now use a different hook in our router instead
  `{ path: 'servers', canActivateChild: [AuthGuard], component: ServersComponent, children:`
- now we can access server url without being able to access any of it's children

## Using A Fake Auth Service
- add a couple buttons to the home page html
    <button class="btn btn-default" (click)="onLogin()">Login</button>
    <button class="btn btn-default" (click)="onLogout()">Logout</button>
- inject the auth service into the home component
      `constructor(private router: Router, private authService: AuthService) { }`

- add the functions to the HomeComponent class to call the functions from the auth service
      onLogin() {
        this.authService.login();
      }

      onLogout() {
        this.authService.logout();
      }

## Controlling Navigations with CanDeactivate
- want to ask the user if they really want to leave
- edit-server.component.ts
  add a property `changesSaved = false;` which we want to change whenever we click updateServer
  so we add `this.changesSaved = true;` to onUpdateServer()
- after changes are saved we want to navigate away, so we inject the router type into the constructor `private router: Router`
  add `this.router.navigate(['../'], {relativeTo: this.route});` after we save the changes in onUpdateServer, to go up one level to the last loaded server
- now we add the part where we ask if they want to leave by creating a guard in the edit-server file
- create can-deactivate-guard.service.ts & create an interface to export
  - an interface is a contract that can be imported by another class, that forces the class to provide some logic (ig: the canDeactivate function), the interface does provide information about what the function should look like
    `canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean}`
    - the function takes no arguments & returns a boolean
  - then create a class to export `CanDeactivateGuard`& this guard will implment CanDeactivate (an interface provided by the angular router, it is a generic type & will wrap our interface) it will force some component or class to implement the CanDeactivate method (where it is called in this case the EditServerComponent)
  - the CanDeactivate method we put here will be called by angular when we try to navigate away from a path
  `canDeactivate(component: CanComponentDeactivate,`
    - has the component we are currently on as an argument, the compoenent we are currently on needs to be of type CanComponentDeactivate which means it needs to be a compoenent that has this interface implemented & a canDeactivate method
  `currentRoute: ActivatedRouteSnapshot,`
    - recieve the current route as an argument
  `currentState: RouterStateSnapshot,`
    - recieve the current state of a route
  `nextState?: RouterStateSnapshot`
    - where we will want to go, will be called at the end when we try to leave ? == optional arg
  `return component.canDeactivate();`
    - call canDeactivate on the component we are currently on
    - this is why we need to implement this interface in this component, why we created an interface in the first place 
     ====> now angular router can execute canDeactivate in our service & can rely on the fact that the component we are currently on has canDeactivate function, the connection between guard & compoenent 

- in app-routing.module.ts
  add the guard to the path/route `{ path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] },`
- in app.module.ts add the guard to the providers array `providers: [ServersService, AuthService,  AuthGuard, CanDeactivateGuard]`
- in edit-server.component.ts
  - CanDeactivateGuard will call CanDeactivate in our component but for it to work on the edit-server.component we need to implement our CanComponentDeactivate interface in edit-server.component.ts
  `export class EditServerComponent implements OnInit, CanComponentDeactivate {`
  - add the function to the EditServerComponent Class & the logic required to decide weather we can leave or not, this logic will be run whenever the CanDeactivateGuard is checked by the angular router 
      
      canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
        if (!this.allowEdit) {
          return true;
        }
        if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
          return confirm("Do you want to discard the changes?");
        } else {
          return true
        }
      }
      - the above function will return an Observable boolean, a Promise boolean or just a regular boolean
        1. we check to see if we are allowed to edit this server because if we aren't, we are allowed to leave `if (!this.allowEdit) { return true`
        2. otherwise will check if the server name/status here is unlike the one we had at the beginning (changed) and the changes were not saved, return a confirm dialog
        2. else return true because either nothing was changed or we saved the changes


      - the interface in can-deactivate-guard.service.ts forces us to implement the canDeactivate method in our component

## Passing Static Data to a Route
- create a new component, the error page component
- in the html add `{{ errorMessage }}`
- add it to app.module.ts
- in the app-routing.module.ts create a path
  `{ path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },`
  here we use the data property to pass an object here, with the key message & value 'page not found'
  - this makes the code reusable & we can display different errors
- we are going to retrieve that whenever we load our error page component so in error-page so in error-page.component.ts create property 
    - `errorMessage: string;`
- inject the activated route into the constructor
    - `constructor(private route: ActivatedRoute){}`
- can assign it either by using the snapshot of this route & data to access message
    - `ngOnInit() {this.errorMessage = this.route.snapshot.data['message']}`
- or if it might change while you are stil on this page you'll want to subscribe
    - `ngOnInit() {this.route.data.subscribe((data: Data) => {this.errorMessage = data['message'];})}`

## Resolving Dynamic Data with the Resolve Guard
- we have some dynamic data we have to fetch before a route can be displayed or can be rendered
- resolver allows us to run some code before a route is rendered, fetch data before code is run
- add a new file server-resolver.server
  - resolve ( from @angular/router) is a generic type that wraps the data/item it will fetch in the end, which will be a server & we don't import the server object but the object we define looks the same
        `export class ServerResolver implements Resolve<{id: number, name:string, status:string}>`
  - resolve interface requires us to implement the resolve method, it takes two arguments the route & the state snapshot
        `resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)`
  - returns an Observable that is a server (here he creates the server interface to not have to type everything out), or a promise that resoves to a server or just a server
    `resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Server> | Promise<Server> | Server {`
  - inject server by adding @Injectable to the class & `constructor(private serversService: ServersService) {}`

  - here we reachout to servers & call the getServer function which needs the id of the server so we call route.params to get the id & use + to turn it to a number
  `return this.serversService.getServer(+route.params['id']);`
- then we have to add it to app.module.ts providers
`providers: [ServersService, AuthService,  AuthGuard, CanDeactivateGuard, ServerResolver],`
- then add it to the route it's going to be used on, we add the resolve property & then we map the resolvers using
`{ path: ':id', component: ServerComponent, resolve: {server: ServerResolver} }`
- we can then comment out the ngOnInit code and get our server by binding the data observable, we will now get back our data of type Data, can then assign our server to this.server 
`this.route.data.subscribe((data: Data) =>{this.server = data['server']});`

## Understanding Location Strategies
- the server hosting your angular single page application hast to be configured so that in the case of a 404 erro it returns the index.html file because
      - all urls are parsed by the server first (not angular)
      - if you can't fall back to using the hash sign
og:
  `@NgModule({ imports: [RouterModule.forRoot(appRoutes)`
- enable it in your app-routing.module.ts by adding
  `RouterModule.forRoot(appRoutes, {useHash: true})`
- the hashtag informs your webserver to only care about the part in the url before the hash
       `http://localhost:4200/#/users`
- this will run even on servers which don't return the index.html file in case of 404 errors
- everything after will be parsed by the client, by angular
- a good fall back if you can't get HTML history mode to work


# Course Project - Routing
## Planning the general structure
- the @NgModule() decorator turns the class into an angular module
- create the file app-routing.module.ts *add path & other contents
- register the app-routing module with app.module.ts by adding `AppRoutingModule` to array of imports
- in app.component.html render the routes by
    - getting rid of <app-recipe-book *ngIf="loadedFeature === 'recipe'"></app-recipe-book>
                    <app-shopping-list *ngIf="loadedFeature !== 'recipe'"></app-shopping-list>
    - replace the above <router-outlet></router-outlet>
    - have to add pathMatch to the empty path`{path: '', redirectTo: '/recipes', pathMatch: 'full'}`
    - need links

## Adding Navigation to the App 
- replace
<li><a href="#" (click)="onSelect('recipe')">Recipes</a></li>
<li><a href="#" (click)="onSelect('shopping-list')">Shopping List</a></li>

- with links
<li><a routerLink="/recipe-book">Recipes</a></li>
<li><a routerLink="/shopping-list">Shopping List</a></li>

- delete the onSelect() function
- remove the eventEmitter & Output
 ` @Output() featureSelected = new EventEmitter<string>();`

## Marking Active Routes
- mark what link you are on with <li routerLinkActive="active">
<li routerLinkActive="active"><a routerLink="/recipe-book">Recipes</a></li>
<li routerLinkActive="active"><a routerLink="/shopping-list">Shopping List</a></li>

## Fixing Page Reload Issues
- eeeee wan't working in the first place

## Child Routes:
- do it yourself
## Adding Child Routing Together
- we create a new component to have the recipes start with
- in html <h3>Please select a Recipe!!</h3>
- add the path to recipe-book children array `{path: 'shopping-list', component: ShoppingListComponent}`
- because the recipe-book component is where the child routes are registered, call router outlet in recipe-book html
- getting rid of 
    <app-recipe-detail
    *ngIf="selectedRecipe; else infoText"
    [recipe]="selectedRecipe" ></app-recipe-detail>
    <ng-template #infoText>
      <p>Please select a Recipe</p>
  & adding <router-outlet></router-outlet>
- add `{path: ':id', component: RecipeDetailComponent}` to the children array

## Configuring Route Parameters
- we pass the id in the route which is a dynamic parameter, should be able to load a recipe by th Id (position in the array)
- get id from the router (this will only work for the first time we load detail - not what we want to use here)
    - inject ActivatedRoute into constructor
      `private route: ActivatedRoute`
    - bind id to the ide from the activated route
      `const id = this.route.snapshot.params['id']`
- use route & params observable & subscribe to that observable
  `this.route.params.subscribe((params: Params) => {this.id = +params['id'];});` * import Params from @angular/router
  - store id as a property `id: number;`
  - to do this we need to load our recipe from recipe service
    - we a a function to get a single recipe from our recipe service
      `getRecipe(index:number) {return this.recipes[index];}`
    - we fetch the recipe when ever the id changes, then call .getRecipe & pass this.id
    `this.recipe = this.recipeService.getRecipe(this.id)});`

## Passing DYnamic Parameters to Links
- because we have a dynamic segment in the path (id) so this is where you bind router link, to pass the array & configure the segments in the path
  - here all we need is the id in recipe-item.component.html
    `[routerLink]="[index]"`
  - to get the id, have to pass extra information to the recipe-item component
- in recipe-item.component.ts add
    `@Input() index: number;` now we can pass in the index of this item from the recipe-list
- in recipe-list.component.html add
    *ngFor="let recipeElement of recipes; let i = index"
     [recipe]="recipeElement"
     [index]="i"
  to
    *ngFor="let recipeElement of recipes"
     [recipe]="recipeElement"

## Styling Active Recipe Items
- add routerLinkActive="active"
  to
  <a style="cursor: pointer;"
  [routerLink]="[index]"
  routerLinkActive="active"
  class="list-group-item clearfix">

## Adding Editing Routes
- create a new component called recipe-edit inside recipe-book
    ng g c recipe-book/recipe-edit
- register two new routing paths in app-routing.module.ts
    `{path: 'new', component: RecipeEditComponent}` *make sure this path comes before `:id` or it will error because there is no recipe with the id new
    `{path: ':id/edit', component: RecipeEditComponent}`

## Retrieving Route Parameters
- to retrieve the id & determin if we are in edit mode:
  - in recipe-edit
    create a property `id: number;`
    retrieve the id (dynamically in NgOnInit), use the route & subscribe to the params observable, we store the id in the id property
    `this.route.params.subscribe((params: Params) => {this.id = +params['id'];} )`
    create property `editMode = false;` * initally assume we are creating a new recipe
    check edit mode whenever the parameters change 
      `this.editMode = params['id'] != null;` * if there is an id, we are in editing mode otherwise, it is a new recipe

## Programmatic Navigation to the Edit Page
- recipe-list.component.html `(click)="onNewRecipe()"`
- recipe-list.component.ts
  inject router into the constructor method `private router: Router` & `private route: ActivatedRoute`
  use the router to use the navigate method to target the path, we're going to use our current path so we also need to inform the router of that
  `onNewRecipe() {this.router.navigate(['new'], {relativeTo: this.route})`
EditRecipe
  in recipe-detail html `(click)="OnEditRecipe()"`
  in recipe-detail ts will need acces to the router `private router: Router`
  then we will navigate to the current id & then edit
    `this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);`
  or
    `this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});` we go back a level, grab the id & add edit on to the end

## One Note about Route Observables
- when using your own observables you will need to "clean up" your functions

# Handling Forms in Angular Apps


## Module Introduction
  - because it is a single page application you don't submit the form to the server but handle it through angular
  - to submit something to the server you need to reach out via Angular's HTTP service to that server
  Angular will let you 
    - allow you to get the values a user entered
    - checks for validity 
    - conditionally change the way the form is displayed (red borders around invalid controls)

## Angular & Forms
    - angular gives you a JS object representation of your form
      makes it easier to 
        - retrieve user valuse & sto see the stat of the form & work with it

## Template Driven (TD) vs Reactive approach
    - angular offers two approaches
    - Template: put the form in the template in HTmL & angular will infer the structure of your form 
        - what forms
        - what inputs
        - easy to get started
    - Reactive approach you define the structure of the form in TS, & HTML & you manually connect the two
        - complex
        - greater control
# Starting with template

## An Example Form
- There is no action on the <form> tag pointing to a route, not specicying the method attribute which would be post, this form should not get submitted to a server, angular handles it

## TD Creating the Form & Registering the Controls
- to register the form
    - in app.module.ts
      `import { FormsModule } from '@angular/forms';`
    - add it to your imports array
    imports: [
      BrowserModule,
      FormsModule,
    ]
- Angular will automatically create a form for you ( a JS represenation of the form) when it detects a form element in HTML code
-form element serving as a selector for "some Angular directive" to create that JS representation of the form
- Angular will not automatically detect inputs in this form 
- to tell angular to use an input add ngModel & name=""to the end of the tag
    - ngModel is a directive made availabel in the forms module
- select is another type of HTML input so you can add ngModel & name to the end there

## TD: Submitting & Using the Form
- Make the form submitable by 
    - adding an onSubmit function to the ts file
    - calling that function from the html
      by adding ngSubmit directive a JS event is made available whenever the form is submitted
      `<form (ngSubmit)="onSubmit()">`
    - can add a local reference to HTML elements & set it equal to ngForm to gain access to form attributes
      `<form (ngSubmit)="onSubmit()" #f="ngForm">`
    - can pass f as an argument to the onSubmit method & print it
      `import { NgForm } from '@angular/forms';`
      `<form (ngSubmit)="onSubmit(f)" #f="ngForm">`
      `onSubmit(form: NgForm) {console.log(form);}`

## TD: Understanding Form State
- dirty = changed the field
- touched = clicked the field

## TD: Accessing the Form with @ViewChild
- @ViewChild allows us to access a local ref
- in .ts
  `export class AppComponent {}`
    `@ViewChild`
  & then to gain access to the element which has the local reference f on it:
    html: 
    <form (ngSubmit)="onSubmit()" #f="ngForm">
    ts:
    `@ViewChild('f') signupForm: NgForm;`
    `onSubmit() { console.log(this.signupForm);}`

## TD: Adding Validation to check User Input
- Always validate in put on the server 
- validate input at the frontend to enhance user experience
- to validate that none of the fields are empty & there is a valid e-mail address
- in template driven approach, can only add validators to template
- add `required` to the input (required is a default HTML attribute) Angular will detect it so it acts a selecter for a built-in directive & automatically configure the form to treat it as invalid if there is no input 
    <input type="text" id="username" class="form-control" ngModel name="username" required>
- add `email` to varify email fields (its a directive )
    <input type="text" id="username" class="form-control" ngModel name="username" required email>
- you can check the forms validity in console under valid.
- ng in front of a class indicatest that it is added by angular
- in this case the classes are added dynamically

## Built-in Validators & Using HTML5 Validation
- https://angular.io/api/forms/Validators  all built-in validators
- for template-driven approach, you need the directives
- search the directives here https://angular.io/api?type=directive by using the term validator in the search field
- Angular disables HTML% validation can enable by adding the ngNativeValidate to a control in your template. 

## TD: Using the Form State
- angular tracks the state of each control of the form & conditionally adds ng CSS classes
- we can use the css classes to add a red border to invlaid input fields in the .css file
    `input.ng-invalid.ng-touched {border: 1px solid red;}`
- we have access to the form through the f local refrence `#f="ngForm"`
- to bind the disabled property (which will set the disable state of the button depending on a condition, the condition in this case)
    <button class="btn btn-primary" type="submit" [disabled]="!f.valid">Submit</button>

## TD: Outputting Validation Error Messages
- use Bootstrap class for appropriate styling
    <input type="email" id="email" class="form-control" ngModel name="email" required email> <span class="help-block">Enter valid email</span>
- to gain access to the control created by Angular automatically by adding a local reference `#email="ngModel"`to the input element (since we added ngModel to the input) 
    <input type="email" id="email" class="form-control" ngModel name="email" required email #email="ngModel">
- the ngModel directive exposes info about the control it creates for us that we can access with the local reference `#email` so we can check if it is valid
    <span class="help-block" *ngIf="!email.valid && email.touched">

## TD: Set Default Values with ngModel Property Binding
- to set defualt values use property binding
- to bind it to a value we add brackets
    <div class="form-group">
<label for="secret">Secret Questions</label>
<select id="secret"
  class="form-control"
  [ngModel]="defaultQuestion"
  name="secret">

- can hard code a value or set up a property in the .ts file to put bwtn quotes
    - in the ts file `defaultQuestion = 'pet';`
    because in the html file we have <option value="pet">Your first Pet?</option>

## TD: Using ngModel with Two-Way-Binding
- we create a form, we add ngModel to get access to what ever the user entered as a reply
    <textarea name="questionAnswer" rows="3" class="form-control" [(ngModel)]="answer" ></textarea>
- to instantly repeat this reply 
    in the ts file we create the property
      `answer = '';`
    in the html file we use it by 
      `<p>Your reply: {{ answer }}</p>`

## TD: Grouping Form Controls
- if we want to group infomation we get back from the form add (becaues our form is big or we wanted the status of individual groups of inputs) just add to the div that includes the info you want grouped
  `ngModelGroup="groupName"` in the html file at the desired div
  - will change the set up in controls, we now have a groupName with all the properties you have on controls like valid & touched
  - can check the validity of this new control (get access to the JS representation) by adding a local reference to the element which holds the ngModelGroup directive
  `#groupName="ngModelGroup"` ig <div id="user-data" ngModelGroup="userData" #userData="ngModelGroup">
 - can output an error if the group is invalid `<p *ngIf="!userData.valid && userData.touched">User Data is invalid</p>`


 ## TD: Handling Radio Buttons
 - add a property that is a list of your radio butoon options to the component ts file ig:
    `genders = ['male', 'female'];`
 - now we output the options in the html file
    `<div class="radio" *ngFor="let gender of genders">`
 - have to loop through the options
    `<label>
            <input
            type="radio"
            name="gender"
            ngModel [value]="gender"
            required>
            {{ gender }}
          </label>`
 - set a default button by using one way binding

## TD: Setting & Patching Form Values
- we have access to the signupForm through @ViewChild
- Setting form Values with setValue method;
      this.signupForm.setValue({
        userData: {
          username: suggestedName,
          email: ''
        },
        secret: 'pet',
        questionAnswer: '',
        gender: 'male'
      })
  - here we pass a JS object exactly matching our form
- Patching form Values with patchValue
    `this.signupForm.form.patchValue({userData: {username : suggestedName}})`
    here we access the form object on the signupForm, where we have the patch method to override only specific values

## TD Using Form Data
 - we create an area to output our form data in html
      <div class="row" *ngIf="submitted">
      <div class="col-xs-12">
        <h3>Your Data</h3>
        <p>Username: {{user.username}} </p>
        <p>Mail: {{user.email}} </p>
        <p>Secret Question: Your first {{user.secretQuestion}}</p>
        <p>Answer: {{user.answer}}</p>
        <p>Gender: {{user.gender}} </p>
      </div>
- we create a submitted property set to false & then use the *ngIf statement to determine if the information is available for output
- add a new user property that we set to the form values that we update in the onSubmit function
      user = {
        username: '',
        email: '',
        secretQuestion: '',
        answer: '',
        gender: ''
      }
        onSubmit() {
          this.submitted = true;
          this.user.username = this.signupForm.value.userData.username;
          this.user.email = this.signupForm.value.userData.email;
          this.user.secretQuestion = this.signupForm.value.secret;
          this.user.answer = this.signupForm.value.questionAnswer;
          this.user.gender = this.signupForm.value.gender;
        }

## TD: Resetting Forms
- add `this.signupForm.reset();` to the submit function
- on our form (signupForm that we fetched with ViewChild) we just call the reset method. Will reset state like valid, touched, & dirty
- can passs in the same object as in setValue() to reset() which will then reset the form to specific values
        this.signupForm.reset({userData: {
          username: 'sarah',
          email: 'myemail@email.com',},
          secret: 'pet',
          questionAnswer: 'sex',
          gender: 'female'
        });

## Assignment: Template-Driven Forms
- create the html using form, labels & inputs
- make sure the FormsModule is in the imports array in the app.module.ts
- add ngModel to the controls/inputs * ngForm to the form
- add local references to the div `#email`
- add a subscriptions array in the ts file `subscriptions = ['Basic', 'Advanced', 'Pro']` & then an corrisponding *ngFor loop in the html
  `<options *ngFor="let subscription of subscriptions"> `
  & use property binding to 
  `[value]="subscription"> {{ subscription }}</option>`
  set a default value by adding a property in the .ts file
  `selectedSubscription = 'Advanced'`
  then add binding one way by putting brackets around the ngModel in the select div
  `[ngModel]='selectedSubscripton' `
- Add help blocks by adding *ngIf statments to the divs, verifying the that the inputs are valid by checking the local references we added earlier
  `*ngIf='!email.valid && email.touched'`

## Introduction to the Reactive Approach
## Reactive Setup
- form created programatically in TypeScript
- add `ReactiveFormsModule` to the import array in app.module.ts
- create a property in the app.component.ts class to hold your form
  `signupForm: FormGroup;` import FormGroup from angular/forms
  - a form is just a group of controls

## Reactive: Creating a Form in Code
- in ts file we are going to define our new control group in the ngOnInit method
    - use method because it's a lot of code, & want it to initalize before rendering the template
- we define our signupForm as a new form group & that form group is made of controls
- controls are basically key-value pairs we pass to the overall form group, we let angular know these are controls by defining them as new form controls
        ngOnInit(): void {
          this.signupForm = new FormGroup({
            'username': new FormControl(null),
            'email': new FormControl(null),
            'gender': new FormControl('female')
          });
- FormControl constructor takes 3 arguments
  1. the inital state/value of the control (where default value would go as a string)
  2. a single validator or an array of validators to apply to this control
  3. potential asynchronus validators

## Reactive: Syncing HTML and Form
- the actual form lives in the HTML input, need to sync our HTML inputs & ts form
- if we don't add directives, angular will pick up that we have a form & creates a form for us which we don't want because we already made one
- add directives to overwrite default behavior
  1. to form div add the formGroup directive & connect it to our form we created in the ts file `<form [formGroup]="signupForm">`
  2. to tell angluar which controls should be connected we use the formControlName directive, in the input div we define the name `formControlName="username"`
    A. we can use property binding by wrapping form control in brackets & wrapping username in single quotes `[formControlName]="'username'"` but y?
  3. Radio inputs work the same as other inputs `[value]="gender">{{ gender }}`, here we property bind our html value to the gender variable we defined in our ts file

## Reactive: Submiting the Form
- use the ngSubmit directive on the form element because we still want to react to this default submit event which is fired by Html & JS `<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">`
- then create the method in the corrisponding ts file
- we can access the object we created under FormGroup.value

## Reactive: Adding Validation
- in the template driven approach we would add the validators to the template
- in the reactive approach you configure the form in the ts file not the html template
- in reactive approach you are only syncing the ts file with the template
- when creating the new FormControl key-value pairs, you pass the validators in as argument or an array of arguments 
  `'username': new FormControl(null, Validators.required),`
  `'email': new FormControl(null, [Validators.required, Validators.email])`
- don't call it on init (add parentheses after), instead we pass the reference to the method so angular will execute the method whenever it detects that the input of the FormControl changed

## Reactive: Getting Access to Controls
- use the form status to display messages
- in template driven approach we would place a local reference `#username="ngModel"` but because it is the reactive approach it's not register via NgModel
`<span *ngIf="!signupForm.get('username').valid && signupForm.get('username').touched"
            class="help-block">Please enter a valid username!</span>`
  - we can get access to the username key value pair through our ts signupForm by using the get method & pass in either the name or the path name
  - the css classes are also still added so you can `input.ng-invalid.ng-touched{border: 1px solid red;}` to the css & access ng-invalid, ng-touched

## Reactive: Grouping Controls
- we put our userdata into a userdata group
    this.signupForm = new FormGroup({
        'userData': new FormGroup({
          'username': new FormControl(null, Validators.required),
          'email': new FormControl(null, [Validators.required, Validators.email]),
        }),
        'gender': new FormControl('female')
      });
- so we have to restructure our html & put userName & userEmail inside a new div with a formGroupName called user data, wraping them both `<div formGroupName="userData">` and then change the get path to include userData `signupForm.get('userData.username')` in `<span *ngIf="!signupForm.get('userData.username').valid && signupForm.get('userData.username').touched" class="help-block">Please enter a valid username!</span>`
- you separate objects by using `.`

## Reactive: Arrays of Form Controls(FormArray)
- give the array it's own div
- we are going to dynamically add a control to the form (technically add this control to an array of controls) we add a click listener to the button `<button class="btn btn-default" type="button" (click)="onAddHobby()">Add Hobby</button>` 
- we create a new type of control & add it to the overall form `'gender': new FormControl('female'), 'hobbies': new FormArray([])`
- we use the FormArray so that the user can add as many as they like, it holds an array of controls
- when we click on Add Hobby we want to a new hobby to the array `(<FormArray>this.signupForm.get('hobbies')).push(control)` 
- will have to specifically type cast so need `<FormArray>`
- need the outer parentheses to tell angular to treat everything inside the parentheses
as a form array
- but we also have to create the control that is going to be added
  `const control = new FormControl(null, Validators.required);`
- then have to sync the ts with the html by defining the formArrayName as hobbies on the div we created
  `<div formArrayName="hobbies">`
- on the FormGroup we add an ngFor loop to loop through all the hobby controls & need to extract the index of the current iteration,  
  `*ngFor="let hobbyControl of getControls(); let i = index">`
- will need to assign this input to one of these dynamically created controls so that on this import we can add the form-controls CSS class & add formControlName to sync the input with the dynamically created input, the input name will be the index in the array
  `<input type="text" class="form-control" [formControlName]="i">`
  - we use property binding because we are not passing a string but a local variable "i" to pass this index 

## Reactive: Creating Custom Validators
- let's say we have a username we don't want the user to use
- add a property to the class `forbiddenUsernames = ["Chris", "Anna"];`
- a validator is just a function that Angular executes automatically when it checks the validity of the FormControl (whenever you change that control)
- then add a forbiddenNames function that takes a control argument to check & a validator needs to return some for Angular be able to handle the return value correctly
  `forbiddenNames(control: FormControl): {[s: string]: boolean}`
  - the `{[s:string]: boolean}`is a key which can be a string paired with a boolean that let's typescript know if that string is in forbiddenUsernames
  - `if (this.forbiddenUsernames.indexOf(control.value) !== -1)`
  indexOf searches the string (control.value we pass in) & returns the index of the first occurrence of the specified substring or a -1 if there is nothing
  - and then return `return {'nameIsForbidden': true}` if the value returned is not -1 and nothing if it is
- to add the validator `'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)])`
  - will need to bind this with the bind method because angular is calling the method from outside the class when it checks the validity 

## Reactive: Using Error Codes
- To see the errors FormGroup.userData.controls.username.errors (this is where angular adds the error code for the control/field (the individual controls on the errors object))
- The error codes can be used to see the right error messages
- `<span *ngIf="signupForm.get('userData.username').errors['nameIsForbidden']">This name is invalid</span>`
    - here we add another span with an ngIf so it only show's up if the error contains 'nameIsForbidden'
- <span *ngIf="signupForm.get('userData.username').errors['required']">This field is required!</span>
    - here we add another span with an ngIf so it only show's up if the error contains required

## Creating a Custom Async Validator
- might need to reachout to the web server to get information to validate
- so we need async validators
- create a function just like the other validator function but instead it returns a Promise or an Observable, like async functions do
  `forbiddenEmails(control: FormControl): Promise<any> | Observable<any>`
- create a promise in the validator 
   `const promise = new Promise<any>((resolve, reject) =>`
   - and like all promises it receives a function with resolve & reject as arguments we can execute in that function
- set a timeout in the function that returns a response after 1 & a half seconds & the function that gets executed after the timeout
  `setTimeout(() => {if (control.value === 'test@test.com') {resolve({'emailIsForbidden': true});} else {resolve(null);}}, 1500)`
  - the anonymous function that gets executed after the timeout
  `{if (control.value === 'test@test.com') {resolve({'emailIsForbidden': true});} else {resolve(null);}}`
  - we check if control value equals test@test.com (the forbidden email), if that is the case validation fails & the function returns `{resolve({'emailIsForbidden': true}` otherwise it returns `null` 
  - in the end return the promise ` return promise;`
- Now we add the validator forbiddenEmails to the formGroup in the third argument slot that's designated for async functions `'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),`

## Reactive: Reacting to Status or Value Changes
- you can track form state in general by either valueChanges or statusChanges
- value/statusChanges is on the signupForm & each control of this form, these are the two observables you can listen to
        this.signupForm.valueChanges.subscribe(
                (value) => console.log(value)
              )
        this.signupForm.statusChanges.subscribe(
                (status) => console.log(status)
              )

## Reactive: Setting and Patching Values
- you could use this to add default values to the whole form
        this.signupForm.setValue({
            'userData': {
              'username': 'Max',
              'email': 'max@test.com'
            },
            'gender': 'male',
            'hobbies': []
          });

- you could use this to add a single default value
        this.signupForm.patchValue({
            'userData': {
              'username': 'Anna',
            }}
- reset form by adding this.signupForm.reset() to onSubmit

## Assignment: Reactive Form

# Forms
 - go over allowing the selection of items in the list & loading the shopping list items into the form
## Intro
- using the template driven form

## TD: Adding the shopping List form

# Using Pipes To Transform Output

## Introduction & Why Pipes are Useful
- feature built into angular 2 which allows you to transform output in your template
- different pipes for different types of data & for sync & async data
- ig: username = 'max' want it in uppercase output it with the uppercase pipe     <p> {{username | uppercase }} </p>

## Using Pipes
- use it in the html file, it only changes output
- does not change property value, instance types
- `{{ server.instanceType | uppercase }}` changes output to uppercase
- `{{ server.started | date }}` changes format of dates

## Parametrizing Pipes
- to configure a pipe you pass a parameter to it by adding a colon
- for the date pipe `date:'fullDate'`
- for mulitple parameters add another colon `date:'fullDate':` *date doesn't take a second parameter

## Where to learn more about Pipes
- angular.io/api & then search for pipe

## Chaining Multiple Pipes
- what if you want your fomated date in upper case:
- `{{ server.started | date:'fullDate' | uppercase }}`
- order can be important, will be parsed left to right
- if we do it the other way we get an error, because uppercase gets a date instead of a string & doesn't know what to do with that

## Creating a Custom Pipe
- create a file (shorten.pipe.ts)
- needs a decorator `@Pipe({name: 'shorten'})`
- needs on special method to be usable `PipeTransform` (will need to be imported from `"@angular/core"`)
- transform needs to recieve the argument that needs to get transformed
- transform always needs to return something (output)
- to use the pipe we go to app.module.ts add the pipe to the declarations (& import it)
        `declarations: [AppComponent, ShortenPipe,],`
- now we can add the pipe in html

## Parameterizing a Custom Pipe
- we add a limit value to our ShortenPipe
    export class ShortenPipe implements PipeTransform {
    transform(value: any, limit: number) {
          if (value.length > limit) {
            return value.substr(0, limit) + '...';
          }
          return value;
        }
      }
- call it in html by 
      <strong>{{ server.name | shorten:5}}</strong>

## Example: Creating a Filter Pipe
- allowing the user to filter the servers 
- we add <input type="text"
- we are using two way data binding 
    - we add <input type="text" [(ngModel)]="filteredStatus">
    - we have to set up the new property in the ts file
          filteredStatus = ''
- we are going to build a pipe to filter the view
- we can use the commandline to generate a pipe
    `ng generate pipe` or `ng g p`
  - will generate
    `transform(value: unknown, ...args: unknown[]): unknown {return null;}`
- adding an argument (the string the user will be filtering by)
  `transform(value: unknown, filterString: string)`
- first will check to see if there is anything to display
  (had to change value type to any for the following)
  `if (value.length === 0) {return value;}`
- pass the to be filtered property here as the second argument
    `transform(value: any, filterString: string, propertyName: string)`
- here we check to see if the propertyName is equal to the string the user enters
    `for (const item of value) {if (item[propertyName] === filterString) {}`
- add an array & push the items to the array if the propertyName equals the filter string
        const resultArray = [];
        for (const item of value) {
          if (item[propertyName] === filterString) {
            resultArray.push();
          }
        }
        return resultArray;
- can add a pipe to an ngFor loop to change output
    `*ngFor="let server of servers | filterPipe"`
- pass the property that holds the string from the user
    from user: `<input type="text" [(ngModel)]="filteredStatus">`
    passing that property to the filterpipe `*ngFor="let server of servers | filterPipe: filteredStatus"`
- pass in status because we want to filter on the status property
  `*ngFor="let server of servers | filterPipe: filteredStatus:'status'"`
- to make it so we need to enter a value before it will filter add
    `|| filterString == '')` so that it will return the original value
  `if (value.length === 0 || filterString == '') {return value;}`

## Pure & Impure Pipes (or:How to "fix" the Filter Pipe)
- we add functionality to enable users to add a server
  - in html
  `<button class="btn btn-primary" (click)="onAddServer()">Add Server</button>`
  - in ts add
    `  onAddServer() {this.servers.push({instanceType: 'small', name: 'New Server',status: 'stable', started: new Date(15,1,2017)});}`
- but we won't see this new server added to our filtered data when we use the filter because angular is not rerunning our pipe on the data whenever the data changes but changing/adding the input of the pipe will trigger a recalculation (will reapply the pipe to the data again) but updating the data (Arrays or Objects) doesn't trigger it
- if you want to enforce it being updated even if you are in filter mode by adding a second property to the pipe `pure: false`

    `@Pipe({`
      `name: 'filterPipe'`
      `pure: false`

- the above change will make sure that whenever we change data on the page the pipe will be reacalculated 
- impure data pipe updates with every change

## Understanding the "async" Pipe
- async pipe recognizes a promise object (also works with observables) & after the given amount of time will recognize that the promise resolved or the data was sent through the subscription 

- create a property and set it equal to a promise
      appStatus = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('stable')
        },2000)
      });
  - the above promise resolves or reject & in the promise of the callback function, sets up a timeout that lasts 2 seconds, after that it sets the appStatus to stable
- you call it in the html by
      <h2>App Status: {{ appStatus | async }}</h2>






# Making Http Requests

## How does angular interact with Backends?
- generate data in the app & want to store the data in a database
- fetch data when app restarts, user revisits
- don't connect angular directly to the db bc everyone can inspect your js code that is running in the browser
- no store credentials
- send http requests & get http responses to/from a server
- a server is defined as an api (rest or graphql)
- when you visit urls getting back data mostly (not HTML) in the json format 
- can communicate with the APIs & on that server, you can have code that interacts w/db to store & fetch data

## The Anatomy of an Http Request
- the url (API endpoint ig `/posts/1`)
- the HTTP verb (put, post, get)
- headers (metadata ig: default headers appeneded to request for you by the browser or/and angular or append your own headers)
- body (core data to update the db on post put & patch requests)

## Backend (Firebase)
- a whole back-end solution that gives a REST API
- go to firebase.com
- go to console
- create project
- default settings
- continue
once it loads
- go to build
- go to Realtime Database
- create database
- start in testmode
- can already send requests to the url they give us

## Sending a POST Request
- in app.module.ts
      `import { HttpClientModule } from '@angular/common/http'; `
      & add HttpClientModule to imports

- in app.component.ts
  `constructor(private http: HttpClient) {}`
  in the onCreatePost add
    `this.http.post` this takes 3 arguments 
        1. the url we want to send the request to `https://ng-complete-guide-8c897-default-rtdb.firebaseio.com/` & we add the folder we want to send it to `https://ng-complete-guide-8c897-default-rtdb.firebaseio.com/post.json`
        2. the request body, in this case the postData object that we pass into the function, angular will turn it into json data for us

- angular doesn't send the request if no one is subscribed to the observable
`this.http.post('https://ng-complete-guide-8c897-default-rtdb.firebaseio.com/posts.json', postData).subscribe(responseData => {console.log(responseData);`

## GETting Data
- get requests has no body because you are requesting data, not posting it
- dp meed tp subscripe, no subscription no request
    `this.http.get('https://ng-complete-guide-8c897-default-rtdb.firebaseio.com/posts.json').subscribe(posts => {console.log(posts);})`

- add fetchPosts function to ngOnInit so that whenever the app loads it will fcall the function
    `this.fetchPosts();`

## Using RxJS Operators to Transform Response Data
- good practice to use observable operators 
- call pipe to funnle the observable data through multiple operators before it reaches the subscribe method
- the map operator allows us to get some data & return new data re-wrapped into an observable  so we can subscribe to it, map takes another function as an argument 
    - a function that will get our response data & should now return the converted response data 
        - will return an array of posts vs the object
        - have to loop through all the keys to create the array
        - we close the object in curly braces because now you can add one new key-value pair to the object (`id, key`)
        - the id field stores the key which is that cryptic string/unique ID generated by Firebase
        - good practice to check if response data has key as its own property so that youre not trying to access that property 

## Using Types with HttpClient
-  assign a type to ResponseData
    `.pipe(map((responseData: { [key: string]: Post}) => {`
- assing a type to the postsArray
    `const postsArray: Post[] = [];`
- or better yet add it to get method by adding the response body type
    `.get<{[key: string]: Post}>('https://ng-complete-guide-8c897-default-rtdb.firebaseio.com/posts.json')`

## Outputting Posts
- add loaded posts to posts
    `.subscribe(posts => {this.loadedPosts = posts;});`
- use it in the template

  <div class="row">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
      <p *ngIf="loadedPosts.length < 1" >No posts available!</p>
      <ul class="list-group" *ngIf="loadedPosts.length >= 1">
        <li class="list-group-item" *ngFor="let post of loadedPosts">
          <h3>{{post.title}}</h3>
          <p>{{post.content}}</p>
        </li>
      </ul>
    </div>

## Showing a Loading Indicator
- create property on class AppComponent in app.component.ts
    `isFetching = false;`
- set it to true whenever you start fetching posts
    `private fetchPosts() {this.isFetching = true;`
- the in subscribe function set it back to false
    `    .subscribe(posts => {this.isFetching = false;`
- add it to templates:
  1. show no posts available if we don't have any and we are not fetching
  2. only output posts if we are not currently fetching
  3. third senaro where we are fetching
      <div class="col-xs-12 col-md-6 col-md-offset-3">
      <p *ngIf="loadedPosts.length < 1 && !isFetching" >No posts available!</p>
      <ul class="list-group" *ngIf="loadedPosts.length >= 1 && !isFetching">
        <li class="list-group-item" *ngFor="let post of loadedPosts">
          <h3>{{post.title}}</h3>
          <p>{{post.content}}</p>
        </li>
      </ul>
      <p *ngIf="isFetching">Loading...</p>

## Using a Service for Http Requests
- so that components are lean & only concerned with template logic
- create posts.service.ts
- using `@Injectable({providedIn: 'root'})` means you don't have to add it to app.module.ts providers array
- in the class PostsService want to have HTTP request methods & get the responses in the front end
    constructor(private http:HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http.post<{name: string}>(`https://ng-complete-guide-8c897-default-rtdb.firebaseio.com/posts.json`, postData).subscribe(responseData => {
      console.log(responseData);
    });
  }
  fetchPosts() {
    this.http
    .get<{[key: string]: Post}>('https://ng-complete-guide-8c897-default-rtdb.firebaseio.com/posts.json')
    .pipe(map((responseData: { [key: string]: Post}) => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key});
        }
      }
      return postsArray;
    }))
    .subscribe(posts => {
    });
  }

## Services & Components Working Together
- goint to subscribe in the appComponent rather than the service
- the component is for the part related to your template & subscribe in the component, while the service handles the logic & returns the observable
- return the prepared observable in fetch posts in the service
    `return this.http...`
- in the appComponent add
  in ngOnInit & onFetchPosts()
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts=> {
      this.isFetching = false;
      this.loadedPosts = posts;
    });

## Sending a DELETE Request
- http.delete requires a url to send the delete request to
- in the service
    `deletePosts() {return this.http.delete('https://ng-complete-guide-8c897-default-rtdbfirebaseio.com/posts json');}`
- we call & subscribe & clear my loaded posts arry in the component
      `onClearPosts() {this.postsService.deletePosts().subscribe(() => {this.loadedPosts = [];});}`

## Handling Errors
- surver or internet fails,
- can pass more arguments to subscribe & the second arg is a function that triggers whenever an error is thrown
- create a new property `error = null;`
- in html we only want to display if there is an error
      <p *ngIf="isFetching && !error">Loading...</p>
      <div class="alert alert-danger" *ngIf="error">
        <h1> An Error Occured </h1>
        <p>{{ error }}</p>
- in the appComponent we add that second arg
      onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts=> {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message;
     });
  }

- the content of the error message depends on the API you are talking to

## Using Subjects for Error Handling
- in posts.service.ts
  - add a new property `error = new Subject<string>();`
  - add the second error argument to createAndStorePost
      `error => {this.error.next(error.message);});`
  - the we subscribe to it whereever we might be interested in the erro message in this case in thte app.component.ts
      `this.postsService.error.subscribe(errorMessage => {this.error = errorMessage;});`
    - create another property `private errorSub: Subscription;`
    - store our subscription in the above property in ngOnInit `this.errorSub = this.postsService.error`
    - then clean up after our subscription 
    ` ngOnDestroy() {this.errorSub.unsubscribe();}`

##Using the catchError Operator
- `catchError } from "rxjs/operators"`
- create a new observable to wrap the error & can dow that with ` throwError } from "rxjs";`  
  - throwError will yield a new observable by wrapping an error
    `   return postsArray;}), catchError(errorRes => {return throwError(errorRes);}))`

## Error Handling & UX
- add to the html
  `<button class="btn btn-danger" (click)="onHandleError()">Okay</button>`
- add to component ts
  `onHandleError() {this.error = null;}`
  `error => {this.isFetching = false`

## Settubg Headers
- all http verbs have an extra last argument which is an object where you can configure that request
- `.get<{[key: string]: Post}>('https://ng-complete-guide-8c897-default-rtdb.firebaseio.com/posts.json', {headers: new HttpHeaders({"Custom-Header": "Customized_Header"})})`
   - headers takes a new headers object tath you customize, import it from `@angular/common/http;`

## Adding Query Params
- can attach query parameters to http requests
    {
      headers: new HttpHeaders({"Custom-Header": "Customized_Header"}),
      params: new HttpParams().set('print', 'pretty')
    })
- multible params
  `let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');`

    headers: new HttpHeaders({"Custom-Header": "Customized_Header"}),
      params: searchParams

## Observing Different Types of Responses
- if you need access to the entire response object (status code, headers, ...)
  - change the observe key
  from the create & store function
    postData,
    {
      observe: 'response'
    }
 - looking at the event ( from the deletePosts function)
    {
      observe: 'events'
    });
    events
  - tap from rxjs/operators allows us to execute code w/o altering the response
            observe: 'events'
          }).pipe(tap(event => {
          console.log(event);
          })
  - HttpEventType } from '@angular/common/http';
    to check response number (0= sent 4 equals response)
      observe: 'events'
    }).pipe(tap(event => {
      console.log(event);
      if (event.type === HttpEventType.Response)

## Changing the Response Body Type
- can also gain access to the response typ from this JS object that you access the headers & params from
-  default is json & angular converts it to a JS object 
     {
      observe: 'events',
      responseType: 'json'
    })
- you can tell angular to make it a blob or text
       {
      observe: 'events',
      responseType: 'text'
    })
- will get a null value back because the text doesn't match the typing in get

## Introducing Interceptors
- want to attach a custom header to all requests (like in auth), add intercepters
- create file auth-interceptor.service.ts
- the class will implement an HttpInterceptor interface from @angular/common/http
- that interface has an intercept method that gets two args: 
    - request (HttpRequest from @angular/common/http)
    - next ( a function that will forward the request) of type HttpHandler also imported from @angular/common/http
  - interceptor runs code before your quests leaves the app, then have to return the result that next.handle yeilds us
     `intercept(req: HttpRequest<any>, next: HttpHandler) {console.log('Request is on its way'); return next.handle(req);}`
- have to provide the service by going to the app.module & adding a javascript object to the providers array 
  `providers: [{provide: HTTP_INTERCEPTORS, userClass: AuthInterceptorService, multi: true}],`
- can restrict by adding 
  `intercept(req: HttpRequest<any>, next: HttpHandler) {if (req.url ==)`

## Manipulating Request Objects 
- inside an intercepter you can manipulate the request object by creating a new one & returning that new object in the next.handle function
   ` const modifiedRequest = req.clone({headers: req.headers.append('asdfasd', 'asdfsadf')})`
   `return next.handle(modifiedRequest);`

## Response Interceptors
- can add pipe & then do something with the request
     const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')});
    return next.handle(modifiedRequest).pipe(tap(
      event => {
        console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log('Response arrived, body data: '),
          console.log(event.body)
        }
      }
    ));

## Multiple Interceptors
- the order that you provide your interceptors in the app module matter because that is the order in which they are executed
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true}],



# Authentication

## How Authentication Works
- client/browser/user
- server
- user enters info & browser sends auth data
- can't do auth in the browser because that is all exposed code &not stored securely & logic can be changed/edit in the browser
- can choose to show different parts of our code depending on auth status
- but no control or validate the authentication status in browser
- that has to happen in the server, a place where the users can't do anything
- with traditional websites you woul work with a session but because angular is a single page application 
  - that means the front is decoupled from the back
  - angular's router handles the "pages" we visit
  - JS in the broswer takes over & renders/rerenders pages/parts as our user interface & the current state of the user requires it
- we reach out to the backend using HTTP requests, to interact with a RESTful API server & we can't use a session because RESTful API's are stateless
- the backend doesn't render the HTML pages we are on & therefore we don't use sessions, a session would be stored on the server
- server will validate the user email & password & send the client a token, a JSON web token typically
- JSON web token is an encoded string, can be unpacked, stored & read by the client 
  - in local storage of a browser & attaches that token to any request the client sends to the server that needs to be authenticated
  - the server is able to validate that token because of it's algorithm & private key which is only known to the server

## Adding the Auth Page
- auth page is offered in an unauthenticated state
- other pages should be locked down if not authed
- need an auth folder for html & ts file
- add it to app.module.ts file under declarations `AuthComponent`
- add a form to the html file
- register the auth page in the app-routing.module `{ path: 'auth', component: AuthComponent }`

## Switching Between Auth Modes
- to auth.ts file add `isLoginMode = true;` & `onSwitchMode() {this.isLoginMode = !this.isLoginMode;`
- in html file add logic to switch between login/sign up `{{ isLoginMode ? 'Login' | 'Sign Up'}}`
check isLoginMode & if it's true display login text otherwise signup
- the other button switches modes `{{ isLoginMode ? 'Sign Up' : 'Login' }}`

## Handling Form Input
- add `ngModel name="email" required email` to the email input & `ngModel name="password" required minlength="6"/></div>` to the password input access the input & validate it & for password use the minlength validator
- `form #authForm="ngForm">` to disable the button if the form is not valid, to get access to the form object by creating a local refrenece (#authForm) & then on the button type submit add `[disabled]="!authForm.valid"`
- add `(ngSubmit)="onSubmit(authForm)"` to the form & in the ts fil add
`onSubmit(form: NgForm) {form.reset();` 

## Preparing the Backend
- the backend just needs to offer endpoints you can use to create new users & to log users in to get such a token
- in firebase go to Realtime Database under Rules `".read": "auth != null", ".write": "auth != null"`
- go to build & Authentication & start & Signin method & choose email/password & click enable (just at the top), then save

## Preparing the Signup Request
- https://firebase.google.com/docs/reference/rest/auth types of restpoint apis
  need two methods: Sign up with email/passowrd & Sign in with email/password
  - grab endpoint from each meathod
- create an auth.service.ts file

- find the api key on firebase by clicking gear icon (next to project overview), project settings & grab the Web API key & replace the `[API_KEY]` with the key you grabbed (yes replace brackets too)
- because it's a post request we have to attach the body
- create a JS object that includes the request body payload (email, password & returnSecureToken)
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
- this function will send an HTTP request to firebase's api but the HTTP Client does nothing without being subscribed to
- we return the prepared observable (& can clean it up later) & subscribe in the auth.component
signup(email: string, password: string) 
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAI54AvMyYFwhYM0blxlvqf70wDQaXNS-o',
    {
      email: email,
      password: password,
      returnSecureToken: true
    })

- we can define the format of the data to get back by creating an interface in auth.service.ts
    interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken; string;
  expiresIn: string;
  localId: string;
}
- we can hint at what kind of data we'll get back now that we created the interface `return this.http.post<AuthResponseData>`

## Sending the Signup Request
- in auth component under onSubmit
   - add a catch to prevent someone getting around the disabled form
    if (!form.valid) {
      return
    }
- inject the AuthService `constructor(private authService: AuthService) {}`
- then call the AuthService signup function `this.authService.signup(email, password);`
- the subscribe to the return value (observable) of signup `this.authService.signup(email, password).subscribe( resData => {console.log(resData);}, error => {console.log(error)});`

## Adding a Loading Spinner & Error Handling Logic
- https://loading.io/css
- new folder in the shared file called loading-spinner
  - add a css where you copy pasta the css
  - add a ts file where you put the html in the template place & export the spinner class
  - add it to declarations in app.module.ts
- go back to auth component to hide the form if it's loading 
  - add `isLoading = false;` property
  - add it after the if check & data extraction set `isLoading = true;`
  - then set it back to `isLoading = false` after either recieving the data or recieving the error
- add an *ngIf="!isLoading"> to the form div to make sure that it onlyshows up if we're not currently loading. If we are loading we show the spinner by adding another div & the app-loading-spinner (also center it)
    <div *ngIf="isLoading" style="text-align: center;">
      <app-loading-spinner></app-loading-spinner>
    </div>
- adding error handling logic 
  - add a new property in auth.ts
    `error: string = null;`
  - add it to the onSubmit function
    `error => {this.error = `An error occurred!`;`
- in the html file
  <div class="alert alert-danger" *ngIf="error">
      <p> {{ error }}</p>
  </div>
  the if statement means that the div will only show up if error is truthy (or has a value)

## Improving Error Handling
- to be more specific about the message
    errorRes => {
          console.log(errorRes);
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              this.error = 'This email exists already';
          }
  - can see from console logging the object that there is an error.error.message from firebase, can also see info from the docs under common error codes
  - us a switch statment to see if the error respose is case 'EMAIL_EXISTS" & then assign error to the string, which is now outputed by the auth component html

- but errors should be handled by the service (slim component) 
  - we can pipe on this observable & add rxjs/operators -specifically the catchError operator
  pipe(catchError(errorRes => {
      let errorMessage = 'An unknown error occured!';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
      }
      return throwError(errorMessage);
  - we use throwError because RxJS always needs to return an observable so it wraps the error as an observable
  - we move the switch statment into catchError
  - add an defalut errorMessage for unknown errors
  - if the error we get doesn't have the error.error.message format, our code will fail so the if statement checks to see if the format is the same & if not wrap the response as an observable with throwError & return it
- back in the auth component we will get the error message & can now set our error equal to the error message we are getting from authService

## Sending Login Requests
- need to start by creating a request for the login endpoint (vs the sign in)
- go to firebase to https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password grab url
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]` & replace `[API_KEY]` with our api key (pasting over brackets)
- in authService
    - creat a login function that takes a email & password `login(email: string, password: string)`
    - use http.post to post the info to firebase `this.http.post('https...`
    - create the js object that is going to carry the request body payload 
        email: email,
        password: password,
        returnSecureToken: true
    - to make the AuthResponseData interface applicable in this case we add registered as an optional property `registered?: boolean;`
    - now we can type the post request `this.http.post<AuthResponseData>`
    - then we add the logic to the submit button in the auth.component.ts
      `this.authService.login(email, password)`
    - then we can use the logic we used for signup
      subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
        );
- or dry:
  - import AuthResponseData from the authService so we can type the Observable object we are creating `let authObs: Observable<AuthResponseData>`
        if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
      }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
      );

## Login Error Handling
- dry to use the error handling methods we created for sign in for login too
- create a private method for handling errors `private handleError(errorRes: HttpErrorResponse){`
- copy paste the errorhandling from signup & paste it into the new method
     private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occured!';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
      }
      return throwError(errorMessage);
    }
- and we pull it out of the signup & use pipe in both signup & login
  `.pipe(catchError(this.handleError));`

TODO: fix error handling for login

## Creating & Storing the User Data
- need to start storing data about the user (if authenticated), need a user model, will need to verify the token
- create file user.model.ts in the auth folder
- get token if the experation date doesn't exist or the current timestamp is bigger then the tokenExpirationDate ( or the tokenExpirationDate is smaller than the current date), we know the token has expired
- store the user model as a Subject in authe.service.ts
  - `user = new Subject<User>();`
  - emit or next a new user when we have  new one or when the token is invalid/expired or we log out
  - add a new operator to the pipe in signin/login, the tap operator to creat a ndw user
    `tap(resData => {const user = new User(resData.email, resData.localId, resData.idToken )`
    - we'll have to generate a date token ourselves by using resdata from firebase (turning it into a number) & get the current time in milliseconds & add the resData (*1000 to make it milliseconds like the JS fucntion) `const expirationDate = new Date(new Date().getTime() + +resData.expiresIn*1000)`, wraping it in a date function will turn it into a date object & not miliseconds
  - once we created the user object we emit it `this.user.next(user);`

- but now he wants to move everthing into a private function for dry
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn*1000)
    const user = new User(email, userId, token, expirationDate);
        this.user.next(user);}
  - and tap now looks like `tap(resData => {this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);}` & you add it to sign in too

## Reflecting the Auth State in the UI 
- forwarding the user to a different rout once logged in (can do it in the component or service)
- in auth.component.ts
  - inject the router `private router: Router`
  - add it to authObs in case of sucess only `this.router.navigate(['/recipe-book']);`
- disabling the recipes link if not logged in & disable the authenticate link if we are logged in
- in header html
  - create a logout button for when we're logged in <li><a style="cursor: pointer;">Logout</a></li>
- in header ts
  - now check if the user has a valid token (by subscribing to the subject (user))
  - inject the authService into the header component `private authService: AuthService)` & subscribe onInitialization `ngOnInit() {this.userSub = this.authService.user.subscribe(this.isAuthenticated = !!user;);` 
  - create a property so that you can unsubscribe `private userSub: Subscription;` & `isAuthenticated = false;`
  - then unsubscribe `ngOnDestroy(): void {this.userSub.unsubscribe();`
  - if we have a use we're subscribed, no user no subscription 
- in header html
  - `<li routerLinkActive="active" *ngIf="isAuthenticated"><a routerLink="/recipes" >Recipes`
  - `<li routerLinkActive="active" *ngIf="!isAuthenticated"><a routerLink="/auth">Authenticate`
  - <li class="dropdown" appDropdown *ngIf="isAuthenticated">

## Adding the Token to Outgoing Requests
- we need to add the token to the outgoing request to firebase
- data-storage.service.ts inject the auth service `private authService: AuthService`
- just want the token of the currently authenticated user
  - in authService we add a property `token: string = null;` so that when there is a new user logged in we set their token
  - or we couls use a BehaviorSubject: also gives subscribers immediate access to the previously emitted value, we can subscribe after the user has been emitted, so we can grab the data even if the user has already been logged in `user = new BehaviorSubject<User>(null);`
- now we can go back to data-sorage.service
  - & subscribe so that we only get the user once `this.authService.user.pipe(take(1)).subscribe();`
  - the one tells RxJS that we only want to take one value from that observable & then automatically unsubscribe
  - now he's going to merge the two subscriptions (the authService user & the response from the http request that follows)
  og:
  fetchRecipes() {
    this.authService.user.pipe(take(1)).subscribe(user => {
      
    });
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }
- we use exhaustMap which waits for the first observable (user) to complete & then it gives us that first observable (user) & then we return a new observable which will replace our previous observable in the entire observable chain
  fetchRecipes() {
    this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json'
      );
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    tap(recipes => {
      this.recipeService.setRecipes(recipes);
    })
    )
  }
   - we return the HTTP request inside of exhaust, then add the other two operatos as next steps after the exhaust map
   - to extract the token add a js object to the get request
   .get<Recipe[]>(
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
        {
          params: new HttpParams().set('auth', user.token)
        }

  fetchRecipes() {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
        {
          params: new HttpParams().set('auth', user.token)
        }
      );
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    tap(recipes => {
      this.recipeService.setRecipes(recipes);
    })
    )
  }

## Attaching the Token with an Interceptor
- since we manipulate all outgoing requests in the same way, use the interceptor to manipulate the code (DRY)
- create the file auth-interceptor.service.ts
- the service should impplement the httpInterceptor interface 
- the httpIntercetor.intercept method needs 2 args HTTP req & next which is HttpHandler
- then you edit the request by adding the token 
  - inject the auth service so that you can subscribe to the user object to get the token (only once so we use the take method from rxjs/operators), then to modify the 
  `return this.authService.user.pipe.(take(1), exhaustMap(user => {const modifiedReq = req.clone({pamams: new HttpParams().set('auth', user.token)}); return next.handle(modifiedReq)}))`
    return the next handle request & that's where we return the request that has modified the params with the token in the key auth by calling clone
- add an if statement to return the request unmodified if there was no user `if (!user) {return next.handle(req)}`
- provide that token in the app.module in the providers Array
  `{provide: HTTP_INTERCEPTORS, userClass: AuthInterceptorService, multi: true}`

- add a logout to the auth.service.ts
 `logout() {this.user.next(null); this.router.navigate(['auth'])}`

# Angular Modules & Optimizing Angular Apps

## Module Intro
- NgModule & Optimizations

## What Are Modules
- NgModule or app-routing module
- ways of bundling angular together so that angular is aware of these featurs: components, directives, services, pipes
- every angular app needs to have at least one module, the app.module.ts
- core angular features are included in Angular modues (formsModule) and only load them when needed
  - vs having to declar 10 different forms dirctive ( the module gives you access)
- how you add a feature (declarations/providers) depends on the feature itself

## Analyzing the AppModule
- in app module & the app-routing module we have NgModule
- declarations is an array of all the custom components, directives & pipes you use in your app
- the imports array are all the Modules that angular provides
- if we look into the modules angular provides we would find an NgModule with all the directives it gives us access to in the declarations array
- the providers array is also in NgModule, where all the services we want to provide
- if we don't provide the service in NgModule.providers we provide it in root `@Injectable({providedIn: 'root'})` in the service itself as a class decorator
- bootstrap array defines which component is availabe at the start of the array (index.html & AppComponent), having multiple components would give you different root trees & make each component detached from eachother 
- in boostrap we have entry components which allows angular to be aware of this component when it needs to create it programmatically
- app routing module holds the route config (could keep it in app module)
- we import the router module Angular offers us & use the forRoot Method & export the RouterModule, so that it's availabe in the app.module
  `@NgModule({imports: [RouterModule.forRoot(appRoutes)], exports: [RouterModule]})`

## Getting Started With Feature Modules
- grouping modules by feature ()
- helps you find things
- create a folder for the feature
 - then create a feature.module.ts file very much like th app.module.ts & a class called FeatureModule 
 - @NgModule() & in the declarations with all the components that pertaine to that feature & then put them into the exports array
 - then import that FeatureModule into the imports array in the app.module.ts

## Splitting Modules Correctly
-will need to import things you use in app.module.ts into feature.module.ts imports array like AppRoutingModule, FormsModule, 
 -- except BrowserModule (only use once) instead use the CommonModule outside of AppModule
- only modules in the declarations array of a module file will have access to the Modules in the imports array
- services are the exception, only need to declare these in app.module.ts

## Adding Routes to Feature Modules
- can move the routes for that feature into the feature.module.ts file by adding RouterModule.forChild() into the imports array 
- can even just move the routes to a feature-routing.module.ts in the feature folder add the routes to an array called Routes, will need to use `@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})` & 
- then import the FeatureRoutingModule to feature.module.ts

## Component Declarations
- dont just add to declarations what you plan on using as a template, but also have to add any routes you load via routing, ig an app component needs to be listed in the feature.module.ts declarations array
- shouldn't need to export app components in the feature.module.ts export array

## The ShoppingList Feature Module
- create a shopping-list.module.ts & add @NgModule declarations with the list & edit components
- in the imports array add RouterModule.forChild([{ path: 'shopping-list', component: ShoppingListComponent},]), also add the CommonMOdule, FormsModule to the imports array before the RouterModule
- export each of the components you want to share in an exports array
- then add to the imports in app.module.ts ShoppingListModule

## Understanding Shared Modules
- things that multiple features use should be kept in the shared file
- can have multiple shared modules
- add a shared.module.ts file where you have an NgModule & export the class SharedModule
- in NgModule
  - add declarations ( the compoments you will be sharing)
  - add imports you'll be using (CommonModule)
- import the shared module into the feature.module.ts file you will be sharing it with (imports array)
- if you declare a component in one declaration, you must not declare it anywhere else ( so you have to remove them from the app.module.ts if they are in the shared.module.ts)
- just add teh SharedModule in the app.module.ts

## Understanding the Core Module
- to make the app module leaner, can import them in to app module from the core modue or us providedIn @Injectable 
- providers array has ShoppingListService, RecipeService & the interceptors
- put them in another file and then import that file
- but if you don't want to put them there use @Injectable({ providedIn: 'root'}) -better than adding a core module
- absolutely have to add interceptors to providers array in app.module.ts 
- add NgModule, & it's providers array & export class coreModule
- services don't need to be exported like other modules
- import it into app.module.ts

## Adding an Auth Feature Module
- outsourcing the auth component & its route to a separate feature module
- add auth.module.ts
- in declarations add AuthCompoent
- in imports array add CommonModule & FormsModule & SHaredModule
- grab the route & add it to the imports `RouterModule.forChild([{path: 'auth', component: AuthComponent}])`
- in app.module.ts import AuthModule (imports)

## Understanding Lazy Loading
- when we're not using lazy loading whenever we visit a page we are loading everything
- lazy loading only loads code that belongs to the areas of the application that we are visiting
- app starts faster

## Implimenting Lazy Loading
const routes: Routes = [{
  path: 'your-path',
  loadChildren: () => import('./your-module-path/module-name.module').then(m => m.ModuleName)
}];

ensure that in your tsconfig.json file
"module": "esnext",
- for lazy loading to work your feature model needs to bring it's own routes (in its separate folder)
- but in the feature-routing.module.ts the inital path should be an empty string
- & then in app-routing.module.ts add the path there in the Routes array {path: 'feature', loadChildren:'./feature/feature.module#FeatureModule'}  
    the featurefilename then the feature.module file (no ts)`#`is followed by the name of the class
- `loadChildren: () => import('./your-module-path/module-name.module').then(m => m.ModuleName)` is the new way to call loadChildren
- loadCHildern tells angular to only load the code/content of a module when the user visits the path
- make sure you only have the import statements you need, otherwise your app will be needlessly slowed down & it defeats the purpose of lazy loading
- cannot have the features you are trying to lazily load in NgModules import array (angular will try to load it)

## More Lazy Loading
- again change the path to 'auth' & add the loadChildren function with the path & delete the import in app-routing.module
- where the route is located in the feature change the path to an empty string

## Preloading Lazy-Loaded Code
- go to app-routing.module & in the import array
[RouterModule.forRoot(appRoutes)] & add a second arg
[RouterModule.forRoot(appRoutes), {preloadingStrategy: PreloadAllModules}]

## Services & Modules
- what is special about services
- where to provide services, appmodule, appcomponent, eager-loaded/lazy Module
- when providedIn root, or in appModule the services are provided app-wide (and the same instance of that service)
- when it's in the app component its available there & for all of that apps dependencies and in each component there are separate instances of that service
- if a module is eager loaded the service added there will be availabe application wide (same instance)
- if a service is provided to a lazy loaded module, it gets it's own instance of that service
    - if you want to have the same service instance app wide for lazy loaded modules use root injector
- don't provide services in eagerly loaded modules use root injector
- only provide services in lazily loaded apps if you want a separate instance of the service

## Loading Services Differently
- created a loggin.service.ts file using @Injectable({providedIn: 'root'}) at app level (doesn't matter because of the injectable)
- we inject it into the app.component & the shopping-list.component, it uses the same instance
- if we inject it directly into app.component rather than using @Injectable, same behavior 
- inject it into the app module & the shopping module, now we are using two different instances because the shopping module is lazy loaded
  - this inlcudes modules you load into lazy loaded modules (because the loaded modules aren't loaded until the lazy module loads - those provide separate instances)
  ##### because of these bugs provide services at root or using the @injectable unless you want multiple instances

## Ahead-of-Time Compilation
- our templates include special angular syntax that only angular can read (ngIf), angular parses the templates & updates the dom depending on the instructions in the template
- the angular compiler compiles template syntax to JS DOM instructions (happens in the browser) is called Just-in-Time Compilation
- doesn't necessarily have to be part of your application
- Ahead-of-Time Compilation when you run the angular compiler during development as part of the build process & not in the browser
- you do this with `ng build --production` or ``ng build --prod`, doesnt spin up a development server but builds the entire app into a few files that you can then deploy & this will compile your app ahead of time
- Error `Property control does not exist on type abstract control` recipe-edit.component - an issue with AIT not understanding that it returns a form arry that has a controlled property while other controls don't have a controls property
  - move it into the typescript file
    get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }
**********????????**********

# Dynanmic COmponents

## Module Intro
- dynamic components are components that you create dynamcially at run time: alert, overlay etc that happens in response to a user event
- 


# Angular Animations
## Setting up a Starting Project
- apply animations to a specific div

## Animations Triggers and State
- pass in animations to the component decorator in app.components.ts
    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      animations: [
- each animation has a trigger, a function to tell angular to find a certain name in our dom/template which should trigger a certain animation
    `animations: [trigger('`
- in our template we place `[@divState]="state"` and pass it to the trigger function `trigger('divState'`
    - state is a property we created in the ts `state='normal';`
- the second argument we pass in to trigger is an array of the two states we want to animate between CSS styles
- we start with the inital state `state('normal', style({'background-color': 'red',transform: 'translateX(0)'})),`
- then we create the second state `state('highlighted', style({backgroundColor: 'blue',transform: 'translateX(100px)'}))`

## Switching between States
- We have an animate button we are going to use to initate changes `<button class="btn btn-primary">Animate!</button>`
- so we create the onAnimate function to go with it `onAnimate() {this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal'}`
- and it doesn't work because you can't switch between css syntaxes in the states they have to be the same so  we change the second state syntax to match the first
  `state('highlighted', style({'background-color' : 'blue',`

## Transitions
- pass a 3rd argument into trigger is the transition funtion that describes how the transition from one state to another state should look, 
- transition takes teh inital state & then the end state (can have multiple transition arguments)
      `transition('normal => highlighted', animate(300)),`
      `transition('highlighted => normal', animate(800))`
    - transition takes a second argument, which is another function animate that takes milliseconds of how long 

## Advanced Transitions
- if you wanted it to take the same amount of time in both directions just add a two way arrow `<=>`
  `transition('normal <=> highlighted', animate(300)),`
- if you want to add styles between one transition 
  - we create a new `<div style="width: 100px; height: 100px;" [@wildState]="state"></div>` & we are binding it to the wildState animation trigger
  - we create a new property in the ts file `wildState = 'normal'`
  - we add a third state `state('shrunken', style({'background-color' : 'green' transform: 'translateX(0) scale(0.5)'})),`
  - we connect the shrink button `(click)="onShrink()"` with a funciton in the ts 
    `onShrink() {this.wildState = 'shrunken';}`
  - add functionality to onAnimate
    `this.wildState == 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';`
  - we need a third transition on wildSate `transition('shrunken <=> *', animate(500))` we use the astrik to say that it doesn't matter which state it is in (highlighted/normal to switch to shrunken)

## Transition 
- we can control timing & control the whole animation & all of it's styles durning that animation `transition('shrunken <=>, animate(500, style())) `
- as we can define a style in a state we can do the same for an animation by passing a js object to the style funciton
  `animate(500, style({ borderRadius: '50px'})))`
  to do this we pass a second argurment to the transition function
- to get a more complex animation, chain muiltiple styles together in an array as the second argument for the transition function
    `transition('shrunken <=> *', [style({'background-color': 'orange','borderRadius': '0px'}),animate(1000, style({borderRadius: '50px'})),animate(500)])`
  - this array allows us to define different phases in that transition starting phase
    - starting with the background-color: orange
    - then we call animate `animate(1000, style({borderRadius: '50px'})),animate(500)])`
    - and then an animate at the end without a style that indicates transition to the end state `animate(500)])`
    - the important part is to end with the style-less animate function

## The Void State
- animating the addition to a list or removing of an item
- we create a new trigger the list1 trigger
  trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [style({opacity: 0, transform: 'translateX(-100px)'}), animate(300)]),
      transition('* => void', [style({opacity: 0, transform: 'translateX(-100px)'}), animate(300, style({transform: 'translateX(100px)', opacity: 0}))])
    ]),
  - we add only one state in, the other state is we removed it or it isn't on the list yet, `void`
  - we add the final style `style({opacity: 1,transform: 'translateX(0)'})`
  - then we add transitions, the first transition is when it comes in (from `void`), when we add it to the dom
  - in the html file add to the list element `[@list1]` as a trigger, we don't bind it to anything
  - animate from not existance to any state `transition('void => *'`
  - then we have to add the inital style `style({opacity: 0, transform: 'translateX(-100px)'})` that it gets when it enters the dom
  - then it transitions to it's final style `animate(300)`
  - then for leaving we add a new transition, and it goes from any state to void `transition('* => void', `
  - since we start with the state it already has, no need to define a starting state, instead the annimation should have a style state because we don't need it to snap to some state at the end  
  - style is the second argument of animate `style({transform: 'translateX(100px)', opacity: 0}` move it to the right & fade it out 


## Using Keyframes for Animations
- more detailed control over the animation process
- define some key frames to specify what the animation looks like at what state
- create a new trigger `[list2]` 
- create it in the ts file & in the tranistion function we call the animation method & pass in the keyframes method `trigger('list2', [state('in', style({opacity: 1,transform: 'translateX(0)'})),transition('void => *', [animate(1000, keyframes()`
- now we can control which state can take how long by defineing styes we pass in to keyframes
- we start with the end state `keyframes([style({transform: 'translateX(-100px)', opacity: 0, offset: 0})`
- then we add the next step in the transition
  `style({transform: 'translateX(-50)', opacity: 0.5, offset: 0.3}),`
- without offset, keyframes will split the time eveningly between transitions

## Grouping Transitions
- If you want to have both animations at the same time but with different timings so they don't wait for one animation to finish before starting the next >>> GROUP
- in the group method, you pass an array of animations we want to perform sychronously
`transition('* => void', [group([animate(300, style({color: 'red'})),animate(800, style({transform: 'translateX(100px)', opacity: 0}))`

## Using Animation Callbacks
- there are some call back functions included in our animations that we can listen to
  `(@divState.start)="animationStarted($event)"` or `(@divState.done)`
    - here we set up event binding with the @ symbol to indicate animations
    - to create a trigger that will be called whenever the animation starts (or ends)
    - we pass the event to the function to see what's inside of it 
    - create a function in the ts file to console log the event
    `animationsStarted(event) {console.log(event);`
    - inside we see what's inside the event obect & it has a fromState, a toState, and totalTime

# Deploying an Angular App
## Deployment Preperation & Steps
  1. use/check environment variables
  2. polish & test code
  3. `ng build --prod` build you application: compile your ts into js, bundle code together, translate it into angular language, bundle into the smallest amount of code possible (uses ahead of time compilation)
  4. Deploy build artifacts to static host (host that runs JS, HTML, CSS but no server)