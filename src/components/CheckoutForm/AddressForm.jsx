import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FromInput from './CustomTextField';
import { commerce } from '../../lib/commerce';
import { Link } from 'react-router-dom';




const AddressForm = ({ checkoutToken, next }) => {
    const [ShippingCountries, setShippingCountries] = useState([]);
    const [ShippingCountry, setShippingCountry] = useState('');
    const [ShippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [ShippingSubdivision, setShippingSubdivision] = useState('');
    const [ShippingOptions, setShippingOptions] = useState([]);
    const [ShippingOption, setShippingOption] = useState('');
    const methods = useForm();
    const countries = Object.entries(ShippingCountries).map(([code, name]) => ({ id: code, label: name }));
    const subdivisions = Object.entries(ShippingSubdivision).map(([code, name]) => ({ id: code, label: name }));
    const options = ShippingOptions.map((sO) => ({ id: sO.id, label: `(${sO.price.formatted_with_symbol})` }));



    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);

    };

    const fetchSubdivisions = async (countrycode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countrycode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
        console.log(subdivisions);


    };

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
        setShippingOptions(options);
        setShippingOption(options[0].id);

    }


    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);


    useEffect(() => {
        if (ShippingCountry) fetchSubdivisions(ShippingCountry);

    }, [ShippingCountry]);


    useEffect(() => {
        if (ShippingSubdivision) fetchShippingOptions(checkoutToken.id, ShippingCountry, ShippingSubdivision);
    }, [ShippingSubdivision]);




    return (
        <>
            <Typography variant="h6" gutterBottom>?????????? ????????????</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, ShippingCountry, ShippingSubdivision, ShippingOption }))}>
                    <Grid container spacing={3}>
                        <FromInput name='firstName????' label='???? ????????' />
                        <FromInput name='lastName' label='???? ??????????' />
                        <FromInput name='address1' label='?????????? ' />
                        <FromInput name='email' label='????????' />
                        <FromInput name='city' label='??????' />
                        <FromInput name='zip' label='?????????? ' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>?????? ??????????</InputLabel >
                            <Select value={ShippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)} >
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id} >
                                        {country.label}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>???????? ??????????</InputLabel >
                            <Select value={ShippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)} >
                                {options.map((option) => (
                                    < MenuItem key={option.id} value={option.id} >
                                        { option.label}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/cart" variant='outlined'>???????? ??????????</Button>
                        <Button type="submit" variant="contained" color="primary">??????????</Button>

                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default AddressForm
