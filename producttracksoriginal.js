$(document).ready(function() {
    // 1. Ссылки на товары
    var links = {
        'VCL00001': 'https://drive.google.com/uc?export=download&id=10lfHKyJGcdRqGeO5AQoOci8UGOYL8xvC',
        'VCL00002': 'https://drive.google.com/uc?export=download&id=1125HgU5kyqUT7xcITADhZ3FDXfYMt0pa'
    };

    // 2. Флаг для блокировки дублей
    var isProcessing = false;

    function generateLinks() {
        if (isProcessing) return; // Если уже выполняется — выходим
        isProcessing = true;
        
        var result = [];
        $('.t706__product').each(function(i) {
            var art = $(this).find('.t706__product-title div:last').text().trim();
            if (links[art]) {
                var numberedLink = (i+1) + ') ' + links[art];
                if (!result.includes(numberedLink)) { // Проверяем дубли с нумерацией
                    result.push(numberedLink);
                }
            }
        });
        
        // 3. Жёсткая очистка поля перед записью
        var $field = $('input[name="location"], textarea[name="location"]');
        $field.val(''); // Сначала чистим
        $field.val(result.join('\n')); // Затем пишем
        
        isProcessing = false; // Разблокируем
    }

    // 4. Вешаем обработчик ONE (сработает 1 раз до отправки)
    $('.t706 .t-submit').one('click', function(e) {
        e.preventDefault();
        generateLinks();
        setTimeout(function() {
            $('form').submit();
        }, 500);
    });
});
