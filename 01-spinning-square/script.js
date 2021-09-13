const container = document.querySelector('section');

const params = {
    width: 500,
    height: 500
}

const two = new Two(params);

two.appendTo(container);

const shape = two.makeRectangle(250, 250, 100, 100);

shape.fill = '#f9bc31';
shape.noStroke();


const onUpdate = () => {
    shape.rotation += 0.02;
}
// lets listen for any update, any frame 60fps
two.bind('update', onUpdate)

two.play();

