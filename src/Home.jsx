import { useState } from 'react'
import { protein } from './protein'
import { Avatar } from '@mui/material'
import {
  Container,
  Typography,
  Box,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  AppBar,
  Toolbar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ScienceIcon from '@mui/icons-material/Science'
import VerifiedIcon from '@mui/icons-material/Verified'
import GroupsIcon from '@mui/icons-material/Groups'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expanded, setExpanded] = useState(false)

  const handleAccordionChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const filteredProtein = protein.filter((item) => {
    const brandMatch = item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const productMatch = item.products.some((product) =>
      product.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return brandMatch || productMatch
  })

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      {/* Navigation */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <ScienceIcon sx={{ color: '#1976d2', mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#1976d2', fontWeight: 700 }}>
            YourLabTest
          </Typography>
          <Button color="primary">How it Works</Button>
          <Button color="primary">Categories</Button>
          <Button variant="contained" color="primary" sx={{ ml: 2 }}>
            Get Started
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
            YourLabTest
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            India's First Community-Funded Lab Testing
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto', opacity: 0.85 }}>
            Get independent, unbiased lab testing for your supplements. Powered by the community, for the community.
          </Typography>

          {/* Stats */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, mt: 4 }}>
            <Box>
              <Typography variant="h3" fontWeight={700}>20+</Typography>
              <Typography variant="body2">Brands</Typography>
            </Box>
            <Box>
              <Typography variant="h3" fontWeight={700}>65+</Typography>
              <Typography variant="body2">Products</Typography>
            </Box>
            <Box>
              <Typography variant="h3" fontWeight={700}>100%</Typography>
              <Typography variant="body2">Transparent</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={3}>
          {[
            { icon: <VerifiedIcon fontSize="large" />, title: 'Verified Results', desc: 'Third-party lab tested' },
            { icon: <GroupsIcon fontSize="large" />, title: 'Community Funded', desc: 'Vote for products to test' },
            { icon: <ScienceIcon fontSize="large" />, title: 'Scientific Approach', desc: 'Rigorous methodology' },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ color: '#1976d2', mb: 1 }}>{feature.icon}</Box>
                <Typography variant="h6" fontWeight={600}>{feature.title}</Typography>
                <Typography variant="body2" color="text.secondary">{feature.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <FitnessCenterIcon sx={{ color: '#1976d2', mr: 1 }} />
          <Typography variant="overline" color="primary" fontWeight={600}>
            Categories
          </Typography>
        </Box>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Whey Protein Supplements
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
          Browse through our collection of whey protein products available for testing. Search by brand or product name.
        </Typography>

        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search brands or products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mb: 4,
            maxWidth: 500,
            bgcolor: 'white',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Results count */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={`${filteredProtein.length} brands`}
            color="primary"
            variant="outlined"
            size="small"
          />
          <Chip
            label={`${filteredProtein.reduce((acc, item) => acc + item.products.length, 0)} products`}
            color="secondary"
            variant="outlined"
            size="small"
          />
        </Box>

        {/* Brand Accordions */}
        <Box>
          {filteredProtein.map((item) => (
            <Accordion
              key={item.brand}
              expanded={expanded === item.brand}
              onChange={handleAccordionChange(item.brand)}
              sx={{
                mb: 1,
                borderRadius: '8px !important',
                '&:before': { display: 'none' },
                boxShadow: expanded === item.brand ? 4 : 1,
                transition: 'box-shadow 0.2s',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                    gap: 2,
                  },
                }}
              >
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: item.color,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  }}
                >
                  {item.displayName.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.displayName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.products.length} products available
                  </Typography>
                </Box>
                <Chip
                  label="Whey Protein"
                  size="small"
                  sx={{ bgcolor: '#e8f5e9', color: '#2e7d32' }}
                />
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  {item.products.map((product) => (
                    <ListItem
                      key={product}
                      sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        '&:hover': { bgcolor: '#f5f5f5' },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleOutlineIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={product}
                        slotProps={{ primary: { variant: 'body2' } }}
                      />
                      <Button size="small" variant="outlined" color="primary">
                        Vote to Test
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {filteredProtein.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No products found matching "{searchTerm}"
            </Typography>
          </Paper>
        )}
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: '#1976d2', color: 'white', py: 6, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Can't find your product?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Submit a request and we'll add it to our testing queue.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: '#1976d2',
              '&:hover': { bgcolor: '#f5f5f5' },
            }}
          >
            Request a Product
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#263238', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ScienceIcon />
              <Typography variant="h6" fontWeight={700}>YourLabTest</Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © 2026 YourLabTest. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
