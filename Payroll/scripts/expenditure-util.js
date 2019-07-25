function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

function checkBNandDateinDB(myObj)
{
    $.ajax({
            
        url:"checkBNandDate.php", //the page containing php script to check
        type: "post", //request type,
        dataType: 'text',
        data: JSON.stringify(myObj),
        success: function(response) { 
            if (response.includes("nothing")) {
                $("#lblDriver1").text("0");
                $("#lblDriver2").val("0");
                $("#lblCleaner").val("0");
                $("#inputDate").data("tripid","0");
                $('#driverTable > tbody').empty();
               
            }
            else {
                var res = response.split("~");
                $("#lblDriver1").html(myTrim(res[0]));
                $("#lblDriver2").html(myTrim(res[1]));
                $("#lblCleaner").html(myTrim(res[2]));
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
                           url:"../Expenditure/dbOperations.php", //the page containing php script
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
       

    $( "#btnEdit" ).click(function() {

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

    $( "#btnAdd" ).click(function() {

        console.log("inside");
        //if there is no value set for master fields (busnumber, driver etc.. don't start)
        var inputDate = $("#inputDate").val();
        if (inputDate !="") {
            var bn = $("#selectBN").val();
            if (bn != null)
            {
            
               
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
            url:"../Expenditure/dbOperations.php", //the page containing php script
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

