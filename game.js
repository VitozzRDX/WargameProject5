class Game {
    constructor(){
        this.phase = undefined;
        this.previousPhase = undefined;
        this.phases = undefined;

        this.rallyPhaseStatus = undefined ;

        // this.phaseInterfaceMenuTable = {
        //     'firstPlayerRallyPhase' : {'End Rally':true}, // end Rally // Rally All At Once // ,'Rally All At Once' :'enabled',"Choose Next To Rally":'enabled'
        //     'firstPlayerPrepFirePhaseCallback' : {'End Phase':true},
        //     'firstPlayerMovementPhase': {'End Phase':true},
        //     'firstPlayerDefenciveFirePhase' :  [{'End Phase':'disabled'}],
        //     'firstPlayerAdvancingFirePhase' : [{'End Phase':true}],
        //     'firstPlayerRoutPhase' : [{'End Phase':true}],
        //     'firstPlayerAdvancePhase': [{'End Phase':true}],
        //     'firstPlayerCloseCombatPhase' : [{'End Phase':false},{'End Turn': true}],

        //     'secondPlayerRallyPhase' : {'End Rally':true},//,{'Rally All At Once' : 'enabled'},{"Choose Next To Rally":'enabled'}],
        //     'secondPlayerPrepFirePhaseCallback' :  {'End Phase':false},
        //     'secondPlayerMovementPhase':  {'End Phase':false},
        //     'secondPlayerDefenciveFirePhase':  [{'End Phase':'enabled'}],
        //     'secondPlayerAdvancingFirePhase' : [{'End Phase':'disabled'}],
        //     'secondPlayerRoutPhase' : [{'End Phase':'enabled'}],
        //     'secondPlayerAdvancePhase': [{'End Phase':'disabled'}],
        //     'secondPlayerCloseCombatPhase' :  [{'End Phase':'disabled'}],
        // }

        this.phaseInterfaceMenuTable = {
            'firstPlayerRallyPhase' : {'End Rally':true}, // end Rally // Rally All At Once // ,'Rally All At Once' :'enabled',"Choose Next To Rally":'enabled'
            'secondPlayerRallyPhase' : {'End Rally':true},//,{'Rally All At Once' : 'enabled'},{"Choose Next To Rally":'enabled'}],
            'firstPlayerPrepFirePhase' : {'End Phase':true},
            'firstPlayerMovementPhase': {'End Phase':true},
            'secondPlayerDefenciveFirePhase' : {'End Opp"s DFPh':true},
            'firstPlayerAdvFirePhase':{'End Phase':true},
            'firstPlayerRoutPhase':{},
            'secondPlayerRoutPhase':{},
            'firstPlayerAdvancePhase':{},
            'firstPlayerCloseCombatPhase' :{},

            'secondPlayerRallyPhaseHalfTurn' :{},
            'firstPlayerDefenciveFirePhase' :  {'End Phase':'disabled'},
            'firstPlayerAdvancingFirePhase' : [{'End Phase':true}],
            'firstPlayerRoutPhase' : [{'End Phase':true}],
            'firstPlayerAdvancePhase': [{'End Phase':true}],
            'firstPlayerCloseCombatPhase' : [{'End Phase':false},{'End Turn': true}],



            'secondPlayerMovementPhase':  {'End Phase':false},
            'secondPlayerDefenciveFirePhase':  [{'End Phase':'enabled'}],
            'secondPlayerAdvancingFirePhase' : [{'End Phase':'disabled'}],
            'secondPlayerRoutPhase' : [{'End Phase':'enabled'}],
            'secondPlayerAdvancePhase': [{'End Phase':'disabled'}],
            'secondPlayerCloseCombatPhase' :  [{'End Phase':'disabled'}],
        }
        this.microPhaseUITable = {
            'MMCfireMicroPhase' : {'Cancel Fire Preparation' : true , 'End Phase':true}
        }
        this.allPhasesArr = Object.keys(this.phaseInterfaceMenuTable)
        Object.assign(this.phaseInterfaceMenuTable,this.microPhaseUITable)

    };

    
    getPhase() {
        return this.phase
    };

    setGamePhase(phase) {
        this.phase = phase
    };

    getMenuShemeByPhase() {
        let p = this.getPhase()
        console.log('phase :',p)
        return this.phaseInterfaceMenuTable[p]
    };

    switchToNextPhase () {

        let phase = this.getPhase()

        let i = this.allPhasesArr.indexOf(phase);
        let nextPhase = this.allPhasesArr[i+1]

        this.switchPhase(nextPhase)
    };


    switchPhase (phase) {
        let phaseNow = this.getPhase();
        this.setPreviousPhase(phaseNow);
        this.setGamePhase (phase)
    };

    setPreviousPhase (phase) {
        this.previousPhase = phase
    };

    getPreviousPhase () {
        return this.previousPhase
    }
    changeMenuInterface (text, value) {
        let obj = this.getMenuShemeByPhase()

        obj[text] = value
    };


};

export {Game};