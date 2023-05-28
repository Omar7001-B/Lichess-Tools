// ==UserScript==
// @name         Lichess Chess Board Color Filter
// @namespace    lichess-chess-board-color-filter
// @version      1.0
// @description  Adds a red color filter to the chessboard on Lichess if the bottom clock time is less than the top clock time.
// @author       YourName
// @match        https://lichess.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to compare the time of the bottom clock with the top clock
    function compareClockTimes() {
        var bottomClock = document.querySelector(".rclock-bottom");
        var topClock = document.querySelector(".rclock-top");

        if (bottomClock && topClock) {
            var bottomTime = bottomClock.textContent.trim();
            var topTime = topClock.textContent.trim();

            // Convert clock times to seconds
            var bottomSeconds = convertToSeconds(bottomTime);
            var topSeconds = convertToSeconds(topTime);

            overlay.style.display = bottomSeconds < topSeconds ? "block" : "none";
        }
    }

    // Function to convert clock time to seconds
    function convertToSeconds(time) {
        var parts = time.split(":");
        var minutes = parseInt(parts[0]);
        var seconds = parseInt(parts[1]);

        return minutes * 60 + seconds;
    }

    // Create overlay element
    var overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
    overlay.style.pointerEvents = "none";
    overlay.style.zIndex = "9999";

    // Wait for the window to load
    window.onload = function() {
        var boardElement = document.querySelector("#main-wrap > main > div.round__app.variant-standard > div.round__app__board.main-board > div > cg-container > cg-board");
        boardElement.appendChild(overlay);

        // Run the comparison function initially
        compareClockTimes();

        // Check the clock times every second
        setInterval(compareClockTimes, 200);
    };
})();
