import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE FUNCTION */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);

    // Create a new post with the provided data
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    // Save the new post to the database
    await newPost.save();

    // Retrieve all posts
    const posts = await Post.find();

    // Send the updated list of posts as the response
    res.status(201).json(posts);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/* READ FUNCTION */
export const getFeedPosts = async (req, res) => {
  try {
    // Retrieve all posts
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    // Retrieve posts for a specific user
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* UPDATE FUNCTION */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      // If the user has already liked the post, remove the like
      post.likes.delete(userId);
    } else {
      // If the user has not liked the post, add the like
      post.likes.set(userId, true);
    }

    // Update the post with the modified like data
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Send the updated post as the response
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
