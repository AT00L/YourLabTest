import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from './api'
import {
  Container,
  Typography,
  Box,
  Chip,
  TextField,
  InputAdornment,
  Paper,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ScienceIcon from '@mui/icons-material/Science'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FilterListIcon from '@mui/icons-material/FilterList'

function CategoryPage() {
  const { category } = useParams()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrands, setSelectedBrands] = useState([])
  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedBrands, setExpandedBrands] = useState([])

  useEffect(() => {
    if (category) {
      fetchBrands(category)
      fetchProducts(category)
    }
  }, [category])

  useEffect(() => {
    if (category) {
      fetchProducts(category, selectedBrands)
    }
  }, [selectedBrands, category])

  const fetchBrands = async (cat) => {
    try {
      const response = await api.post('/product/getBrandByCategory', { category: cat })
      const fetchedBrands = response.data.data || []
      setBrands(fetchedBrands)
      // Expand all brands by default
      setExpandedBrands(fetchedBrands.map(b => b.brandId))
    } catch (error) {
      console.error('Failed to fetch brands:', error)
    }
  }

  const fetchProducts = async (cat, brandIds) => {
    setLoading(true)
    try {
      const body = { grouped: false, category: cat }
      if (brandIds && brandIds.length > 0) body.brandIds = brandIds
      const response = await api.post('/product/getProducts', body)
      setProducts(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (productId) => {
    try {
      await api.post('/product/voteProduct', { productId })
      setProducts(products.map(p =>
        p._id === productId ? { ...p, votes: (p.votes || 0) + 1 } : p
      ))
    } catch (error) {
      console.error('Failed to vote:', error)
    }
  }

  const handleBrandToggle = (brandId) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    )
  }

  const handleAccordionChange = (brandId) => {
    setExpandedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    )
  }

  const filteredProducts = products.filter((item) => {
    const nameMatch = item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const brandMatch = item.brand?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    return nameMatch || brandMatch
  }).sort((a, b) => (b.votes || 0) - (a.votes || 0))

  // Group products by brand
  const productsByBrand = brands.reduce((acc, brand) => {
    acc[brand.brandId] = filteredProducts.filter(p => p.brand?.brandId === brand.brandId || p.brand?._id === brand.brandId)
    return acc
  }, {})

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Navigation */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          bgcolor: 'white',
          borderBottom: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconButton onClick={() => navigate('/')} sx={{ mr: 1 }}>
                <ArrowBackIcon />
              </IconButton>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/')}
              >
                <ScienceIcon sx={{ color: 'white', fontSize: 22 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ color: '#1e293b', fontWeight: 800, letterSpacing: '-0.5px', cursor: 'pointer' }}
                onClick={() => navigate('/')}
              >
                YourLabTest
              </Typography>
              <Chip
                label="BETA"
                size="small"
                sx={{
                  bgcolor: '#eef2ff',
                  color: '#6366f1',
                  fontSize: '10px',
                  fontWeight: 700,
                  height: 20,
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Category Header */}
      <Box sx={{ bgcolor: 'white', py: 4, borderBottom: '1px solid #e2e8f0' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              color: '#1e293b',
              fontWeight: 800,
              letterSpacing: '-1px',
              mb: 1,
            }}
          >
            {category}
          </Typography>
          <Typography sx={{ color: '#64748b' }}>
            Browse and vote for products in this category
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Sidebar Filters */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                position: 'sticky',
                top: 80,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <FilterListIcon sx={{ color: '#6366f1' }} />
                <Typography sx={{ fontWeight: 600, color: '#1e293b' }}>Filters</Typography>
              </Box>

              {/* Search */}
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ mb: 3 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Brand Filter */}
              <Typography sx={{ fontWeight: 600, color: '#1e293b', mb: 1.5, fontSize: '0.9rem' }}>
                Brands
              </Typography>
              {selectedBrands.length > 0 && (
                <Button
                  size="small"
                  onClick={() => setSelectedBrands([])}
                  sx={{ mb: 1, textTransform: 'none', color: '#6366f1' }}
                >
                  Clear all
                </Button>
              )}
              <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                {brands.map((brand) => (
                  <FormControlLabel
                    key={brand.brandId}
                    control={
                      <Checkbox
                        checked={selectedBrands.includes(brand.brandId)}
                        onChange={() => handleBrandToggle(brand.brandId)}
                        size="small"
                        sx={{ color: '#6366f1', '&.Mui-checked': { color: '#6366f1' } }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: '0.9rem', color: '#475569' }}>
                        {brand.name}
                      </Typography>
                    }
                    sx={{ width: '100%', ml: 0, mb: 0.5 }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Products by Brand */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Chip
                label={`${filteredProducts.length} products`}
                size="small"
                sx={{
                  bgcolor: '#eef2ff',
                  color: '#6366f1',
                  fontWeight: 600,
                }}
              />
              <Typography sx={{ color: '#64748b', fontSize: '0.9rem' }}>
                {brands.length} brands
              </Typography>
            </Box>

            {loading ? (
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  textAlign: 'center',
                  bgcolor: 'white',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <Typography sx={{ color: '#64748b' }}>Loading products...</Typography>
              </Paper>
            ) : (
              <>
                {brands
                  .filter(brand =>
                    selectedBrands.length === 0 || selectedBrands.includes(brand.brandId)
                  )
                  .filter(brand => productsByBrand[brand.brandId]?.length > 0)
                  .map((brand) => (
                    <Accordion
                      key={brand.brandId}
                      expanded={expandedBrands.includes(brand.brandId)}
                      onChange={() => handleAccordionChange(brand.brandId)}
                      elevation={0}
                      sx={{
                        mb: 2,
                        bgcolor: 'white',
                        borderRadius: '16px !important',
                        border: '1px solid #e2e8f0',
                        '&:before': { display: 'none' },
                        overflow: 'hidden',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                          px: 3,
                          '& .MuiAccordionSummary-content': {
                            alignItems: 'center',
                            gap: 2,
                          },
                        }}
                      >
                        <Typography sx={{ fontWeight: 700, color: '#1e293b', fontSize: '1.1rem' }}>
                          {brand.name}
                        </Typography>
                        <Chip
                          label={`${productsByBrand[brand.brandId]?.length || 0} products`}
                          size="small"
                          sx={{
                            bgcolor: '#f1f5f9',
                            color: '#64748b',
                            fontSize: '0.75rem',
                          }}
                        />
                      </AccordionSummary>
                      <AccordionDetails sx={{ px: 3, pb: 3 }}>
                        <Grid container spacing={2}>
                          {productsByBrand[brand.brandId]?.map((product) => (
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={product._id}>
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 2.5,
                                  bgcolor: '#f8fafc',
                                  borderRadius: '12px',
                                  border: '1px solid #e2e8f0',
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    borderColor: '#cbd5e1',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                  },
                                }}
                              >
                                <Box sx={{ flex: 1 }}>
                                  <Typography
                                    sx={{
                                      color: '#1e293b',
                                      fontWeight: 700,
                                      fontSize: '0.95rem',
                                      mb: 0.5,
                                      lineHeight: 1.3,
                                    }}
                                  >
                                    {product.name}
                                  </Typography>
                                </Box>

                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mt: 2,
                                    pt: 2,
                                    borderTop: '1px solid #e2e8f0',
                                  }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <FavoriteBorderIcon sx={{ fontSize: 16, color: '#6366f1' }} />
                                    <Typography sx={{ fontWeight: 700, color: '#1e293b' }}>
                                      {product.votes || 0}
                                    </Typography>
                                    <Typography sx={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                                      interested
                                    </Typography>
                                  </Box>
                                  <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => handleVote(product._id)}
                                    sx={{
                                      minWidth: 'auto',
                                      px: 2,
                                      py: 0.5,
                                      borderRadius: '100px',
                                      bgcolor: '#6366f1',
                                      textTransform: 'none',
                                      fontWeight: 600,
                                      fontSize: '0.75rem',
                                      '&:hover': {
                                        bgcolor: '#4f46e5',
                                      },
                                    }}
                                  >
                                    I'm Interested
                                  </Button>
                                </Box>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  ))}

                {filteredProducts.length === 0 && (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 6,
                      textAlign: 'center',
                      bgcolor: 'white',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <Typography sx={{ color: '#64748b' }}>No products found</Typography>
                  </Paper>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ borderTop: '1px solid #e2e8f0', py: 4, bgcolor: 'white', mt: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ScienceIcon sx={{ color: 'white', fontSize: 18 }} />
              </Box>
              <Typography sx={{ color: '#1e293b', fontWeight: 700 }}>
                YourLabTest
              </Typography>
            </Box>
            <Typography sx={{ color: '#64748b', fontSize: '0.85rem' }}>
              Made with transparency for the fitness community
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default CategoryPage
