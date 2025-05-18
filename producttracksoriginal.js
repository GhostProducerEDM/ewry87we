$(document).ready(function() {
    // 1. Ссылки на товары (артикул → URL)
    var links = {
        'VCL00001': 'https://drive.google.com/uc?export=download&id=10lfHKyJGcdRqGeO5AQoOci8UGOYL8xvC',
        'VCL00002': 'https://drive.google.com/uc?export=download&id=1125HgU5kyqUT7xcITADhZ3FDXfYMt0pa'
    };

    // 2. Находим товары и формируем ссылки
    function generateLinks() {
        var result = [];
        $('.t706__product').each(function(i) { // Добавил индекс (i)
            var art = $(this).find('.t706__product-title div:last').text().trim();
            if (links[art] && !result.includes(links[art])) { // Проверка на дубли
                result.push((result.length + 1) + ') ' + links[art]); // Нумерация
            }
        });
        
        // Записываем в поле (проверяем оба варианта)
        $('input[name="location"], input[name="hidden_links"]').val(result.join('\n'));
    }

    // 3. Вешаем на кнопку "Отправить" (с защитой от двойного клика)
    $('.t706 .t-submit').off('click').on('click', function(e) {
        e.preventDefault();
        generateLinks();
        setTimeout(function() { 
            $('form').submit();
        }, 500);
    });
});
