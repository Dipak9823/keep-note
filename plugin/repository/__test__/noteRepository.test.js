const Fastify=require('fastify');
const noteRepository=require('../noteRepository');

describe("Notes Repository",()=>{
    let fastify;

    beforeAll(async()=>{
        fastify=Fastify();
        fastify.register(noteRepository);
        await fastify.ready();
    });

    it("fastify.noteRepository should exists",()=>{
        expect(fastify.hasDecorator("noteRepository")).toBe(true);
    });
});