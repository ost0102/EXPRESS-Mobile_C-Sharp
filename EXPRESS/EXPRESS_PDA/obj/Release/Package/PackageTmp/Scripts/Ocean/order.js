//전역변수 
var dataView = new Slick.Data.DataView();
var grid;
var columns;
var checkboxSelector;
var MasterData; var HouseData; var SkuData = [];
var vETA; var vVSL; var vVOY; var vMRN_NO; var vMSN_NO; var vMBL_NO; var vLINE_CD; var vPTN_CD; var vPOL_CD; var vPOD_CD;
var objDs = new Array();
$(function () {

    // 컬럼
    columns = [
        { id: "HBL_NO", name: "House Number", field: "HBL_NO", sortable: true, resizable: false, width: 120 },
        { id: "SHP_NM_ENG", name: "Shipper Name", field: "SHP_NM_ENG", resizable: false, width: 120 },
        { id: "SHP_ADDR", name: "Shipper Address", field: "SHP_ADDR", resizable: false, width: 120 },
        { id: "CNE_NM_ENG", name: "Consignee Name", field: "CNE_NM_ENG", resizable: false, width: 120 },
        { id: "CNE_ADDR", name: "Consignee Address", field: "CNE_ADDR", resizable: false, width: 120 },
        { id: "NFY_NM_ENG", name: "Notify Name", field: "NFY_NM_ENG", resizable: false, width: 120 },
        { id: "MAIN_ITEM_NM_LOC", name: "中文品名", field: "MAIN_ITEM_NM_LOC", resizable: false, width: 120 },
        { id: "MAIN_ITEM_NM", name: "Description", field: "MAIN_ITEM_NM", resizable: false, width: 120 },
        { id: "PKG", name: "C/T", field: "PKG", resizable: false, width: 120 },
        { id: "PKG_UNIT_CD", name: "Pieces Unit", field: "PKG_UNIT_CD", resizable: false, width: 120 },
        { id: "GRS_WGT", name: "W/T", field: "GRS_WGT", resizable: false, width: 120 },
        { id: "VOL_WGT", name: "Volume", field: "VOL_WGT", resizable: false, width: 120 },
        { id: "CUSTOMS_CI_VALUE", name: "Value(US$)", field: "CUSTOMS_CI_VALUE", resizable: false, width: 120 },
        { id: "WH_CD", name: "WareHouse", field: "WH_CD", resizable: false, width: 120 },
        { id: "CNTR_NO", name: "Container Number", field: "CNTR_NO", resizable: false, width: 120 },
        { id: "CNTR_TYPE", name: "Container Type", field: "CNTR_TYPE", resizable: false, width: 120 },
        { id: "SEAL_NO1", name: "Seal1", field: "SEAL_NO1", resizable: false, width: 120 },
        { id: "SEAL_NO2", name: "Seal2", field: "SEAL_NO2", resizable: false, width: 120 },
        { id: "SEAL_NO3", name: "Seal3", field: "SEAL_NO3", resizable: false, width: 120 },
        { id: "CNTR_PKG", name: "C/T", field: "CNTR_PKG", resizable: false, width: 120 },
        { id: "CNTR_PKG_UNIT_CD", name: "Pieces Unit", field: "CNTR_PKG_UNIT_CD", resizable: false, width: 120 },
        { id: "SHP_CTRY_CD", name: "발송국가코드", field: "SHP_CTRY_CD", resizable: false, width: 120 },
        { id: "CNE_USE_TYPE", name: "용도구분", field: "CNE_USE_TYPE", resizable: false, width: 120 },
        { id: "SHP_TYPE", name: "화물운송주선업자부호", field: "SHP_TYPE", resizable: false, width: 120 },
        { id: "CNE_TEL_NO", name: "수하인전화번호", field: "CNE_TEL_NO", resizable: false, width: 120 },
        { id: "RMK", name: "비고", field: "RMK", resizable: false, width: 120 },
        { id: "WT_PC", name: "중국결재/착불", field: "WT_PC", resizable: false, width: 120 },
        { id: "SHP_ZIP_NO", name: " Zip Code", field: "SHP_ZIP_NO", resizable: false, width: 120 },
        { id: "WURL", name: "홈페이지 URL주소", field: "WURL", resizable: false, width: 120 },
        { id: "CUSTOM_IMP_TYPE", name: "물품타입", field: "CUSTOM_IMP_TYPE", resizable: false, width: 120 },
        { id: "CUSTOM_EXP_HS_CD", name: "HS CODE", field: "CUSTOM_EXP_HS_CD", resizable: false, width: 120 },
        //{ id: "PKG_UNIT_CD", name: "사업자(주민번호)", field: "PKG_UNIT_CD" },
        { id: "INNER_PKG", name: "총수량", field: "INNER_PKG", resizable: false, width: 120 },
        { id: "CNE_REG_NO", name: "개인통관고유부호", field: "CNE_REG_NO", resizable: false, width: 120 },
        { id: "CNTR_AGT_CD", name: "대리점", field: "CNTR_AGT_CD", resizable: false, width: 120 },
        { id: "WURL_ID", name: "작성자", field: "WURL_ID", resizable: false, width: 120 },
        { id: "SHP_TEL_NO", name: "송하인전화번호", field: "SHP_TEL_NO", resizable: false, width: 120 },
        { id: "CNE_NM_LOC", name: "수하인 한글 상호", field: "CNE_NM_LOC", resizable: false, width: 120 },
        { id: "CNE_ADDR_LOC", name: "수하인 한글 주소", field: "CNE_ADDR_LOC", resizable: false, width: 120 },
        { id: "PROXY_TYPE", name: "전자상거래유형코드", field: "PROXY_TYPE", resizable: false, width: 120 },
        { id: "FRGN_PROXY_CD", name: "해외판매자부호", field: "FRGN_PROXY_CD", resizable: false, width: 120 },
        { id: "FRGN_PROXY_NM", name: "해외판매자명", field: "FRGN_PROXY_NM", resizable: false, width: 120 },
        { id: "BUY_PROXY_CD", name: "구매대행업자 부호", field: "BUY_PROXY_CD", resizable: false, width: 120 },
        { id: "BUY_PROXY_NM", name: "구매대행업자명", field: "BUY_PROXY_NM", resizable: false, width: 120 },
        { id: "SELL_PROXY_CD", name: "판매중개자부호", field: "SELL_PROXY_CD", resizable: false, width: 120 },
        { id: "SELL_PROXY_NM", name: "판매중개자명", field: "SELL_PROXY_NM", resizable: false, width: 120 },
        { id: "PTN_ORD_NO", name: "주문번호", field: "PTN_ORD_NO", resizable: false, width: 100 }
    ];

    var options = {
        enableCellNavigation: true,
        enableAddRow: false,
        enableColumnReorder: true,
        forceFitColumns: true
    }

    checkboxSelector = new Slick.CheckboxSelectColumn({
        cssClass: "slick-cell-checkboxsel"
    });
    //columns.unshift(checkboxSelector.getColumnDefinition());

    grid = new Slick.Grid("#myGrid", dataView, columns, options);

    //customTooltipPlugin = new Slick.Plugins.CustomTooltip();
    //grid.setSelectionModel(new Slick.CellSelectionModel());
    //grid.registerPlugin(customTooltipPlugin);

    //grid.registerPlugin(checkboxSelector);

    var selectedRows = [];
    selectActiveRow = false;
    grid.setSelectionModel(new Slick.RowSelectionModel({
        selectActiveRow: false
    }));

    grid.onClick.subscribe(function (e, args) {
        if (selectActiveRow) {
            if ($.inArray(args.row, selectedRows) === -1) {
                selectedRows = [];
                selectedRows.push(args.row)
            } else {
                selectedRows = [];
            }
        } else {
            ($.inArray(args.row, selectedRows) === -1) ? selectedRows.push(args.row) : selectedRows.splice(selectedRows.indexOf(args.row), 1);
        }
        grid.setSelectedRows(selectedRows);

    });

    //var pager = new Slick.Controls.Pager(dataView, grid, "#pager");
    //var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);


    var selectedTitles = '';

    grid.onSelectedRowsChanged.subscribe(function (e, args) {
        var grid = args && args.grid;
        var sortedSelectedRows = args.rows.sort(function (a, b) { return a - b });
        // get titles for all selected rows
        if (Array.isArray(sortedSelectedRows)) {
            selectedTitles = args.rows.map(function (row, idx) {
                var item = grid.getDataItem(idx);

                return {
                    SHP_ZIP_NO: item && item.SHP_ZIP_NO || '',
                    CNE_REG_NO: item && item.CNE_REG_NO || '',
                    CNE_NM_LOC: item && item.CNE_NM_LOC || '',
                    CNE_TEL_NO: item && item.CNE_TEL_NO || '',
                    CNE_USE_TYPE: item && item.CNE_USE_TYPE || ''

                }
            });
        }
        //console.log(selectedTitlesZip);

    });


    grid.onSort.subscribe(function (e, args) {
        var comparer = function (a, b) {
            var x = a[args.sortCol.field], y = b[args.sortCol.field];
            return (x === y ? 0 : (x > y ? 1 : -1));
        };
        dataView.sort(comparer, args.sortAsc);
    });

    // 로딩 바 엘리먼트에 데이터 로딩 진행 상태를 반영
    dataView.onRowCountChanged.subscribe(function (e, args) {
        grid.updateRowCount();
        grid.render();
    });

    dataView.onRowsChanged.subscribe(function (e, args) {
        grid.invalidateRows(args.rows);
        grid.render();
    });

    //dataView.onPagingInfoChanged.subscribe((e, pagingInfo) => {
    //    grid.updatePagingStatusFromView(pagingInfo);
    //    // show the pagingInfo but remove the dataView from the object, just for the Cypress E2E test
    //    delete pagingInfo.dataView;
    //    console.log('on After Paging Info Changed - New Paging:: ', pagingInfo);
    //});

    //dataView.onBeforePagingInfoChanged.subscribe((e, previousPagingInfo) => {
    //    // show the previous pagingInfo but remove the dataView from the object, just for the Cypress E2E test
    //    delete previousPagingInfo.dataView;
    //    console.log('on Before Paging Info Changed - Previous Paging:: ', previousPagingInfo);
    //});

    grid.onBeforeAppendCell.subscribe(function (e, args) {
        return customCellValidation(grid, args);
    });

});

//엑셀업로드 
$(document).on('click', '#btnSave', function () {
    var fileInput = document.getElementById("fileInput");
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: "array" });
            var sheetName = workbook.SheetNames[0];
            var sheet = workbook.Sheets[sheetName];
            var jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Assuming the data structure in the Excel file is:
            // | ID | Name | Value |

            vETA = jsonData[0][1];//Arrival Date
            vVSL = jsonData[1][1]; //Vessel Name
            vVOY = jsonData[2][1]; //Voyage No/CALL SIGN
            vMRN_NO = jsonData[3][1]; //MRN
            vMSN_NO = jsonData[4][1]; //MSN
            vMBL_NO = jsonData[5][1]; //MBL_NO
            vLINE_CD = jsonData[1][3]; //LINE CODE
            vPTN_CD = jsonData[2][3]; //PARTNER
            vPOL_CD = jsonData[3][3]; //출발지
            vPOD_CD = jsonData[4][3]; //도착지

            MasterData = [vETA, vVSL, vVOY, vMRN_NO, vMSN_NO, vMBL_NO, vLINE_CD, vPTN_CD, vPOL_CD, vPOD_CD];
            //jsonArray = JSON.parse(JSON.stringify(MasterData));
            //objDs.MST = jsonArray;
            HouseData = jsonData.slice(7).map(function (row, index) {
                return {
                    id: index + 1, HBL_NO: row[0], SHP_NM_ENG: row[1], SHP_ADDR: row[2], CNE_NM_ENG: row[3], CNE_ADDR: row[4], NFY_NM_ENG: row[5]
                    , MAIN_ITEM_NM_LOC: row[6], MAIN_ITEM_NM: row[7], PKG: row[8], PKG_UNIT_CD: row[9], GRS_WGT: row[10], VOL_WGT: row[11], CUSTOMS_CI_VALUE: row[12]
                    , WH_CD: row[13], CNTR_NO: row[14], CNTR_TYPE: row[15], SEAL_NO1: row[16], SEAL_NO2: row[17], SEAL_NO3: row[18], CNTR_PKG: row[19]
                    , CNTR_PKG_UNIT_CD: row[20], SHP_CTRY_CD: row[21], CNE_USE_TYPE: row[22], SHP_TYPE: row[23], CNE_TEL_NO: row[24], RMK: row[25], WT_PC: row[26]
                    , SHP_ZIP_NO: row[27], WURL: row[28], CUSTOM_IMP_TYPE: row[29], CUSTOM_EXP_HS_CD: row[30], INNER_PKG: row[32], CNE_REG_NO: row[33], CNTR_AGT_CD: row[34]
                    , WURL_ID: row[35], SHP_TEL_NO: row[36], CNE_NM_LOC: row[37], CNE_ADDR_LOC: row[38], PROXY_TYPE: row[39], FRGN_PROXY_CD: row[40], FRGN_PROXY_NM: row[41]
                    , BUY_PROXY_CD: row[42], BUY_PROXY_NM: row[43], SELL_PROXY_CD: row[44], SELL_PROXY_NM: row[45], PTN_ORD_NO: row[46]
                };
            });
            //jsonArray = JSON.parse(JSON.stringify(HouseData));
            //objDs.HBL = jsonArray;
            for (var i = 7; i < jsonData.length; i++) {
                var rowData = jsonData[i];
                for (var j = 47; j < rowData.length; j += 5) {
                    var tempArray = [];
                    tempArray.push(rowData[0]);
                    for (var k = 0; k < 5; k++) {
                        tempArray.push(rowData[j + k]);
                    }
                    SkuData.push(tempArray);
                }
            }

            //jsonArray = JSON.parse(JSON.stringify(SkuData));
            //objDs.SKU = jsonArray;

            dataView.setItems(HouseData);

            //dataView.setPagingOptions({
            //    pageSize: 30  // 페이지당 표시할 항목 수,
            //});
            // Update the grid
            columns.unshift(checkboxSelector.getColumnDefinition());
            grid.setColumns(columns);
            grid.registerPlugin(checkboxSelector);
            grid.invalidate();
            grid.render();
            layerClose("#_Upload");
        };

        reader.readAsArrayBuffer(file);
    }
});

var errorIndexes = []; // 에러가 발생한 셀의 인덱스를 저장할 배열

////그리드 저장
//$(document).on('click', '#saveGrid', async function () {
//    layerPopup("#ProgressPop");
//    await Progress_Gaze("0"); // await를 사용하기 위해 async 함수로 변경
//        // 체크된 행의 인덱스를 가져옴
//        var selectedRows = grid.getSelectedRows();

//    selectedRows.forEach(async function (rowIndex) {
//            try {
//                var rowData = grid.getDataItem(rowIndex);
//                var zip = rowData.SHP_ZIP_NO;
//                console.log(zip);
//                console.log(rowIndex);
//                if (!checkSearchedWord(zip)) {
//                    errorIndexes.push(index); // 에러가 발생한 셀의 인덱스 저장
//                }
//                await GetAddr(zip, rowIndex);
//            } catch (error) {
//                $("#Addr_Confirm").attr({ src: "/Images/pro_yet.png" });
//                $("#Addr_Div").attr({ class: "pro_stat error" });
//                /*throw new Exception("예외를 일부러 발생시킵니다.");*/
//            }
//        });
//        await Progress_Gaze("25");

//});
var test = false;


$(document).on('click', '#saveGrid', async function () {
    layerPopup("#ProgressPop");
    await Progress_Gaze("0"); // await를 사용하기 위해 async 함수로 변경
    // 체크된 행의 인덱스를 가져옴
    var selectedRows = grid.getSelectedRows();


    for (const rowIndex of selectedRows) {
        try {
            var rowData = grid.getDataItem(rowIndex);
            var zip = rowData.SHP_ZIP_NO;
            console.log(zip);
            console.log(rowIndex);
            if (!checkSearchedWord(zip)) {
                errorIndexes.push(rowIndex); // 에러가 발생한 셀의 인덱스 저장
                $("#Addr_Confirm").attr({ src: "/Images/pro_yet.png" });
                $("#Addr_Div").attr({ class: "pro_stat error" });
                test = true;
                break; // 에러 발생 시 중단
            }
            await GetAddr(zip, rowIndex);
        } catch (error) {
            test = true;
            console.error("에러가 발생했습니다:", error.message);
            $("#Addr_Confirm").attr({ src: "/Images/pro_yet.png" });
            $("#Addr_Div").attr({ class: "pro_stat error" });
            break; // 에러 발생 시 API 호출 중단`
        }
    }

    if (!test) {
        await Progress_Gaze("25");
    } else {
        return false;
    }

    for (const rowIndex of selectedRows) {
        alert("개인통관부호 시작");
        try {
            var rowData = grid.getDataItem(rowIndex);

            var person_type = rowData.CNE_USE_TYPE;
            var person_no = rowData.CNE_REG_NO;
            var person_name = rowData.CNE_NM_LOC;
            var person_tel = rowData.CNE_TEL_NO.replace(/-/g, "").trim();
            if (person_type == "1") {
                PerSonKey(person_no, person_name, person_tel, rowIndex);
            }
        } catch (error) {
            test = true;
            $("#Person_Confirm").attr({ src: "/Images/pro_yet.png" });
            $("#Person_Div").attr({ class: "pro_stat error" });
            throw new Error("예외를 일부러 발생시킵니다.");
            break; // 에러 발생 시 API 호출 중단`
        }
    }
    if (!test) {
        await Progress_Gaze("50");
    }

});

$(document).ready(function () {
    $('.dash-progress__bar').each(function () {
        // 클래스 이름에서 퍼센트를 추출합니다.
        var className = $(this).attr('class');
        var percentage = className.match(/per(\d+)/)[1];

        // 너비를 0으로 초기화합니다.
        $(this).css('width', '0');

        // 해당 퍼센트로 너비를 부드럽게 변경합니다.
        $(this).animate({
            width: percentage + "%"
        }, 900);
    });

    //setInterval(function () {
    //    $('.pro_stat-text p').fadeOut(500, function () {
    //        $(this).fadeIn(300);
    //    });
    //}, 500);

});

$(document).on('click', '#DelteOrderNum', function () {
    $(this).siblings('input').val('');
})

$(document).on('click', '#ExcelUpload', function () {
    //$('body').addClass('layer_on');
    //$('#_Upload').show();

    layerPopup("#_Upload");
});

$(window).on('load', function () {
    fileCus();
})

// 펑션 구간 //
//완성
function PerSonKey(person_no, person_name, person_tel, index) {
    try {
        // AJAX 요청을 보냄
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/Home/TestData1", false); // false로 설정하여 동기적으로 처리
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var result = xhr.responseText;
                    if ($(result).find('tCnt').text() == "0") {
                        errorIndexes.push(index);
                        test = true;
                        $("#Person_Confirm").attr({ src: "/Images/pro_yet.png" });
                        $("#Person_Div").attr({ class: "pro_stat error" });
                        throw new Error("예외를 일부러 발생시킵니다.");
                        return false;
                    }
                    console.log(person_no);
                    console.log(result);
                } else {
                    console.error('에러 발생:', xhr.status);
                    test = true;
                    // 에러 처리 로직 추가
                    throw new Error("예외를 일부러 발생시킵니다.");
                }
            }
        };

        xhr.send("person_no=" + person_no + "&person_name=" + person_name + "&person_tel=" + person_tel);
    } catch (error) {
        // 예외 발생 시 실행할 로직
        $("#Person_Confirm").attr({ src: "/Images/pro_yet.png" });
        $("#Person_Div").attr({ class: "pro_stat error" });
    }
}


function Progress_Gaze(percent) {
    return new Promise(resolve => {
        
        if (percent == "25") {
            $("#Addr_Confirm").attr({ src: "/Images/pro_complete.png" });
            $("#Addr_Div").attr({ class: "pro_stat complete" });
        } else if (percent == "50") {
            $("#Person_Confirm").attr({ src: "/Images/pro_complete.png" });
            $("#Person_Div").attr({ class: "pro_stat complete" });
        } else if (percent == "75") {
            $("#Test_Confirm").attr({ src: "/Images/pro_complete.png" });
            $("#Test_Div").attr({ class: "pro_stat complete" });
        } else if (percent == "100") {
            $("#Eng_Confirm").attr({ src: "/Images/pro_complete.png" });
            $("#Eng_Div").attr({ class: "pro_stat complete" });
        }


        $('.dash-progress__bar').animate({
            width: percent + "%"
        }, 900, resolve);
        $("#Progress_percent").text(percent);
    });
}


//완성본
async function GetAddr(zip, index) {
    // AJAX 요청을 보냄
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://business.juso.go.kr/addrlink/addrLinkApi.do?keyword=" + zip + "&confmKey=devU01TX0FVVEgyMDI0MDIxMzE1NDAyMjExNDUxMjc=&resultType=json", false); // false로 설정하여 동기적으로 처리
    xhr.send();

    // 요청이 성공했을 때의 처리
    if (xhr.status == 200) {
        var jsonStr = JSON.parse(xhr.responseText);
        console.log(zip);
        console.log(jsonStr);
        if (jsonStr != null) {
            //주소기반산업지원서비스 api 이용 토탈 카운트 0인경우가 우편번호가 없는 경우입니다.
            if (jsonStr.results.common.totalCount == "0") {
                errorIndexes.push(index);
                test = true;
                throw new Error("예외를 일부러 발생시킵니다.");
            }
        }
    } else {
        console.error('API 호출 중 오류 발생:', xhr.status);
        // 에러 처리 로직 추가
        throw new Error("API 호출 중 오류 발생");
        test = true;

    }
}


function fileCus() {
    $(document).on("change", ".file_cus input[type=file]", function () {
        const fileName = $(this).val().split("\\").pop();
        $(this).siblings(".file_name").text(fileName || "파일을 선택해주세요.");
    });
}


function customCellValidation(grid, args) {
    if (
        grid.getColumns()[args.cell].id !== 'HBL_NO' &&
        grid.getColumns()[args.cell].id !== 'SHP_NM_ENG' &&
        grid.getColumns()[args.cell].id !== 'SHP_ADDR' &&
        grid.getColumns()[args.cell].id !== 'CNE_NM_ENG' &&
        grid.getColumns()[args.cell].id !== 'CNE_ADDR' &&
        grid.getColumns()[args.cell].id !== 'MAIN_ITEM_NM' &&
        grid.getColumns()[args.cell].id !== 'PKG' &&
        grid.getColumns()[args.cell].id !== 'PKG_UNIT_CD' &&
        grid.getColumns()[args.cell].id !== 'GRS_WGT' &&
        grid.getColumns()[args.cell].id !== 'VOL_WGT' &&
        grid.getColumns()[args.cell].id !== 'CUSTOMS_CI_VALUE' &&
        grid.getColumns()[args.cell].id !== 'WH_CD' &&
        grid.getColumns()[args.cell].id !== 'CNTR_NO' &&
        grid.getColumns()[args.cell].id !== 'CNTR_TYPE' &&
        grid.getColumns()[args.cell].id !== 'SEAL_NO1' &&
        grid.getColumns()[args.cell].id !== 'CNTR_PKG' &&
        grid.getColumns()[args.cell].id !== 'CNTR_PKG_UNIT_CD' &&
        grid.getColumns()[args.cell].id !== 'SHP_CTRY_CD' &&
        grid.getColumns()[args.cell].id !== 'CNE_USE_TYPE' &&
        grid.getColumns()[args.cell].id !== 'CNE_TEL_NO' &&
        grid.getColumns()[args.cell].id !== 'CUSTOM_IMP_TYPE' &&
        grid.getColumns()[args.cell].id !== 'INNER_PKG' &&
        grid.getColumns()[args.cell].id !== 'CNE_NM_LOC'
    ) {
        return null;
    }

    if (args.value == null || args.value === "") {
        return "red";
    }

    if (grid.getColumns()[args.cell].id == 'HBL_NO' && args.value.length > 20) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'SHP_NM_ENG' && args.value.length > 100) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'SHP_ADDR' && args.value.length > 150) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'CNE_NM_ENG' && args.value.length > 100) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'CNE_ADDR' && args.value.length > 150) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'MAIN_ITEM_NM' && args.value.length > 200) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'PKG' && args.value.length > 10) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'PKG_UNIT_CD' && args.value.length > 2) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'GRS_WGT' && args.value.length > 20) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'VOL_WGT' && args.value.length > 16) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'CUSTOMS_CI_VALUE' && args.value.length > 19) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'WH_CD' && args.value.length > 8) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'CNTR_NO' && args.value.length > 11) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'CNTR_TYPE' && args.value.length > 4) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'SEAL_NO1' && args.value.length > 10) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'CNTR_PKG' && args.value.length > 10) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'CNTR_PKG_UNIT_CD' && args.value.length > 2) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'SHP_CTRY_CD' && args.value.length > 2) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'CNE_USE_TYPE' && args.value.length > 1) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'CNE_TEL_NO' && args.value.length > 40) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'INNER_PKG' && args.value.length > 8) {
        return "red";
    }
    if (grid.getColumns()[args.cell].id == 'CNE_NM_LOC' && args.value.length > 100) {
        return "red";
    }
    return null;
}


//특수문자, 특정문자열(sql예약어의 앞뒤공백포함) 제거
function checkSearchedWord(obj) {
    if (obj.length > 0) {
        //특수문자 제거
        var expText = /[%=><]/;
        if (expText.test(obj) == true) {
            //alert("특수문자를 입력 할수 없습니다.");
            obj = obj.split(expText).join("");
            return false;
        }

        if (obj.length != 5) {
            //alert("우편번호 형식에 맞게 적어주세요. ex) 숫자 5글자");
            return false;
        }

        var regex = /^\d+$/;
        if (!regex.test(obj)) {
            console.log(obj);
            //alert("숫자만 입력하십시오");
            return false;
        };

        //특정문자열(sql예약어의 앞뒤공백포함) 제거
        var sqlArray = new Array(
            //sql 예약어
            "OR", "SELECT", "INSERT", "DELETE", "UPDATE", "CREATE", "DROP", "EXEC",
            "UNION", "FETCH", "DECLARE", "TRUNCATE"
        );

        var regex;
        for (var i = 0; i < sqlArray.length; i++) {
            regex = new RegExp(sqlArray[i], "gi");

            if (regex.test(obj)) {
                alert("\"" + sqlArray[i] + "\"와(과) 같은 특정문자로 검색할 수 없습니다.");
                obj = obj.replace(regex, "");
                return false;
            }
        }
    }
    return true;
}



    //grid.onClick.subscribe(function (e, args) {
    //    var row = args.row;
    //    var item = grid.getDataItem(row);
    //    item.checkbox = !item.checkbox;

    //    // 해당 행을 업데이트하여 변경 사항을 반영합니다.
    //    grid.updateRow(row);
    //});

    //grid.onRendered.subscribe(function () {
    //    setTimeout(function () {
    //        for (var row = 0; row < grid.getDataLength(); row++) {
    //            var cellNode = grid.getCellNode(row, 0); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.HBL_NO + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); 
    //            }
    //            else if (tooltipText.length > 20) {
    //                $(cellNode).attr("title", "20글자 이하로 입력해주세요"); 
    //            }

    //            var cellNode = grid.getCellNode(row, 1); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.SHP_NM_ENG + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            }

    //            var cellNode = grid.getCellNode(row, 2); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.SHP_ADDR + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 100) {
    //                $(cellNode).attr("title", "100글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 3); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.CNE_NM_ENG + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 100) {
    //                $(cellNode).attr("title", "100글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 4); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.CNE_ADDR + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 150) {
    //                $(cellNode).attr("title", "150글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 7); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.MAIN_ITEM_NM + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 200) {
    //                $(cellNode).attr("title", "200글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 8); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.PKG + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 10) {
    //                $(cellNode).attr("title", "10글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 9); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.PKG_UNIT_CD + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 2) {
    //                $(cellNode).attr("title", "2글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 10); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.GRS_WGT + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 16) {
    //                $(cellNode).attr("title", "16글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 11); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.VOL_WGT + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 12) {
    //                $(cellNode).attr("title", "12글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 12); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.CUSTOMS_CI_VALUE + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 16) {
    //                $(cellNode).attr("title", "16글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 13); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.WH_CD + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 8) {
    //                $(cellNode).attr("title", "8글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 14); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.CNTR_NO + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 11) {
    //                $(cellNode).attr("title", "11글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 15); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.CNTR_TYPE + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 4) {
    //                $(cellNode).attr("title", "4글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 16); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.SEAL_NO1 + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 10) {
    //                $(cellNode).attr("title", "10글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 19); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.CNTR_PKG + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 10) {
    //                $(cellNode).attr("title", "10글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 20); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.CNTR_PKG_UNIT_CD + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 2) {
    //                $(cellNode).attr("title", "2글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 21); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.SHP_CTRY_CD + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 2) {
    //                $(cellNode).attr("title", "2글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 22); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.CNE_USE_TYPE + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 1) {
    //                $(cellNode).attr("title", "1글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 24); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.CNE_TEL_NO + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 40) {
    //                $(cellNode).attr("title", "40글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 29); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.CUSTOM_IMP_TYPE + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 1) {
    //                $(cellNode).attr("title", "1글자 이하로 입력해주세요");
    //            }

    //            var cellNode = grid.getCellNode(row, 31); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.INNER_PKG + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 8) {
    //                $(cellNode).attr("title", "8글자 이하로 입력해주세요");
    //            }


    //            var cellNode = grid.getCellNode(row, 36); // Get cell node of the first column
    //            var rowData = grid.getDataItem(row); // Get data of the current row
    //            var tooltipText = rowData.CNE_ADDR_LOC + ""; // Set tooltip content to the 'description' field
    //            if (tooltipText == "undefined" || tooltipText == "") {
    //                $(cellNode).attr("title", "값이 비었습니다"); // Set tooltip attribute for the cell node
    //            } else if (tooltipText.length > 100) {
    //                $(cellNode).attr("title", "100글자 이하로 입력해주세요");
    //            }
    //        }
    //    }, 0);
    //});