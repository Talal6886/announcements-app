import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView, ImageBackground, StatusBar
} from 'react-native';
import { AnnouncementsContext } from '@components/AnnouncementsContext';
import Icons from '@components/icons';
import { screenHeight, screenWidth, sharedColors } from '@components/constants';
import { Button } from '@components/buttons';
import BGImage from '@assets/images/BGImage.png';
import BottomImage from '@assets/images/BBGImage.png';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showusername, setShowusername] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isValidInput, setIsValidInput] = useState(true);
    const { validUsers, setUser } = useContext(AnnouncementsContext);



    const handleLogin = () => {

        const user = validUsers.find((u) => u.id === username && u.password === password);
        if (user) {
            setLoading(true);
            setUser(user);
            setShowusername(user.name);
            setTimeout(() => {
                setLoading(false);
                if (user.role === 'admin') {
                    navigation.navigate('AdminNavigation');
                } else {
                    navigation.navigate('Announcements');
                }
            }, 300); // 0.3 seconds
        } else {
            alert('Invalid username or password');
            setIsValidInput(username.length > 3 && password.length > 4);

        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <View style={styles.container}>

            <ImageBackground source={BGImage} style={{position:'absolute', width: 400, height:400, top: -40, left: 0,right:0,bottom: 0,}}/>
            <ImageBackground source={BottomImage} style={{position:'absolute', width: 400, height:400, top: 340, left: -30, }}/>
            <Icons name={'anb'} width={60} height={60} style={{ position: 'absolute', top: 0, left: 25 }} />

            <Text style={styles.titleWlc}>Welcome Back</Text>
            <Text style={styles.titleName}>{showusername+" 🤩"}</Text>

            <View style={styles.card}>
                {isValidInput ?
                    (<Text style={styles.textLogin}>Username</Text>)
                : (<Text style={styles.textLoginError}>Invalid Username</Text>)
                }
                <TextInput
                    style={styles.input}
                    placeholder="Enter username"
                    value={username}
                    onChangeText={setUsername}


                />
                {isValidInput ?
                    (<Text style={styles.textLogin}>Password</Text>)
                    : (<Text style={styles.textLoginError}>Invalid Password</Text>)
                }
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Enter password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Icons
                            name={isPasswordVisible ? 'EyeOpen' : 'EyeOff'}
                            width={25}
                            height={25}
                            fill={sharedColors.primaryColor}
                            style={{ marginBottom: 16 }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.rememberForgotContainer}>
                    <TouchableOpacity onPress={toggleRememberMe} style={styles.checkboxContainer}>
                        <View style={[styles.square, { borderColor: rememberMe ? sharedColors.primaryColor : '#ccc' }]}>
                            {rememberMe && (
                                <Icons name={'Check'} width={15} height={15} fill={sharedColors.primaryColor} />
                            )}
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.rememberMeText}>Remember me</Text>
                    <TouchableOpacity>
                        <Text style={styles.forgotText}>Forgot credentials?</Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color={sharedColors.primaryColor} />
                ) : (
                    <Button
                        style={styles.button}
                        textButton={"Log in"}
                        textStyle={styles.text}
                        onPress={handleLogin}
                    />
                )}
                <Button
                    style={styles.buttonWithMPIN}
                    textButton={"Login with MPIN"}
                    textStyle={styles.textWithMPIN}
                    //onPress={{}}
                />
                <View style={{borderColor: '#ccc', borderWidth: 0.5, width: '100%', marginTop: 16}}/>
                <View style={styles.rowContainerCard}>
                    <View style={styles.columnContainer}>
                        <Text style={styles.questionText}>Existing customer ?</Text>
                        <Text style={styles.registerOpenText}>Register Online</Text>
                    </View>
                    <View style={styles.horizontalLine}/>
                    <View style={styles.columnContainer}>
                        <Text style={styles.questionText}>Want to join anb ?</Text>
                        <Text style={styles.registerOpenText}>Open Account</Text>
                    </View>
                </View>
            </View>

            <View style={styles.rowContainer}>
                <Icons name={'ContactUs'} width={20} height={20} color={sharedColors.primaryColor} />
                <Text>Contact Us</Text>
                <View style={styles.horizontalLine}/>
                <Icons name={'AboutAnb'} width={20} height={20} color={sharedColors.primaryColor} />
                <Text>About anb</Text>
                <View style={styles.horizontalLine}/>
                <Icons name={'More'} width={20} height={20} color={sharedColors.primaryColor} />
                <Text>More</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F2F2F2',
    },
    card: {
        width: 343,
        height: 425,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: '#E5E6E5',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        shadowOpacity: 0.2,

    },
    titleWlc: {
        fontSize: 20,
        position: 'absolute', top: 60, left: 25
    },
    titleName:{
        fontSize: 20,
        position: 'absolute', top: 60, left: 160,
        fontWeight: '600',
    },
    textLogin: {
        fontSize: 14,
        alignSelf: 'flex-start',
        marginBottom: 4,
        paddingHorizontal: 16,
        color: '#4E5D6B',
    },
    textLoginError: {
        fontSize: 14,
        alignSelf: 'flex-start',
        marginBottom: 4,
        paddingHorizontal: 16,
        color: '#EF4A4A',
    },
    input: {
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        marginBottom: 32,
        borderBottomColor: '#ccc',
        paddingHorizontal: 16,
        width: '100%',
        fontWeight: 'bold',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 16,
        marginBottom: 16,
        borderColor: '#fff',
        borderBottomColor: '#ccc',
    },
    passwordInput: {
        flex: 1,
        height: 40,
        fontWeight: 'bold',
    },
    rememberForgotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 16,
    },
    rememberMeText: {
        color: '#000',
        fontSize: 14,
    },
    forgotText: {
        marginLeft: 45,
        color: sharedColors.primaryColor,
        fontWeight: 'bold',
    },
    registerOpenText: {
        color: sharedColors.primaryColor,
        fontWeight: 'bold',
    },
    questionText: {
        color: '#4E5D6B',
        paddingBottom: 16,
    },
    button: {
        alignItems: 'center',
        width: 0.85 * screenWidth,
        height: 0.055 * screenHeight,
        marginTop: 5,
        borderRadius: 8,
        backgroundColor: sharedColors.primaryColor,
    },
    buttonWithMPIN: {
        alignItems: 'center',
        width: 0.85 * screenWidth,
        height: 0.035 * screenHeight,
        marginTop: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    textWithMPIN: {
        fontSize: 15,
        fontWeight: 'bold',
        color: sharedColors.primaryColor,
        padding: 9,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        padding: 12.5,
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: sharedColors.primaryColor,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        position: 'absolute',
        bottom: -8,

    },
    rowContainerCard: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 16,
    },
    columnContainer:{
        flexDirection: 'column',
        marginHorizontal:16,
        alignItems: 'center',
    },
    horizontalLine:{
        borderColor: '#ccc',
        borderWidth:0.5,
        marginHorizontal:4,
        height: 30,
        alignSelf:'center'
    },
    verticalLine:{
        borderColor: '#ccc',
        borderWidth:0.5,
        marginHorizontal:4,
    }
});

export default LoginScreen
