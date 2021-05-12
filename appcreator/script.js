var fs = require('fs');
var clib = (`
    class onChange {
        constructor(exec) {
            this.action = exec
            this.value = ""
        }

        set(val) {
            this.value = val
            eval.call(window, this.action)
        }
    }

    function updateId(id, selection, val) {
        console.log(eval(val))
        //console.log("id " + \`document.getElementById(\"\${id}\").\${selection} = \"\${eval(val)}\"\`)
        eval(\`document.getElementById(\"\${id}\").\${selection} = \"\${eval(val)}\"\`)
    }
`) //copy paste this
class UIview { //and the entire following class

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

    Input({ value = ' ', placeholder = '', bindto = '', bindtype = '', id, dummy = false }) {
        var ret = `<input id="${id}" value="${value}" placeholder="${placeholder}"`

        if (bindto != '') {

            ret += ` onchange="update${this.functionCount}()"`
            if (bindtype != 'variable') {
                
                this.allScript.push(`
                    function update${this.functionCount}() {
                        document.getElementById("${bindto}").${bindtype} = document.getElementById("${id}").value
                    }
                `)

            } else {

                this.allScript.push(`
                    function update${this.functionCount}() {
                        ${bindto}.set(document.getElementById("${id}").value)
                    }
                `)

            }
            this.functionCount += 1
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

    // newVar({name, value = ''}) {
    //     var ret = `var ${name}`
    //     if (value != '') ret += ` = '${value}'`
    //     this.allScript.unshift(ret)
    // }

    script(code) {
        this.allScript.push(code)
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
                ${clib}
                ${this.allScript.join(' ')}
                </script>
            `, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
    }
}

//add var binding
//-----------------site---------------

var page1 = new UIview('site/index.html')

    page1.script(
        `
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

    page1.call({ debug: false })



