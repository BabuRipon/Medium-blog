import { Hono } from 'hono';
import { cors } from 'hono/cors'

import userRoute from './route/user';
import blogRoute from './route/blog';

// Create the main Hono app
const app = new Hono();

app.use('/api/*', cors())
app.route('/api/v1/user',userRoute);
app.route('/api/v1/blog',blogRoute);

export default app;