var PdkEventHandler = function(){

    this.init = function(){
        this.initEvents();
    }

    this.initEvents = function(){
        $pdk.controller.addEventListener("OnMediaStart", this.mediaStart);
        $pdk.controller.addEventListener("OnMediaPlaying", this.mediaPlaying);
        $pdk.controller.addEventListener("OnStreamSwitched", this.streamSwitched);   
    }


    this.mediaStart = function(e){
        var playerId = e.originator.controlId;
        var files =e.data.baseClip.possibleFiles;
        var file = e.data.baseClip.currentFI;
        amplify.publish("mediaStart", {"playerId" : playerId, "possibleFiles" : files, "currentFile" : file});
       
    }

    this.mediaPlaying = function(e){
        //console.log(e);
        //console.log(e.data.currentTime);  
    }

    this.streamSwitched = function(e){        
       amplify.publish("streamSwitched", {"bitrate" : e.data.newFileInfo.bitrate});      
    }

    this.init();


}