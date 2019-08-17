// ==UserScript==
// @name         HumbleBundleLinkCopier
// @namespace    humblebundlelinkcopier
// @version      0.1
// @description  Adds a button on Humble Bundle purchase pages to copy all download links to the clipboard
// @author       Colin Champney
// @match        *://*.humblebundle.com/downloads?key=*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener("load", add_button);
})();

function add_button() {
    var parent = $("div.js-gamelist-holder")[0];
    var button = document.createElement("button");
    button.onclick = print_urls;
    button.innerText = "Copy DL URLs";

    parent.insertBefore(button, parent.firstChild);
}

function print_urls() {
    var elems = $(".js-start-download a");
    var elem_links = [];

    for (var i = 0; i < elems.length; i++) {
        console.log("HBLC: " + elems[i].href);
        elem_links.push(elems[i].href);
    }

    navigator.clipboard.writeText(elem_links.join("\n")).then(function(e) {
        console.log("HBLC: Copied links to clipboard successfully!");
    }, function(e) {
        console.error("HBLC: Unable to write links to clipboard: " + e);
    });
}