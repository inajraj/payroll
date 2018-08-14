$( document ).ready(function() {

    $( "#link1" ).click(function() {

            var rowid = $( "#link1" ).data("rowid");
            var myBookId =  $( "#link1" ).text();
            var myrow =  $( "#link1" ).parent().parent();
            var ticket = $.trim(myrow.find('td:eq(1)').html());//td:eq(0) means first td of this row
            var rate = $.trim(myrow.find('td:eq(2)').html())
            var commision = $.trim(myrow.find('td:eq(4)').html())

            var total = parseInt(ticket) * parseInt(rate);
            var gt = parseInt(total) + parseInt(commision);
    
            $("#inputBP").val( rowid);
            $("#inputTicket").val( ticket);
            $("#inputRate").val( rate);
            $("#inputCommission").val( commision);

            $("#inputTotal").text( total);
            $("#inputGT").text(gt);

            console.log(rowid);




    });

    $( "#inputRate" ).change(function() {
      
        var ticket = $("#inputTicket").val();
        var rate = $("#inputRate").val();
     
        var total = parseInt(ticket) * parseInt(rate);
        $("#inputTotal").text( total);

    });

    $( "#inputTicket" ).change(function() {
     
        var ticket = $("#inputTicket").val();
        var rate = $("#inputRate").val();
     
        var total = parseInt(ticket) * parseInt(rate);
        $("#inputTotal").text( total);

    });

    $( "#inputCommission" ).change(function() {
     
        var total = $("#inputTotal").text();
        var commission = $("#inputCommission").val();
     
        var gt = parseInt(total) + parseInt(commission);
        $("#inputGT").text( gt);

    });

   
    
});

