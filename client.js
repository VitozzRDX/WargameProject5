
import { Canv } from './canv.js'
import { Interface } from './ui.js'
import { Game } from './game.js'

import { methods } from './clientMethods_ReactionOnCanvas.js'
import { Counter, ManCounters } from './counters.js'


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


            // 'secondPlayerRallyPhaseHalfTurn': this.secondPlayerRallyPhaseHalfTurn.bind(this),
            // 'firstPlayerRallyPhaseHalfTurn': this.firstPlayerRallyPhaseHalfTurn.bind(this),
            // 'secondPlayerPrepFirePhase': this.secondPlayerPrepFirePhase.bind(this),
            // 'secondPlayerMovementPhase': this.secondPlayerMovementPhase.bind(this),
            // 'firstPlayerDefenciveFirePhase': this.firstPlayerDefenciveFirePhase.bind(this),
            // 'secondPlayerAdvFirePhase': this.secondPlayerAdvFirePhase.bind(this),
            // 'secondPlayerRoutPhaseHalfTurn': this.secondPlayerRoutPhaseHalfTurn.bind(this),
            // 'firstPlayerRoutPhaseHalfTurn': this.firstPlayerRoutPhaseHalfTurn.bind(this),
            // 'secondPlayerAdvancePhase': this.secondPlayerAdvancePhase.bind(this),
            // 'secondPlayerCloseCombatPhase': this.secondPlayerCloseCombatPhase.bind(this),
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

            // 'secondPlayerRallyPhaseHalfTurn': { 'End Phase': true },
            // 'firstPlayerRallyPhaseHalfTurn': { 'End Opp"s Rally': true, 'Waitng For Opponents Rally': true },
            // 'secondPlayerPrepFirePhase': { 'End Phase': true },
            // 'secondPlayerMovementPhase': { 'End Phase': true },
            // 'firstPlayerDefenciveFirePhase': { 'End Opp"s DFPh': true, 'Waitng For Opponents DF': true },
            // 'secondPlayerAdvFirePhase': { 'End Phase': true },
            // 'secondPlayerRoutPhaseHalfTurn': { 'End Phase': true },
            // 'firstPlayerRoutPhaseHalfTurn': { 'End Opp"s Rout': true, 'Waitng For Opponents Rout': true },
            // 'secondPlayerAdvancePhase': { 'End Phase': true },
            // 'secondPlayerCloseCombatPhase': { 'End Phase': true },
        };

        this.fistPlayer = undefined;
        this.secondPlayer = undefined;

        this.canvasObj = new Canv();
        this.interface = new Interface();
        this.game = new Game()

        this.counterTable = {
            'Counter': Counter,
            'ManCounters': ManCounters
        }


        this.squadType_propertiesHash = {               // refactor we should get table from server with squadTypes only for Scenario
            'ruSquadE-0': {                             // refactor to array ?
                src: 'assets/ru628S.gif',
                otherSideSrc: 'assets/ruh7b.gif',
                className: 'ManCounters',
            },

            'geSquadE-0': {
                src: 'assets/ge467S.gif',
                otherSideSrc: 'assets/geh7b.gif',
                className: 'ManCounters',
            },
        }
    }

    // ---------------- added 19 02 2020 ------------------
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

        this.game.setGamePhase(options.startingPhase)

        // ---------------- 20 02 2020
        // let arr = ['assets/ge467S.gif','assets/geh7b.gif','assets/ru628S.gif','assets/ruh7b.gif']
        // this.canvasObj.preloadAndDraw(arr)

    //----------------------- added 21 02 2020
        //this.canvasObj.preloadAndDrawBackground(options.mapSrc,{top:0,left:0})
        //this._createAndDrawCounters(options.countersOptions)


    // -------- Loading Creating and Drawing Background and Counters
        let p = this.canvasObj.creatingPromise(options.mapSrc)
        p.
        then(()=>{
            this.canvasObj.draw(p,{top:0,left:0,evented:false,selectable: false,})
        }).
        then(()=>{
            this._createAndDrawCounters(options.countersOptions)
        })

        


    };
    //-----------added 20 20 2020----------------------------------------------------------

    _createAndDrawCounters(countersOptions) {  //setOfOptionsforCounters

        let parametersOnCreationHash = countersOptions.parametersOnCreationHash

        for (let i in parametersOnCreationHash) {

            let arrayOfCoords = parametersOnCreationHash[i]

            arrayOfCoords.forEach((obj) => {
      
                let ops = countersOptions.squadType_propertiesHash[i] // { src: "assets/ge467S.gif", otherSideSrc: "assets/geh7b.gif", className: "ManCounters" }
                ops.options = obj       // { top: 100, left: 100 }
                let className = ops['className']

                let c = this.createCounterObject(className, ops) //{ src: src, options: options, otherSideSrc: otherSideSrc }
                this.drawCounter(c)
                //this.addToCounterTray(c)
            })
        }
    };

    createCounterObject(className, ops) {
        let C = this.counterTable[className]
        return new C(ops)
    };

    addToCounterTray(c) {
        //this.counterTrayArray.push(c)
    };

    drawCounter(c) {

        let ref = c.src
        let ops = c.options
        Object.assign(ops, {
            originX: 'center',
            originY: 'center',
        })
        let cb = (i) => {
            c.img = i;
            i.counter=c
        }
        let prom = this.canvasObj.creatingPromise(ref)

        this.canvasObj.draw(prom, ops, cb)
    }


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
    };

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


    endOppsRallyCallback(button) {

        console.log('pressed End Opp"s Rally button')

        // at this moment we need just to launch Next Phase same as in End Phase Callback

        this.endPhaseCallback(button)
    }

    waitngForOpponentsRallyCallback(button) {
        console.log('DON"T TOUCH IT !!')
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



}
// -- let's mix canvas reaction into our class
Object.assign(Client.prototype, methods)
export { Client };
