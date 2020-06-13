const express = require('express');
const router = express.Router();

/* load dashboard page. */
router.get('/', function (req, res, next) {
  res.render('admin/dashboard', { title: 'Dashboard', tab: 'dashboard' });
});

module.exports = router;
