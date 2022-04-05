const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

let firstProduct;

it('POST /api/products', async () => {
  const response = await request(app)
    .post('/api/products')
    .send(newProduct);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
})

it('should return 500 on POST /api/products', async () => {
  const response = await request(app)
    .post('/api/products')
    .send({name: "phone"});
  expect(response.statusCode).toBe(500);
  // console.log('response body', response.body);
  expect(response.body).toStrictEqual({
    "message": "Product validation failed: description: Path `description` is required."
    }
  );
})

it('GET /api/products', async () => {
  const response = await request(app).get('/api/products')

  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();

  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();

  firstProduct = response.body[0];
})

it('GET /api/product/:productId', async () => {
  const response = await request(app).get('/api/products/' + firstProduct._id);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
})

it("GET id does not exists /api/product/:productId", async () => {
  const response = await request(app).get('/api/products/624a056b79aa89e8f87ae4f3')
  expect(response.statusCode).toBe(404);
})

it('PUT /api/product/:productId', async () => {
  const response = await request(app).put('/api/products/' + firstProduct._id).send({
    name: "updated name",
    description: "updated description"
  });
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe('updated name');
  expect(response.body.description).toBe('updated description');

})

it('PUT id does not exist /api/product/:productId', async () => {
  const response = await request(app).put('/api/products/624a056b79aa89e8f87ae4f3').send({
    name: "updated name",
    description: "updated description"
  });
  expect(response.statusCode).toBe(404);
});