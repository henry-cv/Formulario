import { createSlice } from '@reduxjs/toolkit'
import HolidayService from '../services/HolidayService'

const currentYear = new Date().getFullYear()

const initialState = {
    holidays: [],
    year: currentYear,
    holiday: {},
    successMessage: '',
    errorMessage: '',
    holidayID: ''
}

const holidaySlice = createSlice({
    name: 'holidays',
    initialState,
    reducers: {
        setHolidays(state, action) {
            state.holidays = action.payload
        },
        setYear(state, action) {
            state.year = action.payload
        },
        setHoliday(state, action) {
            state.holiday = action.payload
        },
        setFormAction(state, action) {
            state.formAction = action.payload
        },
        setHolidayID(state, action) {
            state.holidayID = action.payload
        },
        setSuccessMessage(state, action) {
            state.successMessage = action.payload
            state.errorMessage = ''
        },
        setErrorMessage(state, action) {
            state.errorMessage = action.payload
            state.successMessage = ''
        }
    }
})

export const getHolidaysByYear = (year) => async dispatch => {
    try {
        let res = await HolidayService.getAllByYear(year)
        dispatch(setHolidays(res.data))
        dispatch(setYear(year))
    } catch (e) {
        dispatch(setHolidays({
            Holidays: [],
            message: "Web Services Unavailable",
            code: 500
        }))
        dispatch(setYear(year))
    }
}

export const getHolidayByID = (id) => async dispatch => {
    try {
        let res = await HolidayService.getHolidayByID(id)
        dispatch(setHoliday(res.data))
    } catch (e) {
        if (e.message === 'holidaynotfound') {
            dispatch(setErrorMessage('Holiday Not Found'))
        } else if (e.message === 'databaseerror') {
            dispatch(setErrorMessage('Unable to Connect to Database'))
        } else {
            dispatch(setErrorMessage('Web Services Unavailable'))
        }
    }
}

export const addHoliday = (data) => async dispatch => {
    try {
        let res = await HolidayService.createHoliday(data)
        if(res.data.code === 201){
            dispatch(setHoliday(res.data))
            dispatch(setHolidayID(res.data.Holiday.id))
            dispatch(setSuccessMessage(res.data.message))
            return res.data
        } else if (res.data.errorcode === 200){
            dispatch(setErrorMessage(res.data.errormessage))
            dispatch(setHoliday({
                Holiday: data
            })) 
        }
    } catch (e) {
        if (e.message === 'invaliddate'){
            dispatch(setErrorMessage('Invalid Date'))
            dispatch(setHoliday(data))
        } else if(e.message === 'databaseerror'){
            dispatch(setErrorMessage('Unable to Connect to Database'))
            dispatch(setHoliday({
                Holiday: data
            }))
        } else {
            dispatch(setErrorMessage('Web Services Unavailable'))
            dispatch(setHoliday({
                Holiday: data
            }))
        }
    }
}

export const deleteHoliday = (id) => async dispatch => {
    let res = await HolidayService.deleteHoliday(id)
    dispatch(setHoliday({}))
    dispatch(setHolidayID(''))
}

export const updateHoliday = (id, data) => async dispatch => {
    try{
        let res = await HolidayService.updateHoliday(id, data)
        if(res.data.code === 200){
            dispatch(setHoliday(res.data))
            dispatch(setHolidayID(res.data.Holiday.id))
            dispatch(setSuccessMessage(res.data.message))
        } else if (res.data.errorcode === 200){
            dispatch(setErrorMessage(res.data.errormessage))
            dispatch(setHoliday({
                Holiday: data
            }))  
        }
    } catch (e) {
        if(e.message === 'invaliddate'){
            dispatch(setErrorMessage('Invalid Date'))
            dispatch(setHoliday({
                Holiday: data
            }))
        } else if (e.message === 'duplicateerror'){
            dispatch(setErrorMessage('Duplicate Found'))
            dispatch(setHoliday({
                Holiday: data
            }))
        } else if(e.message === 'databaseerror'){
            dispatch(setErrorMessage('Unable to Connect to Database'))
            dispatch(setHoliday({
                Holiday: data
            }))
        } else {
            dispatch(setErrorMessage('Web Services Unavailable'))
            dispatch(setHoliday({
                Holiday: data
            }))
        }
    }
}

export const clearMessages = () => async dispatch => {
    dispatch(setErrorMessage(''))
    dispatch(setSuccessMessage(''))
}




export const { setHolidays, setYear, setHoliday, setHolidayID, setSuccessMessage, setErrorMessage } = holidaySlice.actions

const { reducer } = holidaySlice

export default reducer