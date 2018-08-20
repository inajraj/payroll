
<?php

# Get JSON as a string
$json_str = file_get_contents('php://input');



//var_dump(json_decode($json));
$results = json_decode($json_str, true);


$rowid = (int)($results['rowid']);
$ticketid = (int)($results['ticketid']);

//echo $results['BP'] . " ". $results['ticket'] . " ". $results['rate'];

include '../SqlConnection.php';

$sql = "DELETE from ticketDetails where ID = " . $rowid ;
//echo $sql;
$result = $conn->query($sql);
$conn->close();



include "fetchTicketRevenueDetails.php";

?>