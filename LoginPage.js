import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text, ImageBackground, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PSO_logo from './PSO_logo.png';

const LoginPage = ({ onLogin }) => {
  const [customerCode, setCustomerCode] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const savedCredentials = await AsyncStorage.getItem('userCredentials');
      if (savedCredentials) {
        const { customerCode: savedCustomerCode, password: savedPassword, rememberMe: savedRememberMe } = JSON.parse(savedCredentials);
        setCustomerCode(savedCustomerCode);
        setPassword(savedPassword);
        setRememberMe(savedRememberMe);
      }
    } catch (error) {
      console.error('Error loading saved credentials:', error);
    }
  };
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (!customerCode || !password) {
        throw Error('Please enter both customer code and password');
      }
      let response = await fetch('http://10.0.2.2:80/api/getapi.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cusCode: customerCode,
          cusPass: password,
        }),
      });

      let data = await response.json();
      setIsLoading(false);

      if (data && data.body && data.body.CustomerCode) {
        // do login
        alert('Login Successful');
        setIsLoading(false);

        if (rememberMe) {
          saveUserCredentials(customerCode, password);
        } else {
          clearUserCredentials();
        }

        onLogin(Number(customerCode));
      } else {
        throw Error('Pump Code or Username is incorrect!');
      }
    } catch (error) {
      setIsLoading(false);
      alert(error || 'Something went wrong');
    }
  };

  const saveUserCredentials = async (customerCode, password) => {
    try {
      const userCredentials = {
        customerCode,
        password,
        rememberMe: true,
      };
      await AsyncStorage.setItem('userCredentials', JSON.stringify(userCredentials));
    } catch (error) {
      console.error('Error saving user credentials:', error);
    }
  };

  const clearUserCredentials = async () => {
    try {
      await AsyncStorage.removeItem('userCredentials');
    } catch (error) {
      console.error('Error clearing user credentials:', error);
    }
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
    if (!rememberMe) {
      setCustomerCode(customerCode);
      setPassword(password);
    }
  };

  return (
    
    <View style={{ alignItems: 'center', paddingTop: 15, height: '100%' }}>
      <Image source={PSO_logo} style={{ width: 95, height: 95, marginBottom: 15, marginTop: 5 }} />
    <View style={{alignItems:'center'}}>
      <Text style={{fontSize:25, color:'black', fontWeight:'bold'}}>
            OCC SALES APP
      </Text>
      <Text style={{fontSize:15, fontWeight:'500', marginTop:8}}>
        Version{'\n'}  1.0.0
      </Text>
    </View>
  <View style={{height:260, marginTop:75, borderBlockColor:'#0E8241', borderRadius:12.5, alignItems:'center', backgroundColor:'#0E8241', width:372}}>
        {/* <Text style={{ fontSize: 26, fontWeight: '800', marginBottom: 10, marginTop:5, color: 'black' }}>Pump Code</Text> */}
      <View style={{ width: 340, borderWidth: 1, marginTop:23, backgroundColor:'#FED009', borderColor: '#FED009', borderRadius: 12.5 }}>
        <TextInput
          style={{ fontSize: 18.5, padding: 10, borderColor: '#0E8241'}}
          placeholder="Pump Code"
          placeholderTextColor="black" 
          onChangeText={setCustomerCode}
          accessibilityLabel="customerCodeInput"
          value={customerCode}
        />
      </View>

      
        <View style={{ width: 340, marginTop:10, backgroundColor:'#FED009', borderColor: '#0E8241', borderRadius: 12.5, marginBottom: 8, color: 'black', flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={{ flex: 1, fontSize: 18.5, padding: 10, borderColor: '#0E8241'}}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            accessibilityLabel="passwordInput"
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={{ paddingHorizontal: 10}}>
            <Text style={{ fontSize: 18, color: 'black', fontWeight:'bold' }}>{showPassword ? 'hide' : 'show'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={toggleRememberMe} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
        <View style={{ width: 20, height: 20, borderWidth: 2.5, borderColor: 'black', marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
          {rememberMe && <View style={{ width: 14, height: 14, backgroundColor: '#FED009' }} />}
        </View>
        <Text style={{ fontSize: 18, fontWeight: '700', color:'black' }}>REMEMBER ME</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={{
            width: 170,
            backgroundColor: 'white',
            borderRadius: 12.5,
            marginTop: 22,
            borderColor:'#0E8241',
            height: 47.5,
            padding:5,
            alignItems:'center',
            opacity: isLoading ? 1 : 1, 
          }}
          onPress={handleLogin}
          disabled={isLoading} 
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={{ fontSize: 24, fontFamily:'san serif', color: 'black', textAlign: 'center', padding: 0, fontWeight: '700' }}>
              LOGIN
            </Text>
          )}
        </TouchableOpacity>
  </View>
    </View>
  );
};

export default LoginPage;



