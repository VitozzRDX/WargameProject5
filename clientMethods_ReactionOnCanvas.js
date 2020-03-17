import { move } from './move.js'

let methods = {
    firstPlayerRallyPhase(options) {

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

        if (options.target == null) {
            return console.log('clicked on empty space in FPPFPhase')
        }
    },

    secondPlayerDefenciveFirePhase(options) {

        if (options.target == null) {
            return  console.log('clicked on empty space in SPDFPhase')
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
}

Object.assign(methods, move)
export { methods };