const UIview = require('./UIview.js');

var page = new UIview('site/index.html')

    page.script(function(){
        var action = "bindthing.value.split(' ').map((word) => word && '🍕').join(' ')"
        var bindthing = new onChange("updateId('sometext', 'innerHTML', action)")
    })

    page.Input({
        id: "somebinder",
        placeholder: "Enter some text!...",
        bindto: "bindthing",
        bindtype: "variable"
    })

    page.Text({
        value: 'Change the input above ^^',
        id: 'sometext',
    })

    page.call()