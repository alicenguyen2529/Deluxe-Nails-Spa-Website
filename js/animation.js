$(document).ready(function () {


    var count_elements = $('.my-banner').length;
    if (count_elements > 0) {
        var iNext = 1;
        var timer;


        // Set banner dau tien active
        $("#banner" + iNext.toString()).animate({ opacity: 1.0 }, 600);

        /*auto banner*/
        timer = setInterval(function () {
            Autobanner(iNext);
        }, 5000);

        $(".bannergroup").mouseenter(function () {
            clearInterval(timer);
        });

        $(".bannergroup").mouseleave(function () {
            fContinueBanner();
        });

        function fContinueBanner() {
            timer = setInterval(function () {
                Autobanner(iNext);
            }, 5000);
        }

        function Autobanner(count) {
            $("#banner" + iNext.toString()).animate({ opacity: 0.0 }, 800);
            if (iNext == count_elements) {
                iNext = 1;
            }
            else {
                iNext++;
            }
            $("#banner" + iNext.toString()).animate({ opacity: 1.0 }, 600);
        }
        /**/
        /*end auto banner*/

        /*back & next banner*/
        $("#nextbt").click(function () {
            clearInterval(timer);
            $("#banner" + iNext.toString()).animate({ opacity: 0.0 }, 800);
            if (iNext == count_elements) {
                iNext = 1;
            }
            else {
                iNext++;
            }
            $("#banner" + iNext.toString()).animate({ opacity: 1.0 }, 600);
            fContinueBanner();
            clearInterval(timer);
        });

        $("#backbt").click(function () {
            clearInterval(timer);
            $("#banner" + iNext.toString()).animate({ opacity: 0.0 }, 800);
            if (iNext == count_elements) {
                iNext = 1;
            }
            else {
                iNext++;
            }
            $("#banner" + iNext.toString()).animate({ opacity: 1.0 }, 600);
            fContinueBanner();
            clearInterval(timer);
        });
    }

    //services more hide    
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    var sID = getUrlParameter('id');
    if (sID != "") {
        fHomeMenuServices();
    }

    $(".divseracti").click(function () {
        var id = $(this).attr("id").replace("seracti_", "");
        if ($("#services_" + id).css("display") != "block") {
            $("#services_" + id).fadeIn(500);
            $("#seracti_" + id).css("background", "#b67627 url(img/minus.png) 98% 50% no-repeat");
        }
        else {
            $("#services_" + id).fadeOut(500);
            $("#seracti_" + id).css("background", "#231f20 url(img/plus.png) 98% 50% no-repeat");
        }
    });

    function fHomeMenuServices() {
        if ($("#services_" + sID).css("display") != "block") {
            $("#services_" + sID).fadeIn(500);
            $("#seracti_" + sID).css("background", "#b67627 url(img/minus.png) 98% 50% no-repeat");
        }
        else {
            $("#services_" + sID).fadeOut(500);
            $("#seracti_" + sID).css("background", "#231f20 url(img/plus.png) 98% 50% no-repeat");
        }
    }

    //    ////////////////////


    //chay menutrong mobile    

    var playmenu = "1";
    $(".menuimg").click(function () {
        if (playmenu == "1") {
            Menu_mlick1();
        }
        else {
            Menu_mlick2();
        }
    });
    function Menu_mlick1() {
        $(".menu_m").stop(true, true).animate({ height: "490px" }, 400);
        playmenu = "0";
    }
    function Menu_mlick2() {
        $(".menu_m").stop(true, true).animate({ height: "40px" }, 400);
        playmenu = "1";
    }



    //Notification
    $("#closenoti").click(function () {
        $("#groupnoti").css("display", "none");
    });
    //End Notification

    //Scroll Top
    $('#linktop').click(function () {
        $("body, html").animate({ scrollTop: 0 }, '400');
    });

    //top an va hien
    $(window).scroll(showDiv);
    function showDiv() {
        if ($(window).scrollTop() > 300) {
            $('#linktop').fadeIn('slow');
        }
        else {
            $('#linktop').fadeOut('slow');
        }
    }
    //top an va hien

    //Contact Form
    $("#bSend").click(function () {
        $("#bSend").fadeOut(50);
        $("#formwait").fadeIn(20);

        //Check form
        var sNotify = "";

        //Name
        if ($("#txtName").val() == "") {
            sNotify += "* Please input the first name<br/>";
        }

        //Email
        if ($("#txtEmail").val() == "") {
            sNotify += "* Please input the Email<br/>";
        }
        else {
            if (!checkEmail($("#txtEmail").val())) {
                sNotify += "*Invalid Email<br/>";
            }
        }

        //Phone
        if ($("#txtPhone").val() == "") {
            sNotify += "* Please input your phone number<br/>";
        }
        else {
            if (!checkPhone($("#txtPhone").val())) {
                sNotify += "*Invalid Phone Number<br/>";
            }
        }

        //Content
        //Name
        if ($("#txtContent").val() == "") {
            sNotify += "* Please input the message<br/>";
        }

        if (sNotify != "") {
            $("#formnotifycontent").html(sNotify);
            $("#formnotify").fadeIn(50);
            $("#bSend").fadeIn(50);
            $("#formwait").fadeOut(20);
        }
        else {
            var sName = $("#txtName").val();
            var sEmail = $("#txtEmail").val();
            var sPhone = $("#txtPhone").val();
            var sContent = $("#txtContent").val();

            $.ajax(
            {
                type: "POST",
                url: "process.aspx/contactus",
                data: "{'sName':'" + sName + "','sEmail':'" + sEmail + "','sPhone':'" + sPhone + "','sContent':'" + sContent + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: "true",
                cache: "false",

                success: function (msg) {
                    if (msg.d == "0") {
                        $("#formnotifycontent").html("Your message has been sent. Thank you!");
                        $("#formnotify").fadeIn(50);
                        $("#txtName").val("");
                        $("#txtEmail").val("");
                        $("#txtPhone").val("");
                        $("#txtContent").val("");
                    }
                    $("#formwait").fadeOut(20);
                    $("#formsubmit").fadeIn(50);
                },

                Error: function (x, e) {
                    $("#formnotifycontent").html("Some Error! Please try again later");
                    $("#formnotify").fadeIn(50);
                }
            });
        }
    });

    $("#formnotifyok").click(function () {
        $("#formnotifycontent").html("");
        $("#formnotify").fadeOut(50);
    });

    //Party Form
    $("#bPartySend").click(function () {
        $("#bPartySend").fadeOut(50);
        $("#formwait").fadeIn(20);

        //Check form
        var sNotify = "";

        //Name
        if ($("#txtName").val() == "") {
            sNotify += "* Please input the first name<br/>";
        }

        //Email
        if ($("#txtEmail").val() == "") {
            sNotify += "* Please input the Email<br/>";
        }
        else {
            if (!checkEmail($("#txtEmail").val())) {
                sNotify += "*Invalid Email<br/>";
            }
        }

        //Phone
        if ($("#txtPhone").val() == "") {
            sNotify += "* Please input your phone number<br/>";
        }
        else {
            if (!checkPhone($("#txtPhone").val())) {
                sNotify += "*Invalid Phone Number<br/>";
            }
        }

        //Content
        if ($("#txtContent").val() == "") {
            sNotify += "* Please input the message<br/>";
        }

        //Date
        if ($("#txtDate").val() == "") {
            sNotify += "* Please input the Party Date<br/>";
        }

        //Size
        if ($("#txtSize").val() == "") {
            sNotify += "* Please input the Party Size<br/>";
        }

        if (sNotify != "") {
            $("#formnotifycontent").html(sNotify);
            $("#formnotify").fadeIn(50);
            $("#bPartySend").fadeIn(50);
            $("#formwait").fadeOut(20);
        }
        else {
            var sName = $("#txtName").val();
            var sEmail = $("#txtEmail").val();
            var sPhone = $("#txtPhone").val();
            var sContent = $("#txtContent").val();
            var sDate = $("#txtDate").val();
            var sSize = $("#txtSize").val();

            $.ajax(
            {
                type: "POST",
                url: "process.aspx/party2",
                data: "{'sName':'" + sName + "','sEmail':'" + sEmail + "','sPhone':'" + sPhone + "','sContent':'" + sContent + "','sDate':'" + sDate + "','sSize':'" + sSize + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: "true",
                cache: "false",

                success: function (msg) {
                    if (msg.d == "0") {
                        //$("#formnotifycontent").html("Thank you for messaging us. We will contact you as soon as possible.");
                        $("#formnotifycontent").html("We have received your request and will contact you for final confirmation. If you don't hear back from us, please give us a call.");
                        $("#formnotify").fadeIn(50);
                        $("#txtName").val("");
                        $("#txtEmail").val("");
                        $("#txtPhone").val("");
                        $("#txtContent").val("");
                        $("#txtDate").val("");
                        $("#txtSize").val("");
                    }
                    $("#formwait").fadeOut(20);
                    $("#formsubmit").fadeIn(50);
                },

                Error: function (x, e) {
                    $("#formnotifycontent").html("Some Error! Please try again later");
                    $("#formnotify").fadeIn(50);
                }
            });
        }
    });

    function checkEmail(email) {
        var filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(email)) {
            return false;
        }
        else {
            return true;
        }
    }

    function checkPhone(email) {
        var filter = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        if (!filter.test(email)) {
            return false;
        }
        else {
            return true;
        }
    }
    //Contact Form

});




