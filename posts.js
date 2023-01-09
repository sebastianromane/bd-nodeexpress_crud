const pool = require("./helpers/connectionDb").getInstance()

const getDate = async () => {
const result = await pool.query("SELECT NOW()")
console.log(result)
}
getDate()

const addLikes = async (payload) => {
    const SQLquery = {
      text: 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [
        payload.titulo,
        payload.url,
        payload.descripcion,
        payload.likes,
        ]
    }
    try {
      const result = await pool.query(SQLquery)
      return result.rows
    } catch (e) {
      throw new Error(e)
    }
  }

  const getLikes = async () => {
    try {
        const {rows} = await pool.query("SELECT * FROM posts")
        console.log(rows)
        return rows
    } catch (e) {
        console.log(e)
        console.log('error al cargar los datos de la tabla posts: ', e.code, e.message)
        throw new Error(e)
    }}

    const duplicatePost = async (payload) => {
        const SQLquery = {
          text: 'SELECT COUNT(*) as NUM FROM posts WHERE titulo=$1 AND img=$2 AND descripcion=$3',
          values: [payload.titulo, payload.url, payload.descripcion],
        }
        const { rows } = await pool.query(SQLquery)
        return rows
      }

    const setLike = async (id) => {
      try {
        const consulta =
          "UPDATE posts SET likes = CASE WHEN likes IS NULL THEN 1 ELSE likes +1 END WHERE id=$1 RETURNING *";
        const values = [id];
        const result = await pool.query(consulta, values);
      } catch (e) {
        console.log("error");
      }
    };

  const deletePost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1"
  const values = [id]
  const result = await pool.query(consulta, values)
   }
     
      module.exports = { addLikes, getLikes, duplicatePost, setLike, deletePost }