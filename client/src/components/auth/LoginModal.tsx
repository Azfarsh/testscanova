import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { auth, db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';

interface LoginModalProps {
  onClose: () => void;
  openSignup: () => void;
}

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const LoginModal = ({ onClose, openSignup }: LoginModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // ✅ Just show success toast here — redirect handled in Layout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        toast({
          title: 'Login successful',
          description: `Welcome, ${user.displayName || user.email || 'User'}`,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const userCredential = await auth.signInWithEmailAndPassword(data.email, data.password);
      
      // Store login data in Firestore
      await addDoc(collection(db, 'login'), {
        userId: userCredential.user.uid,
        email: data.email,
        timestamp: serverTimestamp(),
        rememberMe: data.rememberMe,
        method: 'email'
      });

      toast({
        title: 'Login successful',
        description: 'Welcome back!',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: 'Invalid email or password. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Redirect handled globally
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description:
          error.code === 'auth/popup-closed-by-user'
            ? 'You closed the Google login popup.'
            : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-3xl text-cyan-500 mb-2">
              <i className="fas fa-user-circle"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Log In to Scanova</h2>
            <p className="text-gray-600">Access your healthcare dashboard and services</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} disabled={isLoading} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        disabled={isLoading}
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">Remember me</FormLabel>
                    </FormItem>
                  )}
                />
                <Button variant="link" className="text-sm text-cyan-600 hover:text-cyan-800 p-0">
                  Forgot password?
                </Button>
              </div>
              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-circle-notch fa-spin"></i>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  'Log In'
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-4 flex items-center">
            <div className="flex-grow h-px bg-gray-200"></div>
            <div className="mx-4 text-gray-500 text-sm">or</div>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button
              className="w-full bg-white border text-black hover:bg-gray-100"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <i className="fab fa-google mr-2" />
              Sign in with Google
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?
              <Button
                variant="link"
                className="text-cyan-600 hover:text-cyan-800 pl-1 pr-0"
                onClick={openSignup}
                disabled={isLoading}
              >
                Sign Up
              </Button>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
