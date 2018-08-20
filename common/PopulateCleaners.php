
<?php

include 'SqlConnection.php';

$sql = "SELECT value from referencedata where type = 'Cleaner'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $t = $row["value"];
        echo '<option value="'.$t.'" >'. $t.'</option>';
       
    }
} else {
    echo "0 results";
}
$conn->close();


?>