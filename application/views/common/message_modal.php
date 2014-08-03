<div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <!--<h4 class="modal-title" id="myModalLabel">Modal title</h4> -->
      </div>
      <div class="modal-body">
        <div class="alert alert-danger alert-dismissable info">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>        
      </div>
    </div>
  </div>
</div>

<script>

    var ModalManager = function(){
  
      this.showModalMessage = function(message){
        $('.modal-body .info').html(message);
        $('#messageModal').modal();  

      }

    }

    var modalManager = new ModalManager();

</script>