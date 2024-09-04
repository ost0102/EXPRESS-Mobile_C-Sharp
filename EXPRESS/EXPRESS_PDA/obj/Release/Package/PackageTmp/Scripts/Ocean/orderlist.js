$(function () {
    // 시작 날짜와 종료 날짜 Datepicker 초기화 및 설정
    $('#StartDate, #EndDate').datepicker({
        dateFormat: "yy-mm-dd"
    });

    // 시작 날짜 Datepicker 설정
    $('#StartDate').datepicker("option", "onClose", function (selectedDate) {
        // 날짜 형식 검증 및 파싱
        var regex = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (regex.test(selectedDate)) {
            var dateParts = selectedDate.split("-");
            var year = parseInt(dateParts[0], 10);
            var month = parseInt(dateParts[1], 10) - 1; // Date 객체의 월은 0부터 시작
            var day = parseInt(dateParts[2], 10);
            var date = new Date(year, month, day);

            // 유효한 날짜인지 확인
            if (date && !isNaN(date.getTime())) {
                $("#EndDate").datepicker("option", "minDate", date);
            } else {
                // 오류 처리: 날짜가 유효하지 않은 경우 사용자에게 알림
                alert("유효하지 않은 시작 날짜입니다. 올바른 날짜를 입력해주세요.");
            }
        } 
    });

    // 종료 날짜 Datepicker 설정
    $('#EndDate').datepicker("option", {
        onClose: function (selectedDate) {
            // 선택한 종료 날짜를 기반으로 시작 날짜의 최대 날짜 설정
            $("#StartDate").datepicker("option", "maxDate", selectedDate);
        }
    });

    // 시작 및 종료 날짜 입력 필드에서 blur 이벤트 처리
    $("#StartDate, #EndDate").on("blur", function () {
        var val = $(this).val();
        var regex = /^(\d{4})(\d{2})(\d{2})$/;

        if (regex.test(val)) {
            var dateArray = val.match(regex);
            var year = dateArray[1];
            var month = dateArray[2];
            var day = dateArray[3];

            var formattedDate = year + "-" + month + "-" + day;
            $(this).val(formattedDate);

            var dateObject = new Date(year, month - 1, day);
            $(this).datepicker("setDate", dateObject);
        }
    });
});