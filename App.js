import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Linking, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default function App() {
  const [name, setName] = useState('');
  const [contacts, setContacts] = useState([]);
  const [Permissions, setPermissions] = useState(false);
  const [cameraPermissions, setCameraPermissions] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  
  const call = (contact) => {
    //call the contact
    console.log({contact});
    let phoneNumber = contact.phoneNumbers[0].number.replace(/[\(\)\-\s+]/g,'');
    console.log({phoneNumber});
    let link = `tel:${phoneNumber}`;
    Linking.canOpenURL(link)
      .then(supported => Linking.openURL(link))
      .catch(console.error);
  }

  // const showContacts = async () => {
  //   //get all phone contacts
  //   console.log('this should have done something');
  //   const contactList = await Contacts.getContactsAsync();
  //   setContacts(contactList.data);
  // }

  const getPermissions = async () => {
    // const { statusContacts } = await Permissions.askAsync(Permissions.Contacts);
    const { statusCamera } = await Camera.requestPermissionsAsync();
    console.log({statusCamera});
    // if(statusContacts === 'granted'){
    //   setPermissions(true);
    // } else {
    //   setPermissions(false);
    // }
    if(statusCamera === 'granted'){
      setCameraPermissions(true);
    } else {
      setCameraPermissions(false);
    }
  }

  const capturePicture = async () => {
    console.log('Taking Picture Now');
  }

  useEffect (() => {
    getPermissions();
    // const types = await Camera.getAvailableCameraTypesAsync();
    // console.log({types});
  },[])

  return (
    <View style={styles.container}>
      {/* <Text>Welcome {name}</Text>
      <Button 
        onPress={()=> setName('Bob')}
        title="Set Bob"
      ></Button> */}
      {/* <Button
        onPress={showContacts}
        title="Show Contacts"
      ></Button> */}
      {/* <FlatList 
      data={contacts} 
      keyExtractor={(item) => item.id} 
      renderItem={({item})=> <Button title={item.name} onPress={() => call(item)} />}
    ></FlatList> */}
    <Button 
      onPress ={()=> capturePicture()}
      title="Capture Picture"
    ></Button>
    {/* <Camera type={type}> */}
      <View>
        <TouchableOpacity
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
            );
          }}>
            <Text>Flip</Text>
          </TouchableOpacity>
      </View>
    {/* </Camera> */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
});