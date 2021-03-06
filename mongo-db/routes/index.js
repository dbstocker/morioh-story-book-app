const express = require('express');

const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Story = require('../models/Story');

// @desc    Login/Landing page
// @route   GET /

router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

// @desc    Dashboard
// @route   GET /dashboard

router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = Story.find({ user: req.user.id }).lean();

    res.render('dashboard', {
      name: req.user.firstName,
      stories, // <-- will show table even if there are no stories yet
    });

    // console.log('number of stories', stories);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.render('error/500');
  }
});

module.exports = router;
