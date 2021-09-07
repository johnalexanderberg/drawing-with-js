const container = document.querySelector('section');

const params = {
    width: 500,
    height: 500
}

const two = new Two(params);

two.appendTo(container);

const numberOfShapes = 512;
const plotRadius = 80;
const shapes = [];
shapes.length = numberOfShapes;
let rotationSpeed = 0.001;
let rotationSpeedGroup = 0.002;

for (let i = 0; i < numberOfShapes; i++) {

    const angle = (Math.PI * 2) * i / numberOfShapes;
    const x = plotRadius * Math.cos(angle);
    const y = plotRadius * Math.sin(angle);
    const width = 100;
    const height = 1;
    const shape = two.makeRectangle(x, y, width/4 * ((i%4)*4 + 0.2)-50,height);
    shape.fill = '#31f9b3';

    shape.opacity = ((i % 12) + 1) / 12;
    shape.noStroke();
    shapes[i] = shape;
    shape.rotation = angle + 2 * i;
}

const group = two.makeGroup(shapes);
group.translation.set(250, 250);


const onUpdate = () => {

    for (let i = 0; i < shapes.length; i++) {

        shapes[i].rotation += rotationSpeed * Math.sin(shapes[i].rotation);
    }
    group.rotation += rotationSpeedGroup;
}
// this will call onUpdate every frame (60fps)
two.bind('update', onUpdate)

two.play();

const handleClick = () => {
    const random = Math.random();
    const random2 = Math.random() * 2;
    rotationSpeed = random / 1000;
    rotationSpeedGroup = Math.random() / 1000;

    for (let i = 0; i < shapes.length; i++) {
        const angle = (Math.PI * 2) * i / numberOfShapes;

        shapes[i].rotation = angle + random * 50 * i * random2;


    }
    console.log('clicked');
};


container.addEventListener('click', handleClick);