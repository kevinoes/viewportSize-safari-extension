var viewportSizeTimeout = false;

window.addEventListener('resize', function() {

    //check if info div exists
    if(document.getElementById('viewportSize')) {

        //update existing
        document.getElementById('viewportSize').innerHTML = window.innerWidth + ' x ' + window.innerHeight;

        //make info div go away after a second
        if(viewportSizeTimeout === false) {
            viewportSizeTimeout = true;
            setTimeout(function() {
                document.getElementById('viewportSize').remove();
                viewportSizeTimeout = false;
            }, 1000);
        }


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
});
