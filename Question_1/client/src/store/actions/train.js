import * as actionTypes from './actionTypes';
import axios from '../../axios-train'

export const trainSearchStart = () => {
    return {
        type: actionTypes.TRAIN_SEARCH_START
    };
};

export const trainSearchSuccess = (data) => {
    return {
        type: actionTypes.TRAIN_SEARCH_SUCCESS,
        data: data
    }
}

export const trainSearchFail = (error) => {
    return {
        type: actionTypes.TRAIN_SEARCH_FAIL,
        error: error
    }
}

export const trainSearch = (userData) => {
    return async (dispatch) => {
        dispatch(trainSearchStart())
        try {
            const departureLatLongData = await axios.get('/places.json?query='
                + userData.departure[0]['CRS Code']
                + '&type=train_station&app_id='
                + process.env.REACT_APP_TRANSPORT_API_APP_ID
                + '&app_key='
                + process.env.REACT_APP_TRANSPORT_API_APP_KEY
            )
            const departureLatData = departureLatLongData.data.member[0].latitude
            const departureLongData = departureLatLongData.data.member[0].longitude

            const destinationLatLongData = await axios.get('/places.json?query='
                + userData.destination[0]['CRS Code']
                + '&type=train_station&app_id='
                + process.env.REACT_APP_TRANSPORT_API_APP_ID
                + '&app_key='
                + process.env.REACT_APP_TRANSPORT_API_APP_KEY
            )
            const destinationLatData = destinationLatLongData.data.member[0].latitude
            const destinationLongData = destinationLatLongData.data.member[0].longitude

            const departureToDestinationData = await axios.get('/public/journey/from/lonlat:'
                + departureLongData + ',' + departureLatData
                + '/to/lonlat:'
                + destinationLongData + ',' + destinationLatData
                + '.json?app_id='
                + process.env.REACT_APP_TRANSPORT_API_APP_ID
                + '&app_key='
                + process.env.REACT_APP_TRANSPORT_API_APP_KEY
                + '&not_modes=bus-tube-boat-foot&service=southeast')

            const departureLiveData = await axios.get('/train/station/'
                + userData.departure[0]['CRS Code']
                + '/live.json?app_id='
                + process.env.REACT_APP_TRANSPORT_API_APP_ID
                + '&app_key='
                + process.env.REACT_APP_TRANSPORT_API_APP_KEY
                + '&darwin=false&train_status=passenger')

            const data = trainSearchFormatData(departureToDestinationData.data.routes, departureLiveData.data.departures.all, userData)

            dispatch(trainSearchSuccess(data))
        } catch (e) {
            dispatch(trainSearchFail(e))
        }
    }
}
// export const trainSearch = () => {
//     return dispatch => {
//         dispatch(trainSearchStart())
//         axios.get('/posts')
//             .then(response => {
//                 dispatch(trainSearchSuccess(response.data))
//             }).catch(error => {
//                 dispatch(trainSearchFail(error))
//             })
//     }
// }

const trainSearchFormatData = (routeData, liveDepartureData, userData) => {
    let trainData = []

    trainData = routeData.map((item) => {
        let minsInOtherTransport = 0;
        let parts = item.route_parts.map(part => {
            if (part.mode === 'train') {
                return {
                    id: part.line_name,
                    from: part.from_point_name,
                    to: part.to_point_name,
                    duration: part.duration,
                    departureTime: part.departure_time,
                    arrivalTime: part.arrival_time,
                    destination: part.destination
                }
            } else {
                let stringToDate = new Date('1970-01-01T' + part.duration + 'Z');
                minsInOtherTransport = stringToDate.getHours() * 60
                minsInOtherTransport += stringToDate.getMinutes()
            }
        }).filter((item) => item != null)


        let durationToDate = new Date('1970-01-01T' + item.duration + 'Z');

        let durationToMinutes = durationToDate.getHours() * 60;
        durationToMinutes += durationToDate.getMinutes()

        return {
            duration: durationToMinutes - minsInOtherTransport,
            parts: parts,
            departureTime: parts[0].departureTime,
            arrivalTime: parts[parts.length - 1].arrivalTime,
            departureDestination: parts[0].destination
        }
    })

    liveDepartureData.forEach(item => {
        for (var y = 0; y < trainData.length; y++) {
            if (trainData[y].parts[0].departureTime === item.aimed_departure_time && trainData[y].departureDestination === item.destination_name) {
                trainData[y].id = item.train_uid
                trainData[y].platform = item.platform
                trainData[y].expectedDepartureTime = item.expected_departure_time
                trainData[y].expectedArrivalTime = item.expected_arrival_time
                trainData[y].status = item.status

            }
        }
    })

    return {
        trainData,
        userData
    }

}

