$(document).ready(function() {
    var linkMass = { 
        'VCL00001': 'https://drive.google.com/uc?export=download&id=10lfHKyJGcdRqGeO5AQoOci8UGOYL8xvC',
        'VCL00002': 'https://drive.google.com/uc?export=download&id=1125HgU5kyqUT7xcITADhZ3FDXfYMt0pa'
    };
    
    // Удаляем старые обработчики (если были)
    $('.t706 .t-submit').off('click');
    
    // Вешаем новый обработчик
    $('.t706 .t-submit').on('click', function(e) {
        e.preventDefault();
        
        var links = []; // Массив для хранения ссылок (убьёт дубли)
        
        $('.t706__product').each(function() {
            var artPrd = $(this).find('.t706__product-title div:last').text().trim();
            
            if (linkMass[artPrd] && !links.includes(linkMass[artPrd])) {
                links.push((links.length + 1) + ') ' + linkMass[artPrd]);
            }
        });
        
        // Вставляем в поле
        $('input[name="location"]').val(links.join('\n'));
        
        // Очищаем через 6 сек
        setTimeout(function() {
            $('input[name="location"]').val('');
        }, 6000);
    });
    
    // Блокируем Enter
    $(document).on("keydown", ".t706 form", function(event) { 
        return event.key != "Enter";
    });
});
