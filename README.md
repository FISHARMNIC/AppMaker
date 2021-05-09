# AppMaker
##### A sort-of ReactNative/SwiftUI type library for Web Apps. (WIP)
---
#### How To Import
- copy & paste the class UIview into your js file
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

pame_name.call({debug? = false})
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

### bindtype
---
The CSS selector of the element to bindto (only used if you have also set bindto) (e.g. "innerHTML" or "value")

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
On a Link: the link adress (e.g. "pages/site2.hmtml")

### width and height
---
The image size in pixels (e.g."100" and "50")
