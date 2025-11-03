import React from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'

export default function HomestayCard({item, onBook}){
  return (
    <Card sx={{mb:2}}>
      <CardContent>
        <Typography variant="h6">{item.title}</Typography>
        <Typography variant="body2">{item.description}</Typography>
        <Typography variant="caption">Price: ₹{item.price} / night</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>onBook(item)}>Book</Button>
      </CardActions>
    </Card>
  )
}
