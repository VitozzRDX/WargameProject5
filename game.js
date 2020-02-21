class Game {
    constructor() {
        this.phase = undefined;
        this.previousPhase = undefined;
        this.phases = undefined;

        this.rallyPhaseStatus = undefined;

        this.phaseInterfaceMenuTable = {
            'firstPlayerRallyPhase': { 'End Rally': true }, // end Rally // Rally All At Once // ,'Rally All At Once' :'enabled',"Choose Next To Rally":'enabled'
            'secondPlayerRallyPhase': { 'End Rally': true },//,{'Rally All At Once' : 'enabled'},{"Choose Next To Rally":'enabled'}],
            'firstPlayerPrepFirePhase': { 'End Phase': true },
            'firstPlayerMovementPhase': { 'End Phase': true },
            'secondPlayerDefenciveFirePhase': { 'End Opp"s DFPh': true },
            'firstPlayerAdvFirePhase': { 'End Phase': true },
            'firstPlayerRoutPhase': {},
            'secondPlayerRoutPhase': {},
            'firstPlayerAdvancePhase': {},
            'firstPlayerCloseCombatPhase': {},

            // 'secondPlayerRallyPhaseHalfTurn': {},
            // 'firstPlayerRallyPhaseHalfTurn': { 'End Phase': true },
            // 'secondPlayerPrepFirePhase': { 'End Phase': true },
            // 'secondPlayerMovementPhase': { 'End Phase': true },
            // 'firstPlayerDefenciveFirePhase': { 'End Phase': true },
            // 'secondPlayerAdvFirePhase': { 'End Phase': true },
            // 'secondPlayerRoutPhaseHalfTurn': { 'End Phase': true },
            // 'firstPlayerRoutPhaseHalfTurn': { 'End Phase': true },
            // 'secondPlayerAdvancePhase': { 'End Phase': true },
            // 'secondPlayerCloseCombatPhase': { 'End Phase': true },

        }
        this.microPhaseUITable = {
            'MMCfireMicroPhase': { 'Cancel Fire Preparation': true, 'End Phase': true }
        }
        this.allPhasesArr = Object.keys(this.phaseInterfaceMenuTable)
        Object.assign(this.phaseInterfaceMenuTable, this.microPhaseUITable)

    };


    getPhase() {
        return this.phase
    };

    setGamePhase(phase) {
        this.phase = phase
    };

    getMenuShemeByPhase() {
        let p = this.getPhase()
        console.log('phase :', p)
        return this.phaseInterfaceMenuTable[p]
    };

    switchToNextPhase() {
        let nextPhase;
        let phase = this.getPhase()

        let i = this.allPhasesArr.indexOf(phase);

        // ------ does we get to the end of second Player's half turn ?
        if (i == this.allPhasesArr.length - 1) {
            nextPhase = this.allPhasesArr[0]
        } else {
            nextPhase = this.allPhasesArr[i + 1]
        }

        this.switchPhase(nextPhase)
    };


    switchPhase(phase) {
        let phaseNow = this.getPhase();
        this.setPreviousPhase(phaseNow);
        this.setGamePhase(phase)
    };

    setPreviousPhase(phase) {
        this.previousPhase = phase
    };

    getPreviousPhase() {
        return this.previousPhase
    }
    changeMenuInterface(text, value) {
        let obj = this.getMenuShemeByPhase()

        obj[text] = value
    };


};

export { Game };