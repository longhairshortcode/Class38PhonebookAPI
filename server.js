// all the const/requirement codes 
const express = require('express');
const app = express();
const PORT = 7070
const morgan = require('morgan');




// Define a custom token to log request body data
morgan.token('postData', (req) => {
  // Check if it's a POST request and if there's a request body
  if (req.method === 'POST' && req.body) {
    // Use JSON.stringify to convert the request body to a string
    return JSON.stringify(req.body);
  } else {
    return '-';
  }
});




//all the app.use codes
app.use(express.json());

app.use(morgan('tiny'));
pp.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));a



//my persons object that the API will get data from/ routes will get info from
let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      },
      {
      "id": 5,
      "name": "Mary Poppendieck Jr.", 
      "number": "39-23-6423123"
    }

    ]

  

// GET route for /info
app.get('/info', (req, res) => {
  const currentTime = new Date().toString();
  const entryCount = persons.length;

  // Create an HTML response
  const htmlResponse = `
    <html>
      <head>
        <title>Info Page</title>
      </head>
      <body>
        <h1>Info Page</h1>
        <p>Request received at: ${currentTime}</p>
        <p>Number of entries in the phonebook: ${entryCount}</p>
      </body>
    </html>
  `;

  res.send(htmlResponse);
});




//get all persons API
app.get('/api/persons', (req, res) => {
    res.json(persons)
})



// Get individual person info from API
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
} else {
    res.status(404).json({ error: 'Entry not found' });
}
})





//add a new person into the api via POST

//first generate an ID:
const generateId = () => {
const maxId = persons.length > 0
? Math.max(...persons.map(person => person.id))
: 0
return maxId + 1
}
// post request code
app.post('/api/persons', (req, res) => {  
  const body = req.body

// check if name or number is missing , then error
if (!body.name || !body.number){
  return res.status(400).json({
    error: 'Name or number is missing'
  })
}

//check if the name already exists
if (persons.find((person) => person.name === body.name)) {
  return res.status(400).json({
    error: "Name must be unique",
  });
}

// the creation of a new person object with ID, name, & number based on the request data
  const person = { 
    id: generateId(),
    name: body.name,
    number: body.number
  }

  // the actual adding of the new info in the persons array
  persons = persons.concat(person)

  res.json(person)
})



//delete an individual person info
app.delete('/api/persons/:id', (req, res) => {
const id = Number(req.params.id)
persons = persons.filter(person => person.id !== id)
response.status(204).end()
})


//app.listen 
app.listen(PORT, () =>{
    console.log(`The server is running on ${PORT}`)
})