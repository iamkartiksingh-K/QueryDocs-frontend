"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input-with-eye";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import classNames from "classnames";
import { Mail, Github } from "lucide-react";
import { SeparatorWithText } from "@/components/ui/separator-with-text";
import { IconGroup, type Icon } from "@/components/icon-group";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginCardProps = {
  variant?: "default" | "inline";
  authIconVariant?: "default" | "inline";
  authIconPosition?: "top" | "down";
  externalAuth?: boolean;
  className?: string;
} & React.ComponentProps<"div">;

export const LoginCard = ({
  variant,
  authIconVariant = "default",
  authIconPosition = "top",
  externalAuth,
  className,
}: LoginCardProps) => {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    clearError();
    const result = await login(values.email, values.password);
    
    if (result.success) {
      toast.success('Welcome back!', {
        description: 'You have been logged in successfully.',
        duration: 3000
      });
      router.push("/dashboard");
    } else {
      toast.error('Login Failed', {
        description: result.error || 'Invalid email or password',
        duration: 5000
      });
    }
  }

  const externalAuthList: Icon[] = [
    {
      icon: <Mail />,
      label: "Email",
      onClick: () => console.log("Email clicked"),
      className: "bg-black text-white hover:bg-gray-900 hover:text-white",
    },
    {
      icon: <Github />,
      label: "Github",
      onClick: () => console.log("Github clicked"),
    },
  ];

  const cardClass = classNames("w-[350px]", className);
  const contentClass = classNames("flex flex-col", {
    "flex-col-reverse": authIconPosition === "down",
  });
  return (
    <Card className={cardClass}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Welcome to our app!</CardDescription>
      </CardHeader>
      <CardContent className={contentClass}>
        {externalAuth && (
          <>
            <IconGroup icons={externalAuthList} type={authIconVariant} />
            <SeparatorWithText label="Or continue with" className="my-5" />
          </>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {variant !== "inline" && <FormLabel>Email</FormLabel>}
                  <FormControl>
                    <Input
                      placeholder={
                        variant === "inline" ? "Email" : "example@example.com"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between">
                    {variant !== "inline" && <p>Password</p>}
                    <a
                      href="#"
                      className="text-right underline-offset-4 text-xs hover:underline"
                    >
                      Forgot password?
                    </a>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={
                        variant === "inline" ? "Password" : "********"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="cursor-pointer w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" color="white" className="mr-2" />
                  Signing in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
