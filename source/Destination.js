import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Content, Tabs, Tab, ScrollableTab, Button, Title, Left, Right, Body, Icon, Text } from 'native-base';

import Transhipment from './DestinationTabs/Transhipment';
import Electronic from './DestinationTabs/Electronic';
import Mercury from './DestinationTabs/Mercury';

const styles = StyleSheet.create({
  statusBarAndroid: {
    flex: 1,
    ...Platform.select({
      android: {
          marginTop: StatusBar.currentHeight
      }
    })
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab: {
    backgroundColor: '#5CB85C',
  },
  activeTab: {
    backgroundColor: '#5CB85C',
    fontStyle: 'italic',
  },
  tabs: {
    borderBottomWidth: 2,
    borderBottomColor: '#5CB85C'
  },
  tabsText: {
      color: 'white'
  }
});

export default function Destination() {
  const navigation = useNavigation();

  return (
    <Container>
      <Header hasTabs style={{backgroundColor: '#5cb85c'}} androidStatusBarColor="#5CB85C">
        <Left>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Destinação de Resíduos</Title>
        </Body>
        <Right />
      </Header>
      <Tabs tabBarUnderlineStyle={styles.tabs} renderTabBar={() => <ScrollableTab style={styles.tab}/>}>
        <Tab heading="Transbordo" textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <Transhipment />
        </Tab>
        <Tab heading="Lixo Eletrônico" textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <Electronic />
        </Tab>
        <Tab heading="Lâmpadas de Mercúrio" textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <Mercury />
        </Tab>
      </Tabs>
    </Container>
  );
}