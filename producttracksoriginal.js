$(document).ready(function() {
    // 1. Конфигурация (ваши данные)
    const linkMass = { 
        'VCL00001': 'https://drive.google.com/uc?export=download&id=10lfHKyJGcdRqGeO5AQoOci8UGOYL8xvC',
        'VCL00002': 'https://drive.google.com/uc?export=download&id=1125HgU5kyqUT7xcITADhZ3FDXfYMt0pa'
    };

    // 2. Состояние системы
    let systemState = {
        isProcessing: false,
        lastExecution: 0
    };

    // 3. Основная функция (ваш код + защита)
    function generateLinks() {
        // Защита от частых вызовов
        const now = Date.now();
        if (systemState.isProcessing || (now - systemState.lastExecution < 1000)) {
            console.log('Защита: пропускаем дублирующий вызов');
            return;
        }
        
        systemState.isProcessing = true;
        systemState.lastExecution = now;
        
        try {
            const uniqueLinks = {};
            
            // Ищем товары (с защитой от ошибок)
            const $products = $('.t706__product');
            if ($products.length === 0) {
                console.warn('Не найдены товары в корзине!');
                return;
            }
            
            $products.each(function() {
                try {
                    const artPrd = $(this).find('.t706__product-title div:last').text().trim();
                    if (linkMass[artPrd]) {
                        uniqueLinks[linkMass[artPrd]] = true;
                    }
                } catch (e) {
                    console.error('Ошибка обработки товара:', e);
                }
            });
            
            // Формируем результат
            const result = Object.keys(uniqueLinks)
                .map((link, index) => `${index + 1}) ${link}`)
                .join('\n');
            
            // Записываем в поле (с проверкой)
            const $field = $('input[name="location"]');
            if ($field.length) {
                $field.val(result)
                      .attr('data-last-update', now);
                console.log('Ссылки успешно записаны');
            } else {
                console.error('Поле location не найдено!');
            }
            
        } finally {
            systemState.isProcessing = false;
        }
    }

    // 4. Обработчики событий (с улучшенной защитой)
    function setupEventListeners() {
        // Удаляем все предыдущие обработчики
        $(document).off('click.tildaLinks', '.t706 .t-submit')
                   .off('submit.tildaLinks', '.t706 form');
        
        // Новые обработчики с namespace
        $(document).on('click.tildaLinks', '.t706 .t-submit', function(e) {
            e.preventDefault();
            generateLinks();
            
            // Авто-отправка формы через 300мс
            setTimeout(() => {
                const $form = $(this).closest('form');
                if ($form.length) {
                    $form.trigger('submit');
                }
            }, 300);
        });
        
        $('.t706 form').on('submit.tildaLinks', function() {
            generateLinks();
            return true;
        });
    }

    // 5. Инициализация + защита от повторов
    let initAttempts = 0;
    const maxInitAttempts = 3;
    
    function initialize() {
        initAttempts++;
        
        try {
            setupEventListeners();
            console.log('Скрипт инициализирован успешно');
            
            // Дополнительная проверка через 5 сек
            setTimeout(() => {
                if (!$('input[name="location"]').length) {
                    console.warn('Поле location не найдено при повторной проверке!');
                    if (initAttempts < maxInitAttempts) {
                        initialize();
                    }
                }
            }, 5000);
            
        } catch (e) {
            console.error('Ошибка инициализации:', e);
            if (initAttempts < maxInitAttempts) {
                setTimeout(initialize, 1000 * initAttempts);
            }
        }
    }

    // Первый запуск
    initialize();

    // 6. Защита от изменений DOM (для динамических страниц)
    const observer = new MutationObserver(function(mutations) {
        if (!$('.t706 .t-submit').length) {
            console.log('Обнаружены изменения DOM, переинициализация...');
            initialize();
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
