const CACHE_NAME = 'project-color-create-v1';
const urlsToCache = [
  "./App.js",
  "./style.js",
  "./lib/ColorFilter.js",
  "./lib/createjs-2013.02.12.min.js",
  "./lib/jquery-1.5.1.min.js",
  "./lib/movieclip-0.6.0.min.js",
  "./lib/particleEmitterJs-0.5.0.js",
  "./lib/Stats.js",
];

// service-worker.js
self.addEventListener('install', function (event) {
  // インストール処理
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
});

// 現状では、この処理を書かないとService Workerが有効と判定されないようです
// DevToolで［Add to homescreen］を試すと「Site cannot be installed: the page does not work offline」と表示されます
self.addEventListener('fetch', function (event) {
  console.log('[ServiceWorker] Fetch');

  event.respondWith(
    caches.match(event.request)
      .then((response) => {

        // キャッシュがあったのでレスポンスを返す
        if (response) {
          return response;
        }


        // 重要：リクエストを clone する。リクエストは Stream なので
        // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
        // 必要なので、リクエストは clone しないといけない
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (response) => {

            // レスポンスが正しいかをチェック
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 重要：レスポンスを clone する。レスポンスは Stream で
            // ブラウザ用とキャッシュ用の2回必要。なので clone して
            // 2つの Stream があるようにする
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );

});