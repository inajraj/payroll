<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>My First PHP</title>

<link rel="stylesheet" href="../css/sidemenu.css">
<link rel="stylesheet" href="../css/bootstrap.min.css">
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/jquery-1.12.4.js"></script>
<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<script src="../js/Popper.js"></script>
<script src="../js/tether.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../scripts/expenditure-util.js"></script>

<script>
//window.alert = function() {
   // debugger;
//}
</script>

<style>
.table-fixed tbody {
    height: 250px;
    overflow-y: auto;
    width: 100%;
}
.table-fixed thead,
.table-fixed tbody,
.table-fixed tr,
.table-fixed td,
.table-fixed th {
    display: block;
}
.table-fixed tr:after {
    content: "";
    display: block;
    visibility: hidden;
    clear: both;
}
.table-fixed tbody td,
.table-fixed thead > tr > th {
    float: left;
}
.table > thead > tr > th,
.table > thead > tr > td {
    font-size: .9em;
    font-weight: 400;
    border-bottom: 0;
    letter-spacing: 1px;
    vertical-align: top;
    padding: 6px;
    background: #51596a;
    text-transform: uppercase;
    color: #ffffff;
}
.table > tbody > tr > td {
    font-size: 1.0em;
    font-weight: 400;
    border-bottom: 0;
    letter-spacing: 1px;
    vertical-align: top;
    padding: 5px;
   
}
</style>
</head>
<body>
<br>
<div class="container">
  <div class="row">
    <?php include '../RightPanel.php';?>
    <div class="col-sm-9  ">
        <div class="page-header">
            <h2>Expenditure Form</h2> 
          <p>Plese enter the expenditure details..</p> 
        </div>
        
        <form role="form" method="post" >
        <br>
        
        <div class="row">
            <label for="inputDate" class="col-sm-1 col-form-label">Date</label>
            <div class="col-sm-3">
                <input type="date" class="form-control" id="inputDate" name="date" placeholder="Date" data-tripid="0">
            </div>
            <label for="inputBN" class="col-sm-2 col-form-label">Bus Number</label>
            <div class="col-sm-3 dropdown">
                
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
    <table class="table table-bordered table-hover table-fixed " id="driverTable" >
        <thead>
        <tr>
            <th scope="col" style="width: 10%">Sel</th>
            <th scope="col" style="width: 40%">Name</th>
            <th scope="col" style="width: 20%">Expense</th>
         
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>


    <div class="form-group row">
        <div class="offset-sm-2 col-sm-2">
            <input type="button" value="Add" name="add" id="btnAdd1" class="btn btn-primary"  data-toggle="modal" data-target="#myModal"/>
        </div>
        <div class="offset-sm-2 col-sm-2">
            <input type="button" value="Edit" id="btnEdit1" class="btn btn-primary"  data-toggle="modal" data-target="#myModal" />
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
<!-- <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button> -->
<?php include 'ExpenditureEdit.php';?>
</div>
</div>



</body>
</html>