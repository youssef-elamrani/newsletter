const express = require("express")
const request = require("request")
const bodyParser = require("body-parser")
const https = require("https")


const app = express()

const apiKey = "38097eca97e0f8fa639e25768aeb26d0-us12";
const listId = "6596cf0b7f"

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {

    const firstName = req.body.FirstName
    const lastName = req.body.LastName
    const email = req.body.Email
    //console.log(firstName,lastName,email)
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)
    // console.log(jsonData)

    const url = "https://us12.api.mailchimp.com/3.0/lists/6596cf0b7f"
    const options = {
        method: "POST",
        auth: "youssef:38097eca97e0f8fa639e25768aeb26d0-us1",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("date", function (data) {
            console.log(JSON.parse(data))

        })
    })
    request.write(jsonData)
    request.end()


})

app.post("/failure", (req, res) => {
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, () => {
    console.log("the server is running on port 3000")
})

//API KEY
//38097eca97e0f8fa639e25768aeb26d0-us12

//LIST ID
//6596cf0b7f