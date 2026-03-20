import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './api'
import {
  Container,
  Typography,
  Box,
  Chip,
  Paper,
  Button,
  Grid,
} from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'
import GroupsIcon from '@mui/icons-material/Groups'
import ScienceIcon from '@mui/icons-material/Science'
import ShieldIcon from '@mui/icons-material/Shield'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import BoltIcon from '@mui/icons-material/Bolt'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy'
import SpaIcon from '@mui/icons-material/Spa'
import CategoryIcon from '@mui/icons-material/Category'

// Category icon mapping
const categoryIcons = {
  'Whey Protein': FitnessCenterIcon,
  'Pre-Workout': BoltIcon,
  'Creatine': ScienceIcon,
  'BCAA': RestaurantIcon,
  'Multivitamins': LocalPharmacyIcon,
  'Fish Oil': SpaIcon,
}

const categoryColors = {
  'Whey Protein': { bg: '#fef3c7', color: '#d97706', border: '#fcd34d' },
  'Pre-Workout': { bg: '#fce7f3', color: '#db2777', border: '#f9a8d4' },
  'Creatine': { bg: '#dbeafe', color: '#2563eb', border: '#93c5fd' },
  'BCAA': { bg: '#d1fae5', color: '#059669', border: '#6ee7b7' },
  'Multivitamins': { bg: '#ede9fe', color: '#7c3aed', border: '#c4b5fd' },
  'Fish Oil': { bg: '#ffedd5', color: '#ea580c', border: '#fdba74' },
}

function Home() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await api.get('/product/getCategories')
      setCategories(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await api.post('/product/getProducts', { grouped: false })
      setProducts(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`)
  }

  // Get product count per category
  const getProductCount = (category) => {
    return products.filter(p => p.category === category).length
  }

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

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <CategoryIcon sx={{ color: '#6366f1', fontSize: 20 }} />
            <Typography sx={{ color: '#6366f1', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>
              Browse Categories
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 800, letterSpacing: '-1px', mb: 1 }}>
            Select a Category
          </Typography>
          <Typography sx={{ color: '#64748b', maxWidth: 500 }}>
            Choose a supplement category to view products and cast your vote.
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
            <Typography sx={{ color: '#64748b' }}>Loading categories...</Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {categories.map((category) => {
              const IconComponent = categoryIcons[category] || CategoryIcon
              const colors = categoryColors[category] || { bg: '#eef2ff', color: '#6366f1', border: '#c7d2fe' }
              const productCount = getProductCount(category)

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category}>
                  <Paper
                    elevation={0}
                    onClick={() => handleCategoryClick(category)}
                    sx={{
                      p: 3,
                      bgcolor: 'white',
                      borderRadius: '20px',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: colors.border,
                        transform: 'translateY(-6px)',
                        boxShadow: `0 12px 24px ${colors.bg}`,
                        '& .arrow-icon': {
                          transform: 'translateX(4px)',
                        },
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '16px',
                          bgcolor: colors.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconComponent sx={{ color: colors.color, fontSize: 28 }} />
                      </Box>
                      <Box
                        className="arrow-icon"
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '10px',
                          bgcolor: '#f8fafc',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform 0.2s ease',
                        }}
                      >
                        <ArrowForwardIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                      </Box>
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        color: '#1e293b',
                        fontWeight: 700,
                        mb: 0.5,
                      }}
                    >
                      {category}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography sx={{ color: '#64748b', fontSize: '0.9rem' }}>
                        {productCount} products
                      </Typography>
                      <Chip
                        label="Vote now"
                        size="small"
                        sx={{
                          bgcolor: colors.bg,
                          color: colors.color,
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          height: 22,
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        )}

        {!loading && categories.length === 0 && (
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
              No categories found
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
