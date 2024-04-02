$(document).ready(function(){
    const arr = ['watchlist/index', 'portfolio/index', 'order/index_v1', 'order/orderhist', 'shares-transfer-out-to-external-account','market/AdvanceChart', 'market/dashboard', 'market/index/', 'market/stocks/', 'community/communityfeed'];
    if (!(arr.findIndex(x=> window.location.href.includes(x)) >= 0)) {
        GetNotionalData();
    }
    $('#btnNList').on('click', function () {
        $("#createWatchlistModal").modal('hide');
        if(window.location.href.includes("watchlist/index")){
            $("#addToWatchlistModal").modal('show');
         }else{
            window.location.href = siteRoots + '/watchlist/index'
         }
    });
    GetBasicDetails();
    setTimeout(function () {
        $(".imgDemoicon").removeClass("d-none");
        if(SelectedModeValue == null || SelectedModeValue == undefined || SelectedModeValue == "undefined" || SelectedModeValue == "")
        {
            var hasrealdemo = HasRealAccount;
            if(hasrealdemo == null || hasrealdemo == undefined || hasrealdemo == "undefined" || hasrealdemo == "")
            {}
            else if(hasrealdemo.toLowerCase() == "true")
            {
                $(".loggedpersondemo").addClass("d-none");
                $(".loggedpersonislamic").addClass("d-none");
                $(".loggedpersonregular").removeClass("d-none");
                $("#regularmode").prop('checked',true);
                $("#completeyourprofiledemopercs").hide();
                $("#usermenusubtext").hide();
            }
            else if(hasrealdemo.toLowerCase() == "false")
            {
                var currentstepIDint = parseInt(currentstepid);
                if(currentstepIDint >= 90)
                {
                    $(".imgDemoicon").addClass("d-none");
                    $("#usermenusubtext").hide();
                }
                // var currentstepIDint = parseInt(currentstepid);
                // if(currentstepIDint >= 90)
                // {
                //     $(".loggedpersondemo").addClass("d-none");
                //     $(".loggedpersonislamic").addClass("d-none");
                //     $(".loggedpersonregular").removeClass("d-none");
                //     $("#regularmode").prop('checked',true);
                //     $("#completeyourprofiledemopercs").hide();
                //     $("#usermenusubtext").hide();
                // }
                // else
                // {
                    $(".loggedpersondemo").removeClass("d-none");
                    $(".loggedpersonislamic").addClass("d-none");
                    $(".loggedpersonregular").addClass("d-none");
                    $("#demomode").prop('checked',true);
                //}
            }
        }
        else
        {
            var hasrealdemo = HasRealAccount;
            if(hasrealdemo == null || hasrealdemo == undefined || hasrealdemo == "undefined" || hasrealdemo == "")
            {}
            else if(hasrealdemo.toLowerCase() == "true")
            {
                $("#completeyourprofiledemopercs").hide();
                $("#usermenusubtext").hide();
            }
            if(SelectedModeValue == "demo")
            {
                var currentstepIDint = parseInt(currentstepid);
                if(hasrealdemo.toLowerCase() == "true" || currentstepIDint >= 90)
                {
                    $("#completeyourprofiledemopercs").hide();
                    $("#usermenusubtext").hide();
                    $(".imgDemoicon").addClass("d-none");
                }
                else
                {
                    $("#completeyourprofiledemopercs").show();
                    $("#usermenusubtext").show();
                    $(".imgDemoicon").removeClass("d-none");
                }
                
                $(".loggedpersondemo").removeClass("d-none");
                $(".loggedpersonislamic").addClass("d-none");
                $(".loggedpersonregular").addClass("d-none");
                $("#demomode").prop('checked',true);
            }
            else if(SelectedModeValue == "regular")
            {
                $(".loggedpersondemo").addClass("d-none");
                $(".loggedpersonislamic").addClass("d-none");
                $(".loggedpersonregular").removeClass("d-none");
                $("#regularmode").prop('checked',true);
            }
            else if(SelectedModeValue == "islamic")
            {
                $(".loggedpersondemo").addClass("d-none");
                $(".loggedpersonislamic").removeClass("d-none");
                $(".loggedpersonregular").addClass("d-none");
                $("#islamicmode").prop('checked',true);
                IsIslamic = 'N';
            }
        }
    }, 1500);
});

function searchScript() {
    var searchid = document.getElementById("searchStock").value;
    
    if(searchid == ""){
        $("#bindSearch").hide();
    }
    if(searchid.length >=2){

        $.ajax({
            url: siteRoots + '/Base/GetSearchScripts',
            type: 'POST',
            data: {
                id: searchid
            },
            success: function (response) {
                var html = '<ul>';
                var countrow = 0;
                for(let i = 0; i < response.responseObj.length; i++){
                    countrow++;
                    
                    var companyName = response.responseObj[i].scE_LONG_NAME;
                    companyName = companyName.toLowerCase();
                    companyName = companyName.replace(/ /g, '-');
                    companyName = companyName.replace(/---/g, '-');
                    companyName = companyName.replace(/[\])}[{(]/g, '');
                    var updownArr = "";
                    var LtpVal = response.responseObj[i].ltp;
                    var day_change = response.responseObj[i].day_change;
                    var per_change = response.responseObj[i].per_change;

                    if(LtpVal > 0) {
                        updownArr = rootFolders + "/images/up-aarow-blue.png";
                    }
                    else{
                        updownArr = rootFolders + "/images/down-arrow-red.png";
                    }

                    if(LtpVal == null ||  LtpVal == "") {
                        LtpVal = "-";
                    }
                    if(day_change == null ||  day_change == "") {
                        day_change = "-";
                    }
                    if(per_change == null ||  per_change == "") {
                        per_change = "-";
                    }
                    var tradeData = response.responseObj[i].sC_ISIN_CODE + "|" + response.responseObj[i].scE_LONG_NAME + "|" + response.responseObj[i].scE_SHORT_NAME + "|" + response.responseObj[i].sc_exchange + "|" + "|" + "|" + response.responseObj[i].is_Islamic.toLowerCase();  
                    tradeData = tradeData.toString();
                    html += '<li>' +
                        '<div class="stockwatchlist-list row">' +
                            '<div class="col-lg-8">' +
                                '<div class="d-flex">' +
                                    '<figure class="mb-0"><img src="' + rootFolders + '/images/LOGOS/' + response.responseObj[i].sC_ISIN_CODE.replace(/[^a-zA-Z0-9]/g, "")+'.png" alt="adib" onerror="this.src=\''+rootFolders+'/images/Cmp-logo.png\';">'
                                    
                                    if((response.responseObj[i].is_Islamic).toLowerCase() == "y"){
                                        html += '<figure class="islamic-stock"><img src="/images/islamic-stock.svg"> </figure>'
                                    }else{

                                    }

                                    html+='</figure>' +
                                    '<a href="' + siteRoots + '/market/stocks/' + response.responseObj[i].sC_ISIN_CODE.toLowerCase() + '/' + response.responseObj[i].sc_exchange.toLowerCase() + '" > ' +
                                        '<div class="scrip-box pt-2 ps-2">' +
                                            '<h2 class="font-CharlestonGreen font-base-black font-medium text-uppercase text-start mb-0">' + response.responseObj[i].tickeR_ID + ' | <span class="font-medium">'+response.responseObj[i].sc_exchange +'</span></h2>' +
                                            '<p class="font-SonicSilverDark font-base-semibold mb-0">' + response.responseObj[i].scE_LONG_NAME + '</p>' +
                                        '</div>' +
                                    '</a>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-lg-4">' +
                                '<div class="d-flex justify-content-between">' +
                                    '<div class="text-end font-extramedium font-CharlestonGreen font-base-black d-none">' + LtpVal + '<img src="' + updownArr + '" alt="down-arrow-red" class="ps-2">' +
                                        '<p class="text-end font-BloodOrange font-base-light pe-4">' + day_change + '<span class="font-BloodOrange font-base-light">(' + per_change + '%)</span></p>' +
                                    '</div>' +
                                    '<figure class="mb-0 pt-1 cursor d-none"><img src="' + rootFolders + '/images/bell-icon.png" alt="bell" class="img-fluid"></figure>' +
                                    '<a href="javascript:void(0)" onclick="addscripTowatchlist(\'' + response.responseObj[i].sC_ISIN_CODE + ',' +response.responseObj[i].sc_exchange+'\')">' +
                                        '<figure class="mb-0 pt-1 cursor"><img src="' + rootFolders + '/images/add-to-watchlist.png" alt="add watchlist" class="img-fluid"></figure>' +
                                    '</a>' +
                                    '<button type="button" class="btn btn-outline-black text-uppercase font-exxtrasmall font-base-semibold font-RaisinBlack mht-33 MinWidth-110" onclick="tradeClick('+i+')">trade</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</li><input type="hidden" id="'+i+'"  value="'+tradeData+'"/>'
                }
                html += '</ul>';
                $("#bindSearch").html(html);

                if(response.responseObj.includes("System.NullReferenceException") || countrow == 0){
                    $("#bindSearch").hide();
                }
                else{
                    $("#bindSearch").show();
                }
            },
            error: function (error) {
                console.log(error)
            }
        });
}
}

async function addscripTowatchlist(val){
    // var validatetokenstatus = "";
    // $.ajax({
    //     url: siteRoots + '/OnBoarding/ValidateToken',
    //     type: 'POST',
    //     async:false,
    //     success: function (response) {
    //         if (response == "0") {
    //             validatetokenstatus = "0";
    //             redirectToLogin();
    //         }
    //     },
    //     error: function (error) { 
    //     console.log(error) }
    // });
    // if(validatetokenstatus == "0"){return;}
    $("#responsemsgaddscrip").html('');
    $("#overlay").show();
        await $.ajax({
            url: siteRoots + '/Watchlist/GetWatchlistListJS',
            type: 'POST',
            data: {
            },
            success: function (response) {
                var data = response.responseobj;
                $("#overlay").hide();
                if (response.code == 0) {
                    var _html = "";
                    if (data.length > 0) {
                        for (i = 0; i < data.length; i++) {
                            var watchlistName = data[i].watchlist_nm;
                            var watchlistId = data[i].watchlist_id;
                            watchlistId = "watchlistIdgloblsh_" + watchlistId;
                            _html +=
                                '<div class="form-check col-4">' +
                                '<input class="form-check-input" type="radio" name="flexRadioDefault" id="' + watchlistId + '" Wname="' + watchlistName + '"/>' +
                                '<label class="form-check-label" for="' + watchlistId + '">' + watchlistName + '</label>' +
                                '</div>';
                        }
                        $("#globalsearchwatchlistcustomlist").html(_html);
                        $("#scripnameglobalsearch").html("");
                        $("#scripnameglobalsearch").html(val);
                        $(".autocomplete-search_stock").slideUp();
                        $("#addscripTowatchlistModal").modal('show');
                        $(".header-input-wrap").removeClass("autocomplete-show");
                    } else {
                        $("#addToWatchlistModal").modal('show');
                        $(".autocomplete-search_stock").slideUp();
                        $(".header-input-wrap").removeClass("autocomplete-show");
                        setTimeout(() => {
                            $('#watchlistName').focus();
                        },100);
                    }
                }
                else { 
                    $("#globalsearchwatchlistcustomlist").html('<div class="text-center">Some error occured. Please try again later</div>');
                    console.log(response, "error"); 
                }
            },
            error: function (error) { 
                $("#overlay").hide();
                $("#globalsearchwatchlistcustomlist").html('<div class="text-center">Some error occured. Please try again later</div>');
                console.log(error); }
        });      
}

function btnaddscriptocustomwatchlist()
{
    $("#responsemsgaddscrip").html('');
    var selectedvalrd = $('input[type=radio][name=flexRadioDefault]:checked').attr('id');
    var wname = $('input[type=radio][name=flexRadioDefault]:checked').attr('Wname');
    //alert(selectedvalrd);
    if(selectedvalrd == "" || selectedvalrd == undefined){ 
        //alert("Please select atleast one watchlist to add scrip..!!");
        $("#responsemsgaddscrip").html('Please select atleast one watchlist to add symbol.');

        return; 
    }
    selectedvalrd = selectedvalrd.replace('watchlistIdgloblsh_','');
    var ScripID = $("#scripnameglobalsearch").html();
    $("#overlay").show();
    $.ajax({
        url: siteRoots + '/Watchlist/AddScriptToWatchlist',
        type: 'POST',
        data: {
            Watchlistid: selectedvalrd,
            scripid:ScripID.split(',')
        },
        success: function (response) {
            var data = response.responseobj;
            $("#overlay").hide();
            if (response.code == 0) {
                $("#responsemsgaddscrip").html('<div class="text-center">Done! Your symbol has been successfully added to ' + wname + '.</div>');
                $("#addscripTowatchlistModal").modal('hide');
                if (window.location.href.includes("watchlist/index")) {
                    DisplayWatchlistName(wname, selectedvalrd);
                }
            } else if (response.code == 2) {
                $("#responsemsgaddscrip").html('The symbol is already added to ' + wname + '. You don\'t need to add it again.');
            }
            else {
                $("#responsemsgaddscrip").html('<div class="text-center">Some error occured. Please try again later</div>');
                console.log(response, "error");
            }
        },
        error: function (error) { 
            $("#overlay").hide();
            $("#responsemsgaddscrip").html('<div class="text-center">Some error occured. Please try again later</div>');
            console.log(error); }
    });  
}

function ExtractDoc(pdfName) {
    $.ajax({
        url: siteRoots + '/Market/GetextractDocumentsData',
        type: 'POST',
        data: {
            fileIdentityNumber: pdfName
        },
        success: function (response) {
            if (response != null || response != "") {
                window.open(response.resdata, '_blank');
            }
            else { console.log(response); }
        },
        error: function (error) {
            console.log(error)
        }
    });
}

function redirecttocompletekyc(val) {
    var rdrealdemoswitch = val;//$('input[type=radio][name=rdrealdemoswitch]:checked').attr('value');
    if (rdrealdemoswitch == "real") {
        window.location.href = siteRoots + "/onboarding/completekyc";
    }
    else if (rdrealdemoswitch == "demo") {
        window.location.href = siteRoots + "/watchlist/index";
    }
}
function tradeClick(index) {
    try {
        var data = $("#" + index).val();
        alramz.BuySell.searchAction(data, 'B', 0, 0);
        alramz.BuySell.buySellShow();

    } catch (error) {
        console.log(error);
    }
}

function getStatusDetailName(Order_status) {
    var Order_statusdetails = "";
    if (Order_status == "U") {
        Order_statusdetails = "Resume";
    }
    else if (Order_status == "N") {
        Order_statusdetails = "New";
    }
    else if (Order_status == "W") {
        Order_statusdetails = "Waiting";
    }
    else if (Order_status == "A") {
        Order_statusdetails = "Active Order";
    }
    else if (Order_status == "C") {
        Order_statusdetails = "Canceled";
    }
    else if (Order_status == "P") {
        Order_statusdetails = "Partially Filled";
    }
    else if (Order_status == "S") {
        Order_statusdetails = "Fully Filled";
    }
    else if (Order_status == "E") {
        Order_statusdetails = "Expired";
    }
    else if (Order_status == "R") {
        Order_statusdetails = "Rejected";
    }
    else if (Order_status == "T") {
        Order_statusdetails = "Sent";
    }
    else if (Order_status == "D") {
        Order_statusdetails = "Suspended";
    }
    else if (Order_status == "G") {
        Order_statusdetails = "Pending Canceled";
    }
    else if (Order_status == "H") {
        Order_statusdetails = "Pending Modify";
    }
    else if (Order_status == "O") {
        Order_statusdetails = "Outstanding";
    }
    else if (Order_status == "B") {
        Order_statusdetails = "Traded";
    }
    else if (Order_status == "F") {
        Order_statusdetails = "Pending New";
    }
    else if (Order_status == "Z") {
        Order_statusdetails = "Private Order";
    }
    else if (Order_status == "L") {
        Order_statusdetails = "Unplaced order";
    }
    else if (Order_status == "X") {
        Order_statusdetails = "Inactive Trigger";
    }
    else {
        Order_statusdetails = "";
    }
    return Order_statusdetails;
}

function getValidity(OValidity) {
    if (OValidity == "0001") {
        OValidity = "DAY";
    }
    else if (OValidity == "0002") {
        OValidity = "GTC";
    }
    else if (OValidity == "0003") {
        OValidity = "GTD";
    }
    else { }

    return OValidity;
}

function redirectToLogin() {
    // console.log("window.siteRoots : " + window.siteRoots);
    // console.log("window.siteRoot : " + window.siteRoot);
    $('#checkloginsesModalModal .modal-body h3').text('For your security, your session has expired.');
    $("#checkloginsesModalModal").modal('show');
    $("#overlay").show();
    setTimeout(function () {
        window.location.href = siterootvalLoginses;
    }, 2000);
    //window.location.href = window.siteRoots;
}

function GetBasicDetails() {
    $.ajax({
        url: siteRoots + '/OnBoarding/GetBasicDetailsJS',
        type: 'POST',
        data: {
        },
        success: function (response) {
            if (response != null || response != "") {
                if (!response) {
                    console.log(response);
                }
                else if (response.code < 0) {
                    console.log(response);
                }
                else if (response.code == 0) {
                    var data = JSON.parse(response.responseobj);
                    if (data.isSuccess == true) {
                        if (data.data.table != null) {
                            if (data.data.table.length > 0) {
                                var stepid = data.data.table[0].step_id;
                                currentstepid = stepid;
                                if (stepid == null || stepid == undefined || stepid == "undefined" || stepid == "") { stepid = "0"; }
                                var currentstepidint = parseInt(stepid);
                                if (currentstepidint > 2 || currentstepidint == 2) {
                                    currentstepidint = currentstepidint - 2;
                                }
                                var total = (currentstepidint / 21) * 100;
                                if (total == 100 || total > 100) {
                                    $(".comprofile-text").hide();
                                    $("#completeyourprofiledemopercs").hide();
                                }
                                else {
                                    $("#stepcompleteperce").html("(" + Math.trunc(total) + "%)");
                                    $(".comprofile-text").show();
                                    var _html = "";
                                    _html += '<div class="tooltip-title">' + Math.trunc(total) + '% Completed</div>' +
                                        '<div class="progress">' +
                                        '<div class="progress-bar" role="progressbar" aria-valuenow="' + Math.trunc(total) + '" aria-valuemin="0" aria-valuemax="100" style="width:' + Math.trunc(total) + '%">' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="tooltip-text">Please complete a/c<br>Onboarding</div>' +
                                        '<button type="button" onclick="completekycbtnclick()" class="completekycbtnclick btn btn-outline-gold text-uppercase font-exxtrasmall font-base-semibold font-Gold mht-33 MinWidth-110 mt-2 mb-3">Complete now</button>';
                                    $("#completeyourprofiledemopercs").html(_html);
                                    $("#completeyourprofiledemopercs").show();
                                }
                            }
                        }
                    }
                }
                else {
                    console.log(response);
                }
            }
            else {
                console.log(response);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function completekycbtnclick() {
    window.location.href = siteRoots + "/OnBoarding/CompleteKYC";
}

function setmodetypeforuser()
{
    if(HasRealAccount == null || HasRealAccount == undefined || HasRealAccount == "undefined" || HasRealAccount == "")
    {}
    else if(HasRealAccount.toLowerCase() == "true")
    {
        $("#completeyourprofiledemopercs").hide();
        $("#usermenusubtext").hide();
        var nmmodetypeforuser = $('input[name="nmmodetypeforuser"]:checked').val();
        $(".imgDemoicon").removeClass("d-none");
        if(nmmodetypeforuser == "demo")
        {
            $(".imgDemoicon").addClass("d-none");
            $(".loggedpersondemo").removeClass("d-none");
            $(".loggedpersonislamic").addClass("d-none");
            $(".loggedpersonregular").addClass("d-none");
            setmodetypeforuserjs("demo");
        }
        else if(nmmodetypeforuser == "regular")
        {
            $(".loggedpersondemo").addClass("d-none");
            $(".loggedpersonislamic").addClass("d-none");
            $(".loggedpersonregular").removeClass("d-none");
            setmodetypeforuserjs("regular");
        }
        else if(nmmodetypeforuser == "islamic")
        {
            $(".loggedpersondemo").addClass("d-none");
            $(".loggedpersonislamic").removeClass("d-none");
            $(".loggedpersonregular").addClass("d-none");
            setmodetypeforuserjs("islamic");
        }
    }
    else if(HasRealAccount.toLowerCase() == "false")
    {
        var currentstepIDint = parseInt(currentstepid);
        if(currentstepIDint >= 90)
        {
            var nmmodetypeforuser = $('input[name="nmmodetypeforuser"]:checked').val();
            if(nmmodetypeforuser == "demo")
            {
                $(".loggedpersondemo").removeClass("d-none");
                $(".loggedpersonislamic").addClass("d-none");
                $(".loggedpersonregular").addClass("d-none");
                setmodetypeforuserjs("demo");
            }
            else if(nmmodetypeforuser == "regular")
            {
                $(".loggedpersondemo").addClass("d-none");
                $(".loggedpersonislamic").addClass("d-none");
                $(".loggedpersonregular").removeClass("d-none");
                setmodetypeforuserjs("regular");
            }
            else if(nmmodetypeforuser == "islamic")
            {
                $(".loggedpersondemo").addClass("d-none");
                $(".loggedpersonislamic").removeClass("d-none");
                $(".loggedpersonregular").addClass("d-none");
                setmodetypeforuserjs("islamic");
            }
            $("#completeyourprofiledemopercs").hide();
            $("#usermenusubtext").hide();
        }
        else
        {
            var nmmodetypeforuser = $('input[name="nmmodetypeforuser"]:checked').val();
            if(nmmodetypeforuser == "demo")
            {
                $(".loggedpersondemo").removeClass("d-none");
                $(".loggedpersonislamic").addClass("d-none");
                $(".loggedpersonregular").addClass("d-none");
                setmodetypeforuserjs("demo");
            }
            else if(nmmodetypeforuser == "regular")
            {
                window.location.href = siteRoots + "/OnBoarding/CompleteKYC";
            }
            else if(nmmodetypeforuser == "islamic")
            {
                $(".loggedpersondemo").addClass("d-none");
                $(".loggedpersonislamic").removeClass("d-none");
                $(".loggedpersonregular").addClass("d-none");
                setmodetypeforuserjs("islamic");
            }
            $("#completeyourprofiledemopercs").show();
            $("#usermenusubtext").show();
    }
    }
    $('#modetypeModal').modal('hide');
}

function setmodetypeforuserjs(val)
{
    $.ajax({
        url: siteRoots + '/OnBoarding/setmodetypeforuserjs',
        type: 'POST',
        data: {
            selectedvalue:val
        },
        success: function (response) {
            if (response != null || response != "") {
                if (!response) {
                    console.log(response);
                }
                else if (response.code < 0) {
                    console.log(response);
                }
                else if(response.code == 0)
                {
                    
                 }          
                else
                {
                    console.log(response);
                }
            }
            else 
            {
                console.log(response); 
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function RealdemoAcctOpenModaljs(){

    
    if($("#demomode").prop('checked') == true){
        //$('#modalRealdemoAcct').modal('show');
        $('#dvSelectModeMsg').show();
        $('#dvSelectMode').hide();
        $("#lblDemoReal").html("You are about to switch to your virtual account. Here you can practice your trading skills without any risk of loss. All trading activity will be made with Virtual cash!");
    }
    else if($("#regularmode").prop('checked') == true){
        $('#dvSelectModeMsg').show();
        $('#dvSelectMode').hide();
        
        if(IsIslamic == "Y"){
            $("#lblDemoReal").html("You are about to switch to your Regular account. Please note: Any transaction made on the Islamic mode will not appear in your Regular portfolio.");
        }else{
            $("#lblDemoReal").html("You are about to switch to your real account. Please note: Any trading activity will be made using Real Money!");
        }
    }
    else if($("#islamicmode").prop('checked') == true){
        $('#dvSelectModeMsg').show();
        $('#dvSelectMode').hide();
        $("#lblDemoReal").html("You are about to switch to your Islamic account. Please note: Any transaction made on the Regular mode will not appear in your Islamic portfolio. <br> Margin trading is currently not enabled in Islamic Mode.");
        //$('#modalRealdemoAcct').modal('show');
        // setmodetypeforuser();
        //$("#lblDemoReal").modal('hide');
        IsIslamic = 'Y';
    }
    
}

function Cancelmodetypeforuser(){
    $('#dvSelectModeMsg').hide();
        $('#dvSelectMode').show();
}

function GetNotionalData() {
    try {
        const promise = fetch('/Portfolio/GetPortfolioNotionalCashPosition', {
            method: 'POST'
        })
        promise.then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
            .then((data) => {
                data.length > 0 ? BindNotionalCash(data[0]) : "";
            })
    } catch (e) {
        console.log(e);
    }
}
function BindNotionalCash(n) {
    if (n) {
        const div = document.getElementsByClassName('screener')[0];
        const Total = parseFloat(n.actual_Cash) + parseFloat(n.invested_Cash) + parseFloat(n.unrealized_profit) - parseFloat(n.utilizedMargin);

        const html = `<div class="pnlNew justify-content-center d-none d-md-block d-lg-block">` +
            `<div class="tableTopCal">` +
            `<div class="aval-bal">` +
            `<h3>${n.actual_Cash ? alramz.helper.numberWithCommasInt(parseFloat(n.actual_Cash).toFixed(2)) : "0.00"}</h3>` +
            `<p>Cash (AED)</p>` +
            `</div>` +
            `<div>` +
            `<img src="${siteRoots}/images/add-pluse-more-icon.png" class="img-fluid synImg">` +
            `</div>` +
            `<div class="aval-bal">` +
            `<h3>${n.invested_Cash ? alramz.helper.numberWithCommasInt(parseFloat(n.invested_Cash).toFixed(2)) : "0.00"}</h3>` +
            `<p>Total Invested (AED)</p>` +
            `</div>` +
            `<div>` +
            `<img src="${siteRoots}/images/add-pluse-more-icon.png" class="img-fluid synImg">` +
            `</div>` +
            `<div class="aval-bal">` +
            // `<h3 class="${parseFloat(n.unrealized_profit) < 0 ? 'font-BloodOrange' : 'font-ButtonBlue'}">${alramz.helper.numberWithCommasInt(parseFloat(n.unrealized_profit).toFixed(2))}</h3>` +
            `<h3 class="${parseFloat(n.unrealized_profit) < 0 ? 'font-BloodOrange' : 'font-ButtonBlue'}">${n.unrealized_profit ? alramz.helper.numberWithCommasInt(parseFloat(n.unrealized_profit).toFixed(2)) : "0.00"}</h3>` +
            `<p>Unrealised P&L (AED)</p>` +
            `</div>` +
            `<div>` +
            `<img src="${siteRoots}/images/minus-pluse-more-icon.png" class="img-fluid synImg">` +
            `</div>` +
            `<div class="aval-bal">` +
            `<h3 class="${parseFloat(n.utilizedMargin) < 0 ? 'font-BloodOrange' : 'font-RaisinBlack'}">${n.utilizedMargin ? alramz.helper.numberWithCommasInt(Math.abs(parseFloat(n.utilizedMargin)).toFixed(2)) : "0.00"}
            </h3>` +
            `<p>Utilized Margin (AED) </p>` +
            `</div>` +
            `<div class="equalto-icon">` +
            `<img src="${siteRoots}/images/equalto-icon.png" class="img-fluid synImg">` +
            `</div>` +
            `<div class="aval-bal net-val">` +
            `<h3>${alramz.helper.numberWithCommasInt(Total.toFixed(2))}</h3>` +
            `<p>Net Asset Value (AED)</p>` +
            `</div>` +
            
            `<div class="aval-bal margin-text">` +
            `<h3 class="${parseFloat(n.maintenance_margin) == 0 ? 'font-RaisinBlack' : parseFloat(n.maintenance_margin) > 25 ? 'font-ButtonBlue' : 'font-BloodOrange'}">${n.maintenance_margin ? alramz.helper.numberWithCommasInt(parseFloat(n.maintenance_margin).toFixed(2)) : "0.00"}%</h3>` +
            `<p>Maintenance Margin (%) </p>` +
            `</div>` +
            `</div>`;
        $(div).append(html);

    }
}

window.onload = function () {
    inactivityTime();
}

var inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;
    document.onkeyup = resetTimer;
    document.ontouchstart = resetTimer;
    document.addEventListener('scroll', resetTimer, true);

    function logout() {
        $("#checkloginsesModalModal").modal('show');
        $("#overlay").show();
        setTimeout(function () {
            redirectToLogin();
        }, 2000);
    }

    function resetTimer() {
        clearTimeout(time);
        //time = setTimeout(logout, 780000);
        time = setTimeout(logout, 12e5);
    }
};
