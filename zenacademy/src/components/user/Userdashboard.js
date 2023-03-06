import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import Sgocard from '../course/Sgocard'

export default function Dashboard() {
    return (
        <Box sx={{ ml: '6%' }}>
            <h2 style={{ padding: '8px', marginTop: '10px', color: "#2C3333", fontSize: "30Px", textAlign: "center" }}>
                Dashboard
            </h2>
            <Box>
                <Grid container
                    spacing={4}
                    direction="row"
                    alignItems="center"
                    justifyContent="center" columnSpacing={4} sx={{
                        // ml: '45px',

                    }}
                >
                    <Grid item xs={12} sm={7} md={5} lg={3.5} >
                        <Sgocard />
                    </Grid>
                    <Grid item xs={12} sm={7} md={5} lg={3.5} >
                        <Sgocard />
                    </Grid>
                    <Grid item xs={12} sm={7} md={5} lg={3.5} >
                        <Sgocard />
                    </Grid>
                    <Grid item xs={12} sm={7} md={5} lg={3.5} >
                        <Sgocard />
                    </Grid>

                </Grid>
            </Box>
        </Box>
    )
}