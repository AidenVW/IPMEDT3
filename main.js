window.onload = () => {
    const camera = document.getElementById('js--camera');
    const places = document.getElementsByClassName('js--places');
    const cameraHtml = camera.innerHTML
    const scene = document.getElementById('scene')
    const motherboardInnerContainer = document.getElementById('motherboardInnerContainer')
    let pickups = document.getElementsByClassName("js--pickup");
    var hold = null
    var placesCasing
    var motherboardCheck = null
    var powerCheck = null
    var ssdCheck = null

    function partPlacer(part) {

        switch(part){
            case 'gpu':
                console.log('click')
                gpuSpot = document.getElementById('js--gpuSpot')
                spotAppear(gpuSpot.id)
                gpuSpot.addEventListener('click', function(){
                    motherboardContainer.innerHTML += '<a-entity id="js--gpu" class="js--pickup" gltf-model="models/rtx_3060_ti_low_poly.glb" scale="0.12 0.12 0.12" position="-0.12 0.31 -0.045" rotation="180 0 0"></a-entity>'
                    resetValues()
                    let audio = new Audio("audio/put_down.mp3")
                    audio.play()    
                    connectCables()
                })
                break
            case 'cpu':
                cpuSpot = document.getElementById('js--cpuSpot')
                spotAppear(cpuSpot.id)
                cpuSpot.addEventListener('click', function(){
                    motherboardInnerContainer.innerHTML += '<a-entity id="js--cpu" class="js--pickup" gltf-model="models/amd_ryzen_5_3600_cpu.glb" scale="0.05 0.05 0.05" position="-0.25 0.6 -0.125" rotation="90 0 0"></a-entity>'
                    makePickupable('js--cpuFan')
                    resetValues()
                    let audio = new Audio("audio/put_down.mp3")
                    audio.play()    
                })
                break
            case 'cpuFan':
                cpuFanSpot = document.getElementById('js--cpuFanSpot')
                spotAppear(cpuFanSpot.id)
                cpuFanSpot.addEventListener('click', function(){
                    motherboardInnerContainer.innerHTML += '<a-entity id="js--cpuFan" class="js--pickup" gltf-model="models/coaler_master_cpu_fan_animation_included.glb" scale="0.1 0.1 0.1" position="-0.25 0.6 -0.1"></a-entity>'
                    makePickupable('js--ram1')
                    resetValues()
                    let audio = new Audio("audio/put_down.mp3")
                    audio.play()    
                })
                break
            case 'ram':
                ramSpot = document.getElementById('js--ramSpot')
                spotAppear(ramSpot.id)
                ramSpot.addEventListener('click', function(){
                    motherboardInnerContainer.innerHTML += '<a-entity id="js--ram1" class="js--pickup" gltf-model="models/ram_corsair_vengeance_lpx.glb" scale="0.055 0.055 0.055" position="-0.2 0.54 -0.17" rotation="90 90 0"></a-entity>'
                    motherboardInnerContainer.innerHTML += '<a-entity id="js--ram2" class="js--pickup" gltf-model="models/ram_corsair_vengeance_lpx.glb" scale="0.055 0.055 0.055" position="-0.16 0.54 -0.17" rotation="90 90 0" visible="true"></a-entity>'
                    let audio = new Audio("audio/put_down.mp3")
                    audio.play()    
                    
                    makePickupable('js--power')
                    pickUpMotherboard()
                    resetValues()
                })
                break
        
        }
    }

    function makePickupable(id){
        document.getElementById(id).setAttribute('class', 'js--interact js--pickup')
    }

    function spotAppear(spotId){
        spot = document.getElementById(spotId)
        spot.setAttribute('class', 'js--interact')
        spot.setAttribute('visible', 'true')
    }

    function resetValues(){    
        hold = null
        camera.innerHTML = cameraHtml
    }

    function connectCables(){
        power = document.getElementById('js--power')
        power.setAttribute('class', 'js--interact')
        ssd = document.getElementById('js--ssd')
        ssd.setAttribute('class', 'js--interact')
        motherboard = document.getElementById('js--motherboard')
        motherboard.setAttribute('class', 'js--interact')

        ssd.addEventListener('click', function(){buttonHandler('js--power', 'js--cable1')})
        power.addEventListener('click', function(){buttonHandler('js--motherboard', 'js--cable2')})
        motherboard.addEventListener('click', function(){buttonHandler('js--ssd', 'js--cable3')})
    }

    function buttonHandler(nextButton, cable){
        let cableWant = document.getElementById(cable)
        console.log('hey')
        document.addEventListener('click', function(event){
            if(event.target.id == nextButton){
                cableWant.setAttribute('visible', 'true')
                let audio = new Audio("audio/correct_answer.mp3")
            }
        })
    }

    function pickUpMotherboard(){
        const motherboard = document.getElementById('js--motherboard')
        const motherboardInnerContainer = document.getElementById('motherboardInnerContainer')
        motherboard.addEventListener('click', function(){
            pickupCasing()
            hold = "motherboard"
            let audio = new Audio("audio/pick_up.mp3")
            audio.play()

            camera.innerHTML += document.getElementById('motherboardContainer').innerHTML
            document.getElementById('motherboardInnerContainer').setAttribute('position', '0.5 -1 -1')
            motherboardInnerContainer.remove()
        })
    }

    //Create the spheres where an item can be placed once picked up
    function createSphere(positionX, positionY, positionZ, sphereId){

        let sphere = document.createElement('a-sphere')
        sphere.setAttribute("class", "js--placesCasing js--interact");
        sphere.setAttribute("id", sphereId)
        sphere.setAttribute("color", "lightblue");
        sphere.setAttribute("position", {x: positionX, y: positionY, z: positionZ});
        sphere.setAttribute("color", "lightblue");
        sphere.setAttribute("radius", "0.1")
        sphere.setAttribute("animation", "property: scale; loop: true; dur: 1200; from: 1 1 1; to: 1.5 1.5 1.5; dir:alternate;")
        scene.appendChild(sphere)
    }

    //Create the places where the item that is picked up can be put into the casing
    function pickupCasing(){
        if (motherboardCheck == null) {
            createSphere(-3.5, 0.8, -3.05, "places--motherboard")
        }
        if (powerCheck == null) {
            createSphere(-3.5, 1.7, -2.95, "places--power")
        }
        if (ssdCheck == null) {
            createSphere(-3, 1.7, -2.95, "places--ssd")
        }

        placesCasing = document.getElementsByClassName('js--placesCasing');
        checkPlacing()
    }

    function checkPickup() {
        for (let i = 0; i < pickups.length; i++) {
            pickups[i].addEventListener('click', function (evt) {
                console.log(hold)
                if (hold == null) {
                    
                    let audio = new Audio("audio/pick_up.mp3")
                    audio.play()

                    switch(this.id){
                        case 'js--gpu':
                            camera.innerHTML += '<a-entity id="js--gpu" class="js--interact js--pickup" gltf-model="models/rtx_3060_ti_low_poly.glb" scale="0.12 0.12 0.12" position="0.5 -0.5 -1" rotation="180 0 0"></a-entity>'
                            hold = 'gpu'
                            break
                        case 'js--cpu':
                            camera.innerHTML += '<a-entity id="js--cpu" class="js--interact js--pickup" gltf-model="models/amd_ryzen_5_3600_cpu.glb" scale="0.05 0.05 0.05" position="0.5 -0.5 -1" rotation="90 0 0"></a-entity>' 
                            hold = 'cpu'
                            break
                        case 'js--cpuFan':
                            camera.innerHTML += '<a-entity id="js--cpuFan" class="js--interact js--pickup" gltf-model="models/coaler_master_cpu_fan_animation_included.glb" scale="0.1 0.1 0.1" position="0.5 -0.5 -1"></a-entity>'
                            hold = 'cpuFan'
                            break
                        case 'js--ram1':
                            camera.innerHTML += '<a-entity id="js--ram1" class="js--interact js--pickup" gltf-model="models/ram_corsair_vengeance_lpx.glb" scale="0.055 0.055 0.055" position="0.5 -0.5 -1" rotation="90 90 0"></a-entity>'
                            hold = 'ram'
                            break
                        case 'js--ssd':
                            camera.innerHTML += '<a-entity id="js--ssd" gltf-model="models/ssd_solid-state_drive.glb" rotation="90 0 0" scale="0.05 0.05 0.05" position="0.5 -0.5 -1"></a-entity>'
                            pickupCasing()
                            hold = 'ssd'
                            break
                        case 'js--power':
                            camera.innerHTML += '<a-entity id="js--power" class="js--interact js--pickup"  gltf-model="models/power_supply_basic.glb" rotation="0 90 0" scale="0.1 0.1 0.1" position="0.5 -0.5 -1"></a-entity>'
                            pickupCasing()
                            hold = 'power'
                            break
                        }       
                    this.remove();
                    for (let i = 0; i < places.length; i++) {
                        places[i].setAttribute("animation", "property: scale; loop: true; dur: 1200; from: 1 1 1; to: 1.5 1.5 1.5; dir:alternate;")
                    }
                    partPlacer(hold)
                }
            });
        }
        
    }

    checkPickup()
    
        //Event Listener that places the held item on the chosen spot
        function checkPlacing() {
            for (let i = 0; i < placesCasing.length; i++) {
                placesCasing[i].addEventListener('click', function(evt){
                    checkHeldItem = "places--" + hold
                    if (hold != null && placesCasing[i].getAttribute("id") == ("places--" + hold) ){

                        //Play audio for placing the item in the correct spot
                        let audio = new Audio("audio/correct_answer.mp3")
                        audio.play()
                        
                        let holdId
                        //Placing the motherboard
                        if (hold == "motherboard") {
                            motherboardContainer = document.getElementById("motherboardContainer")

                            //Add the motherboard with items on top in the container
                            motherboardContainer.innerHTML += document.getElementById("motherboardInnerContainer").innerHTML
                            
                            //Set the motherboard with items on top in the casing
                            motherboardContainer.setAttribute('position', {x: this.getAttribute('position').x + 0.2, y: this.getAttribute('position').y - 0.3, z: this.getAttribute('position').z})
                            motherboardContainer.setAttribute('rotation', "0 0 0")
                            document.getElementById("js--motherboard").setAttribute("class", "")
                            motherboardCheck = "check"

                            makePickupable('js--ssd')
                        }
                        //Placing the power and the SSD
                        else{
                            holdId = 'js--' + hold
                            // Get the attributes of the item that needs to be placed
                            holdModel = document.getElementById(holdId).getAttribute("gltf-model")
                            scaleModel = document.getElementById(holdId).getAttribute("scale")
                            rotationModel = document.getElementById(holdId).getAttribute("rotation")

                            //Create the picked up item on the chosen spot to put the item down at
                            let item = document.createElement('a-entity');
                            item.setAttribute("id", holdId)
                            item.setAttribute("gltf-model", holdModel)
                            item.setAttribute("scale", scaleModel)
                            item.setAttribute("rotation", rotationModel)

                            scene.appendChild(item);

                            if (hold == "power") {
                                item.setAttribute("position", {x: this.getAttribute('position').x -0.2, y: this.getAttribute('position').y + 0.1, z: this.getAttribute('position').z - 0.25});
                                item.setAttribute('rotation', '0 -90 0')
                                //Once the power supply has been put down in the right spot, the ssd can be picked up
                                makePickupable('js--motherboard')

                                //The power supply cannot be picked up anymore after it's been put in the right spot
                                document.getElementById(holdId).setAttribute("class", "")
                                powerCheck = "check"
                            }
                            else if(hold == "ssd"){
                                item.setAttribute("position", {x: this.getAttribute('position').x, y: this.getAttribute('position').y, z: this.getAttribute('position').z - 0.3});

                                makePickupable('js--gpu')
                                //The ssd cannot be picked up anymore after it's been put in the right spot
                                document.getElementById(holdId).setAttribute("class", "")
                                ssdCheck = "check"
                            }
                        }

                        //Remove the item that's being held
                        resetValues()
                        checkPickup()

                        //Remove the spheres
                        removeLength = placesCasing.length
                        for (let i = 0; i < removeLength; i++) {
                            placesCasing[0].remove()
                        }
                    }
    
                    //Play a wrong answer audio if the chosen spot is not the spot the item needs to go
                    else if(hold != null && placesCasing[i].getAttribute("id") != ("places--" + hold) ){
                        let audio = new Audio("audio/wrong_answer.mp3")
                        audio.play()
                        console.log("wrong")
                    }
    
                }); 
            }
        }
}