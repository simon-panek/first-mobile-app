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
  const [displayCamera, setDisplayCamera] = useState(false);
  const [displayLastPic, setDisplayLastPic] = useState(false);
  const [displayCameraButton, setDisplayCameraButton] = useState(true);
  const [displayViewNotes, setDisplayViewNotes] = useState(true);
  const [displayAllNotes, setDisplayAllNotes] = useState(false);
  const [testImage, setTestImage] = useState();
  const [description, setDescription] = useState('');
  const [completeNotes, setCompleteNotes] = useState([]);
  const [totalNotes, setTotalNotes] = useState(0);
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

  const openCamera = () => {
    setDisplayCamera(true);
    setDisplayCameraButton(false);
    setDisplayViewNotes(false);
    setDisplayAllNotes(false);
  }

  const viewNotes = () => {
    setDisplayViewNotes(false);
    setDisplayAllNotes(true);
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
    setDisplayCamera(false);
    setDisplayLastPic(true);
  }

  const submitDescription = () => {
    console.log({description});
    setDisplayCamera(false);
    setDisplayLastPic(false);
    setDisplayCameraButton(true);
    setDisplayViewNotes(true);

    let newNoteID = totalNotes + 1;
    let newNoteUri = picNotes[picNotes.length-1].uri;
    let newNoteDescription = description;
    let newNote = {id: newNoteID, uri: newNoteUri, description: newNoteDescription};
    setCompleteNotes([...completeNotes, newNote]);
    setTotalNotes(newNoteID);
    setDescription('');
  }

  useEffect (()=> {
    console.log('State: picNotes ', picNotes);
    console.log('State: description ', description);
    console.log('State: completeNotes ', completeNotes);
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
        <Text style={styles.welcome}>
          Welcome to PicNote
        </Text>
        <Text style={styles.totalNotes}>
          Notes: {totalNotes}
        </Text>
        <View>
          { (!displayCameraButton) ? <Text></Text> : 
          <Button 
            onPress={openCamera}
            title="Add PicNote"
          ></Button>
          }
        </View>
        <View>
          { (!displayViewNotes) ? <Text></Text> : 
          <Button 
            onPress={viewNotes}
            title="View Notes"
          ></Button>
          }
        </View>
        <View>
          { (!displayCamera) ? <Text></Text> :
          <View>
            <Camera style={styles.cameraView} type={type} ref={ref}>
              <TouchableOpacity onPress={takePicture}>
              </TouchableOpacity>
            </Camera>
            <Button 
              onPress ={()=> takePicture()}
              title="Capture Picture"
            ></Button> 
          </View>
          } 
        </View>
        <View>
          { (!displayLastPic) ? <Text></Text> : 
          <View style={styles.descriptionStyle}>
            <Image source={{ uri: `${picNotes[picNotes.length-1].uri}` }} style={{width: 100, height: 150 }}/>
                <StatusBar style="auto" />
                <TextInput 
                  style={{ height: '15%', width: '150%', borderColor: 'black', borderWidth: 1 }}
                  placeholder="Enter Description Here"
                  onChangeText={text => setDescription(text)}
                  value={description}
                />
                <Button 
                  onPress={submitDescription}
                  title='Submit Description'
                ></Button>
            </View>
          }
          </View>
          <View>
            { (!displayAllNotes) ? <Text></Text> : 
            <View>
              <FlatList
                data={completeNotes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(item, idx)=> {
                  return ( <View>
                    <Image source={{ uri: `${item.item.uri}` }} style={{width: 200, height: 300 }}/>
                    <Text style={styles.listText}>{item.item.description}</Text>
                  </View> )}
                }
              ></FlatList>
            </View>
            }
          </View>
          <Text>
            &copy; 2021 SP
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ada5a5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    width: '100%'
  },
  text: {
    marginTop: '15%',
    padding: '5%',
    fontWeight: 'bold'
  }, 
  cameraView: {
    alignSelf: 'center',
    width: '170%',
    height: '85%'
  },
  welcome: {
    fontSize: 18,
    margin: '5%'
  }, 
  listText: {
    textAlign: 'center',
    margin: '2.5%', 
    marginBottom: '10%'
  },
  totalNotes: {
    margin: '10%',
    marginTop: '20%',
    textAlign: 'center'
  },
  footer: {
    marginBottom: '15%'
  },
  descriptionStyle: {
    alignItems: 'center'
  }
});

