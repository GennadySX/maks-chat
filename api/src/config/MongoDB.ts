import Mongo from 'mongoose'
const run = () => {
    Mongo.set('useCreateIndex', true)
    Mongo.set('useFindAndModify', false);
    Mongo.set('useCreateIndex', true);
    Mongo.set('useUnifiedTopology', true);
    Mongo.connect(`mongodb://${process.env.db_host}${process.env.db_port ?':'+process.env.db_port:''}/${process.env.db_name}`,    {useNewUrlParser: true, useUnifiedTopology: true});
    const db = Mongo.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('db connected')
    });

}

const DB = {
    connect: () => run()
}

export {
    DB as Mongo
}
