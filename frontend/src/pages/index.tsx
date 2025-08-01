import React from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Speed as SpeedIcon,
  Equalizer as EqualizerIcon,
  Savings as SavingsIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      title: '売れ筋商品ランキング',
      description: '使いやすいUIでカテゴリー内の売上ランキングをワンクリックで確認できます。',
      icon: <EqualizerIcon fontSize="large" color="primary" />,
    },
    {
      title: '高速検索',
      description: ' 独自の技術により、検索結果を爆速で表示します。 リサーチの時間を大幅に削減。',
      icon: <SpeedIcon fontSize="large" color="primary" />,
    },
    {
      title: '中国輸入に特化',
      description: 'インポート商品を自動識別し、 競合分析も簡単に行えます。',
      icon: <SearchIcon fontSize="large" color="primary" />,
    },
    {
      title: '時間とコストの節約',
      description: 'リサーチ作業を効率化し、 より多くの時間を販売戦略や未来への投資に充てられます。',
      icon: <SavingsIcon fontSize="large" color="primary" />,
    },
  ];

  const plans = [
    {
      title: 'フリープラン',
      price: '0',
      features: [
        '基本リサーチ機能',
        'ランキング検索（月3回まで）',
        'カテゴリ別基本ランキング表示',
        '基本的な売上データ表示',
        'CSV出力（なし）',
        '検索履歴（保存なし）',
      ],
      cta: '今すぐ始める',
      highlighted: false,
    },
    {
      title: 'スタンダードプラン',
      price: '2,480',
      features: [
        'ベーシックプランの全機能',
        'ランキング検索（月30回まで）',
        '詳細なデータ分析と統計',
        '競合分析（詳細）',
        'CSVデータ出力（月5回まで）',
        '検索履歴（5日間保存）',
        'カスタムタグ付け機能',
      ],
      cta: '人気プラン',
      highlighted: true,
    },
    {
      title: 'プレミアム',
      price: '3,480',
      features: [
        'スタンダードプランの全機能',
        'ランキング検索（無制限）',
        'CSVデータ出力（無制限）',
        '検索履歴（無制限保存）',
        'AIによる検索補助',
        'リアルタイム通知機能',
        '混雑時の優先レスポンス',
      ],
      cta: '最大限の機能',
      highlighted: false,
    },
  ];

  return (
    <>
      <Head>
        <title>Seller Navi - 物販リサーチツール</title>
        <meta name="description" content="物販の商品リサーチを効率化し、売れ筋商品を素早く見つけるためのツールです。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 16 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                color="text.primary"
                fontWeight={700}
                gutterBottom
                sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
              >
                <Box component="span" sx={{ color: 'primary.main', display: 'inline' }}>
                  {' '}もう悩まない。<br />
                  迷わず、 稼げる。{' '}
                </Box>
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                paragraph
                sx={{ mb: 4, maxWidth: 480 }}
              >
                スマホで売れる"売れる商品"が秒で見つかる<br />売れる商品をラクに見つけられる。<br />
                「メルカリ物販リサーチツール」
              </Typography>
              <Box sx={{ mt: 4, mb: { xs: 4, md: 0 } }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={Link}
                  href="/signup"
                  sx={{
                    mr: 2,
                    mb: { xs: 2, sm: 0 },
                    py: 1.5,
                    px: 3,
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  7日間無料体験
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={Link}
                  href="/features"
                  sx={{
                    py: 1.5,
                    px: 3,
                    fontSize: '1rem',
                  }}
                >
                  機能詳細
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                  height: { xs: 300, md: 400 },
                }}
              >
                <Image
                  src="/hero-image.png"
                  alt="Seller Naviダッシュボード"
                  width={600}
                  height={400}
                  style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              component="h2"
              variant="h3"
              color="text.primary"
              fontWeight={700}
              gutterBottom
            >
              Seller Naviの特徴
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              他のリサーチツールとの違いを体感してください
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                    },
                  }}
                  elevation={2}
                >
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" fontWeight={600} gutterBottom textAlign="center">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" textAlign="center">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            だから「迷わない・続けられる・稼げる」
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              component="h2"
              variant="h3"
              color="text.primary"
              fontWeight={700}
              gutterBottom
            >
              料金プラン
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              あなたのニーズに合わせた最適なプランをお選びください
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {plans.map((plan, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: plan.highlighted ? `2px solid ${theme.palette.primary.main}` : 'none',
                    transform: plan.highlighted ? 'scale(1.05)' : 'none',
                    zIndex: plan.highlighted ? 1 : 'auto',
                    boxShadow: plan.highlighted ? '0 8px 32px rgba(0,0,0,0.12)' : '',
                    position: 'relative',
                    overflow: 'visible',
                  }}
                  elevation={plan.highlighted ? 8 : 2}
                >
                  {plan.highlighted && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bgcolor: 'primary.main',
                        color: 'white',
                        py: 0.5,
                        px: 2,
                        borderRadius: 1,
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    >
                      おすすめ
                    </Box>
                  )}
                  <CardHeader
                    title={plan.title}
                    titleTypographyProps={{ align: 'center', variant: 'h5', fontWeight: 600 }}
                    sx={{ backgroundColor: plan.highlighted ? 'primary.light' : 'grey.100' }}
                  />
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <Typography component="h3" variant="h3" color="text.primary" fontWeight={700}>
                        ¥{plan.price}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        /月（税込）
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <List sx={{ mb: 2 }}>
                      {plan.features.map((feature, featureIndex) => (
                        <ListItem key={featureIndex} sx={{ py: 1, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                    <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                      <Button
                        variant={plan.highlighted ? 'contained' : 'outlined'}
                        color="primary"
                        fullWidth
                        size="large"
                        component={Link}
                        href="/signup"
                        sx={{ py: 1.5 }}
                      >
                        {plan.cta}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 6, md: 10 },
          textAlign: 'center',
        }}
      >
      
        <Box display={'flex'} justifyContent={'space-around'}>
        <Box>
          <Typography
            component="h2"
            variant="h3"
            fontWeight={700}
            gutterBottom
          >
            リサーチを極限まで簡略化!
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.9 }}
          >
            迷っている時間がもったいない。<br /> 
            今すぐ"売れる商品"を見に行こう。<br />
            利用開始まで最短5分!<br />
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            href="/signup"
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1.125rem',
              fontWeight: 600,
            }}
          >
            7日間無料で体験する
          </Button>
          <Typography
            sx={{ mt: 4, opacity: 0.9 }}
          >
            <Box fontSize={'12px'} >
            ※無料体験後、自動的にフリーブリンに移行しますが、引き続き有料プランの機能をご利用いただく場合は、<br />
            有料プランの登録操作をお願いいたします。
            </Box>
          </Typography>
          </Box>
          <Box>
            <Image 
              src="/1.png" 
              alt="Seller Navi ダッシュボード" 
              width={200}
              height={100}
              style={{
                objectFit: 'contain',
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
              }}
            />
          </Box>
          </Box>
      </Box>
    </>
  );
};

export default Home; 