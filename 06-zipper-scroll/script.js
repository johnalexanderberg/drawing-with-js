const container = document.querySelector("section")
const textOne = document.querySelector('#scroll-1')
const textTwo = document.querySelector('#scroll-2')
const textThree = document.querySelector('#scroll-3')
const textFour = document.querySelector('#scroll-4')
const textFive = document.querySelector('#scroll-5')
const textSix = document.querySelector('#scroll-6')

textOne.data = {
    initialYPos: 50
}
textTwo.data = {
    initialYPos: 50
}
textThree.data = {
    initialYPos: 50
}
textFour.data = {
    initialXPos: 50,
    initialYPos: 50
}
textFive.data = {
    initialXPos: 50,
    initialYPos: 50
}
textSix.data = {
    initialXPos: 50,
    initialYPos: 50
}

textOne.style.top = `${textOne.data.initialYPos}` + '%';

textTwo.style.top = `${textTwo.data.initialYPos}` + '%';

textThree.style.top = `${textThree.data.initialYPos}` + '%';

textFour.style.top = `${textFour.data.initialYPos}` + '%';
textFour.style.left = `${textFour.data.initialXPos}` + '%';

textFive.style.top = `${textFive.data.initialYPos}` + '%';
textFive.style.left = `${textFive.data.initialXPos}` + '%';

textSix.style.top = `${textSix.data.initialYPos}` + '%';
textSix.style.left = `${textSix.data.initialXPos}` + '%';



const params = {
    width: 500,
    height: 500
}

const two = new Two(params)
two.appendTo(container)

// config for our animation
const scrollMax = document.querySelector('.container--scroll').clientHeight - window.innerHeight
console.log(scrollMax)

let scrollPosition = 0;

const numberOfShapes = 25
const variations = 2;
let variation = 0;
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

// set t to start of the timeline
let t = 0;

two.bind("update", function (frameCount) {


    t = (scrollPosition * 2)

    if (t > 1) {
        t = t - 1;
    }

    // draw
    shapes.forEach((shape, i) => {
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

const handleScroll = () => {

//map scroll position to a value between 0(top) - 1(bottom)
    scrollPosition = mapAndClamp(window.pageYOffset, 0, scrollMax, 0, 1)
    console.log(scrollPosition)


    if (scrollPosition < 0.5) {
        variation = 0;
    } else {
        variation = 1;
    }

//Text 2:
if (scrollPosition > 0.1 && scrollPosition < 0.4){
    textTwo.style.display = 'block';
}
else {
    textTwo.style.display = 'none';
}

//Text 3:
    if (scrollPosition > 0.4 && scrollPosition < 0.6){
        textThree.style.display = 'block';
    }
    else {
        textThree.style.display = 'none';
    }

    //Text 4-6 (from left)
    if (scrollPosition > 0.6 && scrollPosition < 0.9){
        textFour.style.display = 'block';
        textFive.style.display = 'block';
        textSix.style.display = 'block';
    }
    else {
        textFour.style.display = 'none';
        textFive.style.display = 'none';
        textSix.style.display = 'none';
    }



    textOne.style.top = `${textOne.data.initialYPos + easeInOutCubic((scrollPosition) * -50)}` + '%';
    textTwo.style.top = `${textTwo.data.initialYPos + easeInOutCubic((scrollPosition-0.25) * -30)}` + '%';
    textThree.style.top = `${textThree.data.initialYPos + (easeInOutCubic((scrollPosition - 0.5) * -40))}` + '%';
    textFour.style.left = `${textFour.data.initialXPos + -(easeInOutCubic((scrollPosition - 0.69) * -100))}` + '%';
    textFive.style.left = `${textFive.data.initialXPos + -(easeInOutCubic((scrollPosition - 0.74) * -100))}` + '%';
    textSix.style.left = `${textSix.data.initialXPos + -(easeInOutCubic((scrollPosition - 0.79) * -150))}` + '%';
}

document.addEventListener('scroll', handleScroll)

two.play()

