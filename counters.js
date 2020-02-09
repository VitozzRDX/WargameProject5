
class Counter {
    constructor(param) {
        
        this.src = param.src;
        this.ownHex = param.ownHex;
        this.ID = param.ID;
        this.owner = param.owner ;
        this.options = {                
            originX: 'center',
            originY: 'center',

        };
        this.img = undefined;

        this.gameStatus = 'ready to action';

        this.groupComponents = []
        table.allCounters.push(this)
        
    };

    kill() {
        this.gameStatus = 'KIA'
    };

    setGameStatus(status) {
        this.gameStatus = status
    };

    getGameStatus() {
        return this.gameStatus
    }

    setOptionsForDrawing(ops) {
        Object.assign(this.options,ops)
    }

}

class SelfMovingCounters extends Counter {
    constructor(param) {
        super(param)

         this.currentInterfaceElements = undefined ;

    }


    move(hex) {
        this.ownHex = this.img.ownHex = hex;
    }
    getCoverArc() {                 // first one class that got Hexes to Move , so let's get them
        console.log('returning CA inside SMC class')
    }

    getCurrentInterface() {
        return this.currentInterfaceElements 
    }
}



class ManCounters extends SelfMovingCounters {
    constructor(param) {
        super(param)
        
        this.normalRange = param.normalRange
        this.firePower = param.firePower
        this.morale = param.morale

        this.assaultFire = param.assaultFire
        this.halfSquad = param.halfSquad
        this.experienceDrop = param.experienceDrop

        this.sizeForFiringBorder = 50 ;     // to draw red border on firing

        this.currentInterfaceElements = {
            'MC Prepare to Fire!': true ,
        }

        this.otherSideSrc = param.otherSideSrc;
        this.firingStatus = 'not fired';

        //---------------------------------------------------------

        this.ELR = param.ELR

    }


    calculateFirePower(distance) {
        if (distance <= this.normalRange ) {
            return this.firePower
        }
        if (distance > this.normalRange*2) {
            return 0
        }
        return this.firePower/2
    }

    getTextForFiringBorder(phase) {
        let firingStatus = this.firingStatus
        let hash = {
            'firstPlayerPrepFirePhaseCallback' : {
                'not fired' : 'PREP_FIRE'
            },
            'secondPlayerDefenciveFirePhase' : {
                'not fired' : 'FIRST_FIRE',
                'fired' : 'FINAL_FIRE',
            },
            'firstPlayerAdvancingFirePhase' : {
                'not fired' : 'FINAL_FIRE',
            }
        }
        return  hash[phase][firingStatus]
    }
    //-----------add-on for firing-------------------

    fire(resultOfPureRoll) {
        console.log('it is a method fire of counter :',resultOfPureRoll)
    }

    casualtyReduct() {

        // is this counter already HS ?

        if (!this.halfSquad) {

            this.setGameStatus('KIA')

            return 

        }else{
            return this.halfSquad
        }
        
    }

}

class SingleManCounters extends ManCounters {
    constructor(param) {
        super(param)

        this.LeadershipDRM = param.LeadershipDRM
    }

        //-----------add-on for firing-------------------

    fire(resultOfPureRoll) {

        console.log('it is a method fire of counter :',resultOfPureRoll)
    }
}

class Vehicle extends SelfMovingCounters {
    constructor(param) {
        super(param)

        this.sizeForFiringBorder = 62 ;

        this.currentInterfaceElements = {
            'Veh Prepare to Fire!': true ,
        }

        this.VCAorientation = param.orientation
        this.radiusView = param.radiusView
        this.wreckSide = param.wreckSide
    }
    getCoverArc() {                           // returns only coords of red hexes VCA cause it got no Turret
        let list2 = []
        for (var a = 0; a >= -1; a--) {
            var b = - 1 - a;
            if (this.VCAorientation == 0) { list2.push({ q: 1 + this.ownHex.q, r: a + this.ownHex.r, s: b + this.ownHex.s }) };	// 
            if (this.VCAorientation == 1) { list2.push({ q: -a + this.ownHex.q, r: -b + this.ownHex.r, s: -1 + this.ownHex.s }) };
            if (this.VCAorientation == 2) { list2.push({ q: b + this.ownHex.q, r: 1 + this.ownHex.r, s: a + this.ownHex.s }) };
            if (this.VCAorientation == 3) { list2.push({ q: -1 + this.ownHex.q, r: -a + this.ownHex.r, s: -b + this.ownHex.s }) };
            if (this.VCAorientation == 4) { list2.push({ q: a + this.ownHex.q, r: b + this.ownHex.r, s: 1 + this.ownHex.s }) };
            if (this.VCAorientation == 5) { list2.push({ q: -b + this.ownHex.q, r: -1 + this.ownHex.r, s: -a + this.ownHex.s }) };
        }
        return { 'red': list2 }
    }
}

class AFV extends Vehicle {
    constructor(param) {                            
        super(param)
        this.TCAorientation = this.VCAorientation
    }

    getTurretCoverArc() {       // refactor getTurretCoverArcForDraw(param) if param -> 
        let list = []

        for (var radius = 1; radius <= this.radiusView; radius++) {
             for (var a = 0; a >= -radius; a=a-radius) {
                var b = - radius - a;
                if (this.TCAorientation == 0) { list.push({ q: radius + this.ownHex.q, r: a + this.ownHex.r, s: b + this.ownHex.s }) };	// 
                if (this.TCAorientation == 1) { list.push({ q: -a + this.ownHex.q, r: -b + this.ownHex.r, s: -radius + this.ownHex.s }) };
                if (this.TCAorientation == 2) { list.push({ q: b + this.ownHex.q, r: radius + this.ownHex.r, s: a + this.ownHex.s }) };
                if (this.TCAorientation == 3) { list.push({ q: -radius + this.ownHex.q, r: -a + this.ownHex.r, s: -b + this.ownHex.s }) };
                if (this.TCAorientation == 4) { list.push({ q: a + this.ownHex.q, r: b + this.ownHex.r, s: radius + this.ownHex.s }) };
                if (this.TCAorientation == 5) { list.push({ q: -b + this.ownHex.q, r: -radius + this.ownHex.r, s: -a + this.ownHex.s }) };
            }
        }
        return { 'green': list }
    }

    // getTurretCoverArcForCalc () == getTurretCoverArc(1)
    getCoverArc() {                                     // returns VCA + TCA 

        let list2 = super.getCoverArc()
        let list = this.getTurretCoverArc()
        Object.assign(list, list2)

        return list;
    }

//-----------add-on for firing-------------------
    hit(result){
        console.log('it is a HIT method of target:',result) // result is NMC,KIA e.t.c

        return
    }
};


let table = {
    AFV : AFV,
    ManCounters : ManCounters,
    SingleManCounters : SingleManCounters,
    allCounters : [],
}

export { table }




