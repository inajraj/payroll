function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

function checkBNandDateinDB(myObj)
{
    $.ajax({
            
        url:"/Expenditure/checkBNandDate.php", //the page containing php script to check
        type: "post", //request type,
        dataType: 'text',
        data: JSON.stringify(myObj),
        success: function(response) { 
            if (response.includes("nothing")) {
                $("#selectDriver1").val("0");
                $("#selectDriver2").val("0");
                $("#selectCleaner").val("0");
                $("#inputDate").data("tripid","0");
                $('#driverTable > tbody').empty();
               
            }
            else {
                var res = response.split("~");
                $("#selectDriver1").val(myTrim(res[0]));
                $("#selectDriver2").val(myTrim(res[1]));
                $("#selectCleaner").val(myTrim(res[2]));
                $("#inputDate").data("tripid",res[3]);
                var tripid = $("#inputDate").data("tripid");
                console.log(" trip d " + tripid);
                $('#detailTable > tbody').empty();
                if (tripid > 0)
                    var myObj = {};
                    myObj['rowid'] = "0";
                    myObj['tripid'] = tripid;
               
                    $.ajax({
                            
                        url:"fetchExpenditureDetails.php", //the page containing php script to check
                        type: "post", //request type,
                        dataType: 'text',
                        data: JSON.stringify(myObj),
                        success: function(response) { 
                            console.log(response);
                            if (response.includes("nothing")) {
                            }
                            else {
                                var res = response;
                                //console.log(res);
                                console.log(document.body.clientHeight);
                                $('#driverTable > tbody').empty();
                                $('#driverTable > tbody:last-child').append(res);
                            }
                        }
                    });
                
            }
        }
    });

    
}

$( document ).ready(function() {

    $(".table-fixed tbody").css({"height":"300px"});

    var expenseTypeStr=""

    $.ajax({
        
        url:"PopulateExpenseTypes.php", //the page containing php script
        type: "post", //request type,
        dataType: 'text',
        data: "",
        success: function(response) { 
            expenseTypeStr = response;
            console.log(expenseTypeStr);
        
        }
    });
    
    $( "#selectBN" ).change(function() {
      
        var inputDate = $("#inputDate").val();
        if (inputDate !="") {
            //need to check if there is record for the date and busnumber comibination

            //console.log(inputDate);
            var myObj = {};
            myObj['inputDate'] = $("#inputDate").val();
            myObj['bn'] = $("#selectBN").val();

            checkBNandDateinDB(myObj);

            
        }
       
    });

    $( "#inputDate" ).change(function() {
      
        //input date changed just check if there is a valid bus number selected

        var bn = $("#selectBN").val();
        console.log(bn);
        if (bn != null)
        {
            //need to check if there is record for the date and busnumber comibination
            var myObj = {};
            myObj['inputDate'] = $("#inputDate").val();
            myObj['bn'] = bn;

            checkBNandDateinDB(myObj);

            console.log(bn);
            
        }

    });

   
    $( "#selectDriver1,#selectDriver2,#selectCleaner" ).change(function() {
      
        //input date changed just check if there is a valid bus number selected

        var driver2 = $("#selectDriver2").val();
        var driver1 = $("#selectDriver1").val();
        console.log(driver1);
        if (driver1 != null && driver2 != null)
        {
            //need to check if both driver names are same
            if (driver1 === driver2)
            {
                alert("both driver name can not be the same");
                $(this).val("0");
                return false;
            }
            //if the driver names are different we may need to update the record in the master
            //check if the record is already there in the master by fetching ticketid
            var ticketid =  parseInt($("#inputDate").data('ticketid'));
        
            //we can update the record using ajax
            var myObj = {};
            myObj['rowid'] = $("#headerId").data('rowid');
            myObj['ticketid'] = ticketid;
            myObj["inputDate"] = $("#inputDate").val();
            myObj["bn"] = $("#selectBN").val();
            myObj["driver1"] = $("#selectDriver1").val();
            myObj["driver2"] = $("#selectDriver2").val();
            myObj["cleaner"] = $("#selectCleaner").val();
            console.log(ticketid);
            $.ajax({
        
                url:"insertExpenditureMaster.php", //the page containing php script
                type: "post", //request type,
                dataType: 'text',
                data: JSON.stringify(myObj),
                success: function(response) {
                    console.log(response);
                    $("#inputDate").data("ticketid",response)}
            });
            
            
        }

    });


    $( "#btnDelete" ).click(function() {

        //firt find which row is selected by going through all the rows in the table
        //var rowCount = $('#detailTable >tbody >tr').length;
        var rowid="";
       
        $("input[type=radio]").each(
            function() {

                if ($(this).is(':checked'))
                 
                    if (confirm("Do you really want to delete the selected row?")) {
                        rowid = $(this).data('rowid');
                        var myObj = {};
                        myObj['rowid'] = rowid;
                        myObj['tripid'] = $("#inputDate").data('tripid');
                        myObj['action'] = "D";
                        myObj["expType"] = "";
                        myObj["name"]  = "";
                        myObj["expense"]  = "";
                        $.ajax({
                           url:"/Expenditure/dbOperations.php", //the page containing php script
                           type: "post", //request type,
                           dataType: 'text',
                           data: JSON.stringify(myObj),
                           success: function(response) { 
                               console.log(response);
                               $('#driverTable > tbody').empty();
                               if (response.includes("nothing")) { }
                               else {
                                    $('#driverTable > tbody:last-child').append(response);
                               }
                            }
                         });
                    } else 
                        return;
                    
                
            }   
        );
    });
       

    $( "#btnEdit1 ,#btnEdit2, #btnEdit3" ).click(function() {

        //firt find which row is selected by going through all the rows in the table
        //var rowCount = $('#detailTable >tbody >tr').length;
        var rowid="";
       
        $("input[type=radio]").each(
            
                function() {

                   if ($(this).is(':checked'))
                    {
                        
                        $("#headerId").text("Edit expense..")
                        $("#headerId").data("rowid",$(this).data("rowid"));
                        $("#headerId").data("tripid",$(this).data("tripid"));
                        $("#selectET").val($(this).data("exptype"));
                        var trObj = $(this).closest('tr');
                        $("#inputName").val(trObj.find("td:eq(1)").text());
                        //trObj.find("td:eq(0)").html("<input type='text' class='form-control' id='inputDriver' name='expense' value = '" + str + "'/>");
                        
                        $('#inputExp').val(trObj.find("td:eq(2)").text());
                        //trObj.find("td:eq(1)").html("<input type='text' class='form-control' id='inputExpense' name='expense' value = '" + str + "'/>");
                        //trObj.find("td:eq(2)").html("<input type='button' value='save' name='save' id='btnSaveRow' class='btn btn-secondary' /input>");
                        //trObj.find("td:eq(3)").html("<input type='button' value='cancel' name='cancel' id='btnCancel' data-action='edit' class='btn btn-secondary'/>");
                        
                    }
                }
            
            );
            
        //$("#headerId").data("rowid", rowid);
        

    });

    $( "#btnAdd1, #btnAdd2, #btnAdd3" ).click(function() {

        console.log("inside");
        //if there is no value set for master fields (busnumber, driver etc.. don't start)
        var inputDate = $("#inputDate").val();
        if (inputDate !="") {
            var bn = $("#selectBN").val();
            if (bn != null)
            {
                var driver1 = $("#selectDriver1").val();
                if (driver1 != null)
                {
                    var driver2 = $("#selectDriver2").val();
                    if (driver2 != null)
                    {
                        var cleaner = $("#selectCleaner").val();
                        if (cleaner != null)
                        {
                        }
                        else
                        {
                            alert('Please select Cleaner');
                            return false;  
                        }
                    }
                    else
                    {
                        alert('Please select Driver 2..');
                        return false;  
                    }
                }
                else
                {
                    alert('Please select Driver 1..');
                    return false;  
                }
            }
            else
            {
                alert('Please select BusNumber..');
                return false;  
            }

        }
        else
        {
             alert('Please select Date..');
             return false; 
        }

        $("#headerId").text("Add a new expense Item..");
        $("#headerId").data('rowid',"0");
        $("#selectET").val("");
        $("#inputName").val("");
        $("#inputExp").val("");

        
       // if ($(this).attr('id').includes("btnAdd1"))
        //    $('#driverTable > tbody:last-child').append(res);
        
       

    });

    $( "#driverTable, #staffTable, #otherTable" ).on("click","#btnCancel",(function() {

        //append to the table..
        var trobj = $(this).parent().parent();
        if ($(this).data('action') == "add") 
               
                trobj.remove();
        else
            {
                trobj.find("td:eq(0)").text($("#inputDriver").val());
                trobj.find("td:eq(1)").text($("#inputExpense").val());
                trobj.find("td:eq(2)").text(" ");
                trobj.find("td:eq(3)").text(" ");

            }
            
        
       // tdobj.html($("inputDriver").val());

    }));

    $( "#driverTable,#staffTable, #otherTable" ).on("click","#btnSaveRow",(function() {

        console.log("inside");
        //append to the table..
        var trobj = $(this).parent().parent();
        var myObj = {};
        myObj['rowid'] = $("#headerId").data('rowid');
        myObj['ticketid'] = $("#headerId").data('ticketid');
        myObj["expType"] = $("#inputBP").val();
        myObj["name"] = $("#inputDriver").val()
        myObj["cost"] =$("#inputExpense").val()
        trobj.find("td:eq(0)").text($("#inputDriver").val());
        trobj.find("td:eq(1)").text($("#inputExpense").val());
        trobj.find("td:eq(2)").text(" ");
        trobj.find("td:eq(3)").text(" ");
        $.ajax({
            
            url:"dbOperations.php", //the page containing php script
            type: "post", //request type,
            dataType: 'text',
            data: JSON.stringify(myObj),
            success: function(response) { 
                var rowid = response;
                $("#headerId").data("rowid",rowid);
                console.log(rowid);
            }
        });
       

    }));
    
    $( "#btnSave" ).click(function() {


        var myObj = {};
        myObj['rowid'] = $("#headerId").data('rowid');
        myObj['tripid'] =  $("#inputDate").data('tripid');
        myObj['action'] = "A";
        myObj["expType"] = $("#selectET").val();
        myObj["name"]  = $("#inputName").val();
        myObj["expense"]  = $("#inputExp").val();
       
        console.log( myObj["expType"])   ;      
        $.ajax({
            url:"/Expenditure/dbOperations.php", //the page containing php script
            type: "post", //request type,
            dataType: 'text',
            data: JSON.stringify(myObj),
                success: function(res) { 
                    console.log(res);
                    $('#driverTable > tbody').empty();
                    $('#driverTable > tbody:last-child').append(res);
                   
                }
               
        });

        
        
    });
   
    
});

