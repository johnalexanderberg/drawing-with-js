const container = document.querySelector("section")

const params = { 
  width: 500, 
  height: 500 
}

const two = new Two(params)
two.appendTo(container)

// config for our animation

const loopDuration = 60 * 4;
let variations = 2;
const numberOfShapes = 40
const shapeIncr = 20
aDelay = 1 / 120;
const shapes = []

// make shapes
for (let i = 0; i < numberOfShapes; i++) {
  const size = (numberOfShapes-i ) * shapeIncr;
  const shape = two.makeRectangle(250,250, size, size);

  if (i%2 === 0 ){
    shape.fill = '#f55745';
  }
  else {
    shape.fill = '#f9d2cd';
  }





  shape.noStroke();

  shapes.push(shape);
  
}

two.bind("update", function (frameCount) {
  // draw

  const currentFrame = frameCount % loopDuration;
  const t = currentFrame / loopDuration;

  shapes.forEach((shape, i) => {

    const aStart = aDelay * (numberOfShapes -i);
    const aEnd = aDelay * i;

    const u = mapAndClamp(t, aStart, 1 - aEnd, 0, 1)
    //shape.rotation = easeInOutCubic(u) * halfRotation

    if (frameCount % (loopDuration * variations) < loopDuration ) {
      shape.rotation = easeInOutCubic(u) * halfRotation
    }
    else {
      if (i % 2 === 0) {
        shape.rotation = 0.5 * easeInOutCubic(u) * halfRotation
      } else {
        shape.rotation = -0.5 * t%loopDuration * halfRotation
      }
    }
  })
})
two.play()

