import { StyleSheet } from "react-native";
import { color } from './theme';

const styles = StyleSheet.create({
  title: { color: color.textPrimary, fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  input: { width: '100%', height: 50, borderRadius: 10, backgroundColor: '#F2D8B1', paddingHorizontal: 15, fontSize: 16, color: color.textSecondary, marginBottom: 20 },

  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  content: { backgroundColor: color.blue },
  card: { width: '90%', backgroundColor: '#FFF', borderRadius: 20, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  logo: { width: '90%', height: 70, resizeMode: 'contain', margin: 20 },
  smallLogo: { width: 50, height: 50, resizeMode: 'contain', margin: 20 },

  buttonPrimary: { width: '100%', backgroundColor: color.accent, paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: color.accent },
  tabButton: { alignItems: 'center', justifyContent: 'center', flex: 1 },

  petCard: { backgroundColor: "white",  alignSelf: 'stretch', overflow: 'hidden', borderRadius: 16, marginHorizontal: 16, marginTop: 16 },
  petPhoto: { width: '100%',  height: 220,  borderRadius: 8 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '80%', backgroundColor: '#FFF', borderRadius: 10, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: color.black },
  modalButton: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, padding: 10, width: '100%', justifyContent: 'center', backgroundColor: color.beige, borderRadius: 10 },
  modalButtonText: { fontSize: 16, marginLeft: 10, color: color.black },

  addMediaButton: { flexDirection: 'row', alignItems: 'center', marginTop: 10, backgroundColor: color.accent, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, justifyContent: 'center'},
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 16,
    width: '100%',
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 10,
    fontSize: 16,
    color: color.accent,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 10,
    fontSize: 16,
    color: color.accent,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
  contactInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: color.black,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  pinContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -40,
  },
  confirmButton: {
    position: 'absolute',
    bottom: 20,
    left: '10%',
    right: '10%',
    backgroundColor: color.accent,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeMapButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: color.accent,
    padding: 10,
    borderRadius: 30,
  },
  pawIcon: {
    width: 50,
    height: 100,
  },
  pinContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -40,
  },

  mediaContainer: {
    flexDirection: 'row',
    marginRight: "auto",
    marginTop: 20
  },
  mediaWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  mediaPreview: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  removeMediaButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 5,
  },
  addMediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: color.accent,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addMediaText: {
    marginLeft: 10,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default styles;