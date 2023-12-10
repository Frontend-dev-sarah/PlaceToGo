import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import ExploreProvider from '@/context/ExploreContext';

const clerkPublishableKey = Constants.expoConfig?.extra?.clerkPublishableKey

const tokenCache = {
  async getToken(tokenKey: string) {
    try {
      return SecureStore.getItemAsync(tokenKey);
    } catch (error) {
      return;
    }
  },

  async saveToken(tokenKey: string, tokenValue: string) {
    try {
      return SecureStore.setItemAsync(tokenKey, tokenValue);
    } catch (error) {
      return;
    }
  }
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (

    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={clerkPublishableKey}>
      <ExploreProvider>
        <RootLayoutNav />
      </ExploreProvider>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(modals)/login')
    }
  }, [isLoaded])

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name='(modals)/login'
        options={{
          presentation: 'modal',
          title: "Login or Signup",
          headerTitleStyle: {
            fontFamily: 'mon-sb'
          },
          headerLeft: () => <TouchableOpacity>
            <Ionicons name='close-outline' size={30} onPress={() => router.back()} />
          </TouchableOpacity>
        }} />
      <Stack.Screen name='listing/[id]'
        options={{ headerTitle: "", headerTransparent: true }} />
      <Stack.Screen name='(modals)/booking'
        options={{
          presentation: 'transparentModal',
          headerTitleStyle: {
            fontFamily: 'mon-sb'
          },
          animation: 'fade',
          headerLeft: () => <TouchableOpacity>
            <Ionicons name='close-outline' size={30} onPress={() => router.back()} />
          </TouchableOpacity>
        }} />
    </Stack>
  );
}
