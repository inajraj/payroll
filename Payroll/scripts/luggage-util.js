function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

function fetchLuggageDetails(direction){

    var myObj = {};
    myObj['rowid'] = "0";
    myObj['tripid'] =  $("#inputDate").data("tripid");
    myObj['direction'] = direction; 

    $.ajax({
            
        url:"fetchLuggageDetails.php", //the page containing php script to check
        type: "post", //request type,
        dataType: 'text',
        data: JSON.stringify(myObj),
        success: function(response) { 
            console.log(response);
            $('#luggageTable > tbody').empty();
            if (response.includes("nothing")) {
            }
            else {
                var res = response;
                $('#luggageTable > tbody:last-child').append(res);
            }
        }
    });
}

function checkBNandDateinDB(myObj)
{
    $.ajax({
            
        url:"../Luggage/checkBNandDate.php", //the page containing php script to check
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
                    myObj['direction'] = "U"; 

                    $.ajax({
                            
                        url:"fetchLuggageDetails.php", //the page containing php script to check
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
                                $('#luggageTable > tbody').empty();
                                $('#luggageTable > tbody:last-child').append(res);
                            }
                        }
                    });
                
            }
        }
    });

    
}

$( document ).ready(function() {

    $(".table-fixed tbody").css({"height":"300px"});
    $("#directionUP").css("background-color", "#C0C0C0");

    var expenseTypeStr=""

    $("#directionUP").click(function() {

       $("#inputDate").data("direction","U");
       fetchLuggageDetails('U');
       $(this).css("background-color", "#C0C0C0");
       $("#directionDown").css("background-color", "white");
     

    });
    $("#directionDown").click(function() {

         $("#inputDate").data("direction","D");
          fetchLuggageDetails('D');
          $(this).css("background-color", "#C0C0C0");
          $("#directionUP").css("background-color", "white");

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
                        myObj['direction'] = $("#inputDate").data('direction');;
                        myObj['FromTo'] = "";
                        myObj['Topay'] = "";
                        myObj['paid'] = "";
                        myObj['coolie'] = "";
                        myObj['unload'] = "";
                        myObj['doordelivery'] = "";
                        $.ajax({
                           url:"/Luggage/dbOperations.php", //the page containing php script
                           type: "post", //request type,
                           dataType: 'text',
                           data: JSON.stringify(myObj),
                           success: function(response) { 
                               console.log(response);
                               $('#luggageTable > tbody').empty();
                               if (response.includes("nothing")) { }
                               else {
                                    $('#luggageTable > tbody:last-child').append(response);
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
                        $("#headerId").data("tripid",$("inputDate").data("tripid"));
                        $("#headerId").data("action", 'U');
                        var trObj = $(this).closest('tr');

                        $("#inputFT").val(trObj.find("td:eq(1)").text());
                        $("#inputPaid").val(trObj.find("td:eq(2)").text());
                        $('#inputTopay').val(trObj.find("td:eq(3)").text());
                        $("#inputCooly").val(trObj.find("td:eq(4)").text());
                        $("#inputUnload").val(trObj.find("td:eq(5)").text());
                        $("#inputDD").val(trObj.find("td:eq(6)").text());
                        
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

        $("#headerId").text("Add a new luggage Item..");
        $("#headerId").data('rowid',"0");
        $("#inputFT").val("");
        $("#inputCost").val("");
        $("#inputTopay").val("");
        $("#inputCooly").val("");
        $("#inputUnload").val("");
        $("#inputDD").val("");
  

        
       // if ($(this).attr('id').includes("btnAdd1"))
        //    $('#driverTable > tbody:last-child').append(res);
        
       

    });

   
    
    $( "#btnSave" ).click(function() {


        var myObj = {};
        myObj['rowid'] = $("#headerId").data('rowid');
        myObj['tripid'] =  $("#inputDate").data('tripid');
        myObj['action'] = $("#headerId").data('action');
        myObj['direction'] = $("#inputDate").data('direction');
        myObj['FromTo'] = $("#inputFT").val();
        myObj["paid"] = $("#inputPaid").val();
        myObj["Topay"]  = $("#inputTopay").val();
        myObj["coolie"]  = $("#inputCooly").val();
        myObj['unload'] = $("#inputUnload").val();
        myObj['doordelivery'] = $("#inputDD").val();

        console.log( myObj["expType"])   ;      
        $.ajax({
            url:"../Luggage/dbOperations.php", //the page containing php script
            type: "post", //request type,
            dataType: 'text',
            data: JSON.stringify(myObj),
                success: function(res) { 
                    console.log(res);
                    $('#luggageTable > tbody').empty();
                    $('#luggageTable > tbody:last-child').append(res);
                   
                }
               
        });

        
        
    });
   
    
});

