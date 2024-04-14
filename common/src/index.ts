import z from 'zod';

export const signupInput = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
})

export type SignupType = z.infer<typeof signupInput>

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string(),
})

export type SigninType = z.infer<typeof signinInput>

export const userUpdateInput = z.object({
    name: z.string(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
})

export type UserUpdateInputType = z.infer<typeof userUpdateInput>

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
});

export type CreateBlogType = z.infer<typeof createBlogInput>;

export const updateBlogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});

export type UpdateBlogType = z.infer<typeof updateBlogInput>;
