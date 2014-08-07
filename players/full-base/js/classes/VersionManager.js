var VersionManager = function(actualVersion) {   

	var interval ;
	var milliseconds = 5000;
	var versionFile = 'versioned-data/version-';
	var actualVersion;
	var maxRetries;


	this.init = function(actualVersion){		
		this.actualVersion = actualVersion;
		this.maxRetries = 1;
		amplify.publish("configVersionUpdate", {version : this.actualVersion});	
		this.startVerifyTimer();
	}

	this.updateVersion = function(){				
			this.verifyVersion(this.actualVersion, 0, 0);			
	}

	this.verifyVersion = function(version, lastVerifiedVersion, times){	

 		if(times <= this.maxRetries){
			this.callAjaxVerify(version, lastVerifiedVersion, times);
	    } 
	    else{
	    	var previousVersion = version - 1;
		    this.refreshVersion(lastVerifiedVersion, previousVersion);
	    }
	    
	}	

	this.callAjaxVerify = function(version, lastVerifiedVersion, times){		
		var manager = this; 					
		$.ajax({
	        type: "HEAD",	  	        
	        url: versionFile + version.toString(),	      
	        success: function(){
				// In success update version and call next in case there is a newer version
	        	var nextVersion = version + 1;		        	
				manager.verifyVersion(nextVersion, version, times);		        	
	        },
	        error : function(){		        
	        	// In error call next up to limit
	        	times++;		        
	        	var nextVersion = version + 1;		        				        	
				manager.verifyVersion(nextVersion, lastVerifiedVersion, times);				
	        }
		})		
	}

	this.refreshVersion = function(lastVerifiedVersion, lastVersion){
		if(lastVerifiedVersion > 0 && this.actualVersion != lastVerifiedVersion){		   			   
	   		this.actualVersion = lastVerifiedVersion;
	   		amplify.publish("configVersionUpdate", {version : this.actualVersion});		   	
		}
		if(lastVerifiedVersion == 0){
			// Theres is no version in range, raise de version for the next check
		   	this.actualVersion = lastVersion;	
		}
	}	

	this.startVerifyTimer = function(){
		console.log("MILIS" + milliseconds);
		var manager = this;
		this.interval = setInterval(function(){manager.updateVersion();}, milliseconds);			
	}

	this.init(parseInt(actualVersion));

}