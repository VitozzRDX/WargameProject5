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
    startingPhase: 'firstPlayerRallyPhase',
    startingSidePictureSrc: 'assets/turnphaseaxis.gif',
    otherSidePictureSrc: 'assets/turnphaseallied.gif',

    mapSrc: 'assets/bdv.gif',

    countersOptions: {
        squadType_propertiesHash: {
            'ruSquadE-0': {
                src: 'assets/ru628S.gif',
                otherSideSrc: 'assets/ruh7b.gif',
                className: 'ManCounters',
                owner:'Ally',
                movementFactor:4
            },

            'geSquadE-0': {
                src: 'assets/ge467S.gif',
                otherSideSrc: 'assets/geh7b.gif',
                className: 'ManCounters',
                owner:'Nazi',
                movementFactor:4
            },
        },

        parametersOnCreationHash : {
            'ruSquadE-0':[{q:6,r:0,s:-6}],                                        // {top:100,left:100}
            'geSquadE-0':[{q:9,r:0,s:-9},{q:9,r:1,s:-10}]
        },

        

    }
}

Main.client.init(initialSettings)
//--------- -------------------------------------------------------------
window.addEventListener('keydown', function(e) {
    if( e.keyCode == 87 || e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 83) {
    e.preventDefault()};
});

document.getElementById('canvasContainer').tabIndex = 1000;

document.getElementById('canvasContainer').focus()
document.getElementById('canvasContainer').addEventListener("keydown", function(options) {        // we'll also need for blur event to come back focus on canv
    Main.client.processKeyDown(options);
});
// document.getElementById('canvasContainer').addEventListener("keyup", function(options) {        // we'll also need for blur event to come back focus on canv
//     Main.client.processKeyUp(options);
// });




//-------------------------------------------------------------------------------------------------------------------------------
