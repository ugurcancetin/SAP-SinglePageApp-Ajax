var express     = require('express'),
    router      = express.Router(),
    Yer         = require("../models/yer");

// DB'de olan butun yerleri JSON olarak gonder
router.get('/', (req, res)=>{
    Yer.find()
    .then((yerlerDB)=>{
        res.json(yerlerDB);
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })
});

// DB'ye yeni yer eklemek icin kullanilan route
router.post('/', (req, res)=>{
    console.log(req.body);
    Yer.create(req.body)
    .then((yeniYer)=>{
        res.status(201).json(yeniYer);
    })
    .catch((err)=>{
        console.log('Hatamiz var sayin dinleyen');
        console.log(err);
        res.send(err);
    })
});

//Show Route - specific olarak detayli bilgi gosterilmek istendiginde kullanilir
router.get('/:yerID', (req, res)=>{
    Yer.findById(req.params.yerID)
    .then((bulunanYer)=>{
        res.json(bulunanYer);
    })
    .catch((err)=>{
        console.log('Hatamiz var sayin dinleyen');
        console.log(err);
        res.send(err);
    });
});

//Bi data update etmek istedigimizde kullanilir
router.put('/:yerId', (req, res)=>{
    Yer.findOneAndUpdate({_id:req.params.yerId}, req.body, {new: true})
    .then((yer)=>{
        res.json(yer);
    })
    .catch((err)=>{
        console.log('Hatamiz var sayin dinleyen');
        console.log(err);
        res.send(err);
    })
});

//Silmek istedigimizde kullanacagimiz Route
router.delete('/:yerId', (req, res)=>{
    Yer.remove({_id:req.params.yerId})
    .then(()=>{
        res.json({mesaj:'Hadi bakalim sildik'})
    })
    .catch((err)=>{
        console.log('Hatamiz var sayin dinleyen');
        console.log(err);
        res.send(err);
    })
});

module.exports = router;