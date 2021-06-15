import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';

function Cartitem({ item, onRemoveFromCart, onUpdateCartQty }) {

    const classes = useStyles();


    // const handleUpdateCartQty = (item.id, item.quantity) => onUpdateCartQty(item.id, item.quantity);

    // const handleRemoveFromCart = (item.id) => onRemoveFromCart(item.id);
    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <CardContent className={classes.CardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() => onRemoveFromCart(item.id)}>להסרה</Button>
                <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>+</Button>

            </CardActions>
        </Card>
    )
}

export default Cartitem;
