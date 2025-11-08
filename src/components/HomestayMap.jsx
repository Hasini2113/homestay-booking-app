import React, { useMemo } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';

const defaultCenter = { lat: 15.4989, lng: 73.8278 }; // Goa center

export default function HomestayMap({ homestays, onMarkerClick }) {
  // Temporarily return a message until API key is configured
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        height: '70vh', 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: 'background.paper'
      }}
    >
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <Typography variant="h6" gutterBottom>Map View Coming Soon</Typography>
        <Typography color="text.secondary">
          The map feature is temporarily disabled while we set up the Google Maps integration.
        </Typography>
      </Box>
    </Paper>
  );

  const mapCenter = useMemo(() => {
    if (homestays && homestays.length > 0) {
      const sumLat = homestays.reduce((sum, home) => sum + (home.latitude || defaultCenter.lat), 0);
      const sumLng = homestays.reduce((sum, home) => sum + (home.longitude || defaultCenter.lng), 0);
      return {
        lat: sumLat / homestays.length,
        lng: sumLng / homestays.length
      };
    }
    return defaultCenter;
  }, [homestays]);

  if (!isLoaded) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          height: '70vh', 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: 'background.paper'
        }}
      >
        <CircularProgress />
      </Paper>
    );
  }

  if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          height: '70vh', 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{ textAlign: 'center', p: 3 }}>
          <Typography variant="h6" gutterBottom>Map View Unavailable</Typography>
          <Typography color="text.secondary" paragraph>
            Please configure your Google Maps API key in .env.local file
          </Typography>
          <Typography variant="caption" color="text.secondary">
            To get an API key:
            1. Go to Google Cloud Console
            2. Create a project or select existing one
            3. Enable Maps JavaScript API
            4. Create credentials (API key)
            5. Add key to .env.local file
          </Typography>
        </Box>
      </Paper>
    );
  }

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    // Suppress the "For development purposes only" warning that appears when key is invalid/missing
    streetView: {
      visible: false
    }
  };

  return (
    <Paper elevation={3} sx={{ height: '70vh', width: '100%', position: 'relative' }}>
      <GoogleMap
        zoom={12}
        center={mapCenter}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={mapOptions}
      >
        {homestays?.map((homestay) => (
          <MarkerF
            key={homestay.id}
            position={{
              lat: homestay.latitude || defaultCenter.lat,
              lng: homestay.longitude || defaultCenter.lng
            }}
            onClick={() => onMarkerClick(homestay)}
            title={homestay.title}
          />
        ))}
      </GoogleMap>
    </Paper>
  );
}