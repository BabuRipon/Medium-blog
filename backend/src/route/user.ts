import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { signinInput, signupInput } from '@riponbabu/medium-common';

// Create the main Hono app
const userRoute = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();


userRoute.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = signinInput.safeParse(body);
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
				password: body.password
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
	
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	}
	catch(err){
		c.status(411);
		return c.json({
			msg: 'somethig wrong to sign in.'
		})
	}
})

export default userRoute;