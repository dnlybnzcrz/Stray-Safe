const uploadImage = async (req, res) => {
  const database = req.database;  // Ensure database connection is promise-based
  const { author } = req.body;

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileBuffer = req.file.buffer;

  try {
    database.query(`
      INSERT INTO images (author, name, image_data)
      VALUES (?, ?, ?)`, [author, req.file.originalname, fileBuffer],
    (error, result) => {
      if (error) {
        console.error('Error uploading the image', error);
        res.status(401).send('Image upload failed');
      } else {
        res.send({
          message: 'Image uploaded successfully',
          imageId: result.insertId,
        });
      }
    });
  } catch (error) {
    console.error('Image Upload Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getImage = async (req, res) => {
  const database = req.database;
  const { imageId } = req.body;

  console.log('Request body:', req.body);

  if (!imageId) {
    return res.status(400).send('No image ID provided.');
  }

  try {
    database.query(`SELECT image_data FROM images WHERE image_id = ?`, [imageId], (error, result) => {
      if (error) { 
        res.status(401).send('Image upload failed');
      } else {
        console.log(result);
        if (result.length > 0) {
          const base64Image = result[0].image_data.toString('base64');
          res.send({
            message: 'Image retrieved successfully',
            image: base64Image
          });
        } else {
          res.status(404).send('Image not found');
        }
      }
    });
  } catch (error) {
    console.error('Image Retrieval Error:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  uploadImage,
  getImage
} 