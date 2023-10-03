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
 - have to have either a template or templateUrl, it is the one property that you have to have at all times

 ## Working with Component styles
 - can add css stiles in the app.component.css file or inline in the app.component.ts (currently this is the only one working)
 - styles/styles url is an array so you can have more than one
 
 ## Fully Understanding the Component Selector
 - can use a different type of selector
 - app-server is treated like an css selector so you are not limited to selecting by element
    - can select elements by attribute by enclosing that attribute in squared brackets
        - in servers.component.ts
            @component({
                selector: '[app-servers]',
            })
        - include in html by <div app-servers>
    - can select by class
        - in servers.component.ts
            @component({
                selector: '.app-servers',
            })
        - include in html by <div class="app-servers">
    - NOT by id or psudo-selectors (hover)


## Understanding Databinding
- communication between the typescript (buisness logic) and the template (html)
- output data
    - done with string interpolation {{ data }}
    - or property binding [property] = "data"
    - clicking a button (html) should trigger something in typescript code
- reacting to user events
    - with event binding
- Two-Way-Binding
    - able to react events & output something at the same time

## String Interpolation
- can hardcode a string directly between {{}} like {{ server }}
- only condition of what's between the curly braces, is to return a string 
    - could call a method that returns a string
    - can't write multiline/block expressions (no logic, if/for/while)
- added variables to .ts component file & called them in html

## Property Binding
- moving a element's property (like disabled) allow us to dynamically bind the propert & disable the HTML attribute
- by using the brackets we are directly binding to the native disabled property 

## Property Binding vs String Interpolation
- <p> {{ allowNewServer }}</p>
  <p [innerText]="allowNewServer"></p>
- if you want to outpust something in your template, print some text to it use string interpolation
- if you want to change a property (of an html element, directive or component) use property binding
- don't mix

## Event Binding
- () in html are the signal we are event binding
- the syntax that angular uses is click vs onClick, mouseEnter vs onMouseEnter
- output the value of a property that changes with a button
    - create variable in .ts 
        serverCreationStatus = 'No server was created!';
    - create an html element for it to output too in .html
        <p>{{ serverCreationStatus }}</p>
    - create the method to make the change in .ts
          onCreateServer() {
            this.serverCreationStatus = 'Server was created';
        }
    - add it to the button in .html
        <button class="btn btn-primary" (click)="onCreateServer()">Add Server</button>
    - can add small amounts of logic inline in html
    
## Passing & Using Data with Event Binding
- create an input form in .html
    <input type="text" class="form-control" (input)="">
    *(input) is a normal DOM event provided by the input element which is fired whenever the user types
- create a function to do something with said input .ts
    onUpdateServerName(event: any) {
    this.serverName = event.target.value;
    // we found the target (element on which the event occured by using console.log(event)
  }
- add function to html
    <input type="text" class="form-control" (input)="onUpdateServerName($event)">
    - $event is a reserved variable name you can use in the template when using event binding
    - $event will be the data emitted with that event or how we capture the data & pass it as an argument to the function we are calling
- create a variable in ts that we can output the event data to
    serverName = '';
- create an html element we can output the event data to 
    <p>{{ serverName }} </p>

## Two Way Databinding
- easier way to bind data ngModel
- to use ngModel you have to import the FormsModule @angular/forms needs to by added to your import[] in the AppModule
- use ngModel in your html file
    <input type="text" class="form-control"
    [(ngModel)]="serverName">
    - this will trigger on the input event & update the value of server name in our component
    - it will also update the value of the input element
    
## Combining all Forms of Databinding
- add functionality of displaying server name on button click
    onCreateServer() {
    this.serverCreationStatus = this.serverName + ' was created';
  }

## Understanding Directives
- directives are instructions in the DOM (like components)
- components are directives with a template
- add directives with an attributes selector
- use the @Directive decorator to tell angular it's a directive

## Using ngif to Output Data
- directive shipping
- the ngIf directive
- *ngIf inside the html element
    <p *ngIf="serverCreated">THe server was created, the server name is {{serverName}} </p>
    -serverCreated just needs to provide a bool

## Enhancing ngIf with an Else Condition
- if you want to add an else clause
- modify the *ngIf by adding an else clause at the end with a local refrence in this case noServer
- add an ng template with the local refrence & put what you want to display otherwise in the template
- with the ng template we mark that spot in the template
    <p *ngIf="serverCreated; else noServer">THe server was created, the server name is {{serverName}} </p>
    <ng-template #noServer>
    <p>No server was created</p>
    </ng-template>

## Styling elements Dynamically with ngStyle
- attribute directives don't add or remove elements, they only change the element they were placed on
- add ngStyle to an element & then define the property (with a function or just a color)
    <p [ngStyle]="{backgroundColor: getColor()}"
    getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
    }

## Styling elements Dynamically with ngClass
- ngClass allows us to dynamically add css classes
- only works when using property binding (use [])
- also need to pass a JS object
- each property you bind to may take a different value (here it's the js object)
- has key value pairs (keys=CSS class name & values are the conditions)
    -html
    <p [ngStyle]="{backgroundColor: getColor()}" [ngClass]="{online: serverStatus === 'online'}">
  Server with ID {{ serverId }} is {{ serverStatus}} </p>
    -ts
    @Component({
    selector: 'app-server',
    templateUrl:"./server.component.html",
    styles: [`
    .online {
        color: white;
            }
        `]
    })

## Outputting lists with ngFor
    - add an array in ts
    - use a function to push to that array (that's connected to a button)
    - add the *ngFor to a component you built
    - <app-server *ngFor="let server of servers"></app-server>

## Getting the Index when using ngFor
- push new Date() to log instead of plus one
  this.log.push(new Date());
- check index by
  <div *ngFor="let logItem of log; let i = index"
  [ngStyle]="{backgroundColor: i >= 4? 'blue': 'transparent'}"
  [ngClass]="{'white-text':logItem >= 4}"
  > {{ logItem }} </div>