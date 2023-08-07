import * as React from 'react';
import dayjs from 'dayjs';
import {
    Box,
    Grid,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    InputLabel,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { getHolidaysByYear, clearMessages } from '../slices/holidays';
import { Link } from 'react-router-dom';
import getTranslatedMessage from '../languages/LanguageFallback';

function HolidayList() {
    //Code block to get currentYear and also generate a rolling list of years to display
    let yearFromState = useSelector((state) => state.year);
    const currentYear = new Date().getFullYear();

    const pickYearList = function (selectedYear) {
        let yearsArray = [];

        for (let index = -3; index < 4; index++) {
            let listyear = selectedYear + index;
            yearsArray.push(listyear);
        }

        return yearsArray;
    };
    const rollingYears = pickYearList(currentYear);

    //Code block to useState for filter year picker
    const [year, setYear] = React.useState(yearFromState);

    const handleYear = (event) => {
        setYear(event.target.value);
    };

    const holidaysList = useSelector((state) => state.holidays);
    const errorMessageFromState = useSelector((state) => state.errorMessage);

    //Code block to run whenever a year is filtered
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getHolidaysByYear(yearFromState));
        dispatch(clearMessages());
        }, []);
    React.useEffect(() => {
        dispatch(getHolidaysByYear(year));
        dispatch(clearMessages());
    }, [dispatch, year]);

    return (
        <div>
            <form>
                <Box
                    sx={{
                        width: '100%',
                        height: 40,
                        backgroundColor: 'darkcyan',
                    }}
                >
                    <Grid container alignItems='center'>
                        <Grid item sm={2}>
                            <Box display='flex' justifyContent='flex-end'>
                                <Typography variant='body1' sx={{ mr: 1, color: 'white' }}>
                                    {getTranslatedMessage('holidaylist-filteryear')}:
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item sm={10}>
                            <Box display='flex' justifyContent='flex-start'>
                                <FormControl style={{ minWidth: '10%' }} size='small'>
                                    <InputLabel id='filteryearselect' hidden></InputLabel>
                                    <Select
                                        value={year}
                                        onChange={handleYear}
                                        inputProps={{ 'aria-label': 'Filter Year' }}
                                        size='small'
                                        sx={{
                                            color: 'black',
                                            backgroundColor: 'white',
                                        }}
                                        data-testid='filteryearselect'
                                        labelId='filteryearselect'
                                    >
                                        {rollingYears.map((rYear) => (
                                            <MenuItem value={rYear} disableRipple>
                                                {rYear}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </form>
            <TableContainer>
                <Table sx={{ minWidth: '100%' }} aria-label='holiday table'>
                    <TableHead
                        sx={{
                            backgroundColor: 'black',
                            '& th': {
                                color: 'white',
                            },
                        }}
                    >
                        <TableRow>
                            <TableCell
                                size='small'
                                width='8%'
                                sx={{ py: 0, verticalAlign: 'center' }}
                            >
                                {getTranslatedMessage('holidaylist-action')}&nbsp;
                                <IconButton
                                    data-testid='createlink'
                                    aria-label='create'
                                    size='small'
                                    component={Link}
                                    to='/holiday/create'
                                >
                                    <AddCircleIcon sx={{ color: 'yellow' }} fontSize='small' />
                                </IconButton>
                            </TableCell>
                            <TableCell
                                size='small'
                                width='12%'
                                sx={{ py: 0, verticalAlign: 'center' }}
                            >
                                {getTranslatedMessage('holiday-date')}
                            </TableCell>
                            <TableCell
                                size='small'
                                width='40%'
                                sx={{ py: 0, verticalAlign: 'center' }}
                            >
                                {getTranslatedMessage('holiday-description')}
                            </TableCell>
                            <TableCell
                                size='small'
                                width='15%'
                                sx={{ py: 0, verticalAlign: 'center' }}
                            >
                                {getTranslatedMessage('holiday-type')}
                            </TableCell>
                            <TableCell
                                size='small'
                                width='25%'
                                sx={{ py: 0, verticalAlign: 'center' }}
                            >
                                {getTranslatedMessage('holiday-location')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {holidaysList.Holidays ? (
                            holidaysList.Holidays.length > 0 ? (
                                holidaysList.Holidays.map((holiday) => (
                                    <TableRow key={holiday.id}>
                                        <TableCell
                                            style={{ borderBottom: 'none' }}
                                            sx={{ py: '0px' }}
                                        >
                                            <Link to={`/view/${holiday.id}`}>
                                                <VisibilityIcon
                                                    sx={{ color: 'darkcyan', marginLeft: 1 }}
                                                    fontSize='small'
                                                />
                                            </Link>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Link to={`/update/${holiday.id}`}>
                                                <EditIcon
                                                    sx={{ color: 'orangered' }}
                                                    fontSize='small'
                                                />
                                            </Link>
                                        </TableCell>
                                        <TableCell
                                            style={{ borderBottom: 'none' }}
                                            sx={{ py: '0px' }}
                                        >
                                            {dayjs(holiday.date).format('MM/DD/YYYY')}
                                        </TableCell>
                                        <TableCell
                                            style={{ borderBottom: 'none' }}
                                            sx={{ py: '0px' }}
                                        >
                                            {holiday.description}
                                        </TableCell>
                                        <TableCell
                                            style={{ borderBottom: 'none' }}
                                            sx={{ py: '0px' }}
                                        >
                                            {holiday.type}
                                        </TableCell>
                                        <TableCell
                                            style={{ borderBottom: 'none' }}
                                            sx={{ py: '0px' }}
                                        >
                                            {holiday.location}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow key='emptyScenario'>
                                    <TableCell
                                        style={{ borderBottom: 'none' }}
                                        sx={{ py: '0px' }}
                                        colSpan={6}
                                    >
                                        <Typography variant='body1' color='red' align='center'>
                                            {holidaysList.message}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        ) : (
                            <TableRow key='errorScenario'>
                                <TableCell
                                    style={{ borderBottom: 'none' }}
                                    sx={{ py: '0px' }}
                                    colSpan={6}
                                >
                                    <Typography variant='body1' color='red' align='center'>
                                        {errorMessageFromState}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default HolidayList;
