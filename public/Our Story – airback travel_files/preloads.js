
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.8c4ba2a249a455206e70.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/417.latest.en.2b7ef6493a2ab7acd4b8.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/49.latest.en.e09a5108f509ef00751b.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/180.latest.en.76349392f2a7bbeb2c64.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.ee17a768fde4a8c0e76d.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/912.latest.en.41a63345ce3b8fab9650.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/467.latest.en.0e8fc3bb0fb034d5d609.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/598.latest.en.a026ef31c29fb326ed90.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/766.latest.en.0362c7314cf59cfee7d4.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/397.latest.en.2b264cd4b49af78ba5cf.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/660.latest.en.54fc67c730a2c5760da3.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.latest.en.58ee886a456cc9ed9093.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/417.latest.en.2178b6b8274f42143653.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.7b5ddd7b6f0b80e0c96b.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/268.latest.en.1127ed81656d78488b4c.css"];
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
  