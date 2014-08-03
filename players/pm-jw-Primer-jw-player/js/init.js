$(document).ready(function(){
	
    require.config({
        baseUrl: "js",
        paths: {
            "classes": "classes"
        }
    });

    require( [
        'classes/JwPlayer'
        ],
         
        function( ) {            
            var player = new JwPlayer(config);                                          
        }
    );
});
