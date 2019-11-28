const Fastify = require('fastify');
const { BAD_REQUEST, OK, NOT_FOUND } = require('http-status-codes');
const Ajv = require('ajv');
const noteApi = require('../note');

describe("Note Api", () => {
    let fastify;
    const ajv = new Ajv({
        removeAdditional: false,
        useDefaults: true,
        coerceTypes: false,
        allErrors: true
    });

    const data = {
        id: "101",
        title: "Dipak patil",
        description: "brand",
        isArchive: false
    };

    beforeAll(async () => {
        fastify = Fastify();
        fastify.register(noteApi);
       
        fastify.noteRepository = {
            insert: jest.fn(),
        }
    });

    describe("Insert note into database", () => {
        beforeEach(() => {
            fastify.noteRepository.insert.mockResolvedValue(data);
        });

        describe("Insert note into database", () => {

            it("it should return status code 200(OK)", async() => {

                const response =await fastify.inject({
                    method: "post",
                    url: "/note",
                    payload: data
                });

                expect(response.statusCode).toBe(OK);
            });
            
            it("should save data into database",async()=>{
                const invalidData={
                    ...data,isArchive:"It should be boolean"
                }
                const response=await fastify.inject({
                    method: "post",
                    url: "/note",
                    payload: invalidData
                });

                expect(response.statusCode).toEqual(BAD_REQUEST);
            })
        })
    });
})
