
import { Canv } from './canv.js'
import { Interface } from './ui.js'
import { Game } from './game.js'



class Client {
    constructor() {

        this.allPhases_CallbacksHash = {

            'firstPlayerRallyPhase': this.firstPlayerRallyPhase.bind(this),
            'secondPlayerRallyPhase': this.secondPlayerRallyPhase.bind(this),
            'firstPlayerPrepFirePhase': this.firstPlayerPrepFirePhase.bind(this),
            'firstPlayerMovementPhase': this.firstPlayerMovementPhase.bind(this)

        };

        // Next hash table is used by _buildMenuInterface() to find what buttons appropriate Phase needs
        //'End Rally' - what button, :bool - disabled or not . We can add any other bt-ns ('Rally All At Once''Choose Next To Rally')
        //dd
        this.phaseInterfaceMenuTable = {

            'firstPlayerRallyPhase': { 'End Phase': true },
            'secondPlayerRallyPhase': { 'End Opp"s Rally': true, 'Waitng For Opponents Rally': true },
            'firstPlayerPrepFirePhase': { 'End Phase': true },
            'firstPlayerMovementPhase': { 'End Phase': true },
        };

        this.interfaceScheme = {

            'End Phase': {
                'callback': this.endPhaseCallback.bind(this),
                'class': 'endPhase',
                'name': 'End Phase'
            },

            'End Opp"s Rally': {
                'callback': this.endOppsRallyCallback.bind(this),
                'class': 'EndOppsRally',
                'name': 'End Opp"s Rally'
            },

            'Waitng For Opponents Rally': {
                'callback': this.waitngForOpponentsRallyCallback.bind(this),
                'class': 'WaitngForOpponentsRally',
                'name': 'Waitng For Opponents Rally'
            },
        };

        this.canvasObj = new Canv();
        this.interface = new Interface();
        this.game = new Game()


    }

    init(options) {

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

        this.canvasObj.preloadAndDrawRondel('assets/turnphase.gif')

        // ------------- added 13 02 2020 ---------------------------

        this.game.setGamePhase(options.startingPhase)
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

    //-----------this callback is called when clicking on canvas on FPRPhase --------------------
    firstPlayerRallyPhase(options) {

        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPRPhase')
            return
        }
    };

    //-----------this callback is called when clicking on End Phase button --------------------

    endPhaseCallback(button) {

        console.log('pressed End Phase button')

        // 1 check what Phase now
        this.game.switchToNextPhase()

        let phase = this.game.getPhase()

        
        // --- is new Phase 'secondPlayerRallyPhase' ? In single Player variant it is same Phase as FPRP,so no Rondel Rotation
        if (phase == 'secondPlayerRallyPhase') {

            // ----  we don't need to Rotate Rondel , but  still need to  build new Menu
            this.interface.clearAllUI()

            // 3 Build appropriate MUI 
            this._buildMenuInterface(phase)
        }


        let newPhaseCallback = this.allPhases_CallbacksHash[phase]

        // --- is the new Phase any other ? ...
        if (phase != 'secondPlayerRallyPhase') {
            
            // ____ THIS IS VARIANT WITHOUT PROMISE !!!!_______________

            // -- order canvas to draw changes and cast forward a new Phase cb ot turn it on ending rotation
            //this.canvasObj._rotateTurnRondel(button,newPhaseCallback);

            // ____ ENDIN' PROMISELESS VARIANT !!!_____________________

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

    secondPlayerRallyPhase(options) {

        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in SPRPhase')
            return
        }
    }

    endOppsRallyCallback(button) {

        console.log('pressed End Opp"s Rally button')

        // at this moment we need just to launch Next Phase same as in End Phase Callback

        this.endPhaseCallback(button)
    }

    waitngForOpponentsRallyCallback(button) {
        console.log('DON"T TOUCH IT !!')
    }

    firstPlayerPrepFirePhase(options) {

        // ---------- does we clicked on empty space ?
        if (options.target == null) {
            console.log('clicked on empty space in FPPFPhase')
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
}

export { Client };
