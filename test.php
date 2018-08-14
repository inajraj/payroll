<?php 

$bp = $_POST;
//$rate= $_POST['rate'];
//$ticket= $_POST['ticket'];
//$com = $_POST['com'];

# Get JSON as a string
$json_str = file_get_contents('php://input');

//var_dump(json_decode($json));
$results = json_decode($json_str, true);

echo $results['BP'] . " ". $results['ticket'] . " ". $results['rate'];

include 'SqlConnection.php';

var rowid = parseInt($results['rowid']);
var ticketid = parseInt($results['ticketid']);

var total = parseInt($results['ticket']) * parseInt($results['rate']) 
var gt = total + parseInt($results['com']);

if (data_id == 0) 
    $sql = "INSERT INTO ticketdetails(`TicketID`, `BoardingPoint`, `Tickets`, `Rate`, `Commision`, `GrandTotal`, `Total`) 
         VALUES (" . $results['ticketid'] . "," . $results['BP'] . "," . $results['ticket'] . "," . $results['rate'] . "," . $results['com']
         . "," . gt . "," . total . ")";
else
    $sql = "SELECT value from referencedata where type = 'Driver'";

echo $sql;

$conn->close();

?>