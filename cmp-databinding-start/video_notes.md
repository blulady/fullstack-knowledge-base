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
