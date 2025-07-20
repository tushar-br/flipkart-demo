const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = "1";

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.json({ message: "Registered successfully" })
    } catch (err) {
        res.status(400).json({ error: 'User already exists' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET,
        { expiresIn: '1h' })

    res.json({
        token,
        user: {
            name: user.name,
            role: user.role,
            userId: user._id
        }
    })
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        return res.status(404).json({error:"User not found"})
    }
    res.json(user)
})

module.exports = router;