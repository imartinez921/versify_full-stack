import React from 'react';
import { Link,
} from 'react-router-dom';

class SessionForm extends React.Component {
    constructor (props) {
        super(props);
        this.formType = props.formType;
        this.state = {
            email: '',
            password: '',
            emailConfirmation: '',
            password_confirmation: '',
            username: '',
            birthday: '', 
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitDemo = this.handleSubmitDemo.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentWillUnmount() {
        this.props.clearSessionErrors();
    }

    handleInput (field) {
        return (e) => {
            this.setState({ [field]: e.target.value })
        };
    }
    
    handleKeyPress(event) {
        if (event.key === "Enter") {
          this.handleSubmit(event);
        }
    }

    handleSubmitDemo (e) {
        e.preventDefault();
        const formUser = {
            username: 'userdemo',
            password: 'userdemo',
        }
        console.log(formUser)
        this.props.createSession(formUser)
            .then ( () => this.props.history.push('/home'));
        ;
    }

    handleSubmit (e) {
        e.preventDefault();
        const { email, 
            email_confirmation, password_confirmation, 
            username, password,
            birthday,
            } = this.state;

        if (this.formType === 'signup') {
            //Set up User object for User#create
            const formUser = {
                email: email,
                email_confirmation,
                birthday: birthday,
                username: username,
                password: password,
                password_confirmation,
            }
            this.props.createUser(formUser)
                .then ( () => this.props.history.push('/home'));
            // using playlists as the home webpage after login
        }

        if (this.formType === 'login') {
            //Set up User object for Session#create
            const formUser = {
                username: username,
                password: password,
            }
            this.props.createSession(formUser)
                .then ( () => this.props.history.push('/home'));
            // using playlists as the home webpage after login
        }
    }

    render() {
        const { email, emailConfirmation, 
            password, password_confirmation, 
            username, birthday,
        } = this.state

        const navLink = this.props.navLink;
        const demoText = this.props.demoText;
        const greetingText = this.props.greetingText;
        const formText = this.props.formText;

        const demoLogin = (
            <button className="session-button demo-button"
                onClick= {this.handleSubmitDemo}
                >
                {demoText}
            </button>
        )

        const loginForm = (
            <form className='session-form'>
                <p /><label>Username
                    <p /><input 
                            type="text" 
                            placeholder="Username"
                            value={username} 
                            onChange={this.handleInput('username')}
                            onKeyPress={this.handleKeyPress}
                        />
                </label>
                <p /><label>Password
                        <p /><input 
                                type="password" 
                                placeholder="Password"
                                value={password} 
                                onChange={this.handleInput('password')}
                                onKeyPress={this.handleKeyPress}
                            />
                    </label>
                <p />
                <div className="footer-form">
                    <button 
                        className="session-button" 
                        id="login-button" 
                        onClick={this.handleSubmit}
                        >Log In</button>
                </div>
            </form>
        )

        const signupForm = (
            <form className='session-form'>
                <p /><label>What's your email?
                    <p /><input 
                            type="email"
                            placeholder="Enter your email." 
                            value={email} 
                            onChange={this.handleInput('email')}
                            onKeyPress={this.handleKeyPress}
                        />
                </label>
                <p /><label>Confirm your email
                    <p /><input 
                            type="text" 
                            placeholder="Enter your email again." 
                            value={emailConfirmation} 
                            onChange={this.handleInput('emailConfirmation')}
                            onKeyPress={this.handleKeyPress}
                        />
                </label>
                <p /><label>Create a password
                    <p /><input 
                            type="password" 
                            placeholder="Create a password." 
                            value={password} 
                            onChange={this.handleInput('password')}
                            onKeyPress={this.handleKeyPress}
                        />
                </label>
                <p /><label>Confirm your password
                    <p /><input 
                            type="password" 
                            placeholder="Enter your password again." 
                            value={password_confirmation} 
                            onChange={this.handleInput('password_confirmation')}
                            onKeyPress={this.handleKeyPress}
                        />
                </label>
                <p /><label>What should we call you?
                    <p /><input 
                            type="text"
                            placeholder="Enter a profile name." 
                            value={username} 
                            onChange={this.handleInput('username')}
                            onKeyPress={this.handleKeyPress}
                        />
                </label>
                <p /><label>What's your date of birth?
                    <p /><input 
                            type="date" 
                            value={birthday} 
                            onChange={this.handleInput('birthday')}
                            onKeyPress={this.handleKeyPress}
                        />
                </label>
                <p />
                <div className="footer-form">
                    <div id='fine-print'>{ this.props.footerText }</div>
                    <p /><button 
                            className="session-button" 
                            id="signup-button" 
                            name="user"
                            onClick={this.handleSubmit}
                            >Sign Up</button>
                </div>
            </form>
        )

        // Refactor not to use index as key
        const logErrors = (
            <div className="error-list">
                <ul>
                    {this.props.errors.map( (err, index) => (
                        <li id='session-error-item' key={`${index}-err`}>{err}</li>
                    ))}
                </ul>
            </div>
        )

        const display = (this.formType === 'signup' ?  signupForm : loginForm)

        return (
            <div className='session'>
                <div className="greeting-n-demo">
                    <h2>{greetingText}</h2> 
                    <br />{demoLogin}
                </div>
                <div className='form-title'>
                    <div className="divider">
                        <div className="line"></div>
                        <p>or</p>
                        <div className="line"></div>
                    </div>
                    <p>{formText}</p>
                </div>
                {logErrors}
                {display}
                <Link to={navLink.link} className='footer-link'>{navLink.text}</Link>
            </div>
        )
    }
}

export default SessionForm;