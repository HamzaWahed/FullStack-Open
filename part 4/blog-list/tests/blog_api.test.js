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

test("correct number of blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("verify id field", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Abstract Algebra",
    author: "Micheal Artin",
    url: "",
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

test("verify undefined likes field", async () => {
  const newBlog = {
    title: "Abstract Algebra",
    author: "Micheal Artin",
    url: "",
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

afterAll(async () => {
  await mongoose.connection.close();
});
