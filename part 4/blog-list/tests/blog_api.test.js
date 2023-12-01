const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("when there is initally some blogs saved", () => {
  test("correct number of blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("blog id field is defined instead of _id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("addition of a new blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Abstract Algebra",
      author: "Micheal Artin",
      url: "https://www.goodreads.com/en/book/show/1247754",
      likes: 20,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);
    const authors = response.body.map((r) => r.author);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain("Abstract Algebra");
    expect(authors).toContain("Micheal Artin");
  });

  test("blog without likes field is added", async () => {
    const newBlog = {
      title: "Abstract Algebra",
      author: "Micheal Artin",
      url: "https://www.goodreads.com/en/book/show/1247754",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(response.body[2].likes).toBeDefined();
    expect(response.body[2].likes).toBe(0);
  });

  test("blog without title field is added", async () => {
    const newBlog = {
      author: "Micheal Artin",
      url: "https://www.goodreads.com/en/book/show/1247754",
      likes: 20,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("blog without url field is added", async () => {
    const newBlog = {
      title: "Abstract Algebra",
      author: "Micheal Artin",
      likes: 20,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("deletion a blog", () => {
  test("a blog can be deleted", async () => {
    const blogsAtStart = (await Blog.find({})).map((blog) => blog.toJSON());
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = (await Blog.find({})).map((blog) => blog.toJSON());
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("updation of an existing blog", () => {
  test("a blog can be updated", async () => {
    const blogsAtStart = (await Blog.find({})).map((blog) => blog.toJSON());
    const blogToUpdate = blogsAtStart[0];

    const blog = {
      title: "Abstract Algebra",
      author: "Micheal Artin",
      url: "https://www.goodreads.com/en/book/show/1247754",
      likes: 20,
    };

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = (await Blog.find({})).map((blog) => blog.toJSON());
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);

    expect(updatedBlog.body.id).toBe(blogToUpdate.id);
  });

  test("likes field of a blog can be updated", async () => {
    const blogsAtStart = (await Blog.find({})).map((blog) => blog.toJSON());
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ ...blogToUpdate, likes: 5 })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = (await Blog.find({})).map((blog) => blog.toJSON());
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);

    expect(updatedBlog.body.likes).toBe(5);
    expect(updatedBlog.body.title).toBe(blogToUpdate.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
