import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme'; // Use your theme for consistent colors
import { PieChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
  const straySightings = 120; // Example data
  const animalBreakdown = { dogs: 70, cats: 40, others: 10 }; // Example data

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // Optional
    useShadowColorFromDataset: false, // Optional
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [10, 15, 12, 25, 30, 20],
        strokeWidth: 2, // Optional
      },
    ],
  };

  const pieChartData = [
    {
      name: 'Stray Dogs',
      population: animalBreakdown.dogs,
      color: 'rgba(0, 123, 255, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Stray Cats',
      population: animalBreakdown.cats,
      color: 'rgba(40, 167, 69, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Other Animals',
      population: animalBreakdown.others,
      color: 'rgba(255, 193, 7, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  const recentSightings = []; // Placeholder for feed data

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Total Stray Sightings</Text>
          <Text style={styles.statValue}>{straySightings}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Animal Type Breakdown</Text>
          <Text style={styles.statValue}>
            Dogs: {animalBreakdown.dogs}{'\n'}
            Cats: {animalBreakdown.cats}{'\n'}
            Other: {animalBreakdown.others}
          </Text>
        </View>
      </View>

      {/* Charts Section */}
      <View style={styles.chartsRow}>
        <LineChart
          data={lineChartData}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          bezier
        />
        <PieChart
          data={pieChartData}
          style={styles.chart}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="white"
          paddingLeft="15"
          bezier
        />
      </View>

      {/* Recent Sightings Feed */}
      <View style={styles.feedSection}>
        <Text style={styles.sectionTitle}>Recent Sightings Feed</Text>
        {recentSightings.length > 0 ? (
          <FlatList
            data={recentSightings}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.feedItem}>
                <Text style={styles.feedText}>{item.timestamp}</Text>
                <Text style={styles.feedText}>{item.animalType}</Text>
                <Text style={styles.feedText}>{item.location}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noDataText}>No data available</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.textPrimary,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    elevation: 2,
  },
  statTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  chartsRow: {
    marginBottom: 20,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 10,
  },
  feedSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 10,
  },
  feedItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  feedText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  noDataText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
