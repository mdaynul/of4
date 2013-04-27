(function(){(function(){var t,n,e;return n=function(t,n){return 1e-6>Math.abs(t-n)},t=function(){var t,e;return t=function(t){var o,r,i,a,s,l,c;return s=null,l=[],a=[],c=[],r=angular.extend({},e,t),i=this,o=null,this.center=t.center,this.zoom=r.zoom,this.draggable=r.draggable,this.dragging=!1,this.selector=r.container,this.markers=[],this.options=r.options,this.draw=function(){var t;if(null!=i.center)if(null==s){if(s=new google.maps.Map(i.selector,angular.extend(i.options,{center:i.center,zoom:i.zoom,draggable:i.draggable,mapTypeId:google.maps.MapTypeId.ROADMAP})),google.maps.event.addListener(s,"dragstart",function(){return i.dragging=!0}),google.maps.event.addListener(s,"idle",function(){return i.dragging=!1}),google.maps.event.addListener(s,"drag",function(){return i.dragging=!0}),google.maps.event.addListener(s,"zoom_changed",function(){return i.zoom=s.getZoom(),i.center=s.getCenter()}),google.maps.event.addListener(s,"center_changed",function(){return i.center=s.getCenter()}),a.length)return angular.forEach(a,function(t){return google.maps.event.addListener(s,t.on,t.handler)})}else if(google.maps.event.trigger(s,"resize"),t=s.getCenter(),n(t.lat(),i.center.lat())&&n(t.lng(),i.center.lng())||s.setCenter(i.center),s.getZoom()!==i.zoom)return s.setZoom(i.zoom)},this.fit=function(){var t;return s&&l.length?(t=new google.maps.LatLngBounds,angular.forEach(l,function(n){return t.extend(n.getPosition())}),s.fitBounds(t)):void 0},this.on=function(t,n){return a.push({on:t,handler:n})},this.addMarker=function(t,n,e,r,a,c,g){var p,u;return null==i.findMarker(t,n)?(u=new google.maps.Marker({position:new google.maps.LatLng(t,n),map:s,icon:e}),null!=r&&(p=new google.maps.InfoWindow({content:r}),google.maps.event.addListener(u,"click",function(){return null!=o&&o.close(),p.open(s,u),o=p})),l.unshift(u),i.markers.unshift({lat:t,lng:n,draggable:!1,icon:e,infoWindowContent:r,label:a,url:c,thumbnail:g}),u):void 0},this.findMarker=function(t,e){var o,r;for(o=0;l.length>o;){if(r=l[o].getPosition(),n(r.lat(),t)&&n(r.lng(),e))return l[o];o++}return null},this.findMarkerIndex=function(t,e){var o,r;for(o=0;l.length>o;){if(r=l[o].getPosition(),n(r.lat(),t)&&n(r.lng(),e))return o;o++}return-1},this.addInfoWindow=function(t,n,e){var o;return o=new google.maps.InfoWindow({content:e,position:new google.maps.LatLng(t,n)}),c.push(o),o},this.hasMarker=function(t,n){return null!==i.findMarker(t,n)},this.getMarkerInstances=function(){return l},this.removeMarkers=function(t){var n;return n=this,angular.forEach(t,function(t){var e,o,r,i;return i=t.getPosition(),o=i.lat(),r=i.lng(),e=n.findMarkerIndex(o,r),l.splice(e,1),n.markers.splice(e,1),t.setMap(null)})}},e={zoom:8,draggable:!1,container:null},t()},e=angular.module("google-maps",[]),e.directive("googleMap",["$log","$timeout","$filter",function(e,o){var r;return r=function(t){var n;return n=t.map,self.addInfoWindow=function(t,e,o){return n.addInfoWindow(t,e,o)}},r.$inject=["$scope","$element"],{restrict:"EC",priority:100,transclude:!0,template:"<div class='angular-google-map' ng-transclude></div>",replace:!1,scope:{center:"=center",markers:"=markers",latitude:"=latitude",longitude:"=longitude",zoom:"=zoom",refresh:"&refresh",windows:"=windows"},controller:r,link:function(r,i,a){var s,l;return angular.isDefined(r.center)&&angular.isDefined(r.center.lat)&&angular.isDefined(r.center.lng)?angular.isDefined(r.zoom)?(angular.element(i).addClass("angular-google-map"),s={options:{}},a.options&&(s.options=angular.fromJson(a.options)),l=new t(angular.extend(s,{container:i[0],center:new google.maps.LatLng(r.center.lat,r.center.lng),draggable:"true"===a.draggable,zoom:r.zoom})),l.on("drag",function(){var t;return t=l.center,o(function(){return r.$apply(function(){return r.center.lat=t.lat(),r.center.lng=t.lng()})})}),l.on("zoom_changed",function(){return r.zoom!==l.zoom?o(function(){return r.$apply(function(){return r.zoom=l.zoom})}):void 0}),l.on("center_changed",function(){var t;return t=l.center,o(function(){return r.$apply(function(){return l.dragging?void 0:(r.center.lat=t.lat(),r.center.lng=t.lng())})})}),"true"===a.markClick&&function(){var t;return t=null,l.on("click",function(n){return null==t?(t={latitude:n.latLng.lat(),longitude:n.latLng.lng()},r.markers.push(t)):(t.latitude=n.latLng.lat(),t.longitude=n.latLng.lng()),o(function(){return r.latitude=t.latitude,r.longitude=t.longitude,r.$apply()})})}(),r.map=l,angular.isUndefined(r.refresh())?l.draw():r.$watch("refresh()",function(t,n){return t&&!n?l.draw():void 0}),r.$watch("markers",function(t){return o(function(){var e;return angular.forEach(t,function(t){return l.hasMarker(t.latitude,t.longitude)?void 0:l.addMarker(t.latitude,t.longitude,t.icon,t.infoWindow)}),e=[],angular.forEach(l.getMarkerInstances(),function(t){var o,i,a,s,l,c;for(s=t.getPosition(),i=s.lat(),a=s.lng(),o=!1,l=0;r.markers.length>l;)c=r.markers[l],n(c.latitude,i)&&n(c.longitude,a)&&(o=!0),l++;return o?void 0:e.push(t)}),e.length&&l.removeMarkers(e),"true"===a.fit&&t.length>1?l.fit():void 0})},!0),r.$watch("center",function(t,n){return t!==n?l.dragging?void 0:(l.center=new google.maps.LatLng(t.lat,t.lng),l.draw()):void 0},!0),r.$watch("zoom",function(t,n){return t!==n?(l.zoom=t,l.draw()):void 0})):(e.error("angular-google-maps: map zoom property not set"),void 0):(e.error("angular-google-maps: ould not find a valid center property"),void 0)}}}])})()}).call(this),function(){"use strict";angular.module("of4App",[]).config(["$routeProvider",function(t){return t.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/map",{templateUrl:"views/map.html",controller:"MapCtrl"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location",function(t,n){var e;return e=t,e.navBarHeight=40,e.mapShown=function(){return n.path().indexOf("/map")>-1}}])}.call(this),function(){"use strict";angular.module("of4App").controller("MainCtrl",["$scope",function(t){return t.awesomeThings=["HTML5 Boilerplate","AngularJS_after_again","Karma"]}])}.call(this),function(){"use strict";angular.module("of4App").controller("MapCtrl",["$scope",function(){}])}.call(this),function(){var t;t=function(t){return angular.extend(t,{centerProperty:{lat:45,lng:-73},zoomProperty:8,markersProperty:[{latitude:45,longitude:-74}],clickedLatitudeProperty:null,clickedLongitudeProperty:null})},function(){var t;return t=angular.module("of4App",["google-maps"])}()}.call(this),function(){"use strict";var t,n,e=function(t,n){return function(){return t.apply(n,arguments)}};n=function(){function t(t,n,o){this.map=t,this.lat=n,this.lng=o,this.move=e(this.move,this),this.click=e(this.click,this),this.show=e(this.show,this),this.dragend=e(this.dragend,this),this.position=new google.maps.LatLng(this.lat,this.lng),this.render()}return t.prototype.render=function(){return this.marker=new google.maps.Marker({draggable:!0}),google.maps.event.addListener(this.marker,"dragend",this.dragend),google.maps.event.addListener(this.marker,"click",this.click),this.show()},t.prototype.dragend=function(){confirm("Are you sure you want to move this marker?")},t.prototype.show=function(){return this.marker.setPosition(this.position),this.marker.setMap(this.map)},t.prototype.click=function(){var t;return t=new InfoWindow,$("a#place-item-move.btn").live("click",function(){return console.log("place-item-move")}),t.self.open(this.map,this.marker)},t.prototype.move=function(t){return console.log("move"),t.preventDefault(),alert("move")},t}(),t=function(){function t(t){this.onTypeChange=e(this.onTypeChange,this),this.onZoomChange=e(this.onZoomChange,this),this.onCenterChanged=e(this.onCenterChanged,this),this.resizeMapEl=e(this.resizeMapEl,this),this.onDragEnd=e(this.onDragEnd,this),this.onDragStart=e(this.onDragStart,this),this.onPositionButtonClick=e(this.onPositionButtonClick,this),this.addPlace=e(this.addPlace,this),this.getDirections=e(this.getDirections,this);var n,o,r,i,a;this.rootScope=t.rootScope,this.dragging=0,this.location=t.location,this.positionTracking=!1,a=this.location.search().q,a?(r=a.split(","),o=r[0],i=r[1],this.center={lat:o,lng:i}):this.center=t.center,this.zoom=parseInt(this.location.search().z)||t.zoom,this.mapType=this.location.search().t||t.mapType,this.navBarHeight=this.rootScope.navBarHeight,this.win=$(window),this.crossHairLatEl=$("#mapcrosshairlat"),this.crossHairLngEl=$("#mapcrosshairlng"),this.mapEl=$("#map"),this.mapTypes={m:"roadmap",h:"hybrid"},{mapTypeControl:!0,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.HORIZONTAL_BAR,position:google.maps.ControlPosition.TOP_RIGHT,mapTypeIds:[google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.HYBRID]},panControl:!1,panControlOptions:{position:google.maps.ControlPosition.TOP_RIGHT},streetViewControl:!1,streetViewControlOptions:{position:google.maps.ControlPosition.LEFT_TOP},zoomControl:!0,zoomControlOptions:{style:google.maps.ZoomControlStyle.LARGE,position:google.maps.ControlPosition.LEFT_TOP}},this.mapEl.hide(),this.resizeMapEl(),this.win.resize(this.resizeMapEl),$("#map-position-button").click(this.onPositionButtonClick),$("#map-add-button").click(this.addPlace),$("#map-directions-button").click(this.getDirections),this.map=new google.maps.Map(this.mapEl[0],{zoom:this.zoom,center:new google.maps.LatLng(this.center.lat,this.center.lng),mapTypeId:this.mapTypes[this.mapType]}),n=google.maps.event.addListener,n(this.map,"center_changed",this.onCenterChanged),n(this.map,"maptypeid_changed",this.onTypeChange),n(this.map,"zoom_changed",this.onZoomChange),n(this.map,"dragstart",this.onDragStart),n(this.map,"dragend",this.onDragEnd),this.rootScope.protocol=this.location.protocol(),this.rootScope.host=this.location.host(),this.rootScope.mapCenter=this.center,this.rootScope.mapZoom=this.zoom,this.rootScope.mapType=this.mapType,this.updateLocation()}var o,r;return t.prototype.getDirections=function(){return console.log("getDirections")},t.prototype.addPlace=function(){var t,e,o;return t=this.map.getCenter().lat(),e=this.map.getCenter().lng(),o=new n(this.map,t,e)},t.prototype.onPositionButtonClick=function(){return this.positionTracking.state?this.positionTracking.state?this.cancelPositionTracking():void 0:(this.positionTrackingOn(),this.positionTrackGoTo())},t.prototype.positionTrackingOn=function(){var t,n,e;if(this.nav||(this.nav=window.navigator),this.nav){t=this.nav.geolocation,window.map=this.map,t&&(e=t.watchPosition(o,r,n={enableHighAccuracy:!0}));try{t.getCurrentPosition(o,r,n={enableHighAccuracy:!0})}catch(i){}return this.positionTracking.state=!0}},t.prototype.positionTrackGoTo=function(){var t;return t=window.pos,t?this.map.setCenter(new google.maps.LatLng(t.lat(),t.lng())):void 0},t.prototype.cancelPositionTracking=function(t){window.navigator.geolocation.clearWatch(t);try{window.userPositionMarker.setMap(null)}catch(n){}return this.positionTracking.state=!1},o=function(t){var n,e;if(t.coords.latitude){window.pos=new google.maps.LatLng(t.coords.latitude,t.coords.longitude);try{window.userPositionMarker.setMap(null)}catch(o){}return n="img/blue-dot.png",e=new google.maps.MarkerImage(n,new google.maps.Size(16,16),new google.maps.Point(0,0),new google.maps.Point(8,3)),window.userPositionMarker=new google.maps.Marker({icon:e,position:window.pos,map:window.map,title:"You are here."})}},r=function(t){var n,e;switch(console.log("geoLoc error"),e="Unable to locate position. ",t.code){case t.TIMEOUT:e+="Timeout.";break;case t.POSITION_UNAVAILABLE:e+="Position unavailable.";break;case t.PERMISSION_DENIED:e+="Please turn on location services.";break;case t.UNKNOWN_ERROR:e+=t.code}return $(".alert-message").remove(),n=$('<div class="alert-message error fade in" data-alert="alert">'),n.html('<a class="close" href="#">×</a>'+e),n.insertBefore($(".span10"))},t.prototype.updateLocation=function(){return this.location.url("/maps?q="+this.center.lat+","+this.center.lng+"&t="+this.mapType+"&z="+this.zoom)},t.prototype.onDragStart=function(){return this.dragging=!0},t.prototype.onDragEnd=function(){return this.dragging=!1,this.onCenterChanged()},t.prototype.resizeMapEl=function(){return this.mapEl.css("height",this.win.height()-this.navBarHeight)},t.prototype.onCenterChanged=function(){var t;return t=this.map.getCenter(),this.center.lat=t.lat(),this.center.lng=t.lng(),this.crossHairLatEl.html(this.center.lat),this.crossHairLngEl.html(this.center.lng),this.dragging?void 0:(this.rootScope.mapCenter=this.center,this.rootScope.$apply(),this.updateLocation())},t.prototype.onZoomChange=function(){return this.rootScope.mapZoom=this.zoom=this.map.getZoom(),this.rootScope.$apply(),this.updateLocation()},t.prototype.onTypeChange=function(){switch(this.mapType=this.map.getMapTypeId(),this.map.getMapTypeId()){case google.maps.MapTypeId.ROADMAP:case google.maps.MapTypeId.HYBRID:this.polyOpts=!0;break;default:this.polyOpts=!0}return this.rootScope.mapType=this.mapType[0],this.rootScope.$apply(),this.updateLocation()},t}.call(this),angular.module("of4App").factory("GoogleMap",["$rootScope","$location",function(n,e){var o,r,i,a;return o={lat:9.993552791991132,lng:-84.20888416469096},r=o,i=16,a={rootScope:n,location:e,zoom:i,mapType:"m",center:{lat:r.lat,lng:r.lng}},new t(a)}])}.call(this);