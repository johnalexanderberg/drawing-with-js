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
const numberOfShapes = 20
const shapes = []
const loopDuration = 3 * 60
const aDelay = 0.15/numberOfShapes

// make shapes
for (let i = 0; i < numberOfShapes; i++) { 

  const size = 500/numberOfShapes

  //start x,y position
  const sx = size*i + (size/2)
  const sy = 250;

  //end x,y position
  const ex = randomNumber(50, 450)
  const ey = randomNumber(50, 450)

  //start & end rotation
  const sr = 0;
  const er = randomNumber(-2 * fullRotation, 2* fullRotation)

  //start & end scale
  const ss = 1
  const dist = Math.abs(ey-250)
  const es = mapAndClamp(dist, 0, 200, 0.8, 1.2)

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

    if(currentFrame === 0){
      shape.data.ex = randomNumber(50, 450)
      shape.data.ex = randomNumber(50, 450)
      shape.data.er = randomNumber(-2 * fullRotation, 2* fullRotation)
    }


    //individual delay
    const aStart = aDelay  * (numberOfShapes-i)
    const aEnd = aDelay  * i

    //individual timeline
    let u = 0;

    if (t < 0.5){
      u = mapAndClamp(t, aStart, 0.5-aEnd, 0, 1)
    }
    else{
      u = mapAndClamp(t, 0.5+aStart, 1-aEnd, 1, 0)
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


document.addEventListener('click', function(){
  currentColor = (currentColor+1) % bgcolors.length
  console.log(currentColor)
  console.log(bgcolors[currentColor])
  bgColorContainer.style.backgroundColor = bgcolors[currentColor]

  shapes.forEach((shape, i) => {

    shape.fill = shapecolors[currentColor]

  })
})


two.play()

