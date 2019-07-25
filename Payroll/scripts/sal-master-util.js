
function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

function GetQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
           return sParameterName[1];
      
    }
}

function addSelectOptions(myObj)
{

    $.ajax({
        
        url:"../common/fetchDropDownValues.php", //the page containing php script to check
        type: "post", //request type,
        dataType: 'text',
        data: JSON.stringify(myObj),
        success: function(response) { 
            console.log(response);
            var res = response.split("`")
            console.log(res);
            $(res).each(function(i,val){
                optionarr = val.split('-')
                console.log(myTrim(optionarr[0]));
                if (myTrim(optionarr[0]) != "")
                    $("#" + myTrim(optionarr[0])).append($("<option/>", {
                        value: optionarr[1],
                        text: optionarr[1]
                    }));
            });
                    
        }
    });

}

function fetchSalDetails(myObj)
{
    $.ajax({
            
        url:"../salary/fetchSalaryDetails.php", //the page containing php script to check
        type: "post", //request type,
        dataType: 'text',
        data: JSON.stringify(myObj),
        success: function(response) { 
                console.log(response);
                if (!response.includes("nothing"))
                {
                    var json = $.parseJSON(response);
                    $(json).each(function(i,val){
                        $.each(val,function(k,v){
                            console.log(k+" : "+ v);  
                            $("#" + k).val(v);   
                        });
                    });
                }
                else
                    alert("Employee ID is invalid");
                
            
        }
    });

    
}

function checkName(controlName, blankFlag) {
    
        if (blankFlag == 'N') 
            if ( !$("#"+controlName).val().match('^[a-zA-Z]{3,16}$') ) {
                alert('This is not a valid ' + controlName)
        
            }
        else
            if ($('#MiddleName').val().trim() != "" && !$("#"+controlName).val().match('^[a-zA-Z]{3,16}$') ){
                alert('This is not a valid ' + controlName)
            }
    
}

function validateDate(dt, mindate, maxdate) {
    var dte = new Date($(dt).val());
    console.log(dte);
	if (dte < mindate)
		alert(dt + ' is older than limit');
	if (dte > maxdate)
		alert(dt + ' is newer than limit');
}


$( document ).ready(function() {

    var myObj = {};
    //addSelectOptions(myObj);

    

   
    $( "#EmpID" ).change(function() {
      
        //input date changed just check if there is a valid bus number selected

        var bn = $("#EmpID").val();
        console.log(bn);
        if (bn != null && bn > 1000)
        {
            //need to check if there is record for the date and busnumber comibination
            var myObj = {};
            myObj['EmpID'] = $("#EmpID").val();
            

            fetchSalDetails(myObj);

            console.log(bn);
            
        }

    });

    

    $( "#btnSave" ).click(function() {


        checkName('FirstName');
        checkName('MiddleName', 'Y');
        checkName('LastName', 'Y');
        checkName('FatherName');
        checkName('Initials','Y')
        checkName('Spouse','Y')

        //last name and initialis can't be blank together
        if ( $("#LastName").val().trim() == "" &&  $("#Initials").val().trim() == "")
            alert("Last Name and Initials can not be blank togther");

        //DOB can not be in the past 15 years..as well as older than 60
        var minDate = new Date("01/01/1950");
        var maxDate = new Date("12/31/2010");
        validateDate("#DOB",minDate,maxDate);
        
        maxDate = new Date();
        
        minDate.setTime(maxDate.getTime() - 30*24*60*60*1000);
        validateDate("#JoiningDate",minDate,maxDate);
        if ($("#ResignationDate").val().trim() != "") {
            validateDate("#ResignationDate", minDate, maxDate);
            if ($("#LeavingDate").val().trim() != ""){
                //leaving date should be at least equal to resig date
                minDate = new Date($("#ResignationDate").val());
                console.log(minDate);
                validateDate("#LeavingDate", minDate, maxDate);
            }
        }
        else 
        {       //leaving date can not be entered until resig date is entered
                if ($("#LeavingDate").val().trim() != "") 
                   alert('Leaving Date is not allowed when Resignation Date is empty')
            
        }

        //if active is no then both dates should be present
        if ($("#Active").val().trim() == "No") {
            if ($("#ResignationDate").val().trim() == "") 
                alert('Resignation Date is required when employee is no longer active');
            if ($("#LeavingDate").val().trim() == "") 
                   alert('Leaving Date is not allowed when employee is not active');
            
        }
       
        
       

        var myObj = {};
        myObj['EmpID'] = $('#EmpID').val();
        myObj['FirstName'] = $('#FirstName').val();
        myObj['MiddleName'] = $('#MiddleName').val();
        myObj['LastName'] = $('#LastName').val();
        myObj['Initials'] = $('#Initials').val();
        myObj['FullName'] = $('#FullName').val();
        myObj['FatherName'] = $('#FatherName').val();
        myObj['SpouseName'] = $('#SpouseName').val();
        myObj['DOB'] = $('#DOB').val();
        myObj['CompanyID'] = $('#CompanyID').val();
        myObj['Department'] = $('#Department').val();
        myObj['BusinessTitle'] = $('#BusinessTitle').val();
        myObj['JoiningDate'] = $('#JoiningDate').val();
        myObj['JobBand'] = $('#JobBand').val();
        myObj['MobileNo'] = $('#MobileNo').val();
        myObj['AlternateContactNo'] = $('#AlternateContactNo').val();
        myObj['PAN'] = $('#PAN').val();
        myObj['AADHAAR'] = $('#AADHAAR').val();
        myObj['PF_UAN'] = $('#PF_UAN').val();
        myObj['PF_No'] = $('#PF_No').val();
        myObj['PassportNo'] = $('#PassportNo').val();
        myObj['Active'] = $('#Active').val();
        myObj['ResignationDate'] = $('#ResignationDate').val();
        myObj['LeavingDate'] = $('#LeavingDate').val();
       
        return;

        if (act == "add") {
            $.ajax({
                url:"../employee/insertEmployeeMaster.php", //the page containing php script
                type: "post", //request type,
                dataType: 'text',
                data: JSON.stringify(myObj),
                    success: function(res) { 
                    console.log(res)
                    }
                
            });

        }
        else
        {
            $.ajax({
                url:"../employee/updateEmployeeMaster.php", //the page containing php script
                type: "post", //request type,
                dataType: 'text',
                data: JSON.stringify(myObj),
                    success: function(res) { 
                    console.log(res)
                    }
                
            });

        }


    });
   
    
});

