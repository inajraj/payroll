<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>My First PHP</title>

<link rel="stylesheet" href="../css/sidemenu.css">
<link rel="stylesheet" href="../css/bootstrap.min.css">
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

<script src="../js/Popper.js"></script>
<script src="../js/tether.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../scripts/ticket-revenue-util.js"></script>

<script>
//window.alert = function() {
   // debugger;
//}
</script>

</head>
<body>
<div class="container">
<?php
$errEmail = $errPass= $errName="";
if(isset($_POST["submit"])) {

$email = $_POST['email'];
$name = $_POST['user'];
$password = $_POST['password'];
$valid=true;
// Check if name has been entered
if(empty($_POST['user'])){
$errName= 'Please enter your user name';
$valid=false;
}
// Check if email has been entered and is valid
if(empty($_POST['email'])){
$errEmail = 'Please enter a valid email address';
$valid=false;
}
// check if a valid password has been entered
if(empty($_POST['password']) || (preg_match("/^.*(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/", $_POST["password"]) === 0)) {
$errPass = '<p class="errText">Password must be at least 8 characters and must contain at least one lower case letter, one upper case letter and one digit</p>';
$valid=false;
}
if($valid){
echo "The form has been submitted";
}

}
?>
<!-- end php code -->

<br>
<br>

<div class="container">
  <div class="row">
    <?php include '../RightPanel.php';?>
    <div class="col-sm-9  ">
        <div class="page-header">
            <h2>Ticket Revenue Form</h2> 
          <p>Plese enter the ticket revenue details..</p> 
        </div>
        
        <form role="form" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
        <br>
        <br>
        <div class="row">
            <label for="inputDate" class="col-sm-2 col-form-label">Date</label>
            <div class="col-sm-4">
                <input type="date" class="form-control" id="inputDate" name="date" placeholder="Date" data-ticketid="0">
            </div>
            <label for="inputBN" class="col-sm-2 col-form-label">Bus Number</label>
            <div class="col-sm-4 dropdown">
                
             <select id="selectBN"  class="form-control">
                <option disabled selected value=""> -- select -- </option>
                <?php include '../PopulateBusNumbers.php';?>
            </select> 

            
               
        </div>


    </div>
    <br>
    <div class="row">
        <label for="inputDriver1" class="col-sm-1 col-form-label">Driver1</label>
        <div class="col-sm-3 dropdown">
             <select id="selectDriver1"  class="form-control" data-val="0">
                <option disabled selected value="0"> -- select -- </option>
                <?php include '../PopulateDrivers.php';?>
            </select> 
        </div>
        <label for="inputDriver2" class="col-sm-1 col-form-label">Driver2</label>
        <div class="col-sm-3 dropdown">
             <select id="selectDriver2"  class="form-control" data-val="0">
                <option disabled selected value="0"> -- select -- </option>
                <?php include '../PopulateDrivers.php';?>
            </select> 
        </div>

        <label for="inputCleaner" class="col-sm-1 col-form-label">Cleaner</label>
        <div class="col-sm-3 dropdown">
             <select id="selectCleaner"  class="form-control">
                <option disabled selected value="0"> -- select -- </option>
                <?php include '../PopulateCleaners.php';?>
            </select> 
        </div>
    </div>
   
    <br>
    <br>



    <table class="table table-bordered table-hover table-sm " id="detailTable" >
        <thead>
        <tr>
            <th scope="col">Sel</th>
            <th scope="col">Boarding Point</th>
            <th scope="col">Ticket</th>
            <th scope="col">Rate</th>
            <th scope="col">Total</th>
            <th scope="col">Commission</th>
            <th scope="col">Grand Total</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>


    <div class="form-group row">
        <div class="offset-sm-2 col-sm-2">
            <input type="button" value="Add" name="add" id="btnAdd" class="btn btn-primary" data-toggle="modal" data-target="#myModal"/>
        </div>
        <div class="offset-sm-2 col-sm-2">
            <input type="button" value="Edit" id="btnEdit" class="btn btn-primary" data-toggle="modal" data-target="#myModal"/>
        </div>
        <div class="offset-sm-2 col-sm-2">
            <input type="button" value="Delete" name="delete" class="btn btn-primary" id="btnDelete"/>
        </div>
    </div>
    </form>
    </div>
    </div>
  </div></div>

  <!-- Trigger the modal with a button -->
<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
<?php include 'ticketEdit.php';?>
</div>
</div>



</body>
</html>