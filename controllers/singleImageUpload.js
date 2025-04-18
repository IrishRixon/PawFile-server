const cloudinary = require('../utils/cloudinary');
const PetIFormModel = require('../models/petInitialForm');

const singleImageUpload = async (req, res) => {

    try {
        const { _id } = req.body;
        console.log(req.body);
        const fileBuffer = req.file.buffer.toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${fileBuffer}`;
    
        const result = await cloudinary.uploader.upload(dataURI, {
            public_id: _id,
            folder: 'Pet_Profile_Picture',
            overwrite: true,
            transformation: {
                width: 200,
                height: 200,
                gravity: 'auto', 
                crop: 'fill'
            }
        });

        const profilePic = `v${result.version}/${result.public_id}`

        const petIForm = await PetIFormModel.findOneAndUpdate({ _id }, { profilePic });

        res.status(200).json({ res: {
            isSuccess: true,
            message: 'Image uploaded successfully',
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