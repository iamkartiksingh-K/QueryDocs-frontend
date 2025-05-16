"use client";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "./ui/label";
import { Mail, Github } from "lucide-react";
import { SeparatorWithText } from "@/components/ui/separator-with-text";
import { IconGroup, type Icon } from "@/components/icon-group";
const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name cannot be empty!" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters long" })
      .max(20, { message: "Password cannot be more than 20 characters long" })
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must have atleast one upper case character",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must have atleast one lowever case character",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must have atleast one number",
      })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: "Password must have atleast one special character",
      }),
    repeatPassword: z.string(),
    termsAndCondition: z.boolean().refine(
      (checked) => {
        return checked;
      },
      {
        message: "Please accept the terms and conditions",
      },
    ),
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.repeatPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["repeatPassword"],
        message: "Passwords do not match",
      });
    }
  });

type SignupCardProps = {
  variant?: "default" | "inline";
  authIconVariant?: "default" | "inline";
  authIconPosition?: "top" | "down";
  externalAuth?: boolean;
  className?: string;
} & React.ComponentProps<"div">;

export const SignupCard = ({
  variant,
  authIconVariant = "default",
  authIconPosition = "top",
  externalAuth,
  className,
}: SignupCardProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      termsAndCondition: false,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
        <CardTitle className="text-2xl">Signup</CardTitle>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  {variant !== "inline" && <FormLabel>Name</FormLabel>}
                  <FormControl>
                    <Input
                      placeholder={variant === "inline" ? "Name" : "John Doe"}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between">
                    {variant !== "inline" && <p>Repeat password</p>}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={
                        variant === "inline" ? "Repeat Password" : "********"
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
              name="termsAndCondition"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id={field.name}
                      />
                      <Label htmlFor={field.name}>
                        <a href="#" className="underline">
                          Accept terms and condtion.
                        </a>
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="cursor-pointer w-full">
              Signup
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Login
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};
