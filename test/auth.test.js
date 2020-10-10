// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Get App
const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);

// User Login
describe('POST /auth', () => {
	test('Logging User', async (done) => {
		const response = await request
			.post('/api/auth/')
			.send({ name: 'Jonathan Medina', email: 'Jonathan@gmail.com' })
			.set('Accept', 'application/json');
		expect(response.status).toBe(200);
		done();
	});
});
