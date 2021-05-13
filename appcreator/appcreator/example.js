const UIview = require('./UIview.js');

//add var binding
//-----------------site---------------

var page1 = new UIview('site/index.html')

    page1.script(
        `
        var bindthing = new onChange("updateId('sometext', 'innerHTML', 'bindthing.value')")
        
        `
    )

    page1.Text({
        value: 'Hello World!',
    })

    page1.Input({
        id: "somebinder",
        placeholder: "Enter some text!...",
        bindto: "bindthing",
        bindtype: "variable"
    })

    page1.Text({
        value: 'Change the input above ^^',
        id: 'sometext'
    })

    page1.Button({
        view: page1.Text({
            dummy: true,
            value: "Ooh a Button!"
        }),
        action: "console.log('hi!');"
    })

    page1.Link({
        view: page1.Text({
            dummy: true,
            value: "hmmm. An epic link?"
        }),
        address: "page2.html"
    })

    page1.call({ debug: false })

//page2
var page2 = new UIview('site/page2.html')

    page2.Text({
        value:"Woah 😳... An image as A link/button?!"
    })

    page2.Link({
        view: page2.Image({
            dummy: true,
            address: "assets/fboy.jpg"
        }),
        address: "index.html"
    })

    page2.call({ debug: false })



