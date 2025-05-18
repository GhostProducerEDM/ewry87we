$(document).ready(function() {
    // 1. Ссылки на товары (артикул → URL)
    var links = {
        'VCL00001': 'https://drive.google.com/uc?export=download&id=10lfHKyJGcdRqGeO5AQoOci8UGOYL8xvC',
        'VCL00002': 'https://drive.google.com/uc?export=download&id=1125HgU5kyqUT7xcITADhZ3FDXfYMt0pa'
    };

    // 2. Находим товары и формируем ссылки
    function generateLinks() {
        var result = [];
        $('.t706__product').each(function() {
            var art = $(this).find('.t706__product-title div:last').text().trim();
            if (links[art]) result.push(links[art]);
        });
        
        // Записываем в скрытое поле (проверяем оба варианта имени)
        $('input[name="location"], input[name="hidden_links"]').val(result.join('\n'));
    }

    // 3. Вешаем на кнопку "Отправить"
    $('.t706 .t-submit').click(function(e) {
        e.preventDefault();
        generateLinks();
        setTimeout(function() { 
            $('form').submit(); // Отправляем форму после подстановки
        }, 500);
    });
});
