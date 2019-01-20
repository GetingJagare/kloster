const devMode = process.env.NODE_ENV === 'development';

if (!devMode) {
    var gScript = document.createElement('script');
    gScript.src = 'https://www.googletagmanager.com/gtag/js?id=UA-131260750-1';
    gScript.async = true;
    gScript.defer = true;
    document.head.appendChild(gScript);

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());

    gtag('config', 'UA-131260750-1');

    var yScript = document.createElement('script');
    yScript.async = true;
    yScript.defer = true;
    yScript.textContent = '(function (m, e, t, r, i, k, a) {\n' +
        '            m[i] = m[i] || function () {\n' +
        '                (m[i].a = m[i].a || []).push(arguments)\n' +
        '            };\n' +
        '            m[i].l = 1 * new Date();\n' +
        '            k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)\n' +
        '        })\n' +
        '        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");\n' +
        '\n' +
        '        ym(51660419, "init", {\n' +
        '            id: 51660419,\n' +
        '            clickmap: true,\n' +
        '            trackLinks: true,\n' +
        '            accurateTrackBounce: true,\n' +
        '            webvisor: true\n' +
        '        });';

    document.body.appendChild(yScript);

    var yNoScript = document.createElement('noscript');
    yNoScript.textContent = '<div><img src="https://mc.yandex.ru/watch/51660419" style="position:absolute; left:-9999px;" alt=""/></div>';
    document.body.appendChild(yNoScript);
}