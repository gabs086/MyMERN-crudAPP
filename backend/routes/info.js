const router = require('express').Router();
let Info = require('../models/info.model');

//HTTp get request of all data in the database
router.route('/').get((req, res) => {
    Info.find()
        .then(infos => res.json(infos))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

//Http get request of data by ID
router.route('/:id').get((req, res) => {
    Info.findById(req.params.id)
        .then(infos => res.json(infos))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

//Http post request of inputting data
router.route('/add').post((req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const suffixes = req.body.suffixes;
    const age = Number(req.body.age);

    const newInfo = new Info({
        fName,
        lName,
        suffixes,
        age
    });
    newInfo.save()
        .then(_ => res.json('Info added'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

//HTTP update request of what is already in the database
router.route('/update/:id').post((req, res) => {
    Info.findById(req.params.id)
        .then(infos => {
            infos.fName = req.body.fName;
            infos.lName = req.body.lName;
            infos.suffixes = req.body.suffixes;
            infos.date = Date.parse(req.body.date);

            infos.save()
                .then(_ => res.json('Info Updates'))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});

//HTTP Delete Request that will delete what is in the database
router.route('/delete/:id').delete((req, res) => {
    Info.findByIdAndDelete(req.params.id)
        .then(_ => res.json('Info Deleted'))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

module.exports = router;