
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.770848f9c570d61eee00.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/302.latest.en.50422968477bb42463d7.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/698.latest.en.ef8fd6c1cc52ce38a552.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/137.latest.en.c494c1348d73aa1d1144.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.115d137cecf112c5727c.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/977.latest.en.e1a0ded7d00403072415.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/582.latest.en.4ee215791a93f8eeed8e.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/78.latest.en.251751f1b1eaca6e5d24.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/927.latest.en.222f26622f6ff8ccbe95.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/879.latest.en.70e2c9565324e9aec200.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/387.latest.en.3b33adcdf82703a5913e.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.latest.en.2c67c6ca63811e9e411e.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/302.latest.en.cb97d8c0c0262885bcdb.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.7cb816443ebc83362061.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/268.latest.en.050352a58f43f75db889.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0732/2599/4521/files/Airback---Logo-Design---new---final---high-resolution---black---2_x320.png?v=1683474987"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res[0], next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        })();
      }

      function onLoaded() {
        preconnectAssets();
        prefetchAssets();
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  