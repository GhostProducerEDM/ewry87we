$(document).ready(function() {
    // 1. Объект с данными: артикул → {название, ссылка}
    const products = {
        'VCL00001': {
            name: "VOCAL TEST 1",
            url: 'https://drive.google.com/uc?export=download&id=10lfHKyJGcdRqGeO5AQoOci8UGOYL8xvC'
        },
        'VCL00002': {
            name: "VOCAL TEST 2", 
            url: 'https://drive.google.com/uc?export=download&id=1125HgU5kyqUT7xcITADhZ3FDXfYMt0pa'
        }
    };

    // 2. Блокировка повторных выполнений
    let isProcessing = false;

    function generateLinks() {
        if(isProcessing) return;
        isProcessing = true;
        
        let result = [];
        
        $('.t706__product').each(function() {
            const artPrd = $(this).find('.t706__product-title div:last').text().trim();
            if(products[artPrd]) {
                // Формируем текст с названием и ссылкой
                result.push(
                    `${products[artPrd].name}\n` + 
                    `Скачать: ${products[artPrd].url}`
                );
            }
        });

        // 3. Добавляем нумерацию и разделители
        const formatted = result
            .map((text, index) => `${index + 1}. ${text}`)
            .join('\n\n'); // Двойной перенос между продуктами

        $('input[name="location"]').val(formatted);
        
        setTimeout(() => {
            $('input[name="location"]').val('');
            isProcessing = false;
        }, 6000);
    }

    // 4. Обработчики событий (без изменений)
    $(document).off('click', '.t706 .t-submit').on('click', '.t706 .t-submit', function(e) {
        e.preventDefault();
        generateLinks();
    });
    
    $('.t706 form').off('submit').on('submit', function() {
        generateLinks();
        return true;
    });
});
