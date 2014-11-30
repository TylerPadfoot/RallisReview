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
            banner: 'ca-app-pub-6628465121776691/2133428867'
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
var currSection = -1;
function navLeft(){
    if(currSection+1<=12)performNavigation(currSection+1);
}
function navRight(){
    if(currSection-1>=1)performNavigation(currSection-1);
}
function refreshPage(){
    performNavigation(currSection);
}

function setUp(){
    $('a').not('.popupcloser, .ui-link, .noBrowser').click(function(event){
                 event.preventDefault();
                 var url = $(this).attr('href');
                 openBrowser(url);
                 })
}
function performNavigation(section){
    
    currentTarget = section;
    
    var page = "";
    var jsonURL ="";
    var idURL = $(':mobile-pagecontainer').pagecontainer('getActivePage')[0].id;
    var bool = section<currSection;
    var same = section==currSection;
    var titler = "";
    var newTitle = "";
    
    $('#content2').empty();
    $('#content1').empty();

    if(idURL=="page1"){
        titler = "#navLocation1";
        page = "#page2";
        document.getElementById('loader2').style.display="inline";
        
    }
    else{
        titler = "#navLocation2"
        page = "#page1"
        document.getElementById('loader1').style.display="inline";
    }

    console.log(currSelectedMonth);
    console.log(currSelectedYear);
    var currentTime = new Date();
    var currYear = currentTime.getFullYear();
    var currMonth = currentTime.getMonth()+1;
    if(currMonth < 10){
        currMonth = "0"+currMonth;
    }
    var fullMonth;
    if(currSelectedMonth !='' && currSelectedYear != ''){
        fullMonth = currSelectedYear+''+currSelectedMonth;
    }
    else{fullMonth = currYear+""+currMonth}
    console.log(fullMonth);
    switch(section){
        case 1:
            jsonURL = "http://rallisreview.com/?json=get_category_posts&slug=top-stories&count=18";
            newTitle="Home";
            break;
        case 2:
            jsonURL = "http://rallisreview.com/?json=get_category_posts&slug=news&count=42";
            newTitle="News";
            break;
        case 3:
            jsonURL = "http://rallisreview.com/?json=get_category_posts&slug=trailers&count=42";
            newTitle="Trailers";
            break;
        case 4:
            jsonURL = "http://rallisreview.com/?json=get_category_posts&slug=clips&count=42";
            newTitle="Clips";
            break;
        case 5:
            jsonURL = "http://rallisreview.com/?json=get_category_posts&slug=reviews&count=42";
            newTitle="Reviews";
            break;
        case 6:
            jsonURL = "http://rallisreview.com/index.php?callback=json&api_key=true&format=json&method=album&id=2";
            newTitle="Photos";
            break;
        case 7:
            jsonURL = "http://rallisreview.com/index.php?callback=json&api_key=true&format=json&method=album&id=1";
            newTitle="Posters";
            break;
        case 8:
            jsonURL = "http://rallisreview.com/?json=get_date_posts&include=categories,title,thumbnail,date&date="+fullMonth+"&r=theatrical&count=-1";
            newTitle="Theatrical";
            break;
        case 9:
            jsonURL = "http://rallisreview.com/?json=get_date_posts&include=categories,title,thumbnail,date&date="+fullMonth+"&r=bluray&count=-1";
            newTitle="Blu-Ray & DVD";
            break;
        case 10:
            jsonURL = "http://rallisreview.com/?json=get_category_posts&slug=interviews&count=42";
            newTitle="Interviews";
            break;
        case 11:
            jsonURL = "http://rallisreview.com/?json=get_category_posts&slug=recommendations&count=42";
            newTitle="Recommendations";
            break;
        case 12:
            jsonURL = "contact";
            newTitle = "Contact";
            break;
            
    }
    
    
    currSection = section;
    if(same){
        $(':mobile-pagecontainer' ).pagecontainer("change", page, {transition: "fade"});
    }
    else $(':mobile-pagecontainer' ).pagecontainer("change", page, {transition: "slide", reverse: bool});
    $(':mobile-pagecontainer').pagecontainer('getActivePage').find('.naviList li').removeClass('selected');
    $(':mobile-pagecontainer').pagecontainer('getActivePage').find('.naviList li').eq(section-1).addClass('selected');
    startPage(jsonURL, section);
    $('#navLocation').html(newTitle);
    

}
function navigate( section ){
    //var menuLeft = document.getElementById("nav1");
    //if(classie.has(menuLeft, 'navigator-open')) {
    //    classie.toggle(menuLeft, 'navigator-open');
    //}
    var menuLeft = $(':mobile-pagecontainer').pagecontainer('getActivePage').find('.navigator');
    
        menuLeft.panel().panel("close");

    setTimeout(function(){performNavigation(section);}, 300);
}

function startPage(url, target){
    FastClick.attach(document.body);
    unlockPage();
    bindPanel();
    bindPopup();
    if(url=="contact"){
        loadContactPage();
    }
    else
    {
        var currTime = new Date();
        getData(url,target,currTime.getMonth());
    }
    

}
var blockImageLoads = false;
function nextImages(album, number, targ){
    var more = document.getElementById("loadmore");
    var text = document.getElementById("loadmoretext");
    if(text)
        text.innerHTML = "Loading...";
    for( var i = 0; i<number; i++){
        
        var xmlhttp2 = new XMLHttpRequest();
        var url = "http://rallisreview.com/index.php?callback=json&api_key=true&format=json&method=gallery&id="+album[i];
        xmlhttp2.open("POST", url, false);
        xmlhttp2.onreadystatechange=function(){
            if(xmlhttp2.readyState==4){
                if (xmlhttp2.status == 200 || xmlhttp2.status == 0 ){
                    if(more)$(more).remove();
                    var gallery = JSON.parse(xmlhttp2.responseText).images;
                    
                    var previewpic = gallery[0].previewpic;
                    var thumburl="";
                    
                    var hiddenInfo ='<div id="slides" class="slideshower">';
                    
                    for(var p = 0; p<gallery.length; p++){
                        if(gallery[p].pid == previewpic){
                            thumburl = gallery[p].thumbURL;
                        }
                        hiddenInfo += '<img onclick="hideNavigation()" src="';
                        hiddenInfo += gallery[p].imageURL;
                        if(p==0)hiddenInfo += '" onload="resizePopup()" />';
                        else hiddenInfo += '"/>'
                    }
                    hiddenInfo += '</div>';
                    var title = gallery[0].title;
                    var adiv = document.createElement('div');
                    adiv.className = 'top_story_thumbnails';

                    var thumbnail = document.createElement('a');
                    thumbnail.className += 'noBrowser';
                    thumbnail.innerHTML="<img src='"+thumburl+"'/>";
                    thumbnail.href="#";
                    thumbnail.onclick=function(){
                        showImages(hiddenInfo);
                    };
                    //if(currPost.custom_fields.hasOwnProperty('sponsored')){
                    //    thumbnail.href='javascript:openBrowser("'+currPost.custom_fields.sponsored+'")';
                    //
                    //}
                    //else if(!isEmpty(currPost.content)){
                    //    var url = "http://rallisreview.com/?json=get_post&id="+currPost.id;
                    
                    //    thumbnail.href='javascript:openItem("'+url+'")';
                    //}
                    
                    adiv.appendChild(thumbnail);
                    
                    var h = document.createElement('h3');
                    h.innerHTML=title;
                    adiv.appendChild(h);
                    document.getElementById(targ).appendChild(adiv);
                    if(i==number-1){

                        blockImageLoads = false;
                        var remaining = album.slice(5);
                        var diva = document.createElement('div');
                        diva.className="moreimages";
                        diva.id="loadmore";
                        var loadmore = document.createElement('a');
                        loadmore.id = 'loadmoretext';
                        loadmore.className+='noBrowser';
                        loadmore.style.textDecoration = "none";
                        loadmore.style.color="#FFFAF0";
                        console.log(currentTarget);
                        if(currentTarget == 6)
                            loadmore.innerHTML="More Photos";
                        else loadmore.innerHTML="More Posters";
                        loadmore.href = '#';
                        diva.onclick=function(){
                            console.log('LOADING');
                            document.getElementById('loadmoretext').innerHTML = "Loading...";
                            blockImageLoads = true;
                            setTimeout(function(){nextImages(remaining,number,targ);},100);
                        };
                        diva.appendChild(loadmore);
                        diva.innerHTML += "<br><br><br>";
                        document.getElementById(targ).appendChild(diva);
                    }
                }
            }
        }
        xmlhttp2.send();
        
    }
}

function test1(album){
    alert(album.length);
}

function getPost(url){
    if(!url)return;
    var popup = $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('#content');

    popup.empty();
    popup.css("height","auto");

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4){
            if (xmlhttp.status == 200 || xmlhttp.status == 0 ){
                var jsonObj = JSON.parse(xmlhttp.responseText);
                var content = jsonObj.post.content;
                
                popup.html(content);
                var src = popup.find('iframe').attr('src');
                popup.find('iframe').attr('src', src+'&autoplay=1')
                var h = $(document).height()*0.90;
                if(popup.height()>h){
                    popup.css("height", h+"px");
                }
                var marginer = 0-popup.height()/2;
                popup.parent().css("margin-top", marginer+"px");
                setUp();
            }
        }
    }
    xmlhttp.send();
}

function loadContactPage(){
    var targ = "";
    var idURL = $(':mobile-pagecontainer').pagecontainer('getActivePage')[0].id;
    
    if(idURL=="page1"){
        targ = "content1";
        document.getElementById('loader1').style.display="none";
        
    }
    else{
        targ="content2";
        document.getElementById('loader2').style.display="none";

    }
    var pageContainer = document.createElement('div');
    pageContainer.className = 'contactPage';
    var html = '<a href="#" style="text-decoration:none; color:#5B0505"><img width="30%" src="assets/contact/rate.png"/></a>';
    //var html = '<a href="#" class="rate" style="text-decoration:none; color:#5B0505">Rate This App</a>';
    //html += '<br><br><br>';
    html += '<hr width="80%">';
    html += '<h1>Rallis Review</h1>';
    html += '<hr width="80%">';
    html += '<a href="javascript:openBrowser(\'http://twitter.com/RallisReview\');"><img src="assets/contact/twitter2.png" width="15%"/></a>';
    html += '<a href="javascript:openBrowser(\'http://facebook.com/RallisReview\');"><img src="assets/contact/facebook2.png" width="15%"/></a>';
    html += '<a href="mailto:RallisReviewApp@gmail.com"><img src="assets/contact/gmail.png" width="15%"/></a>';
    var adiv = document.createElement('div');
    adiv.className = 'contactCSS';
    adiv.innerHTML = html;
    pageContainer.appendChild(adiv);
    html = '<hr width="80%">';
    html += '<h1>Peter Rallis</h1>';
    html += '<hr width="80%">';
    html += '<a href="javascript:openBrowser(\'http://twitter.com/RallisP\');"><img src="assets/contact/twitter2.png" width="15%"/></a>';
    html += '<a href="javascript:openBrowser(\'http://instagram.com/RallisP\');"><img src="assets/contact/instagram.png" width="15%"/></a>';
    html += '<a href="javascript:openBrowser(\'http://youtube.com/RallisP\');"><img src="assets/contact/youtube.png" width="15%"/></a>';
    html += '<br>';
    html += '<br>';
    html += '<img src="assets/contact/contactphoto.png" width="90%"/>';
    var adiv2 = document.createElement('div');
    adiv2.className = 'contactCSS';
    adiv2.innerHTML = html;
    pageContainer.appendChild(adiv2);
    document.getElementById(targ).appendChild(pageContainer);

    
    
    
}


function getData(url,target,selected){
    if(!url)return;
    var isTheatrical = url.indexOf("theatrical")>-1;
    var isBluray = url.indexOf("bluray")>-1;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4){
            if (xmlhttp.status == 200 || xmlhttp.status == 0 ){
                var jsonObj = JSON.parse(xmlhttp.responseText);
                var targ = "";
                var idURL = $(':mobile-pagecontainer').pagecontainer('getActivePage')[0].id;

                if(idURL=="page1"){
                    targ = "content1";
                    document.getElementById('loader1').style.display="none";

                }
                else{
                    targ="content2";
                    document.getElementById('loader2').style.display="none";

                }
                if(jsonObj.count==0){
                    var emptyDiv = document.createElement('div');
                    emptyDiv.innerHTML = "No results found."
                    emptyDiv.className = "no-results";
                    
                    document.getElementById(targ).appendChild(emptyDiv);
                    return;
                }
                var currDay = -1;
                var dateDiv = document.createElement('div');
                var date;

                if(!jsonObj.album){
                    if(jsonObj.posts)
                    for( var i = 0; i<jsonObj.posts.length; i++){
                        
                        var currPost = jsonObj.posts[i];
                        var title = currPost.title;
                        var url = currPost.url;
                        var slug = currPost.categories[0].slug;
                        var thumbnailURL ="";
                        date = parseDate(currPost.date);
                        var adiv = document.createElement('div');
                        var adivDual = document.createElement('div');
                        if((isTheatrical && slug == "theatrical") || (isBluray && slug == "blu-ray-dvd")){
                            adiv.className = 'releases_thumbnails';
                            if(slug == "theatrical"){
                                adiv.className += ' theatrical';
                            }
                            thumbnailURL = currPost.thumbnail_images.full.url;
                            
                        
                            var h = document.createElement('h2');
                            h.innerHTML=title;
                            adiv.appendChild(h);
                            
                            var thumbnail = document.createElement('a');
                            thumbnail.className+='noBrowser';

                            thumbnail.innerHTML="<img src='"+thumbnailURL+"'/>";
                            
                            adiv.appendChild(thumbnail);


                            if (currDay == -1){
                                currDay = date.getDate();
                            }
                            if (currDay == date.getDate()){
                                dateDiv.insertBefore(adiv, dateDiv.firstChild);

                            }
                            else if(currDay != date.getDate() ){
                                var tempDiv = document.createElement('div');
                                tempDiv.className = "dateStyler";
                                var hediv = document.createElement('div');
                                hediv.style.width = "100%";
                                var img = document.createElement('img');
                                img.className = "dateBackground";
                                img.src="assets/navbar/search_background.png"
                                hediv.appendChild(img);
                                var d = document.createElement('h1');
                                d.innerHTML = monthStr(date.getMonth())+" "+currDay;
                                hediv.appendChild(d);
                                
                                dateDiv.insertBefore(hediv, dateDiv.firstChild);
                                tempDiv.innerHTML = dateDiv.innerHTML;
                                dateDiv.innerHTML = "";
                                dateDiv.insertBefore(adiv, dateDiv.firstChild);
                                if(tempDiv.innerHTML.indexOf("null")==-1)
                                document.getElementById(targ).insertBefore(tempDiv, document.getElementById(targ).firstChild);
                                currDay = date.getDate();

                            }

                            
                            
                        }
                        else if (!isTheatrical && !isBluray && !(slug == "theatrical" || slug == "blu-ray-dvd")){
                            dateDiv.innerHTML ="null";
                            adiv.className = 'top_story_thumbnails';
                            thumbnailURL = currPost.thumbnail;
                            
                            var thumbnail = document.createElement('a');
                            thumbnail.className+='noBrowser';
                            thumbnail.innerHTML="<img src='"+thumbnailURL+"'/>";
                            
                            if(currPost.custom_fields.hasOwnProperty('sponsored')){
                                thumbnail.href='javascript:openBrowser("'+currPost.custom_fields.sponsored+'")';
                                
                            }
                            else if(!isEmpty(currPost.content)){
                                var url = "http://rallisreview.com/?json=get_post&id="+currPost.id;
                                if(currPost.content.indexOf("embed-youtube")>-1){
                                    var img = document.createElement('img');
                                    img.src='assets/body/play_button.png';
                                    img.className="playbutton";
                                    adiv.appendChild(img);
                                }
                                thumbnail.href='javascript:openItem("'+url+'")';
                            }
                            
                            adiv.appendChild(thumbnail);
                            
                            var h = document.createElement('h3');
                            h.innerHTML=title;
                            adiv.appendChild(h);
                            if(currentTarget != target) return;
                            document.getElementById(targ).appendChild(adiv);
                        }

                        
                        //$( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('#main').appendChild(adiv);
                    }
                    //flush datediv
                    if(dateDiv.innerHTML != ""){
                        var tempDiv = document.createElement('div');
                        tempDiv.className = "dateStyler";
                        var hediv = document.createElement('div');
                        hediv.style.width = "100%";
                        
                        var img = document.createElement('img');
                        img.className = "dateBackground";
                        img.src="assets/navbar/search_background.png"
                        hediv.appendChild(img);
                        
                        var d = document.createElement('h1');
                        d.innerHTML = monthStr(date.getMonth())+" "+currDay;
                        hediv.appendChild(d);
                        
                        dateDiv.insertBefore(hediv, dateDiv.firstChild);
                        tempDiv.innerHTML = dateDiv.innerHTML;
                        dateDiv.innerHTML = "";
                        if(tempDiv.innerHTML.indexOf("null")==-1)
                        document.getElementById(targ).insertBefore(tempDiv, document.getElementById(targ).firstChild);
                        currDay = date.getDate();
                    }
                    if(isTheatrical || isBluray){
                        var r = "";
                        if(isTheatrical) r = "theatrical";
                        else r = "bluray";
                        var html = '<select id="yearSelector">';
                        for(var i = 2012; i < 2017; i++){
                            if(i==parseInt(currSelectedYear)){
                                html += '<option value="'+i+'" selected>'+i+'</option>';
                            }
                            else{
                                html += '<option value="'+i+'">'+i+'</option>';
                            }
                        }
//                        html += '<option value="2012">2012</option>';
//                        html += '<option value="2013">2013</option>';
//                        html += '<option value="2014">2014</option>';
//                        html += '<option value="2015">2015</option>';
//                        html += '<option value="2016">2016</option>';
                        html += '</select>';
                        

                        html += '<select id="monthSelector" onchange=\'javascript:getNewMonth("'+r+'")\'>';

                        for(var i = 0; i < 12; i++){
                            var s = i+1;
                            s = s.toString();
                            while(s.length<2){
                                s='0'+s;
                            }
                            if(i==parseInt(currSelectedMonth)-1){
                                html += '<option value="'+s+'" selected>'+monthStr(i)+'</option>';
                            }
                            else{
                                html += '<option value="'+s+'">'+monthStr(i)+'</option>';
                            }
                        }
//                        html += '<option value="01">Select Month</option>';
//                        html += '<option value="02">February</option>';
//                        html += '<option value="03">March</option>';
//                        html += '<option value="04">April</option>';
//                        html += '<option value="05">May</option>';
//                        html += '<option value="06">June</option>';
//                        html += '<option value="07">July</option>';
//                        html += '<option value="08">August</option>';
//                        html += '<option value="09">September</option>';
//                        html += '<option value="10">October</option>';
//                        html += '<option value="11">November</option>';
//                        html += '<option value="12">December</option>';
                        html += '</select>';
                        var picker = document.createElement('div');
                        picker.className="pickerStyle";
                        picker.innerHTML=html;
//                        if(currentTarget != target) return;
                        document.getElementById(targ).insertBefore(picker,document.getElementById(targ).firstChild);


                    }
                    
                }
                else {
                    var album = jsonObj.album.gallery_ids;
                    var number = 5;
                    
                    nextImages(album,number,targ);
                    
                }
                //var adiv2 = document.createElement('div');
                //var d = document.createElement('p');
                //d.innerHTML=xmlhttp.responseText;
                //adiv2.appendChild(d);
                //document.getElementById('main').appendChild(adiv2);
                
            }
        }
    }
    xmlhttp.send();
    
}

function getNewMonth(r){
    var offset = document.getElementById("monthSelector").options[document.getElementById("monthSelector").selectedIndex];
    var index = document.getElementById("monthSelector").selectedIndex;
    var currYear = document.getElementById("yearSelector").options[document.getElementById("yearSelector").selectedIndex].value;
    
//    var currentTime = new Date();
//    var currYear = currentTime.getFullYear();
    var currMonth = offset.value;
    currSelectedMonth = currMonth;
    currSelectedYear = currYear;
    //var currMonth = currentTime.getMonth()+1+parseInt(offset.value);
    //if(currMonth<1){
    //    currMonth = 12+currMonth;
    //    currYear-1;
    //}
    //else if(currMonth>12){
    //    currMonth = currMonth-12;
    //    currYear+1;
    //}
    //if(currMonth < 10){
    //    currMonth = "0"+currMonth;
    //}
    var fullMonth = currYear+""+currMonth;
    var jsonURL = "http://rallisreview.com/?json=get_date_posts&include=categories,title,thumbnail,date&date="+fullMonth+"&r="+r+"&count=-1";
    var idURL = $(':mobile-pagecontainer').pagecontainer('getActivePage')[0].id;
    if(idURL=="page1"){
        document.getElementById('loader1').style.display="inline";
        $('#content1').empty();
        
    }
    else{
        document.getElementById('loader2').style.display="inline";
        $('#content2').empty();
    }
    
    getData(jsonURL,index);
}
function showImages(html){
    
    $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('#viewer').popup("open", "position-to=window");
    var popup = $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('.cont');
    var button = $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('.popupcloser');
    button.css("visibility","hidden");

    popup.empty();
    //popup.parent().removeClass('box');
    var d = document.createElement('div');
    d.className = 'topbar';
    d.innerHTML = '<a id="closeButton" href="#" onclick="closePopup()"><img style="width:30px; height:30px" src="assets/body/close.png"></a>';
    
    popup.parent().prepend(d);
    
    popup.addClass('fullscreenpopup');
    popup.parent().addClass('fullscreen');
    //popup.parent().css("visibility","hidden");
    popup.html(html);
    
    var slides = popup.find('#slides');
    if(slides.children().length>1)
        slides.slidesjs({
                        navigation:false
                        });
    else slides.show();
    
}

function hideNavigation(){
    var closeButton = $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('#closeButton');
    closeButton.fadeToggle();
    var pagination = $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('li');
    pagination.fadeToggle();

    
}

function resizePopup(){
    
    var popup = $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('.slidesjs-control img');

    //window.setTimeout(function(){popup.parent().css("visibility","visible");},500);
//    if($(window).width()>=768)return;
    var h = popup.height();
    var wh = $(window).height();
    console.log(h);
    var top = wh/2-h/2;
    popup.css("top", top+"px");
}

function openItem(url){
    $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('#viewer').popup("open", "position-to=window");
    getPost(url);
}

function openBrowser(url){

    window.open(url, '_blank','location=no,toolbar=yes','closebuttoncaption="Back"','EnableViewPortScale=yes');
}

function toggleMenu(){
    //var menuLeft = document.getElementById("nav1")
    //classie.toggle(menuLeft, 'navigator-open');
    $(':mobile-pagecontainer').pagecontainer('getActivePage').find('.navigator').panel("toggle");
}
function closeMenu(){
    //var menuLeft = document.getElementById("nav1")
    //classie.toggle(menuLeft, 'navigator-open');
    $(':mobile-pagecontainer').pagecontainer('getActivePage').find('.navigator').panel("close");
}
function bindPopup(){
    
    $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('#viewer').on(
                                                                                       "popupbeforeposition",
                                                                                       function(event, ui){
                                                                                       lockPage();
                                                                                       });
    $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('#viewer').on(
                                                                                       "popupafterclose",
                                                                                       function(event, ui){
                                                                                        unlockPage();
                                                                                       emptyPopup();
                                                                                       });
}

function closePopup(){
    var popup = $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('#viewer');
    popup.popup("close");
    
}

function emptyPopup(){
    var popup = $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('.cont');
    popup.empty();
    popup.parent().removeClass('fullscreen');
    popup.removeClass('fullscreenpopup');
    popup.parent().addClass('box');
    popup.css("top", "0px");
    popup.parent().find('.topbar').remove();
    var button = $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('.popupcloser');
    button.css("visibility","visible");
}

function bindPanel(){
    $('#menuLeft').on(
                      "panelbeforeopen",
                      function(event, ui){
                      lockPage();
                      });
    $('#menuLeft').on(
                      "panelbeforeclose",
                      function(event, ui){
                      unlockPage();
                      });
    $('#menuLeft1').on(
                      "panelbeforeopen",
                      function(event, ui){
                      lockPage();
                      });
    $('#menuLeft1').on(
                      "panelbeforeclose",
                      function(event, ui){
                      unlockPage();
                      });
    $("#searchinput1").keyup(function(event){
                             if(event.keyCode == 13){
                             $("#submitsearch1").click();
                             }
                             });
    $("#searchinput2").keyup(function(event){
                             if(event.keyCode == 13){
                             $("#submitsearch2").click();
                             }
                             });
    
}

function lockPage(){
    $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('#overlay').fadeIn('slow');
    var currPage = $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' )[0];
    currPage.style.overflow="hidden";

}

function unlockPage(){
    $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' ).find('#overlay').fadeOut('slow');
    var currPage = $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' )[0];
    currPage.style.overflow="scroll";


}

function parseDate(input) {
    var parts = input.split('-');
    parts[2] = parts[2].split(' ')[0];
    
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function test(){
    var idURL = $(':mobile-pagecontainer').pagecontainer('getActivePage')[0].id;
    var searchq = "";
    currentTarget = 99;
    if(idURL=="page1"){
        searchq = document.getElementById('searchinput1').value;
        document.getElementById('loader1').style.display="inline";
        $('#content1').empty();
        document.getElementById('searchinput1').value = "";
        
    }
    else{
        searchq = document.getElementById('searchinput2').value;
        document.getElementById('loader2').style.display="inline";
        $('#content2').empty();
        document.getElementById('searchinput2').value = "";
    }
    closeMenu();
    var str = "Search";
    $('#navLocation').html(str);

    var jsonURL = "http://rallisreview.com/?json=get_search_results&search="+searchq;
    getData(jsonURL,99,2);
}

function monthStr(i){
    
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    
    return month[i];
}