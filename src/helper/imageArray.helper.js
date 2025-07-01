export const mapUploadedImages = async(files) => {
  return files.map(file => ({
    name: file.filename,
    url: `http://localhost:3000/uploads/products/${file.filename}`
  }));
};