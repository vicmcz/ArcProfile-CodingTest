const router = require('express').Router();

router.use('/data', (req, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

router.use('/test', (req, res) => res.json({ message: 'Hello World!' }));

module.exports = router;
