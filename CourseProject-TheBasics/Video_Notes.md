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
    - since the link is on the user component, the URL still changes but because we are on the component, angular doesn't reinstantiate it
- for subsequent changes we need a different approach

- params.suscribe is an observable (a feature added by a 3rd party package) to work with asynchrous tasks
  - an easy way to subscribe to an event which might happen in the future & execute when it happens
  - recieves 3 arguments (3 functions)
      - fired whenever new data is sent through whenever the params change 
          (params: Params) => {this.user.id = params['id']} // update our user objects id
       
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
    - then destroy it with OnDestroy (implement like onInit)
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
  `this.route.params.subscribe((params: Params) => {this.server = this.serversService.getServer(params['id']))`


  ** will throw error because we are calling the server component on the servers component even if we don't have an id available comment out <!-- <app-server></app-server> --> in servers html

# Changing Pages with Routing

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

# Forms

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