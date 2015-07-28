'use strict';

var textReplacer = (function(){
  var replaceMe = '';
  var replaceWith = '';
  var init = function(replaceText, replaceWithText){
    replaceMe = replaceText;
    replaceWith = replaceWithText;
    traverseTheDom(document.body);
  };

  chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      if(msg.replace && msg.replaceWith)
      {
        init(msg.replace, msg.replaceWith);
      }
    });

    port.postMessage({ready: true});
  });

  var traverseTheDom = function(node){
    var child, next;

    //nodeType reference - https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    switch ( node.nodeType )
    {
      case 1:  // Element
      case 9:  // Document
      case 11: // Document fragment
        child = node.firstChild;
        while ( child )
        {
          next = child.nextSibling;
          traverseTheDom(child);
          child = next;
        }
        break;

      case 3: // Text node
        replaceText(node);
        break;
    }
  };

  function replaceText(textNode)
  {
  	var v = textNode.nodeValue;
    var regex = new RegExp("(" + preg_quote(replaceMe) + ")", 'gi' );
  	v = v.replace(regex, replaceWith);

  	textNode.nodeValue = v;
  };

  //http://stackoverflow.com/questions/280793/case-insensitive-string-replacement-in-javascript
  function preg_quote( str ) {
    // http://kevin.vanzonneveld.net
    // +   original by: booeyOH
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: preg_quote("$40");
    // *     returns 1: '\$40'
    // *     example 2: preg_quote("*RRRING* Hello?");
    // *     returns 2: '\*RRRING\* Hello\?'
    // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
    // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'

    return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
}
})();
