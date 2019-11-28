const postNoteBodySchema={
    type:'object',
    properties:{
        id : { type : 'string' },
        title : { type : 'string'},
        description : { type : 'string' },
        isArchive : { type : 'boolean'}
    }
}


module.exports = {
    postSchema:{body:postNoteBodySchema},
   
}