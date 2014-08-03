(function(){var n=navigator.userAgent.toLowerCase(),h=function(e){return e.test(n)
},t=h(/opera/),l=!t&&h(/msie/),k=l&&h(/msie 6/),j=l&&h(/msie 7/),g=l&&h(/msie 8/),f=l&&h(/trident\/5.0/),o=h(/webkit/),a=h(/chrome/),p=h(/bb10/),c=h(/iphone/)||h(/ipad/),s=h(/android/),r=h(/windows|win32/),b,d="";
try{b=document.getElementsByTagName("script");
if(typeof(window.$pdk)==="object"&&typeof(window.$pdk.scriptRoot)==="string"){d=$pdk.scriptRoot
}else{for(var m=0;
m<b.length;
m++){if(b[m].src.match(/tpPdk\.js/)){d=b[m].src.substr(0,b[m].src.lastIndexOf("/"));
break
}}if(!d){d=b[b.length-1].src.substr(0,b[b.length-1].src.lastIndexOf("/"))
}}}catch(q){d=""
}if(window.$pdk===null||(typeof(window.$pdk)!=="object"&&typeof(window.$pdk)!=="function")){window.$pdk={bootloader_version:1}
}if(typeof($pdk.apply)!=="function"){$pdk.apply=function(u,v,i){if(i){$pdk.apply(u,i)
}if(u&&v&&typeof v=="object"){for(var e in v){u[e]=v[e]
}}return u
}
}$pdk.apply($pdk,{isOpera:t,isIE:l,isIE6:k,isIE7:j,isIE8:g,isIE9:f,isWebKit:o,isChrome:a,isBB10:p,isAndroid:s,isIOS:c,isWindows:r,scriptRoot:d,startTime:(new Date()).getTime(),defaultAppJsRoot:"js/app",isArray:function(e){return Object.prototype.toString.apply(e)==="[object Array]"
},isEmpty:function(i,e){return i===null||i===undefined||(($pdk.isArray(i)&&!i.length))||(!e?i==="":false)
},isPrimitive:function(e){var i=typeof e;
return i=="string"||i=="number"||i=="boolean"
},isObject:function(e){return e&&typeof e=="object"
},tupleComp:function(y,x,u){var e=-1,w,v=y.length;
for(w=0;
w<v;
w++){e=u(y[w],x[w]);
if(e!==0){break
}}return e
},each:function(x,w,v){if($pdk.isEmpty(x,true)){return
}if(typeof x.length=="undefined"||$pdk.isPrimitive(x)){x=[x]
}for(var u=0,e=x.length;
u<e;
u++){if(w.call(v||x[u],x[u],u,x)===false){return u
}}},ns:function(){var x,v,i=window;
try{i=$wnd!==null&&typeof($wnd)==="object"?$wnd:window
}catch(u){i=window
}$pdk.each(arguments,function(e){v=e.split(".");
x=i[v[0]]=i[v[0]]||{};
$pdk.each(v.slice(1),function(w){x=x[w]=x[w]||{}
})
});
return x
},override:function(e,u){if(u){var i=e.prototype;
$pdk.apply(i,u);
if($pdk.isIE&&u.toString!=e.toString){i.toString=u.toString
}}},extend:function(){var i=function(v){for(var u in v){this[u]=v[u]
}};
var e=Object.prototype.constructor;
return function(z,w,y){if($pdk.isObject(w)){y=w;
w=z;
z=(y.constructor!=e&&(!y.constructor.name||y.constructor.name!="Object"))?y.constructor:function(){w.apply(this,arguments)
}
}var v=function(){},x,u=w.prototype;
v.prototype=u;
x=z.prototype=new v();
x.constructor=z;
z.superclass=u;
if(u.constructor==e){u.constructor=w
}z.override=function(A){$pdk.override(z,A)
};
x.superclass=x.supr=(function(){return u
});
x.override=i;
$pdk.override(z,y);
z.extend=function(A){$pdk.extend(z,A)
};
return z
}
}(),isDomReady:function(){if($pdk.isEmpty(document.readyState)){return !$pdk.isEmpty(document.body)
}return/loaded|complete/.test(document.readyState)
}});
$pdk.ns("js.com.theplatform.pdk");
js.com.theplatform.pdk=$pdk
})();
$pdk.ns("$pdk.entrypoint");
$pdk.entrypoint.Entrypoint=$pdk.extend(function(){},{constructor:function(){this._complete=false;
this._registry=null;
this._env=null;
this._callBacks=[];
this._postOnLoad=function(){}
},configure:function(a,b){this._registry=a;
this._env=b
},_loaded:false,addCallback:function(a){this._callBacks.push(a);
if(this._loaded){a.apply()
}},initialize:function(){},onLoad:function(){var c=0,a=this._callBacks.length,d=this;
this._loaded=true;
for(;
c<a;
c++){this._callBacks[c].apply()
}var b=typeof(window._PDK_SUPRESS_INITIALIZE)==="boolean"?window._PDK_SUPRESS_INITIALIZE:false;
if((this._env===null||this._env.getAutoInitialize())&&!b){this.initialize()
}this._postOnLoad()
}});
$pdk.ns("$pdk.env.HttpHead");
$pdk.env.HttpHead.Processor=$pdk.extend(function(){},{constructor:function(a){this._env=a
},process:function(f){var e,a,b,g=this._collectTpMetaTags(f),d=g.length,c;
for(c=0;
c<d;
c++){e=g[c];
if(!$pdk.isEmpty(e.value)){a=e.value.replace(/\s/g,"").toLowerCase().split(",");
b=e.name.replace(/^tp:/,"").toLowerCase();
while(a.length>0){this._env.addToConfigSet(b,a.shift())
}}}},_collectTpMetaTags:function(g){var f,a=[],b,e,h=g.getElementsByTagName("meta"),d=h.length,c;
for(c=0;
c<d;
c++){f=h[c];
b=f.getAttribute("name");
if(typeof(b)==="string"&&b.match(/^tp:/)){e=f.getAttribute("content");
a.push({name:b,value:e})
}}return a
}});
$pdk.Entrypoint=$pdk.apply({},{_class:$pdk.extend($pdk.entrypoint.Entrypoint,{constructor:function(){$pdk.Entrypoint._class.superclass.constructor.call(this)
},initialize:function(){var a=this;
$pdk.Entrypoint._class.superclass.initialize.call(this);
$pdk._boundIframes={};
$pdk._bind=function(b,c){if(c){$pdk._boundIframes[b.id]=true;
return
}if(typeof b==="string"){return $pdk._bind(document.getElementById(b))
}else{if(b!==null&&typeof b==="object"&&b.nodeType===1&&typeof b.nodeName==="string"&&b.nodeName.toLowerCase()==="iframe"){if(!this._first||!window.tpController){$pdk.controller=window.tpController=new $pdk.queue.external.Controller();
$pdk.interfaces.expose(window,$pdk.controller)
}else{$pdk.controller=window.tpController
}this._first=false;
$pdk.controller.setIFrame(b,$pdk._boundIframes[b.id])
}}return $pdk.controller
};
$pdk.bind=function(b,c){return $pdk._bind(b,c)
}
}}),_singleton:null,_first:true,getInstance:function(){if($pdk.Entrypoint._singleton===null){$pdk.Entrypoint._singleton=new $pdk.Entrypoint._class()
}return $pdk.Entrypoint._singleton
},onLoad:function(){$pdk.Entrypoint.getInstance().onLoad()
}});
$pdk.ns("$pdk.queue.external");
$pdk.queue.external.Controller=$pdk.extend(function(){},{constructor:function(){var a=this;
this.listeners={};
this.queue=[];
this.listenerId=0;
if(window.addEventListener){addEventListener("message",function(b){a.receiveMessage(b)
},false)
}else{attachEvent("onmessage",function(b){a.receiveMessage(b)
})
}},setIFrame:function(b,a){var c=this;
this.iframe=b;
this.DOMAIN=b.src.substring(0,b.src.indexOf("/",b.src.indexOf(":")+3));
if(b.src.indexOf("#")==-1){b.src+="#playerurl="+escape(window.location.href)
}if(typeof(window.JSON)!=="object"){return
}if(a){c._iframeOnload(window.location.href)
}else{b.onload=function(d){c._iframeOnload(window.location.href)
}
}},_iframeOnload:function(a){this.ready=true;
var b;
this.sendMessage("initialization","playerUrl",[a]);
while(this.queue.length>0){b=window.JSON.parse(this.queue.shift());
this.sendMessage(b.type,b.name,b.parameters)
}},sendMessage:function(c,b,a){if(typeof(window.JSON)!=="object"){return
}var d=window.JSON.stringify({type:c,name:b,parameters:a});
if(this.ready){this.iframe.contentWindow.postMessage(d,this.DOMAIN)
}else{this.queue.push(d)
}},addEventListener:function(a,d,b){var c=this.listenerId++;
this.listeners[c]={callback:d,id:c,eventName:a};
this.sendMessage("addEventListener",a,[b,c])
},removeEventListener:function(a,e,b){for(var d in this.listeners){var c=this.listeners[d];
if(typeof(c)==="object"&&typeof(c.id)==="number"){if(c.callback===e&&a===c.eventName){delete this.listeners[c.id];
this.sendMessage("removeEventListener",a,[b,c.id]);
break
}}}},receiveMessage:function(a){if(typeof(window.JSON)!=="object"||!this.iframe||a.source!==this.iframe.contentWindow){return
}a=window.JSON.parse(a.data);
if(a.type=="event"){var b=this.listeners[a.parameters[1]];
if(typeof(b)==="object"){if(typeof(b.callback)==="function"){b.callback(a.parameters[0])
}}}},isExternal:function(){return true
}});
$pdk.ns("$pdk.interfaces");
$pdk.interfaces.expose=function(b,a){a.firstRange=function(d,c){d=typeof(d)==="undefined"?true:d;
this.sendMessage("method","firstRange",[d],c)
};
a.nextRange=function(d,c){d=typeof(d)==="undefined"?true:d;
this.sendMessage("method","nextRange",[d],c)
};
a.getCurrentRange=function(c){this.sendMessage("method","getCurrentRange",[],c)
};
a.previousRange=function(d,c){d=typeof(d)==="undefined"?true:d;
this.sendMessage("method","previousRange",[d],c)
};
a.getValidRegions=function(c){this.sendMessage("method","getValidRegions",[],c)
};
a.getDefaultBanners=function(c){this.sendMessage("method","getDefaultBanners",[],c)
};
a.setClipInfo=function(d,e,c){this.sendMessage("method","setClipInfo",[d,e],c)
};
a.clearAnnotations=function(c){this.sendMessage("method","clearAnnotations",[],c)
};
a.clearCategorySelection=function(c){this.sendMessage("method","clearCategorySelection",[],c)
};
a.setPlayerMessage=function(e,c,d){this.sendMessage("method","setPlayerMessage",[e,c],d)
};
a.playPrevious=function(d,c){this.sendMessage("method","playPrevious",[d],c)
};
a.getSubtitleLanguage=function(c,d){this.sendMessage("method","getSubtitleLanguage",[c],d)
};
a.setVariable=function(f,d,g,c,e){this.sendMessage("method","setVariable",[f,d,g,c],e)
};
a.getUseDefaultPlayOverlay=function(c){this.sendMessage("method","getUseDefaultPlayOverlay",[],c)
};
a.seekToPosition=function(c,d){this.sendMessage("method","seekToPosition",[c],d)
};
a.setCurrentReleaseList=function(d,c){this.sendMessage("method","setCurrentReleaseList",[d],c)
};
a.nextClip=function(c){this.sendMessage("method","nextClip",[],c)
};
a.setToken=function(c,e,d){this.sendMessage("method","setToken",[c,e],d)
};
a.previewRefreshReleaseModel=function(c,k,e,f,d,i,j,g,h){this.sendMessage("method","previewRefreshReleaseModel",[c,k,e,f,d,i,g,h],j)
};
a.setProperty=function(f,d,g,c,e){this.sendMessage("method","setProperty",[f,d,g,c],e)
};
a.clickPlayButton=function(c){this.sendMessage("method","clickPlayButton",[],c)
};
a.loadRelease=function(c,d,e){this.sendMessage("method","loadRelease",[c,d],e)
};
a.hidePlayerRegions=function(d,c,e){this.sendMessage("method","hidePlayerRegions",[d,c],e)
};
a.useDefaultEmailForm=function(c,d){this.sendMessage("method","useDefaultEmailForm",[c],d)
};
a.setVideoScalingMethod=function(d,c){this.sendMessage("method","setVideoScalingMethod",[d],c)
};
a.setSmil=function(c,d){this.sendMessage("method","setSmil",[c],d)
};
a.loadReleaseURL=function(c,d,e){this.sendMessage("method","loadReleaseURL",[c,d],e)
};
a.resetPlayer=function(c){this.sendMessage("method","resetPlayer",[],c)
};
a.seekToPercentage=function(d,c){this.sendMessage("method","seekToPercentage",[d],c)
};
a.trace=function(e,d,f,c){this.sendMessage("method","trace",[e,d,f],c)
};
a.addAnnotation=function(c,d){this.sendMessage("method","addAnnotation",[c],d)
};
a.endCurrentRelease=function(c){this.sendMessage("method","endCurrentRelease",[],c)
};
a.getAnnotations=function(c){this.sendMessage("method","getAnnotations",[],c)
};
a.clearPlayerMessage=function(c){this.sendMessage("method","clearPlayerMessage",[],c)
};
a.setRelease=function(c,d,e){this.sendMessage("method","setRelease",[c,d],e)
};
a.useDefaultLinkForm=function(c,d){this.sendMessage("method","useDefaultLinkForm",[c],d)
};
a.clearCurrentRelease=function(c){this.sendMessage("method","clearCurrentRelease",[],c)
};
a.mute=function(d,c){this.sendMessage("method","mute",[d],c)
};
a.getNextRelease=function(e,c,d){this.sendMessage("method","getNextRelease",[e,c],d)
};
a.setClipInfo=function(d,e,c){this.sendMessage("method","setClipInfo",[d,e],c)
};
a.setPreviewImageUrl=function(c,d){this.sendMessage("method","setPreviewImageUrl",[c],d)
};
a.setSubtitleStyle=function(d,c){this.sendMessage("method","setSubtitleStyle",[d],c)
};
a.previewNextRefreshReleaseModel=function(c){this.sendMessage("method","previewNextRefreshReleaseModel",[],c)
};
a.setExpandVideo=function(d,c){this.sendMessage("method","setExpandVideo",[d],c)
};
a.loadSmil=function(d,c,e){this.sendMessage("method","loadSmil",[d,c],e)
};
a.refreshCategoryModel=function(d,c,e){this.sendMessage("method","refreshCategoryModel",[d,e],c)
};
a.playNext=function(e,c,d){this.sendMessage("method","playNext",[e,c],d)
};
a.showFullScreen=function(c,d){this.sendMessage("method","showFullScreen",[c],d)
};
a.disablePlayerControls=function(c,d,e){this.sendMessage("method","disablePlayerControls",[c,d],e)
};
a.getNextClip=function(c){this.sendMessage("method","getNextClip",[],c)
};
a.cancelMedia=function(c,d){this.sendMessage("method","cancelMedia",[c],d)
};
a.removeAnnotation=function(c,d){this.sendMessage("method","removeAnnotation",[c],d)
};
a.setVolume=function(d,c){this.sendMessage("method","setVolume",[d],c)
};
a.showEmailForm=function(d,c){this.sendMessage("method","showEmailForm",[d],c)
};
a.previousClip=function(c){this.sendMessage("method","previousClip",[],c)
};
a.showLinkForm=function(d,c){this.sendMessage("method","showLinkForm",[d],c)
};
a.getCurrentRange=function(c){this.sendMessage("method","getCurrentRange",[],c)
};
a.suspendPlayAll=function(d,c){this.sendMessage("method","suspendPlayAll",[d],c)
};
a.getSubtitleStyle=function(c){this.sendMessage("method","getSubtitleStyle",[],c)
};
a.useDefaultPlayOverlay=function(c,d){this.sendMessage("method","useDefaultPlayOverlay",[c],d)
};
a.pause=function(c,d,e){this.sendMessage("method","pause",[c,e],d)
};
a.setShowSubtitles=function(c,d){this.sendMessage("method","setShowSubtitles",[c],d)
};
a.setReleaseURL=function(d,c,e){this.sendMessage("method","setReleaseURL",[d,c],e)
};
a.clearAdCookie=function(c){this.sendMessage("method","clearAdCookie",[],c)
};
a.setBandwidthPreferences=function(d,c){this.sendMessage("method","setBandwidthPreferences",[d],c)
};
a.getBandwidthPreferences=function(c){this.sendMessage("method","getBandwidthPreferences",[],c)
};
a.refreshReleaseModel=function(c,k,e,f,d,i,j,g,h){this.sendMessage("method","refreshReleaseModel",[c,k,e,f,d,i,g,h],j)
};
a.getPlayerVariables=function(d,c){this.sendMessage("method","getPlayerVariables",[d],c)
};
a.setSubtitleLanguage=function(d,c){this.sendMessage("method","setSubtitleLanguage",[d],c)
};
a.hidePlayerCard=function(c,e,d){this.sendMessage("method","hidePlayerCard",[c,e],d)
};
a.showPlayerCard=function(d,g,f,c,e){this.sendMessage("method","showPlayerCard",[d,g,f,c],e)
};
a.addPlayerCard=function(g,j,d,i,e,c,f,h){this.sendMessage("method","addPlayerCard",[g,j,d,i,e,c,f],h)
};
a.search=function(d,c){d=typeof(d)==="undefined"?"":d;
this.sendMessage("method","search",[d],c)
}
};
(function(b,a){a=typeof(a)==="boolean"?a:false;
if(!a){if($pdk.controller===null||typeof($pdk.controller)!=="object"){b.tpController=new $pdk.queue.external.Controller();
$pdk.controller=b.tpController;
$pdk.interfaces.expose(b,b.tpController)
}$pdk.Entrypoint.onLoad()
}}(window,window._PDK_SUPRESS_AUTOINIT));