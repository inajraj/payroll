<?php 
function checkBlank($fieldName, $dateVal) {
    if ($dateVal != '' ) {
        $tmp =  $fieldName . " = '" . $dateVal . "',";
        return $tmp;
    }
    else
        return ' ';

}
# Get JSON as a string
$json_str = file_get_contents('php://input');

//var_dump(json_decode($json));
$results = json_decode($json_str, true);

include '../common/SqlConnection.php';

//get the new emp id max + 1

$sql = "select max(EmpID)+1 as EmpID from EmployeeMaster";

//$result = $conn->query($sql);
//$row = $result->fetch_assoc();

//$empid = $row['EmpID'];

$s = "update EmployeeMaster SET EmpID = '" . $results['EmpID'] . "', FirstName = '" . $results['FirstName'] . "', " . checkBlank(MiddleName, $results['MiddleName']) ." LastName = '" . $results['LastName'] . "', " . checkBlank(Initials, $results['Initials']) ." FullName = '" . $results['FullName'] . "', " . checkBlank(FatherName, $results['FatherName']) ." " . checkBlank(SpouseName, $results['SpouseName']) ." DOB = '" . $results['DOB'] . "', Department = '" . $results['Department'] . "', CenterName = '" . $results['CenterName'] . "', JoiningDate = '" . $results['JoiningDate'] . "', BusinessTitle = '" . $results['BusinessTitle'] . "', MobileNo = '" . $results['MobileNo'] . "', " . checkBlank(AlternateContactNo, $results['AlternateContactNo']) ." " . checkBlank(UserID, $results['UserID']) ." Active = '" . $results['Active'] . "'" ." where EmpID = '" . $results['EmpID'] . "'";
$sql = " Update EmployeeMaster SET FirstName = '" 
. $results['FirstName'] . "',MiddleName = '" . $results['MiddleName'] . "',LastName = '" 
. $results['LastName'] . "',Initials = '" . $results['Initials'] . "',FatherName = '" . $results['FatherName'] 
. "',SpouseName = '" . $results['SpouseName'] . "',DOB = '" . $results['DOB'] 
. "',CompanyID = '" . $results['CompanyID'] . "',Department = '" 
. $results['Department'] . "',BusinessTitle = '" . $results['BusinessTitle'] 
. "',JoiningDate = '" . $results['JoiningDate'] . "',JobBand = '" 
. $results['JobBand'] . "',MobileNo = '" . $results['MobileNo'] 
. "',AlternateContactNo = '" 
. $results['AlternateContactNo'] . "',PAN = '" . $results['PAN'] . "',AADHAAR = '" 
. $results['AADHAAR'] . "',PF_UAN = '" . $results['PF_UAN'] . "',PassportNo = '" . $results['PassportNo'] 
. "',Active = '" . $results['Active'] ."'" .  checkBlank("ResignationDate",$results['ResignationDate']) 
.  checkBlank("LeavingDate", $results['LeavingDate'])
. " Where EmpID = '" . $results['EmpID'] . "'";

//$result = $conn->query($sql);
    
echo $s;

//$result = $conn->query($sql);

$conn->close();



?>