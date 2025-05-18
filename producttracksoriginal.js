// 1. Выносим логику в отдельный namespace
if (!window.MyTildaCart) {
  window.MyTildaCart = (function() {
    // 2. Конфигурация
    const config = {
      links: {
        'VCL00001': 'https://drive.google.com/...',
        'VCL00002': 'https://drive.google.com/...'
      },
      selectors: {
        products: '.t706__product, .t-item',
        productCode: '.t706__product-title div:last, .js-product-code',
        submitBtn: '.t-submit, .js-order-button',
        form: '.t-form',
        locationField: 'input[name="location"], textarea[name="location"]'
      }
    };

    // 3. Состояние системы
    let state = {
      initialized: false,
      processing: false
    };

    // 4. Основная функция
    function generateLinks() {
      if (state.processing) return false;
      state.processing = true;

      const links = new Set(); // Используем Set для уникальности
      let counter = 1;

      // Поиск товаров
      document.querySelectorAll(config.selectors.products).forEach(item => {
        const codeElement = item.querySelector(config.selectors.productCode);
        if (codeElement) {
          const art = codeElement.textContent.trim();
          if (config.links[art]) {
            links.add(`${counter++}) ${config.links[art]}`);
          }
        }
      });

      // Запись в поле
      const locationField = document.querySelector(config.selectors.locationField);
      if (locationField) {
        locationField.value = Array.from(links).join('\n');
        console.log('Ссылки обновлены:', locationField.value);
      }

      state.processing = false;
      return links.size > 0;
    }

    // 5. Инициализация
    function init() {
      if (state.initialized) return;
      state.initialized = true;

      // Обработчик для кнопки
      document.querySelector(config.selectors.submitBtn)?.addEventListener('click', function(e) {
        if (generateLinks()) {
          setTimeout(() => {
            document.querySelector(config.selectors.form)?.submit();
          }, 300);
        }
      });

      // Дополнительный обработчик для формы
      document.querySelector(config.selectors.form)?.addEventListener('submit', function(e) {
        generateLinks();
      });
    }

    return { init };
  })();

  // Запускаем после полной загрузки
  document.addEventListener('DOMContentLoaded', MyTildaCart.init);
  window.addEventListener('load', MyTildaCart.init);
}
