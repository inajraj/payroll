<?php 

$bp = $_POST;
//$rate= $_POST['rate'];
//$ticket= $_POST['ticket'];
//$com = $_POST['com'];

# Get JSON as a string
$json_str = file_get_contents('php://input');

//var_dump(json_decode($json));
$results = json_decode($json_str, true);

include '../SqlConnection.php';

$rowid = (int)($results['rowid']);
$ticketid = (int)($results['ticketid']);


$total = (int) ($results['ticket']) * (int)($results['rate']) ;
$gt = $total + (int)($results['com']);

if ($rowid == 0) 
    $sql = "INSERT INTO ticketdetails(`TicketID`, `BoardingPoint`, `Tickets`, `Rate`, `Commision`, `GrandTotal`, `Total`) 
         VALUES (" . $ticketid . ", '" . $results['BP'] . "'," . $results['ticket'] . "," .  $results['rate'] .  "," . $results['com']
         . "," . $gt . "," . $total . ")";
else
    $sql = "UPDATE `ticketdetails` SET `BoardingPoint`= '" . $results['BP'] . "',`Tickets`= " . $results['ticket'] .",`Rate`= ". $results['rate'] .
             ",`Commision`= ". $results['com'] . " ,`GrandTotal`= " .$gt . ",`Total`= " .$total." WHERE ID = " . $results['rowid'] ;

//echo $sql;

$result = $conn->query($sql);

$conn->close();

include 'fetchTicketRevenueDetails.php';



?>