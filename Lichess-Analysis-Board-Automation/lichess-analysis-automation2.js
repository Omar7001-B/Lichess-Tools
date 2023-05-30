// ==UserScript==
// @name         Lichess Analysis Board Automation 1.2
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically open the analysis board and request a computer analysis on Lichess after finishing a game.
// @author       Your Name
// @match        https://lichess.org/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Function to open the analysis board in a new tab
    function openAnalysisBoard() {
        const analysisBoardButton = document.querySelector("#main-wrap > main div.rcontrols > div > a");
        if(analysisBoardButton){
            analysisBoardButton.click();
        }
    }

    // Function to click on the "Request a computer analysis" button
    async function requestComputerAnalysis() {
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
        while(requestAnalysisButton == null){
            await sleep(1000);
            requestAnalysisButton = document.querySelector('span.is3');
        }

        if (requestAnalysisButton) {
            requestAnalysisButton.click();
        }

        const cevalEnabledSelector = document.querySelector("#main-wrap > main > div.analyse__tools > div.ceval.enabled > div.switch > label");
        const cevalButton = document.querySelector("#main-wrap > main > div.analyse__tools > div.ceval > div > label");
        if (cevalEnabledSelector == null) {
            cevalButton.click();
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function sendChatMessage(message) {
        // Find the chat input field element
        const chatInput = document.querySelector("#main-wrap > main > aside > section > div.mchat__content.discussion > input");

        // Check if the chat input field exists
        if (chatInput) {
            // Set the message in the chat input field
            chatInput.value = message;

            // Trigger the Enter key press event
            const event = new KeyboardEvent("keydown", {
                key: "Enter",
                keyCode: 13,
                bubbles: true,
                cancelable: true,
            });
            chatInput.dispatchEvent(event);
        } else {
            console.log("Chat input field not found.");
        }
    }

    // Function to periodically check the status element
    async function checkGameStatus() {
        const analysisBoardButton = document.querySelector("#main-wrap > main div.rcontrols > div > a");
        const requestAnalysisButton = document.querySelector("span.is3");
        if (analysisBoardButton || requestAnalysisButton) {
            const message = "It was a good game! Give me 2 minutes to analyze the game, and then we can rematch again.";
            sendChatMessage(message);
            openAnalysisBoard();
            await sleep(1000); // Delay before clicking the button (adjust as needed)
            requestComputerAnalysis();
        } else {
            await sleep(1000); // Check again after 1 second (adjust as needed)
            checkGameStatus();
        }
    }

    // Start checking the game status
    checkGameStatus();
})();
