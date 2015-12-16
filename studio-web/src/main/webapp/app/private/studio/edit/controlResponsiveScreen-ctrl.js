document.addEventListener('DOMContentLoaded', calculateScreenSize);

function calculateScreenSize() {
	
	var getTags, sizeListTag;
	var target = document.querySelector('div[ui-view]');
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
        	readDocument();
        	sizeScreen();
        	window.onresize = sizeScreen;
        });
    });

    var config = {
        attributes: true,
        childList: true,
        characterData: true
    };
    observer.observe(target, config);
	
	function sizeScreen() {
	  if(getTags && sizeListTag > 0) {
	    for (var i = 0; i < sizeListTag; ++i) {
	    	getTags[i].style.height = window.innerHeight - 70 +"px";
	    }
	  }
	}
	
	function readDocument() {
		getTags = document.querySelectorAll(".sizeScreen");
		sizeListTag = getTags.length;
	}
}
