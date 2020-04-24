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
        ownHex: undefined,
        schemeObj: undefined,
        commander: undefined,
    }

    let addToStack = (counter) => {
        //console.log(counter.getType())
        let counterType = counter.getType()

        switch (counterType) {

            case 'MultiManCounter':
                if (stack.MMCnumber == 3) {
                    console.log(' there are already 3 MMC in stack, cannot add more ')
                    return;
                }

                // if (stack._isStackUnderCommand){
                //     let commander = stack.commander
                // }
                stack.mgArray.push(counter)
                stack.MMCnumber += 1

                break;

            case 'SingleManCounter':
                if (stack.SMCnumber == 4) {
                    console.log(' there are already 4 MMC in stack, cannot add more ')
                    return;
                }
                // stack.mgArray.forEach((counter) => {

                //     try {
                //         counter.getReadyToMoveUnderSMCcommand()
                //     }
                //     catch (e) {
                //         console.log(e)
                //     }
                // })
                // if (!stack._isStackUnderCommand) {
                //     stack._getUnderCommand(counter)
                // }


                stack.mgArray.push(counter)
                stack.SMCnumber += 1

                break;

            default:
                throw 'unexpected counter type adding to Moving Group. Should be MMC or SMC'
        }


        return stack
    }

    function getCommandBonus() {
        if (stack.commander) {
            stack.mgArray.forEach((counter) => {
                try {
                    counter.getCommanderBonus()
                    counter.getUnderCommand()
                }
                catch (e) {
                    console.log(e,'cannot get C bonus')
                }
            })
        }
    }
    function getUnderCommand(counter) {
        stack.commander = counter
    }

    function isUnderCommand() {
        return stack.commander
    }

    let setStatus = function (status) {
        stack.status = status
        return stack
    }

    let setOwnHex = function (hex) {
        stack.ownHex = hex
        return stack
    }


    let getStackCountersArrLength = function () {
        return stack.mgArray.length
    }

    let getStackCountersArray = function () {
        return stack.mgArray
    }

    let getOwnHex = function () {
        return stack.ownHex
    }
    let getUIScheme = function () {
        return stack.schemeObj
    }

    let setUIDisabled = function () {
        for (let key in stack.schemeObj) {
            stack.schemeObj[key] = false
        }
    }
    let removeCounterFromArray = function (counter) {
        let arr = stack.getStackCountersArray()
        if (arr.length == 0) throw 'u tryin to remove counter from empty MGarray'
        let ind = arr.indexOf(counter)
        if (ind == -1) throw 'u tryin to remove already removed counter from MGarray'

        stack.mgArray.splice(ind, 1)

    }

    function isEnabled(buttonName) {
        return stack.schemeObj[buttonName]
    }

    function enableButton(buttonName) {
        stack.schemeObj[buttonName] = true
    }

    function disableButton(buttonName) {
        stack.schemeObj[buttonName] = false
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
                    'End Movement' : false,
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
                getCommandBonus,
                isUnderCommand,
                getUnderCommand,
                isEnabled,
                enableButton,
                disableButton,
            })

            break;
        case 'firing':
            break;
    }



    return stack
}
