
export function createStack(type) {
    let stack = {
        mgArray: [],
        MMCnumber: 0,
        SMCnumber: 0,
        status: undefined,
        ownHex: undefined,
        schemeObj: undefined,
        commander: undefined,
        startingRoadBonus: 0,
        isOnTheRoadFromStart: undefined,
        gotNoRoadBonus: true,
        experience: undefined
    }



    let addToStack = (counter) => {

        let counterType = counter.getType()

        switch (counterType) {

            case 'MultiManCounter':
                if (stack.MMCnumber == 3) {
                    console.log(' there are already 3 MMC in stack, cannot add more ')
                    return;
                }

                stack.mgArray.push(counter)
                stack.MMCnumber += 1

                break;

            case 'SingleManCounter':
                if (stack.SMCnumber == 4) {
                    console.log(' there are already 4 MMC in stack, cannot add more ')
                    return;
                }

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
                    console.log(e, 'cannot get C bonus')
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

    function startOnRoad() {
        stack.isOnTheRoadFromStart = true
        //stack.gotNoRoadBonus = true
    }

    function addRoadBonus() {

        stack.mgArray.forEach((counter) => {
            counter.getRoadBonus()
            counter.setOnTheRoad(true)
        })

    }

    function setHex_Bonus(hex, bonus) {

        if (typeof hex === 'object') {
            hex = JSON.stringify(hex)
        }
        //hex = JSON.stringify(hex)

        if (stack['hex_bonus'][hex]) {
            let bonus1 = stack[hex]
            stack[hex] = Math.max(bonus1, bonus)
            return
        }

        console.log('bonus-',bonus)

        stack['hex_bonus'][hex] = bonus
    }

    function setHex_countersArray(hex, counter) {


        if (typeof hex === 'object') {
            hex = JSON.stringify(hex)
        }

        if (stack['hex_countersArray'][hex]) {
            stack['hex_countersArray'][hex].push(counter)
            return
        }

        stack['hex_countersArray'][hex] = [counter]

    }

    function _isHex_CountersArrayEmpty(hex) {
        if (typeof hex === 'object') {
            hex = JSON.stringify(hex)
        }
        if (stack['hex_countersArray'][hex]) {
            return false
        }

        return true
    }

    function addToGeneralCountersArray(counter) {
        stack.mgArray.push(counter)
    }
    function calculateCommanderBonus() {
        let arr = Object.values(stack['hex_bonus'])
        console.log(arr);

        return Math.min(...arr)

    }


    // function setCommanderCover(){
    //     if (Object.values(stack['hex_bonus']).length < Object.values(stack['hex_countersArray'])){
    //         stack.underCommand = false    // stack.underCommand = true
    //         return
    //     }
    //     stack.underCommand = true
    // }

    function setHex_LoS(hex, bool) {
        if (typeof hex === 'object') {
            hex = JSON.stringify(hex)
        }
        stack['hex_los'][hex] = bool
    }

    function setHex_Hindrance(hex, hind) {
        if (typeof hex === 'object') {
            hex = JSON.stringify(hex)
        }
        stack['hex_hindrance'][hex] = hind
    }

    function getNumberOfHexes() {
        return Object.values(stack['hex_los']).length
    }
    function setUISchemeButton(name, bool) {
        stack.schemeObj[name] = bool
    }

    function getHexesWithoutLoSArray() {
        let arr = []
        for (let hex in stack['hex_los']) {
            if (!stack['hex_los'][hex]) {
                arr.push(hex)
            }
        }
        return arr
    }

    function getHexesWithLoSArray() {
        let arr = []
        for (let hex in stack['hex_los']) {
            if (stack['hex_los'][hex]) {
                arr.push(hex)
            }
        }
        return arr
    }

    switch (type) {
        case 'moving':
            Object.assign(stack, {
                schemeObj: {
                    'Assault Move': true,
                    'Double Time': true,
                    'Break Stack': true,
                    'End Movement': false,
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
                startOnRoad,
                addRoadBonus,
            })

            break;
        case 'firing':
            stack = {
                commander: undefined,
                status: undefined,
                hindranceDRM: undefined,
                mgArray: [],
                hex_countersArray: {},
                hex_bonus: {},
                hex_los: {},
                hex_hindrance: {},
                //ownHexes:[],
            }
            Object.assign(stack, {
                schemeObj: {
                    'Cancel Fire': true,
                    // 'Fire As Separate Groups':false,
                    // 'Fire From Every Hexes':false,
                },
                //addToFiringStack,
                setStatus,
                getStackCountersArray,
                setHex_Bonus,
                setHex_countersArray,
                _isHex_CountersArrayEmpty,
                addToGeneralCountersArray,
                calculateCommanderBonus,
                getNumberOfHexes,
                setHex_LoS,
                setHex_Hindrance,
                setUISchemeButton,
                getUIScheme,
                getHexesWithoutLoSArray,
                getHexesWithLoSArray
            })

            break;
    }



    return stack
}
