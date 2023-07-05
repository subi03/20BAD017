import React, { Component } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Input from '../../components/UI/Input/Input'
import ReactAux from '../../hoc/ReactAux/ReactAux'
import classes from './Login.module.css'
import Button from '../../components/UI/Button/Button'

class Login extends Component {

    state = {
        searchForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username',
                    layout: 'inline'
                },
                value: '',
                validation: {
                    required: true,
                    stationCode: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    layout: 'inline'
                },
                value: '',
                validation: {
                    required: true,
                    stationCode: true
                },
                valid: false,
                touched: false
            },
            // verificationToggle: {
            //     elementType: 'checkbox',
            //     checked: false,
            //     validation: {
            //         required: true,
            //         stationCode: true
            //     },
            //     touched: false
            // }
        },
        valid: false
    }

    inputChangedHandler(event, id) {
        var searchForm = {
            ...this.state.searchForm
        }
        if (id === 'verificationToggle') {
            var verificationToggle = {
                ...searchForm[id]
            }

            searchForm.verificationToggle.checked = !verificationToggle.checked

            console.log(searchForm.verificationToggle.checked)

            this.setState({ searchForm: searchForm })
        } else {
            var inputVal = {
                ...searchForm[id]
            }
            inputVal = event.target.value
            searchForm[id].value = inputVal
            this.setState({ searchForm })


        }
    }

    onClickHandler = (event, id) => {

    }

    render() {
        const formArray = []
        let toRender = null;

        for (let key in this.state.searchForm) {
            formArray.push({
                id: key,
                config: this.state.searchForm[key]
            })
        }

        toRender = formArray.map(formItem => {
            var id = formItem.id
            return (
                <Input
                    key={id}
                    changed={(event) => this.inputChangedHandler(event, id)}
                    value={formItem.config.value}
                    elementType={formItem.config.elementType}
                    elementConfig={formItem.config.elementConfig}
                    disabled={this.state.inputsDisabled}
                    checked={formItem.config.checked}
                    label={formItem.config.label}
                    isValid={formItem.config.valid}
                    touched={formItem.config.touched}
                    clicked={(event) => this.onClickHandler(event, formItem.id)}
                />
            )
        })

        return (
            <ReactAux class={classes.LoginForm}>
                <h1>Login</h1>
                <form>
                    {toRender}
                    <Button disabled={!this.state.valid} >Search</Button>
                </form>
            </ReactAux>
        )
    }
}


export default Login;