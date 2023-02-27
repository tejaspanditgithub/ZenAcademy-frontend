import { Grid } from '@mui/material'
import { Box} from '@mui/system'
import Sgocard from '../course/Sgocard'

export default function Dashboard() {
    return (
        <Box sx={{ ml: '5px' }}>
            <h2 style={{ padding: '8px', marginTop: '10px' , color: "#2C3333", fontSize: "30Px", textAlign: "center" }}>
                Dashboard
            </h2>
            <Box>
                <Grid container spacing={2.4} sx={{
                    ml: '45px'
                    
                }} 
                >
                    <Grid item xs={4} >
                        <Sgocard />
                    </Grid>
                    <Grid item xs={4} >
                        <Sgocard />
                    </Grid>
                    <Grid item xs={4} >
                        <Sgocard />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}