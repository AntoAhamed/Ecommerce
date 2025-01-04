import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

function CartItem(props) {
    const { item, removeCartItem } = props

    return (
        <TableRow

            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row" sx={{ display: 'flex' }}>
                <img src={item.images[0].url} alt='' width={'10%'} />
                <div className='flex flex-col ml-4'>
                    <span className='text-lg'>{item.name}</span>
                    <span className='text-lg'>${item.price}</span>
                    <Button variant='contained' size='small' color='error' onClick={() => removeCartItem(item.product)}>Remove</Button>
                </div>
            </TableCell>
            <TableCell align="left">{item.quantity}</TableCell>
            <TableCell align="left">${item.quantity * item.price}</TableCell>
        </TableRow>
    )
}

export default CartItem
