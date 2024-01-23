//  animation="property: scale; loop: true; dur: 1200; from: 1 1 1; to: 1.5 1.5 1.5; dir:alternate;"

window.onload = () => {
    const camera = document.getElementById('js--camera');
    const places = document.getElementsByClassName('js--places');
    const motherboard = document.getElementById('js--motherboard')
    const cameraHtml = camera.innerHTML
    let pickups = document.getElementsByClassName("js--pickup");
    let hold = null

    function partPlacer(part) {
        console.log(part)
        switch(part){
            case 'gpu':
                gpuSpot = document.getElementById('js--gpuSpot')
                gpuSpot.setAttribute('visible', 'true')
                gpuSpot.setAttribute('class', 'js--interact')
                gpuSpot.addEventListener('click', function(){
                    console.log('click')
                })
        }
    }

    function checkPickup() {

        for (let i = 0; i < pickups.length; i++) {
            pickups[i].addEventListener('click', function (evt) {
                if (hold == null) {

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
                            hold = 'cpu'
                            break
                        case 'js--ram1':
                            camera.innerHTML += '<a-entity id="js--ram1" class="js--interact js--pickup" gltf-model="models/ram_corsair_vengeance_lpx.glb" scale="0.055 0.055 0.055" position="0.5 -0.5 -1" rotation="90 90 0"></a-entity>'
                            hold = 'ram'
                            break
                        case 'js--ssd':
                            camera.innerHTML += '<a-entity id="js--ssd" gltf-model="models/ssd_solid-state_drive.glb" scale="0.05 0.05 0.05" position="0.5 -0.5 -1"></a-entity>'
                            hold = 'ssd'
                            break
                        case 'js--power':
                            camera.innerHTML += '<a-entity id="js--power" class="js--interact js--pickup"  gltf-model="models/power_supply_basic.glb" scale="0.1 0.1 0.1" position="0.5 -0.5 -1"></a-entity>'
                            hold = 'power'
                            break
                        }       
                    this.remove();
                    console.log(motherboardContainer.innerHTML)
                    for (let i = 0; i < places.length; i++) {
                        places[i].setAttribute("animation", "property: scale; loop: true; dur: 1200; from: 1 1 1; to: 1.5 1.5 1.5; dir:alternate;")
                    }
                    partPlacer(hold)
                }
            });
        }
        
    }

    checkPickup()
    
}