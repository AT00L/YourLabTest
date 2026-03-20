import { useState, useEffect } from 'react'
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import VerifiedIcon from '@mui/icons-material/Verified'
import GroupsIcon from '@mui/icons-material/Groups'
import ScienceIcon from '@mui/icons-material/Science'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ShieldIcon from '@mui/icons-material/Shield'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import FilterListIcon from '@mui/icons-material/FilterList'

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      fetchBrands(selectedCategory)
      fetchProducts(selectedCategory)
    } else {
      setBrands([])
      setSelectedBrand('')
      fetchProducts()
    }
  }, [selectedCategory])

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory, selectedBrand ? [selectedBrand] : [])
    }
  }, [selectedBrand, selectedCategory])

  const fetchCategories = async () => {
    try {
      const response = await api.get('/product/getCategories')
      setCategories(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchBrands = async (category) => {
    try {
      const response = await api.post('/product/getBrandByCategory', { category })
      setBrands(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch brands:', error)
    }
  }

  const fetchProducts = async (category, brandIds) => {
    setLoading(true)
    try {
      const body = { grouped: false }
      if (category) body.category = category
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

  const filteredProducts = products.filter((item) => {
    const nameMatch = item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const brandMatch = item.brand?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    return nameMatch || brandMatch
  }).sort((a, b) => (b.votes || 0) - (a.votes || 0))

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
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ScienceIcon sx={{ color: 'white', fontSize: 22 }} />
              </Box>
              <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 800, letterSpacing: '-0.5px' }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button sx={{ color: '#64748b', textTransform: 'none', fontWeight: 500 }}>
                How it Works
              </Button>
              <Button sx={{ color: '#64748b', textTransform: 'none', fontWeight: 500 }}>
                Leaderboard
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#6366f1',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '100px',
                  px: 3,
                  boxShadow: '0 1px 3px rgba(99, 102, 241, 0.3)',
                  '&:hover': {
                    bgcolor: '#4f46e5',
                  },
                }}
              >
                Join Community
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: 8,
          pb: 8,
          bgcolor: 'white',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Chip
              icon={<ShieldIcon sx={{ fontSize: 16 }} />}
              label="Community-Funded Lab Testing"
              sx={{
                mb: 3,
                bgcolor: '#ecfdf5',
                color: '#059669',
                border: '1px solid #a7f3d0',
                fontWeight: 500,
                '& .MuiChip-icon': { color: '#059669' },
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 900,
                color: '#1e293b',
                lineHeight: 1.1,
                letterSpacing: '-2px',
                mb: 3,
              }}
            >
              Know What's{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Really Inside
              </Box>
              {' '}Your Supplements
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: '#64748b',
                fontWeight: 400,
                mb: 4,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              India's first community-funded lab testing platform.
              Vote for products, fund the tests, get unbiased results.
            </Typography>

            {/* Stats */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: { xs: 3, md: 6 },
                flexWrap: 'wrap',
              }}
            >
              {[
                { value: `${products.length}`, label: 'Products', icon: <LocalFireDepartmentIcon sx={{ fontSize: 18 }} /> },
                { value: `${categories.length}`, label: 'Categories', icon: <AutoAwesomeIcon sx={{ fontSize: 18 }} /> },
                { value: '100%', label: 'Transparent', icon: <VerifiedIcon sx={{ fontSize: 18 }} /> },
              ].map((stat, i) => (
                <Box key={i} sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 0.5 }}>
                    <Box sx={{ color: '#6366f1' }}>{stat.icon}</Box>
                    <Typography
                      variant="h4"
                      sx={{ color: '#1e293b', fontWeight: 800, letterSpacing: '-1px' }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Trust Features */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {[
            {
              icon: <VerifiedIcon />,
              title: 'NABL Certified Labs',
              desc: 'All tests conducted by accredited laboratories',
              color: '#059669',
              bgColor: '#ecfdf5',
            },
            {
              icon: <GroupsIcon />,
              title: 'Community Powered',
              desc: 'You vote, you fund, you get the truth',
              color: '#6366f1',
              bgColor: '#eef2ff',
            },
            {
              icon: <ScienceIcon />,
              title: 'Zero BS Guarantee',
              desc: 'No brand sponsorships, no hidden agendas',
              color: '#db2777',
              bgColor: '#fdf2f8',
            },
          ].map((feature, i) => (
            <Paper
              key={i}
              elevation={0}
              sx={{
                p: 3,
                bgcolor: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#cbd5e1',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  bgcolor: feature.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: feature.color,
                  mb: 2,
                }}
              >
                {feature.icon}
              </Box>
              <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 700, mb: 1 }}>
                {feature.title}
              </Typography>
              <Typography sx={{ color: '#64748b', fontSize: '0.9rem' }}>
                {feature.desc}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>

      {/* Products Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <TrendingUpIcon sx={{ color: '#6366f1', fontSize: 20 }} />
            <Typography sx={{ color: '#6366f1', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>
              Vote Now
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 800, letterSpacing: '-1px', mb: 1 }}>
            Product Testing Queue
          </Typography>
          <Typography sx={{ color: '#64748b', maxWidth: 500 }}>
            Vote for the products you want tested. Top voted products get tested first.
          </Typography>
        </Box>

        {/* Filters */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            bgcolor: 'white',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FilterListIcon sx={{ color: '#6366f1' }} />
            <Typography sx={{ fontWeight: 600, color: '#1e293b' }}>Filters</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value)
                    setSelectedBrand('')
                  }}
                  label="Category"
                  sx={{ borderRadius: '10px' }}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FormControl fullWidth size="small" disabled={!selectedCategory}>
                <InputLabel>Brand</InputLabel>
                <Select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  label="Brand"
                  sx={{ borderRadius: '10px' }}
                >
                  <MenuItem value="">All Brands</MenuItem>
                  {brands.map((brand) => (
                    <MenuItem key={brand.brandId} value={brand.brandId}>{brand.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Category Chips */}
        {categories.length > 0 && (
          <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label="All"
              onClick={() => setSelectedCategory('')}
              sx={{
                bgcolor: !selectedCategory ? '#6366f1' : '#eef2ff',
                color: !selectedCategory ? 'white' : '#6366f1',
                fontWeight: 600,
                '&:hover': { bgcolor: !selectedCategory ? '#4f46e5' : '#e0e7ff' },
              }}
            />
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  bgcolor: selectedCategory === cat ? '#6366f1' : '#eef2ff',
                  color: selectedCategory === cat ? 'white' : '#6366f1',
                  fontWeight: 600,
                  '&:hover': { bgcolor: selectedCategory === cat ? '#4f46e5' : '#e0e7ff' },
                }}
              />
            ))}
          </Box>
        )}

        {/* Results count */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={`${filteredProducts.length} products`}
            size="small"
            sx={{
              bgcolor: '#eef2ff',
              color: '#6366f1',
              fontWeight: 600,
            }}
          />
        </Box>

        {/* Products Grid */}
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
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    bgcolor: 'white',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#cbd5e1',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Chip
                      label={product.category}
                      size="small"
                      sx={{
                        bgcolor: '#f1f5f9',
                        color: '#64748b',
                        fontSize: '0.7rem',
                        mb: 1.5,
                        height: 22,
                      }}
                    />
                    <Typography
                      sx={{
                        color: '#1e293b',
                        fontWeight: 700,
                        fontSize: '1rem',
                        mb: 0.5,
                        lineHeight: 1.3,
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography sx={{ color: '#6366f1', fontSize: '0.85rem', fontWeight: 500 }}>
                      {product.brand?.name}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: '1px solid #f1f5f9' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ThumbUpIcon sx={{ fontSize: 16, color: '#6366f1' }} />
                      <Typography sx={{ fontWeight: 700, color: '#1e293b' }}>
                        {product.votes || 0}
                      </Typography>
                      <Typography sx={{ color: '#94a3b8', fontSize: '0.8rem' }}>votes</Typography>
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
                        fontSize: '0.8rem',
                        '&:hover': {
                          bgcolor: '#4f46e5',
                        },
                      }}
                    >
                      Vote
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && filteredProducts.length === 0 && (
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
            <Typography sx={{ color: '#64748b' }}>
              No products found
            </Typography>
          </Paper>
        )}
      </Container>

      {/* CTA Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: '24px',
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: 'white', fontWeight: 800, letterSpacing: '-1px', mb: 2 }}
            >
              Can't find your supplement?
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, maxWidth: 400, mx: 'auto' }}>
              Submit a request and rally the community to get it tested.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'white',
                color: '#6366f1',
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: '100px',
                px: 5,
                py: 1.5,
                '&:hover': {
                  background: '#f8fafc',
                },
              }}
            >
              Request a Product
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ borderTop: '1px solid #e2e8f0', py: 4, bgcolor: 'white' }}>
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

export default Home
