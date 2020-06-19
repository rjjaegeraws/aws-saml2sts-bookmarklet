// ==Bookmarklet==
// @name AWS Copy SAML Bookmarklet
// @author Ryan Jaeger (@rjjaegeraws) , Shea Phillips (@sheaphillips)
// ==/Bookmarklet==
(function () {
    function copyToClipboard(text) { 
        var dummy = document.createElement("textarea"); 
        document.body.appendChild(dummy); 
        dummy.value = text; 
        dummy.select(); 
        document.execCommand("copy"); 
        document.body.removeChild(dummy); 
    } 
    
    var saml = document.getElementsByName('SAMLResponse')[0]; 
     
    copyToClipboard(saml.value);
})();