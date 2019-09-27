import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';
import styles from './styles';

export default function Home() { 
  const { navigate } = useNavigation();
  const navigation = useNavigation();

  return (
    <Container>
      <Header style={{backgroundColor: '#1d814c'}} androidStatusBarColor='#2d914c'>
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={styles.whiteButtons} />
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <Title style={styles.whiteButtons}>Jogue Limpo</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigate('Developers') }}>
            <Icon name='planet' style={{color: '#1d844c'}}/>
          </Button>
        </Right>
      </Header>
      <Container style={styles.homeContainer}>
        <View>
          <TouchableOpacity activeOpacity={.7} style={{ marginBottom: 15 }} onPress={() => { navigate('About') }}>
            <Image source={require('../assets/logo.png')} style={styles.homeImageButton} resizeMode='center'/>  
          </TouchableOpacity>
          <Button iconLeft style={styles.largeButton} onPress={() => { navigate('CataTreco') }}>
            <Icon name='cart'/>  
            <Text style={styles.homeButtonsText}>CATA-TRECO</Text>
          </Button>
          <Button iconLeft style={styles.largeButton} onPress={() => { navigate('Gathering') }}>
            <Icon name='trash'/>
            <Text style={styles.homeButtonsText}>COLETA</Text>
          </Button>
          <Button iconLeft style={styles.largeButton} onPress={() => { navigate('Complaints') }}>
            <Icon name='megaphone'/> 
            <Text style={styles.homeButtonsText}>DENÚNCIAS</Text> 
          </Button> 
          <Button iconLeft style={styles.largeButton} onPress={() => { navigate('Mural') }}>
            <Icon name='images'/>
            <Text style={styles.homeButtonsText}>MURAL</Text>
          </Button>
        </View>
      </Container>
    </Container>
  );    
}