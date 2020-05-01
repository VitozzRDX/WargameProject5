
import { Canv } from './canv.js'
import { Interface } from './ui.js'
import { Game } from './game.js'
import { Map } from './map.js'

import { methods } from './clientMethods_ReactionOnCanvas.js'
// import { Counter, MultiManCounters, SingleManCounters, Weapon } from './counters.js'
//------------------------ 20 03 2020 ----------------------------------------------------------------
import { createStack } from './stackFactory.js'

import { createCounter } from './countersFinal.js'



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

        };

        this.firstPlayer = undefined;
        this.secondPlayer = undefined;

        this.canvasObj = new Canv();
        this.interface = new Interface();
        this.game = new Game()
        this.map = new Map()

        // this.counterTable = {
        //     'Counter': Counter,
        //     'MultiManCounters': MultiManCounters,
        //     'SingleManCounters': SingleManCounters,
        //     'Weapon': Weapon

        // }

        this.currentCounterInterface = undefined

        this.selectedCounter = undefined

        this.stack = { status: 'uncreated' }

        this.countersFromBrokenMovingStackArray = undefined

        this.image = undefined

        this.counterTrayHash = {}
        //------------------------ 20 03 2020 ----------------------------------------------------------------
        //this.stackFactory = stackFactory

        //this.countersFactory = countersFactory

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

            'Rally': {
                //'enabledPhases': ['firstPlayerRallyPhase', 'secondPlayerRallyPhase', 'firstPlayerPrepFirePhaseCallback'],
                'callback': this.rallyCallback.bind(this),
                'class': 'Rally',
                'name': 'Rally'
            },

            'Assault Move': {
                'callback': this.assaultMoveCallback.bind(this),
                'class': 'AssaultMove',
                'name': 'Assault Move'
            },
            'Double Time': {
                'callback': this.doubleTimeCallback.bind(this),
                'class': 'DoubleTime',
                'name': 'Double Time'
            },
            'Break Stack': {
                'callback': this.breakStackCallback.bind(this),
                'class': 'BreakStack',
                'name': 'Break Stack'
            },

            'Attach': {
                'callback': this.attachCallback.bind(this),
                'class': 'Attach',
                'name': 'Attach'
            },
            'End Movement': {
                'callback': this.endMovementCallback.bind(this),
                'class': 'EndMovement',
                'name': 'End Movement'
            },

        };

    }

    init(options) {

        this._createCounters(options.countersOptions)

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

        //this._buildMenuInterface(startingPhaseTitle)

        // our Interface's module buildMenuButton(x,y,...,z) should get those things :
        // where to place , how to look , what to do and be disabled or not
        // 
        // and finally we need to draw a Rondel with appropriate Angle

        //this.canvasObj.preloadAndDrawRondel('assets/turnphase.gif')
        //this.canvasObj.setOtherSidePictureSrc(options.otherSidePictureSrc)

        this.canvasObj.setSidePicturesSrc(options.startingSidePictureSrc, options.otherSidePictureSrc)
        this.canvasObj.preloadAndDrawRondel2('assets/turnphase.gif')

        this.game.setGamePhase(options.startingPhase)

        //----------------------- added 21 02 2020
        //this.canvasObj.preloadAndDrawBackground(options.mapSrc,{top:0,left:0})
        //this._createAndDrawCounters(options.countersOptions)


        // -------- Loading Creating and Drawing Background and Counters

        //this.canvasObj.loadSVGFromURL(options.mapSrc)

        let p = this.canvasObj.creatingPromise(options.mapSrc)    // options.mapSrc
        p.
            then((img) => {
                this.canvasObj.draw(p, { top: 0, left: 0, evented: false, selectable: false, }, () => { this.canvasObj.canvas.sendToBack(img) })//this.canvas.sendToBack(img) 

            }).
            then(() => {
                //this._createAndDrawCounters(options.countersOptions)
                this._drawCounters()

            }).
            then(() => {
                this._buildMenuInterface(startingPhaseTitle)


                // this.canvasObj.getRondelPicture().animate('angle', '-=90', {
                //     onChange: this.canvasObj.canvas2.requestRenderAll.bind(this.canvasObj.canvas2),
                // })
            })

        //--------------------------------------------------------
        this.canvasObj.setZoomListener()

    };

    _createCounters(countersOptions) {
        let parametersOnCreationHash = countersOptions.parametersOnCreationHash
        for (let i in parametersOnCreationHash) {

            let arrayOfCoords = parametersOnCreationHash[i]

            arrayOfCoords.forEach((obj) => {
                let ops = countersOptions.squadType_propertiesHash[i]

                let centerPoint = this.map._calculateFreeCoords(obj, 48)

                ops.options = { top: centerPoint.y, left: centerPoint.x }       // {q:6,r:0,s:-6}
                ops.ownHex = obj
                let c = createCounter(ops)

                this.fillCounterTrayHash(c.ID, c)
                this.fillHex_CounterID_setHexOwner(obj, c)

            })

        }
    }

    _drawCounters() {
        for (let c in this.counterTrayHash) {

            this.drawCounter(this.counterTrayHash[c])
        }
    }
    //-----------added 20 20 2020----------------------------------------------------------

    _createAndDrawCounters(countersOptions) {  //setOfOptionsforCounters

        let parametersOnCreationHash = countersOptions.parametersOnCreationHash

        for (let i in parametersOnCreationHash) {

            let arrayOfCoords = parametersOnCreationHash[i]

            arrayOfCoords.forEach((obj) => {

                let ops = countersOptions.squadType_propertiesHash[i] // { src: "assets/ge467S.gif", otherSideSrc: "assets/geh7b.gif", className: "ManCounters" }

                let centerPoint = this.map._calculateFreeCoords(obj, 48)

                ops.options = { top: centerPoint.y, left: centerPoint.x }       // {q:6,r:0,s:-6}
                ops.ownHex = obj

                let className = ops['className']

                let c = this.createCounterObject(className, ops) //{ src: src, options: options, otherSideSrc: otherSideSrc }

                this.fillHex_CounterID_setHexOwner(obj, c)

                this.fillCounterTrayHash(c.ID, c)

                this.drawCounter(c)
            })
        }
    };

    createCounterObject(className, ops) {
        let C = this.counterTable[className]
        return new C(ops)
    };

    drawCounter(c) {

        let ref = c.src
        let ops = c.options
        Object.assign(ops, {
            originX: 'center',
            originY: 'center',
            //selectable: false
        })
        let cb = (i) => {
            c.imageID = i.id;
            i.counter = c
        }
        let prom = this.canvasObj.creatingPromise(ref)

        this.canvasObj.draw(prom, ops, cb)
    }

    // ---------------- added 19 02 2020 ------------------
    switchPlayers() {
        let temp;
        temp = this.firstPlayer;
        this.firstPlayer = this.secondPlayer;
        this.secondPlayer = temp
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

    // ----------- added 22 02 2020
    buildCUI(counter) {
        let phase = this.game.getPhase()
        let schemeObj = counter.getScheme(phase)  // {'phase':{'Do Something':false,...]} - we get {'Do Something': false,...}

        for (let buttonName in schemeObj) {

            let obj = this.interfaceScheme[buttonName]
            let bool = schemeObj[buttonName]

            this.interface.buildButton(obj, bool, counter)
        }

        return this
    };

    rallyCallback(button) {
        console.log(button)
    }

    clearCounterInterface() {                                   // change name to clearCurrentCounterInterface
        console.log('clearing clearCounterInterface')
        let currentCounterInterface = this.currentCounterInterface
        // ---- is any counter already selected ?
        //console.log(currentCounterInterface)
        if (currentCounterInterface) {
            for (let name in currentCounterInterface) {
                this.interface.remove(name)
            }
        }
        // NOTE: Returning this for chaining
        return this
    };

    _setCurrentCounterInterface(counter) {

        this.currentCounterInterface = counter.getScheme(this.game.getPhase())

    }

    processKeyDown(options) {
        // if (options.repeat) {
        //     return;
        // }
        var units = 10
        if (options.keyCode == 65) {                                    // refactor to case switch + change animateSliding(if o !== undef)

            var delta = new fabric.Point(units, 0);  //{ x: 10, y: 0 }

            this.canvasObj.canvas.relativePan(delta)
        }
        if (options.keyCode == 83) {                                    // refactor to case switch + change animateSliding(if o !== undef)

            var delta = new fabric.Point(0, units);  //{ x: 10, y: 0 }

            this.canvasObj.canvas.relativePan(delta)
        }
        if (options.keyCode == 68) {                                    // refactor to case switch + change animateSliding(if o !== undef)
            ;
            var delta = new fabric.Point(-units, 0);  //{ x: 10, y: 0 }

            this.canvasObj.canvas.relativePan(delta)
        }
        if (options.keyCode == 87) {                                    // refactor to case switch + change animateSliding(if o !== undef)
            ;
            var delta = new fabric.Point(0, -units);  //{ x: 10, y: 0 }

            this.canvasObj.canvas.relativePan(delta)
        }

    }
    // --------------------- added 26 02 2020
    _checkIfclickedCounterOwnerIsSameAsPhaseOwner(counter, player) {
        return counter.owner == player
    }
    //----------------------------- 27 02 2020 -----------------------------------
    _checkIfHexIsInCoverArc(counter, hex) {
        return true
    }

    addCounterToStack(counter, stack) {
        stack.addToStack(counter)

    }

    getStackUIScheme(stack) {

        return stack.getUIScheme()
    }

    setStackUIButtonsCondition(stack, buttonName, bool) {
        let scheme = this.getStackUIScheme(stack) // {'R':true}

        scheme[buttonName] = bool
    }

    buildStackUI(stack) {
        for (let buttonName in this.getStackUIScheme(stack)) {
            let obj = this.interfaceScheme[buttonName]
            let bool = this.stack.schemeObj[buttonName]
            this.interface.buildButton(obj, bool)
        }
    }

    getStackStatus(stack) {
        return stack.status
    }


    _isCounterInSameHexAsStack(counter, stack) {

        let hex = stack.getOwnHex()
        return JSON.stringify(hex) == JSON.stringify(counter.ownHex)
    }

    setMouseClickListenerAccordingToCurrentPhase() {
        let p = this.game.getPhase()
        let cb = this.allPhases_CallbacksHash[p]
        this.canvasObj.setMouseClickListener(cb);
    }



    breakStackCallback(button) {
        console.log('breakStack pressed')

        if (this.countersFromBrokenMovingStackArray) throw 'array with Broken Stack counters is full'

        this.countersFromBrokenMovingStackArray = this.stack.mgArray

        this.stack.mgArray.forEach((counter) => {

            this.changeColorOfBorder(counter, "yellow")
            counter.setMovingStatus('brokenStackRemnant')
            try {
                if (counter.isUnderCommand()) {
                    //console.log('here')
                    counter.removeCommanderBonus()
                }
            } catch (error) {
                console.log(error,'it should be a Commander')
            }


        })

        this.setStackStatus(this.stack, 'uncreated')
        this.setStackUIDisabled(this.stack)
        this.buildStackUI(this.stack)

    }

    setStackStatus(stack, status) {
        stack.setStatus(status)
    }

    setStackUIDisabled(stack) {
        stack.setUIDisabled()
    }

    _isCounterInStack(counter, stack) {
        let arr = stack.getStackCountersArray()
        if (arr.indexOf(counter) != -1) {
            return true
        }
    }
    clearCountersFromBrokenMovingStackArray() {
        this.countersFromBrokenMovingStackArray = undefined
    }

    //---------------- 10 03 Weapon -------------------------------------

    attachCallback(button, counter) {
        let img = this.canvasObj.getImageByID(counter.getImageID())
        this.changeColorOfBorder(counter, 'red')

        let newCallback = (options) => {

            if (options.target == null) {
                console.log('options.target == null')
                return
            }

            let counterToAttach = options.target.counter

            if (counter == counterToAttach) {
                console.log('counter == counterToAttach')
                return
            }


            let i = this.canvasObj.getImageByID(counterToAttach.getImageID())

            this.canvasObj.canvas.discardActiveObject()

            img.set({
                top: i.top + 10,
                left: i.left + 10,
                stroke: null
            })//.bringToFront()

            this.canvasObj.canvas.add(img)

            //-------------- group start---------------------------------------------------------------------------------------
            let group = this.canvasObj.createGroup(i, img)

            counterToAttach.group = group
            group.counter = counterToAttach
            group.weaponCounter = counter

            this.canvasObj.drawGroup(group)
            //-------------- group end---------------------------------------------------------------------------------------

            counter.setWeightHex(0)
            counterToAttach.setWeightHex(2)
            //---------------------------------------------------------------------------------------------------------
            this.map.fillhex_counterIDHash(counterToAttach.ownHex, counter.ID)
            this.rearrangeCountersPositionInHex(counterToAttach.ownHex)
            //---------------------------------------------------------------------------------------------------------
            this.clearCounterInterface()

            this._removeAllCallbacksOffCanvasAndSetNew(this.firstPlayerRallyPhase.bind(this))
        }

        this._removeAllCallbacksOffCanvasAndSetNew(newCallback)

    }

    rearrangeCountersPositionInHex(hex) {

        let center = this.map.getCenterCoordsObjFromHex(hex)
        let countersInHexArray = this.map.getCountersIDinHexArray(hex) // [conterID,...]
        let img
        let c = { x: 0, y: 0 }

        countersInHexArray.forEach((counterID, index, arr) => {
            let counter = this.getCounterByItsID(counterID)

            if (counter.weightHex > 0) {    // if counter.weightHex == 0 then it is weapon attached with some C-r. Itis a group twice size, so weapon size is there

                img = counter.group || this.canvasObj.getImageByID(counter.getImageID())

                if (index == 0) {    // we set for first counter coords equal to centercoordz
                    c.x = center.x   // we can take countersInHexArray.length and set c.x = ctnter.x  - Math.floor(length/2) * 10
                    c.y = center.y
                } else {
                    c.x = c.x + img.width * 0.25
                    c.y = c.y + img.width * 0.25
                }

                img.set({ left: c.x, top: c.y })

                this.canvasObj.canvas.add(img)
            }
        })
    }

    getCounterByItsID(ID) {
        return this.counterTrayHash[ID]
    }

    fillCounterTrayHash(ID, counter) {
        this.counterTrayHash[ID] = counter
    }

    changeColorOfBorder(counter, color) {
        this.canvasObj.getImageByID(counter.getImageID()).set({
            stroke: color,
            strokeWidth: 3
        })
        this.canvasObj.canvas.renderAll()
    }

    changeColorOfBorderImage(img, color) {
        img.set({
            stroke: color,
            strokeWidth: 3
        })
        this.canvasObj.canvas.renderAll()
    }
    // -------------- Refactor 17 03 2020 ------------------------------------------------


    _checkForMovingStatus(status, counter) {
        if (counter.getMovingState) {
            return counter.getMovingState() == status
        }
        console.log('counter got no Moving state')
        return false
    }

    endEachCounterMove(arr) {
        if (arr) {
            arr.forEach((counter) => {
                this.changeColorOfBorder(counter, null)
                counter.setMovingStatus('moved')
            })
        }
        console.log('there is no conters not finished its move')
        return this
    }

    _check_ForNullTarget_ForOwner_ForMovingStatus(target) {

        if (target == null) {
            console.log('clicked on empty space. Select Counter')
            return true
        }
        if (!this._checkIfclickedCounterOwnerIsSameAsPhaseOwner(target.counter, this.firstPlayer)) {
            console.log('u click not your counter')
            return true
        }
        if (!target.counter.getMovingStatus) {
            console.log('u try  to select static counter')
            return true
        }
        if (target.counter.getMovingStatus() == 'moved') {
            console.log('u try to select counter that is moved already')
            return true
        }
    }

    createNewStack_setStatus_addCounter_setOwnHex(status, counter) {

        let stack = createStack('moving').addToStack(counter).setStatus(status).setOwnHex(counter.ownHex)
        // if ownHex == road - add Road Bonus


        this.changeColorOfBorder(counter, "red")

        return stack
    }

    isEqual(obj1, obj2) {
        return JSON.stringify(obj1) == JSON.stringify(obj2)
    }

    moveProcessing(point) {

        let targetHex = this.map.getHexFromCoords(point)
        //=========================================================================================

        // let targetHexType = this.map.getHexType(targetHex)
        // let startOnTheRoadBonus = this.stack.getStartingRoadBonus() // == 0 or 1
        // if (startOnTheRoadBonus) {
        //     if (targetHexType == 'road'){
        //         return
        //     }
        //     this.stack.setRoadBonus(0)
        // }

        //=========================================================================================
        let targetHexType = this.map.getHexType(targetHex)
        //let startOnTheRoadBonus = this.stack.getStartingRoadBonus()
        //console.log(targetHexType,startOnTheRoadBonus)



        //=========================================================================================
        console.log(this.stack.isOnTheRoadFromStart)
        if (targetHexType != 'road' && this.stack.isOnTheRoadFromStart){
            console.log('hereee')
            this.stack.isOnTheRoadFromStart = false

            let result = this.stack.mgArray.some((movingCounter) => {
                movingCounter.subtractMF(1)
                let bool = this._checkIfMovementPointsEnded(movingCounter)
                console.log(bool)
                movingCounter.getRoadBonus()

                return bool
            })
            console.log(result)

            if (result) {
                this.stack.isOnTheRoadFromStart = true
                return console.log('u are tryin to get off road , but u do not have enough MF')
            }

            this.stack.mgArray.forEach((movingCounter) => {
                movingCounter.subtractMF(1)
            })

        }

        //=========================================================================================

        // if (targetHexType != 'road'){
        //     this.stack.isOnTheRoadFromStart = false
        // }

        if (this._is_Click_NotInCoverArc_inOwnHex_onEnemy_EnterCostTooHigh(this.stack, targetHex)) {
            return
        }

        //=========================================================================================
        // if (targetHexType == 'road' && this.stack.isOnTheRoadFromStart && this.stack.gotNoRoadBonus){
        //     //console.log('herr')
        //     this.stack.mgArray.forEach((movingCounter) => {
        //         movingCounter.getRoadBonus()
        //     })
        //     this.stack.gotNoRoadBonus = false
        // }

        //=========================================================================================

        this.stack.mgArray.forEach((movingCounter) => {

            let previousHex = movingCounter.ownHex
            let costToEnter = movingCounter.getCostToEnter(this.map.getHexType(targetHex))
            let img = movingCounter.group || this.canvasObj.getImageByID(movingCounter.getImageID())
            let coords = this.getFreeCoordsAsTopLeftObj(targetHex, img.width)

            movingCounter.subtractMF(costToEnter)
            movingCounter.setHexPosition(targetHex)

            this.map.removeIDFromHex_counterIDHash(previousHex, movingCounter.ID)
            this.fillHex_CounterID_setHexOwner(targetHex, movingCounter)

            this.canvasObj.setOffMouseClickListener()
            this.canvasObj.createPromiseAnimation(img, coords)
                .then(() => {
                    this.setMouseClickListenerAccordingToCurrentPhase()

                    this.rearrangeCountersPositionInHex(previousHex)
                    if (this._checkIfMovementPointsEnded(movingCounter)) {
                        //console.log('h')
                        this.setMOVEDstatus_NullBorderColor_RemoveFromStack(movingCounter, this.stack)
                    }
                    if (this._isStackEmpty(this.stack)) {        //  && getMovingStackStatus() == 'filledWithBrokenStackRemnants'
                        this.setStackStatus(this.stack, 'uncreated')
                        this.clearStackUI(this.stack)
                        return console.log('all untis from MG have ended its move ')
                    }

                    if (!this.stack.isEnabled('End Movement')) {
                        this.stack.enableButton('End Movement')
                        this.interface.enableButton('End Movement')
                    }
                    this.stack.disableButton('Assault Move')
                    this.interface.disableButton('Assault Move')

                    this.stack.disableButton('Double Time')
                    this.interface.disableButton('Double Time')

                })
        })


        // disable assault and double time buttons
        // if Stop Movement disabled => enable it

        // if (!this.stack.isEnabled('End Movement')) {
        //     this.stack.enableButton('End Movement')
        //             // now redrawIt
        // this.interface.enableButton('End Movement')
        // }


        this.setStackStatus(this.stack, 'moving')
    }

    getFreeCoordsAsTopLeftObj(hex, size) {
        let c = this.map._calculateFreeCoords(hex, size)
        return { top: c.y, left: c.x }
    }

    _checkIfMovementPointsEnded(counter) {
        console.log(counter.getMFLeft())
        return counter.getMFLeft() == 0
    }

    setMOVEDstatus_NullBorderColor_RemoveFromStack(counter, stack) {
        let img = this.canvasObj.getImageByID(counter.getImageID())
        this.setMovingStatus(counter, 'moved')
        this.changeColorOfBorderImage(img, null)
        this.removeCounterFromStack(stack, counter)
    }

    removeCounterFromStack(stack, counter) {
        stack.removeCounterFromArray(counter)
    }

    setMovingStatus(counter, status) {
        counter.setMovingStatus(status)
    }

    _checkIfThereIsAnEnemyInHex(movingCounter, targetHex) {

        switch (movingCounter.getType()) {
            case 'AFV':
                return false;
            case 'MultiManCounter':

                if (this.map.getOwnerOfHex(targetHex) != undefined && this.map.getOwnerOfHex(targetHex) != movingCounter.owner) {
                    return true
                }
                break;
        }
    }

    _isCostToEnterHigherMFLeft(movingCounter, costToEnter) {
        if (movingCounter.getMFLeft() < costToEnter) { // 'wood' - 2MF 'grain' - 1.5 'building' - 2 MF
            console.log('cost to enter is higher then MF left')
            return true
        }
    }


    _is_Click_NotInCoverArc_inOwnHex_onEnemy_EnterCostTooHigh(stack, targetHex) {


        return stack.mgArray.some((movingCounter) => {

            if (this._checkIfMovementPointsEnded(movingCounter)) {
                this.setMOVEDstatus_NullBorderColor_RemoveFromStack(movingCounter, this.stack)
                return true
            }

            if (this.isEqual(movingCounter.ownHex, targetHex)) {
                console.log('u try to move into the own Hex')
                return true
            }
            if (!this._checkIfHexIsInCoverArc(movingCounter, targetHex)) {
                console.log('u try to move into Hex not in your Cover Arc')
                return true
            }

            if (this._checkIfThereIsAnEnemyInHex(movingCounter, targetHex)) {  // case MMC true ? AFV false
                console.log('u try to move into Hex with an Enemy')
                return true
            }

            let costToEnter = movingCounter.getCostToEnter(this.map.getHexType(targetHex))

            if (this._isCostToEnterHigherMFLeft(movingCounter, costToEnter)) {
                console.log('cost to enter is higher then MF left')
                return true
            }
        })
    }

    fillHex_CounterID_setHexOwner(targetHex, movingCounter) {
        this.map.addHexTohex_counterIDHash(targetHex)
        this.map.fillhex_counterIDHash(targetHex, movingCounter.ID)
        this.map.setOwnerOfHex(targetHex, movingCounter.owner)
    }

    //----------------------- 20 03 2020 --------------------------------------------------------------


    _isStackEmpty(stack) {
        return stack.getStackCountersArrLength() == 0
    }

    //--------------- 18 04 2020 ---------------------------------------------------------------------------

    addCounterToStackProcessing(stack, counter) {

        this.addCounterToStack(counter, stack)
        this.changeColorOfBorder(counter, 'red')

        //----------------------------------------------------------------------------------------------------------------------------------------------
        if (stack.isUnderCommand()) {
            try {
                counter.getUnderCommand()
                counter.getCommanderBonus()

                return console.log('added squad to stack with Commander')
            } catch (error) {
                console.log(error, 'adding not Squad')
            }
        }

        if (counter.getType() == 'SingleManCounter') {   // maybe we do not need this check cause it is always one of this
            stack.getCommandBonus()
            stack.getUnderCommand(counter)
        }
        //----------------------------------------------------------------------------------------------------------------------------------------------      
    }

    endMovementCallback(button) {

        this.stack.mgArray.forEach((counter) => {

            this.setMovingStatus(counter, 'moved')
            this.changeColorOfBorder(counter, null)

        })

        this.setStackStatus(this.stack, 'uncreated')
        this.clearStackUI(this.stack)

        console.log('end')
    }

    clearStackUI(stack) {
        for (let buttonName in this.getStackUIScheme(stack)) {

            this.interface.clearUI(buttonName)
        }
    }


    assaultMoveCallback(button) {
        console.log('Next Move will be last. Set state ? Show "Assaulting!" table . Disable Double Time bttn (redraw MGUI ?) ')

        // if (stack.status == 'moving') { return console.log('already started Move') }
        this.stack.mgArray.forEach((counter) => {
            // counter.setState('assaulting')
            // 

            counter.setMovingStatus('assaulting')
        })
    }


    doubleTimeCallback(button) {
        console.log('set all C in MG except that of exausted, +2 MF to temp, set statuses - exausted ')
        this.stack.mgArray.forEach((counter) => {
            if (counter.status != 'exosted') {
                counter.status = 'exosted'
                counter.temporaryMF += 2
            }
        })
        this.stack.disableButton('Double Time')
        this.interface.disableButton('Double Time')


    }

    // deleteAndRedrawButton(buttonName,bool) {
    //     let obj = this.interfaceScheme[buttonName]
    //     this.interface.buildButton(obj, bool)
    // }

}
// -- let's mix canvas reaction into our class
Object.assign(Client.prototype, methods)
export { Client };
