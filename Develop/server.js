// Necessary package installs: //
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
// const dataJson = require('db.json');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
// app.use('/api', api);


// Routes to the notes.html file. //
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});

// For some reason the code doesn't work when these lines are not commented out. //

// app.get('*', (req, res) => {
//   // res.sendFile(path.join(__dirname, './public/index.html'));
//   res.send('wrong route');
// });



// GET API routes that read the db.json file. //
app.get('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Could not read notes.' });
    }
    const notes = JSON.parse(data);
    return res.json(notes);
  });
});


// POST API routes that read the db.json file. //
app.post('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Could not read notes.' });
    }

// Parses the json file and creates a new unique note id each time a note is created. //
    const notes = JSON.parse(data);
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };

    notes.push(newNote);

    fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save the new note.' });
      }

      res.json(newNote);
    });
  });
});

// Event listener route at event path. //
app.post('/api/notes', (req, res) => {
  const eventData = req.body.eventData;
  // Handle the event data here

  res.status(200).json({ message: 'Event handled successfully.' });
});

// Starts the server. //
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
