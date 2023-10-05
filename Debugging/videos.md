## Understanding Angular Error Messages
- having the console open while you are developing is a good idea
- read the errors & follow them back to the line that doesn't work
- we trace the error back to the method that is called when we click the button
- because the error says the thing we are pushing to is undefined
    - we look at the thing we are pushing to
        - we don't initalize the thing we are pushing too (servers)
            **initalize the array**

## Debugging Code in the Browser Using Sourcemaps
- when you have logic errors that have no error messages
- try looking as sources in the dev tools
- in this case the code is found under main
    - this is javascript (not typescript because that's what typescript translates too)
    - source maps are added by the angular cli which allow the browser to translate/map js to ts
    - source maps are stripped out in production
- can directly access the typscript files under webpack

    

