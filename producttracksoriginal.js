$(document).ready(function() {
    // 1. Ссылки на товары
    var links = {
        'VCL00001': 'https://drive.google.com/uc?export=download&id=10lfHKyJGcdRqGeO5AQoOci8UGOYL8xvC',
        'VCL00002': 'https://drive.google.com/uc?export=download&id=1125HgU5kyqUT7xcITADhZ3FDXfYMt0pa'
    };

    // 2. Функция для записи ссылок (без блокировки отправки)
    function generateLinks() {
        var result = [];
        $('.t706__product').each(function(i) {
            var art = $(this).find('.t706__product-title div:last').text().trim();
            if (links[art]) {
                var numberedLink = (i+1) + ') ' + links[art];
                if (!result.includes(numberedLink)) {
                    result.push(numberedLink);
                }
            }
        });
        
        // Записываем в поле (если есть результат)
        if (result.length > 0) {
            $('input[name="location"], textarea[name="location"]').val(result.join('\n'));
        }
    }

    // 3. Вешаем обработчик на кнопку (БЕЗ e.preventDefault!)
    $('.t706 .t-submit').on('click', function() {
        // Запускаем генерацию ссылок перед отправкой
        generateLinks();
        
        // Даём время на запись в поле (100 мс)
        setTimeout(function() {
            console.log("Ссылки записаны, форма отправляется...");
        }, 100);
    });
});
