import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@riponbabu/medium-common';

// Create the main Hono app
const blogRoute = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
  Variables:{
    userId: string,
  }
}>();

blogRoute.use('/*', async (c, next) => {
  const jwt = c.req.header('Authorization');
  if(!jwt){
    c.status(403);
    return c.json({
      msg: 'please login or sign up'
    })
  }
  const userDetails = await verify(jwt, c.env.JWT_SECRET);
  c.set('userId',userDetails.id);
  await next()
})

blogRoute.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
	if(!success){
		c.status(400)
		return c.json({
			msg: 'please fill correct input data.'
		})
	}
	try{
    const post = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId
      }
    });
    c.status(200);
    return c.json({
      msg: 'blog created successfully.',
      id: post.id
    });
  }
  catch(err){
    c.status(411);
    return c.json({
      msg: 'something wrong to create the blog.'
    })
  }
})

blogRoute.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
	if(!success){
		c.status(400)
		return c.json({
			msg: 'please check your input data.'
		})
	}
	try{
    await prisma.blog.update({
      where: {
        id: body.id,
        authorId: userId
      },
      data: {
        title: body.title,
        content: body.content
      }
    });
    c.status(200);
    return c.json({
      msg: 'blog updated'
    })
  }
  catch(err){
    c.status(411);
    return c.json({
      msg: 'something wrong to update the blog'
    })
  }
});

blogRoute.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	try{
    const blogs = await prisma.blog.findMany();
    c.status(200);
    return c.json({
      blogs
    })
  }
  catch(err){
    c.status(400);
    return c.json({
      msg: "something wrong to fetch the blogs"
    })
  }
})

blogRoute.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
  try{
    const blog = await prisma.blog.findUnique({
      where: {
        id
      }
    });
    c.status(200);
    return c.json({
      blog
    })
  }
  catch(err){
    c.status(411);
    return c.json({
      msg: 'something wrong to fetch the blog'
    })
  }
})

export default blogRoute;