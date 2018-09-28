import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './component/MessageList'
import SendMessageForm from './component/SendMessageForm'
import TypingIndicator from './component/TypingIndicator'
import WhosOnlineList from './component/WhosOnlineList'

export default class ChatScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: [],
            usersWhoAreTyping: [],
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.sendTypingEvent = this.sendTypingEvent.bind(this)
    }
    
   
    sendTypingEvent() {
        this.state.currentUser
          .isTypingIn({ roomId: this.state.currentRoom.id })
          .catch(error => console.error('error', error))
     }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            text, 
            roomId: this.state.currentRoom.id,
        })
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:dda8a9b5-5d23-4b7b-84ba-c2ce5bd5ffd8',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/dda8a9b5-5d23-4b7b-84ba-c2ce5bd5ffd8/token',
            }),
        })

        chatManager
            .connect()
            .then( currentUser => {
                this.setState({ currentUser })
            return currentUser.subscribeToRoom({
                roomId: 17233969,
                messageLimit: 100,
                hooks: {
                    onNewMessage: message => {
                        this.setState({
                            messages: [ ...this.state.messages, message],
                        })
                    },
                    
                    userStartedTyping: user=> {
                        this.setState({
                            usersWhoAreTyping: [...this.State.usersWhoAreTyping, user.name],
                         })
                     },
                    userStoppedTyping: user => {
                        this.setState({
                             usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                            username=> username!== user.name
                        ),
                    })
                },
                onUserCameOnline: () => this.forceUpdate(),
                onUserWentOffline: () => this.forceUpdate(),
                onUserJoined: () => this.forceUpdate(),
                },
                })
            })
            
            .then(currentRoom => {
                this.setState({ currentRoom })
            })
            .catch(error => console.error('error', error))
        }
    
    
    render() {
        const styles = {
            container: {
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            },
            chatContainer: {
                display: 'flex',
                flex: 1,
            },
            whosOnlineListContainer : {
                width: '200px',
                flex: 'none',
                padding: 20,
                backgroundColor: '#2c303b',
                color: 'white',
            },
            chatListContainer: {
                padding: 20,
                width: '85%',
                display: 'flex',
                flexDirection: 'column',
            },
        }

        return (
            <div style={styles.container}>
                <div style={styles.chatContainer}>
                <aside style={styles.whosOnlineListContainer}>
                <h3> Users </h3>
                <WhosOnlineList currentUser={this.state.currentUser} users={this.state.currentRoom.users} />
                </aside>
                <section style={styles.chatListContainer}>
                <MessageList messages={this.state.messages} style={styles.chatList}/>
                <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent}/>
                </section>
                </div>
            </div>
        )
        }
    }
