import React, { Component } from 'react';
import { Drawer } from 'native-base';
import SideBar from '../components/Sidebar';
import BuyerHome from '../containers/BuyerHome';
import { Container, Header, Content, Button, Text } from 'native-base';

export default class DrawerNativeBase extends Component {
  render() {
    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()} >
          <Container>
            <Header />
            <Content>
              <Button ref={ (c) => this._button = c }>
                <Text>
                Click Me
                </Text>
              </Button>
            </Content>
          </Container>
      </Drawer>
    );
  }
}