$(document).ready(function(){
	
    require.config({
        baseUrl: "js",
        paths: {
            "classes": "classes"
        }
    });

    require( [
        'classes/Config', 
        'classes/AppOverlay', 
        'classes/ViewButton', 
        'classes/Layout', 
        'classes/PlayerStatus', 
        'classes/PlayerElement', 
        'classes/Layout',
        'classes/PlayerMenu',
        'classes/CustomController',
        'classes/RightController',
        'classes/ViewModes',
        'classes/PdkEventHandler',        
        'classes/Feed',
        'classes/Info',
        'classes/FeedsContainer',
        'classes/SliderVolume',
        'classes/Resizer'
        ],
         
        function( ) {            
            var layout = new Layout(config);                                          
        }
    );
});

