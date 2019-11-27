const Ajv=require('ajv');
const Fastify=require('fastify')({logger:true});
const path=require('path');
const autoload=require('autoload');

const init=()=>{
    const fastify=Fastify;

    fastify.register(autoload,{
        dir: path.join(__dirname,'repository'),
        ignorePattern: /^(__tests__|schema)/
    });

    return fastify;
}

Fastify.listen(3000);
module.exports={
    init
}