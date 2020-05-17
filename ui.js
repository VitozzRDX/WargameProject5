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
        console.log('g')
        return button

    }

    remove(name) {
        //console.log(name)
        if(!this.buttonsHash[name]) {
            return console.log('There is no such button on screen as',name)
        }
        this.buttonsHash[name].remove()
    }

    clearAllUI() {
        console.log(this.buttonsHash)
        for (let i in this.buttonsHash) {
            //console.log(i)
            this.buttonsHash[i].remove()
        }
    }

    clickOn(name) {
        let event = new Event("click")
        this.buttonsHash[name].dispatchEvent(event)
    }

    disableButton(name){
        this.buttonsHash[name].disabled = true
    }

    enableButton(name){
        this.buttonsHash[name].disabled = false
    }

    clearUI(name) {


        
            this.buttonsHash[name].remove()

    }

    isDisabled(name) {
        return this.buttonsHash[name].disabled
    }

}

export { Interface };
