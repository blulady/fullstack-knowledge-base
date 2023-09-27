1.Watch & Code Along: Begin by watching the current video segment. As you watch, actively code along to gain hands-on experience, which aids in understanding and retaining the content. For your code-along, create a separate repository where you'll save and commit your code. For this section, the newly created repository can be called "academind-typescript-code-along".
Immediate Documentation: After finishing a video segment, pause and document your key takeaways and areas of uncertainty in the respective markdown files either "Getting Started" or "Basics" in "fullstack-knowledge-base".
Seek Clarification: If content isn't clear, consider:

    Rewatching the segment.
    Reaching out to peers or code coaches.
    Attending office hours.

Commit Practices: Commit your notes to "fullstack-knowledge-base" after each video segment. On the other hand, commit your code-along to its separate repository.

## What is angular?

angular is a JS Framework which allows you to create Single
Page Applications (SPAs)

single page application: app with only one html file & 
a bunch of javascript code we got from the server & every change is rendered in the browser
every click changes the single page because it uses javacript to modify the dom

## Angular vs Angular 2 vs Latest Version
 - only big change between angular 1 & angular2, everything else is backward compatible 

## Angular Setup & First App
 - make sure you have LTS verson of NodeJS installed
 - make sure you have npm version 6 installed
 - need tool to install Angular CLI
 - to create a new angular app
    ng new angular_app_name --no-strict # no space, don't use word test
    // don't add routing this time
    // use CSS style format this time
 - to run your build
    ng serve

## Editing our first app

- files we want to modify are inside src
- SPA in in app/app.component.html
- app-root is a div in the html, mentioned in the .ts file (under the component as the selector(and it selects the div in the html))
- the script imports are injected dynamically to replace app-root with our component(s)
- we get name from app component ts & stick it in the html when called
- [(ngModel)] = a directive that says to listen to the input & store it in name property/model & output the value of the name model in the  input
- app.module.ts is where tell angular which pieces belong to our app 
    - app.module.ts is where we add something to import to import another package from angular (FormsMOdule from '@angular/forms) (becaue that specific directive is a forms feature)

## Course Structure
- Next The Basics
- then Components & Databinding
- Directives
- Services & Dependency Injection
- Routing
- Observables
- Forms
- Pipes
- Http
- Authentication
- Optimizations & NgModels
- Deploying
- Anicmations & Testing

## How to get the Most out of the Course
- watch the videos
- do the assignments
- do the course project
- ask in Q&A (and answer)

## What is TypeScript?
- superset of js
- good for strong typing
- doesn't run in the browser & needs to be compiled