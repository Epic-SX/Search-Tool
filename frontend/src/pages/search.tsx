import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Chip,
  LinearProgress,
  Pagination,
  Divider,
  IconButton,
  Alert,
  Backdrop,
  CircularProgress,
  useTheme,
  Radio,
  RadioGroup,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  CloudDownload as CloudDownloadIcon,
  Sort as SortIcon,
  Clear as ClearIcon,
  SmartToy as SmartToyIcon,
  Psychology as PsychologyIcon,
  Lock as LockIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import ProductSaveButtons from '@/components/layout/ProductSaveButtons';

// Mock data for product results
const mockProducts = [
  {
    id: 'p1',
    title: 'ワイヤレスイヤホン Bluetooth 5.2 ノイズキャンセリング機能付き 防水',
    price: 3200,
    imageUrl: 'https://static.mercdn.net/item/detail/orig/photos/m82491234_1.jpg',
    soldCount: 45,
    revenueTotal: 144000,
    seller: 'techgadgets2023',
    category: '家電',
    isImport: true,
    competition: 8,
    trendChange: '+12%',
    lastSoldDate: '2025-04-15',
  },
  {
    id: 'p2',
    title: 'スマートウォッチ 多機能 心拍数 血圧 歩数計 GPS 連携 防水 睡眠モニター',
    price: 4980,
    imageUrl: 'https://static.mercdn.net/item/detail/orig/photos/m72381923_1.jpg',
    soldCount: 38,
    revenueTotal: 189240,
    seller: 'gadgetworld',
    category: '家電',
    isImport: true,
    competition: 12,
    trendChange: '+8%',
    lastSoldDate: '2025-04-16',
  },
  {
    id: 'p3',
    title: 'フェイシャルマスク 保湿 美容液 エッセンス 毛穴ケア 20枚入り 韓国コスメ',
    price: 1200,
    imageUrl: 'https://static.mercdn.net/item/detail/orig/photos/m92837465_1.jpg',
    soldCount: 72,
    revenueTotal: 86400,
    seller: 'beautykorea',
    category: '美容',
    isImport: true,
    competition: 15,
    trendChange: '+22%',
    lastSoldDate: '2025-04-20',
  },
  {
    id: 'p4',
    title: 'ポータブル充電器 大容量 10000mAh USB-C 急速充電 薄型 軽量 2ポート',
    price: 2500,
    imageUrl: 'https://static.mercdn.net/item/detail/orig/photos/m62937452_1.jpg',
    soldCount: 29,
    revenueTotal: 72500,
    seller: 'tech_accessory',
    category: '家電',
    isImport: true,
    competition: 10,
    trendChange: '+5%',
    lastSoldDate: '2025-04-14',
  },
  {
    id: 'p5',
    title: 'ミニ加湿器 USB充電式 卓上 静音 LEDライト付き オフィス 寝室用',
    price: 1980,
    imageUrl: 'https://static.mercdn.net/item/detail/orig/photos/m52836472_1.jpg',
    soldCount: 53,
    revenueTotal: 104940,
    seller: 'homeliving',
    category: 'ホーム',
    isImport: true,
    competition: 7,
    trendChange: '+18%',
    lastSoldDate: '2025-04-18',
  },
  {
    id: 'p6',
    title: '折りたたみ傘 自動開閉 軽量 コンパクト 撥水 耐風 晴雨兼用 UV対策',
    price: 1450,
    imageUrl: 'https://static.mercdn.net/item/detail/orig/photos/m92736451_1.jpg',
    soldCount: 68,
    revenueTotal: 98600,
    seller: 'rainydays',
    category: '日用品',
    isImport: true,
    competition: 9,
    trendChange: '+15%',
    lastSoldDate: '2025-04-19',
  },
];

const SearchPage = () => {
  const { 
    user, 
    loading, 
    checkSubscription, 
    canExportCSV, 
    canPerformRankingSearch,
    canUseAIAssistant,
    incrementSearchCount
  } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [period, setPeriod] = useState('30days');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('soldCount');
  const [isImportOnly, setIsImportOnly] = useState(true);
  const [productType, setProductType] = useState('import');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [canExport, setCanExport] = useState(false);
  const [exportCount, setExportCount] = useState(0);
  const [userPlan, setUserPlan] = useState('');
  const [showAiSearch, setShowAiSearch] = useState(false);
  const [aiSearchKeywords, setAiSearchKeywords] = useState<string[]>([]);
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [canUseAi, setCanUseAi] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const [searchLimit, setSearchLimit] = useState(Infinity);

  const resultsPerPage = 5;

  // Check if user is logged in and has active subscription
  useEffect(() => {
    const checkAuth = async () => {
      if (!loading) {
        if (!user) {
          router.push('/login');
        } else {
          const isSubscribed = await checkSubscription();
          setHasSubscription(isSubscribed);

          if (!isSubscribed) {
            router.push('/subscription');
          }
        }
      }
    };

    checkAuth();
  }, [loading, user, router, checkSubscription]);

  // Check user permissions and limits
  useEffect(() => {
    const checkPermissions = async () => {
      if (user) {
        // Check if user can export CSV
        const canExport = await canExportCSV();
        setCanExport(canExport);
        
        // Get user plan
        const plan = user.subscription.plan;
        setUserPlan(plan);
        
        // Get search count and limit
        setSearchCount(user.searchCount || 0);
        
        // Set search limit based on plan
        const limits = {
          'basic': 3,
          'standard': 50,
          'premium': Infinity
        };
        setSearchLimit(limits[plan as keyof typeof limits] || 0);
        
        // Check if user can use AI search
        const canUseAiAssistant = await canUseAIAssistant();
        setCanUseAi(canUseAiAssistant);
        
        // In a real app, would get export count from API
        setExportCount(user.exportCount || 0);
      }
    };
    
    checkPermissions();
  }, [user, canExportCSV, canUseAIAssistant]);

  // Handle search submit
  const handleSearch = async () => {
    // Check if user can perform another search
    const canSearch = await canPerformRankingSearch();
    
    if (!canSearch) {
      setShowUpgradeDialog(true);
      return;
    }
    
    setIsSearching(true);
    setShowBackdrop(true);
    
    // Increment search count
    await incrementSearchCount();
    setSearchCount((prev) => prev + 1);
    
    // Simulate API call delay
    setTimeout(() => {
      // Apply mock filters
      let results = [...mockProducts];
      
      if (searchTerm) {
        results = results.filter(product => 
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (category !== 'all') {
        results = results.filter(product => product.category === category);
      }
      
      // Filter by product type (import or regular)
      if (productType === 'import') {
        results = results.filter(product => product.isImport);
      } else if (productType === 'regular') {
        results = results.filter(product => !product.isImport);
      }
      
      if (minPrice) {
        results = results.filter(product => product.price >= parseInt(minPrice));
      }
      
      if (maxPrice) {
        results = results.filter(product => product.price <= parseInt(maxPrice));
      }
      
      // Sort results
      results.sort((a, b) => {
        if (sortBy === 'price_asc') {
          return a.price - b.price;
        } else if (sortBy === 'price_desc') {
          return b.price - a.price;
        } else if (sortBy === 'revenue') {
          return b.revenueTotal - a.revenueTotal;
        } else {
          // Default: soldCount
          return b.soldCount - a.soldCount;
        }
      });
      
      setSearchResults(results);
      setPage(1);
      setIsSearching(false);
      setShowBackdrop(false);
    }, 1500);
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate paged results
  const pagedResults = searchResults.slice(
    (page - 1) * resultsPerPage,
    page * resultsPerPage
  );

  // Clear search filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setCategory('all');
    setPeriod('30days');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('soldCount');
    setIsImportOnly(true);
    setProductType('import');
  };

  // Handle CSV download
  const handleDownloadCSV = async () => {
    // Check if user can export CSV
    const canExport = await canExportCSV();
    
    if (!canExport) {
      setShowUpgradeDialog(true);
      return;
    }
    
    // In a real app, this would generate and download the CSV
    alert('CSVがダウンロードされました。');
  };

  // Toggle AI search
  const toggleAiSearch = async () => {
    // Check if user can use AI search
    if (!canUseAi) {
      setShowUpgradeDialog(true);
      return;
    }
    
    setShowAiSearch(!showAiSearch);
  };

  // Handle AI search
  const handleAiSearch = () => {
    if (!canUseAi) return;
    
    setIsAiSearching(true);
    
    // In a real app, this would be an API call to an AI service
    // For this demo, we'll simulate AI-enhanced search
    setTimeout(() => {
      // Simulate AI generating additional keywords for Chinese imports
      const aiGenerated = [
        '多機能',
        'USB充電',
        'ポータブル',
        '折りたたみ式',
        '高コスパ',
        'LEDライト',
        // Randomly select a few of these keywords
      ].sort(() => 0.5 - Math.random()).slice(0, 3);
      
      setAiSearchKeywords([...aiGenerated]);
      
      // Incorporate AI keywords into search
      let enhancedSearchTerm = searchTerm;
      if (searchTerm) {
        enhancedSearchTerm += ' ' + aiGenerated.join(' ');
      } else {
        enhancedSearchTerm = aiGenerated.join(' ');
      }
      
      setSearchTerm(enhancedSearchTerm);
      setIsAiSearching(false);
      
      // Automatically run the search with enhanced terms
      handleSearch();
    }, 2000);
  };

  // If loading, show a loading indicator
  if (loading || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>商品検索 | Seller Navi</title>
      </Head>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 2 }}>検索中...</Typography>
        </Box>
      </Backdrop>
      
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
            商品検索
          </Typography>
          <Typography variant="body1" color="text.secondary">
            売れ筋商品を素早く検索し、市場動向を把握できます。
          </Typography>
        </Box>

        {/* Search Box */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="キーワードを入力"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      endAdornment: searchTerm ? (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="clear search"
                            onClick={() => setSearchTerm('')}
                            edge="end"
                          >
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      ) : null,
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SearchIcon />}
                    onClick={handleSearch}
                    disabled={isSearching}
                    sx={{ height: '100%' }}
                  >
                    検索
                  </Button>
                </Grid>
              </Grid>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                <FilterListIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                詳細検索
              </Typography>
              
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                startIcon={canUseAi ? <SmartToyIcon /> : <LockIcon />}
                onClick={toggleAiSearch}
                disabled={isAiSearching}
              >
                AI検索アシスタント {!canUseAi && '(プレミアム)'}
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  fullWidth
                  label="カテゴリー"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                >
                  <MenuItem value="all">すべて</MenuItem>
                  <MenuItem value="家電">家電</MenuItem>
                  <MenuItem value="美容">美容</MenuItem>
                  <MenuItem value="ホーム">ホーム</MenuItem>
                  <MenuItem value="日用品">日用品</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  fullWidth
                  label="表示期間"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="today">本日</MenuItem>
                  <MenuItem value="14days">過去14日</MenuItem>
                  <MenuItem value="30days">過去30日</MenuItem>
                  <MenuItem value="60days">過去60日</MenuItem>
                  <MenuItem value="90days">過去90日</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="最低価格"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">¥</InputAdornment>,
                  }}
                  size="small"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="最高価格"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">¥</InputAdornment>,
                  }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2" gutterBottom>
                  商品タイプ
                </Typography>
                <RadioGroup
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="import"
                    control={<Radio size="small" />}
                    label="中国物販"
                  />
                  <FormControlLabel
                    value="regular"
                    control={<Radio size="small" />}
                    label="通常商品"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClearFilters}
                    sx={{ mr: 1 }}
                  >
                    クリア
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SearchIcon />}
                    onClick={handleSearch}
                    disabled={isSearching}
                  >
                    検索
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* AI Search Assistant Panel */}
        {showAiSearch && (
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 3,
              borderLeft: '4px solid',
              borderColor: 'secondary.main',
              backgroundColor: 'rgba(156, 39, 176, 0.05)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PsychologyIcon color="secondary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1">中国輸入品AI検索アシスタント</Typography>
              <Chip
                label="プレミアム機能"
                size="small"
                color="secondary"
                variant="outlined"
                sx={{ ml: 2 }}
              />
            </Box>
            
            <Typography variant="body2" paragraph>
              AIが中国輸入品を見つけるのに最適なキーワードを提案します。検索エンジンが見逃しがちな商品も効率的に発見できます。
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                入力されたキーワードに、中国輸入品発見に最適な追加キーワードをAIが提案します。
              </Typography>
              
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAiSearch}
                disabled={isAiSearching}
                size="small"
                startIcon={isAiSearching ? <CircularProgress size={20} color="inherit" /> : <SmartToyIcon />}
              >
                {isAiSearching ? 'AI分析中...' : 'AI分析を実行'}
              </Button>
            </Box>
            
            {aiSearchKeywords.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  AI提案キーワード:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {aiSearchKeywords.map((keyword, index) => (
                    <Chip
                      key={index}
                      label={keyword}
                      color="secondary"
                      size="small"
                      sx={{ fontWeight: 'medium' }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        )}

        {/* Search Results */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                検索結果 {searchResults.length > 0 ? `(${searchResults.length}件)` : ''}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  select
                  size="small"
                  label="並び替え"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{ minWidth: 150, mr: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SortIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="soldCount">売上個数（多い順）</MenuItem>
                  <MenuItem value="revenue">売上金額（多い順）</MenuItem>
                  <MenuItem value="price_asc">価格（安い順）</MenuItem>
                  <MenuItem value="price_desc">価格（高い順）</MenuItem>
                </TextField>
                
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<CloudDownloadIcon />}
                  onClick={handleDownloadCSV}
                  size="small"
                  disabled={searchResults.length === 0 || !canExport || (userPlan === 'standard' && exportCount >= 5)}
                  title={!canExport ? 'CSVエクスポートは上位プランでご利用いただけます' : 
                         (userPlan === 'standard' && exportCount >= 5) ? '今月のCSVエクスポート回数の上限に達しました' : 
                         'CSVでダウンロード'}
                >
                  CSV {userPlan === 'standard' && (
                    <Typography variant="caption" sx={{ ml: 0.5 }}>({5 - exportCount}/5)</Typography>
                  )}
                </Button>
              </Box>
            </Box>
            
            {searchResults.length > 0 ? (
              <>
                {pagedResults.map((product) => (
                  <Card
                    key={product.id}
                    variant="outlined"
                    sx={{
                      mb: 2,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                          <Box sx={{ position: 'relative', width: '100%', height: 120 }}>
                            <Box
                              sx={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                borderRadius: 1,
                                overflow: 'hidden',
                                backgroundColor: 'grey.100',
                              }}
                            >
                              {/* Image would be rendered here in a real app */}
                              <Box sx={{ 
                                width: '100%', 
                                height: '100%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                bgcolor: 'grey.200'
                              }}>
                                <Typography variant="body2" color="text.secondary">
                                  商品画像
                                </Typography>
                              </Box>
                            </Box>
                            {product.isImport && (
                              <Chip
                                label="輸入品"
                                color="secondary"
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  left: 8,
                                  fontSize: '0.675rem',
                                }}
                              />
                            )}
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12} sm={10}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ flex: 1 }}>
                              {product.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <ProductSaveButtons productId={product.id} productTitle={product.title} />
                              <Chip
                                label={product.category}
                                size="small"
                                sx={{
                                  backgroundColor:
                                    product.category === '家電' ? 'rgba(33, 150, 243, 0.1)' :
                                    product.category === '美容' ? 'rgba(233, 30, 99, 0.1)' :
                                    product.category === 'ホーム' ? 'rgba(76, 175, 80, 0.1)' :
                                    'rgba(156, 39, 176, 0.1)',
                                  color:
                                    product.category === '家電' ? 'info.main' :
                                    product.category === '美容' ? 'error.main' :
                                    product.category === 'ホーム' ? 'success.main' :
                                    'secondary.main',
                                  mr: 1,
                                }}
                              />
                            </Box>
                          </Box>
                          
                          <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={3}>
                              <Typography variant="body2" color="text.secondary">
                                価格
                              </Typography>
                              <Typography variant="h6" color="primary" fontWeight={600}>
                                ¥{product.price.toLocaleString()}
                              </Typography>
                            </Grid>
                            
                            <Grid item xs={6} sm={3}>
                              <Typography variant="body2" color="text.secondary">
                                売上数
                              </Typography>
                              <Typography variant="h6" fontWeight={600}>
                                {product.soldCount}個
                              </Typography>
                            </Grid>
                            
                            <Grid item xs={6} sm={3}>
                              <Typography variant="body2" color="text.secondary">
                                売上金額
                              </Typography>
                              <Typography variant="h6" fontWeight={600}>
                                ¥{product.revenueTotal.toLocaleString()}
                              </Typography>
                            </Grid>
                            
                            <Grid item xs={6} sm={3}>
                              <Typography variant="body2" color="text.secondary">
                                競合数
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h6" fontWeight={600}>
                                  {product.competition}
                                </Typography>
                                <Chip
                                  label={product.trendChange}
                                  size="small"
                                  color="success"
                                  sx={{ ml: 1, height: 20, fontSize: '0.75rem' }}
                                />
                              </Box>
                            </Grid>
                            
                            <Grid item xs={12}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                  出品者: {product.seller} • 最終販売日: {product.lastSoldDate}
                                </Typography>
                                <Button size="small" variant="outlined">
                                  競合詳細
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Pagination */}
                {searchResults.length > resultsPerPage && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                      count={Math.ceil(searchResults.length / resultsPerPage)}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                    />
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ py: 8, textAlign: 'center' }}>
                {isSearching ? (
                  <LinearProgress />
                ) : (
                  <>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      検索結果がありません
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      検索条件を変更して再度検索してください。
                    </Typography>
                  </>
                )}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Search Limit Info */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            検索回数: {searchCount} / {searchLimit === Infinity ? '無制限' : searchLimit}
          </Typography>
          
          {userPlan !== 'premium' && (
            <Button 
              size="small" 
              variant="outlined" 
              onClick={() => router.push('/subscription')}
            >
              アップグレード
            </Button>
          )}
        </Box>

        {/* Add AI Assistant button with proper permission check */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={canUseAi ? <SmartToyIcon /> : <LockIcon />}
            onClick={toggleAiSearch}
            disabled={isAiSearching}
            sx={{ 
              mb: 2,
              opacity: canUseAi ? 1 : 0.7
            }}
          >
            AIアシスタント {!canUseAi && <Typography variant="caption" sx={{ ml: 1 }}>プレミアム限定</Typography>}
          </Button>
        </Box>
      </Container>

      {/* Upgrade Dialog */}
      <Dialog
        open={showUpgradeDialog}
        onClose={() => setShowUpgradeDialog(false)}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon color="warning" sx={{ mr: 1 }} />
            機能制限のお知らせ
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {userPlan === 'basic' ? (
              <>
                ベーシックプランでは月に3回までの検索が可能です。上限に達しました。
                より多くの検索をご希望の場合は、上位プランへのアップグレードをご検討ください。
              </>
            ) : userPlan === 'standard' ? (
              <>
                スタンダードプランでは月に50回までの検索が可能です。上限に達しました。
                無制限の検索をご希望の場合は、プレミアムプランへのアップグレードをご検討ください。
              </>
            ) : (
              <>
                この機能を利用するには、プレミアムプランへのアップグレードが必要です。
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUpgradeDialog(false)}>
            閉じる
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              setShowUpgradeDialog(false);
              router.push('/subscription');
            }}
          >
            プランをアップグレード
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SearchPage; 