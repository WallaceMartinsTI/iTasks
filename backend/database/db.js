async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  const { Pool } = require("pg");
  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
  });

  const client = await pool.connect();
  console.log("Criou o pool de conexão");

  const res = await client.query("select now()");
  console.log(res.rows[0]);
  client.release();

  global.connection = pool;
  return pool.connect();
}

connect();

// Insert an user
async function insertUser(user) {
  const client = await connect();
  const sql =
    'INSERT INTO "Users" (id, username, email, password) VALUES ($1, $2, $3, $4)';
  const values = [user.id, user.username, user.email, user.password];
  // There is no return
  await client.query(sql, values);
}

// Select all tasks by user
async function selectTasks(id) {
  const client = await connect();
  const res = await client.query('SELECT * FROM "Tasks" WHERE "ownerId" = $1', [
    id,
  ]);
  return res.rows;
}

// Insert a task
async function insertTask(task) {
  const client = await connect();
  const sql =
    'INSERT INTO "Tasks" (title, "startDate", "endDate", "ownerId") VALUES ($1, $2, $3, $4)';
  const values = [task.title, task.startDate, task.endDate, task.ownerId];
  // There is no return
  await client.query(sql, values);
}

// Updating a task
async function updateTask(id, task) {
  const client = await connect();
  const sql =
    'UPDATE "Tasks" SET title = $1, "startDate" = $2, "endDate" = $3 WHERE id = $4';
  const values = [task.title, task.startDate, task.endDate, id];
  return client.query(sql, values);
}

// Delete a task
async function deleteTask(id) {
  const client = await connect();
  const sql = 'DELETE FROM "Tasks" WHERE id = $1';
  const values = [id];
  return client.query(sql, values);
}

module.exports = {
  insertUser,
  selectTasks,
  insertTask,
  updateTask,
  deleteTask,
};
