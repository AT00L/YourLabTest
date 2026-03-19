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
  Avatar,
  IconButton,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import VerifiedIcon from '@mui/icons-material/Verified'
import GroupsIcon from '@mui/icons-material/Groups'
import ScienceIcon from '@mui/icons-material/Science'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import ShieldIcon from '@mui/icons-material/Shield'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async (category, brandIds) => {
    setLoading(true)
    try {
      const body = {}
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

  const filteredProducts = products.filter((item) => {
    const brandMatch = item.brandId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    const productMatch = item.products.some((product) =>
      product.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return brandMatch || productMatch
  })

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
          pt: 10,
          pb: 12,
          bgcolor: 'white',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            {/* Trust badge */}
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
                fontSize: { xs: '2.5rem', md: '4rem' },
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
              <br />
              Your Supplements
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: '#64748b',
                fontWeight: 400,
                mb: 5,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              India's first community-funded lab testing platform.
              Vote for products, fund the tests, get unbiased results.
            </Typography>

            {/* CTA Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 6 }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<KeyboardArrowRightIcon />}
                sx={{
                  bgcolor: '#6366f1',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '100px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  boxShadow: '0 1px 3px rgba(99, 102, 241, 0.3)',
                  '&:hover': {
                    bgcolor: '#4f46e5',
                  },
                }}
              >
                Start Voting
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: '#e2e8f0',
                  color: '#475569',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '100px',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    borderColor: '#cbd5e1',
                    bgcolor: '#f8fafc',
                  },
                }}
              >
                View Results
              </Button>
            </Box>

            {/* Stats - Real data from protein list */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: { xs: 3, md: 6 },
                flexWrap: 'wrap',
              }}
            >
              {[
                { value: `${products.length}`, label: 'Brands Listed', icon: <LocalFireDepartmentIcon sx={{ fontSize: 18 }} /> },
                { value: `${products.reduce((acc, item) => acc + item.products.length, 0)}`, label: 'Products', icon: <AutoAwesomeIcon sx={{ fontSize: 18 }} /> },
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
      <Container maxWidth="lg" sx={{ py: 6 }}>
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
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <TrendingUpIcon sx={{ color: '#6366f1', fontSize: 20 }} />
            <Typography sx={{ color: '#6366f1', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>
              Trending Now
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 800, letterSpacing: '-1px', mb: 1 }}>
            Whey Protein Testing Queue
          </Typography>
          <Typography sx={{ color: '#64748b', maxWidth: 500 }}>
            Vote for the products you want tested. Top voted products get tested first.
          </Typography>
        </Box>

        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search brands or products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mb: 4,
            maxWidth: 500,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
              borderRadius: '100px',
              '& fieldset': {
                borderColor: '#e2e8f0',
              },
              '&:hover fieldset': {
                borderColor: '#cbd5e1',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6366f1',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#94a3b8',
            },
          }}
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

        {/* Results count */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={`${filteredProducts.length} brands`}
            size="small"
            sx={{
              bgcolor: '#eef2ff',
              color: '#6366f1',
              fontWeight: 600,
            }}
          />
          <Chip
            label={`${filteredProducts.reduce((acc, item) => acc + item.products.length, 0)} products`}
            size="small"
            sx={{
              bgcolor: '#fdf2f8',
              color: '#db2777',
              fontWeight: 600,
            }}
          />
        </Box>

        {/* Brand Cards Grid */}
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
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {filteredProducts.map((item) => (
            <Paper
              key={item.brandId}
              elevation={0}
              onClick={() => setSelectedBrand(selectedBrand === item.brandId ? null : item.brandId)}
              sx={{
                p: 2.5,
                bgcolor: selectedBrand === item.brandId ? '#eef2ff' : 'white',
                borderRadius: '16px',
                border: selectedBrand === item.brandId ? '1px solid #6366f1' : '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#cbd5e1',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar
                  sx={{
                    width: 52,
                    height: 52,
                    bgcolor: item.color,
                    fontWeight: 800,
                    fontSize: '1.3rem',
                    borderRadius: '14px',
                  }}
                  variant="rounded"
                >
                  {item.displayName.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ color: '#1e293b', fontWeight: 700, fontSize: '1.1rem' }}>
                    {item.displayName}
                  </Typography>
                  <Typography sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                    {item.products.length} products
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: '#eef2ff',
                    color: '#6366f1',
                    '&:hover': { bgcolor: '#e0e7ff' },
                  }}
                >
                  <KeyboardArrowRightIcon
                    sx={{
                      transform: selectedBrand === item.brandId ? 'rotate(90deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                </IconButton>
              </Box>

              {/* Products list - shown when expanded */}
              {selectedBrand === item.brandId && (
                <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e2e8f0' }}>
                  {item.products.map((product, idx) => (
                    <Box
                      key={product}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 1.5,
                        borderBottom: idx < item.products.length - 1 ? '1px solid #f1f5f9' : 'none',
                      }}
                    >
                      <Typography sx={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 500, flex: 1 }}>
                        {product}
                      </Typography>
                      <Button
                        size="small"
                        sx={{
                          minWidth: 'auto',
                          px: 2,
                          py: 0.5,
                          borderRadius: '100px',
                          bgcolor: '#6366f1',
                          color: 'white',
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
                  ))}
                </Box>
              )}
            </Paper>
          ))}
        </Box>
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
              No products found matching "{searchTerm}"
            </Typography>
          </Paper>
        )}
      </Container>

      {/* CTA Section */}
      <Box sx={{ py: 10 }}>
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
