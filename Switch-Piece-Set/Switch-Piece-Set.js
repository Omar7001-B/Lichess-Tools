// ==UserScript==
// @name         Show/Hide Pieces Script
// @namespace    http://your-namespace.example/
// @version      1.0
// @description  Clicks on buttons to show/hide chess pieces based on Num Lock key press
// @match        https://lichess.org/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function clickButton() {
        const icpiecesButton = document.querySelector('button[title="icpieces"]');
        const disguisedButton = document.querySelector('button[title="disguised"]');

        if (!icpiecesButton && !disguisedButton) {
            const clickIfAccessible = async (selector) => {
                const element = document.querySelector(selector);
                if (element) {
                    element.click();
                } else {
                    await sleep(100);
                    await clickIfAccessible(selector);
                }
            };

            await clickIfAccessible("#user_tag");
            await clickIfAccessible("#dasher_app > div > div.subs > button:nth-child(6)");
            await clickIfAccessible("#user_tag");
        }

        switchPieceSet();
    }




    function switchPieceSet(){
        const icpiecesButton = document.querySelector('button[title="icpieces"]');
        const disguisedButton = document.querySelector('button[title="disguised"]');
        if (icpiecesButton && !icpiecesButton.classList.contains('active')) {
            icpiecesButton.click();
        } else if (disguisedButton) {
            disguisedButton.click();
        }
    }

    // Event listener for keydown event
    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 109 || event.keyCode === 189) { // Key code for '-'
            clickButton();
        }
    });


    
})();
