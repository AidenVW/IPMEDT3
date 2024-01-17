//  animation="property: scale; loop: true; dur: 1200; from: 1 1 1; to: 1.5 1.5 1.5; dir:alternate;"

window.onload = () => {
    const camera = document.getElementById('js--camera');
    const places = document.getElementsByClassName('js--places');
    let pickups = document.getElementsByClassName("js--pickup");
    let hold = null;

    function checkPickup() {
        
        for (let i = 0; i < pickups.length; i++) {
            pickups[i].addEventListener('click', function(evt){
                if (hold == null){
                    camera.innerHTML += '<a-box id="js--hold" class="js--pickup js--interact" color="red" position="1 -1 -1" width="0.7" height="0.7"></a-box>';
                    hold = "box";
                    this.remove();
                    for (let i = 0; i < places.length; i++) {
                        places[i].setAttribute("animation", "property: scale; loop: true; dur: 1200; from: 1 1 1; to: 1.5 1.5 1.5; dir:alternate;")
                    }
                }
            }); 
        }   
    }

    checkPickup()
}