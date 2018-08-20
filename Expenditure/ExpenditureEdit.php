 

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title" id="headerId" data-rowid="0" data-tripid="0"></h4>
      </div>
      <div class="row mt-2">
            <div class="col-sm-1"></div>
            <label for="inputBP" class="col-sm-3 col-form-label">Expense Type</label>
            <div class="col-sm-5">
            <select id="selectET"  class="form-control">
                <option disabled selected value=""> -- select -- </option>
                <?php include 'PopulateExpenseTypes.php';?>
            </select>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-sm-1"></div>
            <label for="inputName" class="col-sm-3 col-form-label">Name</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="inputName" name="name" placeholder="Name">
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-sm-1"></div>
            <label for="inputExp" class="col-sm-3 col-form-label">Expense</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="inputExp" name="exp" placeholder="Expenditure" >
            </div>
        </div>
       
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal" id="btnSave">Save</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
      </div>
    </div>