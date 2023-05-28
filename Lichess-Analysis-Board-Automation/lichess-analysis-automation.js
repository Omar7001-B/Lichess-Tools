// ==UserScript==
// @name         Lichess Analysis Board Automation
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically open the analysis board and request a computer analysis on Lichess after finishing a game.
// @author       Your Name
// @match        https://lichess.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to open the analysis board in a new tab
    function openAnalysisBoard() {
        var analysisButtons = document.getElementsByClassName('fbt');
        for (var i = 0; i < analysisButtons.length; i++) {
            if (analysisButtons[i].textContent.includes('Analysis board')) {
                var analysisUrl = analysisButtons[i].getAttribute('href');
                window.open(analysisUrl, '_blank');
                break;
            }
        }
    }

    // Function to click on the "Request a computer analysis" button
    function requestComputerAnalysis() {
        // This code to get the game from the first move
        var button = document.querySelector('#main-wrap > main > div.analyse__controls.analyse-controls > div.jumps > button:nth-child(1)');
        if (button) {
            var event = new MouseEvent('mousedown', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            button.dispatchEvent(event);
        }



        var requestAnalysisButton = document.querySelector('span.is3'); // Request a computer Analysis
        if (requestAnalysisButton) {
            requestAnalysisButton.click();
        }

        var pvBoxElement = document.querySelector('.pv_box');
        if (!pvBoxElement) { // if the engine is not on
            var label = document.querySelector('label[for="analyse-toggle-ceval"]');
            if (label) { // tur it on
                label.click();
            }
        }
    }

    // Function to periodically check the status element
    function checkGameStatus() {
        var statusElement = document.querySelector('.status');
        if (statusElement) {
            var statusText = statusElement.textContent;
            if (statusText.includes('is victorious') || statusText.includes('Draw') || statusText.includes('Stalemate')) {
                openAnalysisBoard();
                setTimeout(requestComputerAnalysis, 2000); // Delay before clicking the button (adjust as needed)
            } else {
                setTimeout(checkGameStatus, 1000); // Check again after 1 second (adjust as needed)
            }
        } else {
            setTimeout(checkGameStatus, 1000); // Check again after 1 second (adjust as needed)
        }
    }

    // Start checking the game status
    checkGameStatus();
})();
