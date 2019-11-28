const fp=require('fastify-plugin');
const SQL=require('@nearform/sql');

module.exports=fp((fastify,options,next)=>{

    const insert=async(note)=>{
        const data={
            id:note.id,
            title:note.title,
            description:note.description,
            archive:note.archive
        }

        const sql=SQL`INSERT INTO notes(
                        id,
                        title,
                        description,
                        archive
        )values(
                        ${data.id},
                        ${data.title},
                        ${data.description},
                        ${data.archive}
                        )`;
        
        try{
                const result=await fastify.pg.query(sql);
                const updatedRow=result.rows && result.rows[0];
                return updatedRow;
        }catch(err) {
            console.log(err);
        }
    }

    const get=async()=>{
        const sql=SQL`SELECT * FROM notes`;
        try{
            const result=await fastify.pg.query(sql);
            return result.rowCount <= 0 ? null : result.rows[0];
        }
       catch(err){
           console.log(err);
       }
    }
    fastify.decorate("noteRepository",{insert,get});
    next();
})
