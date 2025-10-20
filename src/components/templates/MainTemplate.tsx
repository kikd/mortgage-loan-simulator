import React from 'react'
import { Container, Typography, Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})

export interface MainTemplateProps {
  children: React.ReactNode
}

export const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            gutterBottom
            sx={{
              mb: 4,
              color: 'primary.main',
              fontWeight: 700,
            }}
          >
            住宅ローンシミュレーター
          </Typography>
          
          {children}
        </Container>
      </Box>
    </ThemeProvider>
  )
}