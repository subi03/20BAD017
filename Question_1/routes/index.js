const express = require ('express'),
      User    = require ('../model/user'),
      jwt     = require ('jsonwebtoken')

router = express.Router();

router.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save( (err) => {
    if (err) {
      res.status(500)
        .send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

router.post('/api/authenticate', (req, res) => {
  const {username, password} = req.body;
  // try{
  //   const foundUser = await User.findOne({username});
  //   foundUser
  // }catch(e){
  //   console.log(e);
  // }
  
})

router.get('/data', (req, res) => {
    const customers = [
      {id: 1, firstName: 'John', lastName: 'Doe'},
      {id: 2, firstName: 'Brad', lastName: 'Traversy'},
      {id: 3, firstName: 'Mary', lastName: 'Swanson'},
    ];
  
    res.json(customers);
  });


module.exports = router;