// ==UserScript==
// @name         163MusicDownloader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  A convinent tool to download 163 musics
// @author       KelvinQiu
// @match        https://music.163.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=music.163.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  window.addEventListener('hashchange', function () {
    this.location.reload();
  });

  window.addEventListener('load', function () {
    // URL Test
    if (this.location.href.split('/#/')[1].startsWith('song')) {
      main();
    }
  });

  function main() {
    let buttonBox = getButtonBox();
    if (!isVIP(buttonBox)) addDownloadButton(buttonBox);
  }

  function getButtonBox() {
    let iframe = document.querySelector('#g_iframe');
    return iframe.contentWindow.document.querySelector('#content-operation');
  }

  function addDownloadButton(fatherNode) {
    // Add Button
    let button = document.createElement('a');
    button.classList.add('u-btni', 'u-btni-dl');
    button.style.width = '78px';
    button.style.marginTop = '10px';
    button.innerHTML = '<i style="color: red; font-weight: bold;">直接下载</i>';
    // Set Link
    button.href = getDownloadLink();
    button.target = '_blank';
    fatherNode.append(button);
  }

  function getDownloadLink() {
    let curLink = window.location.href;
    // Get Music ID
    const ID = curLink.split('id=')[1];
    // Return New Link
    return `http://music.163.com/song/media/outer/url?id=${ID}.mp3`;
  }

  function isVIP(buttonBox) {
    let firstButton = buttonBox.firstElementChild;
    let songType = firstButton.firstElementChild.innerHTML;
    return songType.includes('VIP');
  }
})();
