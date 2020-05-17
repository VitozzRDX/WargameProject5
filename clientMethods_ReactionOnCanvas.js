import { move } from './move.js'
import { defenciveFF } from './defenciveFF.js'

let methods = {
    firstPlayerRallyPhase(options) {
        // let absolutePointer = options.absolutePointer
        // let targetHex = this.map.getHexFromCoords(absolutePointer)
        // // let t = JSON.stringify(targetHex)
        // // console.log(t)
        // // console.log(this.map.hex_hexTypeHash[t])

        // console.log(this.map.getHexType(targetHex))
        if (options.target == null) {
            return console.log('clicked on empty space in FPRPhase')
        }

        let counter = options.target.counter
        this.clearCounterInterface().buildCUI(counter)._setCurrentCounterInterface(counter)
        return
    },

    secondPlayerRallyPhase(options) {

        if (options.target == null) {
            return console.log('clicked on empty space in SPRPhase')
        }
    },

    firstPlayerPrepFirePhase(options) {
        console.log(options.target)
        if (options.target == null) {
            return console.log('clicked on empty space in FPPFPhase')
        }



        if (options.target.counter.group) { // && group.type == 'attachedWeapon'
            //console.log('group',options.target.counter.group)

            // options.target.counter.group._restoreObjectsState()

            // this.canvasObj.canvas.remove(options.target.counter.group)

            // options.target.counter.group._restoreObjectsState()

            // this.canvasObj.canvas.remove(options.target.counter.group)

            // this.changeColorOfBorder(options.target.counter, 'red')

            // console.log(options.target)

            // let button = document.createElement('button');
            // button.classList.add('AddSquadToFG')
            // button.innerHTML = 'Add Squad To Fire Group'

            // button.style.top = options.target.counter.group.top - 100 + 'px';
            // button.style.left = options.target.counter.group.left - 105+ 'px';

            // button.addEventListener('click', () => {    // for beauty we can take event from obj click or mousedown
            //     button.disabled = true
            //     this.changeColorOfBorder(options.target.counter, 'red')
            // });

            // document.getElementById('UIContainer').appendChild(button)

            // let button2 = document.createElement('button');
            // button2.classList.add('AddSquadToFG')
            // button2.innerHTML = 'Add Weapon To Fire Group'

            // button2.style.top = options.target.counter.group.top - 100 + 'px';
            // button2.style.left = options.target.counter.group.left + 'px';

            // document.getElementById('UIContainer').appendChild(button2)

//---------------------------------------------------------------------------------------------------------------------------------------
            let counter = options.target.counter
            let group = options.target.counter.group
            
            this.buildGUI(group)

            let scheme
            let btton = this.interface.buildButton({
                'class':'AddSquadToFG',
                'name':'Add Squad To Fire Group',
                'callback':()=>{
                    btton.disabled = true
                    this.changeColorOfBorder(options.target.counter, 'red')
                }
            },true,counter)    //(obj,bool,options) 

            btton.style.top = options.target.counter.group.top - 100 + 'px';
            btton.style.left = options.target.counter.group.left - 105+ 'px';
        }
    },



    firstPlayerAdvFirePhase(options) {

        if (options.target == null) {
            return console.log('clicked on empty space in FPAFPhase')
        }
    },

    firstPlayerRoutPhase(options) {
        if (options.target == null) {
            return console.log('clicked on empty space in FPRtPhase')
        }
    },

    secondPlayerRoutPhase(options) {
        if (options.target == null) {
            return console.log('clicked on empty space in SPRtPhase')
        }
    },

    firstPlayerAdvancePhase(options) {
        if (options.target == null) {
            return console.log('clicked on empty space in FPAPhase')
        }
    },

    firstPlayerCloseCombatPhase(options) {
        if (options.target == null) {
            return console.log('clicked on empty space in FPCCPhase')
        }
    },

    secondPlayerDefenciveFirePhase(options) {

        if (options.target == null) {
            return console.log('clicked on empty space in SPDFPhase')
        }
    },

    defenciveFirstFirePhase(options) {
        if (options.target == null) {
            return console.log('defenciveFirstFirePhase')
        }
    },
}

Object.assign(methods, move, defenciveFF)
export { methods };