/* Service Worker */

/* Comprobar que el navegar soporta los Services Worker */
if(`serviceWorker` in navigator){
    console.log("Puedes usar los services worker en tu navegador");

    /* Registramos el Services Worker en una promesa */
    navigator.serviceWorker.register('./sw.js')
                            .then(res => console.log("serviceWorker cargado correctamente", res))
                            .catch(error => console.log("serviceWorker no se ha podido registrar", error))
}else{
    console.log("No puedes");
}

/* Scroll suavizado */
$(document).ready(function() {
    $(`#menu a`).click(function(e){
        e.preventDefault();
        
        console.log($(`#services`).offset().top);

        $(`html, body`).animate({
            scrollTop: $($(this).attr(`href`)).offset().top
        });

        return false;
    });
});