var fs = require('fs');

class UIview {

    constructor(name) {
        this.fName = name
        this.allElements = []
        this.allScript = []
        this.functionCount = 0
    }

    Text({ value, id = '', dummy = false }) {
        var ret = `<p> ${value} </p>`

        if (id != '') {
            ret = `<p id="${id}"> ${value} </p>`
        }

        if (dummy) return ret

        this.allElements.push(ret)
    }

    Input({ value = '', placeholder = '', bindto = '', bindtype = '', id, dummy = false }) {
        var ret = `<input id="${id}" value="${value}" placeholder="${placeholder}"`

        if (bindto != '') {
            ret += ` onchange="update${this.functionCount}()"`
            this.allScript.push(`
                function update${this.functionCount}() {
                    document.getElementById("${bindto}").${bindtype} = document.getElementById("${id}").value
                }
            `)
        }

        ret += '></input>'

        if (dummy) return ret

        this.allElements.push(ret)
    }

    Button({ view, action, dummy = false, actionIsString = true }) {
        var ret = `<button onclick="(function() {${action}})();"> ${view} </button>`

        if (!actionIsString) {
            //do something
        }

        if (dummy) return ret

        this.allElements.push(ret)
    }

    Link({view, address, dummy = false}) {
        var ret = `<a href="${address}"> ${view} </a>`

        if (dummy) return ret

        this.allElements.push(ret)
    }

    Image({address, width = '50', height = '50', dummy = false}) {
        var ret = `<img src="${address}" width="${width}" height="${height}"></img>`

        if (dummy) return ret

        this.allElements.push(ret)
    }

    call({ debug = false }) {
        if (debug) {
            console.log('```````````````')
            this.allElements.forEach(element => console.log(element))
            console.log('<script>')
            this.allScript.forEach(element => console.log(element))
            console.log('</script>')
            console.log('```````````````')
        }

        else {
            fs.writeFileSync(`${this.fName}`, `
                ${this.allElements.join(' ')}
                <script>
                ${this.allScript.join(' ')}
                </script>
            `, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
    }
}

//-----------------site---------------

var page1 = new UIview('site/index.html')

    page1.Text({
        value: 'Hello World!',
    })

    page1.Input({
        id: "somebinder",
        placeholder: "Enter some text!...",
        bindto: "sometext",
        bindtype: "innerHTML"
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
        action: "console.log('hi!');",
        actionIsString: true
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



