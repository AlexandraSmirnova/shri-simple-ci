import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
 
const adapter = new FileSync('db.json')
const db = low(adapter)
 
db.defaults({ agents: [], builds: [] }).write();

export default db;