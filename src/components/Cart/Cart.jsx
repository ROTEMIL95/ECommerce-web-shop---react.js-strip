import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import Cartitem from './Cartitem/Cartitem';
import useStyles from './styles';
import { Link } from 'react-router-dom';




const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {

    // const isEmpty = !cart.line_items.length;
    const classes = useStyles();
    if (!cart.line_items) return 'Loading';


    const EmptyCard = () => (
        <Typography variant="subtitle1"> ! אין לך מוצרים בעגלה ,
            <Link to="/" className={classes.link}> להוספה לחץ </Link>
        </Typography>
    );

    const FilldCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <Cartitem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    סכום לתשלום : {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>לרוקן את העגלה</Button>
                    <Button className={classes.checkoutButton} component={Link} to="/Checkout" size="large" type="button" variant="contained" color="primary">להמשך</Button>

                </div>
            </div>
        </>

    );


    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>: המוצרים שלך </Typography>
            { !cart.line_items.length ? EmptyCard() : FilldCart()}

        </Container>
    )
}

export default Cart
