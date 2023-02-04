const express = require('express')
const { Product } = require('../models/product')
const router = express.Router()
const cloudinary = require("../utils/cloudinary")
const {isAdmin} = require("../middleware/auth")
router.post("/",isAdmin,async(req,res)=>{
    const {name,brand,desc,price,/*image*/} = req.body
    try{
        // if(image){
        //     const uploadRes = await cloudinary.uploader.upload(image,{
        //         upload_preset:"onlineShop"
        //     })
            // if(uploadRes){
                const product = new Product({
                    name,
                    brand,
                    desc,
                    price,
                    // image:uploadRes
                })
                const savedProduct =await product.save()
                res.status(200).send(savedProduct)
            // }
        // }
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
})


router.get("/",async(req,res)=>{
    try{

        const products = await Product.find()
        res.status(200).send(products)
    }catch(error){
        res.status(500).send(error)

        console.error();}
})
router.get("/find/:id",async(req,res)=>{
    try{

        const product = await Product.findById(req.params.id)
        res.status(200).send(product)
    }catch(error){
        res.status(500).send(error)

        console.error();}
})

router.delete("/:id",isAdmin,async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).send("Product not found...");
        // if(product.image.public_id){
        //     const destroyResponse = await cloudinary.uploader.destroy(product.image.public_id)
        //     if(destroyResponse){
                const deletedProduct = await Product.findByIdAndDelete(req.params.id)
                res.status(200).send(deletedProduct)
        //     }
        // }
        // else{
        //     console.log("Action terminated. Failed to delete product image...")
        // }
    }
    catch(err){
        res.status(500).send(err)
    }
})
router.put("/:id",isAdmin,async(req,res)=>{
    // if(req.body.productImg){
        try{
    //     const destroyResponse = await cloudinary.uploader.destroy(req.body.product.image.publicId)
    
    // if(destroyResponse){
    //     const uploadResponse = await cloudinary.uploader.upload(
    //         req.body.productImg,
    //         {
    //             upload_preset:"onlineShop",
    //         }
    //     )
    //     if(uploadResponse){
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
              $set:{
                ...req.body.product,
                // image:uploadResponse,
              }, 
            },
            {new:true}
            )
            res.status(200).send(updatedProduct)
// }
//     }
// } 
    }
catch(err){
    res.status(500).send(err)
}
// else{
//     try{
//         const updatedProduct = await Product.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set:req.body.product,
//             },
//             {new:true}
//         );
//         res.status(200).send(updatedProduct)
//     }
//     catch(err){
//         res.status(500).send(err)
//     }
// }
})
module.exports = router