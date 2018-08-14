 

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title" id="headerId" data-rowid="0" data-ticketid="0">Edit Ticket Details</h4>
      </div>
      <div class="row mt-2">
            <div class="col-sm-1"></div>
            <label for="inputBP" class="col-sm-4 col-form-label">Boarding Point</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="inputBP" name="bp" placeholder="Boarding Point">
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-sm-1"></div>
            <label for="inputTicket" class="col-sm-4 col-form-label">Ticket</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="inputTicket" name="ticket" placeholder="No. of tickets">
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-sm-1"></div>
            <label for="inputRate" class="col-sm-4 col-form-label">Rate</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="inputRate" name="rate" placeholder="Rate" >
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-sm-1"></div>
            <label  class="col-sm-4 col-form-label">Total</label>
            <div class="col-sm-4">
            <label  class="col-sm-4 col-form-label" id="inputTotal"></label>
            </div>
        </div>
        
        <div class="row mt-2">
            <div class="col-sm-1"></div>
            <label for="inputCommission" class="col-sm-4 col-form-label">Commission</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="inputCommission" name="commission" placeholder="Commission">
            </div>
        </div>

        <div class="row mt-2">
            <div class="col-sm-1"></div>
            <label  class="col-sm-4 col-form-label">Grand Total</label>
            <div class="col-sm-4">
            <label  class="col-sm-4 col-form-label" id="inputGT"></label>
            </div>
        </div>
      
      <div class="modal-footer">
        <button type="button" class="btn" data-dismiss="modal" id="btnSave">Save</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
      </div>
    </div>