
function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

function ExtractEmpID(val){

    
    return val.slice(-4);

}

function GetFormattedDate(val) {
    console.log(val);
    if (val == null) {
        return "";
    }
    var tdate = new Date(val);
    var month = tdate.getMonth() + 1;
    var day = tdate.getDate();
    var year = tdate.getFullYear();
    return month + "-" + day + "-" + year;
}

function FormatDateforMySQL(val) {

    if (val.trim() == "")
        return val;
    var tdate = new Date(val);
    var month = tdate.getMonth() + 1;
    var day = tdate.getDate();
    var year = tdate.getFullYear();
    return year + "-" + month + "-" + day;

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

function fetchData(myObj)
{
    $.ajax({
            
        url:"../employee/fetchEmpMasterData.php", //the page containing php script to check
        type: "post", //request type,
        dataType: 'text',
        data: JSON.stringify(myObj),
        success: function(response) { 
                console.log(response);
                if (!response.includes("nothing"))
                {
                    var json = $.parseJSON(response);
                    $(json).each(function(i,myObj) {
                            $('#lblEmpID').text("Employee ID : " + myObj['EmpID']);
                            $('#txtFirstName').val(myObj['FirstName']);
                            $('#txtMiddleName').val(myObj['MiddleName']);
                            $('#txtLastName').val(myObj['LastName']);
                            $('#txtFatherName').val(myObj['FatherName']);
                            $('#txtInitials').val(myObj['Initials']);
                            $('#txtSpouseName').val(myObj['SpouseName']);
                            $('#dpDOB').datepicker().datepicker('setDate', GetFormattedDate(myObj['DOB']));
                            $('#selCompanyID').val(myObj['CompanyID']);
                            $('#selDepartment').val(myObj['Department']);
                            $('#selBusinessTitle').val(myObj['BusinessTitle']);
                            $('#selEmploymentType').val(myObj['EmploymentType']);
                            $('#selJobBand').val(myObj['JobBand']);
                            $('#dpJoiningDate').datepicker().datepicker('setDate', GetFormattedDate(myObj['JoiningDate']));
                            $('#txtMobileNumber').val(myObj['MobileNo']);
                            $('#txtHomeNumber').val(myObj['AlternateContactNo']);   
                            $('#txtPANNumber').val(myObj['PAN']);
                            $('#txtAADHARNumber').val(myObj['AADHAAR']);
                            $('#txtPFUAN').val(myObj['PF_UAN']);
                            $('#txtPassportNumber').val(myObj['PassportNo']);
                            $('#selActive').val(myObj['Active']);
                            $('#dpResignationDate').datepicker().datepicker('setDate',GetFormattedDate(myObj['ResignationDate']));
                            $('#dpLeavingDate').datepicker().datepicker('setDate',GetFormattedDate(myObj['LeavingDate']));
                        
                    });
                }
                else
                    alert("Employee ID is invalid");
                
            
        }
    });

    
}

function checkName(controlName, FieldName, blankFlag) {
        
       
        if (blankFlag != 'Y')  {
            if ( $("#"+controlName).val() == '') {
               bootbox.alert(FieldName + " can not be blank")  
               return false;
            }
            
        }
        if( /^[a-zA-Z0-9- ]*$/.test( $("#"+controlName).val() ) == false ) {
            bootbox.alert(FieldName + ': input is not alphanumeric');
            return false;
        }
        
        return true;
    
            
    
}

function checkSelectOption( controlName, FieldName) {
    if ($(controlName + " option:selected").index() == 0) {
        bootbox.alert("Select " + FieldName  );
        return false;
    }

    return true;
}
function validateDate(dt, mindate, maxdate, fieldName) {

    if ($(dt).val() == "") {
        bootbox.alert(fieldName + ' can not be blank');
        return false; 
    }
    var dte = new Date($(dt).val());
    //console.log(dte);
	if (dte < mindate) {
        bootbox.alert(fieldName + ' is older than limit');
        return false; 
    }
        
	if (dte > maxdate) {
        bootbox.alert(fieldName + ' is newer than limit');
        return false;
    }

    return true;
}


$( document ).ready(function() {

    var myObj = {};
    //addSelectOptions(myObj); 

    //$("#FullName").attr("readonly","true");
    var act = GetQueryStringParams('action');
    
    //if (act  == "add"){
    //    $("#EmpID").val("New");
    //    $("#EmpID").attr("readonly","true");
    //}

    $('#dpJoiningDate').datepicker().datepicker('setDate','today');
    $('#dpDOB').datepicker().datepicker('setDate','');
    $('#dpResignationDate').datepicker().datepicker('setDate','');
    $('#dpLeavingDate').datepicker().datepicker('setDate','');
    
    $( "#txtSearch" ).change(function() {
      
        var bn = $("#txtSearch").val();
        console.log(bn);
        if (bn != null && bn > 1000)
        {
            
            var myObj = {};
            myObj['EmpID'] = $("#txtSearch").val();
            

            fetchData(myObj);

            console.log(bn);
            
        }

    });

   
    $( "#btnSave" ).click(function() {

        

        if (!checkName('txtFirstName', "First Name"))
            return false;
        if (!checkName('txtMiddleName', "Middle Name",'Y'))
            return false;
        if (!checkName('txtLastName', "Last Name", 'Y'))
            return false;
        if (!checkName('txtFatherName', "Father Name"))
            return false;
        if (!checkName('txtInitials',"Initials", 'Y'))
            return false;
        if (!checkName('txtSpouse',"Spouse Name", 'Y'))
            return false;

        //last name and initialis can't be blank together
        if ( $("#txtLastName").val() == "" &&  $("#txtInitials").val() == "") {
            bootbox.alert("Last Name and Initials can not be blank togther");
        }

        //DOB can not be in the past 15 years..as well as older than 60
        var minDate = new Date("01/01/1950");
        var maxDate = new Date("12/31/2004");
        if (!validateDate("#dpDOB",minDate,maxDate, "Date of Birth"))//DOB
            return false;

        if (!checkSelectOption("#selCompanyID", "Company ID"))
            return false;
        if (!checkSelectOption("#selDepartment", "Department"))
            return false;
        if (!checkSelectOption("#selBusinessTitle", "Business Title"))
            return false;
        if (!checkSelectOption("#selEmploymentType", "Employment Type"))
            return false;
        if (!checkSelectOption("#selJobBand", "Job Band"))
            return false;
        
        maxDate = new Date();
        minDate.setTime(maxDate.getTime() - 30*24*60*60*1000);

        if (!validateDate("#dpJoiningDate",minDate,maxDate, "JoiningDate"))
            return false; //joining date
       
        if ($("#dpResignationDate").val() != "") {
            if (!validateDate("#dpResignationDate", minDate, maxDate, "Resignation Date"))
                return false;
            if ($("#dpLeavingDate").val() != ""){
                //leaving date should be at least equal to resig date
                minDate = new Date($("#dpResignationDate").val());
                if (!validateDate("#dpLeavingDate", minDate, maxDate, "Leaving Date"))
                    return false;
            }
        }
        else 
        {       //leaving date can not be entered until resig date is entered
                if ($("#dpLeavingDate").val() != "") {
                   bootbox.alert('Leaving Date is not allowed when Resignation Date is empty');
                   return false;
                }
            
        }

        //if active is no then both dates should be present
        if ($("#Active").val() == "No") {
            if ($("#dpResignationDate").val().trim() == "")  {
                bootbox.alert('Resignation Date is required when employee is no longer active');
                return false;
            }
            if ($("#dpLeavingDate").val().trim() == "") {
                  bootbox.alert('Leaving Date is not allowed when employee is not active');
                  return false;
            }
        }
       
        if (!checkName('txtPANNumber', "PAN Number", "Y"))
            return false;
        if (!checkName('tstAADHARNumber', "AADHAR Number",'Y'))
            return false;
        if (!checkName('txtPFUAN', "UAN Number", 'Y'))
            return false;
        if (!checkName('txtPassportNumber',"Passport Number", 'Y'))
            return false;

        if (!checkSelectOption("#selActive", "Employee Active "))
            return false;
        
        var tmp = $('#lblEmpID').text();

        var myObj = {};
        myObj['EmpID'] = ExtractEmpID(tmp);
        myObj['FirstName'] = $('#txtFirstName').val();
        myObj['MiddleName'] = $('#txtMiddleName').val();
        myObj['LastName'] = $('#txtLastName').val();
        myObj['Initials'] = $('#txtInitials').val();
        //myObj['FullName'] = $('#FullName').val();
        myObj['FatherName'] = $('#txtFatherName').val();
        myObj['SpouseName'] = $('#txtSpouseName').val();
        myObj['DOB'] =  FormatDateforMySQL($('#dpDOB').val());
        myObj['CompanyID'] = $('#selCompanyID').val();
        myObj['Department'] = $('#selDepartment').val();
        myObj['BusinessTitle'] = $('#selBusinessTitle').val();
        myObj['EmploymentType'] = $('#selEmploymentType').val();
        myObj['JoiningDate'] = FormatDateforMySQL( $('#dpJoiningDate').val());
        myObj['JobBand'] = $('#selJobBand').val();
        myObj['MobileNo'] = $('#txtMobileNumber').val();
        myObj['AlternateContactNo'] = $('#txtHomeNumber').val();
        myObj['PAN'] = $('#txtPANNumber').val();
        myObj['AADHAAR'] = $('#txtAADHARNumber').val();
        myObj['PF_UAN'] = $('#txtPFUAN').val();
        //myObj['PF_No'] = $('#PF_No').val();
        myObj['PassportNo'] = $('#txtPassportNumber').val();
        myObj['Active'] = $('#selActive').val();
        myObj['ResignationDate'] =FormatDateforMySQL($('#dpResignationDate').val());
        myObj['LeavingDate'] = FormatDateforMySQL($('#dpLeavingDate').val());
       
        console.log(myObj);

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

