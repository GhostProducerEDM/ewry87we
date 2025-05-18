// 1. Ждем полной загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    // 2. Ссылки на товары (артикул → URL)
    const productLinks = {
        'VCL00001': 'https://drive.google.com/...',
        'VCL00002': 'https://drive.google.com/...'
    };

    // 3. Функция для заполнения поля
    function updateLocationField() {
        const links = [];
        let counter = 1;
        
        // Ищем все товары в корзине (новые селекторы)
        document.querySelectorAll('.t-item, .t706__product').forEach(item => {
            // Пробуем разные варианты получения артикула
            const artElement = item.querySelector('.js-product-code, .t-product__title code, .t706__product-title div:last-child');
            if (artElement) {
                const art = artElement.textContent.trim();
                if (productLinks[art] && !links.includes(productLinks[art])) {
                    links.push(`${counter++}) ${productLinks[art]}`);
                }
            }
        });
        
        // Ищем поле location (пробуем разные варианты)
        const locationField = document.querySelector('input[name="location"], input[name="download_links"], textarea[name="location"]');
        if (locationField) {
            locationField.value = links.join('\n');
            console.log('Ссылки записаны:', locationField.value);
        } else {
            console.error('Поле location не найдено!');
        }
        
        return links.length > 0;
    }

    // 4. Обработчик для кнопки отправки
    function handleSubmit(e) {
        if (!updateLocationField()) {
            console.warn('Не найдены товары для формирования ссылок');
            return;
        }
        
        // Даем время на обновление поля перед отправкой
        setTimeout(() => {
            const form = document.querySelector('.t-form');
            if (form) {
                form.submit();
            }
        }, 300);
    }

    // 5. Вешаем обработчики
    const submitBtn = document.querySelector('.t-submit, .js-order-button');
    if (submitBtn) {
        submitBtn.addEventListener('click', handleSubmit);
    }
    
    // Дополнительно ловим отправку формы
    const form = document.querySelector('.t-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});
