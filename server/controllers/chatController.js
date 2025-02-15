const router = require("express").Router();
const chat = require("../models/chat");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create-new-chat", authMiddleware, async (req, res) => {
  try {
    const newChat = new chat(req.body);
    const savedChat = await newChat.save();
    res.status(200).send({
      message: "chat saved successfully",
      success: true,
      data: savedChat,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.get("/get-all-chats", authMiddleware, async (req, res) => {
  try {
    const allChat = await chat
      .find({ members: { $in: req.body.userId } })
      .populate("members")
      .sort({ updatedAt: -1 });
    res.status(200).send({
      message: "chat fetched successfully",
      success: true,
      data: allChat,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
