<?php 

function checkBlank($fieldName, $results) {
    //this will check if the value is not blank to be added as a field
    //in the insert query insert into fieldname
    if ($results[$fieldName] != '' ) {
        $tmp = "," . $fieldName ;
        return $tmp;
    }
    else
        return ' ';

}

function removeBlank($dateVal) {
    //this will check wheher the value is blank or not if it is blank then it 
    //will not crate the values string (insert query)
    if ($dateVal != '' ) {
        $tmp = ",'"  . $dateVal . "'";
        return $tmp;
    }
    else
        return ' ';

}

# Get JSON as a string
$json_str = file_get_contents('php://input');

//var_dump(json_decode($json));
$results = json_decode($json_str, true);

echo($results);

include '../common/SqlConnection.php';

//get the new emp id max + 1

$sql = "select max(EmpID)+1 as EmpID from EmployeeMaster";

$result = $conn->query($sql);
$row = $result->fetch_assoc();

$empid = $row['EmpID'];

    //insert
$sql = "Insert into EmployeeMaster (EmpID,FirstName " . checkBlank("MiddleName", $results)
. ",LastName" . checkBlank("Initials",$results) . ",FatherName,SpouseName,DOB,CompanyID,Department,BusinessTitle,
JoiningDate,JobBand,MobileNo,AlternateContactNo,PAN,AADHAAR,PF_UAN,PassportNo,
Active " . checkBlank("ResignationDate", $results) . checkBlank("LeavingDate", $results) .") 
Values ('" . $empid . "','" . 
$results['FirstName'] . "'" . removeBlank($results['MiddleName']) . ",'" . $results['LastName'] . "'" . 
removeBlank($results['Initials']) . ",'" . $results['FatherName'] . "','" . 
$results['SpouseName'] . "','" . $results['DOB'] . "','" . $results['CompanyID'] . "','" . 
$results['Department'] . "','" . $results['BusinessTitle'] . "','" . $results['JoiningDate'] . 
"','" . $results['JobBand'] . "','" . $results['MobileNo'] . "','" . 
$results['AlternateContactNo'] . "','" . $results['PAN'] . "','" . $results['AADHAAR'] . "','" . 
$results['PF_UAN'] . "','" . $results['PassportNo'] . "','" . 
$results['Active'] . "'" . removeBlank($results['ResignationDate'])  .
removeBlank( $results['LeavingDate']) . ")";

//$result = $conn->query($sql);
    
echo $sql;

//echo $result;

$conn->close();


?>