// app/lab4.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, Linking } from 'react-native';
// Corrected import: using default export
import vacationDestinations from '../lib/vacationsDestinations';

// Corrected Interface to match your vacationsDestinations.ts
export interface VacationDestination {
  id: number; // Changed from string to number
  location: string;
  price: number; // Changed from string to number
  average_yearly_temperature: string;
}

interface WikipediaSummary {
  title: string;
  displaytitle: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  originalimage?: {
    source: string;
    width: number;
    height: number;
  };
  lang: string;
  dir: string;
  tid: string;
  timestamp: string;
  description: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
  content_urls: {
    desktop: {
      page: string;
    };
    mobile: {
      page: string;
    };
  };
  api_urls: {
    summary: string;
    metadata: string;
    references: string;
    media: string;
    lead: string;
  };
  extract: string; // The main text summary
  extract_html: string;
}


export default function Lab4Screen() {
  const [expandedId, setExpandedId] = useState<number | null>(null); // ID is now number
  const [wikiSummary, setWikiSummary] = useState<WikipediaSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchWikipediaSummary = async (city: string) => {
    setLoading(true);
    setError(null);
    setWikiSummary(null); // Clear previous summary
    try {
      // Encode the city name for the URL
      const encodedCity = encodeURIComponent(city);
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedCity}`;
      const response = await fetch(url);

      if (!response.ok) {
        // Handle cases where the city might not be found or API error
        if (response.status === 404) {
          throw new Error(`Summary not found for "${city}".`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WikipediaSummary = await response.json();
      setWikiSummary(data);
    } catch (err: any) {
      console.error("Error fetching Wikipedia summary:", err);
      setError(`Failed to load city details: ${err.message}. Please try again.`);
      setWikiSummary(null);
    } finally {
      setLoading(false);
    }
  };


  const handlePress = (destination: VacationDestination) => { // Use VacationDestination type
    if (expandedId === destination.id) {
      // If already open, close it
      setExpandedId(null);
      setWikiSummary(null); // Also clear the summary
    } else {
      // Close previous, open new
      setExpandedId(destination.id);
      fetchWikipediaSummary(destination.location); // Use destination.location for city name
    }
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Vacation Destinations</Text>
      {vacationDestinations.map((destination) => (
        <View key={destination.id} style={styles.destinationCard}>
          <TouchableOpacity onPress={() => handlePress(destination)}>
            {/* Display location property */}
            <Text style={styles.cityText}>{destination.location}</Text>
          </TouchableOpacity>


          {expandedId === destination.id && (
            <View style={styles.detailsContainer}>
              {/* Display price as a number, formatted */}
              <Text style={styles.detailText}>Price: ${destination.price.toLocaleString()}</Text>
              {/* Display average_yearly_temperature property */}
              <Text style={styles.detailText}>Avg. Temp: {destination.average_yearly_temperature}</Text>


              {loading && <ActivityIndicator size="small" color="#0000ff" style={styles.spinner} />}
              {error && <Text style={styles.errorText}>{error}</Text>}


              {wikiSummary && (
                <View style={styles.wikiContent}>
                  {/* Prioritize originalimage if available, otherwise thumbnail */}
                  {(wikiSummary.originalimage || wikiSummary.thumbnail) && (
                    <Image
                      source={{ uri: (wikiSummary.originalimage?.source || wikiSummary.thumbnail?.source) }}
                      style={styles.thumbnail}
                      resizeMode="cover"
                    />
                  )}
                  <Text style={styles.descriptionHeader}>Summary:</Text>
                  <Text style={styles.descriptionText}>{wikiSummary.extract}</Text>
                  <TouchableOpacity onPress={() => {
                    if (wikiSummary.content_urls?.desktop?.page) {
                      Linking.openURL(wikiSummary.content_urls.desktop.page);
                    }
                  }}>
                    <Text style={styles.readMoreLink}>Read more on Wikipedia</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  destinationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007bff', // Blue for clickable text
  },
  detailsContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  spinner: {
    marginTop: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontStyle: 'italic',
  },
  wikiContent: {
    marginTop: 10,
    alignItems: 'center', // Center image and text
  },
  thumbnail: {
    width: '100%', // Take full width of card
    height: 200, // Fixed height for images
    borderRadius: 8,
    marginBottom: 10,
  },
  descriptionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
    color: '#667',
  },
  readMoreLink: {
    color: '#007bff',
    marginTop: 10,
    textDecorationLine: 'underline',
  }
});