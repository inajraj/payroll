<?php 


# Get JSON as a string
$json_str = file_get_contents('php://input');

//var_dump(json_decode($json));
$results = json_decode($json_str, true);

include '../SqlConnection.php';

$rowid = (int)($results['rowid']);
$ticketid = (int)($results['ticketid']);
//if ticket id is 0 then we meed to insert the master record also otherwise we may need to update the driver /cleaners details only
if ($ticketid > 0)
    //update
    $sql = "UPDATE expendituremaster SET Driver1 =  '" . $results['driver1'] . "', Driver2 = '" . $results['driver2'] .  "', Cleaner = '" . 
    $results['cleaner'] . "' WHERE ID = " . $ticketid  ;
else
    //insert
    $sql = "INSERT INTO expendituremaster(`BusNumber`, `Date`, `Driver1`, `Driver2`, `Cleaner`) 
    VALUES ('" . $results['bn'] . "','" . $results['inputDate'] . "','" . $results['driver1'] . "','" 
    . $results['driver2'] . "','" . $results['cleaner'] ."')";

//echo $sql;

 $result = $conn->query($sql);

 if ($ticketid==0)
 {
    //as we have inserted a new record we need to fetch the ID for ticketID to insert the row
    $sql = "select ID from expendituremaster WHERE Date = '" . $results['inputDate'] . "' and BusNumber = '" .  $results['bn'] . "'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        // need to populate the entire page using the date and busnumber
        $row = $result->fetch_assoc();
        $ticketid =  $row["ID"];
        
    }
}

echo  $ticketid;
    
//echo $sql;

$result = $conn->query($sql);

$conn->close();



?>