window.__tp_pdk_set_versions = function() {
	$pdk.expectedVersions = {};
	$pdk.version = new $pdk.PdkVersion("5", "5", "1", "351745", "2014-06-30 6:40 PM");
$pdk.expectedVersions.bootloaderVersion = new $pdk.PdkVersion("5", "5", "1", "351745", "2014-06-30 6:24 PM");
$pdk.expectedVersions.gwtVersion = new $pdk.PdkVersion("5", "5", "1", "351745", "2014-06-30 6:24 PM");

$pdk.expectedVersions.flexVersion = new $pdk.PdkVersion("5", "5", "1", "351745", "2014-06-30 6:06 PM");
};
(function(){var D='',P='.',I='/',Q='Object',L='[object Array]',N='boolean',J='function',R='js.com.theplatform.pdk',K='js/app',M='number',G='object',F='script',H='string',O='undefined';var j=navigator.userAgent.toLowerCase(),k=function(a){return a.test(j)},l=k(/opera/),m=!l&&k(/msie/),n=m&&k(/msie 6/),o=m&&k(/msie 7/),p=m&&k(/msie 8/),q=m&&k(/trident\/5.0/),r=k(/webkit/),s=k(/chrome/),t=k(/bb10/),u=k(/iphone/)||k(/ipad/),v=k(/android/),w=k(/windows|win32/),A,B=D;try{A=document.getElementsByTagName(F);if(typeof window.$pdk===G&&typeof window.$pdk.scriptRoot===H){B=$pdk.scriptRoot}else{for(var C=0;C<A.length;C++){if(A[C].src.match(/tpPdk\.js/)){B=A[C].src.substr(0,A[C].src.lastIndexOf(I));break}}if(!B){B=A[A.length-1].src.substr(0,A[A.length-1].src.lastIndexOf(I))}}}catch(a){B=D}if(window.$pdk===null||typeof window.$pdk!==G&&typeof window.$pdk!==J){window.$pdk={bootloader_version:1}}if(typeof $pdk.apply!==J){$pdk.apply=function(a,b,c){if(c){$pdk.apply(a,c)}if(a&&(b&&typeof b==G)){for(var d in b){a[d]=b[d]}}return a}}$pdk.apply($pdk,{isOpera:l,isIE:m,isIE6:n,isIE7:o,isIE8:p,isIE9:q,isWebKit:r,isChrome:s,isBB10:t,isAndroid:v,isIOS:u,isWindows:w,scriptRoot:B,startTime:(new Date).getTime(),defaultAppJsRoot:K,isArray:function(a){return Object.prototype.toString.apply(a)===L},isEmpty:function(a,b){return a===null||(a===undefined||($pdk.isArray(a)&&!a.length||(!b?a===D:false)))},isPrimitive:function(a){var b=typeof a;return b==H||(b==M||b==N)},isObject:function(a){return a&&typeof a==G},tupleComp:function(a,b,c){var d=-1,e,f=a.length;for(e=0;e<f;e++){d=c(a[e],b[e]);if(d!==0){break}}return d},each:function(a,b,c){if($pdk.isEmpty(a,true)){return}if(typeof a.length==O||$pdk.isPrimitive(a)){a=[a]}for(var d=0,e=a.length;d<e;d++){if(b.call(c||a[d],a[d],d,a)===false){return d}}},ns:function(){var c,d,e=window;try{e=$wnd!==null&&typeof $wnd===G?$wnd:window}catch(a){e=window}$pdk.each(arguments,function(b){d=b.split(P);c=e[d[0]]=e[d[0]]||{};$pdk.each(d.slice(1),function(a){c=c[a]=c[a]||{}})});return c},override:function(a,b){if(b){var c=a.prototype;$pdk.apply(c,b);if($pdk.isIE&&b.toString!=a.toString){c.toString=b.toString}}},extend:function(){var h=function(a){for(var b in a){this[b]=a[b]}};var i=Object.prototype.constructor;return function(b,c,d){if($pdk.isObject(c)){d=c;c=b;b=d.constructor!=i&&(!d.constructor.name||d.constructor.name!=Q)?d.constructor:function(){c.apply(this,arguments)}}var e=function(){},f,g=c.prototype;e.prototype=g;f=b.prototype=new e;f.constructor=b;b.superclass=g;if(g.constructor==i){g.constructor=c}b.override=function(a){$pdk.override(b,a)};f.superclass=f.supr=function(){return g};f.override=h;$pdk.override(b,d);b.extend=function(a){$pdk.extend(b,a)};return b}}(),isDomReady:function(){if($pdk.isEmpty(document.readyState)){return !$pdk.isEmpty(document.body)}return /loaded|complete/.test(document.readyState)}});$pdk.ns(R);js.com.theplatform.pdk=$pdk}());function PDK(){var fb='',ee='\n-',Cb='" for "gwt:onLoadErrorFn"',Ab='" for "gwt:onPropertyErrorFn"',Td='"<script src=\\"',nb='"><\/script>',db='#',de=');',Xd='-\n',fe='-><\/scr',ke='.cache.js',Ud='.cache.js\\"><\/scr" + "ipt>"',U='/',qb='//',sc='0258DA4056D97B0CFC54181D688D8FC4',uc='0D5783021792E9B15CAC0240139FA574',vc='17A661A4672F3BEB5373764E4A7D75E1',wc='1BAFBE1E18449D204CDD5DDC1DA655FA',xc='1D6B47F4CE81262FCA83EF1AB5C20A71',yc='1F4514E311614C3DB39A167F0BDA64E6',zc='2575AB21F01C00235D3EEF20871C8932',Ac='26034EFEA39D039B440FAD47A4347E22',Bc='26B6491E6CE6E0C6A0C9924300F223E9',Cc='2CFB378246FC97A9DD6700581F9AA598',Dc='345F418B9C912D9B90B30526C94A186D',Ec='3527251CE0992AA5252EF1BBB8D58F4A',Fc='3537B309F9FBD3AAFAE1705A735A10E5',Gc='38F519D3F2D5681E36754198234B65E0',Hc='39F574DA8D9639632FF8B7CCCAF47A4A',Ic='44A60019EF4529954DBBF4DAEA582313',Jc='49289AF6E20B3127841DCBAB4A522A5C',Kc='49E6DFEBA0E17083BA0DFE3AA32BB79F',Lc='4AA690AA7A49BD3D2F5686BC40215524',Mc='4EE7C793959B71486F06464D63A96CAD',Nc='50066790919F4CB27AB522A7E0958B1C',Oc='50393E29AEBC5A2703B89844CBFDE4E0',Pc='57F8BB53308DE9A60AE48D8C50C5C1C3',Qc='58EF389F2AF6394293744CF3BEE69195',Rc='59225F16393197B954C044B4CEE8A4A5',Sc='5A3365A1CF15A8167D5E41D6FE3F0EF6',Tc='5EEA68B1893F6D1D99EAEEF196E42B66',Uc='62DB2A2D1BADE4D5339F51E85944E635',Vc='6FAE6076AE3812E662E0A0DFC20F3806',Wc='770305B28286E70E18847EDA1BE57770',Xc='779E5899539815DCC8E9FD53E441B081',Yc='7951863200F48F932A888B8134732C30',Zc='8382C998C23BB3AA1E7AECE683CE32A7',$c='8526203F5EAA9D77F51B54338A34EA5D',_c='86E3EDCC86A774FD516193D6F18C611F',ad='8D5B289C8CA0A113A4B4E5FF7F069222',bd='8E807F305E70DC395ABA3540F0BF15BA',cd='910EB64489D30A7DF968B4E55858CE13',dd='940C51FFC790FDBD7F29ABF8C2F30BAD',ed='9745E61234CBAD34C7E814515A875944',fd='9993600414CE71D3D2FD55AD6314F5FE',gd='9BAB098FFF9D189AF606BBA6AD84A4F4',hd='9DCA2290BC34BAEB8513B87EAAE30550',Qd=':',tc=':1',ub='::',Vd='<scr',mb='<script id="',xb='=',eb='?',jd='A3B28B8B46DF1145951CBF36DC38F046',kd='A431C224D5914AC35C3031A758F37E8A',ld='A5DC9EC932219B72941A6F412BA05ECE',md='A8E025E4D5A2C8004748F0134C6AA9DD',nd='AC97E3E574DCA06CF5AB73C75CB4A72F',od='B2701F38BB30DAF48FACBF96A1445334',pd='B2BED90511783C50A7D546875ED7773C',qd='B3D6D7FB6EE2D1E2C7B28D5DF47A30F5',rd='B4035331F245FE6758C1A8322F6581D2',sd='B52354E6FE9C59F6664031AB2CEFCF41',td='B581BBE345D553604E44BDDCFBF28756',ud='B5DF7D65776F7AC9D9FD56B4ED4926DB',vd='B8B9C14C899647F5C432ED526BA8F817',wd='BA2B8AAF628A04A1046BE312F636D10E',xd='BCD45F436B6DEA8B21E8D62CF3757036',zb='Bad handler "',yd='C7021C8CDA690A6846D14E1E27DCBCD3',zd='C840A07CCAC816F229419044F4CC855F',Ad='C86F0D21383B4F782E4E5FD508208C27',Bd='C9C62AF2503F23C7DED3EC56994FBD8D',Cd='C9E9250613731578FC13CE2DC194C4A3',pc='Cross-site hosted mode not yet implemented. See issue ',Dd='D274E82F045E69266D1480FE4204719D',Ed='D92DC5C05485977173484A445533D5AB',Fd='DB6DB318E749CB056F9D3BF55C60D6F9',Gd='DC41DD6B4F02F6F470432717EAF36707',Hd='DC7374666E969DD979D6AC9C69274461',Id='DDDABEA98B821FEAFCF80CBC0AE25A6E',Rd='DOMContentLoaded',Jd='E27F8A515B158E5B18F997C44AD2349D',Kd='EB87E104051D00EDBE1521F7E8FD6DE2',Ld='EF021D39BF58DE893CF555326CBBBCF6',Md='F291E2D1D70D0FE268B645D954C4A492',Nd='F3DE7AD5144A53FD8107F2705756CEF8',Od='FA69C70E6E67F8DB842E9744CE273FE3',Pd='FD54048A6D5D9C904C40AF9088E9925D',V='PDK',kb='PDK.nocache.js',tb='PDK::',ob='SCRIPT',lb='__gwt_marker_PDK',Lb='android',Pb='android 2',Qb='android 3.0',pb='base',ib='baseUrl',Y='begin',X='bootstrap',Mb='chrome',Ob='chrome_android',cc='chrome_mac',dc='chrome_windows',hb='clear.cache.gif',wb='content',ce='document.write(',cb='end',$d='evtGroup: "loadExternalRefs", millis:(new Date()).getTime(),',ae='evtGroup: "moduleStartup", millis:(new Date()).getTime(),',Jb='false',lc='gecko',oc='gecko1_8',nc='gecko1_8_mac',mc='gecko1_8_windows',$='gwt.codesvr=',_='gwt.hosted=',ab='gwt.hybrid',Bb='gwt:onLoadErrorFn',yb='gwt:onPropertyErrorFn',vb='gwt:property',Db='hasFlash',Eb='hasJquery',ie='head',Hb='html5',qc='http://code.google.com/p/google-web-toolkit/issues/detail?id=2079',hc='ie10',gc='ie10_app',kc='ie6',jc='ie8',ic='ie9',gb='img',Ub='ipad',Wb='iphone',ge='ipt>',Wd='ipt><!-',bc='linux',Sd='loadExternalRefs',Yb='macintosh',rb='meta',Zd='moduleName:"PDK", sessionId:window.__gwtStatsSessionId, subSystem:"startup",',je='moduleRequested',bb='moduleStartup',fc='msapphost',ec='msie',sb='name',Tb='opera',Gb='preferredruntimes',Fb='requiresPhase1',Zb='safari',Sb='safari_android',Rb='safari_android_legacy',Vb='safari_ipad',Xb='safari_iphone',$b='safari_mac',ac='safari_windows',jb='script',rc='selectingPermutation',Nb='silk',W='startup',he='text/javascript',Ib='true',_d='type: "end"});',be='type: "moduleRequested"});',Z='undefined',Kb='user.agent',Yd='window.__gwtStatsEvent && window.__gwtStatsEvent({',_b='windows';var m=window,n=document,o=m.__gwtStatsEvent?function(a){return m.__gwtStatsEvent(a)}:null,p=m.__gwtStatsSessionId?m.__gwtStatsSessionId:null,q,r,s=$pdk.env.Detect.getInstance().baseDir()+U+$pdk.defaultAppJsRoot+U,t={},u=[],v=[],w=[],A=0,B,C;o&&o({moduleName:V,sessionId:p,subSystem:W,evtGroup:X,millis:(new Date).getTime(),type:Y});if(!m.__gwt_stylesLoaded){m.__gwt_stylesLoaded={}}if(!m.__gwt_scriptsLoaded){m.__gwt_scriptsLoaded={}}function D(){if(typeof n.readyState==Z){return typeof n.body!=Z&&n.body!=null}return /loaded|complete/.test(n.readyState)}
function F(){var b=false;try{var c=m.location.search;return (c.indexOf($)!=-1||(c.indexOf(_)!=-1||m.external&&m.external.gwtOnLoad))&&c.indexOf(ab)==-1}catch(a){}F=function(){return b};return b}
function G(){if(q&&r){var a=$pdk.env.Detect.getInstance().baseDir()+U+$pdk.defaultAppJsRoot+U;q(B,V,a,A);o&&o({moduleName:V,sessionId:p,subSystem:W,evtGroup:bb,millis:(new Date).getTime(),type:cb})}}
function H(){function e(a){var b=a.lastIndexOf(db);if(b==-1){b=a.length}var c=a.indexOf(eb);if(c==-1){c=a.length}var d=a.lastIndexOf(U,Math.min(c,b));return d>=0?a.substring(0,d+1):fb}
function f(a){if(a.match(/^\w+:\/\//)){}else{var b=n.createElement(gb);b.src=a+hb;a=e(b.src)}return a}
function g(){var a=J(ib);if(a!=null){return a}return fb}
function h(){var a=n.getElementsByTagName(jb);for(var b=0;b<a.length;++b){if(a[b].src.indexOf(kb)!=-1){return e(a[b].src)}}return fb}
function i(){var a;if(typeof D==Z||!D()){var b=lb;var c;n.write(mb+b+nb);c=n.getElementById(b);a=c&&c.previousSibling;while(a&&a.tagName!=ob){a=a.previousSibling}if(c){c.parentNode.removeChild(c)}if(a&&a.src){return e(a.src)}}return fb}
function j(){var a=n.getElementsByTagName(pb);if(a.length>0){return a[a.length-1].href}return fb}
function k(){var a=n.location;return a.href==a.protocol+qb+a.host+a.pathname+a.search+a.hash}
var l=g();if(l==fb){l=h()}if(l==fb){l=i()}if(l==fb){l=j()}if(l==fb&&k()){l=e(n.location.href)}l=f(l);s=l;return l}
function I(){var b=document.getElementsByTagName(rb);for(var c=0,d=b.length;c<d;++c){var e=b[c],f=e.getAttribute(sb),g;if(f){f=f.replace(tb,fb);if(f.indexOf(ub)>=0){continue}if(f==vb){g=e.getAttribute(wb);if(g){var h,i=g.indexOf(xb);if(i>=0){f=g.substring(0,i);h=g.substring(i+1)}else{f=g;h=fb}t[f]=h}}else if(f==yb){g=e.getAttribute(wb);if(g){try{C=eval(g)}catch(a){alert(zb+g+Ab)}}}else if(f==Bb){g=e.getAttribute(wb);if(g){try{B=eval(g)}catch(a){alert(zb+g+Cb)}}}}}}
function J(a){var b=t[a];return b==null?null:b}
function K(a,b){var c=w;for(var d=0,e=a.length-1;d<e;++d){c=c[a[d]]||(c[a[d]]=[])}c[a[e]]=b}
function L(a){var b=v[a](),c=u[a];if(b in c){return b}var d=[];for(var e in c){d[c[e]]=e}if(C){C(a,d,b)}throw null}
v[Db]=function(){return String($pdk.env.Detect.getInstance().hasFlash())};u[Db]={'false':0,'true':1};v[Eb]=function(){return String($pdk.env.Detect.getInstance().hasJquery())};u[Eb]={'false':0,'true':1};v[Fb]=function(){var a=$pdk.env.Detect.getInstance().getConfigSet(Gb);return a&&a.contains(Hb)?Ib:Jb};u[Fb]={'false':0,'true':1};v[Kb]=function(){var b=navigator.userAgent.toLowerCase();var c=function(a){return parseInt(a[1])*1000+parseInt(a[2])};if(function(){return b.indexOf(Lb)!=-1&&b.indexOf(Mb)!=-1||b.indexOf(Nb)!=-1}()){{m.$pdk.userAgentAxis=Ob;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Pb)!=-1||b.indexOf(Qb)!=-1}()){{m.$pdk.userAgentAxis=Rb;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Lb)!=-1&&(b.indexOf(Pb)==-1&&(b.indexOf(Qb)==-1&&b.indexOf(Nb)==-1))}()){{m.$pdk.userAgentAxis=Sb;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Tb)!=-1}()){{m.$pdk.userAgentAxis=Tb;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Ub)!=-1}()){{m.$pdk.userAgentAxis=Vb;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Wb)!=-1}()){{m.$pdk.userAgentAxis=Xb;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Mb)==-1&&(b.indexOf(Nb)==-1&&(b.indexOf(Nb)==-1&&(b.indexOf(Yb)!=-1&&b.indexOf(Zb)!=-1)))}()){{m.$pdk.userAgentAxis=$b;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Mb)==-1&&(b.indexOf(Nb)==-1&&(b.indexOf(_b)!=-1&&b.indexOf(Zb)!=-1))}()){{m.$pdk.userAgentAxis=ac;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Nb)==-1&&(b.indexOf(Lb)==-1&&((b.indexOf(Yb)!=-1||b.indexOf(bc)!=-1)&&b.indexOf(Mb)!=-1))}()){{m.$pdk.userAgentAxis=cc;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(Nb)==-1&&(b.indexOf(_b)!=-1&&b.indexOf(Mb)!=-1)}()){{m.$pdk.userAgentAxis=dc;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(ec)!=-1&&(b.indexOf(fc)!=-1&&n.documentMode>=10)}()){{m.$pdk.userAgentAxis=gc;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(ec)!=-1&&n.documentMode>=10}()){{m.$pdk.userAgentAxis=hc;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(ec)!=-1&&n.documentMode>=9}()){{m.$pdk.userAgentAxis=ic;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(ec)!=-1&&n.documentMode>=8}()){{m.$pdk.userAgentAxis=jc;return m.$pdk.userAgentAxis}}if(function(){var a=/msie ([0-9]+)\.([0-9]+)/.exec(b);if(a&&a.length==3)return c(a)>=6000}()){{m.$pdk.userAgentAxis=kc;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(lc)!=-1&&b.indexOf(_b)!=-1}()){{m.$pdk.userAgentAxis=mc;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(lc)!=-1&&(b.indexOf(Yb)!=-1||b.indexOf(bc)!=-1)}()){{m.$pdk.userAgentAxis=nc;return m.$pdk.userAgentAxis}}if(function(){return b.indexOf(lc)!=-1}()){{m.$pdk.userAgentAxis=oc;return m.$pdk.userAgentAxis}}m.$pdk.userAgentAxis=cc;return cc};u[Kb]={chrome_android:0,chrome_mac:1,chrome_windows:2,gecko1_8:3,gecko1_8_mac:4,gecko1_8_windows:5,ie10:6,ie10_app:7,ie6:8,ie8:9,ie9:10,opera:11,safari:12,safari_android:13,safari_android_legacy:14,safari_ipad:15,safari_iphone:16,safari_mac:17,safari_windows:18};PDK.onScriptLoad=function(a){PDK.onScriptLoad=null;q=a;G()};if(F()){alert(pc+qc);return}I();H();o&&o({moduleName:V,sessionId:p,subSystem:W,evtGroup:X,millis:(new Date).getTime(),type:rc});var M;try{K([Jb,Ib,Jb,nc],sc);K([Jb,Ib,Ib,nc],sc);K([Jb,Ib,Jb,nc],sc+tc);K([Jb,Ib,Ib,nc],sc+tc);K([Jb,Jb,Jb,ic],uc);K([Jb,Jb,Ib,ic],uc);K([Jb,Jb,Jb,ic],uc+tc);K([Jb,Jb,Ib,ic],uc+tc);K([Jb,Ib,Jb,Xb],vc);K([Jb,Ib,Ib,Xb],vc);K([Jb,Ib,Jb,Xb],vc+tc);K([Jb,Ib,Ib,Xb],vc+tc);K([Ib,Jb,Jb,Zb],wc);K([Ib,Jb,Ib,Zb],wc);K([Ib,Jb,Jb,Zb],wc+tc);K([Ib,Jb,Ib,Zb],wc+tc);K([Jb,Ib,Jb,Zb],xc);K([Jb,Ib,Ib,Zb],xc);K([Jb,Ib,Jb,Zb],xc+tc);K([Jb,Ib,Ib,Zb],xc+tc);K([Ib,Ib,Jb,kc],yc);K([Ib,Ib,Ib,kc],yc);K([Ib,Ib,Jb,kc],yc+tc);K([Ib,Ib,Ib,kc],yc+tc);K([Ib,Ib,Jb,mc],zc);K([Ib,Ib,Ib,mc],zc);K([Ib,Ib,Jb,mc],zc+tc);K([Ib,Ib,Ib,mc],zc+tc);K([Ib,Jb,Jb,Sb],Ac);K([Ib,Jb,Ib,Sb],Ac);K([Ib,Jb,Jb,Sb],Ac+tc);K([Ib,Jb,Ib,Sb],Ac+tc);K([Jb,Jb,Jb,mc],Bc);K([Jb,Jb,Ib,mc],Bc);K([Jb,Jb,Jb,mc],Bc+tc);K([Jb,Jb,Ib,mc],Bc+tc);K([Jb,Jb,Jb,Xb],Cc);K([Jb,Jb,Ib,Xb],Cc);K([Jb,Jb,Jb,Xb],Cc+tc);K([Jb,Jb,Ib,Xb],Cc+tc);K([Ib,Ib,Jb,jc],Dc);K([Ib,Ib,Ib,jc],Dc);K([Ib,Ib,Jb,jc],Dc+tc);K([Ib,Ib,Ib,jc],Dc+tc);K([Ib,Jb,Jb,ic],Ec);K([Ib,Jb,Ib,ic],Ec);K([Ib,Jb,Jb,ic],Ec+tc);K([Ib,Jb,Ib,ic],Ec+tc);K([Jb,Jb,Jb,gc],Fc);K([Jb,Jb,Ib,gc],Fc);K([Jb,Jb,Jb,gc],Fc+tc);K([Jb,Jb,Ib,gc],Fc+tc);K([Ib,Jb,Jb,Tb],Gc);K([Ib,Jb,Ib,Tb],Gc);K([Ib,Jb,Jb,Tb],Gc+tc);K([Ib,Jb,Ib,Tb],Gc+tc);K([Ib,Jb,Jb,Vb],Hc);K([Ib,Jb,Ib,Vb],Hc);K([Ib,Jb,Jb,Vb],Hc+tc);K([Ib,Jb,Ib,Vb],Hc+tc);K([Jb,Jb,Jb,ac],Ic);K([Jb,Jb,Ib,ac],Ic);K([Jb,Jb,Jb,ac],Ic+tc);K([Jb,Jb,Ib,ac],Ic+tc);K([Ib,Ib,Jb,ac],Jc);K([Ib,Ib,Ib,ac],Jc);K([Ib,Ib,Jb,ac],Jc+tc);K([Ib,Ib,Ib,ac],Jc+tc);K([Ib,Ib,Jb,Vb],Kc);K([Ib,Ib,Ib,Vb],Kc);K([Ib,Ib,Jb,Vb],Kc+tc);K([Ib,Ib,Ib,Vb],Kc+tc);K([Ib,Ib,Jb,nc],Lc);K([Ib,Ib,Ib,nc],Lc);K([Ib,Ib,Jb,nc],Lc+tc);K([Ib,Ib,Ib,nc],Lc+tc);K([Ib,Ib,Jb,Sb],Mc);K([Ib,Ib,Ib,Sb],Mc);K([Ib,Ib,Jb,Sb],Mc+tc);K([Ib,Ib,Ib,Sb],Mc+tc);K([Ib,Ib,Jb,dc],Nc);K([Ib,Ib,Ib,dc],Nc);K([Ib,Ib,Jb,dc],Nc+tc);K([Ib,Ib,Ib,dc],Nc+tc);K([Jb,Ib,Jb,gc],Oc);K([Jb,Ib,Ib,gc],Oc);K([Jb,Ib,Jb,gc],Oc+tc);K([Jb,Ib,Ib,gc],Oc+tc);K([Jb,Jb,Jb,oc],Pc);K([Jb,Jb,Ib,oc],Pc);K([Jb,Jb,Jb,oc],Pc+tc);K([Jb,Jb,Ib,oc],Pc+tc);K([Ib,Ib,Jb,Zb],Qc);K([Ib,Ib,Ib,Zb],Qc);K([Ib,Ib,Jb,Zb],Qc+tc);K([Ib,Ib,Ib,Zb],Qc+tc);K([Jb,Ib,Jb,Tb],Rc);K([Jb,Ib,Ib,Tb],Rc);K([Jb,Ib,Jb,Tb],Rc+tc);K([Jb,Ib,Ib,Tb],Rc+tc);K([Jb,Jb,Jb,Zb],Sc);K([Jb,Jb,Ib,Zb],Sc);K([Jb,Jb,Jb,Zb],Sc+tc);K([Jb,Jb,Ib,Zb],Sc+tc);K([Ib,Jb,Jb,kc],Tc);K([Ib,Jb,Ib,kc],Tc);K([Ib,Jb,Jb,kc],Tc+tc);K([Ib,Jb,Ib,kc],Tc+tc);K([Jb,Jb,Jb,kc],Uc);K([Jb,Jb,Ib,kc],Uc);K([Jb,Jb,Jb,kc],Uc+tc);K([Jb,Jb,Ib,kc],Uc+tc);K([Jb,Ib,Jb,ac],Vc);K([Jb,Ib,Ib,ac],Vc);K([Jb,Ib,Jb,ac],Vc+tc);K([Jb,Ib,Ib,ac],Vc+tc);K([Ib,Jb,Jb,cc],Wc);K([Ib,Jb,Ib,cc],Wc);K([Ib,Jb,Jb,cc],Wc+tc);K([Ib,Jb,Ib,cc],Wc+tc);K([Jb,Jb,Jb,hc],Xc);K([Jb,Jb,Ib,hc],Xc);K([Jb,Jb,Jb,hc],Xc+tc);K([Jb,Jb,Ib,hc],Xc+tc);K([Jb,Jb,Jb,Tb],Yc);K([Jb,Jb,Ib,Tb],Yc);K([Jb,Jb,Jb,Tb],Yc+tc);K([Jb,Jb,Ib,Tb],Yc+tc);K([Ib,Jb,Jb,$b],Zc);K([Ib,Jb,Ib,$b],Zc);K([Ib,Jb,Jb,$b],Zc+tc);K([Ib,Jb,Ib,$b],Zc+tc);K([Ib,Jb,Jb,hc],$c);K([Ib,Jb,Ib,hc],$c);K([Ib,Jb,Jb,hc],$c+tc);K([Ib,Jb,Ib,hc],$c+tc);K([Ib,Ib,Jb,Xb],_c);K([Ib,Ib,Ib,Xb],_c);K([Ib,Ib,Jb,Xb],_c+tc);K([Ib,Ib,Ib,Xb],_c+tc);K([Jb,Jb,Jb,Sb],ad);K([Jb,Jb,Ib,Sb],ad);K([Jb,Jb,Jb,Sb],ad+tc);K([Jb,Jb,Ib,Sb],ad+tc);K([Jb,Ib,Jb,Ob],bd);K([Jb,Ib,Ib,Ob],bd);K([Jb,Ib,Jb,Ob],bd+tc);K([Jb,Ib,Ib,Ob],bd+tc);K([Ib,Jb,Jb,Xb],cd);K([Ib,Jb,Ib,Xb],cd);K([Ib,Jb,Jb,Xb],cd+tc);K([Ib,Jb,Ib,Xb],cd+tc);K([Ib,Ib,Jb,$b],dd);K([Ib,Ib,Ib,$b],dd);K([Ib,Ib,Jb,$b],dd+tc);K([Ib,Ib,Ib,$b],dd+tc);K([Jb,Ib,Jb,Sb],ed);K([Jb,Ib,Ib,Sb],ed);K([Jb,Ib,Jb,Sb],ed+tc);K([Jb,Ib,Ib,Sb],ed+tc);K([Ib,Jb,Jb,Rb],fd);K([Ib,Jb,Ib,Rb],fd);K([Ib,Jb,Jb,Rb],fd+tc);K([Ib,Jb,Ib,Rb],fd+tc);K([Jb,Jb,Jb,nc],gd);K([Jb,Jb,Ib,nc],gd);K([Jb,Jb,Jb,nc],gd+tc);K([Jb,Jb,Ib,nc],gd+tc);K([Ib,Jb,Jb,dc],hd);K([Ib,Jb,Ib,dc],hd);K([Ib,Jb,Jb,dc],hd+tc);K([Ib,Jb,Ib,dc],hd+tc);K([Jb,Ib,Jb,kc],jd);K([Jb,Ib,Ib,kc],jd);K([Jb,Ib,Jb,kc],jd+tc);K([Jb,Ib,Ib,kc],jd+tc);K([Jb,Ib,Jb,$b],kd);K([Jb,Ib,Ib,$b],kd);K([Jb,Ib,Jb,$b],kd+tc);K([Jb,Ib,Ib,$b],kd+tc);K([Jb,Ib,Jb,Vb],ld);K([Jb,Ib,Ib,Vb],ld);K([Jb,Ib,Jb,Vb],ld+tc);K([Jb,Ib,Ib,Vb],ld+tc);K([Jb,Ib,Jb,mc],md);K([Jb,Ib,Ib,mc],md);K([Jb,Ib,Jb,mc],md+tc);K([Jb,Ib,Ib,mc],md+tc);K([Jb,Jb,Jb,Ob],nd);K([Jb,Jb,Ib,Ob],nd);K([Jb,Jb,Jb,Ob],nd+tc);K([Jb,Jb,Ib,Ob],nd+tc);K([Jb,Jb,Jb,Rb],od);K([Jb,Jb,Ib,Rb],od);K([Jb,Jb,Jb,Rb],od+tc);K([Jb,Jb,Ib,Rb],od+tc);K([Ib,Jb,Jb,jc],pd);K([Ib,Jb,Ib,jc],pd);K([Ib,Jb,Jb,jc],pd+tc);K([Ib,Jb,Ib,jc],pd+tc);K([Ib,Ib,Jb,cc],qd);K([Ib,Ib,Ib,cc],qd);K([Ib,Ib,Jb,cc],qd+tc);K([Ib,Ib,Ib,cc],qd+tc);K([Ib,Ib,Jb,Ob],rd);K([Ib,Ib,Ib,Ob],rd);K([Ib,Ib,Jb,Ob],rd+tc);K([Ib,Ib,Ib,Ob],rd+tc);K([Jb,Ib,Jb,ic],sd);K([Jb,Ib,Ib,ic],sd);K([Jb,Ib,Jb,ic],sd+tc);K([Jb,Ib,Ib,ic],sd+tc);K([Jb,Jb,Jb,dc],td);K([Jb,Jb,Ib,dc],td);K([Jb,Jb,Jb,dc],td+tc);K([Jb,Jb,Ib,dc],td+tc);K([Jb,Ib,Jb,hc],ud);K([Jb,Ib,Ib,hc],ud);K([Jb,Ib,Jb,hc],ud+tc);K([Jb,Ib,Ib,hc],ud+tc);K([Ib,Jb,Jb,ac],vd);K([Ib,Jb,Ib,ac],vd);K([Ib,Jb,Jb,ac],vd+tc);K([Ib,Jb,Ib,ac],vd+tc);K([Jb,Ib,Jb,dc],wd);K([Jb,Ib,Ib,dc],wd);K([Jb,Ib,Jb,dc],wd+tc);K([Jb,Ib,Ib,dc],wd+tc);K([Ib,Ib,Jb,oc],xd);K([Ib,Ib,Ib,oc],xd);K([Ib,Ib,Jb,oc],xd+tc);K([Ib,Ib,Ib,oc],xd+tc);K([Ib,Jb,Jb,mc],yd);K([Ib,Jb,Ib,mc],yd);K([Ib,Jb,Jb,mc],yd+tc);K([Ib,Jb,Ib,mc],yd+tc);K([Ib,Ib,Jb,gc],zd);K([Ib,Ib,Ib,gc],zd);K([Ib,Ib,Jb,gc],zd+tc);K([Ib,Ib,Ib,gc],zd+tc);K([Jb,Jb,Jb,cc],Ad);K([Jb,Jb,Ib,cc],Ad);K([Jb,Jb,Jb,cc],Ad+tc);K([Jb,Jb,Ib,cc],Ad+tc);K([Jb,Ib,Jb,oc],Bd);K([Jb,Ib,Ib,oc],Bd);K([Jb,Ib,Jb,oc],Bd+tc);K([Jb,Ib,Ib,oc],Bd+tc);K([Ib,Jb,Jb,Ob],Cd);K([Ib,Jb,Ib,Ob],Cd);K([Ib,Jb,Jb,Ob],Cd+tc);K([Ib,Jb,Ib,Ob],Cd+tc);K([Ib,Jb,Jb,oc],Dd);K([Ib,Jb,Ib,oc],Dd);K([Ib,Jb,Jb,oc],Dd+tc);K([Ib,Jb,Ib,oc],Dd+tc);K([Ib,Ib,Jb,ic],Ed);K([Ib,Ib,Ib,ic],Ed);K([Ib,Ib,Jb,ic],Ed+tc);K([Ib,Ib,Ib,ic],Ed+tc);K([Ib,Jb,Jb,gc],Fd);K([Ib,Jb,Ib,gc],Fd);K([Ib,Jb,Jb,gc],Fd+tc);K([Ib,Jb,Ib,gc],Fd+tc);K([Jb,Ib,Jb,cc],Gd);K([Jb,Ib,Ib,cc],Gd);K([Jb,Ib,Jb,cc],Gd+tc);K([Jb,Ib,Ib,cc],Gd+tc);K([Jb,Ib,Jb,jc],Hd);K([Jb,Ib,Ib,jc],Hd);K([Jb,Ib,Jb,jc],Hd+tc);K([Jb,Ib,Ib,jc],Hd+tc);K([Ib,Ib,Jb,hc],Id);K([Ib,Ib,Ib,hc],Id);K([Ib,Ib,Jb,hc],Id+tc);K([Ib,Ib,Ib,hc],Id+tc);K([Ib,Ib,Jb,Rb],Jd);K([Ib,Ib,Ib,Rb],Jd);K([Ib,Ib,Jb,Rb],Jd+tc);K([Ib,Ib,Ib,Rb],Jd+tc);K([Jb,Jb,Jb,jc],Kd);K([Jb,Jb,Ib,jc],Kd);K([Jb,Jb,Jb,jc],Kd+tc);K([Jb,Jb,Ib,jc],Kd+tc);K([Jb,Jb,Jb,Vb],Ld);K([Jb,Jb,Ib,Vb],Ld);K([Jb,Jb,Jb,Vb],Ld+tc);K([Jb,Jb,Ib,Vb],Ld+tc);K([Ib,Ib,Jb,Tb],Md);K([Ib,Ib,Ib,Tb],Md);K([Ib,Ib,Jb,Tb],Md+tc);K([Ib,Ib,Ib,Tb],Md+tc);K([Jb,Jb,Jb,$b],Nd);K([Jb,Jb,Ib,$b],Nd);K([Jb,Jb,Jb,$b],Nd+tc);K([Jb,Jb,Ib,$b],Nd+tc);K([Ib,Jb,Jb,nc],Od);K([Ib,Jb,Ib,nc],Od);K([Ib,Jb,Jb,nc],Od+tc);K([Ib,Jb,Ib,nc],Od+tc);K([Jb,Ib,Jb,Rb],Pd);K([Jb,Ib,Ib,Rb],Pd);K([Jb,Ib,Jb,Rb],Pd+tc);K([Jb,Ib,Ib,Rb],Pd+tc);M=w[L(Db)][L(Eb)][L(Fb)][L(Kb)];var N=M.indexOf(Qd);if(N!=-1){A=Number(M.substring(N+1));M=M.substring(0,N)}}catch(a){return}var O;function P(){if(!r){r=true;G();if(n.removeEventListener){n.removeEventListener(Rd,P,false)}if(O){clearInterval(O)}}}
if(n.addEventListener){n.addEventListener(Rd,function(){P()},false)}var O=setInterval(function(){if(/loaded|complete/.test(n.readyState)){P()}},50);o&&o({moduleName:V,sessionId:p,subSystem:W,evtGroup:X,millis:(new Date).getTime(),type:cb});o&&o({moduleName:V,sessionId:p,subSystem:W,evtGroup:Sd,millis:(new Date).getTime(),type:Y});var Q=$pdk.env.Detect.getInstance().baseDir()+U+$pdk.defaultAppJsRoot+U;if(/loaded|complete|interactive/.test(document.readyState)===false){var R=Td+Q+M+Ud;n.write(Vd+Wd+Xd+Yd+Zd+$d+_d+Yd+Zd+ae+be+ce+R+de+ee+fe+ge)}else{var S=document.createElement(jb);S.type=he;var T=document.getElementsByTagName(ie)[0];if(!T)T=document.body;window.__gwtStatsEvent&&window.__gwtStatsEvent({moduleName:V,sessionId:window.__gwtStatsSessionId,subSystem:W,evtGroup:Sd,millis:(new Date).getTime(),type:cb});window.__gwtStatsEvent&&window.__gwtStatsEvent({moduleName:V,sessionId:window.__gwtStatsSessionId,subSystem:W,evtGroup:bb,millis:(new Date).getTime(),type:je});S.src=Q+M+ke;T.appendChild(S)}}
$pdk.gwtBootloader=function(a){PDK()};$pdk.ns("$pdk.entrypoint");
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
$pdk.ns("$pdk.env.Detect");
$pdk.env.Detect._class=$pdk.extend(function(){},{constructor:function(){$pdk.env.Detect._class.superclass.constructor.call(this);
this._config_sets={};
this._has_jquery=window.jQuery!==null&&typeof(window.jQuery)==="function";
this._flash_version=null;
this._model_urls=this._parseRSS();
this._nonie_flash_test_str=null;
this._nonie_silverlight_test_str=null;
this._has_video=this._detectVideo();
this._has_silverlight=null;
this._default_runtimes=["flash","html5"];
this._preferred_formats=null;
this._default_formats=["mpeg4","f4m","m3u","webm","ogg","flv","mp3"];
this._media_factory=null;
this._playback_format=null;
this._component_runtime=null;
this._playback_formats=null;
this._supported_runtimes=null;
this._preferred_formats_unfiltered=null;
this._preload_stylesheets={};
this._cookies=this._parseCookies(document.cookie)
},getCookies:function(){return this._cookies
},removePreloadStylesheet:function(a){var b=document.getElementById(a+"Loading");
if(!$pdk.isEmpty(b)&&!$pdk.isEmpty(b.parentNode)){b.parentNode.removeChild(b)
}},config:function(b,a){this._nonie_flash_test_str=b;
this._nonie_silverlight_test_str=a
},getPlaybackFormat:function(){return this._playback_format
},setPlaybackFormat:function(a){this._playback_format=a
},getComponentRuntime:function(){return this._component_runtime
},setComponentRuntime:function(a){this._component_runtime=a
},getPlaybackRuntime:function(d){var a=this.getPlayerFormats(d);
var e=this.getSupportedRuntimes();
var b="flash";
if(a&&a.length&&e&&e.length){for(var c=0;
c<e.length;
c++){if(e[c].indexOf(":"+a[0])>=0){b=e[c].split(":")[0];
break
}}}if(b==="universal"){b="flash"
}return b
},_parseCookies:function(f){var e={},d,b=f.split(";"),c=b.length,a;
for(d=0;
d<c;
d++){a=b[d].split("=");
e[a[0].replace(/\s/g,"")]=a[1]
}return e
},_detectFlash:function(){var a=[],d=null,b=[0,0,0],f=null;
if($pdk.isBB10){return b
}try{d=this._nonie_flash_test_str===null?navigator.plugins["Shockwave Flash"].description:this._nonie_flash_test_str
}catch(j){d=null
}if(typeof(d)==="string"&&d.length>0){try{f=navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin
}catch(h){f=null
}if(f!==null){d=d.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
b[0]=parseInt(d.replace(/^(.*)\..*$/,"$1"),10);
b[1]=parseInt(d.replace(/^.*\.(.*)\s.*$/,"$1"),10);
b[2]=/[a-zA-Z]/.test(d)?parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0
}}else{try{var c=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
d=c.GetVariable("$version")
}catch(g){a=null
}if(typeof(d)==="string"){a=d.split(" ")[1].split(",");
b=[parseInt(a[0],10),parseInt(a[1],10),parseInt(a[2],10)]
}}return b
},_detectVideo:function(){var c='video/mp4; codecs="avc1.42E01E',d=document.createElement("video"),g=false,b={hasVideo:false,codecs:{ogg:false,h264:false,webm:false,m3u:false,mp3:false,aac:false}},a={ogg:['video/ogg; codecs="theora"'],h264:[c+'"',c+', mp4a.40.2"'],webm:['video/webm; codecs="vp8, vorbis"','video/x-webm; codecs="vp8, vorbis"'],m3u:["application/vnd.apple.mpegurl",'audio/x-mpegurl; codecs="mp4a.40.2"','vnd.apple.mpegURL; codecs="mp4a.40.2"','application/x-mpegURL; codecs="mp4a.40.2"'],mp3:["audio/mpeg;"],aac:['audio/mp4; codecs="mp4a.40.5"'],mpegdash:["application/dash+xml","video/vnd.mpeg.dash.mpd"]};
try{g=typeof(d.canPlayType)==="function";
if(g){b.hasVideo=true;
b.codecs={ogg:this._detectVidFormat(d,a.ogg),h264:this._detectVidFormat(d,a.h264),webm:this._detectVidFormat(d,a.webm),m3u:this._detectVidFormat(d,a.m3u),mp3:this._detectVidFormat(d,a.mp3),aac:this._detectVidFormat(d,a.aac),mpegdash:typeof(window.MediaSource)==="function"||typeof(window.WebKitMediaSource)==="function"||this._detectVidFormat(d,a.mpegdash)}
}}catch(f){b.hasVideo=false
}return b
},_detectVidFormat:function(d,a){var e=a.length,c=false;
for(var b=0;
b<e;
b++){c=!($pdk.isEmpty(d.canPlayType(a[b]))||d.canPlayType(a[b]).toLowerCase()==="no")||(a[b]=='vnd.apple.mpegURL; codecs="mp4a.40.2"'&&$pdk.isChrome&&$pdk.isAndroid);
if(c){break
}}return c
},_detectSilverlight:function(){var j=null,d,a,f,l=false,c,b,k=[4,0,0,0];
if(typeof(window.ActiveXObject)==="function"){try{j=new ActiveXObject("AgControl.AgControl");
l=j.IsVersionSupported(k.join("."))
}catch(g){l=false
}}else{try{f=navigator.plugins["Silverlight Plug-In"];
c=this._nonie_silverlight_test_str!==null?this._nonie_silverlight_test_str:String(f.description);
c=c==="1.0.30226.2"?"2.0.30226.2":c;
b=c.split(".");
for(d=0;
d<4;
d++){a=b[d];
a=typeof(a)==="string"?parseInt(a,10):0;
b[d]=a
}l=$pdk.tupleComp(k,b,function(m,e){var n=e>m?1:0;
return e<m?-1:n
})>=0
}catch(h){l=false
}}return l
},_parseRSS:function(){var h=this;
var m=document.getElementsByTagName("link"),k=m.length,g=false,c=false,a,b,l={releaseurl:null,releasemodel:null,categorymodel:null,rssurl:null},f;
for(f=0;
f<k;
f++){if(!g&&m[f].type=="application/rss+xml"&&m[f].rel=="alternate"&&m[f].href.length>0){a=m[f].href;
l.rssurl=a;
try{b=a.split("?")
}catch(j){b=[]
}if(b.length>0){l.releasemodelbase=b[0];
l.releasemodel=b[0];
var d=h._createCategoryModelUrl(a);
l.categorymodelbase=d;
l.categorymodel=d+"?form=json&fields=fullTitle,id,label,order,title";
g=true
}}else{if(!c&&(m[f].type=="application/smil+xml"||m[f].type=="application/smil"||m[f].className==="tpRelease")){a=m[f].href;
if(typeof(a)==="string"&&a.length>0&&a!==document.URL){l.releaseurl=a;
c=true
}}}}return l
},_createCategoryModelUrl:function(a){var f=this;
var d=a;
try{url_parts=a.split("?")
}catch(g){url_parts=[]
}if(url_parts.length>0){if(f._isLegacyCategoryUrl(a)){var h;
try{h=url_parts[0].split("/")
}catch(b){mainUrlparts=[]
}if(h.length>0){for(i=0;
i<h.length;
++i){if(h[i]===""){h.splice(i,1);
i--
}}var k=h[0];
var c=h[1];
h=h.slice(2);
if(h.length>0){if(h[0]=="f"){if(h.length>3){h.splice(3,0,"categories")
}else{h.push("categories")
}}else{h.push("categories")
}}var j=h.join("/");
d=[k,c].join("//")+"/"+j
}}else{d=url_parts[0]
}}return d
},_isLegacyCategoryUrl:function(a){if(typeof(a)!=="string"||a.length<1){return false
}return a.match(/\/PortalService\//)!==null&&a.match(/\/getCategoryList/)!==null&&a.match(/[?&]PID\=/)!==null
},_indexOf:function(a,c){if(typeof a.indexOf==="function"){return a.indexOf(c)
}for(var b=0;
b<a.length;
b++){if(a[b]===c){return b
}}return -1
},_filterSupportedMedia:function(g){var f,j=[],h,c=g.length,k=this._indexOf(g,"flash"),d=this._indexOf(g,"html5"),b=this._indexOf(g,"universal"),e,a=false;
if(k==-1){g.push("flash");
c++
}if(d==-1){g.push("html5");
c++
}if(b>=0){if((d>=0)&&(b>d)){g[b]="html5";
g[d]="universal"
}}for(h=0;
h<c;
h++){f=g[h].toLowerCase();
switch(f){case"flash":if(this.hasFlash()){j.push("flash:3gpp");
j.push("flash:3gpp2");
j.push("flash:aac");
j.push("flash:actionscript");
j.push("flash:f4m");
j.push("flash:flv");
j.push("flash:mp3");
j.push("flash:mpeg");
j.push("flash:mpeg4");
j.push("flash:qt")
}break;
case"universal":this.addHtml5Media(j);
if(this.hasFlash()&&this.hasCanvas()){j.push("universal:3gpp");
j.push("universal:3gpp2");
j.push("universal:f4m");
j.push("universal:flv");
j.push("universal:mpeg");
j.push("universal:qt");
j.push("universal:mpeg4");
j.push("universal:mp3");
j.push("universal:aac")
}break;
case"html5":this.addHtml5Media(j);
break;
case"silverlight":if(this.hasFlash()){j.push("silverlight:asx");
j.push("silverlight:ism");
j.push("silverlight:mpeg4");
j.push("silverlight:wm")
}break;
case"windowsmedia":break;
case"move":break;
default:break
}}return j
},addHtml5Media:function(b){var c=this.hasVideo();
var a;
if(c.hasVideo){codecs=c.codecs
}else{codecs={}
}if(codecs.m3u){b.push("html5:m3u")
}if(codecs.ogg){b.push("html5:ogg")
}if(codecs.h264){b.push("html5:mpeg4")
}if(codecs.webm){b.push("html5:webm")
}if(codecs.mp3){b.push("html5:mp3")
}if(codecs.aac){b.push("html5:aac")
}if(codecs.mpegdash){b.push("html5:mpeg-dash")
}b.push("html5:javascript")
},canPlayTypeAugmentation:function(){var a=0,c=$pdk.canPlayTypeAugmentation,b=this.getConfigSet("canplaytypeaugmentation");
c=typeof(c)==="boolean"?c:true;
if(c&&!$pdk.isEmpty(b)){b=b.toArray();
for(;
a<b.length;
a++){if(b[a].toLowerCase()==="false"){c=false;
break
}}}return c
},sortM3uArray:function(b){var a=[];
for(i=b.length-1;
i>=0;
i--){if(b[i]==="m3u"){a.push(b[i])
}else{a.unshift(b[i])
}}return a
},getPreferredFormats:function(){if(this._preferred_formats===null){try{this._preferred_formats=this._filterPreferredFormats(this.getConfigSet("preferredformats").toArray())
}catch(a){this._preferred_formats=[]
}if(this._preferred_formats.length<1){this._preferred_formats=this._filterPreferredFormats(this._default_formats)
}if($pdk.isAndroid&&this.canPlayTypeAugmentation()){tpDebug("resorting preferred formats for Android","bootloader","$pdk.env.Detect",tpConsts.DEBUG);
this._preferred_formats=this.sortM3uArray(this._preferred_formats)
}}return this._preferred_formats
},getPreferredFormatsUnfiltered:function(){if(this._preferred_formats_unfiltered===null){try{this._preferred_formats_unfiltered=this.getConfigSet("preferredformats").toArray()
}catch(a){this._preferred_formats_unfiltered=[]
}if(this._preferred_formats_unfiltered.length<1){this._preferred_formats_unfiltered=this._default_formats
}if($pdk.isAndroid&&this.canPlayTypeAugmentation()){this._preferred_formats_unfiltered=this.sortM3uArray(this._preferred_formats_unfiltered)
}}return this._preferred_formats_unfiltered
},_filterPreferredFormats:function(d){var e=d.length,f,a=[],h,b,g=false,c;
h=this.hasVideo();
b=h.codecs;
for(c=0;
c<e;
c++){f=d[c].toLowerCase();
g=false;
switch(f){case"mpeg":case"mpeg4":if(b.h264||this.hasFlash()){g=true
}break;
case"mp3":if(b.mp3||this.hasFlash()){g=true
}break;
case"mpeg-dash":if(b.mpegdash){g=true
}break;
case"m3u":if(b.m3u||this.hasFlash()){g=true
}break;
case"ogg":if(b.ogg){g=true
}break;
case"webm":if(b.webm){g=true
}break;
case"ism":case"asx":case"wm":case"move":case"flv":case"f4m":if(this.hasFlash()){g=true
}break;
default:break
}if(g){a.push(d[c])
}}return a
},getPlayerFormats:function(a){if(this._playback_formats===null){this._playback_formats=[];
if(this.getComponentRuntime()!==null){this._playback_formats=this._filterPlayerFormats(this.getComponentRuntime())
}if(this._playback_formats.length<1){if(a===undefined){a="flash"
}this._playback_formats=this._filterPlayerFormats(a)
}}return this._playback_formats
},_filterPlayerFormats:function(g){var e=this.getPreferredFormats(),d=e.length,a=[],f,h,b,c;
h=this.hasVideo();
b=h.codecs;
g=g.toLowerCase();
for(c=0;
c<d;
c++){f=e[c].toLowerCase();
switch(f){case"mpeg":case"mpeg4":if(((g==="html5"||g==="universal")&&b.h264)||((g==="universal"||g==="flash"||g==="silverlight")&&this.hasFlash())){a.push(e[c])
}break;
case"mp3":if(b.mp3||this.hasFlash()){a.push(e[c])
}break;
case"mpeg-dash":if((g==="html5"||g==="universal")&&b.mpegdash){a.push(e[c])
}break;
case"m3u":if((g==="html5"||g==="universal")&&(b.m3u)){a.push(e[c])
}break;
case"ogg":if((g==="html5"||g==="universal")&&b.ogg){a.push(e[c])
}break;
case"webm":if((g==="html5"||g==="universal")&&b.webm){a.push(e[c])
}break;
case"ism":if((g==="flash"||g==="silverlight")&&this.hasFlash()){a.push(e[c])
}break;
case"asx":case"wm":if((g==="flash"||g==="silverlight"||g==="windowsmedia")&&this.hasFlash()){a.push(e[c])
}break;
case"3gpp":case"3gpp3":case"aac":case"flv":case"f4m":if((g==="flash"||g==="universal")&&this.hasFlash()){a.push(e[c])
}break;
case"move":if((g==="flash"||g==="move")&&this.hasFlash()){a.push(e[c])
}break;
default:break
}}return a
},getModelUrls:function(){return this._model_urls
},getFlashVersion:function(){if(this._flash_version===null){this._flash_version=this._detectFlash()
}return this._flash_version
},hasVideo:function(){return this._has_video
},hasCanvas:function(){var a=document.createElement("canvas");
return !!(a.getContext&&a.getContext("2d"))
},hasFlash:function(){return $pdk.tupleComp([9,0,115],this.getFlashVersion(),function(d,c){var e=c>d?1:0;
return c<d?-1:e
})>=0
},hasSilverlight:function(){if(this._has_silverlight===null){this._has_silverlight=this._detectSilverlight()
}return this._has_silverlight
},hasJquery:function(){return this._has_jquery
},getAutoInitialize:function(){var a=true;
try{a=this.getConfigSet("initialize").toArray()[0].toLowerCase()!=="false"
}catch(b){a=true
}return a
},GWTReady:function(){return this._gwt_ready
},setGWTReady:function(a){this._gwt_ready=a
},addToConfigSet:function(a,b){var c=this._config_sets[a];
if($pdk.isEmpty(c)){c=new $pdk.util.ArraySet();
this._config_sets[a]=c
}c.add(b)
},getConfigSet:function(a){return this._config_sets[a]
},baseDir:function(){var a=$pdk.scriptRoot;
try{a=this.getConfigSet("baseurl").toArray()[0]
}catch(b){a=$pdk.scriptRoot
}return a
},cachePath:function(){return this.baseDir()+"/js"
},getMediaFactory:function(){if(this._media_factory===null){this._media_factory=new $pdk.env.media.Factory(this.getSupportedRuntimes(),this._filterSupportedMedia(["flash","html5","silverlight","windowsmedia","move"]),new $pdk.env.media.FactoryLoggerTpTraceMainImpl())
}return this._media_factory
},getSupportedRuntimes:function(){if(this._supported_runtimes===null){try{this._supported_runtimes=this._filterSupportedMedia(this.getConfigSet("preferredruntimes").toArray())
}catch(a){this._supported_runtimes=[]
}if(this._supported_runtimes.length<1){this._supported_runtimes=this._filterSupportedMedia(this._default_runtimes)
}}return this._supported_runtimes
},_detectPhase1:function(){var f=false;
var e=false;
var b=document.getElementsByTagName("script");
var d;
var a=b.length;
for(d=0;
d<a;
d++){var c=b[d].innerHTML;
if(!f&&(c.indexOf("tpRegisterID(")>=0)){f=true
}if(!e&&(c.indexOf("Player(")>=0||c.indexOf("ReleaseList(")>=0||c.indexOf("ReleaseModel(")>=0)){e=true
}if(f&&e){return true
}}return false
},isPhase1:function(){if(this._is_phase1===undefined){this._is_phase1=this._detectPhase1()
}return this._is_phase1
}});
$pdk.env.Detect._singleton=null;
$pdk.env.Detect.getInstance=function(){if($pdk.env.Detect._singleton===null){$pdk.env.Detect._singleton=new $pdk.env.Detect._class()
}return $pdk.env.Detect._singleton
};
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
$pdk.ns("$pdk.env.media");
$pdk.env.media.MediaBase=$pdk.extend(function(){},{_eligibleRuntimes:[],constructor:function(){this._satisfiedRuntimes={}
},satisfyRuntime:function(a){this._satisfiedRuntimes[a]=true
},isSatisfied:function(){var b,a=this._eligibleRuntimes.length,c=false;
for(b=0;
b<a&&!c;
b++){c=this._satisfiedRuntimes[this._eligibleRuntimes[b]];
c=typeof(c)==="boolean"?c:false
}return c
},getRuntimes:function(){var b=[],c,a=this._eligibleRuntimes.length;
for(c=0;
c<a;
c++){name=this._eligibleRuntimes[c];
found=this._satisfiedRuntimes[name];
if(typeof(found)==="boolean"?found:false){b.push(name)
}}return b
},getName:function(){return this._name
}});
$pdk.env.media.AacMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"aac",_eligibleRuntimes:["flash:aac","universal:aac","html5:aac"],constructor:function(){$pdk.env.media.AacMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.ActionScriptMedia=$pdk.extend($pdk.env.media.MediaBase,{_eligibleRuntimes:["flash:actionscript"],_name:"actionscript",constructor:function(){$pdk.env.media.ActionScriptMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.AsxMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"asx",_eligibleRuntimes:["silverlight:asx"],constructor:function(){$pdk.env.media.AsxMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.AviMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"avi",_eligibleRuntimes:["flash:avi","universal:avi"],constructor:function(){$pdk.env.media.AviMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.F4mMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"f4m",_eligibleRuntimes:["flash:f4m","universal:f4m"],constructor:function(){$pdk.env.media.F4mMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.Factory=$pdk.extend(function(){},{constructor:function(b,a,c){this._runtimes=b;
this._runtimes_any_supported=a;
this._logger=c
},getBestRuntime:function(a,c,d){var b=new $pdk.env.media.strategy.Context(d,this._logger,this,c,this._runtimes,this._runtimes_any_supported),e;
if(a==="Player"){e=new $pdk.env.media.strategy.CodecComponentStrategy()
}else{e=new $pdk.env.media.strategy.GeneralComponentStrategy()
}return e.getBestRuntime(b)
},createMedia:function(d,c){c=typeof(c)==="boolean"?c:false;
var e,b=c?this._runtimes_any_supported:this._runtimes,a=b.length,f=null;
switch(d){case"actionscript":f=new $pdk.env.media.ActionScriptMedia();
break;
case"flv":f=new $pdk.env.media.FlvMedia();
break;
case"javascript":f=new $pdk.env.media.JavaScriptMedia();
break;
case"mpeg4":f=new $pdk.env.media.Mpeg4Media();
break;
case"mpeg-dash":f=new $pdk.env.media.MpegDashMedia();
break;
case"mpeg":f=new $pdk.env.media.MpegMedia();
break;
case"ogg":f=new $pdk.env.media.OggMedia();
break;
case"webm":f=new $pdk.env.media.WebMMedia();
break;
case"m3u":f=new $pdk.env.media.M3uMedia();
break;
case"3gpp":f=new $pdk.env.media.ThreeGppMedia();
break;
case"3gpp2":f=new $pdk.env.media.ThreeGpp2Media();
break;
case"aac":f=new $pdk.env.media.AacMedia();
break;
case"asx":f=new $pdk.env.media.AsxMedia();
break;
case"avi":f=new $pdk.env.media.AviMedia();
break;
case"f4m":f=new $pdk.env.media.F4mMedia();
break;
case"m3u":f=new $pdk.env.media.M3uMedia();
break;
case"move":f=new $pdk.env.media.MoveMedia();
break;
case"mp3":f=new $pdk.env.media.Mp3Media();
break;
case"qt":f=new $pdk.env.media.QtMedia();
break;
case"ism":f=new $pdk.env.media.IsmMedia();
break;
case"wm":f=new $pdk.env.media.WmMedia();
break;
default:f=new $pdk.env.media.NoOpMedia();
break
}for(e=0;
e<a;
e++){f.satisfyRuntime(b[e])
}return f
}});
$pdk.env.media.FactoryLoggerConsoleImpl=$pdk.extend(function(){},{constructor:function(){},log:function(a,b){console.log(a)
}});
$pdk.env.media.FactoryLoggerTpTraceMainImpl=$pdk.extend(function(){},{constructor:function(){},log:function(a,b){tpDebug(a,"bootloader","$pdk.env.media.Factory",b)
}});
$pdk.env.media.FlvMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"flv",_eligibleRuntimes:["flash:flv","universal:flv"],constructor:function(){$pdk.env.media.FlvMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.IsmMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"ism",_eligibleRuntimes:["silverlight:ism"],constructor:function(){$pdk.env.media.IsmMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.JavaScriptMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"javascript",_eligibleRuntimes:["html5:javascript"],constructor:function(){$pdk.env.media.JavaScriptMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.M3uMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"m3u",_eligibleRuntimes:["html5:m3u"],constructor:function(){$pdk.env.media.M3uMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.MoveMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"move",_eligibleRuntimes:["flash:move"],constructor:function(){$pdk.env.media.MoveMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.Mp3Media=$pdk.extend($pdk.env.media.MediaBase,{_name:"mp3",_eligibleRuntimes:["flash:mp3","universal:mp3","html5:mp3"],constructor:function(){$pdk.env.media.Mp3Media.superclass.constructor.apply(this)
}});
$pdk.env.media.Mpeg4Media=$pdk.extend($pdk.env.media.MediaBase,{_name:"mpeg4",_eligibleRuntimes:["flash:mpeg4","universal:mpeg4","html5:mpeg4","silverlight:mpeg4"],constructor:function(){$pdk.env.media.Mpeg4Media.superclass.constructor.apply(this)
}});
$pdk.env.media.MpegDashMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"mpeg-dash",_eligibleRuntimes:["html5:mpeg-dash"],constructor:function(){$pdk.env.media.MpegDashMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.MpegMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"mpeg",_eligibleRuntimes:["flash:mpeg","universal:mpeg"],constructor:function(){$pdk.env.media.Mpeg4Media.superclass.constructor.apply(this)
}});
$pdk.env.media.NoOpMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"noop"});
$pdk.env.media.OggMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"ogg",_eligibleRuntimes:["html5:ogg"],constructor:function(){$pdk.env.media.OggMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.QtMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"qt",_eligibleRuntimes:["flash:qt","universal:qt"],constructor:function(){$pdk.env.media.QtMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.ThreeGpp2Media=$pdk.extend($pdk.env.media.MediaBase,{_name:"3gpp2",_eligibleRuntimes:["flash:3gpp2","universal:3gpp2"],constructor:function(){$pdk.env.media.ThreeGpp2Media.superclass.constructor.apply(this)
}});
$pdk.env.media.ThreeGppMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"3gpp",_eligibleRuntimes:["flash:3gpp","universal:3gpp"],constructor:function(){$pdk.env.media.ThreeGppMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.WebMMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"webm",_eligibleRuntimes:["html5:webm"],constructor:function(){$pdk.env.media.WebMMedia.superclass.constructor.apply(this)
}});
$pdk.env.media.WmMedia=$pdk.extend($pdk.env.media.MediaBase,{_name:"wm",_eligibleRuntimes:["silverlight:wm"],constructor:function(){$pdk.env.media.WmMedia.superclass.constructor.apply(this)
}});
$pdk.ns("$pdk.env.media.strategy");
$pdk.env.media.strategy.AbstractStrategy=$pdk.extend(function(){},{_getPossibleFormats:function(f,e){var d,k=f.length,g,c,b=[],j,a=e.length,h;
for(g=0;
g<a;
g++){j=e[g].toLowerCase();
for(c=0;
c<k;
c++){d=f[c].toLowerCase();
if(j===d){b.push(d)
}}}return b
},_searchByFormatThenRuntime:function(o,p,k,a){var r=false,g,b,d,l,q=k.length,f,c=p.length,e,j,m,h;
for(g=0;
g<q&&!r;
g++){l=k[g];
b=o.createMedia(l,a);
j=b.getRuntimes();
m=j.length;
for(h=0;
h<c&&!r;
h++){f=p[h];
for(d=0;
d<m&&!r;
d++){e=j[d];
r=e===f
}}}return{runtime:r?f.replace(/(.*):.*/,"$1"):"none",medium:r?b.getName():"none"}
},_searchByRuntimeThenFormat:function(o,p,k,a){var r=false,g,b,d,l,q=k.length,f,c=p.length,e,j,m,h;
for(h=0;
h<c&&!r;
h++){f=p[h];
for(g=0;
g<q&&!r;
g++){l=k[g];
b=o.createMedia(l,a);
j=b.getRuntimes();
m=j.length;
for(d=0;
d<m&&!r;
d++){e=j[d];
r=e===f
}}}return{runtime:r?f.replace(/(.*):.*/,"$1"):"none",medium:r?b.getName():"none"}
}});
$pdk.env.media.strategy.CodecComponentStrategy=$pdk.extend($pdk.env.media.strategy.AbstractStrategy,{getBestRuntime:function(b){var e,f=b.getComponentSupportedFormats(),m=b.getLogger(),k=b.getMediaFactory(),c=[],g,d=b.getPreferredFormats(),j=b.getRuntimes();
runtimes_any_supported=b.getRuntimesAnySupported();
var h=$pdk.env.Detect.getInstance().getConfigSet("preferredruntimes");
var l=h?h.toArray()[0]:"flash";
if(l=="flash"&&!$pdk.env.Detect.getInstance().hasFlash()){l="html5"
}var a={medium:d[0],runtime:l};
m.log("searching for best runtime for preferred formats ("+d.join(", ")+") from list of supported formats ("+f.join(", ")+")",tpConsts.INFO);
c=this._getPossibleFormats(f,d);
g=c.length;
m.log("possible formats narrowed to: "+(g>0?c.join(", "):"[none]"),tpConsts.INFO);
e=this._searchByFormatThenRuntime(k,j,c,false);
if(e.medium==="none"){m.log("falling back to any supported runtime",tpConsts.INFO);
e=this._searchByFormatThenRuntime(k,runtimes_any_supported,c,true)
}if(e.runtime==="none"){m.log("no viable runtime found, falling back to HTML",tpConsts.INFO);
e=a
}else{m.log("picked best format/runtime : "+e.medium+"/"+e.runtime,tpConsts.INFO)
}return e
}});
$pdk.env.media.strategy.Context=$pdk.extend(function(){},{constructor:function(f,c,d,e,b,a){this._component_supported_formats=f;
this._logger=c;
this._media_factory=d;
this._preferred_formats=e;
this._runtimes=b;
this._runtimes_any_supported=a
},getComponentSupportedFormats:function(){return this._component_supported_formats
},getLogger:function(){return this._logger
},getMediaFactory:function(){return this._media_factory
},getPreferredFormats:function(){return this._preferred_formats
},getRuntimes:function(){return this._runtimes
},getRuntimesAnySupported:function(){return this._runtimes_any_supported
}});
$pdk.env.media.strategy.GeneralComponentStrategy=$pdk.extend($pdk.env.media.strategy.AbstractStrategy,{getBestRuntime:function(a){var d,e=a.getComponentSupportedFormats(),j=a.getLogger(),h=a.getMediaFactory(),b=[],f,c=a.getPreferredFormats(),g=a.getRuntimes();
runtimes_any_supported=a.getRuntimesAnySupported();
b=this._getPossibleFormats(e,c);
f=b.length;
d=this._searchByFormatThenRuntime(h,g,b,false);
if(d.medium==="none"){d=this._searchByRuntimeThenFormat(h,g,e,false)
}if(d.medium==="none"){d=this._searchByFormatThenRuntime(h,runtimes_any_supported,b,true)
}if(d.medium==="none"){d=this._searchByFormatThenRuntime(h,runtimes_any_supported,e,true)
}if(d.runtime==="none"){j.log("no viable runtime found",tpConsts.INFO)
}else{j.log("picked best format/runtime : "+d.medium+"/"+d.runtime,tpConsts.INFO)
}if(d.runtime=="universal"){d.runtime="html5"
}return d
}});
$pdk.ns("$pdk.util");
$pdk.util.ArraySet=$pdk.extend(function(){},{constructor:function(){this._members=[]
},add:function(a){var b=!this.contains(a);
if(b){this._members.push(a)
}return b
},remove:function(b){var c=this._find(b),a=false;
if(c>-1){a=delete this._members[c]
}return a
},contains:function(a){return this._find(a)>-1
},toArray:function(){return this._members
},_find:function(c){var b=0,a=this._members.length,d=-1;
for(;
b<a&&d<0;
b++){d=c===this._members[b]?b:-1
}return d
}});
$pdk.util.Strings=$pdk.apply(function(){},{encodeXmlAttribute:function(a){return typeof(a)!=="string"?null:a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos").replace(/"/g,"&quot;")
}});
$pdk.Entrypoint=$pdk.apply({},{_class:$pdk.extend($pdk.entrypoint.Entrypoint,{constructor:function(){$pdk.Entrypoint._class.superclass.constructor.call(this);
this._loadingStyleInjected=false
},configure:function(a,b){$pdk.Entrypoint._class.superclass.configure.call(this,a,b);
this._insertDefaultStylesheet()
},_insertDefaultStylesheet:function(){var a=document.createElement("link");
a.type="text/css";
a.rel="stylesheet";
a.href=this._env.baseDir()+"/style/default.css";
a.media="screen";
document.getElementsByTagName("head")[0].insertBefore(a,document.getElementsByTagName("head")[0].firstChild)
},injectLoadingStyle:function(c){var b,a;
if(!this._loadingStyleInjected){for(class_name in $pdk.shell.Factory.CLASS_TABLE){b=[".",class_name,class_name==="tpPlayer"?" ":" > * ","{ display: none !important; }"].join("");
if(c){a=document.createElement("style");
a.setAttribute("type","text/css");
a.setAttribute("id",class_name+"Loading");
if(a.styleSheet){a.styleSheet.cssText=b
}else{a.innerHTML=b
}document.getElementsByTagName("head")[0].appendChild(a)
}else{document.write(['<style id="',class_name,'Loading" ',">",b,"</style>"].join(""))
}}this._loadingStyleInjected=true
}},_injectPhase1JS:function(){var e=this;
if(this._loaded){var c=this._env.baseDir();
var b=document.getElementsByTagName("head")[0];
if(typeof(window.tpPhase1Debug)!=="string"){com.theplatform.pdk.ExternalScriptLoader.loadScript("tpPDK.js",function(){})
}else{var d=document.createElement("script");
d.type="text/javascript";
d.src=tpPhase1Debug.indexOf("http://")===0?tpPhase1Debug:this._env.baseDir()+tpPhase1Debug;
b.appendChild(d)
}}else{var a=this._postOnLoad;
this._postOnLoad=function(){a();
e._injectPhase1JS()
}
}},_connectShellsToGwt:function(b){var d=this;
if(this._loaded){this._registry.satisfyShellDeps();
this._registry.connectShellsToGwt();
this._env.setGWTReady(true);
this._complete=true;
tpDoInitGwtCommManager();
var e=this._registry.getShells().toArray();
for(i=0;
i<e.length;
i++){if(e[i].getRuntime()==="flash"){tpRegisterID(e[i].getSwfObjectId())
}}var c=tpGetRegisteredIDs();
tpController.callFunction("htmlPageLoaded",c?[c]:[])
}else{var a=this._postOnLoad;
this._postOnLoad=function(){a();
d._connectShellsToGwt(b)
}
}},initialize:function(){this.injectLoadingStyle(true);
$pdk.Entrypoint._class.superclass.initialize.call(this);
var c=this;
$pdk.shell.Factory.generate($pdk.shell.Factory.getNamesFromDomElements($pdk.dom.Helper.findByClass(/^tp/)),this._registry,this._env);
var a=$pdk.env.Detect.getInstance().getConfigSet("preferredruntimes");
var b=(!$pdk.env.Detect.getInstance().hasFlash()||a&&a.contains("html5"))?true:false;
if(!b){var d=c._registry.getShells().toArray();
for(i=0;
i<d.length;
i++){if(d[i].getRuntime()==="html5"||d[i].getRuntime()==="HTML5"){b=true;
break
}}}if(b){window.tpPhase1PDKLoaded=function(){c._connectShellsToGwt(b)
};
this._injectPhase1JS()
}else{this._connectShellsToGwt(b)
}}}),_singleton:null,getInstance:function(){if($pdk.Entrypoint._singleton===null){$pdk.Entrypoint._singleton=new $pdk.Entrypoint._class()
}return $pdk.Entrypoint._singleton
},onLoad:function(){$pdk.Entrypoint.getInstance().onLoad()
}});
$pdk.PdkVersion=$pdk.extend(function(){},{constructor:function(a,d,c,e,b){this.major=a;
this.minor=d;
this.revision=c;
this.build=e;
this.date=b
},toString:function(){return this.major+"."+this.minor+"."+this.revision+"."+this.build+" ("+this.date+")"
},equals:function(a){return this.major===a.major&&this.minor===a.minor&&this.revision===a.revision&&this.build===a.build
}});
$pdk.ns("$pdk.dom");
$pdk.dom.Helper=$pdk.apply({},{findByClass:function(f,e){var d,c,h,a,g=[],b;
if($pdk.isEmpty(f)){f=null
}if($pdk.isEmpty(e)){e=document
}h=e.getElementsByTagName("*");
a=h.length;
for(d=0;
d<a;
d++){c=h[d];
if(c.nodeType===1){if(f===null){g.push(c)
}else{b=c.className;
if(typeof(b)==="string"&&b.match(f)!==null){g.push(c)
}}}}return g
}});
$pdk.ns("$pdk.queue");
$pdk.ns("$pdk.queue");
$pdk.queue.Controller=$pdk.extend(function(){},{constructor:function(a){var b=this;
this._env=a;
this._events={};
this._functions={};
this._objects={};
this._isLoading=true;
this._canMessage=false;
this._messageQueue=[];
this._priorityQueue=[];
this._sendQueue=[];
this._isSending=false;
this._isShutDown=false;
this._runtimes=null;
this._blankString="__blank_string__";
this._defaultScope={globalDataType:this._getDataTypeName("ScopeInfo"),controlId:"javascript",isGlobal:true,isAny:false,isEmpty:false,scopeIds:["javascript","default"]}
},ready:function(){this.isHTML5Loading=false;
this._checkMessageQueue();
this._checkPriorityQueue()
},sendMessage:function(a,d,b){if(d.name==="controllerComplete"){this.onControllerComplete()
}if(d&&d.payload&&d.payload.name==="addPlayerCard"&&typeof(a)==="string"&&a.toLowerCase().match("swf")!==null){tpDebug("------filtering addPlayerCard from category list","javascript","Controller",tpConsts.DEBUG);
return
}var c={message:d,destination:a};
if(this._isLoading&&!b){this._messageQueue.push(c)
}else{if(!this._canMessage){this._priorityQueue.push(c)
}else{this._doSendMessage(c)
}}},_isSafariWin:(navigator.userAgent.indexOf("Windows")>-1&&navigator.userAgent.indexOf("AppleWebKit")>-1),onControllerComplete:function(){},_doSendMessage:function(a){var b=tpThisMovie(a.destination);
if(a.message.name==="callFunction"&&a.message.payload.name==="showFullScreen"&&a.message.payload.args[0]===true&&b.tagName&&(b.tagName.toLowerCase()==="object"||b.tagName.toLowerCase()==="embed")){tpDebug("Switching to full screen from Javascript is not supported by the Flash run-time. Flash only allows you to go to full screen mode via a click in the player itself.","tpController","Controller","error");
return
}if(this._isShutDown){return
}if($pdk.isWebKit&&$pdk.isWindows){setTimeout(function(){b.executeMessage(a.message)
},1)
}else{b.executeMessage(a.message)
}},_checkMessageQueue:function(){var a=this._messageQueue.length;
while(this._messageQueue.length>0){this._doSendMessage(this._messageQueue.shift())
}},_checkPriorityQueue:function(){var a;
while(this._priorityQueue.length>0){a=this._priorityQueue.shift();
if(a.destination==="unknown"){a.destination=tpBridgeID
}this._doSendMessage(a)
}},_wrapMessage:function(a,d){var b={globalDataType:this._getDataTypeName("CommInfo"),id:"javascript"},c={globalDataType:this._getDataTypeName("MessageInfo"),name:a,payload:d,comm:b};
return c
},_getDataTypeName:function(a){var b=null;
switch(a){case"AdPattern":b="com.theplatform.pdk.data::AdPattern";
break;
case"Banner":b="com.theplatform.pdk.data::Banner";
break;
case"BaseClip":b="com.theplatform.pdk.data::BaseClip";
break;
case"CallInfo":b="com.theplatform.pdk.communication::CallInfo";
break;
case"CategoryInfo":b="com.theplatform.pdk.data::CategoryInfo";
break;
case"Clip":b="com.theplatform.pdk.data::Clip";
break;
case"CommInfo":b="com.theplatform.pdk.communication::CommInfo";
break;
case"CustomData":b="com.theplatform.pdk.data::CustomData";
break;
case"CustomValue":b="com.theplatform.pdk.data::CustomValue";
break;
case"DispatchInfo":b="com.theplatform.pdk.communication::DispatchInfo";
break;
case"FunctionInfo":b="com.theplatform.pdk.communication::FunctionInfo";
break;
case"HandlerInfo":b="com.theplatform.pdk.communication::HandlerInfo";
break;
case"HyperLink":b="com.theplatform.pdk.data::HyperLink";
break;
case"MediaClick":b="com.theplatform.pdk.data::MediaClick";
break;
case"MediaFile":b="com.theplatform.pdk.data::MediaFile";
break;
case"MessageInfo":b="com.theplatform.pdk.communication::MessageInfo";
break;
case"MetricInfo":b="com.theplatform.pdk.data::MetricInfo";
break;
case"Overlay":b="com.theplatform.pdk.data::Overlay";
break;
case"PdkEvent":b="com.theplatform.pdk.events::PdkEvent";
break;
case"ProviderInfo":b="com.theplatform.pdk.data::ProviderInfo";
break;
case"Range":b="com.theplatform.pdk.data::Range";
break;
case"Rating":b="com.theplatform.pdk.data::Rating";
break;
case"Release":b="com.theplatform.pdk.data::Release";
break;
case"ReleaseInfo":b="com.theplatform.pdk.data::ReleaseInfo";
break;
case"ScopeInfo":b="com.theplatform.pdk.communication::ScopeInfo";
break;
case"Sort":b="com.theplatform.pdk.data::Sort";
break;
case"Subtitles":b="com.theplatform.pdk.data::Subtitles";
break;
case"TrackingUrl":b="com.theplatform.pdk.data::TrackingUrl";
break;
case"BandwidthPreferences":b="com.theplatform.pdk.data::BandwidthPreferences";
break;
case"Annotation":b="com.theplatform.pdk.data::Annotation";
break;
default:b=null;
break
}return b
},_createScope:function(a){if(a&&a.globalDataType){return a
}var b=this._defaultScope;
if(!$pdk.isEmpty(a)){if(a.length===0){a.push("javascript")
}b={globalDataType:this._getDataTypeName("ScopeInfo"),controlId:"javascript",isGlobal:true,isAny:false,isEmpty:false,scopeIds:a}
}return b
},_checkForExternalPlayers:function(){var f=tpGetPlayerFormats(),e,d,a,c,b;
if(f){f=f.split("|");
e=f.length;
a=this._isWMLoaded();
for(b=0;
b<e;
b++){d=f[b].toLowerCase();
switch(d){case"mpeg":case"mpeg4":if(!a&&this._checkRuntimePreferred(["silverlight","flash"])=="silverlight"){tpLoadScript(this._env.baseDir()+"/js/tpExternal_SMF.js");
a=true
}break;
case"ism":if(!a){tpLoadScript(this._env.baseDir()+"/js/tpExternal_SMF.js");
a=true
}break;
case"asx":case"wm":if(!a){c=this._checkRuntimePreferred(["silverlight","windowsmedia"]);
if(c==="windowsmedia"){tpLoadScript(this._env.baseDir()+"/js/tpExternal_WMP.js");
a=true
}else{tpLoadScript(this._env.baseDir()+"/js/tpExternal_SMF.js");
a=true
}}break;
case"move":break;
default:break
}}}},_isWMLoaded:function(){var b,a;
if(typeof(tpExternalJS)!=="undefined"){for(b=0;
b<tpExternalJS.length;
b++){a=tpExternalJS[b];
if(a.indexOf("/tpExternal_SMF.js")>=0||a.indexOf("/tpExternal_WMP.js")){return true
}}}return false
},_checkRuntimePreferred:function(d){if(this._runtimes===null){this._runtimes=this._env.getSupportedRuntimes()
}var a=d.length,c=this._runtimes.length,f,g,e,b;
for(e=0;
e<c;
e++){f=this._runtimes[e];
for(b=0;
b<a;
b++){g=d[b];
if(f.indexOf(g)===0){return g
}}}return null
},getProperty:function(a){return this.component[a.toLowerCase()]
},registerFunction:function(g,h,j,c){var d=this._createScope(j);
var b=c===undefined?false:c;
var e,l,a,k,f=false;
if($pdk.isEmpty(this._functions[g])){this._functions[g]={};
b=true
}for(e=0;
e<d.scopeIds.length&&!f;
e++){l=d.scopeIds[e];
if(l==="*"){f=true
}else{this._functions[g][l]=h;
b=true
}}if(!f&&b){a={globalDataType:this._getDataTypeName("FunctionInfo"),name:g,scope:d};
k=this._wrapMessage("registerFunction",a);
this.sendMessage(tpBridgeID,k,true)
}},unregisterFunction:function(g,h){var c=this._createScope(scopes),d,k,f,b,a,e=false,j;
if(!$pdk.isEmpty(this._functions[g])){a=this._functions[g];
for(d=0;
d<c.scopeIds.length;
d++){k=c.scopeIds[d];
if(k=="*"){delete this._functions[g];
break
}if(!$pdk.isEmpty(a[k])){delete a[k]
}}e=false;
if(!$pdk.isEmpty(a)){for(f in a){e=true;
break
}if(!e){delete this._functions[g]
}}}if(!$pdk.isEmpty(e)){b={globalDataType:this._getDataTypeName("FunctionInfo"),name:g,scope:c};
j=this._wrapMessage("unregisterFunction",b);
this.sendMessage(tpBridgeID,j,true)
}},addEventListener:function(e,f,g){var d=this._createScope(g),h={globalDataType:this._getDataTypeName("HandlerInfo"),name:e,handler:f,scope:d},b=false,j,a,c,k;
if($pdk.isEmpty(this._events[e])){this._events[e]=[];
b=true
}j=this._events[e];
a=false;
for(c=0;
c<j.length;
c++){if(j[c].handler==f){j[c]=h;
a=true;
break
}}if(!a){j.push(h)
}if(b){k=this._wrapMessage("addEventListener",h);
this.sendMessage(tpBridgeID,k,true)
}},removeEventListener:function(e,f,g){if($pdk.isEmpty(this._events[e])){return
}var b=this._createScope(g),j={globalDataType:this._getDataTypeName("HandlerInfo"),name:e,handler:f,scope:b},a=this._events[e],c,d,k;
for(c=0;
c<a.length;
c++){d=a[c];
if(d.handler==j.handler){a=a.splice(c,1);
break
}}if(a.length===0){delete this._events[e];
k=this._wrapMessage("removeEventListener",j);
this.sendMessage(tpBridgeID,k,true)
}},dispatchEvent:function(b,h,e,g){var d=this._createScope(e),a={globalDataType:this._getDataTypeName("PdkEvent"),type:b,data:h,originator:{controlId:g,isAny:false,isGlobal:true,isEmpty:false,globalDataType:"com.theplatform.pdk.communication::ScopeInfo",scopeIds:[]}},c={globalDataType:this._getDataTypeName("DispatchInfo"),evt:a,scope:d};
this._doDispatchEvent(c);
var f=this._wrapMessage("dispatchEvent",c);
this.sendMessage(tpBridgeID,f,true)
},callFunction:function(g,b,e){var d=this._createScope(e),c={globalDataType:this._getDataTypeName("CallInfo"),name:g,args:b,scope:d},f;
var a=this._doCallFunction(c);
f=this._wrapMessage("callFunction",c);
this.sendMessage(tpBridgeID,f,true);
return a
},_doDispatchEvent:function(dispatch){if($pdk.isEmpty(this._events[dispatch.evt.type])){return
}var handlers=this._events[dispatch.evt.type].slice(0),i,j,s,k,fired,handler;
if(dispatch.evt&&dispatch.evt.data){this._parseCustomData(dispatch.evt.data)
}for(i=0;
i<handlers.length;
i++){handler=handlers[i];
if(dispatch.scope.isAny){if(typeof handler.handler==="string"){eval(handler.handler)(dispatch.evt)
}else{if(typeof handler.handler==="function"){handler.handler(dispatch.evt)
}}continue
}for(j=0;
j<handler.scope.scopeIds.length;
j++){s=handler.scope.scopeIds[j];
fired=false;
if(s=="*"){if(typeof handler.handler==="string"){eval(handler.handler)(dispatch.evt)
}else{if(typeof handler.handler==="function"){handler.handler(dispatch.evt)
}}break
}for(k=0;
k<dispatch.scope.scopeIds.length;
k++){if(s==dispatch.scope.scopeIds[k]){fired=true;
if(typeof handler.handler==="string"){eval(handler.handler)(dispatch.evt)
}else{if(typeof handler.handler==="function"){handler.handler(dispatch.evt)
}}break
}}if(fired){break
}}}},_parseCustomData:function(a){for(var e in a){var c=a[e];
if(c&&(c.globalDataType||$pdk.isArray(c))){if(c.globalDataType=="com.theplatform.pdk.data::CustomData"){for(var d in c){var b=d;
if(!b){continue
}if(b.indexOf("__PERIOD__")!=-1){b=b.replace("__PERIOD__",".")
}if(b.indexOf("__DASH__")!=-1){b=b.replace("__DASH__","-")
}if(b.indexOf("__COLON__")!=-1){b=b.replace("__COLON__",":")
}if(b.indexOf("__SPACE__")!=-1){b=b.replace("__SPACE__"," ")
}if(b.indexOf("__LEFT_BRACKET__")!=-1){b=b.replace("__LEFT_BRACKET__","[")
}if(b.indexOf("__RIGHT_BRACKET__")!=-1){b=b.replace("__RIGHT_BRACKET__","]")
}if(b!=d){c[b]=c[d];
delete c[d]
}}}else{this._parseCustomData(c)
}}}},_doCallFunction:function(k){if($pdk.isEmpty(this._functions[k.name])){return
}var a={},c,l,d;
var e;
for(c=0;
c<k.scope.scopeIds.length;
c++){if(k.scope.scopeIds[c]==="*"){if(this._functions[k.name]){for(var h in this._functions[k.name]){if(this._functions[k.name].hasOwnProperty(h)&&!$pdk.isEmpty(this._functions[k.name][h])){a[h]=this._functions[k.name][h]
}}}}else{l=k.scope.scopeIds[c];
if(!$pdk.isEmpty(this._functions[k.name][l])){a[l]=this._functions[k.name][l]
}}}var g=[];
for(d in a){var b=a[d];
var j=true;
for(c=0;
c<g.length;
c++){if(g[c]===b){j=false
}}if(j){g.push(b);
e=b.apply(this._objects[k.name],k.args)
}}return e
},receiveMessage:function(a,b){if(a=="javascript"){switch(b.name){case"commReady":tpBridgeID=tpCommID;
this._canMessage=true;
this._checkPriorityQueue();
break;
case"bridgeReady":tpBridgeID=b.comm.id;
this._canMessage=true;
this._checkPriorityQueue();
break;
case"dispatchEvent":this.receiveEvent(b.payload);
break;
case"callFunction":this._doCallFunction(b.payload);
break;
default:break
}}else{this.sendMessage(a,b,true)
}},receiveEvent:function(a){if(a.evt.type=="OnPlayerLoaded"){this._isLoading=false;
this._checkMessageQueue();
this._checkForExternalPlayers()
}this._doDispatchEvent(a)
},modRelease:function(a){var b;
if(!$pdk.isEmpty(a)){a.globalDataType=this._getDataTypeName("Release");
if(a.categories){a.categories=this.modCategories(a.categories)
}if(a.thumbnails){for(b=0;
b<a.thumbnails.length;
b++){a.thumbnails[b].globalDataType=this._getDataTypeName("MediaFile");
if(a.thumbnails[b].customValues){a.thumbnails[b].customValues=this.modCustomValues(a.thumbnails[b].customValues)
}}}if(a.customValues){a.customValues=this.modCustomValues(a.customValues)
}if(a.metrics){for(b=0;
b<a.metrics.length;
b++){a.metrics[b].globalDataType=this._getDataTypeName("MetricInfo")
}}if(a.provider){a.provider.globalDataType=this._getDataTypeName("ProviderInfo");
if(a.provider.customValues){a.provider.customValues=this.modCustomValues(a.provider.customValues)
}}if(a.ratings){for(b=0;
b<a.ratings.length;
b++){a.ratings[b].globalDataType=this._getDataTypeName("Rating")
}}if(a.URL){a.url=a.URL
}}return a
},modCustomValues:function(a){var b;
for(b=0;
b<a.length;
b++){a[b].globalDataType=this._getDataTypeName("CustomValue")
}return a
},modCategories:function(a){var b;
for(b=0;
b<a.length;
b++){a[b].globalDataType=this._getDataTypeName("CategoryInfo")
}return a
},modClip:function(a){var b;
if(!$pdk.isEmpty(a)){a.globalDataType=this._getDataTypeName("Clip");
b=a.baseClip;
if($pdk.isEmpty(b)){b={}
}if(!$pdk.isEmpty(a.banners)){b.banners=a.banners
}if(!$pdk.isEmpty(a.overlays)){b.overlays=a.overlays
}a.baseClip=this.modBaseClip(b);
if(!$pdk.isEmpty(a.chapter)){a.chapter.globalDataType=this._getDataTypeName("Chapter")
}}return a
},modBaseClip:function(b){var a;
if($pdk.isEmpty(b)){b={}
}b.globalDataType=this._getDataTypeName("BaseClip");
if(!$pdk.isEmpty(b.moreInfo)){b.moreInfo.globalDataType=this._getDataTypeName("HyperLink");
if(!$pdk.isEmpty(b.moreInfo.clickTrackingUrls)){b.moreInfo.clickTrackingUrls=this.modTracking(b.moreInfo.clickTrackingUrls)
}}if(!$pdk.isEmpty(b.banners)){for(a=0;
a<b.banners.length;
a++){b.banners[a].globalDataType=this._getDataTypeName("Banner");
if(!$pdk.isEmpty(b.banners[a].clickTrackingUrls)){b.banners[a].clickTrackingUrls=this.modTracking(b.banners[a].clickTrackingUrls)
}}}if(!$pdk.isEmpty(b.overlays)){for(a=0;
a<b.overlays.length;
a++){b.overlays[a].globalDataType=this._getDataTypeName("Overlay");
if(!$pdk.isEmpty(b.overlays[a].clickTrackingUrls)){b.overlays[a].clickTrackingUrls=this.modTracking(b.overlays[a].clickTrackingUrls)
}}}if(!$pdk.isEmpty(b.availableSubtitles)){for(a=0;
a<b.availableSubtitles;
a++){b.availableSubtitles[a].globalDataType=this._getDataTypeName("Subtitles")
}}if(!$pdk.isEmpty(b.categories)){b.categories=this.modCategories(b.categories)
}if(!$pdk.isEmpty(b.adPattern)){b.adPattern.globalDataType=this._getDataTypeName("AdPattern")
}if(!$pdk.isEmpty(b.trackingURLs)){b.trackingURLs=this.modTracking(b.trackingURLs)
}if(!$pdk.isEmpty(b.contentCustomData)){b.contentCustomData.globalDataType=this._getDataTypeName("CustomData")
}if(!$pdk.isEmpty(b.ownerCustomData)){b.ownerCustomData.globalDataType=this._getDataTypeName("CustomData")
}if(!$pdk.isEmpty(b.outletCustomData)){b.outletCustomData.globalDataType=this._getDataTypeName("CustomData")
}return b
},modTracking:function(a){var b;
for(b=0;
b<a.length;
b++){a.globalDataType=this._getDataTypeName("TrackingUrl")
}return a
},shutDown:function(){this.callFunction("shutDown",[],["*"]);
this._isShutDown=true
},_regFunc:function(a,e,g,d){var b,h,f=$pdk.isEmpty(e)?0:e.length,c;
for(b=0;
b<f;
b++){h=e[b];
c=g[b];
if(!$pdk.isEmpty(g[b])){switch(h){case"com.theplatform.pdk.data.Release":c=tpController.modRelease(c);
break;
case"com.theplatform.pdk.data.Clip":c=tpController.modClip(c);
break;
case"com.theplatform.pdk.data.Range":c.globalDataType=this._getDataTypeName("Range");
break;
case"com.theplatform.pdk.data.Sort":c.globalDataType=this._getDataTypeName("Sort");
break;
case"com.theplatform.pdk.data.Annotation":c.globalDataType=this._getDataTypeName("Annotation");
break;
case"com.theplatform.pdk.data.BandwidthPreferences":c.globalDataType=this._getDataTypeName("BandwidthPreferences");
break;
default:break
}}}this.callFunction(a,g,d)
}});
$pdk.ns("$pdk.queue");
$pdk.queue.IFrameListener=$pdk.extend(function(){},{constructor:function(){var d=this,a=window.location.hash.substring(1).split("&"),e;
this._callbacks={};
this._origin=null;
this._iframeMessageHandler=function(f){d._acceptIFrameMessage(f)
};
for(var b=0;
b<a.length;
b++){e=a[b].split("=");
if(e[0].toLowerCase()=="playerurl"&&e.length==2){$pdk.parentUrl=unescape(e[1])
}}if(window.addEventListener){addEventListener("message",this._iframeMessageHandler,false)
}else{attachEvent("onmessage",this._iframeMessageHandler)
}var c=this;
$pdk.controller.addEventListener("OnPlayerLoaded",function(f){c._queuedPlayerLoaded=f
})
},_acceptIFrameMessage:function(c){var b=this,d,e;
if(this._origin&&(c.origin!==this._origin)){return
}try{d=JSON.parse(c.data)
}catch(a){d=null
}if(d!==null&&typeof(d)==="object"){switch(d.type){case"initialization":if(this._origin===null){this._origin=c.origin
}else{break
}if(d.name.toLowerCase()==="playerurl"){$pdk.parentUrl=d.parameters[0]
}break;
case"method":if(this._origin){$pdk.controller[d.name].apply($pdk.controller,d.parameters)
}break;
case"addEventListener":if(this._origin&&d.parameters&&d.parameters.length==2){e=function(f){b._dispatchEventToParentIFrame(f,d.parameters[1])
};
this._callbacks[d.parameters[1]]=e;
if(d.name==="OnPlayerLoaded"&&this._queuedPlayerLoaded){e(this._queuedPlayerLoaded)
}$pdk.controller.addEventListener(d.name,e,d.parameters[0])
}break;
case"removeEventListener":if(this._origin&&d.parameters&&d.parameters.length==2){e=this._callbacks[d.parameters[1]];
if(typeof(e)==="function"){$pdk.controller.removeEventListener(d.name,e,d.parameters[0])
}}break;
default:break
}}},_dispatchEventToParentIFrame:function(a,c){var b=JSON.stringify({type:"event",name:a.type,parameters:[a,c]});
window.parent.postMessage(b,this._origin)
},destroy:function(){this._callbacks=[];
if(window.removeEventListener){removeEventListener("message",this._iframeMessageHandler,false)
}else{detachEvent("onmessage",this._iframeMessageHandler)
}}});
$pdk.ns("$pdk.queue.deferred");
$pdk.queue.deferred.DeferredController=$pdk.extend(function(){},{constructor:function(){this.functions={};
this.objects={}
},buildListenerChain:function(){if(!this.listenerChain){this.listenerChain={}
}},addEventListener:function(a,b){if(!b instanceof Function){throw {message:"Listener isn't a function"}
}this.buildListenerChain();
if(!this.listenerChain[a]){this.listenerChain[a]=[b]
}else{this.listenerChain[a].push(b)
}},hasEventListener:function(a){if(this.listenerChain){return(typeof this.listenerChain[a]!="undefined")
}else{return false
}},removeEventListener:function(b,c){if(!this.hasEventListener(b)){return false
}for(var a=0;
a<this.listenerChain[b].length;
a++){if(this.listenerChain[b][a]==c){this.listenerChain[b].splice(a,1)
}}},dispatchEvent:function(c,a){this.buildListenerChain();
if(!this.hasEventListener(c)){return false
}for(var b=0;
b<this.listenerChain[c].length;
b++){var d=this.listenerChain[c][b];
if(d.call){d.call(this,{type:c,data:a})
}}},callFunction:function(b,e,c,d){var a=this.functions[b];
if(a){return this.functions[b].apply(this.objects[b],e)
}else{return null
}},registerFunction:function(b,a,c){this.functions[b]=c;
this.objects[b]=a
}});
$pdk.queue.deferred.DeferredShell=$pdk.extend(function(){},{_STATE:{STARTING:"STARTING",LOADING:"LOADING",RESTING:"RESTING"},_INPUT:{FUNCTION:"FUNCTION",EVENT:"EVENT",EMPTY:"EMPTY",LOADED:"LOADED",LOAD_CANCELED:"LOAD_CANCELED"},constructor:function(a,b){this._queue=[];
this._listeners={};
this._functions={};
this._currentState=this._STATE.STARTING;
this._controller=a;
this._controllerDeferred=$pdk.isEmpty(b)?new $pdk.queue.deferred.DeferredController():b
},getRegisteredFunctions:function(){return this._functions
},addFunction:function(a){var b=this;
this._functions[a]=function(){b._queueFunction(a,Array.prototype.slice.call(arguments,0))
};
this._controller.registerFunction(a,{},this._functions[a])
},addListener:function(a,b){var c=this;
this._listeners[a]=function(d){c._queueEvent(a,d.data,b)
};
this._controller.addEventListener(a,this._listeners[a])
},_queueFunction:function(a,b){this._stateInput(this._INPUT.FUNCTION,{type:"function",name:a,parameters:b,triggerLoad:true})
},_queueEvent:function(a,c,b){this._stateInput(this._INPUT.EVENT,{type:"event",name:a,data:c,triggerLoad:b})
},_stateInput:function(a,b){switch(this._currentState){case this._STATE.STARTING:switch(a){case this._INPUT.FUNCTION:case this._INPUT.EVENT:this._queue.push(b);
break;
default:break
}if(b.triggerLoad){this._changeState(this._STATE.LOADING,b)
}break;
case this._STATE.LOADING:switch(a){case this._INPUT.FUNCTION:case this._INPUT.EVENT:this._queue.push(b);
break;
case this._INPUT.LOADED:this._changeState(this._STATE.RESTING,b);
break;
case this._INPUT.LOAD_CANCELED:this._changeState(this._STATE.STARTING,b);
break;
default:break
}break;
case this._STATE.RESTING:switch(a){case this._INPUT.FUNCTION:this._controller.callFunction(b.name,b.parameters);
break;
case this._INPUT.EVENT:this._controller.dispatchEvent(b.name,b.data);
break;
default:break
}break;
default:break
}},_changeState:function(e,d){var c;
var b=this;
switch(e){case this._STATE.STARTING:this._currentState=this._STATE.STARTING;
break;
case this._STATE.LOADING:this._currentState=this._STATE.LOADING;
this._load(d);
break;
case this._STATE.RESTING:for(var a in this._listeners){this._controller.removeEventListener(a,this._listeners[a])
}while(this._queue.length>0){c=this._queue.shift();
switch(c.type){case"function":this._controller.callFunction(c.name,c.parameters,[]);
break;
case"event":this._controllerDeferred.dispatchEvent(c.name,c.data);
break;
default:break
}}this._currentState=this._STATE.RESTING;
break;
default:break
}},_load:function(a){}});
$pdk.queue.deferred.GlobalController=$pdk.extend(function(){},{constructor:function(a,c,b){this._controller=a;
this._defaultScopes=[c].concat(b?b:["default"])
},addEventListener:function(a,c,b){this._controller.addEventListener(a,c,(b?b:this._defaultScopes))
},removeEventListener:function(a,c,b){this._controller.removeEventListener(a,c,(b?b:this._defaultScopes))
},dispatchEvent:function(b,a,c){this._controller.dispatchEvent(b,a,(c?c:this._defaultScopes))
},callFunction:function(a,d,b,c){this._controller.callFunction(a,d,(b?b:this._defaultScopes))
},registerFunction:function(b,a,d,c){this._controller.registerFunction(b,d,(c?c:this._defaultScopes))
}});
$pdk.ns("$pdk.queue.deferred.ShellController.flash");
$pdk.apply($pdk.queue.deferred.ShellController.flash,{_currentContextId:0,_contexts:{},create:function(){var a=new $pdk.queue.deferred.DeferredController();
$pdk.queue.deferred.ShellController.flash._contexts[++$pdk.queue.deferred.ShellController.flash._currentContextId]=a;
return $pdk.queue.deferred.ShellController.flash._currentContextId
},getContext:function(a){return $pdk.queue.deferred.ShellController.flash._contexts[a]
},applyContextFunction:function(a,b,d){var c=$pdk.queue.deferred.ShellController.flash._contexts[a];
if(c!==null&&typeof(c)==="object"){var e=c.getRegisteredFunctions();
if(e!==null&&typeof(e[b])==="function"){e[b].apply(c,d)
}}},addEventListener:function(b,d,a,f){var e=$pdk.queue.deferred.ShellController.flash._contexts[b],c=$pdk.shell.Registry.getInstance().getShells().get(d),g=null;
if(e!==null&&typeof(e)==="object"&&c!==null&&typeof(c)==="object"){g=document.getElementById(c.getSwfObjectId());
if(g!==null&&(typeof(g)==="object"||typeof(g)=="function")&&typeof(g[f])==="function"){e.addEventListener(a,function(h){g[f].call(g,h)
})
}}}});
$pdk.ns("$pdk.queue.deferred.loader");
$pdk.queue.deferred.loader.CardsLoader=$pdk.extend($pdk.queue.deferred.DeferredShell,{constructor:function(b,a,c){this._cardsLoader=b;
$pdk.queue.deferred.loader.CardsLoader.superclass.constructor.call(this,a,c);
this.addFunction("addPlayerCard");
this.addFunction("showPlayerCard");
this.addFunction("hidePlayerCard");
this.addListener("OnMediaAreaChanged",false);
this.addListener("OnOverlayAreaChanged",false);
this.addListener("OnMediaAreaChangedFlash",false);
this.addListener("OnOverlayAreaChangedFlash",false);
this.addListener("OnMediaStart",false);
this.addListener("OnReleaseStart",false);
this.addListener("OnLoadRelease",false);
this.addListener("OnLoadReleaseUrl",false);
this.addListener("OnSetRelease",false);
this.addListener("OnPlayerComponentAreaChanged",false)
},_load:function(){var a=this;
a._cardsLoader({onSuccess:function(){tpDebug("success loading cards");
a._stateInput(a._INPUT.LOADED,{})
},onUnavailable:function(b){tpDebug("failed to load cards: "+b)
}})
}});
$pdk.queue.deferred.loader.ControlsLoader=$pdk.extend($pdk.queue.deferred.DeferredShell,{constructor:function(a,b,d,c){$pdk.queue.deferred.loader.ControlsLoader.superclass.constructor.call(this,a);
this._playerId=b;
this._onSuccess=d;
this._onFailure=c;
this.addListener("OnMediaPlaying",true);
this.addListener("OnPlayerLoaded",true);
this.addListener("OnGetSubtitleLanguage",false);
this.addListener("OnHideCard",false);
this.addListener("OnLoadRelease",false);
this.addListener("OnLoadReleaseUrl",false);
this.addListener("OnMediaEnd",false);
this.addListener("OnMediaLoadStart",false);
this.addListener("OnMediaLoading",false);
this.addListener("OnMediaPause",false);
this.addListener("OnMediaSeek",false);
this.addListener("OnMediaStart",false);
this.addListener("OnMediaUnpause",false);
this.addListener("OnMute",false);
this.addListener("OnReleaseEnd",false);
this.addListener("OnReleaseStart",false);
this.addListener("OnResize",false);
this.addListener("OnSetReleaseUrl",false);
this.addListener("OnShowCard",false);
this.addListener("OnShowFullScreen",false);
this.addListener("OnShowPlayOverlay",false);
this.addListener("OnVolumeChange",false)
},_load:function(c){var a=this;
var b=new com.theplatform.pdk.controls.loader.ControlsLoaderExported();
b.load(a._controller,a._controllerDeferred,a._playerId,c.name,a._onSuccess,a._onFailure,{onSuccess:function(){tpDebug("success loading com.theplatform.pdk.controls.loader.ControlsLoaderExported","Controls");
a._stateInput(a._INPUT.LOADED,{})
},onUnavailable:function(d){tpDebug("could not load com.theplatform.pdk.controls.loader.ControlsLoaderExported: "+d,"Controls");
a._stateInput(a._INPUT.LOAD_CANCELED,{})
}})
}});
$pdk.queue.deferred.loader.ReleaseListLoader=$pdk.extend($pdk.queue.deferred.DeferredShell,{constructor:function(a,b){$pdk.queue.deferred.loader.ReleaseListLoader.superclass.constructor.call(this,a,b);
this.addListener("OnRefreshReleaseModel",false);
this.addListener("OnRefreshReleaseModelStarted",false)
},load:function(){var a=this;
a._stateInput(a._INPUT.EMPTY,{triggerLoad:true})
},_load:function(){var a=this;
a._stateInput(a._INPUT.LOADED,{})
}});
$pdk.queue.deferred.loader.Subtitles=$pdk.extend($pdk.queue.deferred.DeferredShell,{constructor:function(g,e,h,a,f,j,d,c,b){$pdk.queue.deferred.loader.Subtitles.superclass.constructor.call(this,g);
this._initOverlayArea=e;
this._viewElement=h;
this._subtitleSettingsCookieName=a;
this._defaultFontSizePixel=f;
this._defaultStyle=j;
this._defaultMissingRegionStyle=d;
this._showSubtitles=c;
this._enableDynamicSubtitleFonts=b;
this.addFunction("setShowSubtitles");
this.addListener("OnGetSubtitleLanguage",true);
this.addListener("OnOverlayAreaChanged",false);
this.addListener("OnSubtitleCuePoint",true);
this.addListener("OnMediaStart",true)
},_load:function(){var a=this;
$pdk.Entrypoint.getInstance().addCallback(function(){var b=new com.theplatform.pdk.subtitles.loader.SubtitlesLoaderExported();
b.load(a._viewElement,a._defaultFontSizePixel,a._defaultStyle,a._defaultMissingRegionStyle,a._subtitleSettingsCookieName,a._enableDynamicSubtitleFonts,a._showSubtitles,a._controller,a._controllerDeferred,{onSuccess:function(){tpDebug("success loading com.theplatform.pdk.subtitles.webapp.SubtitlesExported","Subtitles");
a._stateInput(a._INPUT.LOADED,{})
},onUnavailable:function(c){tpDebug("could not load com.theplatform.pdk.subtitles.webapp.SubtitlesExported: "+c,"Subtitles",tpConsts.ERROR)
}})
})
}});
$pdk.queue.deferred.loader.SubtitlesSettingsManager=$pdk.extend($pdk.queue.deferred.DeferredShell,{constructor:function(a,b){$pdk.queue.deferred.loader.SubtitlesSettingsManager.superclass.constructor.call(this,a);
this._subtitleSettingsCookieName=b;
this.addFunction("getSubtitleLanguage");
this.addFunction("getSubtitleStyle");
this.addFunction("setSubtitleLanguage");
this.addFunction("setSubtitleStyle")
},_load:function(){var a=this;
$pdk.Entrypoint.getInstance().addCallback(function(){var b=new com.theplatform.pdk.subtitles.loader.SubtitlesSettingsManagerLoaderExported();
b.load(a._subtitleSettingsCookieName,a._controller,a._controllerDeferred,{onSuccess:function(){tpDebug("success loading com.theplatform.pdk.subtitles.loader.SubtitlesSettingsManagerLoaderExported","SubtitlesSettingsManagerLoader");
a._stateInput(a._INPUT.LOADED,{})
},onUnavailable:function(c){tpDebug("could not load com.theplatform.pdk.subtitles.loader.SubtitlesSettingsManagerLoaderExported: "+c,"SubtitlesSettingsManagerLoader",tpConsts.ERROR)
}})
})
}});
$pdk.queue.deferred.loader.SubtitlesSettingsManager.flash={_currentContextId:0,_contexts:{},create:function(c,d){var a=$pdk.queue.deferred.ShellController.flash.getContext(c),b=new $pdk.queue.deferred.loader.SubtitlesSettingsManager(a,d);
$pdk.queue.deferred.loader.SubtitlesSettingsManager.flash._contexts[++$pdk.queue.deferred.loader.SubtitlesSettingsManager.flash._currentContextId]=b;
return $pdk.queue.deferred.loader.SubtitlesSettingsManager.flash._currentContextId
},applyContextFunction:function(a,b,d){var c=$pdk.queue.deferred.loader.SubtitlesSettingsManager.flash._contexts[a];
if(c!==null&&typeof(c)==="object"){var e=c.getRegisteredFunctions();
if(e!==null&&typeof(e[b])==="function"){e[b].apply(c,d)
}}}};
$pdk.ns("$pdk.shell");
$pdk.shell.DefaultsAbstractImpl=$pdk.extend(function(){},{decorate:function(b,c,a){b.fp.allowscriptaccess="always";
b.fp.menu=true;
b.fp.salign="tl";
b.fp.scale="noscale";
b.fp.wmode="transparent";
b.fa.wmode="transparent"
},configureRuntime:function(c,d){var b=c.supportedMedia.split(",");
tpDebug("configuring shell "+c.getName(),"bootloader","$pdk.shell.DefaultsAbstractImpl",tpConsts.INFO);
if($pdk.isAndroid&&d.canPlayTypeAugmentation()){b=d.sortM3uArray(b)
}var a=d.getMediaFactory().getBestRuntime(c.getName(),d.getPreferredFormatsUnfiltered(),b);
if($pdk.isIE6||$pdk.isIE7||$pdk.isIE8){c.setRuntime("flash");
tpDebug("Legacy IE, using runtime: flash","bootloader","$pdk.shell.DefaultsAbstractImpl",tpConsts.DEBUG)
}else{tpDebug("best_runtime.runtime: "+a.runtime,"bootloader","$pdk.shell.DefaultsAbstractImpl",tpConsts.DEBUG);
c.setRuntime(a.runtime)
}tpDebug("best_runtime.medium: "+a.medium,"bootloader","$pdk.shell.DefaultsAbstractImpl",tpConsts.DEBUG);
c.setMedium(a.medium);
this._is_phase1=$pdk.env.Detect.getInstance().isPhase1()
},isPhase1:function(){return this._is_phase1
}});
$pdk.shell.Base=$pdk.extend(function(){},{constructor:function(e,c,b,d){var a;
$pdk.shell.Base.superclass.constructor.call(this);
this.fp={};
this.fa={};
this.useBootloader="true";
this._markupId=typeof(e)==="string"?e:String(Math.round(Math.random()*100000000000000));
this._width=typeof(c)==="string"||typeof(c)==="number"?String(c):null;
this._height=typeof(b)==="string"||typeof(b)==="number"?String(b):null;
this._write_was_called=false;
this._attach_was_called=false;
this._gwt_component=null;
this._registry.add(this);
this._runtime=null;
this._medium=null;
this._configureProcessor=function(){};
if($pdk.isObject(d)){$pdk.apply(this,d)
}this._config_decorator.decorate(this,this._env,this._registry)
},getWidth:function(){return this._width!==null?String(this._width):null
},getHeight:function(){return this._height!==null?String(this._height):null
},setWidth:function(a){this._width=a
},setHeight:function(a){this._height=a
},getId:function(){return this._markupId
},getSwfObjectId:function(){return this._markupId===null?null:["_",this._markupId,"PdkSwfObject"].join("")
},getName:function(){return this._name
},getMarkupClass:function(){return this._markupClass
},getRuntime:function(){if(typeof(this.runtime)==="string"){this._runtime=this.runtime;
delete this.runtime
}return this._runtime
},setRuntime:function(a){this._runtime=a
},getMedium:function(){return this._medium
},setMedium:function(a){this._medium=a
},asSwf:function(){return this._asSwf
},jsViewImpl:function(){return this._jsViewImpl
},jsViewCallBackName:function(){return this._jsViewCallBackName
},getPriority:function(){return this._priority
},write:function(){this._write_was_called=true;
var a=document.getElementsByTagName("script");
var b=a[a.length-1];
var c=b.parentNode;
this._registry.remove(this);
this._markupId=c.id;
this._registry.add(this);
this.bind()
},attach:function(){this.bind()
},bind:function(){this._attach_was_called=true;
if(this._env.GWTReady()){this._attachToGWT()
}},resyncAttach:function(){if(this._attach_was_called){this._attachToGWT()
}},_attachToGWT:function(){var a;
if(this._gwt_component===null){tpSetCssClass(this._markupId,this._markupClass);
a=new com.theplatform.pdk.ComponentFactory(this.getName(),this.getConfig());
this._gwt_component=a.create();
this._gwt_component.bind()
}},getConfig:function(){this._prepareConfigure();
var c={id:this._markupId,skinurl:this._env.baseDir()+"/skins/glass/glass.json"},b;
c=this._normalizeNVP(this,c);
if(this.getName()==="Player"&&c.releaseurl===undefined){c.releaseurl=this._env.getModelUrls().releaseurl
}delete this.fa.height;
delete this.fa.width;
delete this.fp.height;
delete this.fp.width;
delete c.height;
delete c.width;
delete c.engine;
var a=this.jsViewImpl();
if(a&&a!==""&&a.indexOf("@Bundle:")===-1){a=this._env.baseDir()+"/js/"+this.jsViewImpl()
}else{if(a.indexOf("@Bundle:")!==-1){a=a.replace("@Bundle:","")
}}return{as_swf:this._env.baseDir()+"/swf/"+this.asSwf(),js_view_impl:a,markup_class:this.getMarkupClass(),engine:this.getRuntime(),medium:this.getMedium(),markup_id:this.getId(),pdk_swf_object_id:this.getSwfObjectId(),variables:c,width:this.getWidth(),height:this.getHeight(),flash_attributes:this._normalizeNVP(this.fa,{}),flash_parameters:this._normalizeNVP(this.fp,{})}
},setConfigureProcessor:function(a){this._configureProcessor=a
},_prepareConfigure:function(){this._configureProcessor(this,{variables:this._normalizeNVP(this,{}),flash_attributes:this._normalizeNVP(this.fa,{}),flash_parameters:this._normalizeNVP(this.fp,{})})
},_normalizeNVP:function(d,c){var b,a,e;
for(e in d){if(!e.match(/^_/)){b=d[e];
a=typeof(b);
if(a==="number"||a==="boolean"){b=String(b);
a="string"
}if(a==="string"){c[e.toLowerCase()]=b
}}}return c
}});
$pdk.shell.Collection=$pdk.extend(function(){},{constructor:function(){$pdk.shell.Collection.superclass.constructor.call(this);
this._shells={}
},put:function(b,a){this._shells[b]=a
},remove:function(a){delete this._shells[a]
},get:function(a){return this._shells[a]
},keys:function(){var b,a=[];
for(b in this._shells){if(this._shells[b]!==Object.prototype[b]){a.push(b)
}}return a
},toArray:function(){var d=[],c=this.keys(),a=c.length,b;
for(b=0;
b<a;
b++){d.push(this.get(c[b]))
}return d
}});
$pdk.shell.DefaultsCategoryListImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){$pdk.shell.DefaultsCategoryListImpl.superclass.decorate.apply(this,arguments);
b.divId=b.getId();
b.supportedMedia="actionscript";
if(typeof(b.expandedcssclass)!=="string"||b.expandedcssclass.length>0){b.expandedcssclass=b.getMarkupClass()+"Expanded"
}this.configureRuntime(b,c);
if(this.isPhase1()){this.setPhase1Defaults(b)
}},setPhase1Defaults:function(a){a.allchoiceindex=1;
a.allchoicelabel="All Videos";
a.backgroundcolor="0x383838";
a.expandedheight=198;
a.expandedwidth=795;
a.expandercolor="0xBEBEBE";
a.expanderhovercolor="0xBEBEBE";
a.expanderselectedcolor="0x00CCFF";
a.framecolor="0x545759";
a.itembackgroundcolor="0x383838";
a.itemframecolor="0x131313";
a.itemshineselectedcolor="0x00CCFF";
a.mostpopularchoiceindex=2;
a.mostpopularchoicelabel="Most Popular";
a.textcolor="0xBEBEBE";
a.textframecolor="0x242424";
a.textframehovercolor="0xBEBEBE";
a.textframeselectedcolor="0x00CCFF";
a.texthovercolor="0xBEBEBE";
a.textselectedcolor="0x00CCFF"
}});
$pdk.shell.DefaultsCategoryModelImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){var d=this;
$pdk.shell.DefaultsCategoryModelImpl.superclass.decorate.apply(this,arguments);
b.setWidth(1);
b.setHeight(1);
b.supportedMedia="actionscript";
b.categoryModelRssUrl=c.getModelUrls().rssurl;
if($pdk.isIE6||$pdk.isIE7||$pdk.isIE8){b.setRuntime("flash");
b.setMedium("actionscript")
}else{b.setRuntime("html5");
b.setMedium("javascript")
}b.setConfigureProcessor(function(e,f){if((typeof(f.variables.feedpid)==="string"&&f.variables.feedpid.length>0)||d._isLegacyCategoryURL(f.variables.feedsserviceurl)||d._isLegacyCategoryURL(e.categoryModelRssUrl)){tpDebug("forcing flash runtime for category model",tpConsts.INFO);
e.setRuntime("flash");
e.setMedium("javascript")
}})
},_isLegacyCategoryURL:function(a){if(typeof(a)!=="string"||a.length<1){return false
}return a.match(/\/PortalService\//)!==null&&a.match(/\/getCategoryList/)!==null&&a.match(/[?&]PID\=/)!==null
}});
$pdk.shell.DefaultsClipInfoImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(c,e,b){var a=c.getWidth(),d=c.getHeight();
if(typeof(a)!=="string"||a.length<1){c.setWidth("100%")
}if(typeof(d)!=="string"||d.length<1){c.setHeight("100%")
}$pdk.shell.DefaultsClipInfoImpl.superclass.decorate.apply(this,arguments);
c.supportedMedia="actionscript,javascript";
this.configureRuntime(c,e);
if(this.isPhase1()){this.setPhase1Defaults(c)
}},setPhase1Defaults:function(a){a.backgroundcolor="0xFFFFFF";
a.banneralignment="top";
a.bannerregions="";
a.descriptioncolor="0xF2F2F2";
a.framecolor="0xFFFFFF";
a.titlecolor="0xF2F2F2"
}});
$pdk.shell.DefaultsHeaderImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){$pdk.shell.DefaultsHeaderImpl.superclass.decorate.apply(this,arguments);
b.backgroundcolor="0x383838";
b.framecolor="0x545759";
b.supportedMedia="actionscript";
this.configureRuntime(b,c)
}});
$pdk.shell.DefaultsNavigationImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){$pdk.shell.DefaultsNavigationImpl.superclass.decorate.apply(this,arguments);
b.supportedMedia="actionscript,javascript";
this.configureRuntime(b,c);
if(this.isPhase1()){this.setPhase1Defaults(b)
}},setPhase1Defaults:function(a){a.backgroundcolor="0x131313";
a.framecolor="0x000000";
a.itembackgroundcolor="0x383838";
a.itemframecolor="0xFF0000";
a.itemshineselectedcolor="0xFF0000";
a.textbackgroundcolor="0x383838";
a.textcolor="0xDFDFDF";
a.textframecolor="0x383838";
a.texthighlighthovercolor="0x00CCFF";
a.texthighlightselectedcolor="0xFFFFFF";
a.texthovercolor="0xDFDFDF";
a.textselectedcolor="0xDFDFDF";
a.thumbnailbackgroundcolor="0x242424";
a.thumbnailframecolor="0x383838";
a.thumbnailhighlighthovercolor="0x00CCFF";
a.thumbnailhighlightselectedcolor="0xFFFFFF";
a.controlbackgroundcolor="0xFF0000";
a.controlcolor="0xF2F2F2";
a.controlframecolor="0xFF0000";
a.controlframehovercolor="0xFF0000";
a.controlframeselectedcolor="0xFF0000";
a.controlhovercolor="0xFFFFFF";
a.controlselectedcolor="0x00CCFF";
a.infocolor="0x1D1D1D";
a.itemsperpage=4;
a.fa.wmode="transparent";
a.fp.wmode="transparent"
}});
$pdk.shell.DefaultsNoOpImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){}});
$pdk.shell.DefaultsPlayerImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(k,j,b){$pdk.shell.DefaultsPlayerImpl.superclass.decorate.apply(this,arguments);
var c=document.getElementById(k.getId()),a,m=k.getWidth(),f=k.getHeight(),g=j.getConfigSet("usedefaultcards");
if(typeof(m)!=="string"||m.length<1){k.setWidth("100%")
}if(typeof(f)!=="string"||f.length<1){k.setHeight("100%")
}if(c===null){var e=document.getElementsByTagName("script");
var n=e[e.length-1];
var d=n.parentNode;
this._markupId=d.id;
c=d
}if(c.nodeName.toLowerCase()=="video"){a=c.getElementsByTagName("source");
if(a&&a.length&&a[0].src){k.releaseurl=a[0].src.split("?")[0]
}else{if(c.src){k.releaseurl=c.src.split("?")[0]
}}if(c.poster){k.previewimageurl=c.poster
}if(c.autoplay){k.autoplay=c.autoplay
}}if(!j.rssurl&&j.getModelUrls().rssurl){k.rssurl=j.getModelUrls().rssurl
}if(!this.isPhase1()){k.backgroundcolor="0x131313";
k.controlbackgroundcolor="0x131313";
k.controlcolor="0xF2F2F2";
k.controlframecolor="0xE0E0E0";
k.controlhovercolor="0xFFFFFF";
k.controlselectedcolor="0x00CCFF";
k.framecolor="0xE0E0E0";
k.loadprogresscolor="0x7C7C7C";
k.pagebackgroundcolor="0x131313";
k.playprogresscolor="0xE0E0E0";
k.scrubtrackcolor="0x131313";
k.scrubbercolor="0xF2F2F2";
k.scrubberframecolor="0xF2F2F2";
k.textbackgroundcolor="0x383838";
k.textcolor="0xF2F2F2"
}k.allowfullscreen=true;
k.fa.allowfullscreen="true";
k.fp.allowfullscreen="true";
k.wmode=k.fa.wmode=k.fp.wmode="opaque";
k.supportedMedia="mpeg4,f4m,flv,m3u,ogg,webm,mpeg,qt,3gpp,ism,wm,3gpp2,aac,asx,avi,move,mp3,mpeg-dash";
k.releaseUrlFormatResolution=false;
this.configureRuntime(k,j);
j.setPlaybackFormat(k.getMedium());
k.formats=this._createFormats(j,k);
j.setComponentRuntime(k.getRuntime());
if(k.getRuntime()=="universal"){k.setRuntime("html5")
}if(k.getRuntime()=="html5"&&!k.videoEngineRuntime){k.videoengineruntime=j.getPlaybackRuntime(k.getRuntime())
}var l=this;
k.setConfigureProcessor(function(q,r){var s=l._getVideoLayer(q,r);
if(s){if(s.runtime){var p=false;
var h=j.getSupportedRuntimes();
if(s.runtime==="flash"&&$pdk.env.Detect.getInstance().hasFlash()){p=true;
q.videoEngineRuntime="flash"
}else{for(var o=0;
o<h.length;
o++){if(h[o].indexOf(s.runtime+":")===0){p=true;
break
}}}if(p){q.videoengineruntime=s.runtime
}}q.videolayer=s.layer;
q.videolayerconfig=s.config;
q.formats=s.formats?s.formats:q.formats
}});
k.useDefaultCards=k.getRuntime()==="html5";
if(!$pdk.isEmpty(g)){k.useDefaultCards=g.toArray()[0].toLowerCase()!=="false"
}},_getVideoLayer:function(e){var a={runtime:null,layer:null,formats:null,config:null};
var b=[];
for(prop in e){if(typeof e[prop]==="string"&&prop.toLowerCase().indexOf("plugin")===0&&e[prop].toLowerCase().indexOf("videolayer")>=0){b.push(e[prop].split("|"))
}}if(b.length>0){for(var d=0;
d<b.length;
d++){for(var c=0;
c<b[d].length;
c++){if(b[d][c].toLowerCase().indexOf("videolayer=")===0){a.layer=b[d][c].toLowerCase().split("=")[1]
}else{if(b[d][c].toLowerCase().indexOf("formats=")===0){a.formats=b[d][c].toLowerCase().split("=")[1]
}else{if(b[d][c].toLowerCase().indexOf("runtime=")===0){a.runtime=b[d][c].toLowerCase().split("=")[1]
}}}}if(a.layer){a.config=b[d].join("|");
return a
}}}},_createFormats:function(c,a){var b=c.getPlayerFormats(a.getRuntime());
var d;
if(b.length>0){d=b.join(",");
tpDebug("using player formats: "+d,"bootloader","$pdk.shell.DefaultsPlayerImpl",tpConsts.INFO)
}else{tpDebug("Could not find a preferred format for this browser. Player will not add formats to selector calls","bootloader","$pdk.shell.DefaultsPlayerImpl",tpConsts.WARN)
}return d
}});
$pdk.shell.DefaultsReleaseListImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){$pdk.shell.DefaultsReleaseListImpl.superclass.decorate.apply(this,arguments);
b.supportedMedia="actionscript,javascript";
this.configureRuntime(b,c);
b._deferredController=new $pdk.queue.deferred.DeferredController();
b._loader=new $pdk.queue.deferred.loader.ReleaseListLoader(new $pdk.queue.deferred.GlobalController($pdk.controller),b._deferredController);
if(this.isPhase1()){this.setPhase1Defaults(b)
}},setPhase1Defaults:function(a){a.allowscrolling="false";
a.animation="slideHorizontal";
a.backgroundcolor="0x131313";
a.columns=2;
a.framecolor="0x383838";
a.itembackgroundcolor="0x383838";
a.itemframecolor="0x383838";
a.itemshineselectedcolor="0x383838";
a.itemsperpage=4;
a.textbackgroundcolor="0x383838";
a.textcolor="0xDFDFDF";
a.textframecolor="0x383838";
a.texthighlighthovercolor="0x00CCFF";
a.texthighlightselectedcolor="0xFFFFFF";
a.texthovercolor="0xDFDFDF";
a.textselectedcolor="0xDFDFDF";
a.thumbnailbackgroundcolor="0x242424";
a.thumbnailframecolor="0x383838";
a.thumbnailheight=75;
a.thumbnailhighlighthovercolor="0x00CCFF";
a.thumbnailhighlightselectedcolor="0xFFFFFF";
a.thumbnailwidth=100;
a.showairdate=false;
a.showauthor=false;
a.showbitrate=false;
a.showdescription=true;
a.showformat=false;
a.showlength=true;
a.showthumbnail=true;
a.showtitle=true
}});
$pdk.shell.DefaultsReleaseModelImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){var d=this;
$pdk.shell.DefaultsReleaseModelImpl.superclass.decorate.apply(d,arguments);
b.setWidth(1);
b.setHeight(1);
b.params=d._createParams(c,b);
b.supportedMedia="actionscript,javascript";
b._paramsOriginal=b.params;
b.releaseModelRssUrl=c.getModelUrls().rssurl;
if($pdk.isIE6||$pdk.isIE7||$pdk.isIE8){b.setRuntime("flash");
b.setMedium("actionscript")
}else{b.setRuntime("html5");
b.setMedium("javascript")
}b.setConfigureProcessor(function(e,f){if((typeof(f.variables.feedpid)==="string"&&f.variables.feedpid.length>0)||d._isLegacyReleaseURL(f.variables.feedsserviceurl)||d._isLegacyReleaseURL(e.releaseModelRssUrl)){tpDebug("forcing flash runtime for release model",tpConsts.INFO);
e.setRuntime("flash");
e.setMedium("javascript")
}})
},_isLegacyReleaseURL:function(a){if(typeof(a)!=="string"||a.length<1){return false
}return a.match(/\/PortalService\//)!==null&&a.match(/\/getReleaseList/)!==null&&a.match(/[?&]PID\=/)!==null
},_createParams:function(f,d){tpDebug("looking up best format for player","bootloader","$pdk.shell.DefaultsReleaseModelImpl",tpConsts.INFO);
var g=[],b=[],a=null,c=f.getMediaFactory().getBestRuntime("Player",f.getPreferredFormatsUnfiltered(),["mpeg4","f4m","flv","m3u","ogg","webm","mpeg","qt","3gpp","ism","wm","3gpp2","aac","asx","avi","move","mp3","mpeg-dash"]),e=f.getPlayerFormats(c.runtime);
if(e.length>0){tpDebug("using player formats: "+e.join(", "),"bootloader","$pdk.shell.DefaultsReleaseModelImpl",tpConsts.INFO);
a=e.join("|")
}else{e=f.getPreferredFormatsUnfiltered();
if(e.length>0){tpDebug("Release model could not find viable format for player. Choosing first preferred format from ("+e.join(", ")+")","bootloader","$pdk.shell.DefaultsReleaseModelImpl",tpConsts.INFO);
a=e[0]
}else{tpDebug("Could not find a preferred format. Release model will fetch all formats.","bootloader","$pdk.shell.DefaultsReleaseModelImpl",tpConsts.WARN)
}}if(a!==null){g.push("byContent=byFormat%3D"+a)
}if(!$pdk.isEmpty(d.thumbnailwidth)){b.push("byWidth%3D"+d.thumbnailwidth)
}if(!$pdk.isEmpty(d.thumbnailheight)){b.push("byHeight%3D"+d.thumbnailheight)
}if(b.length>0){g.push("thumbnailFilter="+b.join("%26"))
}return g.join("&")
}});
$pdk.shell.DefaultsSearchImpl=$pdk.extend($pdk.shell.DefaultsAbstractImpl,{decorate:function(b,c,a){$pdk.shell.DefaultsSearchImpl.superclass.decorate.apply(this,arguments);
b.backgroundcolor="0x131313";
b.controlbackgroundcolor="0x242424";
b.controlcolor="0xBEBEBE";
b.controlframecolor="0x545759";
b.controlframehovercolor="0xBEBEBE";
b.controlframeselectedcolor="0x00CCFF";
b.controlhovercolor="0xBEBEBE";
b.controlselectedcolor="0x00CCFF";
b.editbackgroundcolor="0x131313";
b.editcolor="0xBEBEBE";
b.framecolor="0x545759";
b.labelcolor="0xBEBEBE";
b.searchhint="Search...";
b.searchlabel="Search";
b.supportedMedia="actionscript,javascript";
this.configureRuntime(b,c)
}});
$pdk.shell.Factory=$pdk.apply({},{generate:function(j,a,f){var e,d,k=j.length,g,h,c,b;
for(e=0;
e<k;
e++){d=j[e];
h=$pdk.shell.Factory.CLASS_TABLE[d.markupClass];
if(d.markupClass=="tpPlayer"){if($pdk.isEmpty(d.tpVars.releaseurl)){c=f.getModelUrls().releaseurl;
if(typeof(c)==="string"&&c.length>0){d.tpVars.releaseurl=c
}}if(d.tpVars.loglevel&&!window.tpLogLevel){window.tpLogLevel=d.tpVars.loglevel
}if($pdk.isEmpty(d.tpVars.releaseurl)||$pdk.isAndroid||$pdk.isIOS){d.tpVars.autoplay="false"
}else{if($pdk.isEmpty(d.tpVars.autoplay)&&!$pdk.isEmpty(d.tpVars.releaseurl)){d.tpVars.autoplay="true"
}}}if(typeof(h)==="function"){g=a.getShells().get(d.markupId);
g=g===null||typeof(g)!=="object"?new h(d.markupId):g;
$pdk.apply(g,d.tpVars);
$pdk.apply(g.fp,d.tpFp);
$pdk.apply(g.fa,d.tpFa);
g.attach()
}}$pdk.shell.Factory._generateMissingModels(a,f)
},_generateMissingModels:function(a,h){var j=a.getShells().toArray(),b=[],f=[],d=[],k=0,n=0,e,c=j.length,g,m;
for(e=0;
e<c;
e++){g=j[e];
switch(g.getName()){case"ReleaseList":b={};
n++;
d.push(b);
b.startindex=1;
b.endindex=parseInt(g.itemsperpage,10);
b.thumbnailwidth=g.thumbnailwidth;
b.thumbnailheight=g.thumbnailheight;
break;
case"ReleaseModel":n--;
d.pop();
break;
case"CategoryList":k++;
f.push({});
break;
case"CategoryModel":k--;
f.pop();
break;
default:break
}}for(e=0;
e<n;
e++){g=$pdk.shell.Factory._buildModelShell(h,"releasemodel"+String(e),"tpReleaseModel",$pdk.shell.Factory.CLASS_TABLE.tpReleaseModel,[h.getModelUrls().releasemodel,h.getModelUrls().releasemodelbase],d[e])
}for(e=0;
e<k;
e++){g=$pdk.shell.Factory._buildModelShell(h,"categorymodel"+String(e),"tpCategoryModel",$pdk.shell.Factory.CLASS_TABLE.tpCategoryModel,[h.getModelUrls().categorymodel,h.getModelUrls().categorymodelbase],f[e])
}},_buildModelShell:function(f,c,e,h,j,d){var b=document.createElement("div"),g=new h(c,1,1,d),a;
b.id=c;
b.className=e;
b.setAttribute("style","position:absolute; top:0px; left:0px; width:1px; height:1px;");
document.body.insertBefore(b,document.body.childNodes[0]);
if($pdk.isArray(j)&&j.length>0){a=j[0];
if(typeof(a)==="string"&&a.length>0){g.feedsServiceUrl=a
}a=j[1];
if(typeof(a)==="string"&&a.length>0){g.feedsServiceUrlBase=a
}}g.attach();
return g
},getNamesFromDomElements:function(h){var q,r,v,k,c,u=h.length,t,p,w,g,x,d,e,l,o,j=[],f={},s={},m={},y,b;
for(t=0;
t<u;
t++){f={};
s={};
m={};
c=h[t];
e=c.attributes;
attributes_l=e.length;
for(w=0;
w<attributes_l;
w++){g=e[w];
d=g.nodeValue;
switch(g.name){case"class":q=d;
break;
case"id":o=d;
break;
default:if(g.name.match(/^tp:/)){x=g.name.replace(/^tp:/,"").toLowerCase();
b=x.match(/^fa\./)!==null?"fa":"var";
b=x.match(/^fp\./)!==null?"fp":b;
switch(b){case"fa":s[x.replace(/^fa\./,"")]=d;
break;
case"fp":m[x.replace(/^fp\./,"")]=d;
break;
case"var":f[x]=d;
break;
default:break
}}break
}}v=typeof(q)==="string"?q.split(" "):[];
k=v.length;
for(p=0;
p<k;
p++){r=v[p];
if(r.match(/^tp/)){j.push({markupClass:r,markupId:o,tpVars:$pdk.apply({},f),tpFp:$pdk.apply({},m),tpFa:$pdk.apply({},s)})
}}}return j
},CLASS_TABLE:{}});
$pdk.ns("$pdk.shell.Registry");
$pdk.shell.Registry._class=$pdk.extend(function(){},{constructor:function(){$pdk.shell.Registry._class.superclass.constructor.call(this);
this._collection=new $pdk.shell.Collection();
this._swfloader=null
},getShells:function(){return this._collection
},bind:function(a){this._swfloader=a
},add:function(a){this._collection.put(a.getId(),a)
},remove:function(a){this._collection.remove(a.getId())
},hasPlayer:function(){var a=this._collection.toArray();
var b=0;
len=a.length;
for(;
b<len;
b++){if(a[b].getName()==="Player"){return true
}}return false
},connectShellsToGwt:function(){var c,b,e=this._collection.toArray().sort(function(g,f){return g.getPriority()>f.getPriority()
}),d=e.length,a;
for(c=0;
c<d;
c++){b=e[c];
if(b.getRuntime()==="flash"){this._swfloader.add(b)
}else{b.resyncAttach()
}}this._swfloader.initializeShells()
},satisfyShellDeps:function(){var w,j,u,m=null,s,E,b,c,d,q,r,f,t,h,a,B,A=false,v,l=this._collection.toArray(),D={},C=l.length,o,k;
for(u=0;
u<C;
u++){v=l[u];
E=v.getName();
if($pdk.isEmpty(D[E])){D[E]=[]
}D[E].push(v)
}try{j=D.ReleaseModel.length;
if(j>0){w=D.Player.length;
for(u=0;
u<w;
u++){D.Player[u].releaseUrlFormatResolution=true
}}var p=D.ReleaseModel;
for(u=0;
u<p.length;
u++){if(p[u].params&&p[u]._paramsOriginal.indexOf("byContent")>=0&&p[u].params.indexOf("byContent")==-1){p[u].params+="&"+p[u]._paramsOriginal
}}}catch(g){}try{B=D.ReleaseList.length;
r=D.Navigation.length;
for(u=0;
u<r;
u++){b=D.Navigation[u];
m=b.itemsPerPage;
m=$pdk.isEmpty(m)?null:m;
m=m===null?b.itemsperpage:m;
m=$pdk.isEmpty(m)?null:m;
if(m===null){delete b.itemsPerPage;
d=typeof(b.scopes)==="string"?b.scopes.split(","):[];
q=d.length;
for(s=0;
s<B&&m===null;
s++){f=D.ReleaseList[s];
h=typeof(f.scopes)==="string"?f.scopes.split(","):[];
a=h.length;
if(q<1&&a<1){A=true
}else{A=false;
for(k=0;
k<q&&A===false;
k++){c=d[k];
for(o=0;
o<a&&A===false;
o++){t=h[o];
A=c===t
}}}if(A){m=f.itemsPerPage;
m=$pdk.isEmpty(m)?null:m;
m=m===null?f.itemsperpage:m;
m=$pdk.isEmpty(m)?null:m
}}if(m!==null){b.itemsperpage=m
}}}}catch(y){}}});
$pdk.shell.Registry._singleton=null;
$pdk.shell.Registry.getInstance=function(){if($pdk.shell.Registry._singleton===null){$pdk.shell.Registry._singleton=new $pdk.shell.Registry._class()
}return $pdk.shell.Registry._singleton
};
$pdk.shell.SwfSerializedLoader=$pdk.extend(function(){},{constructor:function(){this._shells_unattached=[];
this._shells_unattached_batched={};
this._batch_index=[];
this._expected_responses=0;
this._timeouts=[]
},add:function(a){if(!$pdk.isEmpty(a)&&a.getRuntime()==="flash"){this._shells_unattached.push(a)
}},initializeShells:function(){while(this._shells_unattached.length>0){this._batch(this._shells_unattached.shift())
}this._processNextBatch()
},onSwfReady:function(){this._expected_responses--;
if(this._expected_responses<1){this._processNextBatch()
}},_processNextBatch:function(){var d=this._batch_index.shift(),c=this._shells_unattached_batched[d],a=0,b=this;
while(this._timeouts.length){window.clearTimeout(this._timeouts.shift())
}if(!$pdk.isEmpty(c)){while(c.length){shell=c.shift();
shell.resyncAttach();
a++
}}this._expected_responses=a;
if(this._expected_responses>0){this._timeouts.push(window.setTimeout(function(){b._onTimeout(d)
},5000))
}},_onTimeout:function(a){this._expected_responses=0;
this._processNextBatch()
},_batch:function(a){var b=String(Math.floor(a.getPriority()));
if($pdk.isEmpty(this._shells_unattached_batched[b])){this._shells_unattached_batched[b]=[];
this._batch_index.push(b)
}this._shells_unattached_batched[b].push(a)
}});
$pdk.bootloaderVersion=new $pdk.PdkVersion("5","5","1","351745","2014-06-30 6:24 PM");
function tpExternalControllerClass(){this.playerTypes=new Object();
this.extPlayers=new Object();
this.registerExternalPlayer=function(type,playerClass){this.playerTypes[type]=playerClass
};
this.routeMessage=function(swfId,controllerId,streamType,funcName,args){var curController=this.extPlayers[controllerId];
if(!curController){curController=this.extPlayers[controllerId]={}
}var curPlayer=curController[streamType];
if(!curPlayer){var playerClass=this.playerTypes[streamType];
if(!playerClass){return
}curPlayer=eval("new "+playerClass+"('"+swfId+"', '"+controllerId+"');");
if(!curPlayer){return
}curController[streamType]=curPlayer
}curPlayer[funcName](args)
};
this.returnMessage=function(swfId,controllerId,funcName,args){var obj=tpThisMovie(swfId);
obj.receiveJSMessage(controllerId,funcName,args)
};
this.cleanup=function(){for(var controllerId in this.extPlayers){var players=this.extPlayers[controllerId];
for(var player in players){players[player].cleanup();
delete players[player]
}delete this.extPlayers[controllerId]
}}
}function tpExternalMessage(b,d,c,e,a){window.tpExternalController.routeMessage(b,d,c,e,a)
}window.tpExternalController=new tpExternalControllerClass();
function tpShowAlert(a){switch(a){case"FULLSCREEN_DISABLED":alert("Full screen is only available with Flash 9 or later");
break
}}tpScriptLoader=new ScriptLoader();
function tpLoadJScript(a,d,c,b){tpScriptLoader.addScript(a,d,c,b)
}function callbackDispatcher(a){tpScriptLoader.callbackDispatcher(a)
}function invokeCallbacks(a){tpScriptLoader.invokeCallbacks()
}function LoadObj(a,d,c,b){this.script=a;
this.callback=d;
this.id=c;
this.atts=b
}function ScriptLoader(){this.scriptQueue=new Array();
this.callbackQueue=new Array()
}ScriptLoader.prototype.addScript=function(a,e,d,c){var b=new LoadObj(a,e,d,c);
this.scriptQueue.push(b);
if(this.scriptQueue.length==1){this.checkScriptQueue()
}};
ScriptLoader.prototype.checkScriptQueue=function(){if(this.scriptQueue.length){var a=this.scriptQueue.shift();
this.loadScript(a)
}else{interval_id=setInterval("invokeCallbacks()",100)
}};
ScriptLoader.prototype.callbackDispatcher=function(b){for(var a in this.callbackQueue){if(this.callbackQueue[a]==b){this.checkScriptQueue();
return
}}this.callbackQueue.push(b);
this.checkScriptQueue()
};
ScriptLoader.prototype.invokeCallbacks=function(){clearInterval(interval_id);
while(this.callbackQueue.length){var loadObj=this.callbackQueue.shift();
eval(loadObj.callback)(loadObj.script)
}};
ScriptLoader.prototype.loadScript=function(h){var e=h.script;
var b=h.callback;
var g=h.id;
var f=h.atts;
var d=window.document.createElement("script");
d.charset="utf-8";
if(g){d.id=g
}d.type="text/javascript";
if(f){for(var c=0;
c<f.length;
c++){d.setAttribute(f[c].att,f[c].value)
}}d.src=e;
if(b){var a=function(k,j){j(k);
this.onreadystatechange=null;
this.onload=null;
this.onerror=null
};
d.onreadystatechange=function(){a(h,callbackDispatcher)
};
d.onload=function(){a(h,callbackDispatcher)
};
d.onerror=function(){a(h,callbackDispatcher)
}
}window.document.getElementsByTagName("head")[0].appendChild(d)
};
function tpLoadScript(f,c,h,g){var e=window.document.createElement("script");
e.charset="utf-8";
if(h){e.id=h
}e.type="text/javascript";
if(g){for(var d=0;
d<g.length;
d++){e.setAttribute(g[d].att,g[d].value)
}}e.src=f;
var b=false;
if(c){var a=function(j,k){j(k);
this.onreadystatechange=null;
this.onload=null;
this.onerror=null
};
e.onreadystatechange=function(){if((this.readyState==="loaded"||this.readyState==="complete"||this.readyState===4)&&!b){a(c,f);
b=true
}};
e.onload=function(){if(!b){b=true;
a(c,f)
}};
e.onerror=function(){if(!b){a(c,f)
}}
}window.document.getElementsByTagName("head")[0].appendChild(e)
}function tpGetScriptPath(){return $pdk.env.Detect.getInstance().baseDir()
}function tpSetCssClass(a,b){try{var f=document.getElementById(a),c=f.className;
c=typeof(c)==="string"?c:"";
if(c.match(new RegExp(b))===null){f.className=b+(c.length?" "+c:"")
}}catch(d){}}function tpUnsetCssClass(a,c){try{var g=document.getElementById(a),d=g.className,b=new RegExp(c+" ");
d=typeof(d)==="string"?d:"";
g.className=d.replace(b,"","g")
}catch(f){}}function tpResize(b,a,c){}function tpGetTop(a){result=0;
while(a){result+=a.offsetTop;
a=a.offsetParent
}return result
}function tpGetLeft(a){result=0;
while(a){result+=a.offsetLeft;
a=a.offsetParent
}return result
}tpThisJsObject=function(a){return window[a]
};
var tpRegisteredGWTWidgets={};
tpThisMovie=function(b){if(b=="communicationwidget"||window.tpRegisteredGWTWidgets&&tpRegisteredGWTWidgets[b]!=undefined){var c=tpThisJsObject("tpGwtCommManager");
if(c){return c
}}var a;
if(window.frame&&(window.frame.hasOwnProperty("contentWindow")||window.frame.hasOwnProperty("contentDocument"))){a=frame.contentWindow.document||frame.contentDocument.document
}else{a=document
}return a.getElementById(b)
};
function tpDebug(c,b,a,d){if(!b){b="javascript"
}if(!a){a="utils"
}if(!d){d=tpConsts.INFO
}else{if(typeof d=="string"){d=tpGetLevelNumber(d)
}}if(d<tpGetLevelNumber(tpGetLogLevel())){return
}if(tpController!==undefined){tpController.dispatchEvent("OnPdkTrace",{message:c,timestamp:(new Date().valueOf()),controllerId:b,className:a,level:d})
}else{tpTrace(c,(new Date()).valueOf(),b,a,d)
}}function tpOpenNewWindow(d,b,a){var c=window.open(d,b,a)
}var tpTrackingImage=new Image();
function tpCallTrackingUrl(a){a=unescape(a);
tpTrackingImage.src=a;
for(i=0;
((!tpTrackingImage.complete)&&(i<100000));
i++){}}var tpConsts={};
tpConsts.NONE=2000;
tpConsts.FATAL=1000;
tpConsts.ERROR=8;
tpConsts.WARN=6;
tpConsts.INFO=4;
tpConsts.DEBUG=2;
tpConsts.TEST=1;
function tpGetLevel(a){switch(a){case tpConsts.DEBUG:return"DEBUG";
case tpConsts.INFO:return"INFO";
case tpConsts.WARN:return"WARN";
case tpConsts.ERROR:return"ERROR";
case tpConsts.FATAL:return"FATAL";
case tpConsts.TEST:return"TEST";
case tpConsts.NONE:return"NONE"
}return"UNKNOWN"
}function tpGetLevelNumber(a){switch(a.toUpperCase()){case"DEBUG":return tpConsts.DEBUG;
case"INFO":return tpConsts.INFO;
case"WARN":return tpConsts.WARN;
case"ERROR":return tpConsts.ERROR;
case"FATAL":return tpConsts.FATAL;
case"TEST":return tpConsts.TEST;
case"NONE":return tpConsts.NONE
}return 4
}function tpTrace(c,e,d,g,a){if(typeof(window.console)!=="object"){return
}var f=new Date(Number(e));
var b=f.getMilliseconds();
if(b.toString().length==2){b="0"+b
}else{if(b.toString().length==1){b="00"+b
}}var h=f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+"."+b;
var j=h+" \t"+tpGetLevel(Number(a))+" \t"+d+" \t";
if(g&&g.length){j+=g+" :: "
}j+=c;
switch(Number(a)){case tpConsts.DEBUG:console.log(j);
break;
case tpConsts.INFO:console.info(j);
break;
case tpConsts.WARN:console.warn(j);
break;
case tpConsts.ERROR:case tpConsts.FATAL:console.error(j);
break
}}function tpGetUseJS(){return"true"
}function tpGetCommManagerID(){return tpCommID
}if(!self.tpLogLevel){tpLogLevel="warn"
}function tpSetLogLevel(a){tpLogLevel=a
}function tpGetLogLevel(){return tpLogLevel
}function tpGetProperties(){var a=new Object();
a.commManagerId=tpGetCommManagerID();
a.useJS=tpGetUseJS();
a.registeredComponents=tpGetRegisteredIDs();
a.logLevel=tpGetLogLevel();
return a
}var tpRegisteredIDArr;
function tpRegisterID(b){if(!tpRegisteredIDArr){tpRegisteredIDArr=[]
}for(var a=0;
a<tpRegisteredIDArr.length;
a++){if(tpRegisteredIDArr[a]==b){return
}}tpRegisteredIDArr.push(b)
}function tpGetRegisteredIDs(){return tpRegisteredIDArr
}var tpController;
var tpCommID;
var tpBridgeID;
var tpExternalController;
var tpGwtCommManager;
var useWorkerIfPossible=false;
var gwtWorker;
function tpDoInitGwtCommManager(){try{if(tpCommID=="communicationwidget"&&window.tpGwtCommManager===undefined){tpGwtCommManager=new com.theplatform.pdk.CommManager()
}else{if((window.tryWorker===undefined||!tryWorker)&&window.tpGwtCommManager===undefined){tpGwtCommManager=new com.theplatform.pdk.CommManager(tpCommID)
}}}catch(a){if(window.console!=undefined){console.error("GwtCommManager module failed to load 1!")
}else{}}}function tpInitGwtCommManager(b,a){try{if(useWorkerIfPossible&&Worker!=undefined){gwtWorker=new Worker("js/commManagerWorker.js");
tpGwtCommManager=new Object();
tpGwtCommManager.executeMessage=function(d){gwtWorker.postMessage(d)
};
gwtWorker.onmessage=function(d){console.log(d.data);
if(d.data.destination){tpReceiveMessage(d.data.destination,d.data.message)
}};
gwtWorker.onerror=function(d){if(self.console){console.error(d.message)
}}
}else{tpGwtCommManager=new com.theplatform.pdk.CommManager(tpCommID)
}}catch(c){if(a==true){if(console!=undefined){console.error("GwtCommManager module failed to load! 2")
}else{}}}}function tpSetCommManagerID(c,e,d,a,b){if(b){useWorkerIfPossible=true
}if(c&&e){tpInitGwtCommManager(c)
}tpCommID=c;
tpBridgeID=c?c:"unknown";
if(window.tpTraceListener===undefined){window.tpTraceListener=function(g){var f=g.data;
if(f){tpTrace(f.message,f.timestamp,f.controllerId,f.className,f.level)
}};
tpController.addEventListener("OnPdkTrace",window.tpTraceListener)
}}function tpReceiveMessage(a,b){tpController.receiveMessage(a,b)
}function tpGetPreferredFormats(){if($pdk!==undefined){return $pdk.env.Detect.getInstance().getPreferredFormats()
}else{return[]
}}function tpGetPlayerFormats(){if($pdk!==undefined){var a=$pdk.env.Detect.getInstance().getPlayerFormats(),b="";
if($pdk.isArray(a)){b=a.join("|")
}return b
}else{return[]
}}var tpHolderName="pdkHolder";
var tpExternalJS;
function tpSetPlayerIDForExternal(a){}function tpSetHolderIDForExternal(a){tpHolderName=a
}function tpSetPdkBaseDirectory(a){}function tpLoadExternalMediaJS(){tpExternalJS=tpLoadExternalMediaJS.arguments;
for(var a=0;
a<tpExternalJS.length;
a++){tpLoadScript(tpExternalJS[a])
}}function tpCleanupExternal(){if(tpExternalJS){var a=window.document.getElementsByTagName("head")[0].getElementsByTagName("script");
for(var c=0;
c<a.length;
c++){for(var b=0;
b<tpExternalJS.length;
b++){if(a[c].src==tpExternalJS[b]){window.document.getElementsByTagName("head")[0].removeChild(a[c]);
break
}}}tpExternalJS.length=0
}if(tpExternalController){tpExternalController.cleanup()
}}$pdk.ns("$pdk.interfaces");
$pdk.interfaces.expose=function(b,a){b.Player=$pdk.extend($pdk.shell.Base,{_name:"Player",_markupClass:"tpPlayer",_runtime:"default",_jsViewImpl:"@Bundle:tpPlayerView.js",_markupClass:"tpPlayer",_priority:10,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsPlayerImpl(),_asSwf:"flvPlayer.swf"});
b.Navigation=$pdk.extend($pdk.shell.Base,{_name:"Navigation",_markupClass:"tpNavigation",_runtime:"default",_jsViewImpl:"@Bundle:tpNavigationView.js",_markupClass:"tpNavigation",_priority:2147483647,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsNavigationImpl(),_asSwf:"nav.swf"});
b.ClipInfo=$pdk.extend($pdk.shell.Base,{_name:"ClipInfo",_markupClass:"tpClipInfo",_runtime:"default",_jsViewImpl:"@Bundle:tpClipInfoView.js",_markupClass:"tpClipInfo",_priority:40,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsClipInfoImpl(),_asSwf:"info.swf"});
b.CategoryList=$pdk.extend($pdk.shell.Base,{_name:"CategoryList",_markupClass:"tpCategoryList",_runtime:"default",_jsViewImpl:"",_markupClass:"tpCategoryList",_priority:50.1,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsCategoryListImpl(),_asSwf:"categoryList.swf"});
b.ReleaseModel=$pdk.extend($pdk.shell.Base,{_name:"ReleaseModel",_markupClass:"tpReleaseModel",_runtime:"default",_jsViewImpl:"@Bundle:tpReleaseModel.js",_markupClass:"tpReleaseModel",_priority:5,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsReleaseModelImpl(),_asSwf:"releaseModel.swf"});
b.CategoryModel=$pdk.extend($pdk.shell.Base,{_name:"CategoryModel",_markupClass:"tpCategoryModel",_runtime:"default",_jsViewImpl:"",_markupClass:"tpCategoryModel",_priority:50.2,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsCategoryModelImpl(),_asSwf:"categoryModel.swf"});
b.Search=$pdk.extend($pdk.shell.Base,{_name:"Search",_markupClass:"tpSearch",_runtime:"default",_jsViewImpl:"@Bundle:tpSearchView.js",_markupClass:"tpSearch",_priority:2147483647,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsSearchImpl(),_asSwf:"search.swf"});
b.Header=$pdk.extend($pdk.shell.Base,{_name:"Header",_markupClass:"tpHeader",_runtime:"default",_jsViewImpl:"",_markupClass:"tpHeader",_priority:2147483647,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsHeaderImpl(),_asSwf:"header.swf"});
b.ReleaseList=$pdk.extend($pdk.shell.Base,{_name:"ReleaseList",_markupClass:"tpReleaseList",_runtime:"default",_jsViewImpl:"@Bundle:tpReleaseListView.js",_markupClass:"tpReleaseList",_priority:30,_env:$pdk.env.Detect.getInstance(),_registry:$pdk.shell.Registry.getInstance(),_config_decorator:new $pdk.shell.DefaultsReleaseListImpl(),_asSwf:"releaseList.swf"});
$pdk.shell.Factory.CLASS_TABLE={tpPlayer:b.Player,tpNavigation:b.Navigation,tpClipInfo:b.ClipInfo,tpCategoryList:b.CategoryList,tpReleaseModel:b.ReleaseModel,tpCategoryModel:b.CategoryModel,tpSearch:b.Search,tpHeader:b.Header,tpReleaseList:b.ReleaseList};
a.getValidRegions=function(c){this._regFunc("getValidRegions",[],[],c)
};
a.getDefaultBanners=function(c){this._regFunc("getDefaultBanners",[],[],c)
};
a.setClipInfo=function(d,e,c){this._regFunc("setClipInfo",["com.theplatform.pdk.smil.api.shared.data.Clip","boolean"],[d,e],c)
};
a.search=function(d,c){d=typeof(d)==="undefined"?"":d;
this._regFunc("search",["java.lang.String"],[d],c)
};
a.addPlayerCard=function(g,k,d,j,e,c,f,h){this._regFunc("addPlayerCard",["java.lang.String","java.lang.String","java.lang.String","java.lang.String","java.lang.String","java.lang.String","int"],[g,k,d,j,e,c,f],h)
};
a.showPlayerCard=function(d,g,f,c,e){this._regFunc("showPlayerCard",["java.lang.String","java.lang.String","java.lang.String","java.lang.String"],[d,g,f,c],e)
};
a.hidePlayerCard=function(c,e,d){this._regFunc("hidePlayerCard",["java.lang.String","java.lang.String"],[c,e],d)
};
a.nextRange=function(d,c){d=typeof(d)==="undefined"?true:d;
this._regFunc("nextRange",["boolean"],[d],c)
};
a.firstRange=function(d,c){d=typeof(d)==="undefined"?true:d;
this._regFunc("firstRange",["boolean"],[d],c)
};
a.getCurrentRange=function(c){this._regFunc("getCurrentRange",[],[],c)
};
a.previousRange=function(d,c){d=typeof(d)==="undefined"?true:d;
this._regFunc("previousRange",["boolean"],[d],c)
};
a.loadReleaseURL=function(c,d,e){this._regFunc("loadReleaseURL",["java.lang.String","java.lang.Boolean"],[c,d],e)
};
a.getUseDefaultPlayOverlay=function(c){this._regFunc("getUseDefaultPlayOverlay",[],[],c)
};
a.loadRelease=function(c,d,e){this._regFunc("loadRelease",["com.theplatform.pdk.data.Release","java.lang.Boolean"],[c,d],e)
};
a.getSubtitleStyle=function(c){this._regFunc("getSubtitleStyle",[],[],c)
};
a.getCurrentRange=function(c){this._regFunc("getCurrentRange",[],[],c)
};
a.mute=function(d,c){this._regFunc("mute",["java.lang.Boolean"],[d],c)
};
a.setProperty=function(f,d,g,c,e){this._regFunc("setProperty",["java.lang.String","java.lang.String","java.lang.String","java.lang.String"],[f,d,g,c],e)
};
a.setToken=function(c,e,d){this._regFunc("setToken",["java.lang.String","java.lang.String"],[c,e],d)
};
a.getAnnotations=function(c){this._regFunc("getAnnotations",[],[],c)
};
a.getSubtitleLanguage=function(c,d){this._regFunc("getSubtitleLanguage",["java.lang.String"],[c],d)
};
a.setExpandVideo=function(d,c){this._regFunc("setExpandVideo",["java.lang.String"],[d],c)
};
a.disablePlayerControls=function(c,d,e){this._regFunc("disablePlayerControls",["java.lang.Boolean","java.lang.String[]"],[c,d],e)
};
a.setSmil=function(c,d){this._regFunc("setSmil",["java.lang.String"],[c],d)
};
a.previousClip=function(c){this._regFunc("previousClip",[],[],c)
};
a.setSubtitleLanguage=function(d,c){this._regFunc("setSubtitleLanguage",["java.lang.String"],[d],c)
};
a.showEmailForm=function(d,c){this._regFunc("showEmailForm",["java.lang.Boolean"],[d],c)
};
a.getPlayerVariables=function(d,c){this._regFunc("getPlayerVariables",["java.lang.String[]"],[d],c)
};
a.setBandwidthPreferences=function(d,c){this._regFunc("setBandwidthPreferences",["com.theplatform.pdk.smil.api.shared.data.BandwidthPreferences"],[d],c)
};
a.setVideoScalingMethod=function(d,c){this._regFunc("setVideoScalingMethod",["java.lang.String"],[d],c)
};
a.setCurrentReleaseList=function(d,c){this._regFunc("setCurrentReleaseList",["java.lang.String"],[d],c)
};
a.setShowSubtitles=function(c,d){this._regFunc("setShowSubtitles",["java.lang.Boolean"],[c],d)
};
a.clearCurrentRelease=function(c){this._regFunc("clearCurrentRelease",[],[],c)
};
a.trace=function(e,d,f,c){this._regFunc("trace",["java.lang.String","java.lang.String","java.lang.Number"],[e,d,f],c)
};
a.nextClip=function(c){this._regFunc("nextClip",[],[],c)
};
a.addAnnotation=function(c,d){this._regFunc("addAnnotation",["com.theplatform.pdk.data.Annotation"],[c],d)
};
a.setSubtitleStyle=function(d,c){this._regFunc("setSubtitleStyle",["com.theplatform.pdk.data.SubtitleStyle"],[d],c)
};
a.playPrevious=function(d,c){this._regFunc("playPrevious",["java.lang.Boolean"],[d],c)
};
a.refreshReleaseModel=function(c,l,e,f,d,j,k,g,h){this._regFunc("refreshReleaseModel",["java.lang.String","java.lang.String","com.theplatform.pdk.data.Sort","com.theplatform.pdk.data.Range","java.lang.String[]","java.lang.String[]","java.lang.String[]","java.lang.String"],[c,l,e,f,d,j,g,h],k)
};
a.setReleaseURL=function(d,c,e){this._regFunc("setReleaseURL",["java.lang.String","java.lang.Boolean"],[d,c],e)
};
a.clearAnnotations=function(c){this._regFunc("clearAnnotations",[],[],c)
};
a.suspendPlayAll=function(d,c){this._regFunc("suspendPlayAll",["java.lang.Boolean"],[d],c)
};
a.pause=function(c,d,e){this._regFunc("pause",["java.lang.Boolean","java.lang.Boolean"],[c,e],d)
};
a.setRelease=function(c,d,e){this._regFunc("setRelease",["com.theplatform.pdk.data.Release","java.lang.Boolean"],[c,d],e)
};
a.removeAnnotation=function(c,d){this._regFunc("removeAnnotation",["com.theplatform.pdk.data.Annotation"],[c],d)
};
a.cancelMedia=function(c,d){this._regFunc("cancelMedia",["java.lang.Object"],[c],d)
};
a.clickPlayButton=function(c){this._regFunc("clickPlayButton",[],[],c)
};
a.getNextRelease=function(e,c,d){this._regFunc("getNextRelease",["java.lang.Boolean","java.lang.Boolean"],[e,c],d)
};
a.clearCategorySelection=function(c){this._regFunc("clearCategorySelection",[],[],c)
};
a.endCurrentRelease=function(c){this._regFunc("endCurrentRelease",[],[],c)
};
a.showFullScreen=function(c,d){this._regFunc("showFullScreen",["java.lang.Boolean"],[c],d)
};
a.useDefaultLinkForm=function(c,d){this._regFunc("useDefaultLinkForm",["java.lang.Boolean"],[c],d)
};
a.getBandwidthPreferences=function(c){this._regFunc("getBandwidthPreferences",[],[],c)
};
a.clearPlayerMessage=function(c){this._regFunc("clearPlayerMessage",[],[],c)
};
a.setPreviewImageUrl=function(c,d){this._regFunc("setPreviewImageUrl",["java.lang.String"],[c],d)
};
a.setClipInfo=function(d,e,c){this._regFunc("setClipInfo",["com.theplatform.pdk.smil.api.shared.data.Clip","java.lang.Boolean"],[d,e],c)
};
a.clearAdCookie=function(c){this._regFunc("clearAdCookie",[],[],c)
};
a.previewRefreshReleaseModel=function(c,l,e,f,d,j,k,g,h){this._regFunc("previewRefreshReleaseModel",["java.lang.String","java.lang.String","com.theplatform.pdk.data.Sort","com.theplatform.pdk.data.Range","java.lang.String[]","java.lang.String[]","java.lang.String[]","java.lang.String"],[c,l,e,f,d,j,g,h],k)
};
a.loadSmil=function(d,c,e){this._regFunc("loadSmil",["java.lang.String","java.lang.Boolean"],[d,c],e)
};
a.hidePlayerRegions=function(d,c,e){this._regFunc("hidePlayerRegions",["java.lang.Boolean","java.lang.String[]"],[d,c],e)
};
a.seekToPercentage=function(d,c){this._regFunc("seekToPercentage",["java.lang.Number"],[d],c)
};
a.setVariable=function(f,d,g,c,e){this._regFunc("setVariable",["java.lang.String","java.lang.String","java.lang.String","java.lang.String"],[f,d,g,c],e)
};
a.setPlayerMessage=function(e,c,d){this._regFunc("setPlayerMessage",["java.lang.String","java.lang.Number"],[e,c],d)
};
a.showLinkForm=function(d,c){this._regFunc("showLinkForm",["java.lang.Boolean"],[d],c)
};
a.getNextClip=function(c){this._regFunc("getNextClip",[],[],c)
};
a.resetPlayer=function(c){this._regFunc("resetPlayer",[],[],c)
};
a.refreshCategoryModel=function(d,c,e){this._regFunc("refreshCategoryModel",["java.lang.String","java.lang.String"],[d,e],c)
};
a.seekToPosition=function(c,d){this._regFunc("seekToPosition",["java.lang.Number"],[c],d)
};
a.previewNextRefreshReleaseModel=function(c){this._regFunc("previewNextRefreshReleaseModel",[],[],c)
};
a.useDefaultEmailForm=function(c,d){this._regFunc("useDefaultEmailForm",["java.lang.Boolean"],[c],d)
};
a.playNext=function(e,c,d){this._regFunc("playNext",["java.lang.Boolean","java.lang.Boolean"],[e,c],d)
};
a.setVolume=function(d,c){this._regFunc("setVolume",["java.lang.Number"],[d],c)
};
a.useDefaultPlayOverlay=function(c,d){this._regFunc("useDefaultPlayOverlay",["java.lang.Boolean"],[c],d)
}
};
(function(h,e){var d,c,b,g,j,a,f,k;
if(typeof(window.__tp_pdk_set_versions)==="function"){window.__tp_pdk_set_versions();
if(typeof(window.console)==="object"){console.log("thePlatform PDK");
console.log($pdk.version.toString())
}}e=typeof(e)==="boolean"?e:false;
if(!e){g=$pdk.env.Detect.getInstance();
j=new $pdk.env.HttpHead.Processor(g);
j.process(document);
if(typeof(g.baseDir())!=="string"||g.baseDir().length<1){if(typeof(window.console)==="object"&&console.error){console.error("No PDK base URL could be detected. Asynchronous load of PDK requies a tp:baseUrl meta tag.")
}}if($pdk.isIE){document.createElement("video")
}c=g.getConfigSet("enableexternalcontroller");
c=$pdk.isEmpty(c)?[]:c.toArray();
c=c.length<1?"false":c[0];
c=c.toLowerCase()==="true";
window.tpCommID="communicationwidget";
window.tpBridgeID=typeof(window.tpCommID)==="string"?window.tpCommID:"unknown";
b=$pdk.Entrypoint.getInstance();
a=$pdk.shell.Registry.getInstance();
f=new $pdk.shell.SwfSerializedLoader();
a.bind(f);
h.tpController=new $pdk.queue.Controller(g);
$pdk.interfaces.expose(h,h.tpController);
if(g.getAutoInitialize()){b.injectLoadingStyle($pdk.isDomReady())
}if(window.tpTraceListener===undefined){window.tpTraceListener=function(m){var l=m.data;
if(l){tpTrace(l.message,l.timestamp,l.controllerId,l.className,l.level)
}};
tpController.addEventListener("OnPdkTrace",window.tpTraceListener)
}h.tpController.onControllerComplete=function(){f.onSwfReady()
};
b.configure(a,g);
$pdk.controller=h.tpController;
$pdk.initialize=function(){b.initialize()
};
$pdk.getConfiguration=function(l){return a.getShells().get(l)
};
$pdk.gwtBootloader(g);
if(c){new $pdk.queue.IFrameListener()
}}}(window,window._PDK_SUPRESS_AUTOINIT));