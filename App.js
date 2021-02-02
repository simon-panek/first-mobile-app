import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Linking, TouchableOpacity } from 'react-native';
// import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default function App() {
  const [name, setName] = useState('');
  const [contacts, setContacts] = useState([]);
  // const [Permissions, setPermissions] = useState(false);
  const [cameraPermissions, setCameraPermissions] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const ref = useRef(null);
  
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

  const getPermissions =  async () => {
    // const { statusContacts } = await Permissions.askAsync(Permissions.Contacts);
    // let { statusCamera } = Permissions.askAsync(Permissions.CAMERA);
    const statusCamera = await Permissions.getAsync(Permissions.CAMERA);
    console.log({statusCamera});
    if(statusCamera !== 'granted') {
      const statusTwoCamera= await Permissions.askAsync(Permissions.CAMERA);
      console.log('statusTwoName', {statusTwoCamera});
    
    // if(statusContacts === 'granted'){
    //   setPermissions(true);
    // } else {
    //   setPermissions(false);
    // }
    if(statusTwoCamera.status === 'granted'){
      console.log('Permission granted');
      setCameraPermissions(true);
    } else {
      setCameraPermissions(false);
    }
    }
  }

  // const takePicture = async () => {
  //   console.log('Taking Picture Now');
  //   await onCameraReady();
  //   await takePictureAsync();
  // }

  const takePicture = async () => {       
    console.log('Taking Picture Now');
    const photo = await ref.current.takePictureAsync();
    console.log({photo});
    console.log('Photo taken and should have been logged before this message');
    // if (camera) {
    //    console.log('Taking photo');
    //    const options = { quality: 1, base64: true, fixOrientation: true, 
    //    exif: true};
    //    await camera.takePictureAsync(options).then(photo => {
    //       photo.exif.Orientation = 1;            
    //        console.log(photo);            
    //        });     
    //  }
    }

  useEffect (() => {
    getPermissions();
    // const types = await Camera.getAvailableCameraTypesAsync();
    // console.log({types});
  },[])

  //Below always returns 'no camera permissions granted' because status above is undefined
  if(cameraPermissions !== true){
    return <Text style={styles.text}>No camera permissions granted!</Text>
  }
  
  if(cameraPermissions === true){
    console.log('Permission rendering');
  
  return (
    <View style={styles.container}>
      <Text>
        Welcome to PicNote
      </Text>
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
   
    <Camera style={styles.cameraView} type={type} ref={ref}>
      <TouchableOpacity onPress={takePicture}>
      {/* <View> */}
        {/* <TouchableOpacity
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
              );
            }}>
            <Text>Flip</Text>
          </TouchableOpacity> */}
      {/* </View> */}
          {/* <Text>
            Capture Picture
          </Text> */}
        </TouchableOpacity>
      </Camera>
      <Button 
      onPress ={()=> takePicture()}
      title="Capture Picture"
    ></Button>

      <StatusBar style="auto" />
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  text: {
    marginTop: '15%',
    padding: '5%',
    fontWeight: 'bold'
  }, 
  cameraView: {
    width: '80%',
    height: '80%'
  }
});

