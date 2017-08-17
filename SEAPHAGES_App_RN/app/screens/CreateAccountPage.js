/**
 * Created by wenzelmk on 7/17/17.
 */

import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Form, Item, Input, Label, Button, Icon, Left, Card, Text } from 'native-base';
import { Alert } from 'react-native';
import styles from '../config/styles';
import { NavigationActions, } from 'react-navigation';
import Meteor, { Accounts, createContainer } from 'react-native-meteor';


const backAction = NavigationActions.back({key: null});


class CreateAccountPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //name: '',
            email: '',
            username: '',
            password: '',
            passwordConfirm: '',
        };
    }

    createAccount = () => {
        const { username, email, password, passwordConfirm } = this.state;

        if (email.length === 0 || username.length === 0 || password.length === 0 || password !== passwordConfirm) {
            return (
                Alert.alert(
                    'Missing information',
                    'Username, email, and password are required',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
            );
        }

        if (password !== passwordConfirm) {
            return (
                Alert.alert(
                    'Password mismatch',
                    'Your passwords do not match',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
            );
        }

        const emailValidator = /(?=.*@)(?=.*edu)/;
        if (emailValidator.test(email) === false) {
            return (
                Alert.alert(
                    'Only .edu emails accepted',
                    'Make sure you are using a valid .edu email',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
            );
        }

        const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,20}$/;
        //regex verifies that password matches:
        //8-20 characters
        //1 lowercase, 1 uppercase
        //1 digit, 1 symbol

        if (passwordValidator.test(password) === false) {
            return (
                Alert.alert(
                    'Insecure password',
                    'Please make sure that your password contains: 8-20 characters, 1 lowercase, 1 uppercase, 1 digit, and 1 symbol.',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
            );
        }

        return Accounts.createUser({ username, email, password }, (err) => {
            if (err) {
                console.log("Account creation failed")
                return (
                    Alert.alert(
                        'Account creation failed',
                        err.reason,
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                    )
                ),
                this.props.navigation.dispatch(backAction);
            } else {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'signedInStackCall' }),
                    ],
                });
                return (
                    Alert.alert(
                        'Account creation successful',
                        'Click OK to continue to main page and log in.',
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                    )
                ),
                this.props.navigation.dispatch(backAction);
            }
        });

    };

    render() {
        return (
            <Container>
                <Header style = {styles.header}>
                        <Button transparent light
                                onPress={() => this.props.navigation.dispatch(backAction)}
                                title='Go back to Sign In Page'>
                            <Icon name='arrow-back' />
                        </Button>
                    <Body>
                    <Title style = {styles.headerTitle}>Create an Account</Title>
                    </Body>
                </Header>

                <Content
                    style = {styles.contentStyle}
                >
                    <Card
                        style={styles.cardStyle}>
                        <Form>
                            <Item floatingLabel>
                                <Label>Username</Label>
                                <Input
                                    autoCapitalize = {'none'}
                                    autoCorrect = {false}
                                    onChangeText={(username) => this.setState({ username })}
                                    value={this.state.username}/>
                            </Item>
                            <Item floatingLabel>
                                <Label>Email (please use your '.edu' account)</Label>
                                <Input
                                    autoCapitalize = {'none'}
                                    autoCorrect = {false}
                                    onChangeText={(email) => this.setState({ email })}
                                    value={this.state.email}/>
                            </Item>
                            <Item floatingLabel>
                                <Label>Password (8-20 characters, 1 lowercase, 1 uppercase, 1 digit, 1 symbol)</Label>
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={(password) => this.setState({ password })}
                                    value={this.state.password}
                                />
                            </Item>
                            <Item
                                floatingLabel
                                last>
                                <Label>Confirm Password</Label>
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={(passwordConfirm) => this.setState({ passwordConfirm })}
                                    value={this.state.passwordConfirm}/>
                            </Item>
                        </Form>
                      </Card>
                </Content>
                <Button block
                        style= {styles.buttonBlock}
                        onPress={this.createAccount}>
                    <Icon name='ios-key-outline' />
                    <Text>Create Account</Text>
                </Button>
            </Container>
        );
    }

}


export default CreateAccountPage;

//removed 'Full Name' input since info is not adding to database currently
/*<Item floatingLabel>
    <Label>Full Name</Label>
    <Input
        onChangeText={(name) => this.setState({ name })}
        value={this.state.name}/>
</Item>*/
