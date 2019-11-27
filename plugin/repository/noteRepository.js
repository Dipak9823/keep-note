const fp=require('fastify-plugin');
const SQL=require('@nearform/sql');

module.exports=fp((fastify,options,next)=>{

    const insert=async(note)=>{
        
    }
    fastify.decorate("noteRepository",{insert});
    next();
})
