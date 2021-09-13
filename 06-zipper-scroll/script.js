const container = document.querySelector("section")


const animatedTexts = [];
const textOne = document.querySelector('#scroll-1')
const textTwo = document.querySelector('#scroll-2')
const textThree = document.querySelector('#scroll-3')
const textFour = document.querySelector('#scroll-4')
const textFive = document.querySelector('#scroll-5')
const textSix = document.querySelector('#scroll-6')
const textSeven = document.querySelector('#scroll-7')
const textEight = document.querySelector('#scroll-8')
const textNine = document.querySelector('#scroll-9')

animatedTexts.push(textOne)
animatedTexts.push(textTwo)
animatedTexts.push(textThree)
animatedTexts.push(textFour)
animatedTexts.push(textFive)
animatedTexts.push(textSix)
animatedTexts.push(textSeven)
animatedTexts.push(textEight)
animatedTexts.push(textNine)

animatedTexts.forEach((text, i) => {

    text.data = {
        initialXPos: 50,
        initialYPos: 50
    }

    if(i > 5){
        text.data.initialYPos = 30 + ((i-5) * 20)
    }

    text.style.left = `${text.data.initialXPos}` + '%';
    text.style.top = `${text.data.initialYPos}` + '%';

})



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
let actualScroll = 0;

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

    actualScroll = mapAndClamp(window.pageYOffset, 0, scrollMax, 0, 1)

    //scene 1
    if (actualScroll < 0.69) {

        scrollPosition = actualScroll
        console.log('scroll: ', actualScroll)
        console.log('timeline: ', scrollPosition)
    } else if (actualScroll < 0.9)
    {
        console.log('scroll: ', actualScroll)
        console.log('timeline: ', scrollPosition)
        scrollPosition = mapAndClamp(actualScroll, 0.69, 0.9, 0.69, 0.8)

    } else if (actualScroll <= 1){
        scrollPosition = mapAndClamp(actualScroll, 0.9, 1, 0.8, 1)
        console.log('scroll: ', actualScroll)
        console.log('timeline: ', scrollPosition)
    }


    if (scrollPosition < 0.5) {
        variation = 0;
    } else {
        variation = 1;
    }

//Text 2:
if (scrollPosition > 0.05 && scrollPosition < 0.5){
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

    //Text 4-6 (from left)
    if (scrollPosition > 0.7){
        textSeven.style.display = 'block';
        textEight.style.display = 'block';
        textNine.style.display = 'block';
    }
    else {
        textSeven.style.display = 'none';
        textEight.style.display = 'none';
        textNine.style.display = 'none';
    }

    textOne.style.top = `${textOne.data.initialYPos + easeInOutCubic((scrollPosition) * -50)}` + '%';
    textTwo.style.top = `${textTwo.data.initialYPos + ((scrollPosition*4-0.25) * -21)}` + '%';
    textThree.style.top = `${textThree.data.initialYPos + (easeInOutCubic((scrollPosition - 0.5) * -40))}` + '%';

    textFour.style.left = `${textFour.data.initialXPos + -(easeInOutCubic((scrollPosition - 0.69) * -100))}` + '%';
    textFive.style.left = `${textFive.data.initialXPos + -(easeInOutCubic((scrollPosition - 0.74) * -100))}` + '%';
    textSix.style.left = `${textSix.data.initialXPos + -(easeInOutCubic((scrollPosition - 0.79) * -100))}` + '%';

    textSeven.style.left = `${textSeven.data.initialXPos + (easeInOutCubic((scrollPosition - 1) * -30))}` + '%';
    textEight.style.left = `${textEight.data.initialXPos + (easeInOutCubic((scrollPosition - 1) * -40))}` + '%';
    textNine.style.left = `${textNine.data.initialXPos + (easeInOutCubic((scrollPosition - 1) * -50))}` + '%';

}

document.addEventListener('scroll', handleScroll)

two.play()

