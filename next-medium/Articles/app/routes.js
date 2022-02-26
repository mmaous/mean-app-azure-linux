const path = require('path');
const Person = require('./person');

routes = (app) => {
  app.get('/persons', async (req, res) => {
    try {
      const persons = await Person.find({});
      res.json(persons.map((p) => p.toJSON()));
    } catch (error) {
      console.error(error.message);
    }
  });

  app.post('/persons', async (req, res) => {
    const newPerson = new Person({
      name: req.body.name,
      phone: req.body.phone,
      street: req.body.street,
      city: req.body.city,
    });
    try {
      const savedPerson = await newPerson.save();
      res.json({
        message: 'Successfully added book',
        person: savedPerson.toJSON(),
      });
    } catch (error) {
      console.error(error.message);
    }
  });

  app.delete('/persons/:id', (req, res) => {
    Person.findOneAndRemove(req.query)
      .then((result) => {
        res.json({
          message: 'Successfully deleted the book',
          book: result,
        });
      })
      .catch((error) => console.error(error.message));
  });
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public', 'index.html'));
  });
};
module.exports = routes
