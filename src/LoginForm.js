import React from 'react'
import './LoginForm.scss'
import AuthApiService from './auth-api-service'
import TokenService from './token-service'
import ValidationError from './ValidationError'
import { Route ,Link } from 'react-router-dom'


class LoginForm extends React.Component {
    static defaultProps = {
        onLoginSuccess: () => { }
    };

    constructor(props) {
        super(props)
        this.state = {
            email: '',
			hidediv:false,
            password: '',
            user: '',
            error: null,
            emailValid: false,
            passwordValid: false,
            validationMessages: {
                email: '',
                password: '',
            }
        }
    }


    // Handle user login and create auth token 
    handleSubmitJwtAuth = ev => {
        ev.preventDefault();
        this.setState({ error: null , hidediv:true});
        const { email, password } = ev.target
        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            .then(res => {
                email.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                TokenService.saveUserId(res.userid)
                window.location = '/search';
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    addEmail(email) {
        this.setState({ email }, () => { this.validateEmail(email) });
    }

    addPassword(password) {
        this.setState({ password }, () => { this.validatePassword(password) });
    }

    validateEmail(fieldValue) {
        const fieldErrors = { ...this.state.validationMessage }
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
            fieldErrors.email = 'Email is required';
            hasError = true;
        } else {
            if (fieldValue.length < 3) {
                fieldErrors.email = 'Email must be at least 3 characters long';
                hasError = true;
            } else {
                fieldErrors.email = '';
                hasError = false;
            }
        }

        this.setState({
            validationMessages: fieldErrors,
            emailValid: !hasError
        }, this.formValid);
    }

    validatePassword(fieldValue) {
        const fieldErrors = { ...this.state.validationMessage }
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
            fieldErrors.password = 'Password is required';
            hasError = true;
        } else {
            if (fieldValue.length < 8) {
                fieldErrors.password = 'Password must be at least 8 characters long';
                hasError = true;
            } else {
                fieldErrors.password = '';
                hasError = false;
            }
        }

        this.setState({
            validationMessages: fieldErrors,
            passwordValid: !hasError
        }, this.formValid);
    }

    formValid() {
        this.setState({
            formValid: this.state.emailValid && this.state.passwordValid
        });
    }

    render() {
        const { error } = this.state;
        return (
            <div className="login-form" >
                <form className="sign-in-main" onSubmit={this.handleSubmitJwtAuth}>
                    <fieldset className='login-fieldset'>
                        <h4 className='sign-in-legend'>Sign In</h4>
                        <label htmlFor='email-input' className='sign-in-email'>Email</label>
                        <input
                            type='text'
                            name='email'
                            id='email-input'
                            value={this.state.email}
                            onChange={e => this.addEmail(e.target.value)}
                        />
                        <ValidationError className='validation-error'
                            hasError={!this.state.emailValid} message={this.state.validationMessages.email} />
                        <label htmlFor='password-input' className='sign-in-password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password-input'
                            value={this.state.password}
                            onChange={e => this.addPassword(e.target.value)}
                        />
                        <ValidationError hasError={!this.state.passwordValid} message={this.state.validationMessages.password} />
                        <div className="error" role="alert">
                            {error && <span className="login-error">{error}</span>}
                            <p>*Email/Password are case sensitive</p>
                        </div>
                        <button type="submit" className='btn draw-border'>Sign In</button>
                        <section className='demo-login-info'>
                            <h2>Demo login info:</h2>
                            <p>Email: testuser101@email.com</p>
                            <p>Password: Testuser101!</p>
                        </section>
                    </fieldset>
                </form>
            </div>
        )
    }

}

export default LoginForm;