
<?php

# Get JSON as a string
$json_str = file_get_contents('php://input');

//var_dump(json_decode($json));
$results = json_decode($json_str, true);

//echo $results['BP'] . " ". $results['ticket'] . " ". $results['rate'];

include '../common/SqlConnection.php';
//select the row which has this date and busnumber if it is there...
$sql = "SELECT * from employeemaster where EmpId = '" . $results['EmpID'] . "'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // need to populate the entire page using the date and busnumber
    $json = array();
    while($row = mysqli_fetch_assoc($result)){
        $json[] = $row;
        }
    echo json_encode($json);
} else {
    echo "nothing"; //no row 
}
$conn->close();


?>