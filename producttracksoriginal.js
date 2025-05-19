document.addEventListener('DOMContentLoaded', function() {
    var linkMass = {
        'VCL00001': 'https://drive.google.com/uc?export=download&id=10lfHKyJGcdRqGeO5AQoOci8UGOYL8xvC',
        'VCL00002': 'https://drive.google.com/uc?export=download&id=1125HgU5kyqUT7xcITADhZ3FDXfYMt0pa'
        // Добавляй остальные артикула по шаблону
    };

    var isProcessing = false;

    function generateLinks() {
        if (isProcessing) return;
        isProcessing = true;

        var used = {};
        var resultList = [];

        document.querySelectorAll('.t706__product').forEach(function(el) {
            var artPrdEl = el.querySelector('.t706__product-title div:last-child');
            if (artPrdEl) {
                var art = artPrdEl.textContent.trim();
                if (linkMass[art] && !used[art]) {
                    resultList.push({ art: art, link: linkMass[art] });
                    used[art] = true;
                }
            }
        });

        var output = resultList.map(function(item, i) {
            return (i + 1) + ') <a href="' + item.link + '">Download (' + item.art + ')</a>';
        }).join('<br>'); // делаем перенос строки через <br>

        var input = document.querySelector('input[name="location"]');
        if (input) {
            input.value = output;

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

    attachHandlers();
    setInterval(attachHandlers, 2000);
});
