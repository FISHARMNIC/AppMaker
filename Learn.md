# Using Scripting with AppMaker
---
when creating a new script, run `page_name.script("code")`.
- This creates a new script element. 
- Make sure to run this **before** any other element
---
Importing `clib` allows for the use of easy binding between elements and variables
- To bind an input to a variable, use the `bindto` and `bindtype` parameters as shown
```
page1.Input({
        id: "somebinder", //<-- name this whatever you want
        placeholder: "Enter some text!...", //not needed really
        bindto: "bindthing", //the variable name that it will be binded to
        bindtype: "variable" //bind as a variable type
})
```
However, this only supports one way bindings **and will return an error**
- This means that changing the variable's value **will not** update the value of the input field (two-way binding)
- This also means that the entire thing wont work because it relies on an unexisting method
- To fix this, you must create `bindthing` as an `onChange` class
- To do this, define `bindthing` as the following: `var bindthing = new onChange("action/text")`
- For a two-way binding, use: `var bindthing = new onChange("updateId(id, selector, action)")`
- This makes to so whenever bindthing is changed, it will run `updateId` (which is included in `clib`)
  - Change `id` to whatever element's Id you want to set (in this case "somebinder")
  - Change `selector` to whatever css selector you want (in this case "value")
  - Change `action` to whatever you want to set it to
**Note:** these must all be strings (e.g. below)
```
var action = "bindthing.value.split(' ').map((word) => word && '🍕').join(' ')" //seperate to help with one-line cramming
var bindthing = new onChange("updateId('sometext', 'innerHTML', action)") //all strings
```
If you want you action to be static (e.g. just set the text to "bob" whenever its changed), `action` must be a double-string
- This can be done with the following syntax: `var action = '"bob"'` <-- double quotes **of different types** 

A working snippet can be seen here
```
var fs = require('fs');
var clib = (`stuff`) // you need to import this, im not pasting it here because its too long
class UIview() //same here

var page1 = new UIview('site/index.html') //create the page

    page1.script( //include scripts
        `
        //var action = '"bob"' <-- example double-string
        var action = "bindthing.value.split(' ').map((word) => word && '🍕').join(' ')" //helps with cramming 
        var bindthing = new onChange("updateId('sometext', 'innerHTML', action)") // whenver bindthing is updated, update "sometext" by running "action" (above)
        
        `
    )

    page1.Input({ //create the input element
        id: "somebinder", //needed, but can be anything
        placeholder: "Enter some text!...",
        bindto: "bindthing", //bind to "bindthing" as the variable created at the top
        bindtype: "variable"
    })

    page1.Text({ //create the text that is going to be changed
        value: 'Change the input above ^^',
        id: 'sometext' //this id is important and is called by "bindthing" to be updated
    })

    page1.call() //"compile" the code into HTML
```
