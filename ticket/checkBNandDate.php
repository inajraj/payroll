
<?php

# Get JSON as a string
$json_str = file_get_contents('php://input');

//var_dump(json_decode($json));
$results = json_decode($json_str, true);

//echo $results['BP'] . " ". $results['ticket'] . " ". $results['rate'];

include '../SqlConnection.php';
//select the row which has this date and busnumber if it is there...
$sql = "SELECT * from ticketmaster where BusNumber = '" . $results['bn'] . "' and Date = '" . $results['inputDate'] . "'";
//echo $sql;
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // need to populate the entire page using the date and busnumber
    while($row = $result->fetch_assoc()) {
        
        echo trim($row["Driver1"]) . "~" . $row["Driver2"] . "~" . $row["Cleaner"] . "~" . $row["ID"];
       
    }
} else {
    echo "nothing"; //no row 
}
$conn->close();


?>