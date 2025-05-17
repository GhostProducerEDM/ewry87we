 $( document ).ready(function() {
   var linkMass = { 


'VCL00001':'https://drive.google.com/uc?export=download&id=10lfHKyJGcdRqGeO5AQoOci8UGOYL8xvC',
'VCL00002':'https://drive.google.com/uc?export=download&id=1125HgU5kyqUT7xcITADhZ3FDXfYMt0pa'


   };
                  
var oldLink = '';
   function findProduct(){
     var  cProduct = $('.t706__product').length;oldLink='';
     $('input[name="location"]').val('');
     for (let i = 0; i < cProduct; i++) { 
        var artPrd = $('.t706__product-title:eq('+i+') div:last').html();
        oldLink = oldLink+'\n'+(i+1)+') '+linkMass[artPrd];
     };
     $('input[name="location"]').val(oldLink);
   };   
   //При клике на модель
    $('.t706 .t-submit').click(function(e) {e.preventDefault();findProduct();
      setTimeout(function(){$('input[name="location"]').val('');}, 6000);  });
   $(document).on("keydown", ".t706 form", function(event) {return event.key != "Enter";});
});
