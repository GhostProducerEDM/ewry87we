$(document).ready(function() {
  console.log('Скрипт producttracksoriginal.js запущен');

  var linkMass = { 
    'VCL00001':'https://drive.google.com/uc?export=download&id=10lfHKyJGcdRqGeO5AQoOci8UGOYL8xvC',
    'VCL00002':'https://drive.google.com/uc?export=download&id=1125HgU5kyqUT7xcITADhZ3FDXfYMt0pa'
  };

  function findProduct() {
    var cProduct = $('.t706__product').length;
    console.log('Найдено продуктов:', cProduct);

    if (cProduct === 0) {
      console.warn('Нет элементов .t706__product на странице');
    }

    var oldLink = '';
    $('input[name="location"]').val('');
    
    for (let i = 0; i < cProduct; i++) { 
      var artPrd = $('.t706__product-title:eq('+i+') div:last').html();
      console.log('Артикул продукта:', artPrd);
      if(linkMass[artPrd]) {
        oldLink += '\n' + (i + 1) + ') ' + linkMass[artPrd];
      }
    }
    
    $('input[name="location"]').val(oldLink);
  }

  $('.t706 .t-submit').click(function(e) {
    e.preventDefault();
    console.log('Клик по кнопке t-submit');
    findProduct();
    setTimeout(function() {
      $('input[name="location"]').val('');
    }, 6000);
  });

  $(document).on("keydown", ".t706 form", function(event) {
    return event.key != "Enter";
  });
});
