<?php 

$bp = $_POST;
//$rate= $_POST['rate'];
//$ticket= $_POST['ticket'];
//$com = $_POST['com'];

# Get JSON as a string
$json_str = file_get_contents('php://input');

//var_dump(json_decode($json));
$results = json_decode($json_str, true);

include 'SqlConnection.php';

$tripid = (int)($results['tripid']);
//before we make insert or update we need to make sure the driver and cleaner information is not duplicated
//the selected drivers can not be part of other buses in the same date similarly cleaners also

$sql = "SELECT * FROM `tripmaster` WHERE DATE = '" . $results['inputDate']  . "' AND (DRIVER1 = '" .$results['driver1'] . "'
OR Driver2 = '" . $results['driver1'] . "') AND BusNumber <> '" . $results['bn'] . "'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    exit("Driver " . $results['driver1'] . " is already assigned to another bus on this date!");
}

$sql = "SELECT * FROM `tripmaster` WHERE DATE = '" . $results['inputDate']  . "' AND (DRIVER1 = '" .$results['driver2'] . "'
OR Driver2 = '" . $results['driver2'] . "') AND BusNumber <> '" . $results['bn'] . "'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    exit( "Driver " . $results['driver2'] . " is already assigned to another bus on this date!");
}

$sql = "SELECT * FROM `tripmaster` WHERE DATE = '" . $results['inputDate']  . "' AND CLEANER = '" .$results['cleaner'] . "'
AND BusNumber <> '" . $results['bn'] . "'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    exit("Cleaner " . $results['cleaner'] . " is already assigned to another bus on this date!");
}

//if ticket id is 0 then we meed to insert the master record also otherwise we may need to update the driver cleaners details only
if ($tripid > 0)
    //update
    $sql = "UPDATE tripmaster SET Driver1 =  '" . $results['driver1'] . "', Driver2 = '" . $results['driver2'] .  "', Cleaner = '" . 
    $results['cleaner'] . "' WHERE ID = " . $tripid  ;
else
    //insert
    $sql = "INSERT INTO tripmaster(`BusNumber`, `Date`, `Driver1`, `Driver2`, `Cleaner`) 
    VALUES ('" . $results['bn'] . "','" . $results['inputDate'] . "','" . $results['driver1'] . "','" 
    . $results['driver2'] . "','" . $results['cleaner'] ."')";

echo $sql;

 $result = $conn->query($sql);

 if ($tripid==0)
 {
    //as we have inserted a new record we need to fetch the ID for ticketID to insert the row
    $sql = "select ID from tripmaster WHERE Date = '" . $results['inputDate'] . "' and BusNumber = '" .  $results['bn'] . "'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        // need to populate the entire page using the date and busnumber
        $row = $result->fetch_assoc();
        $tripid =  $row["ID"];
        
    }
}

echo  "tripid " . $tripid;
    
//echo $sql;

$result = $conn->query($sql);

$conn->close();



?>