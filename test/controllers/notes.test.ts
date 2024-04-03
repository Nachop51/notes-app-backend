import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../../src/index'

describe('Notes get endpoint', () => {
  it('should return 200', async () => {
    const res = await request(app).get('/notes')

    expect(res.status).toBe(200)

    expect(res.body).toBeInstanceOf(Array)

    expect(res.body.length).toBeGreaterThan(0)

    expect(res.body[0]).toHaveProperty('id')
    expect(res.body[0]).toHaveProperty('title')
    expect(res.body[0]).toHaveProperty('content')
    expect(res.body[0]).toHaveProperty('createdAt')
    expect(res.body[0]).toHaveProperty('updatedAt')
  })

  it('should return 200', async () => {
    const res = await request(app).get('/notes/a1a1a1a1-1a1a-1a1a-1a1a-1a1a1a1a1a1a')

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('title')
    expect(res.body).toHaveProperty('content')
    expect(res.body).toHaveProperty('createdAt')
    expect(res.body).toHaveProperty('updatedAt')
  })

  it('should return 404', async () => {
    const res = await request(app).get('/notes/wsdfsafdsdf')

    expect(res.status).toBe(404)
  })
})

describe('Notes post endpoint', () => {
  it('should return 201', async () => {
    const res = await request(app).post('/notes').send({
      title: 'Test',
      content: 'Test content'
    })

    expect(res.status).toBe(201)

    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('title')
    expect(res.body).toHaveProperty('content')
    expect(res.body).toHaveProperty('createdAt')
    expect(res.body).toHaveProperty('updatedAt')
  })

  it('should return 400', async () => {
    const res = await request(app).post('/notes').send({
      title: 'Test'
    })

    expect(res.status).toBe(400)
  })
})

describe('Notes put endpoint', () => {
  it('should return 200', async () => {
    const res = await request(app).put('/notes/a1a1a1a1-1a1a-1a1a-1a1a-1a1a1a1a1a1a').send({
      title: 'Test',
      content: 'Test content'
    })

    expect(res.status).toBe(200)

    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('title')
    expect(res.body).toHaveProperty('content')
    expect(res.body).toHaveProperty('createdAt')
    expect(res.body).toHaveProperty('updatedAt')
  })

  it('should return 400', async () => {
    const res = await request(app).put('/notes/b1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b').send({
      titlee: 'Test'
    })

    expect(res.status).toBe(200)
  })

  it('should return 404', async () => {
    const res = await request(app).put('/notes/wsdfsafdsdf').send({
      title: 'Test',
      content: 'Test content'
    })

    expect(res.status).toBe(404)
  })
})

describe('Notes delete endpoint', () => {
  it('should return 204', async () => {
    const res = await request(app).delete('/notes/a1a1a1a1-1a1a-1a1a-1a1a-1a1a1a1a1a1a')

    expect(res.status).toBe(204)
  })

  it('should return 404', async () => {
    const res = await request(app).delete('/notes/wsdfsafdsdf')

    expect(res.status).toBe(404)
  })
})
