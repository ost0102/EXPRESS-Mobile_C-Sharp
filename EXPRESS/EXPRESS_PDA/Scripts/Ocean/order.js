$(function () {
    //로그인 세션 확인
    if (_fnToNull($("#Session_USR_ID").val()) == "") {
        window.location = window.location.origin;
    }

    $("#input_HBL_NO").focus();
});

$(document).on("keyup", "#input_HBL_NO", function (e) {
    var objJsonData = new Object();
    objJsonData.HBL_NO = _fnToNull($("#input_HBL_NO").val());
    objJsonData.OFFICE_CD = _fnToNull($("#Session_OFFICE_CD").val());
    //PDA에서는 KeyCode 0으로 뜸
    if (e.keyCode == 13) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/Ocean/fnSearchData",
            async: false,
            //dataType: "json",
            data: { "vJsonData": _fnMakeJson(objJsonData) },
            success: function (result) {
                if (JSON.parse(result).Result[0].trxCode == "Y") {
                    $("#input_HBL_NO").val("");
                    var rtnStr = JSON.parse(result).PDA_SEARCH;
                    var MULTI_CHK = JSON.parse(result).PDA_MULTI;
                    var SELECT_CLOSE_GB = _fnToNull(rtnStr[0]["SELECT_CLOSE_GB"]);
                    var DROP_GB = _fnToNull(rtnStr[0]["DROP_GB"]);
                    $("#WH_IN_TYPE").text(_fnToNull(rtnStr[0]["WH_IN_TYPE"]));
                    $("#HSN_NO").text(_fnToNull(rtnStr[0]["HSN_NO"]));
                    if (SELECT_CLOSE_GB == "Y" && DROP_GB == "Y") {
                        $("#INSPECT_GB").text("선별,취하");
                    } else if (SELECT_CLOSE_GB == "Y" && DROP_GB == "N") {
                        $("#INSPECT_GB").text("선별");
                    } else if (SELECT_CLOSE_GB == "N" && DROP_GB == "Y") {
                        $("#INSPECT_GB").text("취하");
                    } else {
                        $("#INSPECT_GB").text("");
                    }


                    $("#CSCLPRGSSTTS").text(_fnToNull(rtnStr[0]["CSCLPRGSSTTS"]));
                    if (MULTI_CHK != "") {
                        $("#HBL_NO").text(_fnToNull(rtnStr[0]["HBL_NO"]));
                        $("#HBL_NO").css("color", "red");
                    } else {
                        $("#HBL_NO").text(_fnToNull(rtnStr[0]["HBL_NO"]));
                        $("#HBL_NO").css("color", "#fff");
                    }
                    $("#MBL_NO").text(_fnToNull(rtnStr[0]["MBL_NO"]));
                    $("#ETD").text(_fnToNull(rtnStr[0]["ETA"]));
                    $("#POD_CD").text(_fnToNull(rtnStr[0]["POL_CD"]));
                    $("#ETA").text(_fnToNull(rtnStr[0]["ETD"]));
                    $("#POL_CD").text(_fnToNull(rtnStr[0]["POD_CD"]));
                    $("#MAIN_ITEM_NM").text(_fnToNull(rtnStr[0]["MAIN_ITEM_NM"]));
                    $("#WURL_ID").text(_fnToNull(rtnStr[0]["WURL_ID"]));
                    $("#CNTR_AGT_CD").text(_fnToNull(rtnStr[0]["CNTR_AGT_CD"]));
                    $("#SHP_NM_ENG").text(_fnToNull(rtnStr[0]["CNE_NM_LOC"]));
                    $("#SHP_TEL_NO").text(_fnToNull(rtnStr[0]["CNE_TEL_NO"]));
                    $("#TRUCK_CD").text(_fnToNull(rtnStr[0]["TRUCK_CD"]));
                    $("#HOLD_TYPE").text(_fnToNull(rtnStr[0]["HOLD_TYPE"]));
                    $("#RMK").text(_fnToNull(rtnStr[0]["RMK"]));
                    $("#Box_Qty").text(_fnToNull(rtnStr[0]["PKG"]));
                    $("#Box_Wgt").text(_fnToNull(rtnStr[0]["GRS_WGT"]));
                    $("#INSPECT_SEQ").text(_fnToNull(rtnStr[0]["INSPECT_SEQ"]));

                    f(_fnToNull(rtnStr[0]["HOLD_TYPE"]));
                } else {
                    $("#input_HBL_NO").val("");
                    $("#WH_IN_TYPE").text("");
                    $("#HSN_NO").text("");
                    $("#INSPECT_GB").text("");
                    $("#CSCLPRGSSTTS").text("");
                    $("#HBL_NO").text("");
                    $("#MBL_NO").text("");
                    $("#ETD").text("");
                    $("#POD_CD").text("");
                    $("#ETA").text("");
                    $("#POL_CD").text("");
                    $("#MAIN_ITEM_NM").text("");
                    $("#WURL_ID").text("");
                    $("#CNTR_AGT_CD").text("");
                    $("#SHP_NM_ENG").text("");
                    $("#SHP_TEL_NO").text("");
                    $("#TRUCK_CD").text("");
                    $("#HOLD_TYPE").text("");
                    $("#RMK").text("");
                    $("#Box_Qty").text("");
                    $("#Box_Wgt").text("");
                    $("#INSPECT_SEQ").text("");
                    _fnAlertMsg("검색된 결과가 없습니다.");
                }
            }, error: function (xhr, status, error) {
                status = true;
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        });
    }
});

$(document).on('click', '#LogOut', function () {
    $.ajax({
        type: "POST",
        url: "/Login/LogOut",
        async: false,
        success: function (result, status, xhr) {

            $("#Session_USR_ID ").val("");
            $("#Session_LOC_NM ").val("");
            $("#Session_EMAIL").val("");
            $("#Session_CUST_CD").val("");
            $("#Session_HP_NO").val("");
            $("#Session_DOMAIN").val("");
            $("#Session_OFFICE_CD").val("");
            $("#Session_AUTH_KEY").val("");
            $("#Session_USR_TYPE").val("");

            location.href = window.location.origin;
        }
    });
});
function _fnToNull(data) {
    // undifined나 null을 null string으로 변환하는 함수. 
    if (String(data) == 'undefined' || String(data) == 'null') {
        return ''
    } else {
        return data
    }
}

function f(status) {
   responsiveVoice.speak(status,'Korean Female');
}

function _fnMakeJson(data) {
    if (data != undefined) {
        var str = JSON.stringify(data);
        if (str.indexOf("[") == -1) {
            str = "[" + str + "]";
        }
        return str;
    }
}