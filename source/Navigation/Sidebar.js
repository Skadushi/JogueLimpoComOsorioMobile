import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Content, Text, List, ListItem, Icon, Container, Left, Right, Badge } from "native-base";
import styles from "./style";

const drawerCover = require("../../assets/drawerBackground.png");
const datas = [
  {
    name: "Calendário",
    route: "CataTreco",
    icon: "calendar"
  },
  {
    name: "Cata-Treco",
    route: "CataTreco",
    icon: "cart"
  },
  {
    name: "Coleta",
    route: "CataTreco",
    icon: "trash"
  },
  {
    name: "Denúncias",
    route: "Complaints",
    icon: "megaphone"
  },
  {
    name: "Destinação de Resíduos",
    route: "Destination",
    icon: "paper-plane"
  },
  {
    name: "Leis",
    route: "Laws",
    icon: "paper"
  },
  {
    name: "Mural",
    route: "Mural",
    icon: "images"
  },
  {
    name: "Sobre o Programa",
    route: "About",
    icon: "information-circle"
  },
  // {
  //   name: "Sobre o Aplicativo",
  //   route: "About",
  //   icon: "flame"
  // }
];

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
        <Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
          <TouchableOpacity activeOpacity={.7} onPress={() => this.props.navigation.navigate('Home')}>
            <Image source={drawerCover} style={styles.drawerCover} />
          </TouchableOpacity>
          
          <List
            dataArray={datas}
            renderRow={(data, index) =>
              <ListItem
                key={index}
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={styles.icon}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;