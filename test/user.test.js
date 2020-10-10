// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Get App
const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);

// Get Users
describe('GET /users', () => {
	test('Get status 200 and Find John', async (done) => {
		const response = await request.get('/api/users/');
		expect(response.status).toBe(200);
		expect(response.body[0].name).toBe('John Doe');
		done();
	});
});

// Create User
describe('POST /users', () => {
	test('Add user to database', async (done) => {
		// Delete Test user before
		const remove = await request.delete('/api/users/john@email.com');
		// Add it again
		const response = await request
			.post('/api/users/')
			.send({ name: 'john', email: 'john@email.com' })
			.set('Accept', 'application/json');
		expect(response.status).toBe(200);
		done();
	});
});
