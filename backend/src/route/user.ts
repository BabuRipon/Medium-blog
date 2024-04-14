import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { signinInput, signupInput, userUpdateInput } from '@riponbabu/medium-common';
import { verify } from 'hono/jwt'

// Create the main Hono app
const userRoute = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
	Variables: {
		userId: string,
		email: string,
	}
}>();


userRoute.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = signupInput.safeParse(body);
	if(!success){
		c.status(400)
		return c.json({
			msg: 'please fill correct input data.'
		})
	}
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
				name: body.name
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})

userRoute.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = signinInput.safeParse(body);
	if(!success){
		c.status(400);
		return c.json({
			msg: 'please check your input.'
		})
	}
	try{
		const user = await prisma.user.findUnique({
			where: {
				email: body.email
			}
		});
	
		if (!user) {
			c.status(403);
			return c.json({ error: "user not found" });
		}
	
		const jwt = await sign({ id: user.id, email: user.email, name: user.name }, c.env.JWT_SECRET);
		return c.json({ jwt });
	}
	catch(err){
		c.status(411);
		return c.json({
			msg: 'somethig wrong to sign in.'
		})
	}
})

userRoute.use('/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if(!jwt){
		c.status(403);
		return c.json({
		msg: 'please login or sign up'
		})
	}
	const userDetails = await verify(jwt, c.env.JWT_SECRET);
	c.set('userId',userDetails.id);
	c.set('email',userDetails.email)
	await next()
})

userRoute.post('/update', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const email = c.get('email');
	const id = c.get('userId');

	const { success } = userUpdateInput.safeParse(body);
	if(!success){
		c.status(400)
		return c.json({
			msg: 'please fill correct input data.'
		})
	}
	try {
		const user = await prisma.user.update({
			where: {
			  id: id,
			},
			data: {
				email: email,
				password: body.password,
				name: body.name,
			},
			select: {
				id: true,
				email: true,
				name: true,
			}
		  });
		return c.json({
			msg: 'user updated success.',
			user: user,
		});
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})

export default userRoute;