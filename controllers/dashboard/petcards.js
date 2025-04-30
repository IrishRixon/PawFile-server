const PetIFormModel = require('../../models/petInitialForm');

const getPetsCard = async (req, res) => {
    try {
        const { email: owner } = req.user;
        const petsCard = [];
        
        const pets = await PetIFormModel.find({ owner });

        pets.forEach(pet => {
            const { name, profilePic, _id } = pet;
            petsCard.push({ name, profilePic, _id });
        });

        console.log(petsCard, 'cards');
        res.status(200).json({ petsCard });
    }
    catch(err) {
        res.status(400).send(err)
    }
}

module.exports = {
    getPetsCard,
};