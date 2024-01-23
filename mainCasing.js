//  animation="property: scale; loop: true; dur: 1200; from: 1 1 1; to: 1.5 1.5 1.5; dir:alternate;"

window.onload = () => {
    const camera = document.getElementById('js--camera');
    const scene = document.getElementById('scene')
    let hold = null;
    var pickups = document.getElementsByClassName("js--pickup");
    var places = document.getElementsByClassName('js--places');
    var heldItem
    var colorItem

    //Create the spheres where an item can be placed once picked up
    function createSphere(positionX, positionY, positionZ, sphereId){

        let sphere = document.createElement('a-sphere')
        sphere.setAttribute("class", "js--places js--interact");
        sphere.setAttribute("id", sphereId)
        sphere.setAttribute("color", "lightblue");
        sphere.setAttribute("position", {x: positionX, y: positionY, z: positionZ});
        sphere.setAttribute("color", "lightblue");
        sphere.setAttribute("radius", "0.2")
        sphere.setAttribute("animation", "property: scale; loop: true; dur: 1200; from: 1 1 1; to: 1.5 1.5 1.5; dir:alternate;")
        scene.appendChild(sphere)
    }

    //Event listener for when an item gets picked up
    function checkPickup() {
        
        for (let i = 0; i < pickups.length; i++) {
            pickups[i].addEventListener('click', function(evt){
                if (hold == null){

                    let audio = new Audio("audio/pick_up.mp3")
                    audio.play()
                    heldItem = pickups[i].getAttribute("id")
                    colorItem = pickups[i].getAttribute("color")

                    //Add the picked up item to the camera
                    camera.innerHTML += '<a-box id="js--hold" class="js--interact" color="' + colorItem + '" position="1 -1 -1" width="0.7" height="0.7"></a-box>';

                    //Create the places where it can be placed
                    createSphere(-0.8, 2, -2.9, "places--powersupply")
                    createSphere(0, 0.8, -3.2, "places--motherboard")
                    createSphere(0.7, 2, -2.9, "places--storage")

                    hold = "box";
                    pickups[i].setAttribute("visible", "false")
                    pickups[i].setAttribute("class", "")
                }
                //Array with the possible places to put the picked up item
                places = document.getElementsByClassName('js--places');
                checkPlacing()
            })
        }
    }

    checkPickup()

    //Event Listener that places the held item on the chosen spot
    function checkPlacing() {

        for (let i = 0; i < places.length; i++) {

            places[i].addEventListener('click', function(evt){

                checkHeldItem = "places--" + heldItem
                if (hold == "box" && places[i].getAttribute("id") == ("places--" + heldItem) ){

                    let audio = new Audio("audio/correct_answer.mp3")
                    audio.play()

                    //Create the picked up item on the chosen spot to put the item down at
                    let box = document.createElement('a-box');
                    box.setAttribute("id", heldItem)
                    box.setAttribute("color", colorItem);
                    box.setAttribute("scale", "0.7 0.7 0.7S")
                    box.setAttribute("position", {x: this.getAttribute('position').x, y: this.getAttribute('position').y, z: this.getAttribute('position').z});
                    scene.appendChild(box);

                    //Remove the item that's being held
                    document.getElementById("js--hold").remove();
                    checkPickup()
                    hold = null;

                    //Remove the spheres
                    removeLength = places.length
                    for (let i = 0; i < removeLength; i++) {
                        places[0].remove()
                    }
                }

                //Play a wrong answer audio if the chosen spot is not the spot the item needs to go
                else if(hold == "box" && places[i].getAttribute("id") != ("places--" + heldItem) ){
                    let audio = new Audio("audio/wrong_answer.mp3")
                    audio.play()
                }

            }); 
        }
    }
}