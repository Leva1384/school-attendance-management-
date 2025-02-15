const express = require("express");
const { neon } = require("@neondatabase/serverless");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port=3001;

const DATABASE_URL='postgresql://neondb_owner:npg_fYakZK5bTRH8@ep-purple-glade-a8tgoeci-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'

const sql = neon(DATABASE_URL);

const requestHandler = async (req, res) => {
  const result = await sql`SELECT version()`;
  const { version } = result[0];
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(version);
};



app.listen(port, ()=> console.log(`my app is listening at http://localhost:${port}`));

