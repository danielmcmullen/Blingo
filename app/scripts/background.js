'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var port = chrome.tabs.connect(tab.id);
  port.onMessage.addListener(function(msg) {
    if(msg.ready)
    {
        port.postMessage({replace:'you', replaceWith: 'BOB!!!!'});
    }
  });
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  // how to fetch tab url using activeInfo.tabid
  chrome.tabs.get(activeInfo.tabId, function(tab){
      var port = chrome.tabs.connect(tab.id);
      port.onMessage.addListener(function(msg) {
        if(msg.ready)
        {
            port.postMessage({replace:'you', replaceWith: 'BOB!!!!'});
        }
      });
  });
});
