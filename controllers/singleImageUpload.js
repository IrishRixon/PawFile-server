const cloudinary = require('../utils/cloudinary');

const singleImageUpload = async (req, res) => {

    try {
        const { _id } = req.body;
        console.log(req.body);
        const fileBuffer = req.file.buffer.toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${fileBuffer}`;
    
        const result = await cloudinary.uploader.upload(dataURI, {
            public_id: _id,
            folder: 'Pet Profile Picture',
            overwrite: true,
            transformation: {
                width: 200,
                height: 200,
                gravity: 'auto',
                crop: 'fill'
            }
        });
        
        res.status(200).json({ res: {
            isSuccess: true,
            message: result
        }})
    }
    catch(err) {
        console.log(err);
        res.status(400).json({ res: {
            isSuccess: false,
            message: err
        }})
    }
}

module.exports = { 
    singleImageUpload
}