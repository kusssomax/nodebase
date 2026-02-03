"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const loginSchema = z.object({
    email: z.email("Please enter a valid email address").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {

    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });


    const onSumbit = async (values: LoginFormValues) => {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            callbackURL: "/",
        },
        {
            onSuccess: () => router.push("/"),
            onError: (ctx) => {
                toast.error(ctx.error.message)
            }
        }
    )
    }

    const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-center">Welcome back</CardTitle>
                <CardDescription className="text-center">
                    Login to continue
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-8">
                        <div className="flex flex-col gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full flex items-center gap-4"
                                disabled={isPending}
                            >
                                <Image src="/logos/github.svg" alt="GitHub" width={20} height={20} />
                                Continue with GitHub
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full flex items-center gap-4"
                                disabled={isPending}
                            >
                                <Image src="/logos/google.svg" alt="Google" width={20} height={20} />
                                Continue with Google
                            </Button>
                        </div>
                        <div className="grid gap-6">
                            <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                    type="email"
                                    placeholder="m@example.com"
                                    {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                             <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                    type="password"
                                    placeholder="********"
                                    {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                            <Button type="submit" className="w-full" disabled={isPending}>
                                Login
                            </Button>
                        </div>
                        <div className="text-center text-sm">
                            Don't have an account? 
                            <Link href="/signup" className="underline underline-offset-4">Register</Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  )
}

export default LoginForm