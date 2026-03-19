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
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import ScienceIcon from '@mui/icons-material/Science'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import ClearIcon from '@mui/icons-material/Clear'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

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

  // Products list state
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState('')
  const [filterBrandId, setFilterBrandId] = useState('')
  const [filterBrands, setFilterBrands] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [editDialog, setEditDialog] = useState({ open: false, product: null })
  const [editForm, setEditForm] = useState({ name: '', category: '', brandId: '' })
  const [editBrands, setEditBrands] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [filterCategory, filterBrandId])

  useEffect(() => {
    if (filterCategory) {
      fetchFilterBrands(filterCategory)
    } else {
      setFilterBrands([])
      setFilterBrandId('')
    }
  }, [filterCategory])

  const fetchProducts = async () => {
    setProductsLoading(true)
    try {
      const body = { grouped: false }
      if (filterCategory) body.category = filterCategory
      if (filterBrandId) body.brandIds = [filterBrandId]
      const response = await api.post('/product/getProducts', body)
      setProducts(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setProducts([])
    } finally {
      setProductsLoading(false)
    }
  }

  const fetchFilterBrands = async (category) => {
    try {
      const response = await api.post('/product/getBrandByCategory', { category })
      setFilterBrands(response.data.data || [])
    } catch (error) {
      setFilterBrands([])
    }
  }

  const clearFilters = () => {
    setFilterCategory('')
    setFilterBrandId('')
    setSearchTerm('')
  }

  const filteredProducts = products.filter((item) => {
    if (!searchTerm) return true
    const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const brandMatch = item.brand?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    return nameMatch || brandMatch
  })

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map((p) => p._id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return
    if (!window.confirm(`Delete ${selectedIds.length} product(s)?`)) return
    try {
      const response = await api.post('/product/deleteProducts', { ids: selectedIds })
      if (response.data.status) {
        setSnackbar({ open: true, message: response.data.message, severity: 'success' })
        setSelectedIds([])
        fetchProducts()
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to delete products', severity: 'error' })
    }
  }

  const handleEditClick = async (product) => {
    setEditForm({ name: product.name, category: product.category, brandId: product.brand?.brandId || '' })
    setEditDialog({ open: true, product })
    // Fetch brands for the category
    try {
      const response = await api.post('/product/getBrandByCategory', { category: product.category })
      setEditBrands(response.data.data || [])
    } catch {
      setEditBrands([])
    }
  }

  const handleEditCategoryChange = async (category) => {
    setEditForm((prev) => ({ ...prev, category, brandId: '' }))
    try {
      const response = await api.post('/product/getBrandByCategory', { category })
      setEditBrands(response.data.data || [])
    } catch {
      setEditBrands([])
    }
  }

  const handleEditSave = async () => {
    try {
      const response = await api.post('/product/updateProduct', {
        id: editDialog.product._id,
        ...editForm
      })
      if (response.data.status) {
        setSnackbar({ open: true, message: 'Product updated successfully', severity: 'success' })
        setEditDialog({ open: false, product: null })
        fetchProducts()
      } else {
        setSnackbar({ open: true, message: response.data.message, severity: 'error' })
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to update product', severity: 'error' })
    }
  }

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
        brandId: selectedBrand
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
                        <MenuItem key={brand.brandId} value={brand.brandId}>
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

        {/* Products List Section */}
        <Box sx={{ mt: 6, mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              color: '#1e293b',
              fontWeight: 800,
              letterSpacing: '-1px',
              mb: 1,
            }}
          >
            All Products
          </Typography>
          <Typography sx={{ color: '#64748b' }}>
            View and filter all products in the database
          </Typography>
        </Box>

        {/* Filters */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: 'white',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <FilterListIcon sx={{ color: '#6366f1', fontSize: 20 }} />
            <Typography sx={{ color: '#374151', fontWeight: 600 }}>Filters</Typography>
            {(filterCategory || filterBrandId || searchTerm) && (
              <Button
                size="small"
                startIcon={<ClearIcon />}
                onClick={clearFilters}
                sx={{ ml: 'auto', color: '#64748b', textTransform: 'none' }}
              >
                Clear all
              </Button>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* Search */}
            <TextField
              size="small"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 200 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            {/* Category Filter */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                displayEmpty
                sx={{ bgcolor: '#f8fafc', borderRadius: '8px' }}
              >
                <MenuItem value="">All Categories</MenuItem>
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Brand Filter */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={filterBrandId}
                onChange={(e) => setFilterBrandId(e.target.value)}
                displayEmpty
                disabled={!filterCategory}
                sx={{ bgcolor: '#f8fafc', borderRadius: '8px' }}
              >
                <MenuItem value="">All Brands</MenuItem>
                {filterBrands.map((brand) => (
                  <MenuItem key={brand.brandId} value={brand.brandId}>{brand.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Paper>

        {/* Stats & Actions */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={`${filteredProducts.length} products`}
            size="small"
            sx={{ bgcolor: '#eef2ff', color: '#6366f1', fontWeight: 600 }}
          />
          {selectedIds.length > 0 && (
            <Button
              size="small"
              color="error"
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteSelected}
              sx={{ ml: 'auto', textTransform: 'none', borderRadius: '8px' }}
            >
              Delete {selectedIds.length} selected
            </Button>
          )}
        </Box>

        {/* Products Table */}
        {productsLoading ? (
          <Paper elevation={0} sx={{ p: 6, textAlign: 'center', bgcolor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <CircularProgress size={32} />
            <Typography sx={{ color: '#64748b', mt: 2 }}>Loading products...</Typography>
          </Paper>
        ) : filteredProducts.length === 0 ? (
          <Paper elevation={0} sx={{ p: 6, textAlign: 'center', bgcolor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <Typography sx={{ color: '#64748b' }}>No products found</Typography>
          </Paper>
        ) : (
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8fafc' }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0}
                      indeterminate={selectedIds.length > 0 && selectedIds.length < filteredProducts.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#374151' }}>Product Name</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#374151' }}>Brand</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#374151' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#374151' }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((item) => (
                  <TableRow key={item._id} sx={{ '&:hover': { bgcolor: '#f8fafc' } }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedIds.includes(item._id)}
                        onChange={() => handleSelectOne(item._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, color: '#1e293b' }}>
                        {item.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={item.brand?.name || '-'} size="small" sx={{ bgcolor: '#f1f5f9' }} />
                    </TableCell>
                    <TableCell>
                      <Chip label={item.category} size="small" sx={{ bgcolor: '#eef2ff', color: '#6366f1' }} />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => handleEditClick(item)} sx={{ color: '#6366f1' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          if (window.confirm('Delete this product?')) {
                            api.post('/product/deleteProducts', { ids: [item._id] }).then(() => {
                              setSnackbar({ open: true, message: 'Product deleted', severity: 'success' })
                              fetchProducts()
                            })
                          }
                        }}
                        sx={{ color: '#ef4444' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Edit Dialog */}
        <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, product: null })} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 700 }}>Edit Product</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Product Name"
                fullWidth
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
              <FormControl fullWidth>
                <Select
                  value={editForm.category}
                  onChange={(e) => handleEditCategoryChange(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>Select Category</MenuItem>
                  {CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <Select
                  value={editForm.brandId}
                  onChange={(e) => setEditForm({ ...editForm, brandId: e.target.value })}
                  displayEmpty
                  disabled={!editForm.category}
                >
                  <MenuItem value="" disabled>Select Brand</MenuItem>
                  {editBrands.map((brand) => (
                    <MenuItem key={brand.brandId} value={brand.brandId}>{brand.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setEditDialog({ open: false, product: null })} sx={{ textTransform: 'none' }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleEditSave} sx={{ textTransform: 'none', bgcolor: '#6366f1' }}>
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
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
