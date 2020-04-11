// const stackFactory = function (type) {

//     //if(type!='moving'&&type !='firing') throw 'shoul be moving or firing' 
// }

// stackFactory.prototype = function createMovingStack() {

// }
//====================================================================================================================================

// const stackFactory = function () {

// }

// stackFactory.createMovingStack = function () {
//     return {
//         mgArray: [],
//         MMCnumber: 0,
//         SMCnumber: 0,
//         status: undefined,

//         schemeObj: {
//             'Assault Move': true,
//             'Double Time': true,
//             'Break Stack': true,
//         }
//     }
// }

// const counters_stack_Manipulator = {
//     addToMovingStack: (stack, counter) => {

//     }
// }
// export {
//     countersFactory, stackFactory, counters_stack_Manipulator
// }

//====================================================================================================================================

export function createStack(type) {
    let stack = {
        mgArray: [],
        MMCnumber: 0,
        SMCnumber: 0,
        status: undefined,
        ownHex:undefined,
        schemeObj:undefined
    }

    let addToStack = (counter) => {
        console.log(counter.getType())
        let counterType = counter.getType()

        switch (counterType) {

            case 'MultiManCounters':
                if (stack.MMCnumber == 3) {
                    console.log(' there are already 3 MMC in stack, cannot add more ')
                    return;
                }
                stack.mgArray.push(counter)
                stack.MMCnumber += 1

                break;

            case 'SingleManCounters':
                if (stack.SMCnumber == 4) {
                    console.log(' there are already 4 MMC in stack, cannot add more ')
                    return;
                }
                stack.mgArray.forEach((counter) => {
                    try {
                        counter.getReadyToMoveUnderSMCcommand()
                    }
                    catch (e) {
                        console.log(e)
                    }
                })
                stack.mgArray.push(counter)
                stack.SMCnumber += 1

                break;

            default:
                throw 'unexpected counter type adding to Moving Group. Should be MMC or SMC'
        }


        return stack
    }

    let setStatus = function(status) {
        stack.status = status
        return stack
    }

    let setOwnHex = function(hex) {
        stack.ownHex = hex
        return stack
    }


    let getStackCountersArrLength = function(){
        return stack.mgArray.length 
    }

    let getStackCountersArray = function(){
        return stack.mgArray
    }

    let getOwnHex = function(){
        return stack.ownHex
    }
    let getUIScheme = function(){
        return stack.schemeObj
    }

    let setUIDisabled = function(){
        for(let key in stack.schemeObj){
            stack.schemeObj[key] = false
        }
    }
    let removeCounterFromArray = function(counter){
        let arr = stack.getStackCountersArray()
        if (arr.length == 0) throw 'u tryin to remove counter from empty MGarray'
        let ind = arr.indexOf(counter)
        if (ind == -1) throw 'u tryin to remove already removed counter from MGarray'

        stack.mgArray.splice(ind, 1)

    }
    //Object.create(Animal.prototype)
    //prototype: {}
    switch (type) {
        case 'moving':
            Object.assign(stack, {
                schemeObj: {
                    'Assault Move': true,
                    'Double Time': true,
                    'Break Stack': true,
                },
                addToStack,
                setStatus,
                setOwnHex,
                getStackCountersArrLength,
                getStackCountersArray,
                getOwnHex,
                getUIScheme,
                setUIDisabled,
                removeCounterFromArray,
            })

            break;
        case 'firing':
            break;
    }



    return stack
}

// export function createCounter(param){
//     let counter = {
//         src: param.src,
//         owner:param.owner,    
//         options:param.options,    
//         ownHex:param.ownHex,    
//         img:undefined,    
//         imageID:undefined,    
//         status:undefined,    
//         colorBorder:undefined,    
//         weightHex : 1,
//         ID:(Math.random() + 1).toString(36).slice(2, 18),
//     }

//     let counterMethods = {
//         getImageID() {
//             return counter.imageID
//         },
    
//         getScheme(phase) {
//             return counter.currentInterfaceElements[phase]
//         },
    
//         setHexPosition(hex) {
//             counter.ownHex = hex
//         },
    
//         setNewStatus(status) {
//             counter.status = status
//         },
    
//         getStatus() {
//             return counter.status
//         },
    
//         setWeightHex(num) {
//             counter.weightHex = num
//         },
//         getWeightHex(){
//             return counter.weightHex
//         },
    
//         getID () {
//             return counter.ID
//         },
//     }

//     //---------------------------

//     let basicCounter = Object.create(counterMethods)
//     Object.assign(basicCounter,counter)

//     //---------------------------
//     let movingCounterProperties = {

//     }
//     return counter
// }


export function createCounter(param){
    let counter = {
        src: param.src,
        owner:param.owner,    
        options:param.options,    
        ownHex:param.ownHex,    
        img:undefined,    
        imageID:undefined,    
        status:undefined,    
        colorBorder:undefined,    
        weightHex : 1,
        ID:(Math.random() + 1).toString(36).slice(2, 18),
    }

    let counterProto = {
        getImageID() {
            return counter.imageID
        },
    
        getScheme(phase) {
            return counter.currentInterfaceElements[phase]
        },
    
        setHexPosition(hex) {
            counter.ownHex = hex
        },
    
        setNewStatus(status) {
            counter.status = status
        },
    
        getStatus() {
            return counter.status
        },
    
        setWeightHex(num) {
            counter.weightHex = num
        },
        getWeightHex(){
            return counter.weightHex
        },
    
        getID () {
            return counter.ID
        },
    }

    //---------------------------

    let basicCounter = Object.create(counterProto)
    Object.assign(basicCounter,counter)

    //---------------------------
    let movingCounterProto = Object.create(counterProto)
    let movingMixins = {
        getCostToEnter(type) {
            return counter.costToEnterHash[type]
        },
    
        getMovingStatus(){
            return counter.movingStatus 
        },
    
        setMovingStatus(status) {
    
            if (!counter.getMovingStatus) throw 'there is no possibility to set Moving status here'
    
            let arr = ['moving','moved','brokenStackRemnant']
    
            if (arr.indexOf( status ) != -1 ) {
                counter.movingStatus = status
            }else{
                throw `there is no sucj status as ${status} in possible to set for counter`
            }
        }
    }

    Object.assign(movingCounterProto,movingMixins)


    return counter
}


var MyClass = {
    prototype: {
      // prototypal members and methods
    },
    create: function(options){
      // do stuff with options
      return Object.create(MyClass.prototype, options);
    }
  };