/**
 * Wait before the DOM has been loaded before initializing the Ubuntu UI layer
 */

//status of panel
var panelIsOpen = false;
var backFunction = false;
var backButtonDestination = "home.html";
var backtracks;
var addSoundString;
var backtrackAudioSource;
var isBacktrackPlaying = false;
var snd = new Audio(backtrackAudioSource);
var homepageHeight = "600px";
var addBacktrackPageHeight ="190em";

window.onload = function() {
    //Handling events of dynamically loaded buttions
    //opening sound recording page

    $(document).on('click', '.soundLi .circle', function(){
        //displaying timer div
        $(this).parent().css("background-color","rgba(0,0,0,0)");
        console.log("stop");
        snd.pause();
        $('#mainView').css("height",homepageHeight);
        backButtonDestination = "addSound";
        $("#middleContainer").load("recordSound.html");
        isBacktrackPlaying = false;
    });


    //loading home initially
    $("#middleContainer").load("home.html");

    function disableFooterBar(){
        console.log("should disable footer bar");
        $(".footer div").css("display","none");
    }

    function enableFooterBar(){
        console.log("should enable footer bar");
        $(".footer div").css("display","none");
    }

    function disableFooter(){
        console.log("should disable footer buttons");
        $(".footer div").css("display","none");
    }

    function enableFooter(){
        console.log("should enable footer buttons");
        $(".footer div").css("display","inline-block");
    }

    function changeButtonToBack(){
        console.log("button should be changed to back");
        $('#backButtonImage').attr("src","photos/back_button.png");
        backFunction = true;
    }

    function changeButtonToPanel(){
        console.log("button should be changed to panel");
        $('#backButtonImage').attr("src","photos/menu_button.png");
        backFunction = false;
    }


    //Handling events of dynamically loaded buttions
    $(document).on('click', '.addSoundButton', function() {
        console.log("adding sound button has been pressed!");
        $("#middleContainer").load("addSound.html");
        backtracks = getBacktracks();
        backButtonDestination = "photoReview";
        $('#mainView').css("height",addBacktrackPageHeight);
    });


    //Handling events of dynamically loaded buttions
    $(document).on('click', '#takePictureButton', function() {
        console.log("Taking picture button has been pressed!");
        $('.addSoundButton').css("display","block");
        disableFooter();
        backButtonDestination = "takingPicture";
    });



    //Handling events of dynamically loaded buttions
    $(document).on('click', '#addBtn', function() {
        changeButtonToBack();
        backButtonDestination = "home.html";
        $("#middleContainer").load("takePicture.html");
        if(panelIsOpen){
            closePanel();
        }
        $('.addSoundButton').css("display","none");
    });


    //loading the content of each page of the panel
    $("#logo").click(function(){
        $("#middleContainer").load("home.html");
        if(panelIsOpen){
            closePanel();
        }
      });


    //loading the content of each page of the panel
    $("#addBtn").click(function(){
        $("#middleContainer").load("add.html");
        if(panelIsOpen){
            closePanel();
        }
      });


    //loading the content of each page of the panel
    $("#feedbackBtn").click(function(){
        if(panelIsOpen){
             $("#middleContainer").load("feedback.html");
            closePanel();
        }
      });

    //loading the content of each page of the panel
    $("#aboutBtn").click(function(){
        if(panelIsOpen){
             $("#middleContainer").load("about.html");
            closePanel();
        }
      });

    //loading the content of each page of the panel
    $("#privacyBtn").click(function(){
        if(panelIsOpen){
             $("#middleContainer").load("privacy.html");
            closePanel();
        }
      });

    //loading the content of each page of the panel
    $("#helpBtn").click(function(){
        if(panelIsOpen){
             $("#middleContainer").load("help.html");
            closePanel();
        }
      });


    //Setting the height of the panel and main content
    console.log($(window).height());
    $('.mainContent').height($(window).height());
    $('.panel').height($(window).height());

    //Handling the openning of the tab or back function
    $(document).on('click', '#panelBtn', function(){
		 //openning the panel
        if(!backFunction){
            if(!panelIsOpen){
            console.log("Panel Button Clicked!");
            $('.mainContent').width('39%');
            $('.panel').addClass("visible");
            $('.panel ul').show(0.1);

            setTimeout( function(){
                panelIsOpen = true;
              } , 1000 );
            console.log(panelIsOpen);
            }
        }

        //handling back function
        else{
            switch (backButtonDestination) {
                //going back to home
                case "home.html":
                    $("#middleContainer").load("home.html");
                    changeButtonToPanel();
                    break;
                //going back to take picture
                case "takingPicture":
                    $('.addSoundButton').css("display","none");
                    backButtonDestination = "home.html";
                    enableFooter();
                    break;
                //going back to reviewing picture
                case "photoReview":
                    backButtonDestination = "takingPicture";
                    $('#mainView').css("height","600px");
                    $("#middleContainer").load("takePicture.html", function (){
                        $('.addSoundButton').css("display","block");
                        disableFooter();
                    });
                    break;
                 case "addSound":
                     $("#middleContainer").load("addSound.html");
                     backtracks = getBacktracks();
                     backButtonDestination = "photoReview";
                     $('#mainView').css("height",addBacktrackPageHeight);
                     break;
            }
        }
	});

    //closing the tab
    $(".mainContent").click(function(){
        if(panelIsOpen){
            console.log("Main content Clicked!");
            closePanel();
        }
      });

    function closePanel(){
        $('.mainContent').width('100%');
        $('.panel').removeClass("visible");
        $('.panel ul').hide("0.2");
        panelIsOpen = false;
    }

    // Wire all the simple logic
    function getContacts() {
        return [].slice.call(document.querySelectorAll('#contacts li'));
    }

    var contacts = getContacts();
    contacts.forEach(function (contact) {
        contact.addEventListener('click', function() {
            contact.classList.add('selected');
        });
    });

    function getSelectedContacts() {
        var selectedContactInputs = [].slice.call(document.querySelectorAll('#contacts li label input:checked'));
        return selectedContactInputs.map(function (contactInputElement) { return contactInputElement.parentNode.parentNode; });
    }

    function getContactName(contact) {
        return contact.querySelector('p').innerHTML;
    }

    function displayMessage(message) {
        document.querySelector('#dialog1 h1').innerHTML = message;
        UI.dialog('dialog1').show();
    }

    // Add an event listener that is pending on the initialization
    //  of the platform layer API, if it is being used.
    document.addEventListener("deviceready", function() {
        if (console && console.log)
            console.log('Platform layer API ready');
    }, false);
};


//getting backtracks
function getBacktracks(){
    var result= [];
    var jsonParse = [];
    result = $.ajax({
        type: "POST",
        url: "http://melodigram.com/api/get_backtracks.json",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: '{"backtrack_type":"Free"}',
        success: function(data){


            console.log(data.all_backtracks);
            //console.log(data.all_backtracks[0]["picture"]);
            //console.log(data.all_backtracks.length);

            //sorting the backtracks by their placement value
            data.all_backtracks.sort(function(a, b){
             return b.placement-a.placement;
           });


            addSoundString = '<div class="soundChoose"><ul> <li class="soundLi"><div class=timer><div class="circle" style="background-image:url'+"('photos/backtrack_no_backtrack.png')"+";background-size:100% 100%;"+'"> </div></div></li> ' ;
            for (i = 0; i < data.all_backtracks.length; i++) {
                var photoAddress = "http://melodigram.com/download.json/"+data.all_backtracks[i]["picture"];
                 addSoundString += '<li class="soundLi"><div class=timer><div class="circle" backtrackId = "'+i+'"style="background-image:url'+"('"+photoAddress+"')"+";background-size:100% 100%;"+'"> </div></div></li>';
                // console.log(data.all_backtracks[i].picture);
            }
            addSoundString += '</ul> </div>';
            //console.log(addSoundString);
            $('#middleContainer').append(addSoundString);


            //hovering on backtracks
            $(document).on('mouseover', '.soundLi .circle', function(){
                //displaying timer div
                $(this).parent().css("background-color","rgba(0,0,0,0.4)");
                var i = $(this).attr('backtrackId');
                //console.log($(this).attr('backtrackId'));
                backtrackAudioSource = "http://melodigram.com"+ data.all_backtracks[i]["file_url"];
                //console.log(backtrackAudioSource);

                //playing the backtrack audio
                if(!isBacktrackPlaying){
                    snd = new Audio(backtrackAudioSource);
                    console.log("play");
                    snd.play();
                    isBacktrackPlaying = true;
                }
            });


            $(document).on('mouseleave', '.soundLi .circle', function(){
                //displaying timer div
                $(this).parent().css("background-color","rgba(0,0,0,0)");
                console.log("stop");
                snd.pause();

                isBacktrackPlaying = false;
            });


        },
        failure: function(errMsg) {
            //console.log(errMsg);
        }
    });
    return result;
}
