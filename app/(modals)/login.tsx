import Colors from '@/constants/Colors';
import { useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, StyleSheet, TextInput, Text } from 'react-native';

import { useWarmupBrowser } from '@/hooks/useWarmupBrowser';
import { defaultStyles, fontFamilyStyles } from '@/constants/Styles';
import Button from '@/components/common/Button';

enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Facebook = 'oauth_facebook',
}
const Login = () => {
    // Warm up the browser to avoid a delay when the user signs in, for android mostly
    useWarmupBrowser();

    const router = useRouter();
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth,
        }[strategy];

        try {
            const { createdSessionId, setActive } = await selectedAuth();
            if (createdSessionId) {
                setActive!({ session: createdSessionId });
                router.back();
            }
        } catch (err) {
            console.error('OAuth error', err);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                placeholder="Email"
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
            />
            <Button primary title='Continue' onPress={() => null} />
            <View style={styles.seperatorView}>
                <View style={styles.seperatorLine} />
                <Text style={styles.seperator}>or</Text>
                <View style={styles.seperatorLine} />
            </View>
            <View style={{ gap: 20 }}>
                <Button title='Continue with Phone'
                    onPress={() => null}
                    iconBtn={<Ionicons
                        name="phone-portrait"
                        size={24}
                        style={defaultStyles.btnIcon} />} />
                <Button title='Continue with Apple'
                    onPress={() => onSelectAuth(Strategy.Apple)}
                    iconBtn={<Ionicons
                        name="md-logo-apple"
                        size={24}
                        style={defaultStyles.btnIcon} />} />
                <Button title='Continue with Google'
                    onPress={() => onSelectAuth(Strategy.Google)}
                    iconBtn={<Ionicons
                        name="md-logo-google"
                        size={24}
                        style={defaultStyles.btnIcon} />} />
                <Button title='Continue with Facebook'
                    onPress={() => onSelectAuth(Strategy.Facebook)}
                    iconBtn={<Ionicons
                        name="md-logo-facebook"
                        size={24}
                        style={defaultStyles.btnIcon} />} />
            </View>
        </View >
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26,
    },
    seperatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30,
    },
    seperator: {
        fontFamily: fontFamilyStyles.mon_sb,
        color: Colors.grey,
        fontSize: 16,
    },
    seperatorLine: {
        flex: 1,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});