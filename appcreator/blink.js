const UIview = require('./UIview.js')

let page = new UIview('site/index.html')

    page.script(function(){
        var profile_handle = 0  //create a handle for dealing with multiple blinking objects
        var blink_states = []   //the states for each blinking object

        function create_blink(id,speed) { //initializer
            blink_states.push(false) //create a new "user" (blink object)
            setInterval(function(){return blink(id,profile_handle)},speed); //run blink every "speed" seconds
            profile_handle += 1
        }

        function blink(el_id,profile) {
            blink_states[profile] = !(blink_states[profile]) //toggle the state of the object
            document.getElementById(el_id).hidden = blink_states[profile] //set the view/hide property accordingly
        }

        create_blink("sometext",500)
    })

    page.Text({
        value: "blinking text",
        id: "sometext",
    })

    page.call()