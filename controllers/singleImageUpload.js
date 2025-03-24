const cloudinary = require('../utils/cloudinary');

const singleImageUpload = async (req, res) => {

    try {
        const fileBuffer = req.file.buffer.toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${fileBuffer}`;
    
        const result = await cloudinary.uploader.upload(dataURI);
        res.status(200).json({ res: {
            isSuccess: true,
            message: result
        }})
    }
    catch(err) {
        res.status().json({ res: {
            isSuccess: false,
            message: err
        }})
    }
}

module.exports = { 
    singleImageUpload
}