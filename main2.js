import { Client } from './client.js'


var canvas = document.getElementById('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let Main = {};

Main.username = "V";
Main.opponentname = "S";

Main.client = new Client();

// --- let's initiate our Client with initial settings ------------------
// --- for example we can get from server different initialSettings of starting Phase ---
// --- in this case user will see different Phase on Rondel and will get different reaction

let initialSettings = {
    firstPlayer: 'Nazi',
    secondPlayer: 'Ally',
    //-------------------- 17 03 2020 Phase Switching ---------------------------------
    startingPhase: 'firstPlayerRallyPhase',//'firstPlayerRallyPhase','firstPlayerMovementPhase'
    startingSidePictureSrc: 'assets/turnphaseaxis.gif',
    otherSidePictureSrc: 'assets/turnphaseallied.gif',

    mapSrc: 'assets/mapEndedV.svg',   //'assets/bdv.gif'  mapEndedV.svg

    countersOptions: {
        squadType_propertiesHash: {
            'ruSquadE-0': {
                src: 'assets/628corrected3(a).svg',
                otherSideSrc: 'assets/ruh7b.gif',//'assets/628.svg',//'assets/ruh7b.gif',
                className: 'MultiManCounters',
                owner: 'Ally',
                movementFactor: 4,
                type: 'MultiManCounter',
                normalRange:10,
                firePower:2,
                experience:'E',
                morale : 8,
                name: 'ruSquadE-0',

                halfSquad: {
                    src: 'assets/ru328H.gif',
                    otherSideSrc: 'assets/ruh7b.gif',
                    normalRange:3,
                    size : 'halfsquad'
                },
            },

            'ruMMG': {
                src: "assets/ruMMG.gif",
                otherSideSrc: "assets/ruMMGb.gif",
                className: "Weapon",
                owner: 'Ally',
                name: 'ruMMG',
                type: 'MashineGun',
                normalRange:16,
                firePower:4,
                rateOfFire:2,
                breakdownNumber:12,
            },

            'ruLMG': {
                src: "assets/ruLMG.gif",
                otherSideSrc: "assets/ruLMGb.gif",
                className: "Weapon",
                owner: 'Ally',
                name: 'ruMMG',
                type: 'MashineGun',
                normalRange:6,
                firePower:2,
                rateOfFire:1,
                breakdownNumber:12,
            },

            'geSquadE-0': {
                src: 'assets/ge467S.gif',   // 'assets/ge467S.gif',
                otherSideSrc: 'assets/geh7b.gif',
                className: 'MultiManCounters',
                owner: 'Nazi',
                movementFactor: 4,
                name: 'geSquadE-0',
                type: 'MultiManCounter',
                normalRange:4,
                firePower:6,
                experience:'E',
                morale : 8,
            },

            'geSquadE-1': {
                src: 'assets/ge468S.gif',
                otherSideSrc: 'assets/geh7b.gif',
                className: 'MultiManCounters',
                owner: 'Nazi',
                movementFactor: 4,
                name: 'geSquadE-1',
                type: 'MultiManCounter',
                
                normalRange:8,
                firePower:6,
                experience:'E',
                morale : 8,
            },

            'geSMC9-1': {
                src: 'assets/geL91.gif',   // 'assets/ge467S.gif',
                otherSideSrc: 'assets/geL91b.gif',
                className: 'SingleManCounters',
                owner: 'Nazi',
                movementFactor: 6,
                name: 'geSMC9-1',
                type: 'SingleManCounter',
                commandBonus:-1,
                morale : 8,


            },
            'geHMG': {
                src: "assets/geHMG.gif",
                otherSideSrc: "assets/geHMGb.gif",
                className: "Weapon",
                owner: 'Nazi',
                name: 'geHMG',
                type: 'MashineGun',
                normalRange:16,
                firePower:6,
                rateOfFire:2,
                breakdownNumber:12,
            },
            'ruSMC8-0': {
                src: 'assets/ruL80.gif',   
                otherSideSrc: 'assets/ruL80b.gif',
                className: 'SingleManCounters',
                owner: 'Ally',
                movementFactor: 6,
                name: 'ruSMC8-0',
                type: 'SingleManCounter',
                commandBonus:-0,
                morale : 8,
            },
            'ruSMC8-1': {
                src: 'assets/ruL81.gif',   
                otherSideSrc: 'assets/ruL81b.gif',
                className: 'SingleManCounters',
                owner: 'Ally',
                movementFactor: 6,
                name: 'ruSMC8-1',
                type: 'SingleManCounter',
                commandBonus:-1,
                morale : 8,
            },
            'ruSMC7-0': {
                src: 'assets/ruL70.gif',   
                otherSideSrc: 'assets/ruL70b.gif',
                className: 'SingleManCounters',
                owner: 'Ally',
                movementFactor: 6,
                name: 'ruSMC7-0',
                type: 'SingleManCounter',
                commandBonus:-0,
                morale : 8,
            },
            
        },

        parametersOnCreationHash: {
            'ruSquadE-0': [{ q: 6, r: 0, s: -6 },],           //{q: 13, r: -1, s: -12}                             // {top:100,left:100}
            'geSquadE-0': [{ q: 12, r: 0, s: -12 },{ q: 9, r: 4, s: -13 },{ q: 10, r: 3, s: -13 },{ q: 10, r: 3, s: -13 },{ q: 10, r: 3, s: -13 }],
            'geSquadE-1': [{ q: 8, r: 5, s: -13 }],
            'geSMC9-1': [{ q: 8, r: 5, s: -13 }],
            'geHMG' : [{ q: 11, r: 0, s: -11 }],

            'ruSMC8-0': [{ q: 6, r: 0, s: -6 }],
            'ruSMC8-1': [{ q: 6, r: 0, s: -6 }],
            'ruSMC7-0': [{ q: 6, r: 0, s: -6 }],

            'ruLMG':[{q: 16, r: -6, s: -10},{ q: 17, r: -5, s: -12}],
            'ruMMG':[{ q: 17, r: -5, s: -12}],

        },



    }
}

Main.client.init(initialSettings)
//--------- -------------------------------------------------------------
window.addEventListener('keydown', function (e) {
    if (e.keyCode == 87 || e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 83) {
        e.preventDefault()
    };
});

document.getElementById('canvasContainer').tabIndex = 1000;

document.getElementById('canvasContainer').focus()
document.getElementById('canvasContainer').addEventListener("keydown", function (options) {        // we'll also need for blur event to come back focus on canv
    Main.client.processKeyDown(options);
});
// document.getElementById('canvasContainer').addEventListener("keyup", function(options) {        // we'll also need for blur event to come back focus on canv
//     Main.client.processKeyUp(options);
// });




//-------------------------------------------------------------------------------------------------------------------------------
