    <div class="row">
            <label for="inputDate" class="col-sm-1 col-form-label">Date</label>
            <div class="col-sm-3">
                <input type="date" class="form-control" id="inputDate" name="date" placeholder="Date" data-tripid="0" data-direction="U">
            </div>
            <label for="inputBN" class="col-sm-2 col-form-label">Bus Number</label>
            <div class="col-sm-3 dropdown">
                
             <select id="selectBN"  class="form-control">
                <option disabled selected value=""> -- select -- </option>
                <?php include '../Common/PopulateBusNumbers.php';?>
            </select> 
               
    </div>


    </div>
    <br>
    <div class="row">
        <label for="inputDriver1" class="col-sm-1 col-form-label">Driver1</label>
        <div class="col-sm-3 ">
            <label class="col-sm-3 col-form-label font-weight-bold" id="lblDriver1"></label>
        </div>
        <label for="inputDriver2" class="col-sm-1 col-form-label">Driver2</label>
        <div class="col-sm-3 ">
            <label class="col-sm-3 col-form-label font-weight-bold" id="lblDriver2"></label>
        </div>
        <label for="inputCleaner" class="col-sm-1 col-form-label">Cleaner</label>
        <div class="col-sm-3 dropdown">
            <label class="col-sm-3 col-form-label font-weight-bold" id="lblCleaner"></label>
        </div>
    </div>