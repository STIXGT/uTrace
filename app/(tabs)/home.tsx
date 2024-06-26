import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '@/styles/homeStyles';
import StateCards from '@/components/StateCard/StateCard';
import { ref, get, child } from 'firebase/database'; 
import { FIREBASE_DB } from '@/FirebaseConfig'; 
import { Images } from '@/constants/Images';
import { emotions } from '@/components/Emotions'; 
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const [userSelections, setUserSelections] = useState<any[]>([]); 
    const {logout, user} = useAuth();

  const handleLogout = async () => {
    await logout();
  }

  useEffect(() => {
    const fetchUserSelections = async () => {
      try {
        const snapshot = await get(child(ref(FIREBASE_DB), 'userSelections'));
        if (snapshot.exists()) {
          const selectionsArray = Object.values(snapshot.val());
          setUserSelections(selectionsArray);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchUserSelections(); 
  }, []); 

  return (
    <View style={styles.containerHome}>
      <View style={styles.header}>
      <View style={styles.iconTextContainer}>
          <Image source={Images.happy} style={styles.icon} />
          <Text style={styles.text}>Hola, {user?.username}!</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleLogout}>
            <Image source={Images.settings} style={styles.settingsIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.textHome}>Registros de hoy</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardContent}>
          {userSelections.map((selection, index) => {
            const emotionData = emotions[selection.selectedEmotion];
            return (
              <StateCards
                key={index}
                color={selection.backgroundColor} // Color dinámico, ajusta según tus datos
                colorFlag={selection.flagColor} // Color de la bandera dinámico, ajusta según tus datos
                textColor={selection.textColor} // Color del texto dinámico, ajusta según tus datos
                date={selection.date} // Fecha dinámica, ajusta según tus datos
                hour={selection.hour} // Hora dinámica, ajusta según tus datos
                emotion={selection.selectedEmotionButtons.join(', ')} // Emoción seleccionada dinámica, ajusta según tus datos
                flags={selection.selectedEmotionButtons} // Botones de emoción seleccionados
                activities={selection.selectedActivityButtons.map((activity: string) => ({ activity, cost: 5 }))} // Actividades seleccionadas
                EmotionComponent={emotionData.image} // Componente de emoción
                emotionProps={{ width: 60, height: 100 }} // Propiedades del componente de emoción
                backgroundColor={emotionData.backgroundColor} 
                imageUrl={''}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
