const frameContainer = document.querySelector("section")
const bgColorContainer = document.querySelector('#container')
bgColorContainer.style.backgroundColor = bgcolors[currentColor]


const params = {
    width: 500,
    height: 500
}

const two = new Two(params)
two.appendTo(frameContainer)

// config for our animation
const numberOfShapes = 42
const shapes = []
const loopDuration = 6 * 60
const aDelay = 0.1 / numberOfShapes


function shiftIndex(i) {

    if (i % 3 === 0) {
        return i
    } else if (i % 3 === 1) {
        return ((numberOfShapes-i)%numberOfShapes)
    }
    else {
        return (Math.round(numberOfShapes/3+i)%numberOfShapes);
    }
}
// make shapes
for (let i = 0; i < numberOfShapes; i++) {

    const size = 500 / numberOfShapes

    const plotRadius = 200
    let angle = fullRotation * shiftIndex(i) / numberOfShapes

    //start x,y position
    const sx = size * i + (size / 2)
    const sy = 250;

    //end x,y position
    const ex = 250 + plotRadius * Math.cos(angle)
    const ey = 250 + plotRadius * Math.sin(angle)

    //start & end rotation
    const sr = 0;
    const er = shiftIndex(i) / numberOfShapes * fullRotation

    //start & end scale
    const ss = 1
    const es = 1.5

    const shape = two.makeRectangle(sx, sy, size, size)
    shape.noStroke()
    shape.fill = '#004F73'

    shape.data = {
        sx: sx,
        sy: sy,
        ex: ex,
        ey: ey,
        sr: sr,
        er: er,
        ss: ss,
        es: es
    }

    shapes.push(shape)

}

two.bind("update", function (frameCount) {
    // draw

    const currentFrame = frameCount % loopDuration
    const t = currentFrame / loopDuration

    shapes.forEach((shape, i) => {


        //individual delay
        const aStart = aDelay * (i)
        const aEnd = aDelay * i

        //individual timeline
        let u = 0;

        if (t < 0.5) {
            u = mapAndClamp(t, aStart, 0.5 - aEnd, 0, 1)
        } else {
            u = mapAndClamp(t, 0.5 + aStart, 1 - aEnd, 1, 0)
        }

        const cu = easeInOutCubic(u);

        const x = mapAndClamp(cu, 0, 1, shape.data.sx, shape.data.ex)
        const y = mapAndClamp(cu, 0, 1, shape.data.sy, shape.data.ey)

        const r = mapAndClamp(cu, 0, 1, shape.data.sr, shape.data.er)
        const s = mapAndClamp(cu, 0, 1, shape.data.ss, shape.data.es)


        shape.translation.x = x;
        shape.translation.y = y;
        shape.rotation = r;
        shape.scale = s;


    })

})


document.addEventListener('click', function () {
    currentColor = (currentColor + 1) % bgcolors.length
    console.log(currentColor)
    console.log(bgcolors[currentColor])
    bgColorContainer.style.backgroundColor = bgcolors[currentColor]

    shapes.forEach((shape, i) => {

        shape.fill = shapecolors[currentColor]

    })
})

two.play()

