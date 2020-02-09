class Game {
    constructor(){
        this.phase = undefined;
        this.previousPhase = undefined;
        this.phases = undefined;

        this.rallyPhaseStatus = undefined ;

        // this.phaseInterfaceMenuTable = {
        //     'firstPlayerRallyPhase' : {'End Rally':'enabled'}, // end Rally // Rally All At Once // ,'Rally All At Once' :'enabled',"Choose Next To Rally":'enabled'
        //     'firstPlayerPrepFirePhaseCallback' : {'End Phase':'enabled'},
        //     'firstPlayerMovementPhase': [{'End Phase':'enabled'}],
        //     'firstPlayerDefenciveFirePhase' :  [{'End Phase':'disabled'}],
        //     'firstPlayerAdvancingFirePhase' : [{'End Phase':'enabled'}],
        //     'firstPlayerRoutPhase' : [{'End Phase':'enabled'}],
        //     'firstPlayerAdvancePhase': [{'End Phase':'enabled'}],
        //     'firstPlayerCloseCombatPhase' : [{'End Phase':'disabled'},{'End Turn': 'enabled'}],

        //     'secondPlayerRallyPhase' : {'End Rally':'enabled'},//,{'Rally All At Once' : 'enabled'},{"Choose Next To Rally":'enabled'}],
        //     'secondPlayerPrepFirePhaseCallback' :  {'End Phase':'disabled'},
        //     'secondPlayerMovementPhase':  [{'End Phase':'disabled'}],
        //     'secondPlayerDefenciveFirePhase':  [{'End Phase':'enabled'}],
        //     'secondPlayerAdvancingFirePhase' : [{'End Phase':'disabled'}],
        //     'secondPlayerRoutPhase' : [{'End Phase':'enabled'}],
        //     'secondPlayerAdvancePhase': [{'End Phase':'disabled'}],
        //     'secondPlayerCloseCombatPhase' :  [{'End Phase':'disabled'}],
        // }
        this.phaseInterfaceMenuTable = {
            'firstPlayerRallyPhase' : {'End Rally':true}, // end Rally // Rally All At Once // ,'Rally All At Once' :'enabled',"Choose Next To Rally":'enabled'
            'firstPlayerPrepFirePhaseCallback' : {'End Phase':true},
            'firstPlayerMovementPhase': {'End Phase':true},
            'firstPlayerDefenciveFirePhase' :  [{'End Phase':'disabled'}],
            'firstPlayerAdvancingFirePhase' : [{'End Phase':true}],
            'firstPlayerRoutPhase' : [{'End Phase':true}],
            'firstPlayerAdvancePhase': [{'End Phase':true}],
            'firstPlayerCloseCombatPhase' : [{'End Phase':false},{'End Turn': true}],

            'secondPlayerRallyPhase' : {'End Rally':true},//,{'Rally All At Once' : 'enabled'},{"Choose Next To Rally":'enabled'}],
            'secondPlayerPrepFirePhaseCallback' :  {'End Phase':false},
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
//---------------------addon---------------------------
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

        
        // this.startingSideELR = undefined;
        // this.secondPlayerELR = undefined
    };

    //setELR
    
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

    getIFTresult(DR,FP) {
        return this.infantryFireTable[FP][DR]   // return undef if rolled more then PTC result
    };

    getActualFirePower(fp,coweringCoefficient) {

        let array =  Object.keys(this.infantryFireTable)

        var closest = array.reduce((prev, curr) => {
            return (Math.abs(curr - fp) < Math.abs(prev - fp) ? curr : prev);
          });

        let index = array.indexOf(closest)

        return array[index+coweringCoefficient]
        //if ()
    }
};

export {Game};