import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
 

const adapter = new FileSync('db.json');
const db = lowdb(adapter);
 
db.defaults({ agents: [], builds: [] }).write();

export default db;