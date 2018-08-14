<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>My First PHP</title>

<link rel="stylesheet" href="css/custom.css">
<link rel="stylesheet" href="css/sidemenu.css">
<link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<script src ="scripts/util.js"></script>

<style>
  p {
    margin: 8px;
    font-size: 16px;
  }
  .selectedd {
    background: blue;
  }
  .highlightd {
    background: yellow;
  }
  </style>
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
    <div class="col-sm-3 col-md-2 sidebar">
                <ul class="nav nav-sidebar">
                    <li class="active"><a href="#">DashBoard</a></li>
                    <li><a href="#">Tickets</a></li>
                    <li><a href="#">Expenses</a></li>
                    <li><a href="#">Luggage</a></li>
                    <li><a href="#">Reports</a></li>
                </ul>
    </div>
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
        <input type="date" class="form-control" id="inputDate" name="date" placeholder="Date">
        </div>
        <label for="inputBN" class="col-sm-2 col-form-label">Bus Number</label>
        <div class="col-sm-4">
        <input type="text" class="form-control" id="inputBN" name="BN" placeholder="Bus Number">
        </div>


        </div>
        <br>
        <div class="row">
        <label for="inputDriver1" class="col-sm-1 col-form-label">Driver1</label>
        <div class="col-sm-3">
        <input type="text" class="form-control" id="inputDriver1" name="driver1" placeholder="Driver 1 Name">
        </div>
        <label for="inputDriver2" class="col-sm-1 col-form-label">Driver2</label>
        <div class="col-sm-3">
        <input type="text" class="form-control" id="inputDriver2" name="driver2" placeholder="Driver 2 Name">
        </div>
        <label for="inputCleaner" class="col-sm-1 col-form-label">Cleaner</label>
        <div class="col-sm-3">
        <input type="text" class="form-control" id="inputCleaner" name="driver1" placeholder="Cleaner Name">
        </div>
        </div>
        <br>
        <br>



        <table class="table table-bordered table-hover table-sm " id="myTable" >
          <thead>
            <tr>
              <th scope="col">S. No</th>
              <th scope="col">Boarding Point</th>
              <th scope="col">Ticket</th>
              <th scope="col">Rate</th>
              <th scope="col">Total</th>
              <th scope="col">Commission</th>
              <th scope="col">Grand Total</th>
            </tr>
          </thead>
          <tbody>
            <tr onclick="mytablerow(this)">
              <th scope="row">1</th>
              <td><a href="xx.com">Sivakasi</a></td>
              <td>3</td>
              <td>750</td>
              <td>2250</td> 
              <td>50</td>
              <td>2300</td>
            </tr>
            <tr  onclick="mytablerow(this)">
                <th scope="row">2</th>
                <td>Egmore</td>
                <td>2</td>
                <td>500</td>
                <td>1000</td>
                <td>50</td>
                <td>1050</td>
              </tr> 
              
            <tr>
              <th scope="row">Total</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>


        <div class="form-group row">
        <div class="offset-sm-2 col-sm-2">
        <input type="button" value="Add" name="add" class="btn btn-primary"/>
        </div>
        <div class="offset-sm-2 col-sm-2">
        <input type="button" value="Edit" name="edit" class="btn btn-primary"/>
        </div>
        <div class="offset-sm-2 col-sm-2">
        <input type="button" value="Delete" name="delete" class="btn btn-primary"/>
        </div>
        </div>
        </form>
        </div>
    </div>
  </div>
</div>

<script src="js/tether.min.js"></script>
<script src="js/bootstrap.min.js"></script>

</body>
</html>