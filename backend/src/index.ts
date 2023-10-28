import express, { Request, Response } from "express";
const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import mysql, { ResultSetHeader } from "mysql2/promise";

type User = {
  user_id?: number;
  user_name: string;
};

type Group = {
  group_id?: number;
  group_name: string;
  detail?: string;
};

type Todo = {
  todo_id?: number;
  group_id: number;
  name?: string;
  content?: string;
  deadline?: Date;
};

const db_setting = {
  host: "db",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

app.listen(3000, () => {
  console.log("Start on port 3000.");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World API!");
});

app.get("/groups/", async (req: Request, res: Response) => {
  let connection: mysql.Connection | undefined;
  try {
    const user_id = req.body.user_id;
    if (user_id === undefined) {
      throw new Error("user_id is unreadable");
    }

    connection = await mysql.createConnection(db_setting);
    const [rows, fields] = await connection.execute(
      "SELECT * FROM user_group WHERE user_id = ?",
      [user_id]
    );
    const rows_result = rows as unknown[] as {
      id: number;
      group_id: number;
      user_id: number;
    }[];

    res.json(rows_result.map((row) => row.group_id));
    res.statusCode = 200;
  } catch (err) {
    res.statusCode = 400;
    res.json({ message: err });
    console.log(err);
  } finally {
    connection?.end();
  }
});

app.get("/get_todo_group/", async (req: Request, res: Response) => {
  const body = req.body as { group_id: number };
  let connection: mysql.Connection | undefined;
  try {
    connection = await mysql.createConnection(db_setting);
    const [rows, fields] = await connection.execute(
      "SELECT * FROM todos WHERE group_id = ?",
      [body.group_id]
    );
    const rows_result = rows as unknown[] as {
      todo_id: number;
      group_id: number;
      name: string;
      content: string;
      deadline: Date;
    }[];

    res.json({ todos: rows_result.map((row) => row.todo_id) });
    res.statusCode = 200;
  } catch (err) {
    res.statusCode = 400;
    res.json({ message: err });
    console.log(err);
  } finally {
    connection?.end();
  }
});

app.get("/get_todo_local/", async (req: Request, res: Response) => {
  const body = req.body as { user_id: number };
  let connection: mysql.Connection | undefined;
  try {
    connection = await mysql.createConnection(db_setting);
    const [rows, fields] = await connection.execute(
      "SELECT * FROM user_todo WHERE user_id = ?",
      [body.user_id]
    );
    const rows_result = rows as unknown[] as {
      todo_id: number;
      user_id: number;
      status: boolean;
    }[];

    res.json({ todos: rows_result.map((row) => row.todo_id) });
    res.statusCode = 200;
  } catch (err) {
    connection?.rollback();
    res.statusCode = 400;
    res.json({ message: err });
    console.log(err);
  } finally {
    connection?.end();
  }
});
app.get("/todo_detail/", async (req: Request, res: Response) => {
  const body = req.body as { todo_id: number };
  let connection: mysql.Connection | undefined;
  try {
    connection = await mysql.createConnection(db_setting);
    const [rows, fields] = await connection.execute(
      "SELECT * FROM todos WHERE todo_id = ?",
      [body.todo_id]
    );
    const rows_result = rows as unknown[] as {
      todo_id: number;
      group_id: number;
      name: string;
      content: string;
      deadline: Date;
    }[];

    if (rows_result.length === 0) {
      throw new Error("todo_id is not exist");
    }
    res.json(rows_result[0]);
    res.statusCode = 200;
  } catch (err) {
    res.statusCode = 400;
    res.json({ message: err });
    console.log(err);
    connection?.rollback();
  } finally {
    connection?.end();
  }
});

app.post("/user_add/", async (req: Request, res: Response) => {
  let connection: mysql.Connection | undefined;
  const body = req.body as User;
  try {
    connection = await mysql.createConnection(db_setting);
    await connection.beginTransaction();
    const [rows, fields] = await connection.execute(
      "INSERT INTO users (user_name) VALUES (?)",
      [body.user_name]
    );
    res.json({
      user_id: (rows as ResultSetHeader).insertId,
    });
    res.statusCode = 200;
    await connection.commit();
  } catch (err) {
    await connection?.rollback();
    res.statusCode = 400;
    res.json({ message: err });
    console.log(err);
  } finally {
    connection?.end();
  }
});

app.post("/group_add/", async (req: Request, res: Response) => {
  const body = req.body as Group;
  let connection: mysql.Connection | undefined;
  try {
    connection = await mysql.createConnection(db_setting);
    await connection.beginTransaction();
    const [rows, fields] = await connection.execute(
      "INSERT INTO group_table (name, detail) VALUES (?, ?)",
      [body.group_name, body.detail ?? ""]
    );
    res.statusCode = 200;
    res.json({
      group_id: (rows as ResultSetHeader).insertId,
    });

    await connection.commit();
  } catch (err) {
    await connection?.rollback();
    res.statusCode = 400;
    res.json({ message: err });
    console.log(err);
  } finally {
    connection?.end();
  }
});

app.post("/join_group/", async (req: Request, res: Response) => {
  let connection: mysql.Connection | undefined;
  try {
    const body = req.body as { user_id: number; group_id: number };
    console.log(body);
    connection = await mysql.createConnection(db_setting);
    await connection.beginTransaction();
    await connection.execute(
      "INSERT INTO user_group (user_id, group_id) VALUES (?, ?)",
      [body.user_id, body.group_id]
    );
    await connection.commit();
    res.statusCode = 200;
    res.send("OK");
  } catch (err) {
    await connection?.rollback();
    res.statusCode = 400;
    res.json({ message: err });
    console.log(err);
  } finally {
    connection?.end();
  }
});

app.post("/todo_add/", async (req: Request, res: Response) => {
  let connection: mysql.Connection | undefined;
  try {
    const body = req.body as Todo;
    connection = await mysql.createConnection(db_setting);
    await connection.beginTransaction();
    await connection.execute(
      "INSERT INTO todos (group_id, name, content, deadline) VALUES (?, ?, ?, ?)",
      [body.group_id, body.name, body.content, body.deadline ?? null]
    );
    await connection.commit();
    res.statusCode = 200;
    res.send("OK");
  } catch (err) {
    await connection?.rollback();
    res.statusCode = 400;
    res.json({ message: err });
    console.log(err);
  } finally {
    connection?.end();
  }
});

app.post("/update_todo_global/", async (req: Request, res: Response) => {
  let connection: mysql.Connection | undefined;
  try {
    const body = req.body as Todo;
    console.log(body);
    connection = await mysql.createConnection(db_setting);
    await connection.beginTransaction();
    if (body.name != null) {
      await connection.execute("UPDATE todos SET name = ? WHERE todo_id = ?", [
        body.name,
        body.todo_id,
      ]);
    }
    if (body.content != null) {
      await connection.execute(
        "UPDATE todos SET content = ? WHERE todo_id = ?",
        [body.content, body.todo_id]
      );
    }
    if (body.deadline != null) {
      const deadline = new Date(body.deadline);
      await connection.execute(
        "UPDATE todos SET deadline = ? WHERE todo_id = ?",
        [deadline, body.todo_id]
      );
    }
    await connection.commit();
    res.statusCode = 200;
    res.send("OK");
  } catch (err) {
    await connection?.rollback();
    res.statusCode = 400;
    res.json({ message: err });
    console.log(err);
  } finally {
    connection?.end();
  }
});

app.post("/update_todo_local/", async (req: Request, res: Response) => {
  let connection: mysql.Connection | undefined;
  try {
    const body = req.body as {
      todo_id: string;
      user_id: string;
      status: boolean;
    };
    connection = await mysql.createConnection(db_setting);
    await connection.beginTransaction();

    await connection.execute(
      "UPDATE user_todo SET status = ? WHERE todo_id = ? AND user_id = ?",
      [body.status, body.todo_id, body.user_id]
    );
    await connection.commit();
    res.statusCode = 200;
    res.send("OK");
  } catch (err) {
    await connection?.rollback();
    res.statusCode = 400;
    res.json({ message: err });
    console.log(err);
  } finally {
    connection?.end();
  }
});
