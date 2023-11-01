const {
  seed,
  client,
} = require('./db');
const app = require('./app');

const init = async()=> {
  await client.connect();
  console.log('connected to database');
  if(process.env.SYNC){
    await seed();
    console.log('create your tables and seed data');
  }

  const port = process.env.PORT || 4000;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
  });
}

init();
