const express = require("express");
const router = express.Router();

const Blog = require("../data/db");

router.post("/", async (req, res) => {
  const postInfo = { ...req.body };
  try {
    const postSuc = await Blog.insert(postInfo);
    if (postInfo.title || postInfo.contents) {
      res.status(201).json({
        message: "Post Created",
        postSuc
      });
    } else {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the post to the database",
      error: err
    });
  }
});

router.post("/:id/comments", async (req, res) => {
  const commentInfo = { ...req.body, post_id: req.params.id };
  try {
    const comment = await Blog.insertComment(commentInfo);
    if (!comment.id) {
      res
        .status(404)
        .json({ message: `The post with ID ${id} could not be found` });
    } else if (!commentInfo.text) {
      res
        .status(400)
        .json({ errorMessage: "Please provide text for the comment." });
    } else {
      res.status(201).json({ message: "comment created", comment });
    }
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the comment to the database",
      errorMes: err
    });
  }
});

router.get("/", async (req, res) => {
  try {
    allPosts = await Blog.find();
    res.status(200).json({ allPosts });
  } catch {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

router.get("/:id", async (req, res) => {
  const postReq = req.params.id;
  try {
    const onePost = await Blog.findById(postReq).first();
    if (onePost) {
      res.status(200).json({ message: "post found", onePost });
    } else {
      res
        .status(404)
        .json({ message: `The post with ID ${id} could not be found` });
    }
  } catch (err) {
    res.status(500).json({
      error: "The post with the specified ID does not exist.",
      errorMes: err
    });
  }
});

router.get("/:id/comments", async (req, res) => {
  const commentInfo = req.params.id;
  try {
    const comment = await Blog.findCommentById(commentInfo);
    if (comment) {
      res.status(201).json({ message: "comment found", comment });
    } else {
      res
        .status(404)
        .json({ message: `The post with ID ${id} could not be found` });
    }
  } catch (err) {
    res.status(500).json({
      error: "There was an error while finding the comment in the database",
      errorMes: err
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteId = await Blog.remove(id);
    if (deleteId) {
      res.status(200).json({ message: "The item was deleted" });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (err) {
    res.status(500).json({ error: "The post could not be removed" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newDataB = { ...req.body };
  try {
    const newData = await Blog.update(id, newDataB);
    if (newData) {
      res.status(202).json({ newData });
    } else if (!updatedData.title || !updatedData.contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

module.exports = router;
