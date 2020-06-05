import { move } from './move.js'
import { defenciveFF } from './defenciveFF.js'


let methods = {
    firstPlayerRallyPhase(options) {

        if (options.target == null) {
            return console.log('clicked on empty space in FPRPhase')
        }

        let counter = options.target.counter

        // if (counter.group) {
        //     counter.group._restoreObjectsState()

        //     this.canvasObj.canvas.remove(counter.group)
        //     return
        // }

        //let i = this.canvasObj.getImageByID(counter.getImageID())
        let i = counter.initialImg
        let t = this.canvasObj.createPhaseTextBox(i, 'PREP_FIRE')
        // //this.canvasObj.canvas.add(t);
        // let g = this.canvasObj.createGroup(...[i, t])

        // counter.group = g
        // this.canvasObj.canvas.add(g)
        counter.text = t
        options.target.add(t)
        this.canvasObj.canvas.requestRenderAll()

        this.clearCounterInterface().buildCUI(counter)._setCurrentCounterInterface(counter)
        return
    },

    secondPlayerRallyPhase(options) {

        if (options.target == null) {
            return console.log('clicked on empty space in SPRPhase')
        }
    },

    firstPlayerPrepFirePhase(options) {

        if (options.target == null) {
            return console.log('clicked on empty space in FPPFPhase')
        }

        // let counter = options.target.counter

        // if (counter.group) { // && group.type == 'attachedWeapon'

        //     let group = options.target.counter.group

        //     this.buildGUI(group)

        //     return
        // }

        // this.clearGroupUI()
        //----------------------------------------------------------------------------------------------------------------
        let absolutePointer = options.absolutePointer

        let counter = options.target.counter
        let stack = this.firingStack
        let firingStackStatus = this.getStackStatus(stack) // this.countersManipulator.getStack().getStackStatus

        switch (firingStackStatus) {

            case 'uncreated':

                if (!this._isClickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.firstPlayer)) {
                    return console.log('u click not your counter')
                }

                stack = this.createNewFStack('readyToFire')
                this.firingStack = stack

                if (counter.group) { // && group.type == 'attachedWeapon'
                    let group = options.target.counter.group
                    this.buildGUI(group, stack)
                    return
                }

                this.addingToFireStack(counter, stack)
                //stack.addToFiringStack(counter)
                // stack.addToGeneralCountersArray(counter)
                // stack.setHex_countersArray(counter.ownHex,counter)

                // this.changeColorOfBorder(counter, "red")

                // this.clearGroupUI()

                break;

            case 'readyToFire':

                // if (!this._isLegalTargetToAddToFiringStack(options.target)) {   //already added
                //     return
                // }

                if (!this._isClickedCounterOwnerIsSameAsPhaseOwner(options.target.counter, this.firstPlayer)) {
                    // stack.calculateCommanderBonus()
                    // stack.setCommanderCover()
                    this.fireProcessing(absolutePointer, stack)
                    return
                }

                if (counter.group) { // && group.type == 'attachedWeapon'
                    this.clearGroupUI()
                    let group = options.target.counter.group
                    this.buildGUI(group, stack)
                    return
                }

                if (this._isCounterInStack(counter, stack)) {
                    return console.log('selected counter is already in Moving Group')
                }

                if (!this._isCounterNearStack(counter, stack)) {
                    return console.log('selected counter not near or in stack')
                }

                this.addingToFireStack(counter, stack)
                // if (counter.getType() == 'SingleManCounter' && stack._isHex_CountersArrayEmpty(hex)){
                //     return console.log('u cannot add SMC to FG without MMC or Weapon')
                // }

                // if (counter.getType() == 'SingleManCounter') {
                //     stack.setHex_Bonus(counter.ownHex,counter.commandBonus)
                // }

                // stack.addToGeneralCountersArray(counter)
                // stack.setHex_countersArray(counter.ownHex,counter)

                // this.changeColorOfBorder(counter, "red")

                // this.clearGroupUI()

                // this.fireProcessing // fireSquadProcess
                break;
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