const express = require('express')
const bcrypt = require('bcrypt')

const app = express()

app.use(express.json())

const users = [{
    name: "Rovita",
    password: "password"
}]
// setTimeout(() => console.log('setTimeout executed'), 0)

// setImmediate(() => console.log(`Immediate`))

// process.nextTick(() => console.log('nextTick'));

// console.log('Start')

// const promise1 = new Promise((resolve, reject) => {
//   console.log(1);
//   resolve('promise success')
// });

// promise1.then(() => {
//   console.log('promise started');
// });


app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users/login', async (req, res) => {
    const user = users.filter(user => user.name === req.body.name)[0]
    if (user == null) {
        res.status(400).send('cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)){
            console.log("111", user)
            res.status(201).send("Success")
        } else {
          console.log(user)
          res.status(400).send('Not allowed')
        }
    } catch (err) {
        res.status(500).send()
    }
})

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    } catch (err) {
        res.status(500).send()
    }
})


app.listen(3000)