import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import classes from './SearchForm.module.css'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button'
import ReactAux from '../../hoc/ReactAux/ReactAux';
import Loading from '../../components/UI/Loading/Loading'
import Modal from '../../components/UI/Modal/Modal'
import ConnectedNodes from '../../components/UI/ConnectedNodes/ConnectedNodes'
import StationCodes from '../../assets/station-codes.json'

import * as actions from '../../store/actions/index';


class SearchForm extends Component {

    state = {
        searchForm: {
            train: {
                elementType: 'radio',
                elementConfig: { value: 'train', name: 'transport', layout: 'inline' },
                checked: false,
                value: 'train',
                label: 'Train',
                valid: false,
                validation: {},
                touched: false
            },
            bus: {
                elementType: 'radio',
                elementConfig: { value: 'bus', name: 'transport', layout: 'inline' },
                checked: false,
                value: 'bus',
                label: 'Bus',
                valid: false,
                validation: {},
                touched: false
            },
            departure: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Departure Train',
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
            destination: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Destination train',
                    layout: 'inline'
                },
                value: '',
                validation: {
                    required: true,
                    stationCode: true
                },
                valid: false,
                touched: false
            }
        },
        inputsDisabled: true,
        valid: false,
        loading: false,
        data: []
    }

    checkValidity = (id, data, rules) => {

        let isValid = true;

        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = (data[id].value.length > 0) && isValid
        }
        if (id === 'bus' && data[id].checked) {
            isValid = true && isValid
        }
        if (id === 'train' && data[id].checked) {
            isValid = true && isValid
        }
        if (rules.stationCode) {
            let found = StationCodes.filter((item) => {
                return item['Station Name'].toUpperCase() === data[id].value.toUpperCase()
            })
            isValid = found.length > 0 && isValid
        }

        return isValid
    }

    dataHandler = (event) => {
        event.preventDefault();

        const userInputtedData = {
            train: this.state.searchForm.train.checked,
            bus: this.state.searchForm.bus.checked,
            departure: StationCodes.filter(item => item['Station Name'].toUpperCase() === this.state.searchForm.departure.value.toUpperCase()),
            destination: StationCodes.filter(item => item['Station Name'].toUpperCase() === this.state.searchForm.destination.value.toUpperCase())
        }


        if (userInputtedData.train) {
            this.props.history.push('/trains');
        } else {
            this.props.history.push('/bus')
        }

        this.props.onGetInputtedData(userInputtedData)


    }


    inputChangedHandler = (event, id) => {
        var state = {
            ...this.state
        }
        var updatedSearchForm = {
            ...this.state.searchForm
        }

        if (updatedSearchForm[id].elementType === 'radio') {
            state.inputsDisabled = false;
            if (id === 'train') {
                updatedSearchForm['train'].checked = true;
                updatedSearchForm['bus'].checked = false;
            } else if (id === 'bus') {
                updatedSearchForm['bus'].checked = true;
                updatedSearchForm['train'].checked = false;
            }
            state.searchForm = updatedSearchForm

            this.setState(state)

        } else {
            const updatedSearchFormData = {
                ...updatedSearchForm[id]
            }
            updatedSearchFormData.value = event.target.value;
            updatedSearchForm[id] = updatedSearchFormData
            console.log(updatedSearchFormData.value)

            this.setState({ searchForm: updatedSearchForm })
        }

        updatedSearchForm[id].valid = this.checkValidity(id, updatedSearchForm, updatedSearchForm[id].validation)
        this.setState({ searchForm: updatedSearchForm })

        let formIsValid = true;
        for (let inputIdentifier in updatedSearchForm) {
            formIsValid = updatedSearchForm[inputIdentifier].valid && formIsValid;
            if ((inputIdentifier === 'train' || inputIdentifier === 'bus') && (updatedSearchForm['train'].valid || updatedSearchForm['bus'].valid)) {
                updatedSearchForm['train'].valid = true
                updatedSearchForm['bus'].valid = true
            }
        }

        this.setState({ valid: formIsValid })

    }

    onClickHandler = (event, id) => {
        console.log('clicked')
        var searchFormCopy = {
            ...this.state.searchForm
        }
        var searchFormDeepCopy = {
            ...searchFormCopy[id]
        }

        console.log(searchFormDeepCopy)

        searchFormDeepCopy.touched = true;

        searchFormCopy[id] = searchFormDeepCopy

        console.log(searchFormDeepCopy)

        console.log(searchFormCopy[id].touched)

        this.setState({ searchForm: searchFormCopy })

        console.log(this.state.searchForm[id].touched)
    }

    componentDidMount () {
        fetch('/data')
            .then(res => res.json())
            .then(data => this.setState({data}))
        
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
                    changed={(event) => this.inputChangedHandler(event, formItem.id)}
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

        let data = this.state.data.length > 0 ? this.state.data[1].firstName : null

        return (
            <ReactAux class={classes.SearchForm}>
                <form onSubmit={this.dataHandler}>
                    {toRender}
                    <Button disabled={!this.state.valid} >Search</Button>
                </form>
                {/* {data} // reads data from backend */}
            </ReactAux>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.train.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetInputtedData: (userInputtedData) => dispatch(actions.trainSearch(userInputtedData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);