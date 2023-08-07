import http from '../http-common'

const getAllByYear = (year) => {
    let result = http.get(`/holiday/year/${year}`).catch(
        function(error){
            throw new Error('networkerror')
        }
    )
    return result
}

const getHolidayByID = (id) => {
    let result = http.get(`/holiday/${id}`).catch(
        function(error) {
            if(error.response.data.errorcode === 404){
                throw new Error('holidaynotfound')
            } else if (error.response.data.errorcode === 500){
                throw new Error('databaseerror')
            } else {
                throw new Error('networkerror')
            }
        }
    )
    return result
}

const createHoliday = (data) => {
    let result = http.post('/holiday', data).catch(
        function(error) {
            if(error.response.data.errorcode === 403){
                throw new Error('invaliddate')
            } else if (error.response.data.errorcode === 500){
                throw new Error('databaseerror')
            } else {
                throw new Error('networkerror')
            }
        }
    )
    return result
}

const updateHoliday = (id, data) => {
    let result = http.put(`/holiday/${id}`, data).catch(
        function(error){
            if(error.response.data.errorcode === 403){
                throw new Error('invaliddate')
            } else if (error.response.data.errorcode === 406){
                throw new Error('duplicateerror')
            } else if (error.response.data.errorcode === 500){
                throw new Error('databaseerror')
            } else {
                throw new Error('networkerror')
            }
        }
    )
    return result
}

const deleteHoliday = (id) => {
    let result = http.delete(`/holiday/${id}`).catch(
        function(error){
            throw new Error('networkerror')
        }
    )
    return result
}

const HolidayService = {
    getAllByYear,
    getHolidayByID,
    createHoliday,
    updateHoliday,
    deleteHoliday
}

export default HolidayService