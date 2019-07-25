<?php


include 'SqlConnection.php';
//select the row which has this date and busnumber if it is there...
$sql = "SELECT  OptionValue from configtable where OptionType = '" . $selectOption . "'";
//echo $sql;
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // need to populate the entire page using the date and busnumber
   
    $str =  " ";
    while($row = $result->fetch_assoc()) {
      $str .=  "<option value=" . $row['OptionValue'] . ">" . $row['OptionValue'] . "</option>\n";
    }
    echo $str;
    
} else {
    echo "nothing"; //no row 
}
$conn->close();


?>