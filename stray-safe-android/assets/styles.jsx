import { StyleSheet } from "react-native";
import { color } from './theme';

const styles = StyleSheet.create({
  title: { color: color.textPrimary, fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  input: { width: '100%', height: 50, borderRadius: 10, backgroundColor: '#F2D8B1', paddingHorizontal: 15, fontSize: 16, color: color.textSecondary, marginBottom: 20 },

  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  content: { backgroundColor: color.blue },
  card: { width: '85%', backgroundColor: '#FFF', borderRadius: 20, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  logo: { width: '90%', height: 70, resizeMode: 'contain', margin: 20 },
  smallLogo: { width: 50, height: 50, resizeMode: 'contain', margin: 20 },

  buttonPrimary: { width: '100%', backgroundColor: color.accent, paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: color.accent },
  tabButton: { alignItems: 'center', justifyContent: 'center', flex: 1 },

  missingCard: { backgroundColor: "white",  alignSelf: 'stretch', overflow: 'hidden', borderRadius: 16, marginHorizontal: 16, marginTop: 16, flex: 1 },
  missingPhoto: { width: '100%',  height: 220,  borderRadius: 8 }
})

export default styles;