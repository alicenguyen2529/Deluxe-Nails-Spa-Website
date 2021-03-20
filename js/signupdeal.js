$(document).ready(function () {
    fLoadSignUpDeal();

    function fLoadSignUpDeal() {

        var sID = 0;
        $.ajax(
        {
            type: "POST",
            url: "dealprocess.aspx/loadsignupdeal",
            data: "{'sID':'" + sID + "'}",
            contentType: "application/json; charset=utf-8",
            ddataType: "json",
            async: "true",
            cache: "false",
            success: function (msg) {
                var sTitle = msg.d["sTitle"];
                var sBanner = msg.d["sBanner"];
                var sRestriction = msg.d["sRestrictions"];
                var sSerial = msg.d["sSerial"];
                var sExpiredDated = msg.d["sExpiredDate"];

                $('#title_signup').html(sTitle);
                $('#banner_signup').html(sBanner);
                $('#divExpiredDate').html(msg.d["sExpiredDate"]);
                $('#divBackGround').html(msg.d["sBackground"]);
                $('#divSerial').html(sSerial);

                if (sRestriction == '') {
                    $('#box_restrictions').css('display', 'none');
                } else {
                    $('#restrictions').html(sRestriction);
                }
                if (sExpiredDated == '') {
                    $('#expired').html('N/A');
                } else {
                    $('#expired').html(sExpiredDated);
                }
                if (sSerial == null) {
                    $('#box_serial').css('display', 'none');
                    $('#box_signup').css('margin-top', '30px');
                    $('#row_title').css('display', 'block');
                } else {
                    $('#back_signupdeal').css('display', 'block');
                    $('#row_title').css('display', 'none');
                }

            },
            Error: function (x, e) {
                alert("Some error occured! Please try again.");
            }
        });
    }
});

