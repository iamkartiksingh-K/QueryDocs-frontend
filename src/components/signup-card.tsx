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
import { Mail, Github, User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { SeparatorWithText } from "@/components/ui/separator-with-text";
import { IconGroup, type Icon } from "@/components/icon-group";
import Link from "next/link";
import { register } from "@/lib/api";
import { redirect } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
  externalAuth = true,
  className,
}: SignupCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const status = await register(values.name, values.email, values.password);
      if (status.success) redirect("/dashboard");
    } finally {
      setIsLoading(false);
    }
  }

  const externalAuthList: Icon[] = [
    {
      icon: <Mail className="w-4 h-4" />,
      label: "Email",
      onClick: () => console.log("Email clicked"),
      className: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200",
    },
    {
      icon: <Github className="w-4 h-4" />,
      label: "Github",
      onClick: () => console.log("Github clicked"),
      className: "bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200",
    },
  ];

  const cardClass = classNames("w-[420px] border-0", className);
  const contentClass = classNames("flex flex-col space-y-6", {
    "flex-col-reverse": authIconPosition === "down",
  });

  const inputVariants = {
    focused: { scale: 1.02, transition: { duration: 0.2 } },
    unfocused: { scale: 1, transition: { duration: 0.2 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className={cardClass}>
        <motion.div variants={itemVariants}>
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900">Create Account</CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Get started with your AI document assistant
            </CardDescription>
          </CardHeader>
        </motion.div>

        <CardContent className={contentClass}>
          {externalAuth && (
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-2 gap-3">
                {externalAuthList.map((auth, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={auth.onClick}
                    className={classNames(
                      "flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200",
                      auth.className
                    )}
                  >
                    {auth.icon}
                    <span>{auth.label}</span>
                  </motion.button>
                ))}
              </div>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with email</span>
                </div>
              </div>
            </motion.div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            placeholder="John Doe"
                            className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:scale-[1.02] transition-all duration-200"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <AnimatePresence>
                        {form.formState.errors.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <FormMessage />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            placeholder="example@example.com"
                            className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:scale-[1.02] transition-all duration-200"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <AnimatePresence>
                        {form.formState.errors.email && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <FormMessage />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                      <FormControl>
                        <motion.div
                          variants={inputVariants}
                          animate={focusedField === 'password' ? 'focused' : 'unfocused'}
                          className="relative"
                        >
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
                            {...field}
                            onFocus={(e) => {
                              setFocusedField('password');
                            }}
                            onBlur={(e) => {
                              setFocusedField(null);
                              field.onBlur && field.onBlur();
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </motion.div>
                      </FormControl>
                      <AnimatePresence>
                        {form.formState.errors.password && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <FormMessage />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="repeatPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Confirm Password</FormLabel>
                      <FormControl>
                        <motion.div
                          variants={inputVariants}
                          animate={focusedField === 'repeatPassword' ? 'focused' : 'unfocused'}
                          className="relative"
                        >
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            type={showRepeatPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
                            {...field}
                            onFocus={(e) => {
                              setFocusedField('repeatPassword');
                            }}
                            onBlur={() => {
                              setFocusedField(null);
                              field.onBlur && field.onBlur();
                            }}                            
                          />
                          <button
                            type="button"
                            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showRepeatPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </motion.div>
                      </FormControl>
                      <AnimatePresence>
                        {form.formState.errors.repeatPassword && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <FormMessage />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="termsAndCondition"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <motion.div 
                          className="flex items-center space-x-3"
                          whileHover={{ scale: 1.02 }}
                        >
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id={field.name}
                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                          <Label htmlFor={field.name} className="text-sm text-gray-600 cursor-pointer">
                            I agree to the{" "}
                            <Link href="#" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="#" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
                              Privacy Policy
                            </Link>
                          </Label>
                        </motion.div>
                      </FormControl>
                      <AnimatePresence>
                        {form.formState.errors.termsAndCondition && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <FormMessage />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </Form>
        </CardContent>

        <motion.div variants={itemVariants}>
          <CardFooter className="flex justify-center pt-6">
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link 
                href="/auth/login" 
                className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 transition-colors duration-200"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </motion.div>
      </Card>
    </motion.div>
  );
};