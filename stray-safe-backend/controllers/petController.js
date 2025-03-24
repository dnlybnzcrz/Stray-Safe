import axios from 'axios';

export const registerPet = async (petData, navigation, setLoading, resetForm) => {
  if (!petData.petName || !petData.petType || (!petData.petBreed && !petData.customBreed) || !petData.ownerContact || !petData.petImage) {
    alert('Please fill out all fields and upload a pet image before submitting.');
    return;
  }
  if (!/^[0-9]+$/.test(petData.ownerContact) || petData.ownerContact.length < 8) {
    alert('Please enter a valid phone number.');
    return;
  }

  setLoading(true);
  try {
    const requestData = {
      petName: petData.petName,
      petType: petData.petType,
      petBreed: petData.petBreed === 'Others' ? petData.customBreed : petData.petBreed,
      ownerContact: petData.ownerContact,
      petImage: petData.petImage,
    };
    
    const response = await axios.post(`${process.env.EXPO_PUBLIC_LOCAL_API_URL}/api/pet/register`, requestData);
    console.log('Register pet response:', response.data);
    
    if (response.data.message === 'Pet registered successfully') {
      alert('Your pet has been registered successfully!');
      resetForm();
      navigation.goBack();
    }
  } catch (error) {
    console.error('Error during pet registration:', error.response ? error.response.data : error);
    alert('An error occurred while registering the pet. Please try again.');
  }
  setLoading(false);
};
