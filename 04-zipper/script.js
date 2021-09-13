const frame = document.querySelector(".frame")

const params = { 
  width: 500, 
  height: 500 
}

const two = new Two(params)
two.appendTo(frame)

// config for our animation
const numberOfShapes = 25
const variations = 2;
const shapes = []
const shapeMin = 0
const shapeMax = 500
const shapeDiff = shapeMax - shapeMin
const loopDuration = 4 * 60
const totalDuration = loopDuration * variations;

// make shapes
for (let i = 0; i < numberOfShapes; i++) { 
  const x = 250;
  const y = 20 * i + 5;

  const shape = two.makeRectangle(x, y, shapeMin, 10)
  shape.noStroke();
  shape.fill = '#5645d3';

  shapes.push(shape);
}

two.bind("update", function (frameCount) {

  //determine which variation to be animated

  let variation = Math.round((frameCount % totalDuration) / totalDuration)



  //calculate current frame & timeline (range 0-1)

  const currentFrame = frameCount % loopDuration
  const t = currentFrame / loopDuration;

  // draw
  shapes.forEach((shape, i)  => {
    const animationStart = 0.01 * (numberOfShapes - i)
    const animationEnd = 0.01 * i;

    // u = individual timeline
    let u = 0;

    switch (variation) {
      //animation 1
      case 0:

      if (t < 0.5) {
        u = mapAndClamp(t, animationStart, 0.5 - animationEnd, 0, 1)
      } else {
        u = mapAndClamp(t, 0.5 + animationStart, 1 - animationEnd, 1, 0)
      }

      shape.width = shapeMin + (shapeDiff * easeInOutCubic(u))
        shape.translation.x = 250;
        break;

        //animation 2
      case 1:
        if (t < 0.5) {
          u = mapAndClamp(t, animationStart, 0.5 - animationEnd, 0, 1)
        } else {
          u = mapAndClamp(t, 0.5 + animationStart, 1 - animationEnd, 1, 0)
        }

        shape.width = shapeMin + (shapeDiff * easeInOutCubic(u))
        shape.translation.x = 750 * easeInOutCubic(u);
    }

  })

})


two.play()

