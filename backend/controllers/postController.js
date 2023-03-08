const Post = require('../models/PostModel');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
};

exports.getOnePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      text: req.body.text,
    });
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
  }
};

exports.updatePost = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body);
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        text: req.body.text,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(204).json({});
  } catch (err) {
    console.log(err);
  }
};
