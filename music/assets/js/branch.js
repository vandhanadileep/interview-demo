/*
    * code written by Athulya Bhaskar
    * oct/21/2022 12:06
*/
 $(document).ready(function() {
  var scroll = 0;
    // var delay = 1000;
    $(window).scroll(function(event){
      var action = "inactive";
      var limit = $('#limit').val();
      var start = $('#start').val();
      var pageno = $('#pageno').val(); //current page
      var totalPage = $('#totalPage').val();

      var nextPage = parseInt($('#pageno').val())+1; //next page

      if($(window).scrollTop() + $(window).height() >$('#branchList').height() && action == 'inactive'){

           action = 'active';
           if( totalPage >= nextPage && scroll == 0){
              $('#loading-logo').html('<div class="d-flex justify-content-center"><div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" ></div></div>');
              scroll = 1;              
              $.ajax({
                type : "POST",
                url  : "ajax/branch-pagination.php",
                async: false,
                timeout: 5000,
                data : {'limit':limit,'page':nextPage},
                success: function(data){
                  if(data!=''){
                    $('#pageno').val(nextPage);
                    $('#branchList').append(data);
                    scroll = 0;   
                  }
                },

                complete : function(data){
                    $('#loading-logo').html('');
                }
              });
              
           }     
      }           
    });

    $('#branchList').on('click','.view', function(event){
          // console.log("hii");
          var branchData = JSON.parse($(this).attr('data-info'));
          $('#tempDisable').prop('checked',false);
          $('#tempDisable').attr("disabled", false);

          // console.log(branchData.status);

          /*
            * hidden variables uroId ,uroStatus
          */
          
          $('#uroId').val(branchData.id);
          // $('#uroId').html(branchData.id);
          $('#uroStatus').html(branchData.status);
          $('#uroStatus').val(branchData.status);
          $('#uroTitle').html(branchData.title);
          $('#uroSubTitle').html(branchData.sub_title);
          if(branchData.address!=null || branchData.address!=""){
            $('#uroAddress').html(branchData.address);
          }
          if(branchData.address==null || branchData.address==""){

             $('#uroAddress').html( "<span style='color:black'>NA</span>" );
          }
          if(branchData.contact_numbers!=null || branchData.contact_numbers!=""){
            $('#uroContact').html(branchData.contact_numbers);
          }
           if(branchData.contact_numbers==null || branchData.contact_numbers==""){
            $('#uroContact').html( "<span style='color:black'>NA</span>" );
          }
          if(branchData.landphone!=null || branchData.landphone!=""){
            $('#uroLandLine').html(branchData.landphone);
          }
          if(branchData.landphone==null || branchData.landphone==""){
            $('#uroLandLine').html( "<span style='color:black'>NA</span>" );
          }
          if(branchData.whatsapp_numbers!=null || branchData.whatsapp_numbers!=""){
            $('#uroWhatsapp').html(branchData.whatsapp_numbers);
          }
          if(branchData.whatsapp_numbers==null || branchData.whatsapp_numbers==""){
            $('#uroWhatsapp').html( "<span style='color:black'>NA</span>" );
          }
          if(branchData.contact_emails!=null || branchData.contact_emails!=""){
            $('#uroEmails').html(branchData.contact_emails);
          }
          if(branchData.contact_emails==null || branchData.contact_emails==""){
            $('#uroEmails').html( "<span style='color:black'>NA</span>" );
          } 
          if(branchData.website!=null || branchData.website!=""){
            $('#uroWeb').html(branchData.website);
          }
           if(branchData.website==null || branchData.website==""){
            $('#uroWeb').html( "<span style='color:black'>NA</span>" );
          } 
          if(branchData.status =='2'){


            $('#statusMessage').html( "<span style='color:red;pt-5'>Temporarily closed</span>" );
            $('#tempStatus').hide();
          }
          else if(branchData.status =='1'){
             $('#tempMesage,#statusMessage').hide();
             $('#tempStatus').show();
          }
          else{
              $('#tempMesage,#statusMessage').hide();
             $('#tempStatus').hide();
          } 
          
            $('#editModal').attr('href','add-edit-branch-form.php?id='+branchData.id);
                  


    });

    /*

    * To update the status of the brach [Active , Blocked]

      * To Active

    */

    $('#branchList').on('click','.block',function(){
  
      var status = $(this).attr('data-status');

      /*

        * status = Blocked =0 , Active = 1, temporary Closed = 2

      */
      if( status==2 || status== 0 ){

        status = 1;
         text = "Are you sure you want to Activate Branch?";

      }
      else if( status== 1 ){

        status = 0;
        text = "Are you sure you want to Block Branch?";
      }
      var $this=$(this);
      // console.log(status);
      var info = JSON.parse($(this).attr('data-info'));
      id = info.id;
      if (status==1){
        $.ajax({
              type :"POST",
              url: "ajax/branch-status.php",
              data:{'id':id,'status':status},
              success: function(data) {
                if(true){
                  // console.log(data);
                   var viewId= $("#view-"+id).attr('data-info'); 
                   var branchData = JSON.parse(viewId); 
                   branchData.status= status;
                   modalData= JSON.stringify(branchData);  
                   $("#view-"+id).attr('data-info',modalData); 
                    $this.html("<i class='fas fa-ban'></i> Block");
                    $this.attr('data-status',status);
                    $('#tempMesage,#statusMessage').hide();
                    $('#activeMsg').show().delay(3000).fadeOut('fast');
                }
                else{
                  return false;
                }
                                         
             }
        });
      }
      else {
            id = $('#blockBranch').attr('data-id',id);
            status = $('#blockBranch').attr('data-status',status);
            $("#blockModal").modal('show'); 
      }        
               
    });

    /*

        *To Block

    */
    $('#blockBranch').on('click',function(){

        id = $('#blockBranch').attr('data-id');
        status = $('#blockBranch').attr('data-status');
        $.ajax({
              type :"POST",
              url: "ajax/branch-status.php",
              data:{'id':id,'status':status},
              success: function(data) {
                if(data==1){
                  // console.log(data);
                   var viewId= $("#view-"+id).attr('data-info'); 
                   var branchData = JSON.parse(viewId); 
                   branchData.status= status;
                   modalData= JSON.stringify(branchData);  
                   $("#view-"+id).attr('data-info',modalData); 
                    $("#activeStatus-"+id).html('<i class="fas fa-check"></i> Activate');
                    $("#activeStatus-"+id).attr('data-status',status);
                    $('#tempMesage,#statusMessage').hide();
                    $('#blockModal').modal('toggle');
                    $('#blockMsg').show().delay(3000).fadeOut('fast');
                    // $('#tempStatus').show();
                }
                else{
                  return false;
                }
                                         
             }
        });
    });

    // $('#branchList').on('click','.block',function(){
  
    //   var status = $(this).attr('data-status');

    //   /*

    //     * status = Blocked =0 , Active = 1, temporary Closed = 2

    //   */
    //   if( status==2 || status== 0 ){

    //     status = 1;
    //      text = "Are you sure you want to Activate Branch?";

    //   }
    //   else if( status== 1 ){

    //     status = 0;
    //     text = "Are you sure you want to Block Branch?";
    //   }
    //   var $this=$(this);
    //   // console.log(status);
    //   var info = JSON.parse($(this).attr('data-info'));
    //   id = info.id;
    //   if (confirm(text) == true){
    //     $.ajax({
    //           type :"POST",
    //           url: "ajax/branch-status.php",
    //           data:{'id':id,'status':status},
    //           success: function(data) {
    //             if(true){
    //               // console.log(data);
    //                var viewId= $("#view-"+id).attr('data-info'); 
    //                var branchData = JSON.parse(viewId); 
    //                branchData.status= status;
    //                modalData= JSON.stringify(branchData);  
    //                $("#view-"+id).attr('data-info',modalData); 
                   
    //                if(status == 1){
    //                   $this.html("<i class='fas fa-ban'></i>Block");
    //                   $this.attr('data-status',status);
    //                   $('#tempMesage,#statusMessage').hide();
    //                   $('#activeMsg').show().delay(3000).fadeOut('fast');

    //                }
    //                else if(status == 0){
    //                   $this.html('<i class="fas fa-check"></i>Activate');
    //                   $this.attr('data-status',status);
    //                   $('#tempMesage,#statusMessage').hide();
    //                    $('#blockMsg').show().delay(3000).fadeOut('fast');
    //                   // $('#tempStatus').show();

    //                } 
    //             }
    //             else{
    //               return false;
    //             }
                                         
    //          }
    //     });
    //   }
    //   else {
    //     return false;
    //   }        
               
    // });
   
    
    /*

    * To delete Branches from modal

    */
    $('#deleteBranch').on('click',function(){
      deleteId  = $(this).attr('data-id');
      $.ajax({
                type :"POST",
                url  :"ajax/branch-deletion.php",
                data :{'id':deleteId},
                success:function(data){
                  $('#branchInfo-'+deleteId).remove();
                  $('#deleteModal').modal('toggle');
                  $('#myModal').modal('hide');
                  $('#deleteMsg').show().delay(3000).fadeOut('fast');
                }
        });
      
    });
    /*

    * To delete Branches

    */
    // $('#branchList').on('click','.delete',function(){

    //   deleteData = $(this).attr('data-id');
    //   deleteId = $('#deleteBranch').attr('data-id',deleteData);
    //   $("#deleteModal").modal('show'); 
        
    // });
    
    /*

    * To delete Branches from modal

    */
    $('.modalDelete').on('click',function(){
      
      var id= $('#uroId').val();
      deleteId = $('#deleteBranch').attr('data-id',id);
      // $('#myModal').modal('toggle');
      $("#deleteModal").modal('show');       
    });

    /*

    * To update temporary status of Branches from confirmation modal

    */
    $('#disableBranch').on('click',function(){
      id  = $(this).attr('data-id');
      status  = $(this).attr('data-status');
      $.ajax({
                type :"POST",
                url  :"ajax/temp-disable.php",
                data :{'id':id,'status':status},
                success:function(data){       
                    if(data==1){
                       var viewId= $("#view-"+id).attr('data-info'); 
                       var branchData = JSON.parse(viewId); 
                       branchData.status= status;
                       modalData= JSON.stringify(branchData);  
                       $("#view-"+id).attr('data-info',modalData); 
                       $('#tempMesage').show();
                       $('#statusMessage').show();
                       var activateId =$("#activeStatus-"+id).attr('data-info');
                       var info = JSON.parse(activateId);
                       info.status= status;
                       activateData= JSON.parse(info.status); 
                       $("#activeStatus-"+id).html('<i class="fas fa-check"></i>  Activate');
                       $("#activeStatus-"+id).attr('data-status',activateData); 
                       // $("#successMsg").html("Temporarily Disable Successfully!");
                       $("#successMsgModal").show().delay(3000).fadeOut('fast'); 
                       $('#tempStatus').hide();
                       $("#disableModal").modal('toggle');                          
                    }
                    else{
                          alert( "Your Request cannot be completed, Please try after some time!!" );
                    }
                }
          });
         
    }); 
    /*

    * To update temporary status of Branches from confirmation modal

    */

    $('#notBlock').on('click',function(){
       $('#tempDisable').prop('checked',false);

    });
    $('.tempDisable').on('change',function(){
      if($(this).prop('checked')){
        var status= $('#tempDisable').val();
        var id= $('#uroId').val(); 
        disableId = $('#disableBranch').attr('data-id',id);
        disableStatus = $('#disableBranch').attr('data-status',status);
        // $('#myModal').modal('toggle');
        $("#disableModal").modal('show');

        }
        else{
          $('#tempDisable').prop('checked',false);
          return false;
        }        
    });

    /*

    * To search Branches

    */
    $('.searchBranch').on('click', function(){
       serachBranch = $('#searchBranch').val();
       if(serachBranch!=""){
            $.ajax({
                    type :"POST",
                    url  :"ajax/search-branch.php",
                    //datatype: 'json',
                    data :{'value':serachBranch},
                    success:function(data){
                      $('#branchList').html(data);
                      // $('#searchBranch').val("");
                      $('#close').show();
                    }
                    
           });
       }
       
    });
    /*

    * To redirect on edit button click

    */

    $('#branchList').on('click','.Edit',function (){
      dataID = $(this).attr('data-id');
      $.ajax({
              type:'POST',
              data :{'id':dataID},
              success:function(data){
               window.location.href=("add-edit-branch-form.php?id="+dataID);
              }
      });
    })

    setTimeout(function () {
  
            // Closing the alert
            $('#alert').alert('close');
        }, 5000);

    /*

    * To Branch Bulk Upload uisng csv file

    */
    $('#csvUpload').on('click','.upload' , function(event){

      event.preventDefault();
      var formData = new FormData($('#csvUpload')[0]);
      emptyCheck =  $('#file').val();
      // console.log(emptyCheck);
      if(emptyCheck!=''){
          $('#upload').hide();
          $('#uploadSpinner').show().delay(5000).fadeOut('fast');
          if(true){
          $.ajax({
              url:"ajax/csv-upload.php",  
              method:"POST",  
              data:formData,  
              contentType:false,          
              cache:false,               
              processData:false,
              success: function (data) {
                console.log(data);
                if(data!=0){
                 // alert("hii1");
                 $('#upload').show();
                 $('#uploadSpinner').hide();
                 $('#uploadMessage').show();
                 $('#uploadMessage').html(data+" Branch Added Successfully!").delay(5000).fadeOut('fast');  
                 $('#file').val("");
               }
               if(data==0){
                $('#upload').show();
                $('#uploadSpinner').hide();
                $('#file').val("");
                $('#uploadError').show().delay(5000).fadeOut('fast');

               }

              }
            });
          }   
          $('#upload').show();       
      }
      else{
        // alert("erroe");
        $('#emptyUpload').show().delay(5000).fadeOut('fast');
        

      }

    });

});