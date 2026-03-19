import { useState } from 'react'
import { protein } from './protein'
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

  const filteredProtein = protein.filter((item) => {
    const brandMatch = item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const productMatch = item.products.some((product) =>
      product.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return brandMatch || productMatch
  })

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a' }}>
      {/* Navigation */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(20px)',
          bgcolor: 'rgba(10, 10, 10, 0.8)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
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
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ScienceIcon sx={{ color: 'white', fontSize: 22 }} />
              </Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 800, letterSpacing: '-0.5px' }}>
                YourLabTest
              </Typography>
              <Chip
                label="BETA"
                size="small"
                sx={{
                  bgcolor: 'rgba(99, 102, 241, 0.2)',
                  color: '#818cf8',
                  fontSize: '10px',
                  fontWeight: 700,
                  height: 20,
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button sx={{ color: 'rgba(255,255,255,0.7)', textTransform: 'none', fontWeight: 500 }}>
                How it Works
              </Button>
              <Button sx={{ color: 'rgba(255,255,255,0.7)', textTransform: 'none', fontWeight: 500 }}>
                Leaderboard
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '100px',
                  px: 3,
                  boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
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
        }}
      >
        {/* Gradient orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '50%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '-10%',
            width: '40%',
            height: '80%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            {/* Trust badge */}
            <Chip
              icon={<ShieldIcon sx={{ fontSize: 16 }} />}
              label="Community-Funded Lab Testing"
              sx={{
                mb: 3,
                bgcolor: 'rgba(34, 197, 94, 0.1)',
                color: '#4ade80',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                fontWeight: 500,
                '& .MuiChip-icon': { color: '#4ade80' },
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 900,
                color: 'white',
                lineHeight: 1.1,
                letterSpacing: '-2px',
                mb: 3,
              }}
            >
              Know What's{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%)',
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
                color: 'rgba(255,255,255,0.6)',
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
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '100px',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)',
                }}
              >
                Start Voting
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: '100px',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    borderColor: 'rgba(255,255,255,0.4)',
                    bgcolor: 'rgba(255,255,255,0.05)',
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
                { value: `${protein.length}`, label: 'Brands Listed', icon: <LocalFireDepartmentIcon sx={{ fontSize: 18 }} /> },
                { value: `${protein.reduce((acc, item) => acc + item.products.length, 0)}`, label: 'Products', icon: <AutoAwesomeIcon sx={{ fontSize: 18 }} /> },
                { value: '100%', label: 'Transparent', icon: <VerifiedIcon sx={{ fontSize: 18 }} /> },
              ].map((stat, i) => (
                <Box key={i} sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 0.5 }}>
                    <Box sx={{ color: '#6366f1' }}>{stat.icon}</Box>
                    <Typography
                      variant="h4"
                      sx={{ color: 'white', fontWeight: 800, letterSpacing: '-1px' }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
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
              color: '#22c55e',
            },
            {
              icon: <GroupsIcon />,
              title: 'Community Powered',
              desc: 'You vote, you fund, you get the truth',
              color: '#6366f1',
            },
            {
              icon: <ScienceIcon />,
              title: 'Zero BS Guarantee',
              desc: 'No brand sponsorships, no hidden agendas',
              color: '#ec4899',
            },
          ].map((feature, i) => (
            <Paper
              key={i}
              sx={{
                p: 3,
                bgcolor: 'rgba(255,255,255,0.03)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.15)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '14px',
                  bgcolor: `${feature.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: feature.color,
                  mb: 2,
                }}
              >
                {feature.icon}
              </Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                {feature.title}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
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
            <TrendingUpIcon sx={{ color: '#ec4899', fontSize: 20 }} />
            <Typography sx={{ color: '#ec4899', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>
              Trending Now
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, letterSpacing: '-1px', mb: 1 }}>
            Whey Protein Testing Queue
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', maxWidth: 500 }}>
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
              bgcolor: 'rgba(255,255,255,0.05)',
              borderRadius: '100px',
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(255,255,255,0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255,255,255,0.2)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6366f1',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(255,255,255,0.4)',
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(255,255,255,0.4)' }} />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Results count */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={`${filteredProtein.length} brands`}
            size="small"
            sx={{
              bgcolor: 'rgba(99, 102, 241, 0.15)',
              color: '#818cf8',
              fontWeight: 600,
            }}
          />
          <Chip
            label={`${filteredProtein.reduce((acc, item) => acc + item.products.length, 0)} products`}
            size="small"
            sx={{
              bgcolor: 'rgba(236, 72, 153, 0.15)',
              color: '#f472b6',
              fontWeight: 600,
            }}
          />
        </Box>

        {/* Brand Cards Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {filteredProtein.map((item) => (
            <Paper
              key={item.brand}
              onClick={() => setSelectedBrand(selectedBrand === item.brand ? null : item.brand)}
              sx={{
                p: 2.5,
                bgcolor: selectedBrand === item.brand ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                border: selectedBrand === item.brand ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.06)',
                  borderColor: 'rgba(255,255,255,0.15)',
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
                  <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>
                    {item.displayName}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                    {item.products.length} products
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                    color: '#818cf8',
                    '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.2)' },
                  }}
                >
                  <KeyboardArrowRightIcon
                    sx={{
                      transform: selectedBrand === item.brand ? 'rotate(90deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                </IconButton>
              </Box>

              {/* Products list - shown when expanded */}
              {selectedBrand === item.brand && (
                <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  {item.products.map((product, idx) => (
                    <Box
                      key={product}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 1.5,
                        borderBottom: idx < item.products.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      }}
                    >
                      <Typography sx={{ color: 'white', fontSize: '0.9rem', fontWeight: 500, flex: 1 }}>
                        {product}
                      </Typography>
                      <Button
                        size="small"
                        sx={{
                          minWidth: 'auto',
                          px: 2,
                          py: 0.5,
                          borderRadius: '100px',
                          bgcolor: 'rgba(99, 102, 241, 0.15)',
                          color: '#818cf8',
                          textTransform: 'none',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          '&:hover': {
                            bgcolor: 'rgba(99, 102, 241, 0.25)',
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

        {filteredProtein.length === 0 && (
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              bgcolor: 'rgba(255,255,255,0.03)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>
              No products found matching "{searchTerm}"
            </Typography>
          </Paper>
        )}
      </Container>

      {/* CTA Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="md">
          <Paper
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: 'white', fontWeight: 800, letterSpacing: '-1px', mb: 2 }}
            >
              Can't find your supplement?
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 4, maxWidth: 400, mx: 'auto' }}>
              Submit a request and rally the community to get it tested.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: 'white',
                color: '#0a0a0a',
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: '100px',
                px: 5,
                py: 1.5,
                '&:hover': {
                  background: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Request a Product
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.08)', py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ScienceIcon sx={{ color: 'white', fontSize: 18 }} />
              </Box>
              <Typography sx={{ color: 'white', fontWeight: 700 }}>
                YourLabTest
              </Typography>
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
              Made with transparency for the fitness community
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
