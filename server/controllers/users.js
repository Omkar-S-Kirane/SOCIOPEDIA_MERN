import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // Get the user's friends by their IDs
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Format the friend data to include specific fields
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      // If friendId is already in the user's friends list, remove it
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // If friendId is not in the user's friends list, add it
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    // Save the updated user and friend documents
    await user.save();
    await friend.save();

    // Get the updated list of friends for the user
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Format the friend data to include specific fields
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};
