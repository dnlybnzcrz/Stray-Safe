const createPost = async (req, res) => {
  const database = req.database;
  const { user_id, type, content, location, image_ids } = req.body;

  if (!user_id || !type || !content) {
    return res.status(400).json({ error: 'Missing fields found' });
  }

  try {
    database.query(`
      INSERT INTO posts (post_type, author_id, content, location)
      VALUES (?, ?, ?, ?)`, [type, user_id, content, location],
      (error, result) => {
        if (error) res.status(401).json({ error: 'Post creation failed' });

        const postId = result.insertId;

        // Insert image references
        if (image_ids.length === 0) {
          return res.status(200).json({ message: 'Post created successfully' });
        }

        const imageReferences = Promise.all(image_ids.map(async (imageId) => {
          return new Promise((resolve, reject) => {
            database.query(`
            INSERT INTO post_images (post_id, image_id)
            VALUES (?, ?)`, [postId, imageId],
              (error, result) => {
                if (error) reject(error);
                resolve(result.insertId);
              });
          });
        }));

        imageReferences.then(() => {
          res.status(200).json({ message: 'Post created successfully with images' });
        }).catch((error) => {
          res.status(500).json({ error: 'Failed to insert image references' });
        });
      });
  } catch (error) {
    res.status(500).send('Post Creation Error');
  }
}

const getPosts = async (req, res) => {
  const database = req.database;
  const { type } = req.body;

  try {
    database.query(`
      SELECT
        posts.post_id AS post_id,
        posts.content,
        posts.location,
        posts.created_at,
        users.username,
        images.image_id
      FROM
        posts
      LEFT JOIN
        users ON posts.author_id = users.user_id
      LEFT JOIN
        post_images ON posts.post_id = post_images.post_id
      LEFT JOIN
        images ON post_images.image_id = images.image_id
      WHERE
        posts.post_type = ?
      ORDER BY
        posts.created_at DESC
      LIMIT 10;`, [type], (error, result) => {
        if (error) {
          console.error('Failed to fetch posts:', error);
          return res.status(401).json({ error: 'Failed to fetch posts' });
        } else if (result.length === 0) {
          return res.status(200).json({ message: 'No posts found' });
        }

        const posts = result.reduce((acc, row) => {
          let post = acc.find(post => post.post_id === row.post_id);
          
          if (!post) {
            post = {
              post_id: row.post_id,
              content: row.content,
              location: row.location,
              created_at: row.created_at,
              username: row.username,
              images: []
            };
            acc.push(post);
          }

          if (row.image_id !== null) {
            post.images.push(row.image_id);
          }

          return acc;
        }, []);

        return res.status(200).json({ posts });
      });
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createPost,
  getPosts
}