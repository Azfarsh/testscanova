import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
  UserCredential,
  onAuthStateChanged,
  Auth
} from "firebase/auth";
import { auth } from "./firebase";

// Set the auth type explicitly to match the exported type from firebase.ts
const firebaseAuth = auth as Auth | null;

// Create Google provider
const googleProvider = new GoogleAuthProvider();

// Handle case when Firebase is not configured
const handleFirebaseNotConfigured = (operation: string): never => {
  const error = new Error(`Firebase ${operation} operation failed: Firebase is not properly configured. Please provide Firebase API keys.`);
  console.error(error);
  throw error;
};

// Login with email and password
export const logInWithEmailAndPassword = async (
  email: string, 
  password: string
): Promise<UserCredential> => {
  if (!firebaseAuth) return handleFirebaseNotConfigured('login');
  
  try {
    const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
    
    // Track login
    await addDoc(collection(db, 'login'), {
      userId: result.user.uid,
      email: result.user.email,
      timestamp: serverTimestamp(),
      method: 'email'
    });
    
    return result;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Register with email and password
export const registerWithEmailAndPassword = async (
  email: string, 
  password: string, 
  displayName: string
): Promise<User> => {
  if (!firebaseAuth) return handleFirebaseNotConfigured('registration');
  
  try {
    const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    
    // Update the user's profile
    await updateProfile(result.user, {
      displayName
    });

    // Store user data in Firestore
    const userDoc = doc(db, 'users', result.user.uid);
    const timestamp = serverTimestamp();
    
    await setDoc(userDoc, {
      email,
      displayName,
      createdAt: timestamp,
      lastLogin: timestamp
    });

    // Track signup
    await addDoc(collection(db, 'signup'), {
      userId: result.user.uid,
      email: result.user.email,
      displayName,
      timestamp: timestamp,
      method: 'email'
    });
    
    return result.user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Update last login timestamp
export const updateLastLogin = async (userId: string) => {
  try {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, {
      lastLogin: new Date()
    });
  } catch (error) {
    console.error("Error updating last login:", error);
  }
};

// Login with Google
export const loginWithGoogle = async (): Promise<UserCredential> => {
  if (!firebaseAuth) return handleFirebaseNotConfigured('Google authentication');
  
  try {
    return await signInWithPopup(firebaseAuth, googleProvider);
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

// Sign out
export const logoutUser = async (): Promise<void> => {
  if (!firebaseAuth) return handleFirebaseNotConfigured('logout');
  
  try {
    return await signOut(firebaseAuth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// Listen for authentication state changes
export const onAuthStateChange = (callback: (user: User | null) => void): (() => void) => {
  if (!firebaseAuth) {
    console.warn("Firebase auth state change listener not initialized: Firebase is not configured");
    // Return a dummy unsubscribe function
    return () => {};
  }
  
  try {
    return onAuthStateChanged(firebaseAuth, callback);
  } catch (error) {
    console.error("Auth state change error:", error);
    return () => {};
  }
};
