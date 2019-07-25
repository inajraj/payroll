<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Payroll</title>

<link rel="stylesheet" href="/css/sidemenu.css">
<link rel="stylesheet" href="/css/bootstrap.min.css">

<SCRIPT id=jQuery src="/js/jquery-3.3.1.min.js" type="text/javascript"></SCRIPT>
<SCRIPT id=jQueryUI src="/js/jquery-ui-1.12.1/jquery-ui.min.js" type="text/javascript"></SCRIPT>
<link id=jQueryUICSS rel="stylesheet" href="/js/jquery-ui-1.12.1/jquery-ui.min.css" type="text/css"/>

<script src="/js/Popper.js"></script>
<script src="/js/tether.min.js"></script>
<script src="/js/bootstrap.min.js"></script>
<script src="../scripts/sal-master-util.js"></script>

<script>
//window.alert = function() {
   // debugger;
//}
</script>


</head>
<body>
<div class="container">

<!-- end php code -->

<br>
<br>

<div class="container">
    <div class="row">
        <?php include '../common/RightPanel.php';?>
        <div class="col-sm-9  ">
            <div class="page-header">
                <h2>Salary Master </h2> 
            </div>
            <br>
            <br>
        <?php include '../../../../Documents/codegen/SalaryMaster-auto-screen.php'; ?>  
        
    </div>
</div>

<div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal" id="btnSave">Save</button>
        <button type="button" class="btn btn-default" data-dismiss="modal" id="btnCancel">Cancel</button>
</div>



</body>
</html>