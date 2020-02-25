class Interface {
    constructor() {
        this.buttonsHash = {}
    }

    buildButton(obj,bool,options) {

        let button = document.createElement('button');
        //-------------------------------------------------------------

        button.classList.add(obj.class)
        button.innerHTML = obj.name

        button.addEventListener('click', () => {    // for beauty we can take event from obj click or mousedown

            obj.callback(button,options);

        });

        if (!bool) {
            button.disabled = true
        }

        //-------------------------------------------------------------
        let m = document.getElementById('UIContainer')

        m.appendChild(button)

        this.buttonsHash[obj.name] = button

    }

    remove(name) {
console.log(name)
        this.buttonsHash[name].remove()
    }

    clearAllUI() {
        for (let i in this.buttonsHash) {
            this.buttonsHash[i].remove()
        }
    }
}

export { Interface };
