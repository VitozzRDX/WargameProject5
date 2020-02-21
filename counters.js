class Counter {
    constructor(param) {
        
        this.src = param.src;

        this.owner = param.owner ;

        this.options = param.options


        this.img = undefined;
        
    };
    
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
            'Rally' : false ,
        }

        this.otherSideSrc = param.otherSideSrc;

    }

}

export {
    Counter,
    ManCounters
}