// Название вашего кэша
var CACHE_NAME = 'my-cache-new-schedule-4.1th-year';

// Список ресурсов, которые вы хотите кэшировать
var urlsToCache = [
  '/',
  '/index.html?v=2',
  '/style.css',
  '/icon.png'
];

// Установка события
self.addEventListener('install', function(event) {
  // Открываем кэш и добавляем ресурсы в него
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Событие активации
self.addEventListener('activate', function(event) {
  // Удаление старых кэшей, если они есть
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Событие перехвата запросов и возврата ресурсов из кэша, если они доступны
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Если ресурс найден в кэше, возвращаем его из кэша
      if (response) {
        return response;
      }
      // В противном случае делаем сетевой запрос
      return fetch(event.request);
    })
  );
});
