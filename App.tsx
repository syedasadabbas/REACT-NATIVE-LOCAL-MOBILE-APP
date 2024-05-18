import React, { useState } from 'react';
import { View } from 'react-native';
import LoginPage from './LoginPage';
import GridPage from './GridPage';
import FormPage from './FormPage';

interface CustomerInfo {
  cusCodeVal: number;
}

interface LubeInfo {
  lubeName: string;
  lubeNumber: number;
  lubeCategory: string;
}

interface FormData {
  cusCodeVal: number;
  customerName: string;
  customerNumber: string;
  carModel: string;
  carNumber: string;
  lubePrice: string;
  dateTime: string;
  lubeName: string;
  lubeNumber: number;
  lubeCategory: string;

}

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [customerCode, setCustomerCode] = useState<number>(0);
  const [selectedLube, setSelectedLube] = useState<LubeInfo | null>(null);
  const [isOnFormPage, setIsOnFormPage] = useState<boolean>(false);
  
  const handleLogin = (customerCode: number) => {
    setLoggedIn(true);
    setCustomerCode(customerCode);
  };

  const handleGridPress = (lubeName: string, lubeNumber: number, lubeCategory: string) => {
    setIsOnFormPage(true);
    setSelectedLube({ lubeName, lubeNumber, lubeCategory});
  };
  
  const handleFormSubmit = (formData: FormData) => {
    console.log('Submitted form data:', formData);
    setIsOnFormPage(false); 
  };
  const handleBackToGridPage = () => {
    setIsOnFormPage(false);
  };


  return (
    <View>
      {!isLoggedIn && <LoginPage 
      onLogin={handleLogin} />}
      {isLoggedIn && !isOnFormPage && (
        <GridPage onGridPress={handleGridPress} customerCode={customerCode} />
      )}
      {isLoggedIn && isOnFormPage && selectedLube && (
        <FormPage
          lubeName={selectedLube.lubeName}
          lubeNumber={selectedLube.lubeNumber}
          lubeCategory={selectedLube.lubeCategory}
          onSubmit={handleFormSubmit}
          customerCode={customerCode}
          onBackToGridPage={handleBackToGridPage}
        />
      )}
    </View>
  );
};

export default App;
