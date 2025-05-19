document.addEventListener('DOMContentLoaded', function() {
    var linkMass = {
        'VCL00001': 'https://drive.google.com/uc?export=download&id=10lfHKyJGcdRqGeO5AQoOci8UGOYL8xvC',
        'VCL00002': 'https://drive.google.com/uc?export=download&id=1125HgU5kyqUT7xcITADhZ3FDXfYMt0pa',
        'VCL00003': 'https://drive.google.com/uc?export=download&id=136fy97SHmVEYosOQP199ubulaWrhmizw',
        'VCL00004': 'https://drive.google.com/uc?export=download&id=15JA9GxsppNotklquHNaacWiH1BEEe92q',
        'VCL00005': 'https://drive.google.com/uc?export=download&id=1NeE5r3VB2wLXwGnrL1Wvail8eDgUuqj3',
        'VCL00006': 'https://drive.google.com/uc?export=download&id=1OYXXq60mu4gMC-CZe7TKmUAJrpNpD6yd',
        'VCL00007': 'https://drive.google.com/uc?export=download&id=1UI-o5cIFBJOhtKu2tEeHDcN7lLCqXQTM',
        'VCL00008': 'https://drive.google.com/uc?export=download&id=1Vk8Nu7IxDVpOb51MYxhmUZqJnQ21dWkc',
        'VCL00009': 'https://drive.google.com/uc?export=download&id=1GAzYH_4zVTcuTAFSMsxuC_JoCSdSFaPx',
        'VCL00010': 'https://drive.google.com/uc?export=download&id=1S1VhN5P-KABwgudGlkCstRuyQrt5pDaL',
        'VCL00011': 'https://drive.google.com/uc?export=download&id=12Xl7mdUpsgWuR2gfP77JAyfsAJ_cJ8iL',
        'VCL00012': 'https://drive.google.com/uc?export=download&id=1igtyGlSU6J_X0tPrflRDuYx3_WoxHQBs',
        // Добавляй остальные артикула по шаблону
    };

    var isProcessing = false;

    function generateLinks() {
        if (isProcessing) return;
        isProcessing = true;

        var used = {};
        var resultList = [];

        document.querySelectorAll('.t706__product').forEach(function(el) {
            // Проверка: если товар скрыт (удалён из корзины) — пропускаем
            if (el.offsetParent === null) return;

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
        }).join('<br>');

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
