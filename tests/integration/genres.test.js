const { genres } = require('../../models/genres');
const request = require('supertest');
let server;

describe('/api/genres', () => {
    beforeEach(() => server = require('../../app'));
    afterEach(async () => {
        server.close();
        await genres.remove({});
    });
    
    describe('GET /', async () => {
        it('should return all genres', async () => {
            await genres.collection.insertMany([
                { name: 'Genre1' },
                { name: 'Genre2' },
            ])

            const res = await request(server).get('/api/genres');
            // console.log(res);
            console.log(res.body);
            expect(res.status).toBe(200);
            // expect(res.body.length).toBe(2);
            // expect(res.body.some(g => g.name ==='Genre1')).toBeTruthy();
        })
    })
})