import { useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Chip,
  Paper,
  Button,
  Grid,
  IconButton,
} from '@mui/material'
import ScienceIcon from '@mui/icons-material/Science'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import GroupsIcon from '@mui/icons-material/Groups'
import PublicIcon from '@mui/icons-material/Public'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import HandshakeIcon from '@mui/icons-material/Handshake'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

function HowItWorks() {
  const navigate = useNavigate()

  const steps = [
    {
      number: '01',
      title: 'Show Your Interest',
      description: 'Browse products and click "I\'m Interested" on supplements you want tested. This shows others that you\'re willing to contribute when enough people join.',
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
      color: '#6366f1',
      bgColor: '#eef2ff',
      details: [
        'Browse by category or search for specific products',
        'Click "I\'m Interested" to register your vote',
        'See how many others want the same product tested',
      ],
    },
    {
      number: '02',
      title: 'Community Pools Together',
      description: 'When enough people show interest, we open contributions. Everyone chips in a small amount - making lab testing affordable for all.',
      icon: <GroupsIcon sx={{ fontSize: 32 }} />,
      color: '#059669',
      bgColor: '#ecfdf5',
      details: [
        'Target contribution amount is displayed',
        'Contribute any amount you\'re comfortable with',
        'Track progress as community pools together',
      ],
    },
    {
      number: '03',
      title: 'NABL Certified Lab Testing',
      description: 'Once the target is reached, we send the product to a NABL accredited laboratory. No shortcuts, no compromises - real scientific testing.',
      icon: <ScienceIcon sx={{ fontSize: 32 }} />,
      color: '#dc2626',
      bgColor: '#fef2f2',
      details: [
        'Product purchased anonymously',
        'Sent to NABL accredited laboratory',
        'Comprehensive testing for claimed ingredients',
      ],
    },
    {
      number: '04',
      title: 'Results Go Public',
      description: 'Test results are published on our website for everyone to see - contributors and non-contributors alike. Complete transparency.',
      icon: <PublicIcon sx={{ fontSize: 32 }} />,
      color: '#7c3aed',
      bgColor: '#f5f3ff',
      details: [
        'Full lab report made available',
        'Easy-to-understand summary',
        'Accessible to everyone, forever',
      ],
    },
  ]

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

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'white',
          pt: 8,
          pb: 10,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Chip
              icon={<PlayCircleOutlineIcon sx={{ fontSize: 16 }} />}
              label="The Process"
              sx={{
                mb: 3,
                bgcolor: '#eef2ff',
                color: '#6366f1',
                border: '1px solid #c7d2fe',
                fontWeight: 600,
                '& .MuiChip-icon': { color: '#6366f1' },
              }}
            />

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 900,
                color: '#1e293b',
                lineHeight: 1.2,
                letterSpacing: '-1.5px',
                mb: 3,
              }}
            >
              How{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Community Testing
              </Box>
              {' '}Works
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: '#64748b',
                fontWeight: 400,
                mb: 4,
                lineHeight: 1.7,
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              One person can't afford lab testing. But together, we can test everything.
              Here's the simple 4-step process.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/')}
              sx={{
                bgcolor: '#6366f1',
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: '100px',
                px: 5,
                py: 1.5,
                fontSize: '1rem',
                '&:hover': {
                  bgcolor: '#4f46e5',
                },
              }}
            >
              Start Contributing
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Steps Section - Vertical Timeline */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box sx={{ position: 'relative' }}>
          {/* Vertical Line */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 24, md: 40 },
              top: 0,
              bottom: 0,
              width: 2,
              bgcolor: '#e2e8f0',
              display: { xs: 'none', sm: 'block' },
            }}
          />

          {steps.map((step, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                gap: { xs: 2, md: 4 },
                mb: i < steps.length - 1 ? 6 : 0,
                position: 'relative',
              }}
            >
              {/* Step Number Circle */}
              <Box
                sx={{
                  width: { xs: 48, md: 80 },
                  height: { xs: 48, md: 80 },
                  borderRadius: '50%',
                  bgcolor: step.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                  border: '4px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '1.25rem', md: '2rem' },
                    fontWeight: 900,
                    color: step.color,
                  }}
                >
                  {step.number}
                </Typography>
              </Box>

              {/* Step Content */}
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: { xs: 3, md: 4 },
                  bgcolor: 'white',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: step.color,
                    boxShadow: `0 8px 24px ${step.bgColor}`,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      bgcolor: step.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: step.color,
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: '#1e293b', letterSpacing: '-0.5px' }}
                  >
                    {step.title}
                  </Typography>
                </Box>
                <Typography sx={{ color: '#64748b', lineHeight: 1.7, mb: 2 }}>
                  {step.description}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {step.details.map((detail, j) => (
                    <Box key={j} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: step.color, fontSize: 18 }} />
                      <Typography sx={{ color: '#475569', fontSize: '0.9rem' }}>{detail}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Simple Math Section */}
      <Box sx={{ bgcolor: 'white', py: 8 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Chip
              icon={<HandshakeIcon sx={{ fontSize: 16 }} />}
              label="The Math"
              sx={{
                mb: 2,
                bgcolor: '#ecfdf5',
                color: '#059669',
                border: '1px solid #a7f3d0',
                fontWeight: 600,
                '& .MuiChip-icon': { color: '#059669' },
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: '#1e293b',
                letterSpacing: '-1px',
              }}
            >
              Simple Numbers, Big Impact
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  bgcolor: '#fef2f2',
                  borderRadius: '20px',
                  textAlign: 'center',
                  height: '100%',
                }}
              >
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 900, color: '#dc2626', mb: 1 }}>
                  ₹15,000+
                </Typography>
                <Typography sx={{ color: '#991b1b', fontWeight: 600 }}>
                  Cost for one person
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  bgcolor: '#eef2ff',
                  borderRadius: '20px',
                  textAlign: 'center',
                  height: '100%',
                }}
              >
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 900, color: '#6366f1', mb: 1 }}>
                  100
                </Typography>
                <Typography sx={{ color: '#4338ca', fontWeight: 600 }}>
                  People come together
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  bgcolor: '#ecfdf5',
                  borderRadius: '20px',
                  textAlign: 'center',
                  height: '100%',
                }}
              >
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 900, color: '#059669', mb: 1 }}>
                  ₹150
                </Typography>
                <Typography sx={{ color: '#047857', fontWeight: 600 }}>
                  Each person pays
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Typography sx={{ textAlign: 'center', color: '#64748b', mt: 4, fontSize: '1.1rem' }}>
            That's the power of community. Affordable testing for everyone.
          </Typography>
        </Container>
      </Box>

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
              Ready to Get Started?
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.85)', mb: 4, maxWidth: 450, mx: 'auto', lineHeight: 1.7 }}>
              Browse products and show your interest. Every click brings us closer to the truth.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/')}
                sx={{
                  bgcolor: 'white',
                  color: '#6366f1',
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: '100px',
                  px: 5,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#f8fafc',
                  },
                }}
              >
                Browse Products
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/our-mission')}
                sx={{
                  borderColor: 'rgba(255,255,255,0.5)',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: '100px',
                  px: 5,
                  py: 1.5,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Our Mission
              </Button>
            </Box>
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
              For the change, be the change.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default HowItWorks
