const UIview = require('./UIview.js');

//add var binding
//-----------------site---------------

var page1 = new UIview('site/index.html')

    page1.script(
        `
        //var action = '"bob"'
        var action = "bindthing.value.split(' ').map((word) => word && '🍕').join(' ')"
        var bindthing = new onChange("updateId('sometext', 'innerHTML', action)")
        
        `
    )

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

    page1.call()