    //"use strict";		
    var ipStackKey = "5118ee7";
    ////https://openexchangerates.org/api/latest.json?app_id=3e824a6d77374740bffd916fd232efd1
    var paymentRequest, prButton;
    var exchangeRate;
    var ttl;
    var ppttl;
    var pass; 
    var handled = false;
    var handled2 = false;
    var counter = 0;
    var counter2 = 1;
    var currencySymbol = "$";
    var countryCode = "US";
    var paypalExchangeRate;
    var languageCode;
    var chatID;
    var langDocument;
    var labelTotal;
    var paymentRequest;
    var multiplier;
    var stripeCurrencyCode = "usd";
    var unitOfMeasure = "centimeters";
    var sizeStandardKrane = 72;
    var sizeJumboKrane = 86;
    var lengthSymbol = " cm";
    var checkoutComplete = false;
    var slideContainer = 600;
    var freeUSShippingOver = 20;
    var freeWorldShippingOver = 12;
    var cartBuilt = false;
    var shippingInterArr = [];
    var shippingUSArr = [];
    //test key: pk_test_fgP1IfitRDyrHERTzo9BABmR
    //pk_live_oRL9EVHl8I93CAciYj5xi2OA
    var stripe = Stripe('pk_test_fgP1IfitRDyrHERTzo9BABmR');


    var elements = stripe.elements();
    var contactInformation = {firstName: "", lastName: "", emailAddress: ""};
    var style = {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        letterSpacing: '.05em',
        fontFamily: 'Arial',
        fontSize: '15px',
        '::placeholder': {
          color: '#000000',
        }
      }
    }
   
    //array item 0 = quantity
    //1 = model/sku etc
    //2 = price
    var cart = [
        {k: [0,28,0]}, 
        {k: [0,28,0]}, 
        {k: [0,28,0]}, 
        {k: [0,0,0]}, 
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]}
    ]
    
    var cart2 = [
        {k: [0,28,0]}, 
        {k: [0,28,0]}, 
        {k: [0,28,0]}, 
        {k: [0,0,0]}, 
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]},
        {k: [0,0,0]}
    ]
    
        var cartObj = {
        cartTabs: [
            {
                tabName: "Standard - 28&ldquo;", cartItems: [
                    {items: [
                            {columns: [{title: "Krane - "},{title:"Ibycus"},{size:"Standard"},{price: "24.95"},{shippingInt: ["16.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "Krane - "},{title:"Pyramís"},{size:"Standard"},{price: "28.95"},{shippingInt: ["16.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "Krane - "},{title:"Electrum"},{size:"Standard"},{price: "32.95"},{shippingInt: ["16.00"] },{shippingUS: ["4.00"] }]}
                        ]}
                    ]
            },
            {
                tabName: "Large - 34&ldquo;", cartItems: [
                    {items: [
                            {columns: [{title: "Krane - "},{title:"Ibycus"},{size:"Large"},{price: "28.95"},{shippingInt: ["16.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "Krane - "},{title:"Pyramís"},{size:"Large"},{price: "32.95"},{shippingInt: ["16.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "Krane - "},{title:"Electrum"},{size:"Large"},{price: "36.95"},{shippingInt: ["16.00"] },{shippingUS: ["4.00"] }]} 
                        ]}
                    ]  
            },
            {  
                tabName: "Accessories", cartItems: [
                    {
                        items: [
                            {columns: [{title: "Tablet Extension"},{title:""},{size: ""},{price: "9.95"},{shippingInt: ["12.00"] },{shippingUS: ["4.00"] }]}  
                        ],
                    }
                ]
            },
            {
                tabName: "Parts", cartItems: [
                    {
                        items: [
                            {columns: [{title: "parts-rubber-tip"},{title:""},{size: ""},{price: "1.00"},{shippingInt: ["9.00"] },{shippingUS: ["1.00"] }]},
                            {columns: [{title: "parts-rubber-donut"},{title:""},{size: ""},{price: "1.00"},{shippingInt: ["9.00"] },{shippingUS: ["1.00"] }]},
                            {columns: [{title: "parts-strut-front"},{title:""},{size: ""},{price: "4.00"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "parts-strut-back"},{title:""},{size: ""},{price: "4.00"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "parts-dowel"},{title:""},{size: ""},{price: "1.00"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "parts-main-support"},{title:""},{size: ""},{price: "3.00"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "parts-mounting-main"},{title:""},{size: ""},{price: "1.00"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "parts-wall-anchor"},{title:""},{size: ""},{price: "3.00"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "parts-wall-anchor-screw"},{title:""},{size: ""},{price: "1.00"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "parts-phone-strap"},{title:""},{size: ""},{price: "2.00"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "parts-support-cord"},{title:""},{size: ""},{price: "2.00"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "parts-cord-lock"},{title:""},{size: ""},{price: "1.00"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]},
                            {columns: [{title: "parts-cord-buckle"},{title:""},{size: ""},{price: "1.00"},{shippingInt: ["9.00"] },{shippingUS: ["4.00"] }]}
                        ],
                    }
                ]  
            }
        ]
    }
        
        
        
    var paypalSandboxKey = 'AXNBHeDq2JrjOTfP8sNlOuZorGOBNG5_9QuWelMSgznz6PBvFmJhT7e01jqfmw1a_NAT8cWnOmGA3tVn';
    //var paypalProductionKey = 'AZQS_HL1WChQTKMDP1vUJXUvVxl9ggnqdV7-RdqQjqj2wcUrbMg-0BPeth5My3N7gNTuw4NipsI9VAp9';

    var cardBrandToPfClass = {
        'visa': 'pf-visa',
        'mastercard': 'pf-mastercard',
        'amex': 'pf-american-express',
        'discover': 'pf-discover',
        'diners': 'pf-diners',
        'jcb': 'pf-jcb',
        'unknown': 'pf-credit-card',
    }
    
    var nextDiv = [];
    var navPositionObj = {
        "positions" : [
          {"name":"manually-entered", "functions":[ 
            {"name" : "order-details", "x": "120px", "y": "-280px", "skipContainerAnimation" : false},
            {"name" : "pay-with", "x": "", "y": "",  "skipContainerAnimation" : false},
            {"name" : "contact-information", "x": "50px", "y": "-500px",  "skipContainerAnimation" : false},
            {"name" : "shipping", "x" : "35px", "y": "-380px", "skipContainerAnimation" : false},
            {"name" : "cc-inputs", "x" : "50px", "y": "-485px", "skipContainerAnimation" : true},
            {"name" : "order-review", "x" : "50px", "y": "-505px", "skipContainerAnimation" : true}
          ]},
          {"name":"paypal", "functions":[
            {"name" : "start", "x": "", "y": "", "skipContainerAnimation" : false},
            {"name" : "paypal", "x": "-20px", "y": "-200px",  "skipContainerAnimation" : false}
          ]},
          {"name":"CCerror", "functions":[ 
            {"name" : "start", "x": "", "y": "", "skipContainerAnimation" : true}
          ]}
        ]    
    }
    
    var containersObj = {
      "width":"700",
      "containers":[
            {"name":"order-details", "functions":[ 
                {"functionName" : "calculateTotal", "reverse" : false, "parameters":[true]}, 
                {"functionName" : "generatePaymentRequest",  "reverse" : false, "parameters":[]},
                {"functionName" : "isWebAPIavaiable",  "reverse" : false, "parameters":[]},
                {"functionName" : "updatePaypal",  "reverse" : false, "parameters":[]},
                {"functionName" : "showHideMainNav",  "reverse" : false, "parameters":[true,false]},
                {"functionName" : "showHideMainNav",  "reverse" : true, "parameters":[true,true]},
                {"functionName" : "saveCustomerInformation",  "reverse" : false, "parameters":[]},
                {"functionName" : "buildShoppingCart2", "reverse" : false, "parameters":["paypal-review-order-container","paypal"]},
                {"functionName" : "resetPaypalButtons",  "reverse" : false, "parameters":[]},
                {"functionName" : "fillHoles",  "reverse" : false, "parameters":[1]}
            ]},
            {"name" : "pay-with", "functions" : [
                {"functionName" : "moveNavPayAPI", "reverse" : true, "parameters":[]},
                {"functionName" : "showHideMainNav", "reverse" : false, "parameters":[true,true]},
                {"functionName" : "showHideMainNav", "reverse" : true, "parameters":[true,false]},
                {"functionName" : "fillHoles",  "reverse" : false, "parameters":[2]}
            ]},
            {"name" : "contact-information", "skipContainerAnimation" : false, "functions" : [
                {"functionName" : "checkNameAndEmail", "reverse" : false, "parameters":[]},
                {"functionName" : "fillHoles",  "reverse" : false, "parameters":[5]}
            ]},
            {"name" : "shipping", "functions" : [
                {"functionName" : "validateShipping", "reverse" : false, "parameters":[]},
                {"functionName" : "saveShippingInformation", "reverse" : false, "parameters":[]},
                {"functionName" : "fillHoles",  "reverse" : false, "parameters":[8]}
            ]},
            {"name" : "cc-inputs", "functions" : [
                {"functionName" : "createStripeToken", "reverse" : false, "parameters":[]},
                {"functionName" : "showHideMainNav", "reverse" : true, "parameters":[true,true]}
            ]},
            {"name" : "order-review", "functions" : [
                {"functionName" : "showHideMainNav", "reverse" : true, "parameters":[true,true]}
            ]}    
        ],
      "paypal":[
            {"name" : "pay-with", "functions" : [
                {"functionName" : "fillHoles",  "reverse" : false, "parameters":[2]},
                {"functionName" : "moveNavPayAPI", "reverse" : true, "parameters":[]},
                {"functionName" : "showHideMainNav", "reverse" : false, "parameters":[false, false]},
                {"functionName" : "showHideMainNav", "reverse" : true, "parameters":[true, false]}
            ]},
            {"name":"paypal", "functions":[
                {"functionName" : "fillHoles",  "reverse" : false, "parameters":[1]},
                {"functionName" : "calculateTotal", "reverse" : false, "parameters":[true]}
            ]}
        ]
     }

        
    var calcTotal; 
	var containers;
    var containerID = 0;
    var currencyCode = "USD";
    var paypalCurrencyCode = "usd";
    var cardNumberElement;
    var stopSmoking = false;
    var thumbnailHover;
    var calculatedTotal;
    var shippingUS = "4.00";
    var shippingInternational = "9.00";
    var cartItem = [];
    var cartItem2 = [];
	var arrayOfImages = [];

	arrayOfImages[0] = "images/main_image_lights_off.png";
	preload(arrayOfImages);

    function showTagalongOnScroll(){
        var scrollAmount = $(window).scrollTop();
        if(scrollAmount > 755){
            $("#tagalongBar-container").fadeIn(500);
        }else{
            $("#tagalongBar-container").hide();
        }
    }

    //#############################################################	
    //#############################################################	
    //#############################################################	
    //READY
    //#############################################################	
    //#############################################################	
    //#############################################################	

    var parts,canvas,ctx,paymentAPIavailable;
    var mg = 0;
	$(document).ready(function () {

        console.log("???");  
/*        
 service worker stuff...       
     function showFilesList() {
        //document.querySelector('#files').style.display = 'block';
         //alert("dsdsa");
      }

      // Helper function which returns a promise which resolves once the service worker registration
      // is past the "installing" state.
      function waitUntilInstalled(registration) {
        return new Promise(function(resolve, reject) {
          if (registration.installing) {
            // If the current registration represents the "installing" service worker, then wait
            // until the installation step (during which the resources are pre-fetched) completes
            // to display the file list.
            registration.installing.addEventListener('statechange', function(e) {
              if (e.target.state == 'installed') {
                resolve();
              } else if(e.target.state == 'redundant') {
                reject();
              }
            });
          } else {
            // Otherwise, if this isn't the "installing" service worker, then installation must have been
            // completed during a previous visit to this page, and the resources are already pre-fetched.
            // So we can show the list of files right away.
            resolve();
          }
        });
      }

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('https://krane.tv/service-worker.js', {scope: './'})
          .then(waitUntilInstalled)
          .then(showFilesList)
          .catch(function(error) {
            // Something went wrong during registration. The service-worker.js file
            // might be unavailable or contain a syntax error.
            //document.querySelector('#status').textContent = error;
          });
      } else {
        // The current browser doesn't support service workers.
        var aElement = document.createElement('a');
        aElement.href = 'http://www.chromium.org/blink/serviceworker/service-worker-faq';
        aElement.textContent = 'Service workers are not supported in the current browser.';
        document.querySelector('#status').appendChild(aElement);
      }          
      */  

        //languageSearch(true);
        setInterval(showTagalongOnScroll,100);
        setOrderDetailInputs(true);
        //$("#k1-qty").val(0);
        var tags2 = document.querySelectorAll('div,input,option,textarea,select,button');

        Array.from(tags2).forEach(function(value, index){
            //value.tabIndex = "-1";
        });
        pollServer();
        $.get("./php/language_dropdown_list.php", function (response) {
            $("#language-picker").html(response);
        });	

        $("#language-search").autocomplete({
            source:  function(request, response) {
            $.getJSON('./php/language_dropdown_list.php', {
                term: $("#language-search").val(),
                language_code: languageCode
            }, response);
        },
            minLength: 1,
        }); 		

        fillHoles(0);
 
	//uncomment to test ipstack data
	$.removeCookie("country_lookup", { path: '/' });
        
        

        
	if ($.cookie("country_lookup")) {
		console.log("cookie exists: " + $.cookie("country_lookup"));
		countryCode = $.cookie("country_lookup");
        $("#country").val(countryCode);
        if(countryCode != "US"){
                $("#state").attr("placeholder", "Province");
        }
		$("#countries option[value=\"" + $.cookie("country_lookup") + "\"]").attr('selected','selected');
		detectLanguage();
		//convert(currencyCode);
	}else{
			//First visit, grab language and currency data
			$.get("https://api.ipstack.com/check?access_key=" + ipStackKey, function (response) {
				var currencySymbol = response.currency.symbol;
                
                //103.106.250.36
                //console.log("response.country_code: " + response.country_code);
				//ajax call to mysql, make sure currency is supported; if not fallback 
				//to US for now (TODO: country based fallback [euros etc])
                //console.log(response.currency.code.toLowerCase());
				currencyCode = response.currency.code.toLowerCase(); //response.currency.code.toLowerCase(); //nok
                //console.log("currencyCode: " + currencyCode);
                //TODO: fix paypal convert causes tabs to render twice etc
                //paypalCurrencyCode =  "usd"; //convert(currencyCode,"paypal"); //response.currency.code.toLowerCase();
				countryCode = response.country_code;//response.country_code;
				
                //console.log("---> " + "https://api.ipstack.com/" + response.ip + "&access_key=" + ipStackKey);
                
				if(countryCode == "US"){
                        unitOfMeasure = "inches";
                        sizeStandardKrane = 28;
                        sizeJumboKrane = 34;
                        lengthSymbol = "&#34;";
                        formattedPhoneNumber = "1 (800) 626-8160"; //libphonenumber.parsePhoneNumberFromString('1(800)626-8160').nationalNumber;
				    }else{
                        formattedPhoneNumber = "+1 800 626 8160"; //libphonenumber.parsePhoneNumberFromString('+18006268160').formatInternational();
                } 
                
                $("#formattedPhoneNumber").html(formattedPhoneNumber);
                
                //paypalCurrencyCode = convert(currencyCode,"paypal");
                //console.log("convert(currencyCode,paypal)::: " + paypalCurrencyCode); 
                
				setMeasurementVariables();
                //console.log("Language Code: " + response.location.languages[0]["code"]);
                if(lc == response.location.languages[0]["code"]){
                        var lc = "en";
                    }else{
                        var lc = response.location.languages[0]["code"]; 
                }
                var cc = response.country_name;
                
                
				createCookie("country_lookup",cc);
				//$("#country").val(cc);
                shippingLocationGetLanguage(countryCode);
                
                //Override language detection server-side in order to test language translation...
                //remove "lc", ipstack generated language code to run in production
                detectLanguage(lc);
                
                //console.log("IP Stack: " + response.ip );
                
			}, "jsonp");

	}
        		
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

	canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");
	canvas.height = 300; //document.body.offsetHeight;
	canvas.width = 300;    
    parts = [],
    minSpawnTime = 60,
    lastTime = new Date().getTime(),
    maxLifeTime = Math.min(5000, (canvas.height/(1.5*60)*1000)),
    emitterX = canvas.width / 2,
    emitterY = canvas.height - 50,
    smokeImage = new Image();	
	smokeImage.src = "images/smoke.png";
	
	smokeImage.onload = function () {
		render();
	}

        
});	




//#############################################################	
//#############################################################	
//#############################################################	
//END READY
//#############################################################	
//#############################################################	
//#############################################################


        

        




			




