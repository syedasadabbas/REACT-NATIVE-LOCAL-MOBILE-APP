import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, ImageBackground, ActivityIndicator  } from 'react-native';

const FormPage = ({ lubeName, lubeNumber, onSubmit, customerCode, onBackToGridPage }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [lubePrice, setLubePrice] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['Honda', 'Audi', 'Corolla', 'BMW'];
  const [selectedOption2, setSelectedOption2] = useState(null);
  const options2 = ['Petrol', 'Diesel', 'CNG'];
  const [selectedOption3, setSelectedOption3] = useState(null);
  const options3 = ['Bike', 'Cars/SUVs', 'Tractor', 'Truck'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };
  const toggleDropdown3 = () => {
    setIsOpen3(!isOpen3);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const handleSelectOption2 = (option2) => {
    setSelectedOption2(option2);
    setIsOpen2(false);
  };
  const handleSelectOption3 = (option3) => {
    setSelectedOption3(option3);
    setIsOpen3(false);
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleFormSubmit = async () => {
    if (
      customerName &&
      customerNumber &&
      carModel &&
      carNumber 
      &&
      lubePrice
      &&
      selectedOption &&
      selectedOption2 &&
      selectedOption3
    ) {
      const formData = new FormData();
      formData.append('cusCode', customerCode);
      formData.append('cusName', customerName);
      formData.append('cusNum', customerNumber);
      formData.append('carModel', carModel);
      formData.append('carNum', carNumber);
      formData.append('lubeCost', lubePrice);
      formData.append('carBrand', selectedOption);
      formData.append('engineType', selectedOption2);
      formData.append('vehType', selectedOption3);
      formData.append('lubeName', lubeName);
      formData.append('lubeLtr', lubeNumber);
      formData.append('dateTime', new Date().toString());
      console.log('Form Data:', formData);

  try {
    setIsLoading(true);
    const response = await fetch('http://10.0.2.2:80/api/form_insert.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      
      body: formData,
    });
    setIsLoading(false);
    console.log('Raw Response:', response);

    if (response.ok) {
      alert('Data inserted successfully');
      const responseData = await response.text();
console.log('Raw Response Data:', responseData);

    } else {
      throw new Error('An error occurred during the request');
    }
  } catch (error) {
    setIsLoading(false);
    console.error(error);
    alert('An error occurred: ' + error.message);
  }

    onSubmit(formData);
    onBackToGridPage();
}
else
{
  alert("PLEASE FILL IN ALL THE FIELDS")
}
  };
  const handleGoToGridPage = () => {
    // alert("GRID PAGE SUCCESSFULLY PRESSED")
    onBackToGridPage(); // Simply call the onBackToGridPage callback to go back to GridPage
  };

  return (
    <ImageBackground source={require('../PSO_APP/assets/BG_grid.png')} style={{ height: '100%', flexGrow: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'transparent' }}>

        <View style={{ backgroundColor: 'transparent' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: '8.5%', backgroundColor: 'blue', paddingHorizontal: 0, width: '100%' }}>
          {/* Go to GridPage TouchableOpacity */}
          <TouchableOpacity
            style={{ backgroundColor: 'green', paddingVertical: 10, paddingHorizontal: 10, flex: 0.15 }}
            onPress={handleGoToGridPage}
          >
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', height:'100%'}}>
              Go {'\n'}Back
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center', flex: 0.85}}>
            CUSTOMER INFO
          </Text>
        </View>

      <Text style={{ fontSize: 29, fontWeight: 'bold', color: 'black',textAlign:'center', marginTop: 20, paddingHorizontal: 20 }}>
      Pump Code: {customerCode}
    </Text>
      <Text style={{ fontSize: 22, fontWeight: 'bold',color:'black', marginTop: 20, paddingHorizontal: 20 }}>
        Lube Name: {lubeName}
      </Text>
      <Text style={{ fontSize: 22, fontWeight: 'bold',color:'black', marginBottom: 20, paddingHorizontal: 20 }}>
        Lube Litre: {lubeNumber}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold',color:'black', marginRight: 10 }}>Customer Name:</Text>
        <TextInput
          style={{ fontSize: 20,backgroundColor:'beige',fontWeight:'bold', borderWidth: 2, borderColor: 'black', padding: 5, flex: 1, color:'black' }}
          placeholder="Enter Customer Name"
          placeholderTextColor="black" 
          value={customerName}
          onChangeText={setCustomerName}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold',color:'black', marginRight: 10 }}>Contact Number:</Text>
        <TextInput
          style={{ fontSize: 20,backgroundColor:'beige',fontWeight:'bold', borderWidth: 2, borderColor: 'black', padding: 5, flex: 1 , color:'black'}}
          placeholder="Enter Contact Number"
          placeholderTextColor="black" 
          value={customerNumber}
          onChangeText={setCustomerNumber}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold',color:'black', marginRight: 10 }}>Vehicle Model:</Text>
        <TextInput
          style={{ fontSize: 20,backgroundColor:'beige',fontWeight:'bold', borderWidth: 2, borderColor: 'black', padding: 5, flex: 1, color:'black' }}
          placeholder="Enter Vehicle Model"
          placeholderTextColor="black" 
          value={carModel}
          onChangeText={setCarModel}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 45, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold',color:'black', marginRight: 10 }}>Vehicle Number:</Text>
        <TextInput
          style={{ fontSize: 20,backgroundColor:'beige',fontWeight:'bold', borderWidth: 2, borderColor: 'black', padding: 5, flex: 1, color:'black' }}
          placeholder="Enter Vehicle Number"
          placeholderTextColor="black" 
          value={carNumber}
          onChangeText={setCarNumber}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 45, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold',color:'black', marginRight: 10 }}>Lube Price:</Text>
        <TextInput
          style={{ fontSize: 20,backgroundColor:'beige',fontWeight:'bold', borderWidth: 2, borderColor: 'black', padding: 5, flex: 1, color:'black' }}
          placeholder="Enter Lube Price"
          placeholderTextColor="black" 
          value={lubePrice}
          onChangeText={setLubePrice}
        />
      </View>

  <View style={{ flexDirection: 'row', marginBottom: 20, paddingHorizontal: 20 }}>
    <Text style={{ fontSize: 22, fontWeight: 'bold',color:'black', marginRight: 10, lineHeight:40 }}>Vehicle Brand:</Text>
      <View style={{ flex: 1, borderWidth: 2,backgroundColor:'beige', borderColor: 'black', paddingHorizontal: 10 }}>
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={toggleDropdown}
          >
          <Text style={{fontSize:20, fontWeight:'bold',color:'black', alignItems:'center'}}>{selectedOption || '-Select Vehicle Brand'}</Text>
        </TouchableOpacity>
        {isOpen && (
        <View style={{ marginTop: 5}}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => handleSelectOption(option)}
            style={{ paddingVertical: 10 }}
          >
            <Text style={{fontSize:20,color:'black'}}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      )}
  </View>
</View>

<View style={{ flexDirection: 'row', marginBottom: 20, paddingHorizontal: 20 }}>
    <Text style={{ fontSize: 22, fontWeight: 'bold',color:'black', marginRight: 10, lineHeight:40 }}>Engine Type:</Text>
      <View style={{ flex: 1, borderWidth: 2,backgroundColor:'beige', borderColor: 'black', paddingHorizontal: 10 }}>
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={toggleDropdown2}
          >
          <Text style={{fontSize:20, fontWeight:'bold',color:'black', alignItems:'center'}}>{selectedOption2 || '-Select Engine Type'}</Text>
        </TouchableOpacity>
        {isOpen2 && (
        <View style={{ marginTop: 5}}>
        {options2.map((option2) => (
          <TouchableOpacity
            key={option2}
            onPress={() => handleSelectOption2(option2)}
            style={{ paddingVertical: 10 }}
          >
            <Text style={{fontSize:20,color:'black'}}>{option2}</Text>
          </TouchableOpacity>
        ))}
      </View>
      )}
  </View>
</View>


<View style={{ flexDirection: 'row', marginBottom: 45, paddingHorizontal: 20 }}>
    <Text style={{ fontSize: 22, fontWeight: 'bold',color:'black', marginRight: 10, lineHeight:40 }}>Vehicle Type:</Text>
      <View style={{ flex: 1,backgroundColor:'beige', borderWidth: 2, borderColor: 'black', paddingHorizontal: 10 }}>
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={toggleDropdown3}
          >
          <Text style={{fontSize:19.6, fontWeight:'bold',color:'black', alignItems:'center'}}>{selectedOption3 || '-Select Vehicle Type'}</Text>
        </TouchableOpacity>
        {isOpen3 && (
        <View style={{ marginTop: 5}}>
        {options3.map((option3) => (
          <TouchableOpacity
            key={option3}
            onPress={() => handleSelectOption3(option3)}
            style={{ paddingVertical: 10 }}
          >
            <Text style={{fontSize:20,color:'black'}}>{option3}</Text>
          </TouchableOpacity>
        ))}
      </View>
      )}
  </View>
</View>

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 30,
            marginBottom: 20,
            height: '26%',
            width: '30%',
          }}
          onPress={handleFormSubmit}
          disabled={isLoading}
        >
          {isLoading ? ( // Show loading indicator or the "Submit" text based on isLoading state
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
        
      </ScrollView>
    </ImageBackground>
  );
};

export default FormPage;