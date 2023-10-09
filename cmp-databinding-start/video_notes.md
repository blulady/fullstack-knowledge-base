## Splitting apps into Components
- he talks about how he intends to split the component
- its better to bundle business logic into individual componets
- need to get the new server we have in the cokcpit to the array of servers in the app component
  - need to tell the app component when one of it's child components change (cockpit)
  - get the data from the cockpit (the new server) to the app-server-element
  PASS DATA BETWEEN COMPONENTS

## Property & Event Binding
- we used property binding to bind the disabled property of an HTML element (passed data to that element)
- we used event binding to make things happen when we clicked a button
 - namely button emitted an event to which we were able to listen
    - we need to be able to send/recieve data to/from a component

## Binding to Custom Properties
- we can use property binding to bind to our own components
- all properties of components are only accessible inside the components (scope)
- we are looping through the app-server-element array, there is an element property that we want to access through binding
  - we add [element]="serverElement" after the ngFor loop in the app.component.html
- if you want parent componets to be able to bind to a property, you have to add a decorator to the property
- you place the decorator on the child component import {Input} from '@angular/core'; & @Input() infront of the property you are looking to bind

## Assinging an Alias to Custom Properties
- if you want to change the name of the property add a name as an argument @Input("srvElement")

## Binding to Custom Events
- if we want to inform our parent component of a change made in a child component (the component that impliments the first component) (that a new server/bluprint was created)
- we copy functions back to app.component.ts & rename them
  - we then modify the function to accept serverData as a parameter & then push the object to serverElements (same for blueprint) accessing the information from the parameter
- we want to pass newServerName from the cockpit to the app component
- we have to create new properties (serverCreated & blueprintCreated) & make sure these properties are events we can emit
  - this makes it so we can emit the events
    serverCreated = new EventEmitter<{serverName: string, serverContent: string}>() // we define the typd of event data to emit, add the () at the end to call the constructor object & create a new eventEmitter object, that is stored in server created
  - then in the onAddServer()/onAddBlueprint(), we pass the object & emit it
    this.blueprintCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
  - we have to add @Output() decorator to make it "listenable" from outside the component

## Assigning an Alias to Custom Events
- can assign an alias between @Output() @Output('bpCreated')
- use that alia when it's called in the app.component.html (bpCreated)="onBlueprintAdded($event)"

## Custom Property & Event Binding Summary
- @input makes your properties bindable from outside the component (from the parent component)
- @output allows parent components ussing the component to listen to events inside the child
- complicated to have two components at the same level talk to each other, info has to be passed to parent then back to other child - can be inpractical another way 

## Understanding View Encapsulation
- paragraphs are no longer colored blue because the html is now used in other components that don't have access to those css properties in app.component.css
- the selector changed _ng-content-followedbylongnumberseq unique to each component specific element type (ig all <p> in cockpit have same numb seq but <p> component in app.component have a different numb seq from cockpit)
- the attributes are applied by angular (same attribute to all elements in a component), make sure that styles are only applied to elements in a specific comopnent
- emulates the shadow dom (not supported by all browsers)

## More on View Encapsulation
- can override encapsulation
- by going to the .ts file of the component & adding to the @component decorator
  encapsulation: ViewEncapsulation
   - there are 3 options
        - Emulated = defualt, don't need to select this
        - None = will get rid of the attributes you see in the dev tools & apply the css globally & will affect other components
        - Shadow DOM: will give you the same result as before with emulated but only in browsers that support it

## Using Local References in Templates
- can place a local refrence on any html element 
  replace [(ngModel)]="newServerContent" with #serverNameInuput
  & pass serverNameInput as an argument to (click)="onAddServer(serverNameInput)"

- can use them everywhere in your template but NOT .ts file
- can use them in functions to pass them to your ts file
- the local reference gives us the element with all its properties
- be explicit about the type (in the parameters for the ts function in .ts file ig: HTMLInputElement)

## Getting Access to the Template & DOM with @ViewChild
- a way to access any any element directly from the typescript code (direct access to elements)
- sometimes you want access before calling a method
- create a local reference in the cockpit.component.html #serverContentInput
- then in cockpit.component.ts create a property with the ViewChild() decorator (& the local refrence as an argument) (import it from angular/core) (can also pass components not as a string(no quotes) but just CockpitComponent to get access to the first occurrence of the CockPitComponent)
    @ViewChild('serverContentInput') serverContentInput;
- can access the value in the functions by
    serverContent: this.serverContentInput.nativeElement.value
- don't change the element this way (use other tools)

## Projecting Content into Components with ng-content
- everything you place between the opening & closing tag of your own component is lost by default
**unless you use a special directive**
- put this in the place where you want to render the content add
    <ng-content select="selector"></ng-content>
    - serves as a hook you can place in your component to mark the place for angular where it should add any content it finds btwn the opening & closing tag here

## Seeing lifecycle Hooks in Action
- ngOnInit() is a lifecycle hook
- once a new component is instatiated Angular goes through a couple of phases in this creation
- we can hook into those phases & execute some code
  - by implimenting some methods Angular will call if they are present
- different phases
  first: ngOnChanges called after a bound input property changes
    - can be executed multiple times
        1. at the start when a new component is created
        2. always called when a bound input property changes (properties decorated with @input)
  second: ngOnInit called once the component has been initialized (hasn't been added to the dom yet but 
        1. angular finished basic initalization & properties can now be accessed/initalized)
        2. can run after the constructor (if you want it to)
  third: ngDoCheck will run when ever a change detection runs
    - change detection is the system that Angular uses to determine if there was a change in the component/template
        - to see if that part of the template needs to be re-rendered
    - great methond if you want to do something on every change detection cycle
  forth: ngAfterContentInit is called whenever content project by ng-conent has been initalized (the view of the parent component)
      - executed whenever change detection checked this content we're projecting into our component
  fifth: ngAfterViewInit called after the component's view (& child's views) has been initalizied
    - is reached once the view of our own compoent has been finished initalizing/view has been rendered
  sixth: ngAfterViewChecked is called whenever our view has been checked
    - once either all changes were displayed in the view or no changes were detected by Angular
  seventh: ngOnDestroy if you destroy a component or an ngIf gets set to false
    - removes it from the DOM
    - great place to do some clean up work bc it is called right before the object itself will be destroyed by angular

## Seeing Lifecycle Hookes in Action
- ngOnChanges could be super useful if you want to react to any changes & do something with the old values

