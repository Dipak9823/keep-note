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

    afterAll(async () => {
        await fastify.close();
      });
    
      afterEach(() => {
        fastify.pg.query.mockReset();
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

        it("should return note when it successfully added to the database",async()=>{
            fastify.pg.query.mockResolvedValue({
                rows:[data]
            })

            const result=await fastify.noteRepository.insert(data);
            expect(fastify.pg.query).toHaveBeenCalled();
            expect(result).toEqual(data);
        })
    });

    describe("Get notes from database",()=>{
        it("should return null, if theres is no notes in database",async()=>{
            fastify.pg.query.mockResolvedValueOnce({
                rows:[], rowCount:0
            });

            const response=await fastify.noteRepository.get();
            expect(fastify.pg.query).toHaveBeenCalled();
            expect(response).toBeNull
        });

        it("Should return notes, if it has some notes in database",async()=>{
            const data={
                id:101,
                title:"reminder",
                description:"Birthday reminder",
                archive:false
            }
            fastify.pg.query.mockResolvedValueOnce({ rows: [data], rowCount: 1 });

            const response = await fastify.noteRepository.get();
            expect(fastify.pg.query).toHaveBeenCalled();
            expect(response).toEqual(data);
        });
    });
});