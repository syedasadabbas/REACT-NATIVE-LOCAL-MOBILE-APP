
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text, ImageBackground } from 'react-native';
import PSO_logo from './PSO_logo.png';

const LoginPage = ({ onLogin }) => {
  const [customerCode, setCustomerCode] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Perform validation and authentication logic here

      try {
        if(!customerCode || !password){
          throw Error('Please enter both customer code and password')
        }
        let response= await fetch('http://10.0.2.2:80/api/getapi.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cusCode: customerCode,
            cusPass: password,
          }),
        });

        let data= await  response.json();
        console.warn(data);
        if(data?.cus_code) {
          // do login
          onLogin();
          alert("Login Successful");
        }
        else 
        {
          throw Error("Invalid credentials");
        }
      } catch (error) {
        alert(error || 'Something went wrong');
      }
   
  };

  return (
    <ImageBackground source={require('../PSO_APP/assets/BG_grid.png')} style={flexGrow = 1}>

    <View style={{ alignItems: 'center', paddingTop: 20, height: 760 }}>
      <Image source={PSO_logo} style={{ width: 150, height: 150, marginBottom: 15, marginTop: 15 }} />

        <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 10, marginTop:5, color: 'black' }}>Customer Code</Text>
      <View style={{ width: '55%', borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
        <TextInput
          style={{ fontSize: 18.5, padding: 10, fontWeight: 'bold', textAlign: 'center', borderColor: 'green', borderWidth:3 }}
          placeholder="Enter Customer Code"
          value={customerCode}
          // cusCode = {customerCode}
          onChangeText={setCustomerCode}
          accessibilityLabel="customerCodeInput"
        />
      </View>

        <Text style={{ fontSize: 26, fontWeight: 'bold', marginTop:15, marginBottom:10, color: 'black'  }}>Password</Text>
      <View style={{ width: '55%', borderWidth: 1, borderColor: 'black', borderRadius: 5, marginBottom:17}}>
        <TextInput
          style={{ fontSize: 18.5, padding: 10, fontWeight: 'bold', textAlign: 'center', borderColor: 'green', borderWidth:3 }}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          // cusPass={password}
          onChangeText={setPassword}
          accessibilityLabel="passwordInput"
        />
      </View>

      <TouchableOpacity
        style={{ width: '22%', backgroundColor: '#2196F3', borderRadius: 5, marginTop: 5, height: 37 }}
        onPress={handleLogin}
      >
        <Text style={{ fontSize: 20, color: 'white', textAlign: 'center', lineHeight: 24, padding:5, fontWeight: 'bold' }}>Login</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
  );
};

export default LoginPage;
