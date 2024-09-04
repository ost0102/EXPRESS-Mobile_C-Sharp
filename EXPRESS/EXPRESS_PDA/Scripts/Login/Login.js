$(function () {
    //로그인 아이디 저장 체크가 되어있을 시 데이터 넣는 로직
    var userInputId = _fnGetCookie("Prime_CK_USR_ID_REMEMBER_EXP");
    var userCustCd = _fnGetCookie("Prime_CK_CUST_CD_REMEMBER_EXP");
    if (_fnToNull(userInputId) != "")
        $("#CUST_CD").val(userCustCd);{
        $("#USR_ID").val(userInputId);
        $("#login_keep").replaceWith("<input type='checkbox' id='company_login_keep' name='login_keep' checked>");
        $("#USR_PWD").focus();
    }

    $("#USR_ID").focus();

    $("#USR_ID").keyup(function (e) {
        if (e.keyCode == 13) {
            $("#USR_PWD").focus();
        }
    });

    $("#USR_PWD").keyup(function (e) {
        if (e.keyCode == 13) {
            $(".login-btn").click();
        }
    });
});

$(document).on('click', '.alignBox', function () {
    $(this).children($('.checkbox')).prop('checked', false);
    $(this).children($('.checkbox')).prop('checked', true);
});

$(document).on('click', '#AlertClose', function () {
    $(this).parents('.layer_zone').hide();
});



$(document).on('click', '.login-btn', function () {
    if (_fnToNull($("#CUST_CD").val()) == "") {
        $(".warn_office").show();
        $(".warn_id").hide();
        $(".warn_pw").hide();
        $(".warn_login").hide();
        return false;
    }

    if (_fnToNull($("#USR_ID").val()) == "") {
        $(".warn_office").hide();
        $(".warn_id").show();
        $(".warn_pw").hide();
        $(".warn_login").hide();
        return false;
    }

    if (_fnToNull($("#USR_PWD").val()) == "") {
        $(".warn_office").hide();
        $(".warn_id").hide();
        $(".warn_pw").show();
        $(".warn_login").hide();
        return false;
    }
    var objJsonData = new Object();
    objJsonData.USR_ID = $("#USR_ID").val().toUpperCase();
    objJsonData.PSWD = $("#USR_PWD").val().toUpperCase();
    objJsonData.CUST_CD = $("#CUST_CD").val().toUpperCase();

    $.ajax({
        type: "POST",
        url: "/Login/fnLogin",
        async: false,
        dataType: "json",
        data: { "vJsonData": _fnMakeJson(objJsonData) },
        success: function (result) {

            if (JSON.parse(result).Result[0]["trxCode"] == "Y") {

                if (_fnToNull(JSON.parse(result).Table1[0].USR_ID) != "") {
                    if ($('input[name=login_keep]')[0].checked) {
                        _fnSetCookie("Prime_CK_CUST_CD_REMEMBER_EXP", JSON.parse(result).Table1[0].OFFICE_CD, "168");
                        _fnSetCookie("Prime_CK_USR_ID_REMEMBER_EXP", JSON.parse(result).Table1[0].USR_ID, "168");
                    } else {
                        _fnDelCookie("Prime_CK_USR_ID_REMEMBER_EXP");
                    }

                    $.ajax({
                        type: "POST",
                        url: "/Login/SaveLogin",
                        async: true,
                        data: { "vJsonData": _fnMakeJson(JSON.parse(result)) },
                        success: function (result, status, xhr) {
                            if (_fnToNull(result) == "Y") {
                                    window.location = window.location.origin + "/Ocean/order";
                            } else {
                                window.location = window.location.origin;
                            }
                        }
                    });
                } else {
                    _fnAlertMsg("로그인 정보가 없습니다. 다시 시도해주세요.");
                }
            }
            else if (JSON.parse(result).Result[0]["trxCode"] == "N") {
                _fnAlertMsg("로그인 정보가 없습니다. 다시 시도해주세요.");
            }
            else {
                _fnAlertMsg("잘못된 업체코드 입니다. 다시 시도해주세요.");
            }
        }, error: function (xhr, status, error) {
            status = true;
            console.log(error);
            _fnAlertMsg("잘못된 업체코드 입니다. 다시 시도해주세요.");
        }
    });
});




function _fnAlertMsg(msg) {
    $("#alert01 .alert_cont .inner p").text("");
    $("#alert01 .alert_cont .inner p").text(msg);
    layerPopup('#alert01');
}

function _fnToNull(data) {
    // undifined나 null을 null string으로 변환하는 함수. 
    if (String(data) == 'undefined' || String(data) == 'null') {
        return ''
    } else {
        return data
    }
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