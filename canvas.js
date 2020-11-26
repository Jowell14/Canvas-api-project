// Initial setup 
const canvas = document.querySelector('#canvas1')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.background = 'black'
const ctx = canvas.getContext('2d')
let theta
let eyes = []

// Object to store mouse coordinates
const mouse = {
        x: undefined,
        y: undefined
    }
    // Set mouse position relative to window 

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x
    mouse.y = event.y
})


// Make the Eye class
class Eye {
    constructor(x, y, radius) {
            this.x = x
            this.y = y
            this.radius = radius
        }
        // Have the Draw() Method where we will :
    draw() {
        // Draw mouse
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 15, 0, Math.PI * 2, true)
        ctx.fillStyle = "whitesmoke"
        ctx.fill()
        ctx.closePath()

        // Draw eye
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
        ctx.fillStyle = "black"
        ctx.fill()
        ctx.closePath();

        //get angle
        let iris_dx = mouse.x - this.x
        let iris_dy = mouse.y - this.y
        theta = Math.atan2(iris_dy, iris_dx)

        // Draw Iris
        let iris_x = this.x + Math.cos(theta) * this.radius / 10
        let iris_y = this.y + Math.sin(theta) * this.radius / 10
        let irisRadius = this.radius / 1.2

        ctx.beginPath()
        ctx.arc(iris_x, iris_y, irisRadius, 0, Math.PI * 2, true)
        ctx.fillStyle = "green"
        ctx.fill()
        ctx.closePath()

        // Draw Pupil
        let pupil_dx = mouse.x - this.x
        let pupil_dy = mouse.y - this.y
        theta = Math.atan2(pupil_dy, pupil_dx)
        let pupilRadius = this.radius / 2.5
        let pupil_x = this.x + Math.cos(theta) * this.radius / 1.9
        let pupil_y = this.y + Math.sin(theta) * this.radius / 1.9

        ctx.beginPath()
        ctx.arc(pupil_x, pupil_y, pupilRadius, 0, Math.PI * 2, true)
        ctx.fillStyle = "black"
        ctx.fill()
        ctx.closePath()

        // draw Pupil reflection
        ctx.beginPath()
        ctx.arc(pupil_x - pupilRadius / 3, pupil_y - pupilRadius / 3, pupilRadius / 2, 0, Math.PI * 2, false)
        ctx.fillStyle = "rgba(255, 255, 255, .1)"
        ctx.fill()
        ctx.closePath()
    }
}
// Initializing the class
function init() {
    eyes = []
    let overlapping = false
    let numberOfEyes = 900
    let protection = 100000
    let counter = 0

    while (eyes.length < numberOfEyes && counter < protection) {
        let eye = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.floor(Math.random() * 80) + 3
        }
        overlapping = false
        for (let i = 0; i < eyes.length; i++) {
            let previousEye = eyes[i]
            let dx = eye.x - previousEye.x
            let dy = eye.y - previousEye.y
            let distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < (eye.radius + previousEye.radius)) {
                overlapping = true
                break
            }
        }
        if (!overlapping) {
            // Instantiating the Eye class
            eyes.push(new Eye(eye.x, eye.y, eye.radius))
        }

        counter++
    }
}

// Initializing the class
function init() {
    eyes = []
    let overlapping = false
    let numberOfEyes = 900
    let protection = 100000
    let counter = 0

    while (eyes.length < numberOfEyes && counter < protection) {
        let eye = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.floor(Math.random() * 80) + 3
        }
        overlapping = false
        for (let i = 0; i < eyes.length; i++) {
            let previousEye = eyes[i]
            let dx = eye.x - previousEye.x
            let dy = eye.y - previousEye.y
            let distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < (eye.radius + previousEye.radius)) {
                overlapping = true
                break
            }
        }
        if (!overlapping) {
            // Instantiating the Eye class
            eyes.push(new Eye(eye.x, eye.y, eye.radius))
        }

        counter++
    }
}
// Animate objects
function animate() {
    requestAnimationFrame(animate)
        //     ctx.fillStyle = "rgba(0, 0, 0, .25)"
        //     ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < eyes.length; i++) {
        eyes[i].draw()
    }
}
init()
animate() // Call the function to activate animation

//Adding EventListener for when browser is resized
//Set canvas to size of window
window.addEventListener("resize", function() {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init() // Call to init() function to run when window is resized
})