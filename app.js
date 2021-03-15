const express = require('express')

const { sequelize, Student } = require('./models')

const app = express()
app.use(express.json())

//CREATE STUDENT
app.post('/students', async (req, res) => {
    const { name, email, birthdate, phonenumber } = req.body

    try {
        const student = await Student.create({ name, email, birthdate, phonenumber })
        return res.json(student)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

//READ STUDENT
app.get('/students', async (req, res) => {
    try {
        const students = await Student.findAll()
        return res.json(students)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'something went WRONG'})
    }
})

//FIND ONE STUDENT
app.get('/students/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
        const students = await Student.findOne({
            where: { uuid }
        })
        return res.json(students)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'something went WRONG' })
    }
})

//DELETE STUDENT
app.delete('/students/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
        const student = await Student.findOne({ where: { uuid } })
        await student.destroy()

        return res.json({ message: 'STUDENT DELETED' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'SOMTHING WENT WRONG' })
    }
})

//UPDATE STUDENT
app.put('/students/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { name, email, birthdate, phonenumber } = req.body
    
    try {
        const student = await Student.findOne({ where: { uuid } })

        student.name = name
        student.email = email
        student.birthdate = birthdate
        student.phonenumber = phonenumber

        await student.update()

        return res.json(student)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'SOMTHING went WRONG' })
    }
})

app.listen({ port: 5000 }, async () => {
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log('Database Connected')
})