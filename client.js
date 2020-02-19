
import { Canv } from './canv.js'
import { Interface } from './ui.js'
import { Game } from './game.js'



class Client {
    constructor() {

        this.allPhases_CallbacksHash = {

            'firstPlayerRallyPhase': this.firstPlayerRallyPhase.bind(this),
            'secondPlayerRallyPhase': this.secondPlayerRallyPhase.bind(this),
            'firstPlayerPrepFirePhase': this.firstPlayerPrepFirePhase.bind(this),
            'firstPlayerMovementPhase': this.firstPlayerMovementPhase.bind(this),
            'secondPlayerDefenciveFirePhase': this.secondPlayerDefenciveFirePhase.bind(this),
            'firstPlayerAdvFirePhase': this.firstPlayerAdvFirePhase.bind(this),
            'firstPlayerRoutPhase': this.firstPlayerRoutPhase.bind(this),
            'secondPlayerRoutPhase': this.secondPlayerRoutPhase.bind(this),
            'firstPlayerAdvancePhase': this.firstPlayerAdvancePhase.bind(this),
            'firstPlayerCloseCombatPhase': this.firstPlayerCloseCombatPhase.bind(this),


            'secondPlayerRallyPhaseHalfTurn': this.secondPlayerRallyPhaseHalfTurn.bind(this),
            'firstPlayerRallyPhaseHalfTurn': this.firstPlayerRallyPhaseHalfTurn.bind(this),
            'secondPlayerPrepFirePhase': this.secondPlayerPrepFirePhase.bind(this),
            'secondPlayerMovementPhase': this.secondPlayerMovementPhase.bind(this),
            'firstPlayerDefenciveFirePhase': this.firstPlayerDefenciveFirePhase.bind(this),
            'secondPlayerAdvFirePhase': this.secondPlayerAdvFirePhase.bind(this),
            'secondPlayerRoutPhaseHalfTurn': this.secondPlayerRoutPhaseHalfTurn.bind(this),
            'firstPlayerRoutPhaseHalfTurn': this.firstPlayerRoutPhaseHalfTurn.bind(this),
            'secondPlayerAdvancePhase': this.secondPlayerAdvancePhase.bind(this),
            'secondPlayerCloseCombatPhase': this.secondPlayerCloseCombatPhase.bind(this),
        };

        // Next hash table is used by _buildMenuInterface() to find what buttons appropriate Phase needs
        //'End Rally' - what button, :bool - disabled or not . We can add any other bt-ns ('Rally All At Once''Choose Next To Rally')

        this.phaseInterfaceMenuTable = {

            'firstPlayerRallyPhase': { 'End Phase': true },
            'secondPlayerRallyPhase': { 'End Opp"s Rally': true, 'Waitng For Opponents Rally': true },
            'firstPlayerPrepFirePhase': { 'End Phase': true },
            'firstPlayerMovementPhase': { 'End Phase': true },
            'secondPlayerDefenciveFirePhase': { 'End Opp"s DFPh': true, 'Waitng For Opponents DF': true },
            'firstPlayerAdvFirePhase': { 'End Phase': true },
            'firstPlayerRoutPhase': { 'End Phase': true },
            'secondPlayerRoutPhase': { 'End Opp"s Rout': true, 'Waitng For Opponents Rout': true },
            'firstPlayerAdvancePhase': { 'End Phase': true },
            'firstPlayerCloseCombatPhase': { 'End Phase': true },

            'secondPlayerRallyPhaseHalfTurn': { 'End Phase': true },
            'firstPlayerRallyPhaseHalfTurn': { 'End Opp"s Rally': true, 'Waitng For Opponents Rally': true },
            'secondPlayerPrepFirePhase': { 'End Phase': true },
            'secondPlayerMovementPhase': { 'End Phase': true },
            'firstPlayerDefenciveFirePhase': { 'End Opp"s DFPh': true, 'Waitng For Opponents DF': true },
            'secondPlayerAdvFirePhase': { 'End Phase': true },
            'secondPlayerRoutPhaseHalfTurn': { 'End Phase': true },
            'firstPlayerRoutPhaseHalfTurn': { 'End Opp"s Rout': true, 'Waitng For Opponents Rout': true },
            'secondPlayerAdvancePhase': { 'End Phase': true },
            'secondPlayerCloseCombatPhase': { 'End Phase': true },
        };

        // ----- Here we store all buttons callback that we got --------------------------

        //let name = 'Ally'
        //let name2 = 'Nazi'

        this.fistPlayer = undefined;
        this.secondPlayer = undefined;

        this.canvasObj = new Canv();
        this.interface = new Interface();
        this.game = new Game()


    }
    // ---------------- added 19 02 2020 ------------------
    firstPlayerRallyPhaseHalfTurn(options) {
        if (options.target == null) {
            console.log('clicked on empty space in SPDFPhase')
            return
        }
    };

    secondPlayerPrepFirePhase(options) {
        if (options.target == null) {
            console.log('clicked on empty space in SPDFPhase')
            return
        }
    };

    secondPlayerMovementPhase(options) {
        if (options.target == null) {
            console.log('clicked on empty space in SPDFPhase')
            return
        }
    };

    firstPlayerDefenciveFirePhase(options) {
        if (options.target == null) {
            console.log('clicked on empty space in FPDFPhase')
            return
        }
    };

    secondPlayerAdvFirePhase(options) {
        if (options.target == null) {
            console.log('clicked on empty space in SPDFPhase')
            return
        }
    };

    secondPlayerRoutPhaseHalfTurn(options) {
        if (options.target == null) {
            console.log('clicked on empty space in SPDFPhase')
            return
        }
    };

    firstPlayerRoutPhaseHalfTurn(options) {
        if (options.target == null) {
            console.log('clicked on empty space in SPDFPhase')
            return
        }
    };

    secondPlayerAdvancePhase(options) {
        if (options.target == null) {
            console.log('clicked on empty space in SPDFPhase')
            return
        }
    };

    secondPlayerCloseCombatPhase(options) {
        if (options.target == null) {
            console.log('clicked on empty space in SPDFPhase')
            return
        }
    };

    switchPlayers() {
        let temp;
        temp = this.firstPlayer;
        this.firstPlayer = this.secondPlayer;
        this.secondPlayer = temp
    }
    setInterfaceScheme() {
        this.interfaceScheme = {

            'End Phase': {
                'callback': this.endPhaseCallback.bind(this),
                'class': 'endPhase',
                'name': `End ${this.firstPlayer}'s Phase`
            },

            'End Opp"s Rally': {
                'callback': this.endOppsRallyCallback.bind(this),
                'class': 'EndOppsRally',
                'name': `End ${this.secondPlayer}'s Rally`
            },

            'Waitng For Opponents Rally': {
                'callback': this.waitngForOpponentsRallyCallback.bind(this),
                'class': 'WaitngForOpponentsRally',
                'name': `Waitng For ${this.secondPlayer}'s Rally`
            },

            'Waitng For Opponents DF': {
                'callback': this.waitngForOpponentsRallyCallback.bind(this),
                'class': 'WaitngForOpponentsRally', // 'WaitngForOpponentsDF',
                'name': `Waitng For ${this.secondPlayer}'s DF`
            },

            'End Opp"s DFPh': {
                'callback': this.endOppsDFPhCallback.bind(this),
                'class': 'EndOppsDFPh',
                'name': `End ${this.secondPlayer}'s DFPh`
            },

            'End Opp"s Rout': {
                'callback': this.endOppsRoutCallback.bind(this),
                'class': 'EndOppsRout',
                'name': `End ${this.secondPlayer}'s Rout`
            },

            'Waitng For Opponents Rout': {
                'callback': this.waitngForOpponentsRallyCallback.bind(this),
                'class': 'WaitngForOpponentsRally',//'WaitngForOpponentsRout',
                'name': `Waitng For ${this.secondPlayer}'s Rout`
            },

        };
    }
    init(options) {

        this.firstPlayer = options.firstPlayer
        this.secondPlayer = options.secondPlayer

        this.setInterfaceScheme()
        // let's set starting Phase . Because it is Single Player variant there will be all phases one by one
        // But in full version all Phases will go in parallel . So despite of same names they will be absolutely different

        // let's process options , that we got from Main and build a Visual, Interface, and Reaction according to it

        let startingPhaseTitle = options.startingPhase

        // now we got only Starting Phase title. We will build everything from it
        // in later versions we'll also get set of Counters with its coordinates, accessories, e.t.c

        // first let's set a Reaction on click on not Interface objects that are on Canvas (callbacks for mouse click on Canvas) 

        let callback = this._getCallbackForMouseClickOnCanvasBy(startingPhaseTitle)

        this._removeAllCallbacksOffCanvasAndSetNew(callback)

        // then let's build appropriate UI to control Phase switching

        this._buildMenuInterface(startingPhaseTitle)

        // our Interface's module buildMenuButton(x,y,...,z) should get those things :
        // where to place , how to look , what to do and be disabled or not
        // 
        // and finally we need to draw a Rondel with appropriate Angle

        //this.canvasObj.preloadAndDrawRondel('assets/turnphase.gif')
        //this.canvasObj.setOtherSidePictureSrc(options.otherSidePictureSrc)

        this.canvasObj.setSidePicturesSrc(options.startingSidePictureSrc, options.otherSidePictureSrc)
        this.canvasObj.preloadAndDrawRondel2('assets/turnphase.gif')

        // ------------- added 13 02 2020 ---------------------------

        this.game.setGamePhase(options.startingPhase)
        // ---------------- 18 02 2020

        // let startingSidePictureSrc = options.startingSidePictureSrc

        // this.canvasObj.drawSidePicture(startingSidePictureSrc)
    };



    // phaseInterfaceMenuTable - what buttons must be in every Phase, and are they disabled or not
    // interfaceScheme - what properties every buttons has (class,cb.name)
    _buildMenuInterface(phaseTitle) {

        // get  object 'sheme' from phaseInterfaceMenuTable like {End Phase:true,...}

        let scheme = this.phaseInterfaceMenuTable[phaseTitle]

        // if there are several names in this object let's build a button for every one of them
        for (let name in scheme) {

            let result = scheme[name];
            // we need a set of propertires for every button like class, callback , and name that it got . We'll get it from interfaceScheme
            this.interface.buildButton(this.interfaceScheme[name], result)
        }
    };




    _getCallbackForMouseClickOnCanvasBy(phaseTitle) {

        return this.allPhases_CallbacksHash[phaseTitle]

    }

    _removeAllCallbacksOffCanvasAndSetNew(callback) {
        this.canvasObj.setOffMouseClickListener();
        this.canvasObj.setMouseClickListener(callback)
    };

    //-----------this callback is called when clicking on End Phase button --------------------

    endPhaseCallback(button) {

        console.log('called End Phase ')

        // 1 check what Phase now
        this.game.switchToNextPhase()

        let phase = this.game.getPhase()    // rename to newPhase

        console.log('New phase :', phase)


        let newPhaseCallback = this.allPhases_CallbacksHash[phase]

        // --- does we get to opponent"s Half Turn ? ---------

        if (phase == 'secondPlayerRallyPhaseHalfTurn' || phase == 'firstPlayerRallyPhase') {

            this.switchPlayers()
            this.setInterfaceScheme()
            this.canvasObj._flipSidePicture()
        }

        // --- is new Phase 'secondPlayerRallyPhase' ? In single Player variant it is same Phase as FPRP,so no Rondel Rotation
        if (phase == 'secondPlayerRallyPhase' || phase == 'secondPlayerRoutPhase' || phase == 'firstPlayerRallyPhaseHalfTurn'
            || phase == 'firstPlayerRoutPhaseHalfTurn') {

            this.canvasObj.setOffMouseClickListener()

            this.canvasObj.setMouseClickListener(newPhaseCallback);
            // ----  we don't need to Rotate Rondel , but  still need to  build new Menu
            this.interface.clearAllUI()

            // 3 Build appropriate MUI 
            this._buildMenuInterface(phase)
        }

        // --- is the new Phase any other ? ...


        else {

            // ---- ... let'start asinchronous animation of Rondel Rotation

            let p = this.canvasObj._rotateTurnRondel2(button);
            // --- and after completion set apropriate cb and build appropriate MUI
            p.then(() => {

                this.canvasObj.setMouseClickListener(newPhaseCallback);

                this.interface.clearAllUI()

                this._buildMenuInterface(phase)

            })


        }
    };

    // ----------  added 13 02 2020 -------------------------


    endOppsRallyCallback(button) {

        console.log('pressed End Opp"s Rally button')

        // at this moment we need just to launch Next Phase same as in End Phase Callback

        this.endPhaseCallback(button)
    }

    waitngForOpponentsRallyCallback(button) {
        console.log('DON"T TOUCH IT !!')
    }

    // --------  All Phases Canvas Callbacks ---------------------------------------------------

    firstPlayerRallyPhase(options) {

        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPRPhase')
            return
        }
    };

    firstPlayerPrepFirePhase(options) {

        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPPFPhase')
            return
        }
    }


    secondPlayerRallyPhase(options) {

        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in SPRPhase')
            return
        }
    }

    firstPlayerMovementPhase(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPMPhase')
            return
        }
    }
    // --------------------- added 17 02 2020
    endOppsDFPhCallback(button) {

        console.log('pressed End Opp"s DF button')

        // at this moment we need just to launch Next Phase same as in End Phase Callback

        this.endPhaseCallback(button)
    }

    endOppsRoutCallback(button) {

        console.log('pressed End Opp"s Rout button')

        // at this moment we need just to launch Next Phase same as in End Phase Callback

        this.endPhaseCallback(button)
    }



    secondPlayerDefenciveFirePhase(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in SPDFPhase')
            return
        }
    }

    firstPlayerAdvFirePhase(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPAFPhase')
            return
        }
    }

    firstPlayerRoutPhase(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPRtPhase')
            return
        }
    }

    secondPlayerRoutPhase(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in SPRtPhase')
            return
        }
    }

    firstPlayerAdvancePhase(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPAPhase')
            return
        }
    }

    firstPlayerCloseCombatPhase(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPCCPhase')
            return
        }
    };

    secondPlayerRallyPhaseHalfTurn(options) {
        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in SPCCPhase')
            return
        }
    }

}

export { Client };
