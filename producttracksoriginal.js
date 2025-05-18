$(document).ready(function() {
    var linkMass = { 
        'VCL00001': 'https://drive.google.com/uc?export=download&id=10lfHKyJGcdRqGeO5AQoOci8UGOYL8xvC',
        'VCL00002': 'https://drive.google.com/uc?export=download&id=1125HgU5kyqUT7xcITADhZ3FDXfYMt0pa'
    };

    // 1. Блокируем повторные выполнения
    var isProcessing = false;
    
    // 2. Полностью переработанная функция
    function generateLinks() {
        if (isProcessing) return;
        isProcessing = true;
        
        var uniqueLinks = {};
        $('.t706__product').each(function() {
            var artPrd = $(this).find('.t706__product-title div:last').text().trim();
            if (linkMass[artPrd]) {
                uniqueLinks[linkMass[artPrd]] = true; // Хэш для уникальности
            }
        });
        
        var result = Object.keys(uniqueLinks).map(function(link, index) {
            return (index + 1) + ') ' + link;
        }).join('\n');
        
        $('input[name="location"]').val(result);
        
        setTimeout(function() {
            $('input[name="location"]').val('');
            isProcessing = false;
        }, 6000);
    }
    
    // 3. Вешаем обработчик с защитой
    $(document).off('click', '.t706 .t-submit').on('click', '.t706 .t-submit', function(e) {
        e.preventDefault();
        generateLinks();
    });
    
    // 4. Дополнительная защита для формы
    $('.t706 form').off('submit').on('submit', function() {
        generateLinks();
        return true;
    });
});
