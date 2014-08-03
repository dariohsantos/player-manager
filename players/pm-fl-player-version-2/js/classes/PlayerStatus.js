/*
* PLAYER STATUS 
*/
var PlayerStatus = function() {    
    var playing;
    var paused;
    var currentBitrate;
    var possibleBitrates;
    var bitratesMap;
    var current;
    var url;

    this.pause = function(){
        this.paused = true;
        this.playing = false;
    }

    this.play = function(){
        this.paused = false;
        this.playing = true;
    }

    this.isPlaying = function(){
        return this.playing;
    }

    this.isPaused = function(){
        return this.paused;
    }

    this.init = function(){     
        this.playing = true;
        this.paused = false;
    }

    this.setPosibleBitrares = function(bitrates){
        this.possibleBitrates = bitrates;
        this.createBitratesMap(bitrates);
    }

    this.createBitratesMap = function(bitrates){
        var previousMax = 0;
        var total = bitrates.length;
        var bitratesMap = new Object();
        $.each(bitrates, function(index, bitrate){
            var isLast = index == total - 1;
            if(isLast){
                range = {"min" : bitrate, "max": 2147483647};
            }
            else{
                range = {"min" : previousMax, "max" : bitrate + 1};
                previousMax = bitrate;
            }
            bitratesMap[bitrate] = range;
            
        });
        this.bitratesMap = bitratesMap;
    }

    this.nextBitrate = function(){
        var possibleBitrates = this.possibleBitrates;
        var currentBitrate = this.currentBitrate;
        var nextBitrate = possibleBitrates[($.inArray(currentBitrate, possibleBitrates) + 1) % possibleBitrates.length];
        this.currentBitrate = nextBitrate;
    }

    this.getCurrentBitrateRange = function(){
        return this.bitratesMap[this.currentBitrate];
    }

    this.init();
}