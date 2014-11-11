/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var myScroll1;
var myScroll2;

var currentTime = new Date();
var currSelectedYear = currentTime.getFullYear();
var currSelectedMonth = currentTime.getMonth()+1;
var currentTarget;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        initAd();
        window.plugins.AdMob.createBannerView();
    },
    // Update DOM on a Received Event
    
    receivedEvent: function(id) {
        //FastClick.attach(document.body);
        bindPanel();
        navigate(1);
        var body = document.body;
        Hammer(body).on("swipeleft", function(){
                        navLeft();
                        });
        Hammer(body).on("swiperight", function(){
                        navRight();
                        });
        //navigate(1);
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        //console.log('Received Event: ' + id);
        
    }
    

};

function initAd(){
    if ( window.plugins && window.plugins.AdMob ) {
        var ad_units = {
            ios : {
            banner: 'ca-app-pub-9272423458805650/8821604525'
            }
        };
        var admobid = ( /(android)/i.test(navigator.userAgent) ) ? ad_units.android : ad_units.ios;
        
        window.plugins.AdMob.setOptions( {
                                        publisherId: admobid.banner,
                                        interstitialAdId: admobid.interstitial,
                                        bannerAtTop: false, // set to true, to put banner at top
                                        overlap: false, // set to true, to allow banner overlap webview
                                        offsetTopBar: false, // set to true to avoid ios7 status bar overlap
                                        isTesting: true, // receiving test ad
                                        autoShow: true // auto show interstitial ad when loaded
                                        });
        
        registerAdEvents();
        
    } else {
        alert( 'admob plugin not ready' );
    }
}
// optional, in case respond to events
function registerAdEvents() {
    document.addEventListener('onReceiveAd', function(){});
    document.addEventListener('onFailedToReceiveAd', function(data){});
    document.addEventListener('onPresentAd', function(){});
    document.addEventListener('onDismissAd', function(){ });
    document.addEventListener('onLeaveToAd', function(){ });
    document.addEventListener('onReceiveInterstitialAd', function(){ });
    document.addEventListener('onPresentInterstitialAd', function(){ });
    document.addEventListener('onDismissInterstitialAd', function(){ });
}

//switch(section){
//    case 1:
//        jsonURL = "http://rallisreview.com/?json=get_category_posts&slug=top-stories&count=18";
//        newTitle="Home";
//        break;
//    case 2:
//        jsonURL = "http://rallisreview.com/?json=get_category_posts&slug=news&count=42";
//        newTitle="News";
//        break;
//    case 3:
//        jsonURL = "http://rallisreview.com/?json=get_category_posts&slug=trailers&count=42";
//        newTitle="Trailers";
//        break;
//    case 4:
//        jsonURL = "http://rallisreview.com/?json=get_category_posts&slug=clips&count=42";
//        newTitle="Clips";
//        break;
//    case 5:
//        jsonURL = "http://rallisreview.com/?json=get_category_posts&slug=reviews&count=42";
//        newTitle="Reviews";
//        break;
//    case 6:
//        jsonURL = "http://rallisreview.com/index.php?callback=json&api_key=true&format=json&method=album&id=2";
//        newTitle="Photos";
//        break;
//    case 7:
//        jsonURL = "http://rallisreview.com/index.php?callback=json&api_key=true&format=json&method=album&id=1";
//        newTitle="Posters";
//        break;
//    case 8:
//        jsonURL = "http://rallisreview.com/?json=get_date_posts&include=categories,title,thumbnail,date&date="+fullMonth+"&r=theatrical&count=-1";
//        newTitle="Theatrical";
//        break;
//    case 9:
//        jsonURL = "http://rallisreview.com/?json=get_date_posts&include=categories,title,thumbnail,date&date="+fullMonth+"&r=bluray&count=-1";
//        newTitle="Blu-Ray & DVD";
//        break;
//    case 10:
//        jsonURL = "http://rallisreview.com/?json=get_category_posts&slug=interviews&count=42";
//        newTitle="Interviews";
//        break;
//    case 11:
//        jsonURL = "http://rallisreview.com/?json=get_category_posts&slug=recommendations&count=42";
//        newTitle="Recommendations";
//        break;
//    case 12:
//        jsonURL = "contact";
//        newTitle = "Contact";
//        break;

function MainController($scope, $http,$sce){
    $scope.navigationOpen = false;
    var first = true;
    $scope.selectedLink = -1;
    $scope.tempObj= {};
    $scope.articles = []
    $scope.currentContent = '';
    $scope.renderHtml = function(html_code)
    {
        return $sce.trustAs($sce.HTML,html_code);
    };
    $scope.links = [
        {name:"Home", url:'http://rallisreview.com/?json=get_category_posts&slug=top-stories&count=18'},
        {name:"News", url:'http://rallisreview.com/?json=get_category_posts&slug=news&count=42'},
        {name:"Trailers", url:'http://rallisreview.com/?json=get_category_posts&slug=trailers&count=42'},
        {name:"Clips", url:'http://rallisreview.com/?json=get_category_posts&slug=clips&count=42'},
        {name:"Reviews", url:'http://rallisreview.com/?json=get_category_posts&slug=reviews&count=42'},
        {name:"Photos", url:'http://rallisreview.com/index.php?callback=json&api_key=true&format=json&method=album&id=2'},
        {name:"Posters", url:'http://rallisreview.com/index.php?callback=json&api_key=true&format=json&method=album&id=1'},
        {name:"Theatrical", url:'http://rallisreview.com/?json=get_date_posts&include=categories,title,thumbnail,date&r=theatrical&count=-1&date='},
        {name:"Blu-Ray & DVD", url:'http://rallisreview.com/?json=get_date_posts&include=categories,title,thumbnail,date&r=bluray&count=-1&date='},
        {name:"Interviews", url:'http://rallisreview.com/?json=get_category_posts&slug=interviews&count=42'},
        {name:"Recommendations", url:'http://rallisreview.com/?json=get_category_posts&slug=recommendations&count=42'},
        {name:"Contact", url:'contact'}
    ];
    $scope.title = 'Title';
    $scope.goToLink = function(index){
        var slideFromLeft = index <= $scope.selectedLink;
        $scope.selectedLink = index;
        $scope.navigationOpen = false;

        $http({method:'GET', url:$scope.links[index].url})
            .success(function(data){
                console.log(data);
                $scope.articles = data.posts;
            })
            .error(function(data){
                console.log(data);
            })
    };
    $scope.showContent = function(post) {
        $scope.showPopup = true;
        $scope.currentContent = $scope.renderHtml(post.content);
    };
    var slide = function(){
        var container = '';
        if(first) container = '.content-container-1';
        else container = '.content-container-2';
        if(same){
            $( container ).pagecontainer("change", page, {transition: "fade"});
        }
        else $(container).pagecontainer("change", page, {transition: "slide", reverse: bool});
    }
    $scope.goToLink(0);
}