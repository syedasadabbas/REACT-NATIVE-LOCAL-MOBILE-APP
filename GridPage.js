import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';

const GridPage = ({ onGridPress, customerCode }) => {
  const [lubesData, setLubesData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      console.log("Fetching data from the server...");
      const response = await fetch('http://10.0.2.2:80/api/api.php');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("Data fetched successfully:");
      setLubesData(data);
      setError(null);
    } catch (error) {
      setError('Error fetching data from the server.');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGridPress = (lubeName, lubeLtr, lubeCategory) => {
    onGridPress(lubeName, lubeLtr, lubeCategory, customerCode);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'transparent', padding: 10}}>
      <Text style={{ fontSize: 52, fontWeight: '900', marginBottom: 30, textAlign: 'center', color: 'black' }}>LUBRICANTS</Text>

      {error ? (
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red', marginBottom: 20, textAlign: 'center' }}>
          {error}
        </Text>
      ) : lubesData.length === 0 ? (
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', fontFamily:'monospace', marginBottom: 20, textAlign: 'center' }}>
          Available Lubricants List
        </Text>
      ) : (
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap',margin:12, justifyContent: 'center' }}>
          {lubesData.map((lube, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: '48%',
                aspectRatio: 1,
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 6,
                marginHorizontal:3,
                borderRadius: 10,
                padding: 10,
                borderColor: 'green',
                borderWidth: 8,
              }}
              onPress={() => handleGridPress(lube.lube_name, lube.Amount, lube.lube_category)}
            >
              <Text style={{ fontSize: 22, fontWeight: '900', color: 'yellow', textAlign: 'center' }}>{`${lube.lube_name}\n${lube.Amount}`+' LTR'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default GridPage;
