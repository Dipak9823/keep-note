const Fastify=require('fastify');
const noteRepository=require('../noteRepository');

describe("Notes Repository",()=>{
    let fastify;

    beforeAll(async()=>{
        fastify=Fastify();
        fastify.register(noteRepository);
        await fastify.ready();

        fastify.pg = {
            query: jest.fn()
        };
    });

    it("fastify.noteRepository should exists",()=>{
        expect(fastify.hasDecorator("noteRepository")).toBe(true);
    });

    describe("Insert new Note into database",()=>{
        const data={
            id:101,
            title:"reminder",
            description:"Birthday reminder",
            archive:false
        }

        it("It should return note when it successfully added to the database",async()=>{
            fastify.pg.query.mockResolvedValue({
                rows:[{...data}]
            })

            const result=await fastify.noteRepository.insert(data);
            expect(fastify.pg.query).toHaveBeenCalled();
            expect(result).toEqual(data);
        })
    })
});