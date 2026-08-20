import pool from "./db.js";

async function getUserById(id) {
	const query = 'SELECT * FROM users WHERE id = $1';
	const { rows } = await pool.query(query, [id]);
	return rows[0];
}

async function getUserByUsername(username) {
	const query = 'SELECT * FROM users WHERE username = $1';
	const values = [username];
	const result = await pool.query(query, values);
	if (result.rows.length > 0) {
		return result.rows[0];
	} else {
		return null;
	}
}

async function createUser(firstName, lastName, username, password) {
	const query = 'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)';
	const values = [firstName, lastName, username, password];
	await pool.query(query, values);
}

async function InsertPost(title, content, user_id) {
	const query = 'INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3) RETURNING *';
	const values = [title, content, user_id];
	const result = await pool.query(query, values);
	return result.rows[0];
}

async function getAllPosts() {
	const query = 'SELECT messages.id, first_name, last_name, title, text, created_at FROM users JOIN messages ON users.id = messages.user_id ORDER BY created_at DESC';
	const result = await pool.query(query);
	return result.rows;
}

async function getPostById(id) {
	const query = 'SELECT * FROM messages WHERE id = $1';
	const values = [id];
	const result = await pool.query(query, values);
	if (result.rows.length > 0) {
		return result.rows[0];
	} else {
		return null;
	}
}

async function deletePostById(id) {
	const query = 'DELETE FROM messages WHERE id = $1';
	const values = [id];
	await pool.query(query, values);
}

async function updatePostById(id, title, content) {
	const query = 'UPDATE messages SET title = $1, content = $2 WHERE id = $3 RETURNING *';
	const values = [title, content, id];
	const result = await pool.query(query, values);
	return result.rows[0];
}

async function becomeMember(id) {
	const query = 'UPDATE users SET is_member = true WHERE id=$1';
	await pool.query(query, [id]);
}

async function becomeAdmin(id) {
	const query = 'UPDATE users SET is_admin = true WHERE id=$1';
	await pool.query(query, [id]);
}

export { becomeAdmin, becomeMember, getUserById, getUserByUsername, createUser, InsertPost, getAllPosts, getPostById, deletePostById, updatePostById };
