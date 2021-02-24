/* Asignar una versión de la cache */

const CACHE_NAME= `v1_Arturo_PWA`;

/* Ficheros a cachear en la aplicacion */
var urlsToCahe = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',    
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png'
];

/* Evento Install -> instala el serviceWorker y guarda en cache los recursos estaticos (urlToCache) */
self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
                .then(cache => {
                    /* Agregamos el array que cacheamos a la respuesta de la promesa que la llamamos cache */
                    return cache.addAll(urlsToCahe)
                                .then(()=>{
                                    self.skipWaiting();
                                });
                })
                .catch(error =>{
                    console.log("No se ha registrado el cache:", error);
                })
    );
});


/* Evento Activate -> que la app funciones sin conexion */
self.addEventListener('activate', e=> {
    /* Guardamos en un array todo lo de la cache */
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        /* .keys recoge los elementos que hay en la cache */
        caches.keys()
                .then(cacheNames => {
                    /* Regresamos una promesa */
                    return Promise.all(
                        cacheNames.map(cacheName => {
                            /* Con indexOf buscamos dentro el elemento que estamos iterando con map */
                            if(cacheWhitelist.indexOf(cacheName) === -1){
                                /* Borramos cache(elementos) que no necesitamos */
                                return caches.delete(cacheName);
                            }
                        })
                    )
                .then(()=> {
                    /* Activa cache en el dispositivo */
                    self.clients.claim();
                });

                })
    );
});


/* Evento Fetch  -> consigue la info desde internet, para cachearla */
self.addEventListener('fetch', e=>{
    /* Respondeme con datos que recoperamos del servidor */
    e.respondWith(
        /* Hacemos match la cache con el request del metodo fetch */
        caches.match(e.request)
                .then(res => {
                    if(res){
                        /* Devuelve datos de la cache */
                        return res;
                    }

                    /* Si hay algo nuevo, ejecuta el metodo fetch para recuperar lo nuevo y al final lo retornamos */
                    return fetch(e.request);
                })
    );
});