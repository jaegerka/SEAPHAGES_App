/**
 * Created by wenzelmk on 7/17/17.
 */

import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Form, Item, Input, Label, Button, Icon, Card, Text } from 'native-base';
import styles from '../config/styles';
import { Alert } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import { NavigationActions, } from 'react-navigation';



class SignInPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usernameOrEmail: '',
            password: '',
        };
    }

    handleCreateAccountPress = () => {
        this.props.navigation.navigate('createAccountPageCall');
    };

    handleSignInPress = () => {
        const { usernameOrEmail, password } = this.state;

        if (usernameOrEmail.length === 0 || password.length ===0) {
            return (
                Alert.alert(
                    'There is a problem!',
                    'Please make sure you have filled in all fields!',
                    [
                        {text: 'Okay!', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                ))
        }

        this.setState({ loading: true });
        return Meteor.loginWithPassword(usernameOrEmail, password, (err) => {
            this.setState({ loading: false });
            if (err) {
                console.log('error', 'Error', err.reason);
            } else {
                /*const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'signedInStackCall' }),
                    ],
                });
                this.props.navigation.dispatch(resetAction);*/
                this.props.navigation.navigate('signedInStackCall')
            }
        });
    };

    render() {
        return (
            <Container>
                <Header style = {styles.header}>
                    <Body>
                    <Title style = {styles.headerTitle}>Sign In</Title>
                    </Body>
                </Header >

                <Content style = {styles.contentStyle}>
                    <Card>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username or Email</Label>
                            <Input
                                onChangeText={(usernameOrEmail) => this.setState({ usernameOrEmail })}
                                value={this.state.usernameOrEmail}/>
                        </Item>
                        <Item floatingLabel
                              last>
                            <Label>Password</Label>
                            <Input secureTextEntry={true}
                                   onChangeText={(password) => this.setState({ password })}
                                   value={this.state.password}
                            />
                        </Item>
                    </Form>
              
                    <Button
                        icon
                        block
                        style = {styles.buttonBlock}
                        onPress={() =>  this.handleSignInPress()}>
                        <Icon name='ios-key-outline' />
                        <Text>Sign In</Text>
                    </Button>
                    <Button
                        icon
                        block
                        bordered
                        style = {styles.buttonBordered}
                        onPress={() =>  this.handleCreateAccountPress()}>
                        <Icon style = {styles.buttonBorderedText} name='ios-person-add-outline' />
                        <Text style = {styles.buttonBorderedText}>Create an Account</Text>
                    </Button>

                    </Card>
                </Content>
            </Container>

        );
    }
}

export default SignInPage;

