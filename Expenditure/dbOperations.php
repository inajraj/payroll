<?php 


# Get JSON as a string
$json_str = file_get_contents('php://input');

//var_dump(json_decode($json));
$results = json_decode($json_str, true);



include '../SqlConnection.php';

$rowid = (int)($results['rowid']);
$tripid = (int)($results['tripid']);
$action = $results['action'];

$expType = $results['expType'];
$name = $results['name'];
$cost = $results['expense'];

//based on the expType

//if rowid  0 then we meed to insert a new rocord
if ($rowid > 0)
    if ($action == "D") //delete
        $sql = "DELETE FROM expendituredetails WHERE ID = " . $rowid  ;
    else
        //update
        $sql = "UPDATE expendituredetails SET  ExpType = '" . $expType. "', Name =  '" . $name . "', Expenditure = " . $cost ." WHERE ID = " . $rowid  ;
else 
    //insert
    $sql = "INSERT INTO expendituredetails(`TripID`, `ExpType`, `Name`, `Expenditure`) VALUES ($tripid,'" .$expType . "','" . $name . "'," . $cost . ")";


 echo $sql;

 $result = $conn->query($sql);

 
    
//echo $sql;

$conn->close();

include 'fetchExpenditureDetails.php';

?>