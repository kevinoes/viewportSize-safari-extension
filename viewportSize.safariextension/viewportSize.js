var viewportSizeTimeout,
    webinspectorOnly = false,
    viewportWatching = false;


//show viewport size
var viewportWatcher = function() {

    //check if info div exists
    if(document.getElementById('viewportSize')) {

        //update existing
        document.getElementById('viewportSize').innerHTML = window.innerWidth + ' x ' + window.innerHeight;

        //make info div go away after a second
        clearTimeout(viewportSizeTimeout);
        viewportSizeTimeout = setTimeout(function() {
            document.getElementById('viewportSize').remove();
            viewportSizeTimeout = false;
        }, 1000);

    //create new info div
    } else {
        var infoDiv = document.createElement('div');
        infoDiv.setAttribute('id', 'viewportSize');
        infoDiv.style.position = 'fixed';
        infoDiv.style.bottom = '0';
        infoDiv.style.right = '0';
        infoDiv.style.zIndex = '99999999';
        infoDiv.style.backgroundColor = '#000';
        infoDiv.style.color = '#fff';
        infoDiv.style.fontFamily = 'Lucida Console';
        infoDiv.style.fontSize = '11px';
        infoDiv.style.lineHeight = '20px';
        infoDiv.style.width = '85px';
        infoDiv.style.textAlign = 'center';
        document.body.appendChild(infoDiv);
    }
};


//initial set up
var init = function() {

    var enable = true;

    //user only wants to run script if web inspector is embedded and showing
    if(webinspectorOnly) {

        var enable = false,
            wiWidth = 750, //minimum width of embedded Web Inspector
            wiHeight = 312, //minimum height of embedded Web Inspector
            compareWidth = window.outerWidth - window.innerWidth, //viewport width compared to total browser width
            compareHeight = window.outerHeight - window.innerHeight; //viewport height compared to total browser height

        if((compareWidth >= wiWidth) || (compareHeight >= wiHeight)) {
            enable = true;
        }
    }

    //all is well, run viewport watcher
    if(enable) {
        viewportWatcher();
    }
};


//listen for an incoming message from global.html
safari.self.addEventListener('message', function(e) {
    //message is regarding settings
    if(e.name === 'settings') {
        webinspectorOnly = e.message.webinspectorOnly;
        viewportWatching = false;
        viewportWatching = window.addEventListener('resize', init);
    }
}, false);
//ask global.html for settings
safari.self.tab.dispatchMessage('getSettings');
//ask global.html to listen for settings changes
safari.self.tab.dispatchMessage('getSettingsChange');
