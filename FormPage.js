import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import moment from 'moment';
import Sound from 'react-native-sound'; 
  
  const playSuccessSound = () => {
  const successSound = new Sound('success.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
    successSound.setVolume(1.0);
    successSound.play((success) => {
      if (success) {
        console.log('Sound played successfully');
        successSound.release();
      } else {
        console.log('Sound playback failed');
      }
    });
  });
};

const FormPage = ({ lubeName, lubeNumber, lubeCategory, onSubmit, customerCode, onBackToGridPage }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [secureCode, setSecureCode] = useState('');
  const [stationName, setStationName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['Honda', 'Audi', 'Toyota', 'BMW', 'Suzuki', 'Changan', 'Mercedes', 'Ford', 'Lexus', 'Nissan', 'Daihatsu', 'MG', 'KIA', 'Proton','Haval', 'Al-Ghazi Tractors', 'Isuzu Motors Ltd.', 'Hyundai', 'Others'];
  const [selectedOption2, setSelectedOption2] = useState(null);
  const options2 = ['OCC', 'Car Wash', 'Walk-in Customer'];
  const [lubeQuantity, setLubeQuantity] = useState('');
  const [division, setDivision] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const handleSelectOption2 = (option2) => {
    setSelectedOption2(option2);
    setIsOpen2(false);
  };

  const handleLubeQuantityChange = (text) => {
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(text) || text === '') {
      setLubeQuantity(text);
    }
  };
  useEffect(() => {
    fetchStationName();
  }, []);

  const fetchStationName = async () => {
    try {
      const response = await fetch('http://10.0.2.2:80/api/getStationName.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `customerCode=${customerCode}`,
      });
      const data = await response.json();
      if (response.ok) {
        setStationName(data.stationName);
        setDivision(data.division);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching the station name: ' + error.message);
    }
  };
  const fetchDivision = async (stationName) => {
    try {
      const response = await fetch('http://10.0.2.2:80/api/getDivision.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `stationName=${stationName}`,
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Division:', data.division);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching the division: ' + error.message);
    }
  };
  const handleFormSubmit = async () => {
    if (
      customerName &&
      carModel &&
      carNumber &&
      lubeQuantity &&
      selectedOption &&
      selectedOption2
      ) {

      const formData = new FormData();
      formData.append('cusCode', customerCode);
      formData.append('cusName', customerName);
      formData.append('cusNum', customerNumber);
      formData.append('carModel', carModel);
      formData.append('carNum', carNumber);
      formData.append('carMake', selectedOption);
      formData.append('stationName', stationName);
      formData.append('division', division);
      formData.append('lubeName', lubeName);
      formData.append('lubeLtr', lubeNumber);
      formData.append('lubeCategory', lubeCategory);
      formData.append('lubeQty', lubeQuantity);
      formData.append('salesType', selectedOption2);
      formData.append('secureCode', secureCode);
      const formattedDateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      formData.append('dateTime', formattedDateTime);
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
          playSuccessSound();
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
    else {
      alert("PLEASE FILL IN ALL THE FIELDS")
    }
  };
  const handleGoToGridPage = () => {
    onBackToGridPage(); 
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'transparent' }}>

      <View style={{ backgroundColor: 'transparent' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 60, backgroundColor: 'black', width: '100%' }}>
          <TouchableOpacity
            style={{ backgroundColor: '#22356D', padding: 7, paddingVertical: 14, flex: 0.15, borderColor: '#22356D', borderWidth: 3.5 }}
            onPress={handleGoToGridPage}
          >
            <Text style={{ fontSize: 17, fontWeight: '800', color: 'white', height: '100%' }}>
              BACK
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 28, fontWeight: '900', color: 'beige', paddingHorizontal: 25, flex: 0.85 }}>
            CUSTOMER INFO
          </Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <View style={{ width: 370, backgroundColor: '#FED009', alignItems: 'center', borderRadius: 15, borderWidth: 4, borderColor: '#FED009', padding: 10 }}>
            <Text style={{ fontSize: 27, fontWeight: '900', color: 'black', textAlign: 'center', paddingHorizontal: 20 }}>
              Pump Code: {customerCode}
            </Text>
            <Text style={{ fontSize: 17.5, fontWeight: 'bold', color: 'black', textAlign: 'center', marginTop: 10, paddingHorizontal: 20 }}>
              Station: {stationName}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', padding: 5, marginTop: 7, marginBottom: 10 }}>
          <View style={{ width: 230, backgroundColor: '#22356D', padding: 2.5, alignItems: 'center', borderRadius: 15, borderColor: '#22356D', borderWidth: 3 }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'white', paddingHorizontal: 20 }}>
              Lube Litre: {lubeNumber + ' LTR'}
            </Text>
          </View>
          <View style={{ width: 285, backgroundColor: '#22356D', marginTop: 5, padding: 2.5, alignItems: 'center', borderRadius: 15, borderColor: '#22356D', borderWidth: 3 }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'white' }}>
              Lube Category: {lubeCategory}
            </Text>
          </View>
          <View style={{ width: 350, backgroundColor: '#22356D', padding: 2.5, alignItems: 'center', marginTop: 5, borderRadius: 15, borderColor: '#22356D', borderWidth: 3 }}>
            <Text style={{ fontSize: 19, textAlign: 'center', fontWeight: 'bold', color: 'white', paddingHorizontal: 20 }}>
              Lube Name: {lubeName}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', marginRight: 10 }}>Customer Name:</Text>
          <TextInput
            style={{ fontSize: 20, backgroundColor: 'beige', borderRadius: 5, borderWidth: 3, borderColor: 'black', padding: 5, flex: 1, color: 'black' }}
            placeholderTextColor="black"
            value={customerName}
            onChangeText={setCustomerName}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', marginRight: 10 }}>Contact Number:</Text>
          <TextInput
            style={{ fontSize: 20, backgroundColor: 'beige', borderRadius: 5, borderWidth: 3, borderColor: 'black', padding: 5, flex: 1, color: 'black' }}
            placeholder="eg. 03xxxxxxxxx"
            placeholderTextColor="black"
            value={customerNumber}
            onChangeText={setCustomerNumber}
            keyboardType="numeric"
            maxLength={11}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', marginRight: 32 }}>Vehicle Model:</Text>
          <TextInput
            style={{ fontSize: 20, backgroundColor: 'beige', borderRadius: 5, borderWidth: 3, borderColor: 'black', padding: 5, flex: 1, color: 'black' }}
            placeholder="eg. 2000"
            placeholderTextColor="black"
            value={carModel}
            onChangeText={setCarModel}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', marginRight: 13 }}>Vehicle Number:</Text>
          <TextInput
            style={{ fontSize: 20, backgroundColor: 'beige', borderRadius: 5, borderWidth: 3, borderColor: 'black', padding: 5, flex: 1, color: 'black' }}
            placeholder="eg. ABC-123"
            placeholderTextColor="black"
            value={carNumber}
            onChangeText={setCarNumber}
          />
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', marginRight: 37, lineHeight: 40 }}>Vehicle Make:</Text>
          <View style={{ flex: 1, borderWidth: 3, borderRadius:5, backgroundColor: 'beige', borderColor: 'black', paddingHorizontal: 10 }}>
            <TouchableOpacity
              style={{ paddingVertical: 10 }}
              onPress={toggleDropdown}
            >
              <Text style={{ fontSize: 19, color: 'black', alignItems: 'center' }}>{selectedOption || '-Select Make'}</Text>
            </TouchableOpacity>
            {isOpen && (
              <View style={{ marginTop: 5 }}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => handleSelectOption(option)}
                    style={{ paddingVertical: 10 }}
                  >
                    <Text style={{ fontSize: 20, color: 'black' }}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', marginRight: 56 }}>No. of Cans:</Text>
          <TextInput
            style={{
              fontSize: 20,
              backgroundColor: 'beige',
              borderRadius: 5,
              borderWidth: 3,
              borderColor: 'black',
              padding: 5,
              flex: 1,
              color: 'black',
            }}
            placeholderTextColor="black"
            value={lubeQuantity}
            onChangeText={handleLubeQuantityChange} 
            keyboardType="numeric"
          />
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', marginRight: 62, lineHeight: 40 }}>Sales Type:</Text>
          <View style={{ flex: 1, borderWidth: 3, borderRadius:5, backgroundColor: 'beige', borderColor: 'black', paddingHorizontal: 10 }}>
            <TouchableOpacity
              style={{ paddingVertical: 10 }}
              onPress={toggleDropdown2}
            >
              <Text style={{ fontSize: 17, color: 'black', alignItems: 'center' }}>{selectedOption2 || '-Select Sales Type'}</Text>
            </TouchableOpacity>
            {isOpen2 && (
              <View style={{ marginTop: 5 }}>
                {options2.map((option2) => (
                  <TouchableOpacity
                    key={option2}
                    onPress={() => handleSelectOption2(option2)}
                    style={{ paddingVertical: 10 }}
                  >
                    <Text style={{ fontSize: 20, color: 'black' }}>{option2}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', marginRight: 42 }}>Secure Code:</Text>
          <TextInput
            style={{ fontSize: 20, backgroundColor: 'beige', borderRadius: 5, borderWidth: 3, borderColor: 'black', padding: 5, flex: 1, color: 'black' }}
            placeholderTextColor="black"
            value={secureCode}
            onChangeText={setSecureCode}
            keyboardType="numeric"
            maxLength={16}
          />
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#046402',
              paddingVertical: 10,
              marginTop: 5,
              paddingHorizontal: 20,
              borderRadius: 30,
              marginBottom: 10,
              height: 53,
              width: 110,
            }}
            onPress={handleFormSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
};

export default FormPage;