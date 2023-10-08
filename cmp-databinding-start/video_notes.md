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
