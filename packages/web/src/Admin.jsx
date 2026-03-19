import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './api'
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Chip,
  Alert,
  Snackbar,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  CircularProgress,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import ScienceIcon from '@mui/icons-material/Science'

const CATEGORIES = [
  'Protein',
  'Creatine',
  'Pre-Workout',
  'BCAA',
  'Vitamins',
]

function Admin() {
  const navigate = useNavigate()
  const [productName, setProductName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [newBrandName, setNewBrandName] = useState('')
  const [showNewBrandInput, setShowNewBrandInput] = useState(false)
  const [brandsLoading, setBrandsLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  useEffect(() => {
    if (selectedCategory) {
      fetchBrands(selectedCategory)
    } else {
      setBrands([])
      setSelectedBrand('')
    }
  }, [selectedCategory])

  const fetchBrands = async (category) => {
    setBrandsLoading(true)
    try {
      const response = await api.post('/product/getBrandByCategory', { category })
      setBrands(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch brands:', error)
      setBrands([])
    } finally {
      setBrandsLoading(false)
    }
  }

  const handleCreateBrand = async () => {
    if (!newBrandName.trim()) {
      setSnackbar({ open: true, message: 'Please enter a brand name', severity: 'error' })
      return
    }
    try {
      const response = await api.post('/product/createBrand', {
        name: newBrandName.trim(),
        category: selectedCategory
      })
      if (response.data.status) {
        setSnackbar({ open: true, message: 'Brand created successfully!', severity: 'success' })
        setNewBrandName('')
        setShowNewBrandInput(false)
        fetchBrands(selectedCategory)
      } else {
        setSnackbar({ open: true, message: response.data.message, severity: 'error' })
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to create brand', severity: 'error' })
    }
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
    setSelectedBrand('')
    setShowNewBrandInput(false)
  }

  const handleSubmit = async () => {
    if (!productName.trim()) {
      setSnackbar({ open: true, message: 'Please enter a product name', severity: 'error' })
      return
    }

    if (!selectedCategory) {
      setSnackbar({ open: true, message: 'Please select a category', severity: 'error' })
      return
    }

    if (!selectedBrand) {
      setSnackbar({ open: true, message: 'Please select a brand', severity: 'error' })
      return
    }

    setLoading(true)

    try {
      await api.post('/product/addProduct', {
        name: productName,
        category: selectedCategory,
        brand: selectedBrand
      })

      setSnackbar({ open: true, message: 'Product created successfully!', severity: 'success' })
      setProductName('')
      setSelectedCategory('')
      setSelectedBrand('')
    } catch (error) {
      setSnackbar({ open: true, message: error.message || 'Failed to create product', severity: 'error' })
    } finally {
      setLoading(false)
    }
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
                label="ADMIN"
                size="small"
                sx={{
                  bgcolor: '#fef2f2',
                  color: '#dc2626',
                  fontSize: '10px',
                  fontWeight: 700,
                  height: 20,
                }}
              />
            </Box>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              sx={{
                color: '#64748b',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  bgcolor: '#f1f5f9',
                },
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              color: '#1e293b',
              fontWeight: 800,
              letterSpacing: '-1px',
              mb: 1,
            }}
          >
            Add New Product
          </Typography>
          <Typography sx={{ color: '#64748b' }}>
            Enter product details to add it to the testing queue
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            bgcolor: 'white',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
          }}
        >
          {/* Product Name */}
          <Box sx={{ mb: 4 }}>
            <Typography sx={{ color: '#374151', fontWeight: 600, mb: 1.5 }}>
              Product Name *
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g., Optimum Nutrition Gold Standard Whey"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#f8fafc',
                  borderRadius: '10px',
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
            />
          </Box>

          {/* Category */}
          <Box sx={{ mb: 4 }}>
            <Typography sx={{ color: '#374151', fontWeight: 600, mb: 1.5 }}>
              Category *
            </Typography>
            <FormControl fullWidth>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                displayEmpty
                input={<OutlinedInput />}
                sx={{
                  bgcolor: '#f8fafc',
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e2e8f0',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#cbd5e1',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6366f1',
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    },
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <Typography sx={{ color: '#94a3b8' }}>Select a category</Typography>
                </MenuItem>
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Brand - Only show when category is selected */}
          {selectedCategory && (
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ color: '#374151', fontWeight: 600, mb: 1.5 }}>
                Brand *
              </Typography>
              {brandsLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#f8fafc', borderRadius: '10px' }}>
                  <CircularProgress size={20} />
                  <Typography sx={{ color: '#64748b' }}>Loading brands...</Typography>
                </Box>
              ) : (
                <>
                  <FormControl fullWidth>
                    <Select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      displayEmpty
                      input={<OutlinedInput />}
                      sx={{
                        bgcolor: '#f8fafc',
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e2e8f0',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#cbd5e1',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#6366f1',
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                          },
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        <Typography sx={{ color: '#94a3b8' }}>Select a brand</Typography>
                      </MenuItem>
                      {brands.map((brand) => (
                        <MenuItem key={brand._id} value={brand.name}>
                          {brand.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Create new brand */}
                  {!showNewBrandInput ? (
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => setShowNewBrandInput(true)}
                      sx={{
                        mt: 1.5,
                        color: '#6366f1',
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          bgcolor: '#eef2ff',
                        },
                      }}
                    >
                      Create new brand
                    </Button>
                  ) : (
                    <Box sx={{ mt: 2, p: 2, bgcolor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <Typography sx={{ color: '#374151', fontWeight: 600, mb: 1.5, fontSize: '0.9rem' }}>
                        New Brand for {selectedCategory}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="Enter brand name"
                          value={newBrandName}
                          onChange={(e) => setNewBrandName(e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'white',
                              borderRadius: '8px',
                            },
                          }}
                        />
                        <Button
                          variant="contained"
                          onClick={handleCreateBrand}
                          sx={{
                            bgcolor: '#6366f1',
                            textTransform: 'none',
                            borderRadius: '8px',
                            px: 3,
                            '&:hover': {
                              bgcolor: '#4f46e5',
                            },
                          }}
                        >
                          Add
                        </Button>
                        <Button
                          onClick={() => {
                            setShowNewBrandInput(false)
                            setNewBrandName('')
                          }}
                          sx={{
                            color: '#64748b',
                            textTransform: 'none',
                            borderRadius: '8px',
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  )}
                </>
              )}
            </Box>
          )}

          {/* Submit Button */}
          <Button
            variant="contained"
            size="large"
            disabled={loading}
            onClick={handleSubmit}
            startIcon={<AddIcon />}
            fullWidth
            sx={{
              bgcolor: '#6366f1',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '10px',
              py: 1.5,
              fontSize: '1rem',
              boxShadow: '0 1px 3px rgba(99, 102, 241, 0.3)',
              '&:hover': {
                bgcolor: '#4f46e5',
              },
              '&.Mui-disabled': {
                bgcolor: '#e2e8f0',
                color: '#94a3b8',
              },
            }}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </Button>
        </Paper>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Admin
