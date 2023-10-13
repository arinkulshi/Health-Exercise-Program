import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { dataSource } from "../index";

const router = Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await dataSource.getRepository(User).findOne({ where: { username } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, '1234', { expiresIn: '5h' });

    res.json({ token });
});

module.exports = router;
