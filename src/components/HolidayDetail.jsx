import React, { useEffect } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Grid, Typography, Select, MenuItem, FormControl, Button, FormHelperText } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { getHolidayByID, deleteHoliday, addHoliday, updateHoliday, clearMessages } from '../slices/holidays'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Switch, Case, Default, If, Else, Then } from 'react-if';
import getTranslatedMessage from '../languages/LanguageFallback';
import * as yup from 'yup'
import { useFormik, Form, Field, ErrorMessage } from 'formik';

function HolidayDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let holidayfromState = useSelector((state) => state.holiday);
    let errorMessageFromState = useSelector((state) => state.errorMessage)
    let successMessageFromState = useSelector((state) => state.successMessage)
    let idfromState = useSelector((state) => state.holidayID)
    let { action, id } = useParams();
    let urlID = id;


    let checkHoliday = holidayfromState && holidayfromState.Holiday;

    const holidaySchema = yup.object().shape({
        location: yup.string().required("Location is required"),
        date: yup.string().required("Date is required"),
        type: yup.string().required("Type is required"),
        description: yup.string().required("Description is required")
    })

    const initialData = {
        id: '',
        location: '',
        date: '',
        type: '',
        description: ''
    };

    const [data, setData] = useState(initialData);

    useEffect(() => {
        if (action !== undefined && urlID !== undefined) {
            dispatch(getHolidayByID(urlID))
            dispatch(clearMessages())
        } else if (action === 'update' && urlID === undefined) {
            dispatch(getHolidayByID(idfromState))
        } else if (action === undefined && urlID === undefined){
            dispatch(clearMessages())
        }
    }, [action])


    useEffect(() => {
        if (action === 'view' || action === 'update') {
            setData({
                id: checkHoliday ? holidayfromState.Holiday.id : '',
                location: checkHoliday ? holidayfromState.Holiday.location : '',
                date: checkHoliday ? holidayfromState.Holiday.date : '',
                type: checkHoliday ? holidayfromState.Holiday.type : '',
                description: checkHoliday ? holidayfromState.Holiday.description : ''
            })
        } else {
            setData({
                id: errorMessageFromState ? holidayfromState.Holiday.id : '',
                location: errorMessageFromState ? holidayfromState.Holiday.location : '',
                date: errorMessageFromState ? holidayfromState.Holiday.date : '',
                type: errorMessageFromState ? holidayfromState.Holiday.type : '',
                description: errorMessageFromState ? holidayfromState.Holiday.description : ''
            })
        }
    }, [JSON.stringify(holidayfromState.Holiday), action])

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value });
    };

    function handleGoBack() {
        navigate('/')
    };

    function handleDelete() {
        if (urlID !== undefined) {
            dispatch(deleteHoliday(urlID))
        } else {
            dispatch(deleteHoliday(idfromState))
        }
        navigate('/')
    };

    // function handleCreate() {
    //     dispatch(addHoliday(data)).then((res) => {
    //         console.log(res);
    //         if(res.code === 201){
    //             navigate('/update')
    //         }
    //     })
    // };

    // function handleUpdate() {
    //     if (urlID !== undefined) {
    //         dispatch(updateHoliday(urlID, data))
    //     } else {
    //         dispatch(updateHoliday(idfromState, data))
    //     }
    // };

    function handleSave(){
        if(action === 'update'){
            if (urlID !== undefined) {
                dispatch(updateHoliday(urlID, data))
            } else {
                dispatch(updateHoliday(idfromState, data))
            }
        } else {
            dispatch(addHoliday(data)).then((res) => {
                if(res !== undefined){
                    if(res.code === 201){
                        navigate('/update')
                    }
                }
            })
        }
    }

    const formik = useFormik({
        initialValues: action === undefined ? {
            id: '',
            location: '',
            date: '',
            type: '',
            description: ''
        } : {
            id: checkHoliday ? holidayfromState.Holiday.id : '',
            location: checkHoliday ? holidayfromState.Holiday.location : '',
            date: checkHoliday ? holidayfromState.Holiday.date : '',
            type: checkHoliday ? holidayfromState.Holiday.type : '',
            description: checkHoliday ? holidayfromState.Holiday.description : ''
        },
        validationSchema: holidaySchema,
        onSubmit: (values) => {
            handleSave()
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Container maxWidth="xl">
                <Box sx={{ border: 1, borderColor: 'primary.main', marginTop: 1 }}>
                    <Grid container justifyContent="flex-end" alignItems="center">
                        <Grid item sm={2}>
                            <Box display="flex" justifyContent="flex-end" alignItems="center">
                                <Typography variant="body1" sx={{ mr: 1 }}>{getTranslatedMessage("holiday-holidayid")}:</Typography>
                            </Box>
                        </Grid>
                        <Grid item sm={10}>
                            <TextField size='small' disabled id='id' name='id' variant='outlined' data-testid='idfield' style={{ minWidth: '99%' }} sx={{ marginTop: 1, backgroundColor: "#eaeaea", color: 'black' }} value={data.id} />
                        </Grid>
                        <Grid item sm={2}>
                            <Box display="flex" justifyContent="flex-end" alignItems="center">
                                <Typography variant="body1" sx={{ mr: 1 }}>{getTranslatedMessage("holiday-location")}: </Typography>
                            </Box>
                        </Grid>
                        <Grid item sm={10}>
                            <FormControl style={{ minWidth: '99%' }} margin='dense'>
                                <Select
                                    onChange={(e) => { 
                                        handleChange(e)
                                        formik.handleChange(e)
                                    }}
                                    disabled={action === 'view'}
                                    inputProps={{ 'aria-label': 'Holiday Location' }}
                                    name='location'
                                    size='small'
                                    sx={{ "& .MuiInputBase-input.Mui-disabled": { backgroundColor: "#eaeaea", color: 'black' } }}
                                    value={data.location}
                                    error={formik.touched.location && Boolean(formik.errors.location)}
                                    onBlur={formik.handleBlur}
                                    data-testid='locationfield'
                                >
                                    <MenuItem disableRipple value='All Locations'>All Locations</MenuItem>
                                    <MenuItem disableRipple value="Bettendorf, IA">Bettendorf, IA</MenuItem>
                                    <MenuItem disableRipple value='India'>India</MenuItem>
                                </Select>
                                {action !== 'view' && formik.touched.location && Boolean(formik.errors.location) ? <FormHelperText sx={{ color: 'red' }}>{formik.errors.location}</FormHelperText> : null}
                            </FormControl>
                        </Grid>
                        <Grid item sm={2}>
                            <Box display="flex" justifyContent="flex-end" alignItems="center">
                                <Typography variant="body1" sx={{ mr: 1 }}>{getTranslatedMessage("holiday-date")}: </Typography>
                            </Box>
                        </Grid>
                        <Grid item sm={10}>
                            <TextField size='small' id='date' name='date' variant='outlined' type='date' data-testid='datefield' style={{ minWidth: '99%' }} sx={{ marginTop: '3px', "& .MuiInputBase-input.Mui-disabled": { backgroundColor: "#eaeaea", color: 'black' } }} disabled={action === 'view'} 
                            onChange={(e) => { 
                                handleChange(e)
                                formik.handleChange(e)
                            }} 
                            value={data.date}
                            onBlur={formik.handleBlur}
                            error={formik.touched.date && Boolean(formik.errors.date)}
                            helperText={action !== 'view' && formik.touched.date && Boolean(formik.errors.date) ? formik.errors.date : null} />
                        </Grid>
                        <Grid item sm={2}>
                            <Box display="flex" justifyContent="flex-end" alignItems="center">
                                <Typography variant="body1" sx={{ mr: 1 }}>{getTranslatedMessage("holiday-type")}: </Typography>
                            </Box>
                        </Grid>
                        <Grid item sm={10}>
                            <FormControl style={{ minWidth: '99%' }} margin='dense'>
                                <Select
                                    onChange={(e) => { 
                                        handleChange(e)
                                        formik.handleChange(e)
                                    }}
                                    name='type'
                                    inputProps={{ 'aria-label': 'Holiday Type' }}
                                    size='small'
                                    disabled={action === 'view'}
                                    sx={{ "& .MuiInputBase-input.Mui-disabled": { backgroundColor: "#eaeaea", color: 'black' } }}
                                    value={data.type}
                                    error={formik.touched.type && Boolean(formik.errors.type)}
                                    onBlur={formik.handleBlur}
                                    data-testid='typefield'
                                >
                                    <MenuItem disableRipple value="Fixed">Fixed</MenuItem>
                                    <MenuItem disableRipple value='Optional'>Optional</MenuItem>
                                </Select>
                                {action !== 'view' && formik.touched.type && Boolean(formik.errors.type) ? <FormHelperText sx={{ color: 'red' }}>{formik.errors.type}</FormHelperText> : null}
                            </FormControl>
                        </Grid>
                        <Grid item sm={2}>
                            <Box display="flex" justifyContent="flex-end" alignItems='center'>
                                <Typography variant="body1" sx={{ mr: 1 }}>{getTranslatedMessage("holiday-description")}: </Typography>
                            </Box>
                        </Grid>
                        <Grid item sm={10}>
                            <TextField size='small' id='description' name='description' style={{ minWidth: '99%' }} data-testid='descfield' variant='outlined' sx={{ marginTop: '4px', marginBottom: '10px', "& .MuiInputBase-input.Mui-disabled": { backgroundColor: "#eaeaea", color: 'black' } }} disabled={action === 'view'} 
                            onChange={(e) => { 
                                handleChange(e)
                                formik.handleChange(e)
                            }}
                            value={data.description}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={action !== 'view' && formik.touched.description && Boolean(formik.errors.description) ? formik.errors.description : null} />
                        </Grid>
                        <Grid item sm={12}>
                            <Box display='flex' justifyContent='center' alignItems='center'>
                                <Switch>
                                    <Case condition={successMessageFromState !== ''}>
                                        <Typography variant='body1' color='green'>{successMessageFromState}</Typography>
                                    </Case>
                                    <Case condition={errorMessageFromState !== ''}>
                                        <Typography variant='body1' data-testid='errormessage' color='red'>{errorMessageFromState}</Typography>
                                    </Case>
                                    <Default>
                                        <div></div>
                                    </Default>
                                </Switch>
                            </Box>
                        </Grid>
                        <Grid item sm={12}>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Switch>
                                    <Case condition={action === 'view'}>
                                        <Link to={`/update/${urlID}`} style={{ textDecoration: 'none' }}>
                                            <Button size="small" variant="outlined" disableElevation data-testid='updatebutton' startIcon={<EditIcon sx={{ color: 'darkgreen' }} />} sx={{
                                                mb: 1, mr: '5px', borderColor: "LightSeaGreen", color: "LightSeaGreen", ':hover': {
                                                    bgcolor: 'LightSeaGreen',
                                                    color: 'white',
                                                }, textTransform: 'none', fontSize: '0.875rem'
                                            }}>{getTranslatedMessage("holiday-switchtoupdate")}</Button>
                                        </Link>
                                    </Case>
                                    <Case condition={action === 'update'}>
                                        <Button size="small" type='submit' variant="contained" data-testid='updatesavebutton' disableRipple disableElevation startIcon={<SaveIcon sx={{ color: 'yellow' }} />} sx={{ mb: 1, mr: '5px', textTransform: 'none', fontSize: '0.875rem' }} color="primary">{getTranslatedMessage("holiday-save")}</Button>
                                        <Button size="small" type='button' variant="contained" data-testid='deletebutton' disableRipple disableElevation startIcon={<DeleteIcon sx={{ color: 'yellow' }} />} sx={{ mb: 1, mr: '5px', textTransform: 'none', fontSize: '0.875rem' }} color="error" onClick={handleDelete}>{getTranslatedMessage("holiday-delete")}</Button>
                                        <If condition={urlID !== undefined}>
                                            <Then>
                                                <Link to={`/view/${urlID}`} style={{ textDecoration: 'none' }}>
                                                    <Button size="small" variant="outlined" disableElevation data-testid='viewbutton' startIcon={<VisibilityIcon sx={{ color: 'darkblue' }} />} sx={{
                                                        mb: 1, mr: '5px', borderColor: "LightSeaGreen", color: "LightSeaGreen", ':hover': {
                                                            bgcolor: 'LightSeaGreen',
                                                            color: 'white',
                                                        }, textTransform: 'none', fontSize: '0.875rem'
                                                    }}>{getTranslatedMessage("holiday-switchtoview")}</Button>
                                                </Link>
                                            </Then>
                                            <Else>
                                                <Link to={`/view/${idfromState}`} style={{ textDecoration: 'none' }}>
                                                    <Button size="small" variant="outlined" disableElevation data-testid='viewbutton' startIcon={<VisibilityIcon sx={{ color: 'darkblue' }} />} sx={{
                                                        mb: 1, mr: '5px', borderColor: "LightSeaGreen", color: "LightSeaGreen", ':hover': {
                                                            bgcolor: 'LightSeaGreen',
                                                            color: 'white',
                                                        }, textTransform: 'none', fontSize: '0.875rem'
                                                    }}>{getTranslatedMessage("holiday-switchtoview")}</Button>
                                                </Link>
                                            </Else>
                                        </If>
                                    </Case>
                                    <Default><Button size="small" type='submit' variant="contained" disableElevation startIcon={<SaveIcon sx={{ color: 'yellow' }} />} sx={{ mb: 1, mr: '5px', textTransform: 'none', fontSize: '0.875rem' }} color="primary">{getTranslatedMessage("holiday-save")}</Button></Default>
                                </Switch>
                                <Button size="small" variant="outlined" disableElevation onClick={handleGoBack} sx={{
                                    mb: 1, mr: '5px', borderColor: "LightSeaGreen", color: "LightSeaGreen", ':hover': {
                                        bgcolor: 'LightSeaGreen',
                                        color: 'white',
                                    }, textTransform: 'none', fontSize: '0.875rem'
                                }}>{getTranslatedMessage("holiday-gotoholidays")}</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </form>
    )
}

export default HolidayDetail