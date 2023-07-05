import React, { Component } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Input from '../../components/UI/Input/Input'
import ReactAux from '../../hoc/ReactAux/ReactAux'
import classes from './Register.module.css'
import SearchForm from '../SearchForm/SearchForm'
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
                    stationCode: true,
                    length: 7
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    layout: 'inline'
                },
                value: '',
                validation: {
                    required: true,
                    stationCode: true,
                    length: 8
                },
                valid: false,
                touched: false
            },
            confirmPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm password',
                    layout: 'inline'
                },
                value: '',
                validation: {
                    required: true,
                    stationCode: true,
                    length: 8
                },
                valid: false,
                touched: false
            }

        },
        valid: false
    }

    checkValidity = (id, data, rules) => {
        let isValid = true;
        
        if (rules.required) {
            isValid = data[id].value.length > 0 && true
        }
        isValid = data[id].value.length >= rules.length && true;
        if(id === 'confirmPassword'){
            isValid = (data[id].value === data['password'].value && data[id].value.length >= rules.length ) && true;
        }


        return isValid;
    }

    inputChangedHandler(event, id) {
        //DELAY IN READING STRING VALUE
        var updatedSearchForm = {
            ...this.state.searchForm
        }
        const updatedSearchFormData = {
            ...updatedSearchForm[id]
        }

        updatedSearchFormData.value = event.target.value;
        updatedSearchForm[id].value = updatedSearchFormData.value

        updatedSearchForm[id].valid = this.checkValidity(id, updatedSearchForm, updatedSearchFormData.validation)

        this.setState({ searchForm: updatedSearchForm })

        console.log(this.state.searchForm[id].value, this.state.searchForm[id].value.length)

    }
    
    dataHandler = () => {
        
    }

    onClickHandler = (event, id) => {
        var searchFormCopy = {
            ...this.state.searchForm
        }
        var searchFormTouched = {
            ...searchFormCopy[id].touched
        }
        console.log(id)
        searchFormTouched = true;
        searchFormCopy[id].touched = searchFormTouched
        console.log(searchFormCopy[id].touched)

        this.setState({ searchForm: searchFormCopy })
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
                    clicked={(event) => this.onClickHandler(event, id)}
                />
            )
        })

        return (
            <ReactAux class={classes.RegisterForm}>
                <h1>Register</h1>
                <form onSubmit={this.dataHandler}>
                    {toRender}
                    <Button disabled={!this.state.valid} >Register</Button>
                </form>

            </ReactAux>
        )
    }
}


export default Login;