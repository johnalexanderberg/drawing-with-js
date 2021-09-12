const storedParams = [

    {
        rotationFactor: 0.8827729957837194,
        indexFactor: 0.9971221041873943,
        rotationGroupFactor: 0.6531744270667164
    },

    {
        rotationFactor: 0.5702076877662743,
        indexFactor: 0.8770985388379873,
        rotationGroupFactor: 0.46109230430687154
    },

    {
        rotationFactor:
            0.13756196097976403,
        indexFactor: 1.2164190194381193,
        rotationGroupFactor: 0.9522686355110188
    },

    {
        rotationFactor: 0.06602214888151337,
        indexFactor: 0.0076443536898196385,
        rotationGroupFactor: 0.09662700101065069
    },

    {
        rotationFactor:
            0.7236170897588694,
        indexFactor: 1.3806279225542024,
        rotationGroupFactor: 0.6679223345024918
    },

    {
        rotationFactor: 0.8248433086629128,
        indexFactor: 1.8278690110631093,
        rotationGroupFactor: 0.2198203814210271
    },

    {
        rotationFactor: 0.5351046739620882,
        indexFactor: 1.1746144656904747,
        rotationGroupFactor: 0.6778206467296493
    },

    {
        rotationFactor: 0.037010731165352695,
        indexFactor: 1.1083855147290307,
        rotationGroupFactor: 0.8832047464091781
    },

    {
        rotationFactor: 0.6748402310424815,
        indexFactor: 1.9234678505918463,
        rotationGroupFactor: 0.35153734825157446
    },

    {
        rotationFactor: 0.14971331405390287,
        indexFactor: 1.1708997728770236,
        rotationGroupFactor: 0.9447124313653803
    },

    {
        rotationFactor: 0.5512814893975728,
        indexFactor: 0.6800924458825213,
        rotationGroupFactor: 0.47474189272416956
    },

    {
        rotationFactor: 0.15694481362948465,
        indexFactor: 0.7933361928142868,
        rotationGroupFactor: 0.8794378845549515
    },

    {
        rotationFactor: 0.5118819513841699,
        indexFactor: 0.4957134291371399,
        rotationGroupFactor: 0.10314961060321637
    },

    {
        rotationFactor: 0.6065018648290643,
        indexFactor: 1.0342052270938713,
        rotationGroupFactor: 0.4252174440632759
    },

    {
        rotationFactor: 0.5465450550536242,
        indexFactor: 1.6179513327545143,
        rotationGroupFactor: 0.5573818433401159
    },

    {
        rotationFactor: 0.0822306388171421,
        indexFactor: 1.8251897261572778,
        rotationGroupFactor: 0.5367680145338805
    },

    {
        rotationFactor: 0.9389336136379947,
        indexFactor: 0.06580271786774139,
        rotationGroupFactor: 0.8874675161216818
    },

    {
        rotationFactor: 0.9744375331830812,
        indexFactor: 1.0361274559830118,
        rotationGroupFactor: 0.45612156818824556
    },

    {
        rotationFactor: 0.9497904431125568,
        indexFactor: 0.06621471320344652,
        rotationGroupFactor: 0.003723500137698732
    },

    {
        rotationFactor: 0.7811808073040649,
        indexFactor: 0.9661790703663682,
        rotationGroupFactor: 0.7485543507821888
    },

    {
        rotationFactor: 0.89291043700949,
        indexFactor: 1.0899421497497812,
        rotationGroupFactor: 0.4291639341017337
    },

    {
        rotationFactor: 0.10564449314460722,
        indexFactor: 1.1803357622481525,
        rotationGroupFactor: 0.11857778684840126
    }
];

let counter = 0;

const container = document.querySelector('section');


const params = {
    width: 720,
    height: 720
}

const two = new Two(params);

two.appendTo(container);

const numberOfShapes = 256;
const plotRadius = 256;
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
group.translation.set(360, 360);


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

    const shapeParams = storedParams[++counter%storedParams.length];
    console.log(shapeParams);

    for(let i = 0; i < shapes.length; i++){
        const angle = (Math.PI * 2) * i / numberOfShapes;

        shapes[i].rotation = angle + shapeParams.rotationFactor*50 * i*shapeParams.indexFactor;

    // const rotationFactor = Math.random-placement();
    // const indexFactor = Math.random-placement()*2;
    // const rotationGroupFactor = Math.random-placement();
    // rotationSpeed = rotationFactor/1000;
    // rotationSpeedGroup = rotationGroupFactor/1000;
    //
    // for(let i = 0; i < shapes.length; i++){
    //     const angle = (Math.PI * 2) * i / numberOfShapes;
    //
    //     shapes[i].rotation = angle + rotationFactor*50 * i*indexFactor;


    }
    // console.log('rotationFactor: '+rotationFactor);
    // console.log('indexFactor: '+indexFactor);
    // console.log('rotationGroupFactor: '+rotationGroupFactor);
};

const handleMouseMove = () => {

}



container.addEventListener('click', handleClick);
container.addEventListener('mousemove', handleMouseMove)