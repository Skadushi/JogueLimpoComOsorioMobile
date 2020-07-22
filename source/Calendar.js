import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, Modal,StatusBar, ActivityIndicator } from 'react-native';
import { Container, Header, Title, Footer, FooterTab, Content, Button, H1, Left, Right, Body, Icon, Text, H3, List, ListItem, Card, CardItem, Thumbnail } from 'native-base';
import styles from './styles';
import axios from 'axios';
import URL_API from './Config/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ItemListCalendar from './Components/ItemListCalendar';

export default function Calendar() {
  const navigation = useNavigation();
  const [ visible, setVisible ] = useState(false);
  const [ events, setEvents ] = useState([]);
  const [urlImageModal, seturlImageModal] = useState('');
  const [ month, setMonth ] = useState('');
  const [ monthEvents, setMonthEvents ] = useState([]);
  const [ current, setCurrent ] = useState(0);
  const [ loadComplete, setLoadComplete ] = useState(false);

  async function getEventsFromApi() {
    /*try {
      let response = await fetch(
        'https://api.myjson.com/bins/15wlyq'
      );
      let responseJson = await response.json();
      setEvents(responseJson.list);
      setMonth(responseJson.list[0].month);
      setMonthEvents(responseJson.list[0].events);
      setLoadComplete(true);
      console.log(responseJson.list);
    } catch (error) {
      console.error(error);
    }*/
    try {
      const response = await axios.get(URL_API.calendars);
      setEvents(response.data);
      console.log('dados buscados da api...');
      console.log(response.data);
      setLoadComplete(true);
    } catch (err) {
      console.log('calendar-caiu no catch..');
      console.log(err);
    }
  }

  useEffect(() => {
    getEventsFromApi();
  }, []);

  /*useEffect(() => {
    if(loadComplete){
      setMonth(events[current].month);
      setMonthEvents(events[current].events);
    }
  });*/

  const prevMonth = () => {
    if(current - 1 === -1){
      setCurrent(events.length - 1);
    } else {
      setCurrent(current - 1);
    }
  }

  const nextMonth = () => {
    if(current + 1 === events.length){
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  }

  function showModal(){
      
      return(
        <Modal visible={visible} 
          transparent={true}
          onRequestClose={()=>{
            //console.log("modal has been closed");
          }} 
          >
          <Header style={{backgroundColor: 'black'}} androidStatusBarColor='black'>
            <Left style={{flex: 0}}>
                <Button style={{backgroundColor: 'black'}} onPress={() => { setVisible(false)}}>
                    <Icon style={styles.whiteButtons} name='arrow-back' />
                </Button>
            </Left>
                <Body style={{flex: 2}}/>
                <Right />
          </Header>
          <View style={{flex:1}}>
          {
            <Image resizeMode='cover' style={{flex:1}} source={{uri:urlImageModal}}/>
          }
          </View> 
        </Modal>
      );
  }

  


  return (
    <Container>
      <Header style={styles.anatomy} androidStatusBarColor='#2d914c'>
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={{color: 'white'}} />
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <Title style={{color: 'white', marginLeft:15}}>Calendário</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={{color: 'white'}} />
          </Button>
        </Right>
      </Header>
      <Content style={styles.content}>
        {
          !loadComplete ?
            <ActivityIndicator size='large' color='#529C52' style={{ paddingTop: 25 }}/>
            :
            <View style={styles.calendarContainer}>
              <H1 style={styles.aboutTitle}>{'Eventos ' /*+ month*/}</H1>
              <View style={{marginTop: 10}}>
                <List
                  dataArray={/*monthEvents*/events}
                  renderRow={(data) =>

                    <Card >
                      <CardItem bordered style={{backgroundColor:'#dbfad6'}}>
                        <Body>
                          <H3 style={styles.h3s}>{data.title}</H3>
                        </Body>
                      </CardItem>
                      <CardItem bordered style={{backgroundColor:'#dbfad6'}}>
                        <Body>
                          <TouchableOpacity activeOpacity={.7} onPress={()=>{
                              seturlImageModal('http://saude.osorio.rs.gov.br:3003/'+data.image);
                              setVisible(true);
                          }} >
                            <Thumbnail square style={{height:300,width:300}} source={{uri:'http://saude.osorio.rs.gov.br:3003/'+data.image}}/>  
                          </TouchableOpacity>
                        </Body>
                      </CardItem>
                      <CardItem bordered style={{backgroundColor:'#dbfad6'}}>
                        <Body> 
                          <ItemListCalendar dataText={data.description}/>
                        </Body>
                      </CardItem>
                    </Card>

                    }
                />
              </View>
            </View>
        }
        {
          showModal()
        }
      </Content>
      <Footer>
        <FooterTab style={styles.anatomy}>
          <Button iconLeft style={styles.button} onPress={prevMonth}>
            <Text>
              <Icon name='return-left' style={styles.arrowButtons}/>
            </Text>
          </Button>
          <Button disabled style={styles.footerButton}>
            {
              !loadComplete ? 
                <Text style={styles.footerButtonText}>Mês/Ano</Text>
                :
                <Text style={styles.footerButtonText}>mes/ano{ /*month.slice(0, 3) + '/' + month.slice(-2)*/ }</Text>
            }
          </Button>
          <Button iconRight style={styles.button} onPress={nextMonth}>
            <Text>
              <Icon name='return-right' style={styles.arrowButtons}/>
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );    
}