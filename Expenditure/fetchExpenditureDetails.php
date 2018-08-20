<?php

# Get JSON as a string
$json_str = file_get_contents('php://input');

//var_dump(json_decode($json));
$results = json_decode($json_str, true);


$rowid = (int)($results['rowid']);
$tripid = (int)($results['tripid']);

echo $tripid;

//echo $results['BP'] . " ". $results['ticket'] . " ". $results['rate'];

include '../SqlConnection.php';
//select the row which has this date and busnumber if it is there...
$sql = "SELECT * from expendituredetails where TripID = " . $tripid . " ORDER BY EXPTYPE";
//echo $sql;
$result = $conn->query($sql);

$count = 0;
$ExpenseType = "";
$total = 0;
$str = "";

if ($result->num_rows > 0) {
    // need to populate the entire page using the date and busnumber
    while($row = $result->fetch_assoc()) {

        $count += 1;
        if ($count == 1)
            $checked = "checked";
        else
            $checked = "";


        if ($ExpenseType != $row["ExpType"]) {
            //previous total row we need to evolve
            if ($total > 0) {
                $str = $str .   "<tr><td scope='row' colspan='2' style='width:50%;font-weight:bold'>Total</td><td style='width : 20%'> " . $total . "</td> </tr>";
                $total = 0;
            }
            
            //need to form the sub title and start the total count
            $ExpenseType = $row["ExpType"];
            $str = $str . formSubTitleRow($ExpenseType);
            $strRow = "";

        }

        $str = $str . "<tr><td scope='row' style='text-align:center;width:10%'><input type='radio' 
                 name='radioGroup' id='r" . $count . "' data-rowid='" .$row["ID"] ."' data-exptype='" . $ExpenseType . "'/></td>
                <td style='width: 40%'>" . $row["Name"] . "</td><td style='width: 20%'>" . $row["Expenditure"] . "</td></tr>";

        $total = $total + (int) $row["Expenditure"] ;

        
    }
    
    //need to add the last total row
    $str = $str .  "<tr><td scope='row' colspan='2' style='width : 50%'>Total</td><td style='width : 20%'> " . $total . "</td> </tr>";
    echo $str;
}
else
        echo 'nothing';
$conn->close();

function formSubTitleRow($ExpenseType)
{
    return "<tr><th scope='row' colspan='3'>" .$ExpenseType . "</th> </tr>";
}



?>