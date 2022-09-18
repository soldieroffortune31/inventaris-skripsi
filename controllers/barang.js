const {barang, detail_barang} = require("../models");

module.exports = {
    
    renderbarang : async (req, res) => {
        const user = req.user.dataValues;
        await barang.findAll({where : {deleted : false}, order : [['id_barang', 'ASC']]})
        .then(dataBarang => {
            res.status(200).render('databarang', {dataBarang, user});
        })
    },

    renderinputbarang : async (req, res) => {
        const user = req.user.dataValues;
        res.status(200).render('inputbarang', {user});
    },

    // // sini 
    renderupdate : async (req, res) => {
        const id = req.params.id;
        const user = req.user.dataValues;
        await barang.findOne({where : {id_barang : id}})
        .then(dataBarang => {
            res.status(200).render('updatebarang', {dataBarang, user});
        })
    },

    // renderpreview : async (req, res) =>{
    //     const id = Number(req.params.id);
    //     console.log("ini ID nya", id);
    //     await barang.findOne({where : {id : id}})
    //     .then(dataBarang => {
    //         res.status(200).render('previewbarang', {dataBarang})
    //     })
    // },

    create : async (req, res) => {
        const jumlah = req.body.jumlah;
        // if(Number(jumlah) === 0){
        //     return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Silahkan Masukkan Jumlah Barang');window.location.href='/barang/inputbarang';</script>");
        // }

        var current = new Date();
        var newID = current.getTime().toString();
        const id_barang = newID;
        let harga = req.body.harga;
        var convertHarga = Number(harga.replace(/\D/g, ''));
        if(req.body.kode_barang === "" || req.body.nama_barang === "" || req.body.merk === "" || req.body.jumlah === "" || convertHarga === 0 || req.body.tahun === "" || req.body.sumber_dana === ""){
            return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Silahkan Masukkan Data Dengan Benar');window.location.href='/barang/inputbarang';</script>");    
        }
        const found = await barang.findOne({where : {id_barang : id_barang}});
        if(found){
            return res.status(400).json({message : 'Kode Barang telah digunakan'});
        }else{
            await barang.create({
                id_barang : id_barang,
                kode_barang : req.body.kode_barang,
                nama_barang : req.body.nama_barang,
                merk : req.body.merk,
                tipe : req.body.tipe,
                jumlah : req.body.jumlah,
                harga : convertHarga,
                tahun : req.body.tahun,
                sumber_dana : req.body.sumber_dana,
                keterangan : req.body.keterangan,
                deleted : false
            }).then(result => {
                return res.status(200).send("<script language='javascript' type='text/javascript'>alert('Barang Berhasil Disimpan');window.location.href='/barang';</script>");
            })
        }
    },

    update : (req, res) => {
        const id = req.params.id;
        let harga = req.body.harga;
        var convertHarga = Number(harga.replace(/\D/g, ''));
        if(req.body.kode_barang === "" || req.body.nama_barang === "" || req.body.merk === "" || req.body.jumlah === "" || convertHarga === 0 || req.body.tahun === "" || req.body.sumber_dana === ""){
            return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Silahkan Masukkan Data Dengan Benar');window.location.href='/barang';</script>");    
        }
        detail_barang.count({where : {id_barang : id}})
        .then(jumlahBarang => {
            if(Number(req.body.jumlah) < jumlahBarang){
                return res.status(400).send("<script language='javascript' type='text/javascript'>alert('Jumlah Barang Kurang Dari Jumlah Seluruh Barang Yang Ada Di Ruangan');window.location.href='/barang';</script>");
            }
            const found = barang.findOne({where : {id_barang : id}});
            if(found){
                barang.update({
                    kode_barang : req.body.kode_barang,
                    nama_barang : req.body.nama_barang,
                    merk : req.body.merk,
                    tipe : req.body.tipe,
                    jumlah : req.body.jumlah,
                    harga : convertHarga,
                    tahun : req.body.tahun,
                    sumber_dana : req.body.sumber_dana,
                    foto : req.body.foto,
                    keterangan : req.body.keterangan
                }, {where : {id_barang : id}})
                .then(result => {
                    res.status(200).send("<script language='javascript' type='text/javascript'>alert('Update Berhasil');window.location.href='/barang';</script>");
                })
            }
        })
        
    },

    deleteByUpdate : async (req, res) => {
        const id = req.params.id;
        const found = await barang.findOne({where : {id_barang :id}});
        if(found){
            await barang.update({
                deleted : true
            }, {where : {id_barang : id}})
            .then(result => {
                res.status(200).send("<script language='javascript' type='text/javascript'>alert('Data Barang Berhasil Dihapus');window.location.href='/barang';</script>");
            })
        }
    }

}