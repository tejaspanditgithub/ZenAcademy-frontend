import { React } from 'react';
import { Card, Box, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';



export default function Sgocard() {
    return (
        <Box width='365px' topmargin='20px' padding='2px'  >
            <Card>
                <CardMedia
                    component="img"
                    alt="JavaScript"
                    height="170"
                    image="/javascript.jpg"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                       JavaScript
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        JavaScript is the world's most popular programming language.
                        It is the programming language of the Web.
                        It is easy to learn.
                        This tutorial will teach you JavaScript from basic to advanced.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="Small" style={{ color: 'black' }} onClick={() => console.log('Bookmarked')}>
                        <BookmarkAddIcon />
                        
                    </Button>
                    
                    <Button size="small" 
                        onClick={() => console.log('Enrolled')}
                    style={{ 
                        color: 'white', 
                        fontWeight: 'bold', 
                        marginLeft: '60%', 
                        border: "1px solid white", 
                        backgroundColor:'#212E52',
                       
                        }}>
                            Enroll
                            
                        </Button>
                    

                </CardActions>
            </Card>
        </Box >
    );
}