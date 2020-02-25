class Counter {
    constructor(param) {

        this.src = param.src;

        this.owner = param.owner;

        this.options = param.options


        this.img = undefined;

        this.imageID = undefined;

    };

    getImageID() {
        return this.imageID
    }

    getScheme(phase) {
        return this.currentInterfaceElements[phase]
    }
}

class SelfMovingCounters extends Counter {
    constructor(param) {
        super(param)

    }

}

class ManCounters extends SelfMovingCounters {
    constructor(param) {
        super(param)

        //this.morale = param.morale

        this.currentInterfaceElements = {
            'firstPlayerRallyPhase': { 'Rally': false },
        }

        this.otherSideSrc = param.otherSideSrc;

    }

}

export {
    Counter,
    ManCounters
}