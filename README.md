# AppMaker v1.1
##### A sort-of ReactNative/SwiftUI type library for Web Apps. (WIP)
##### Also see [this](https://github.com/FISHARMNIC/AppMaker/blob/main/Learn.md)
---
#### How To Import
- Download `UIview.js`
- Supposing it's in the same directory: `const UIview = require('./UIview.js');`
#### How to Use
##### Creating pages
``` 
var page_name = new UIview("page_source") 
```
###### Creates the new page at local file page_source
--- 
All Types of Elements
``` 
page_name.Text({
  value: string,
  id?: string,
  dummy?: bool,
})

page_name.Input({
  value: string,
  id: string,
  placeholder?: string,
  bindto?: string,
  bindtype: string,
  dummy?: bool,
})

page_name.Button({
  view: string,
  action: string,
  actionIsString?: bool,
  dummy?: bool,
})

page_name.Link({
  view: string,
  address: string,
  dummy?: bool,
})

page_name.Image({
  address: string,
  width?: string,
  height?: string,
  dummy?: bool,
})

page_name.script("code") 

page_name.call({debug? = false})
```
### value
---
The value of the defualt text (e.g. "John Doe")

### id
---
The name of the element for binding (e.g. "myelement")

### placeholder
---
The input placeholder (grayed-out background text) (e.g. "Type in here!")

### bindto
---
The id of the element to be binded to (e.g. "myelement")
OR the variable (explained later)

### bindtype
---
The CSS selector of the element to bindto (only used if you have also set bindto) (e.g. "innerHTML" or "value")
OR the variable name (explained later)

### dummy
---
If either you want the element as a view or not 
e.g.
```
page1.Button({
        view: page1.Text({
            dummy: true, //<--- important
            value: "Ooh a Button!" 
        }),
        action: "console.log('hi!');",
        actionIsString: true
    })
```
### view
---
The imported element to be used for buttons and links (e.g. `my_page.Text({value = "click me!", dummy = true})`)

### action
---
The action to be done on button click (e.g. `console.log('hello');`)

### address
---
On an Image: image link (e.g. "assets/chicken.png")
On a Link: the link adress (e.g. "pages/site2.html")

### width and height
---
The image size in pixels (e.g."100" and "50")

## Running
---
use `my_page.call({debug = false})`

## Ok so thats all just the facade, but what if I want to do more?
---
### Binding
---
To create a bindable variable, use the class onChange("run")
To change the value use var.set("value")

Example script:
```
page1.script( //includes the script (do this at the beginning)
        `
        var bindthing = new onChange("updateId('sometext', 'innerHTML', 'bindthing.value')")
        // creates a variable called "bindthing". When bindthing changes, run updateId (defined in the library) with the parameters
        //id:sometext
        //selector: innerHTML
        //updateto: bindthing.value
        //Basically, whenever whatever is binded to 'bindthing' is changed, the element with id: 'sometext' is changed to its value.
        `
    )
```
---
Some people may know the [React Native "Pizza Translator" equivalent](https://reactnative.dev/docs/handling-text-input). Here is a working duplicate
```
//include stuff

var page1 = new UIview('site/index.html')

    page1.script(
        `
        var action = "bindthing.value.split(' ').map((word) => word && '🍕').join(' ')" //create a variable so that its not all crammed
        var bindthing = new onChange("updateId('sometext', 'innerHTML', action)") //when I change, translate and set the result to the Element w/ Id "sometext"
        `
    )

    page1.Input({
        id: "somebinder",
        placeholder: "Enter some text!...",
        bindto: "bindthing", //when I'm changed, set the variable 'bindthing's value to my value
        bindtype: "variable"
    })

    page1.Text({
        value: 'Change the input above ^^',
        id: 'sometext' //changes this
    })

    page1.call({ debug: false })
```

