const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  });

  if (!body.title || !body.url) {
    response.status(400).json(blog);
  } else {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  }
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  };

  if (!blog.title || !blog.url) {
    response.status(400).json(blog);
  } else {
    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.status(201).json(updatedNote);
  }
});

module.exports = blogRouter;
