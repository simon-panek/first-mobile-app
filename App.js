import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Linking, TouchableOpacity, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
// import { CachedImage, CacheManager } from 'react-native-expo-image-cache';
// import * as FileSystem from 'expo-file-system';

export default function App() {
  const [name, setName] = useState('');
  const [contacts, setContacts] = useState([]);
  const [cameraPermissions, setCameraPermissions] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [picNotes, setPicNotes] = useState([]);
  const [displayCamera, setDisplayCamera] = useState(true);
  const [testImage, setTestImage] = useState();
  const ref = useRef(null);
  
  const getPermissions =  async () => {
    const statusCamera = await Permissions.getAsync(Permissions.CAMERA);
    console.log({statusCamera});
    if(statusCamera !== 'granted') {
      const statusTwoCamera= await Permissions.askAsync(Permissions.CAMERA);
      console.log('statusTwoName', {statusTwoCamera});
    
      if(statusTwoCamera.status === 'granted'){
        console.log('Permission granted');
        setCameraPermissions(true);
      } else {
        setCameraPermissions(false);
      }
    }
  }

  const takePicture = async (imageDescription) => {       
    console.log('Taking Picture Now');
    const photo = await ref.current.takePictureAsync();
    console.log({photo});
    console.log('Photo taken and should have been logged before this message');
    let URI = photo.uri;
    let newNote = { uri: photo.uri, description: imageDescription };
    console.log({newNote});
    setPicNotes([...picNotes, newNote]);
  }

  useEffect (()=> {
    console.log('State: picNotes ', picNotes);
  })

  useEffect (() => {
    getPermissions();
  },[])

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
        <Camera style={styles.cameraView} type={type} ref={ref}>
          <TouchableOpacity onPress={takePicture}>
          </TouchableOpacity>
        </Camera>
        <TextInput type="text" placeholder="Enter Description Here"></TextInput>
        <Button 
          onPress ={()=> takePicture()}
          title="Capture Picture"
        ></Button>
        <Image source={{ uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540paneks19%252Ffirst-mobile-app/Camera/c0d5e35a-dff6-46a3-8147-b3ed1df643f3.jpg' }} style={{width: 100, height: 150 }}/>
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
    width: '70%',
    height: '70%'
  }
});

