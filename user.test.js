const request = require('supertest');
const app = require('./app'); 

  describe('Testing user register', () => {
    it('should register a new user', async () => {
      const res = await request(app).post('/register').send({ username: 'username', email: "email", password: 'password' });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'User registerd successfully');
    });

    it('should not register an existing user', async () => {
      await request(app).post('/register').send({ username: 'testuser', email: "email", password: 'password' });

      const res = await request(app).post('/register').send({ username: 'username', email: "email", password: 'password' });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User already exists');
    });
  });

  describe('Testing User login', () => {
    it('should login an existing user', async () => {
      const res = await request(app).post('/login').send({ email: "email", password: 'password' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should not login with invalid credentials', async () => {
      const res = await request(app).post('/login').send({ email: "email", password: 'password' });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Invalid Credentials');
    });
  });
  
  describe('Testing User Profile', () => {
    it('fetch users Profile', async () => {
      const res = await request(app).get('/profile')
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username');
      expect(res.body).toHaveProperty('email');
    });

    it('login on Single Device', async () => {
      const res = await request(app).get('/profile')
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'You have been Logged out');
    });
  });