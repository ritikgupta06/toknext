import User from "../models/User";

export async function getRecommandedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { ne: currentUserId } },
        { $id: { nin: currentUser.friends } },
        { isOnboarded: true },
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("error in recommandedUser controller", error.message);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getMyFriends(req, res) {}
