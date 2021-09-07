const container = document.querySelector('section');

const params = {
    width: 500,
    height: 500
}

const two = new Two(params);

two.appendTo(container);

let numberOfShapes = 12;
const plotRadius = 150;
const shapes = [];
shapes.length = numberOfShapes;
let group;

function spawnShapes() {

    for (let i = 0; i < numberOfShapes; i++) {
        const angle = (Math.PI * 2) * i / numberOfShapes;
        const x = (plotRadius) * Math.cos(angle);
        const y = (plotRadius) * Math.sin(angle);
        const width = params.width / numberOfShapes;
        const height = params.width / numberOfShapes;
        const shape = two.makeRectangle(x, y, width, height);
        shape.fill = '#31f9b3';
        shape.noStroke();
        shapes[i] = shape;
        shape.rotation = angle + 2 * i;
    }

    group = two.makeGroup(shapes);
    group.translation.set(250, 250);
}

spawnShapes();


const onUpdate = () => {

    for (let i = 0; i < shapes.length; i++) {
        shapes[i].rotation += 0.01;

    }
    group.rotation += 0.001;
}
// lets listen for any update, any frame 60fps
two.bind('update', onUpdate)

two.play();

const handleClick = () => {
    numberOfShapes = numberOfShapes * 2;
    spawnShapes();
    console.log('clicked');
};


container.addEventListener('click', handleClick);