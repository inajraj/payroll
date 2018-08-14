<?php

# Get JSON as a string
$json_str = file_get_contents('php://input');

//var_dump(json_decode($json));
$results = json_decode($json_str, true);


$rowid = (int)($results['rowid']);
$ticketid = (int)($results['ticketid']);

//echo $results['BP'] . " ". $results['ticket'] . " ". $results['rate'];

include '../SqlConnection.php';
//select the row which has this date and busnumber if it is there...
$sql = "SELECT * from ticketDetails where TicketID = " . $ticketid ;
//echo $sql;
$result = $conn->query($sql);

$count = 0;
if ($result->num_rows > 0) {
    // need to populate the entire page using the date and busnumber
    while($row = $result->fetch_assoc()) {

        $count += 1;
        if ($count == 1)
            $checked = "checked";
        else
            $checked = "";

        $str = "<tr><th scope=\"row\"><input type=\"radio\" name=\"ticketdetailgroup\" id=\"r" . $count . "\" value=\"" .$row["ID"]."\" " .$checked .
        "  /></th>  <td><a href=\"#\" data-toggle=\"modal\" data-target=\"#myModal\" id=\"link1\" 
        data-ticketid=\"" . $row["TicketID"] . "\" data-rowid=\"" . $row["ID"] . "\">" . $row["BoardingPoint"] . "</a></td>
        <td> " . $row["Tickets"] . "</td><td> " . $row["Rate"] . "</td><td>"  . $row["Total"] . "</td><td>" . $row["Commision"] . 
        "</td><td>" . $row["GrandTotal"] . "</td></tr> ";
     
        
        echo $str;
       
    }
    $sql = "SELECT sum(Tickets) as tickets, sum(Rate) as rate, sum(Total) as total, sum(Commision) as com, sum(GrandTotal) as gt FROM `ticketdetails` WHERE TicketID = " . $ticketid ;
    //echo $sql;
    $result = $conn->query($sql);

    $count = 0;
    if ($result->num_rows > 0) {
        // need to populate the entire page using the date and busnumber
        while($row = $result->fetch_assoc()) {
            $str = "<tr><th>Total</th>  <td></td><td> " . $row["tickets"] . "</td><td> " . "   " . "</td><td>"  . $row["total"] . "</td>
           <td>" . $row["com"] . "</td><td>" .$row["gt"] . "</td></tr> ";
    
            echo $str;
        }
    } else {
        echo "nothing"; //no row 
    }
}
$conn->close();





?>