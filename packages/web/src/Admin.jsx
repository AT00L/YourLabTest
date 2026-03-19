import { useState } from 'react'
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
  IconButton,
  Alert,
  Snackbar,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import ScienceIcon from '@mui/icons-material/Science'

const CATEGORIES = [
  'Protein',
]

function Admin() {
  const navigate = useNavigate()
  const [productName, setProductName] = useState('')
  const [productImage, setProductImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProductImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setProductImage(null)
    setImagePreview(null)
  }

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value)
  }

  const handleSubmit = async () => {
    if (!productName.trim()) {
      setSnackbar({ open: true, message: 'Please enter a product name', severity: 'error' })
      return
    }

    if (selectedCategories.length === 0) {
      setSnackbar({ open: true, message: 'Please select at least one category', severity: 'error' })
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', productName)
      formData.append('categories', JSON.stringify(selectedCategories))
      if (productImage) {
        formData.append('image', productImage)
      }

      await api.post('/product/addProduct', formData)

      setSnackbar({ open: true, message: 'Product created successfully!', severity: 'success' })
      setProductName('')
      setProductImage(null)
      setImagePreview(null)
      setSelectedCategories([])
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

          {/* Product Image */}
          <Box sx={{ mb: 4 }}>
            <Typography sx={{ color: '#374151', fontWeight: 600, mb: 1.5 }}>
              Product Image
            </Typography>
            {!imagePreview ? (
              <Box
                component="label"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 4,
                  bgcolor: '#f8fafc',
                  border: '2px dashed #e2e8f0',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#6366f1',
                    bgcolor: '#f1f5f9',
                  },
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
                <CloudUploadIcon sx={{ fontSize: 48, color: '#94a3b8', mb: 2 }} />
                <Typography sx={{ color: '#64748b', fontWeight: 500 }}>
                  Click to upload image
                </Typography>
                <Typography sx={{ color: '#94a3b8', fontSize: '0.85rem', mt: 0.5 }}>
                  PNG, JPG up to 5MB
                </Typography>
              </Box>
            ) : (
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Product preview"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: 300,
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                  }}
                />
                <IconButton
                  onClick={handleRemoveImage}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: '#ef4444',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#dc2626',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* Product Categories */}
          <Box sx={{ mb: 4 }}>
            <Typography sx={{ color: '#374151', fontWeight: 600, mb: 1.5 }}>
              Category *
            </Typography>
            <FormControl fullWidth>
              <Select
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        size="small"
                        sx={{
                          bgcolor: '#eef2ff',
                          color: '#6366f1',
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                )}
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
                  '& .MuiSvgIcon-root': {
                    color: '#64748b',
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                      '& .MuiMenuItem-root': {
                        '&:hover': {
                          bgcolor: '#f1f5f9',
                        },
                        '&.Mui-selected': {
                          bgcolor: '#eef2ff',
                          '&:hover': {
                            bgcolor: '#e0e7ff',
                          },
                        },
                      },
                    },
                  },
                }}
              >
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

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
