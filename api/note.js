const {OK, NOT_FOUND}=require('http-status-codes');
const {postSchema}=require('./schema/noteSchema');

const noteApi=async fastify =>{
    fastify.post("/note", { schema : postSchema } , async(req,reply)=>{
        const note={...req.body};

        const data = await fastify.noteRepository.insert(note);

        reply.code(OK).send();
    });

    fastify.get('/getAll',async (req,reply)=>{
        const data=await fastify.noteRepository.get();

        reply.code(OK).send(data);
    });
}

module.exports= noteApi;
