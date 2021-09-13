const container = document.querySelector("section")

const params = {
    width: 500,
    height: 500
}

const two = new Two(params)
two.appendTo(container)

// config for our animation
const numberOfShapes = 25
const variations = 2;
const shapes = []
const shapeMin = 0
const shapeMax = 500
const shapeDiff = shapeMax - shapeMin
const loopDuration = 4 * 60
const totalDuration = loopDuration * variations;

let mousePosition = []


// make shapes
for (let i = 0; i < numberOfShapes; i++) {
    const x = 250;
    const y = 20 * i + 5;

    const shape = two.makeRectangle(x, y, shapeMin, 10)
    shape.noStroke();
    shape.fill = '#5645d3';

    shapes.push(shape);
}

let t = 0.3;


//Set initial state to 50%
mousePosition[0] = 0.5;
mousePosition[1] = 0.5;

two.bind("update", function () {

    // draw
    shapes.forEach((shape, i) => {
        const animationStart = 0.01 * (numberOfShapes - i)
        const animationEnd = 0.01 * i;


        //Y-axis Animation
        const t = mousePosition[1]

        // u = individual timeline
        let u = 0;

        if (t < 0.5) {
            u = mapAndClamp(t, animationStart, 0.5 - animationEnd, 0, 1)
        } else {
            u = mapAndClamp(t, 0.5 + animationStart, 1 - animationEnd, 1, 0)
        }

        shape.width = shapeMin + (shapeDiff * easeInOutCubic(u))

        //X-axis animation

        if (mousePosition[0] > 0.5) {
            shape.translation.x = 250 + 600 * mapAndClamp(mousePosition[0], 0.5, 1, 0, 1) * easeInOutCubic(u)
        } else {
            shape.translation.x = 250 - 600 * mapAndClamp(mousePosition[0], 0, 0.5, 1, 0) * easeInOutCubic(u)

        }


    })

})

const handleMouseMove = ({clientX, clientY}) => {

    const x = clientX / window.innerWidth
    const y = clientY / window.innerHeight

    mousePosition = [x, y];
}

document.addEventListener('mousemove', handleMouseMove)

two.play()

