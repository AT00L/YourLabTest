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
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import VerifiedIcon from '@mui/icons-material/Verified'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import FlagIcon from '@mui/icons-material/Flag'
import PeopleIcon from '@mui/icons-material/People'
import GavelIcon from '@mui/icons-material/Gavel'

function OurMission() {
  const navigate = useNavigate()

  const problems = [
    {
      stat: '70%+',
      title: 'Products Fail Quality Tests',
      description: 'Studies show majority of supplements in India don\'t contain what they claim on the label.',
    },
    {
      stat: '₹15,000+',
      title: 'Cost of Lab Testing',
      description: 'Getting a single product tested costs more than the product itself. Unaffordable for individuals.',
    },
    {
      stat: 'Zero',
      title: 'Mandatory Testing',
      description: 'India has no mandatory third-party testing for supplements. Brands can claim anything.',
    },
  ]

  const values = [
    {
      icon: <VerifiedIcon sx={{ fontSize: 28 }} />,
      title: 'Truth Over Everything',
      description: 'We publish results as they are - good or bad. No sugarcoating, no hiding.',
      color: '#059669',
      bgColor: '#ecfdf5',
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 28 }} />,
      title: 'Community First',
      description: 'Every decision we make is for the community, not brands or sponsors.',
      color: '#6366f1',
      bgColor: '#eef2ff',
    },
    {
      icon: <GavelIcon sx={{ fontSize: 28 }} />,
      title: 'Complete Independence',
      description: 'Zero brand money means zero influence. Our loyalty is only to you.',
      color: '#dc2626',
      bgColor: '#fef2f2',
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
              icon={<FlagIcon sx={{ fontSize: 16 }} />}
              label="Our Mission"
              sx={{
                mb: 3,
                bgcolor: '#fef3c7',
                color: '#d97706',
                border: '1px solid #fcd34d',
                fontWeight: 600,
                '& .MuiChip-icon': { color: '#d97706' },
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
              United for{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Unbiased Testing
              </Box>
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: '#64748b',
                fontWeight: 400,
                mb: 4,
                lineHeight: 1.7,
                maxWidth: 650,
                mx: 'auto',
              }}
            >
              We believe every consumer deserves to know exactly what they're putting in their body.
              No more blind trust. No more guesswork. Just science-backed truth.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* The Problem Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            icon={<WarningAmberIcon sx={{ fontSize: 16 }} />}
            label="The Reality"
            sx={{
              mb: 2,
              bgcolor: '#fef2f2',
              color: '#dc2626',
              border: '1px solid #fecaca',
              fontWeight: 600,
              '& .MuiChip-icon': { color: '#dc2626' },
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#1e293b',
              letterSpacing: '-1px',
              mb: 2,
            }}
          >
            The Harsh Truth About Supplements in India
          </Typography>
          <Typography sx={{ color: '#64748b', maxWidth: 600, mx: 'auto' }}>
            You trust brands with your health. But should you? Here's what's really happening.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {problems.map((problem, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  bgcolor: 'white',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  height: '100%',
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '3rem',
                    fontWeight: 900,
                    color: '#dc2626',
                    letterSpacing: '-2px',
                    mb: 1,
                  }}
                >
                  {problem.stat}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}
                >
                  {problem.title}
                </Typography>
                <Typography sx={{ color: '#64748b', fontSize: '0.95rem' }}>
                  {problem.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 4,
            bgcolor: '#fffbeb',
            borderRadius: '20px',
            border: '1px solid #fcd34d',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <WarningAmberIcon sx={{ color: '#d97706', fontSize: 28, mt: 0.5 }} />
            <Box>
              <Typography sx={{ fontWeight: 700, color: '#92400e', mb: 1 }}>
                Even "Big Brands" Are Not Immune
              </Typography>
              <Typography sx={{ color: '#a16207', lineHeight: 1.7 }}>
                Brand reputation means nothing without verification. Popular brands with thousands of reviews
                have been caught with underdosed products, heavy metal contamination, and missing ingredients.
                Marketing budgets don't equal quality. Only lab reports do.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Our Values Section */}
      <Box sx={{ bgcolor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip
              icon={<LightbulbIcon sx={{ fontSize: 16 }} />}
              label="What We Stand For"
              sx={{
                mb: 2,
                bgcolor: '#eef2ff',
                color: '#6366f1',
                border: '1px solid #c7d2fe',
                fontWeight: 600,
                '& .MuiChip-icon': { color: '#6366f1' },
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: '#1e293b',
                letterSpacing: '-1px',
                mb: 2,
              }}
            >
              Our Core Values
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {values.map((value, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    bgcolor: '#f8fafc',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    height: '100%',
                    textAlign: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '16px',
                      bgcolor: value.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: value.color,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {value.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}
                  >
                    {value.title}
                  </Typography>
                  <Typography sx={{ color: '#64748b', lineHeight: 1.6 }}>
                    {value.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Zero Sponsorship Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Chip
              icon={<VerifiedIcon sx={{ fontSize: 16 }} />}
              label="Our Promise"
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
                mb: 3,
              }}
            >
              Zero Sponsorship. Zero Bias.
            </Typography>
            <Typography sx={{ color: '#64748b', lineHeight: 1.8, mb: 3 }}>
              We will <strong>never</strong> accept money from supplement brands. Not for testing,
              not for advertising, not for anything. The moment we take brand money, we lose your trust.
            </Typography>
            <Typography sx={{ color: '#64748b', lineHeight: 1.8, mb: 3 }}>
              Our only source of funding is the community - people like you who want the truth.
              This keeps us honest and the results unbiased.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                'No brand sponsorships - ever',
                'No paid promotions or reviews',
                'No affiliate links or commissions',
                'Results published as-is, good or bad',
              ].map((item, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <VerifiedIcon sx={{ color: '#059669', fontSize: 20 }} />
                  <Typography sx={{ color: '#1e293b', fontWeight: 500 }}>{item}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 5,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                borderRadius: '24px',
                textAlign: 'center',
              }}
            >
              <VolunteerActivismIcon sx={{ fontSize: 64, color: 'white', mb: 2 }} />
              <Typography
                variant="h4"
                sx={{ color: 'white', fontWeight: 800, mb: 2, letterSpacing: '-0.5px' }}
              >
                Funded By You
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)', mb: 3, lineHeight: 1.7 }}>
                When 100 people contribute ₹150 each, we can test a product that would cost
                one person ₹15,000. That's the power of community.
              </Typography>
              <Chip
                label="100% Community Funded"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  py: 2,
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Quote Section */}
      <Box sx={{ py: 8, bgcolor: 'white' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                fontStyle: 'italic',
                color: '#475569',
                fontWeight: 500,
                lineHeight: 1.6,
                mb: 3,
              }}
            >
              "Alone we can do so little; together we can do so much."
            </Typography>
            <Typography sx={{ color: '#94a3b8', fontWeight: 500 }}>
              — Helen Keller
            </Typography>
          </Box>
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
              bgcolor: '#1e293b',
              borderRadius: '24px',
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: 'white', fontWeight: 800, letterSpacing: '-1px', mb: 2 }}
            >
              Ready to Join the Movement?
            </Typography>
            <Typography sx={{ color: '#94a3b8', mb: 4, maxWidth: 500, mx: 'auto', lineHeight: 1.7 }}>
              Be part of India's first community-funded supplement testing initiative.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/how-it-works')}
                sx={{
                  bgcolor: 'white',
                  color: '#1e293b',
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: '100px',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#f1f5f9',
                  },
                }}
              >
                See How It Works
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/')}
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: '100px',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  },
                }}
              >
                Browse Products
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

export default OurMission
