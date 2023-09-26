const router = require('express').Router();
const { Post, User, Comment } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {

    const postData = await Post.findAll({
      include: Comment, // Include associated comments

    });


    const posts = postData.map((post) => post.get({ plain: true }));
    const logged_in =  req.session.logged_in, username = req.session.username;

    res.render('homepage', {
      posts,logged_in,username

    });




  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {


    const userId = req.session.user_id;
    const user = await User.findByPk(userId);
    const postData = await Post.findAll({
      include: Comment,
      where: {
        username_fk: user.dataValues.username,
      },
    });


    const posts = postData.map((post) => post.get({ plain: true }));


    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });


  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/create-post', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const { title, post_content } = req.body;

    const user = await User.findByPk(userId); // Use findByPk to find a single user

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPost = await Post.create({
      title,
      post_content,
      username_fk: user.dataValues.username,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.post('/create-comment', withAuth, async (req, res) => {
  try {
    const { comments, post_id } = req.body;
    const userId = req.session.user_id;
    const user = await User.findByPk(userId); // Use findByPk to find a single user

    // Create the comment with the associated post_id
    const newComment = await Comment.create({
      comments,
      username_fk: user.dataValues.username,
      post_id // Associate the comment with the correct post
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;
