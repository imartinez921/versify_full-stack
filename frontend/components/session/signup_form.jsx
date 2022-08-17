import React from 'react';
import BirthdayItem from './signup_items/birthday_item';

class SignupForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailConfirmation: '',
            password_confirmation: '',
            username: 'Enter a profile name',
            yearValue: '',
            monthValue: '',
            dayValue: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput (field) {
        return (e) => {
            this.setState({ [field]: e.target.value })
        };
    }

    handleSubmit (e) {
        e.preventDefault();
        const { email, emailConfirmation, password, password_confirmation, 
            username, yearValue, monthValue, dayValue,
            } = this.state;
        
        //Reformat birthday to Date object
        const bdayStr = ( yearValue+'/'+monthValue+'/'+dayValue )
        console.log('bdayStr', bdayStr)
        const dateBday = new Date(bdayStr + "Z");

        //Setup User object for User#create
        const formUser = {
            email: email,
            emailConfirmation,
            birthday: dateBday,
            username: username,
            password: password,
            password_confirmation,
        }

        this.props.createUser(formUser)
            .then ( () => this.props.history.push('/playlists'));
        // using playlists as the home webpage after login
        
    }


    render() {
        const { email, emailConfirmation, password, password_confirmation, username} = this.state
        return (
            <div className='signup-page'>
                <h1>Sign up for free to start listening.</h1>
                <h2>LOG IN AS DEMO USER - GOOGLE STYLING PLACEHOLDER
                    <p />or
                    <p />Sign up with your email address.
                </h2>

                <form className='session-form'>
                    <p /><label>What's your email?
                        <p /><input 
                                type="text" 
                                value={this.state.email} 
                                onChange={this.handleInput('email')}
                            />
                    </label>
                    
                    <p /><label>Confirm your email
                        <p /><input 
                                type="text" 
                                value={this.state.emailConfirmation} 
                                onChange={this.handleInput('emailConfirmation')}
                            />
                    </label>

                    <p /><label>Create a password
                        <p /><input 
                                type="password" 
                                value={this.state.password} 
                                onChange={this.handleInput('password')}
                            />
                    </label>

                    <p /><label>Confirm your password
                        <p /><input 
                                type="password" 
                                value={this.state.password_confirmation} 
                                onChange={this.handleInput('password_confirmation')}
                            />
                    </label>

                    <p /><label>What should we call you?
                        <p /><input 
                                type="text" 
                                value={this.state.username} 
                                onChange={this.handleInput('username')}
                            />
                    </label>

                  <BirthdayItem handleSubmit={this.handleSubmit}
                    handleInput={this.handleInput.bind(this)}
                    monthValue={this.state.monthValue}
                    />

                    <p /><button onClick={this.handleSubmit}>Sign Up</button>
                </form>

            </div>
        )
    }
}

export default SignupForm;