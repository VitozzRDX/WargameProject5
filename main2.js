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
                otherSideSrc: 'assets/628.svg',//'assets/ruh7b.gif',
                className: 'MultiManCounters',
                owner: 'Ally',
                movementFactor: 4
            },

            'geSquadE-0': {
                src: 'assets/ge467S.gif',   // 'assets/ge467S.gif',
                otherSideSrc: 'assets/geh7b.gif',
                className: 'MultiManCounters',
                owner: 'Nazi',
                movementFactor: 4,
                name: 'geSquadE-0'
            },

            'geSquadE-1': {
                src: 'assets/ge468S.gif',
                otherSideSrc: 'assets/geh7b.gif',
                className: 'MultiManCounters',
                owner: 'Nazi',
                movementFactor: 4,
                name: 'geSquadE-1'
            },

            'geSMC9-1': {
                src: 'assets/geL91.gif',   // 'assets/ge467S.gif',
                otherSideSrc: 'assets/geL91b.gif',
                className: 'SingleManCounters',
                owner: 'Nazi',
                movementFactor: 6,
                name: 'geSMC9-1'
            },
            'geHMG': {
                src: "assets/geHMG.gif",
                className: "Weapon",
                owner: 'Nazi',
                name: 'geHMG'
            }
        },

        parametersOnCreationHash: {
            'ruSquadE-0': [{ q: 6, r: 0, s: -6 }],                                        // {top:100,left:100}
            'geSquadE-0': [{ q: 9, r: 0, s: -9 }],
            'geSquadE-1': [{ q: 9, r: 0, s: -9 }],
            'geSMC9-1': [{ q: 9, r: 0, s: -9 }],
            'geHMG' : [{ q: 11, r: 0, s: -11 }]
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
