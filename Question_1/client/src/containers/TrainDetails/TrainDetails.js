import React, { Component } from 'react'
import Loading from '../../components/UI/Loading/Loading'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import classes from './TrainDetails.module.css'

import * as actions from '../../store/actions/index';
import ReactAux from '../../hoc/ReactAux/ReactAux';
import Card from '../../components/UI/Card/Card'
import Modal from '../../components/UI/Modal/Modal'
import LoadingButton from '../../components/UI/LoadingButton/LoadingButton'
import ConnectedNodes from '../../components/UI/ConnectedNodes/ConnectedNodes'


class TrainDetails extends Component {


    state = {
        firstLoad: false,
        modalOpened: false,
        routeID: null
    }

    updateTrainTimes = () => {
        this.setState({ firstLoad: true })
        this.props.onGetInputtedData(this.props.data.userData)
    }

    openModal = (id) => {
        this.setState({ modalOpened: true, routeID: id })


    }

    closeModal = () => {
        this.setState({ modalOpened: false, routeID: null })
    }

    render() {

        let modalData = null

        let trainData = null
        let reloadButton = < LoadingButton text="Refresh"
            load={this.props.loading}
            clicked={this.updateTrainTimes}
            show={true}
        />;

        if (this.props.loading && !this.state.firstLoad) {
            trainData = <Loading className={classes.Loading} />
            reloadButton = null
        }

        let tempData = []

        if (!this.props.loading && this.props.data) {
            trainData = (
                <h1>Nothing to see here</h1>
            )
        }

        if (!this.props.loading) {

            if (this.props.data.trainData) {
                trainData = this.props.data.trainData.map(data => {
                    let show = false
                    let late = 0
                    let difference = 0

                    let aimedDepartureTime = new Date('1970-01-01T' + data.aimedDepartureTime + 'Z');
                    let expectedDepatureTime = new Date('1970-01-01T' + data.departureTime + 'Z');
                    let minutesDifference = ((aimedDepartureTime - expectedDepatureTime) / 1000) / 60

                    if (minutesDifference > 0) {
                        show = true;
                        late = minutesDifference
                    }

                    if(trainData.late === 'LATE') {
                        let expected = new Date('1970-01-01T' + data.parts[0].expectedDepatureTime + 'Z')
                        let actual = new Date('1970-01-01T' + data.expectedDepartureTime + 'Z')
                        difference = ((actual- expected) /1000) /60
                        
                    }

                    return (
                        <Card
                            key={data.id}
                            departure={this.props.data.userData.departure[0]['Station Name']}
                            departureDestination={data.departureDestination}
                            departureTime={data.departureTime}
                            arrivalTime={data.arrivalTime}
                            arrival={this.props.data.userData.destination[0]['Station Name']}
                            status={data.status}
                            platform={data.platform}
                            duration={data.duration}
                            stops={data.parts.length - 1}
                            clicked={() => this.openModal(data.id)}
                            show={show}
                            late={difference}
                        />
                    )

                })


            } else {
                return (
                    <Redirect to='/' />
                )
            }
        }


        //         

        // </Modal>

        if (this.state.modalOpened) {
            this.props.data.trainData.forEach(data => {
                if (data.id === this.state.routeID) {
                    modalData = data.parts.map((part, index) => {

                        let minutesDifference = null;

                        if (index < data.parts.length - 1) {
                            let aimedDepartureTime = new Date('1970-01-01T' + data.parts[index].arrivalTime + 'Z');
                            let expectedDepatureTime = new Date('1970-01-01T' + data.parts[index + 1].departureTime + 'Z');
                            console.log(expectedDepatureTime)
                            console.log(aimedDepartureTime)
                            minutesDifference = ((expectedDepatureTime - aimedDepartureTime) / 1000) / 60   
                        }

                        return (
                            <ReactAux>
                                <ConnectedNodes
                                    key={part.id}
                                    departureTime={part.departureTime}
                                    arrivalTime={part.arrivalTime}
                                    departure={part.from}
                                    arrival={part.to}
                                />
                                {minutesDifference ? <p>Waiting time: {minutesDifference} minutes</p> : null}
                                <hr></hr>
                            </ReactAux>
                        )
                    })
                }
            })
        }


        return (
            <ReactAux>
                <Modal show={this.state.modalOpened} clicked={this.closeModal}>
                    {modalData}
                </Modal>
                {reloadButton}
                {trainData}
                {tempData}


            </ReactAux >
        )

    }



}

const mapStateToProps = state => {
    return {
        data: state.train.data,
        loading: state.train.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetInputtedData: (userInputtedData) => dispatch(actions.trainSearch(userInputtedData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainDetails)



