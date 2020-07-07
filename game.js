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

        }

        this.infantryFireTable ={
            1:[[1,'KIA'],[1,'K/'],[1,'MC'],[1,'MC'],[0,'MC'],[0,'PTC'],],
            2:[[2,'KIA'],[1,'KIA'],[1,'K/'],[1,'MC'],[1,'MC'],[0,'MC'],[0,'PTC']],
            4:[[2,'KIA'],[1,'KIA'],[2,'K/'],[2,'MC'],[1,'MC'],[1,'MC'],[0,'MC'],[0,'PTC']],
            6:[[3,'KIA'],[2,'KIA'],[1,'KIA'],[2,'K/'],[2,'MC'],[1,'MC'],[1,'MC'],[0,'MC'],[0,'PTC']],
            8:[[3,'KIA'],[2,'KIA'],[1,'KIA'],[2,'K/'],[2,'MC'],[2,'MC'][1,'MC'],[1,'MC'],[0,'MC'],[0,'PTC']],
            12:[[3,'KIA'],[2,'KIA'],[1,'KIA'],[3,'K/'],[3,'MC'],[2,'MC'],[2,'MC'],[1,'MC'],[1,'MC'],[0,'MC'],[0,'PTC']],
            16:[[4,'KIA'],[3,'KIA'],[2,'KIA'],[1,'KIA'],[3,'K/'],[3,'MC'],[2,'MC'],[2,'MC'],[1,'MC'],[1,'MC'],[0,'MC'],[0,'PTC']],
            20:[[4,'KIA'],[3,'KIA'],[2,'KIA'],[1,'KIA'],[4,'K/'],[4,'MC'],[3,'MC'],[2,'MC'],[2,'MC'],[1,'MC'],[1,'MC'],[0,'MC'],[0,'PTC']],
            24:[[5,'KIA'],[4,'KIA'],[3,'KIA'],[2,'KIA'],[1,'KIA'],[4,'K/'],[4,'MC'],[3,'MC'],[2,'MC'],[2,'MC'],[1,'MC'],[1,'MC'],[0,'MC'],[0,'PTC']],
            30:[[6,'KIA'],[5,'KIA'],[4,'KIA'],[3,'KIA'],[2,'KIA'],[1,'KIA'],[4,'K/'],[4,'MC'],[3,'MC'],[2,'MC'],[2,'MC'],[1,'MC'],[1,'MC'],[0,'MC'],[0,'PTC']],
            36:[[7,'KIA'],[6,'KIA'],[5,'KIA'],[4,'KIA'],[3,'KIA'],[2,'KIA'],[1,'KIA'],[4,'K/'],[4,'MC'],[3,'MC'],[2,'MC'],[2,'MC'],[1,'MC'],[1,'MC'],[0,'MC'],[0,'PTC']]



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


    getActualFirePower(fp,cower,exp) {//,cower,counter.experience)

        let array =  Object.keys(this.infantryFireTable)

        var closest = array.reduce((prev, curr) => {
            return (Math.abs(curr - fp) < Math.abs(prev - fp) ? curr : prev);
          });

        let index = array.indexOf(closest)

        if (cower && exp == 'Inexperienced') {
            return array[index+2]
        }

        if (cower) {
            return array[index+1]
        }

        return array[index]
    }

    getIFT_FPresult(fp,dr) {
        return this.infantryFireTable[fp][dr-1]   // return undef if rolled more then PTC result
    };
};

export { Game };