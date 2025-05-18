document.addEventListener('DOMContentLoaded', function() {
    var linkMass = {
        'VCL00001': 'https://drive.google.com/uc?export=download&id=10lfHKyJGcdRqGeO5AQoOci8UGOYL8xvC',
        'VCL00002': 'https://drive.google.com/uc?export=download&id=1125HgU5kyqUT7xcITADhZ3FDXfYMt0pa'
    };

    var isProcessing = false;

    function generateLinks() {
        if (isProcessing) return;
        isProcessing = true;

        var uniqueLinks = {};
        document.querySelectorAll('.t706__product').forEach(function(el) {
            var artPrd = el.querySelector('.t706__product-title div:last-child');
            if (artPrd) {
                var text = artPrd.textContent.trim();
                if (linkMass[text]) {
                    uniqueLinks[linkMass[text]] = true;
                }
            }
        });

        var result = Object.keys(uniqueLinks).map(function(link, i) {
            return (i + 1) + ') ' + link;
        }).join('\n');

        var input = document.querySelector('input[name="location"]');
        if (input) {
            input.value = result;

            setTimeout(function() {
                input.value = '';
                isProcessing = false;
            }, 6000);
        } else {
            isProcessing = false;
        }
    }

    function attachHandlers() {
        document.querySelectorAll('.t706 .t-submit').forEach(function(button) {
            if (!button.classList.contains('custom-handler-attached')) {
                button.classList.add('custom-handler-attached');
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    generateLinks();
                });
            }
        });

        document.querySelectorAll('.t706 form').forEach(function(form) {
            if (!form.classList.contains('custom-form-handler-attached')) {
                form.classList.add('custom-form-handler-attached');
                form.addEventListener('submit', function() {
                    generateLinks();
                    return true;
                });
            }
        });
    }

    // Первичная установка обработчиков
    attachHandlers();

    // Проверка изменений DOM каждые 2 секунды
    setInterval(attachHandlers, 2000);
});
