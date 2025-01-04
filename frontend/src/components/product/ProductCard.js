import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom'
import RatingStars from './RatingStars'

export default function ProductCard(props) {
    const { product } = props

    return (
        <Card
            component={Link}
            to={`/product-details/${product._id}`}
            className='p-4 hover:shadow-xl'
            sx={{ maxWidth: 345 }}>
            <CardActionArea sx={{height: '100%'}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={product.images[0].url}
                    alt="Product"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <div className='flex items-center'>
                            <RatingStars ratings={product.ratings} />
                            <span>({product.numOfReviews} Reviews)</span>
                        </div>
                        <Typography variant="h6" component="div">
                            {`$${product.price}`}
                        </Typography>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
