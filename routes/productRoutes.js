const express = require('express');
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router();
const {prisma} = require("../db/config");
router.use(authMiddleware);

router.post("/create", async(req, res) => {
    const {name, stock, price} = req.body;
    if (!name || !stock || !price) {
        return res.status(400).send({error: "All fields required"});
    }
    const product = await prisma.product.create({
        data: {name, stock, price}
    })
    return res.status(201).send({product});
})

router.get("/get", async(req, res) => {
    const allp = await prisma.product.findMany();
    return res.status(200).send(allp);
})

router.get("/getById/:id", async(req, res) => {
    const {id} = req.params;
    const product = await prisma.product.findUnique({
        where : {id: Number(id)}
    })
    return res.status(200).send(product)
})

router.put("/put/:id", async(req, res) => {
    const {id} = req.params;
    const {name, stock , price} = req.body;
    if (!name && !price && stock) {
        const product = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {stock}
        })
        return res.status(200).send(product);
    }
    if (name && stock && price) {
        const product1 = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {name, stock, price}
        })
        return res.status(200).send(product1);
    }
})

router.delete("/delete/:id" , async(req, res) => {
    const { id} = req.params;
    await prisma.product.delete({
        where: {
            id: Number(id)
        }
    })
    return res.status(200).send({message:"Product is deleted"})
})

module.exports = router;
