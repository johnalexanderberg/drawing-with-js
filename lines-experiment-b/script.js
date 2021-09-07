const container = document.querySelector('section');

const params = {
    width: 500,
    height: 500
}

const two = new Two(params);

two.appendTo(container);

const numberOfShapes = 256;
const plotRadius = 150;
const shapes = [];
shapes.length = numberOfShapes;
let rotationSpeed = 0.001;
let rotationSpeedGroup = 0.002;

for(let i = 0; i < numberOfShapes; i++){

    const angle = (Math.PI * 2) * i / numberOfShapes;
    const x = plotRadius * Math.cos(angle);
    const y = plotRadius * Math.sin(angle);
    const width = 500;
    const height = 1;
const shape = two.makeArrow(x, y, width, height);
    shape.fill = '#31f9b3';
    if ((i/12)%2 > 1){
        shape.fill = '#6a49ff';
    }
    shape.opacity = ((i%12)+1)/12;
    shape.noStroke();
    shapes[i] = shape;
    shape.rotation = angle + 2*i;
}

const group = two.makeGroup(shapes);
group.translation.set(250, 250);


const onUpdate = () => {

    for(let i = 0; i < shapes.length; i++){
        shapes[i].rotation += rotationSpeed*Math.sin(shapes[i].rotation);

    }
    group.rotation += rotationSpeedGroup;
}
// this will call onUpdate every frame (60fps)
two.bind('update', onUpdate)

two.play();

const handleClick = () => {
    const rotationFactor = Math.random();
    const indexFactor = Math.random()*2;
    const rotationGroupFactor = Math.random();
    rotationSpeed = rotationFactor/1000;
    rotationSpeedGroup = rotationGroupFactor/1000;

    for(let i = 0; i < shapes.length; i++){
        const angle = (Math.PI * 2) * i / numberOfShapes;

        shapes[i].rotation = angle + rotationFactor*50 * i*indexFactor;


    }
    console.log('rotationFactor: '+rotationFactor);
    console.log('indexFactor: '+indexFactor);
    console.log('rotationGroupFactor: '+rotationGroupFactor);
};



container.addEventListener('click', handleClick);