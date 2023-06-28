import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

export default function App() {

  // Define the options for each category
  const painTypeOptions = ['Sharp', 'Cramping', 'Pulling', 'Stabbing', 'Aching', 'Pulsating'];
  const painLocationOptions = ['Vulva', 'Ovaries', 'Lower back', 'Womb', 'Leg', 'Hip'];
  const whatAreTheTriggersOptions = ['Stress', 'Physical activity', 'Sitting', 'Walking', 'Food', 'Rest'];
  const associatedFactorsOptions = ['Nausea', 'Vomiting', 'Sweating', 'Fever', 'Chills', 'Weakness'];

  // Define the state for each category with an initial state of all false for buttons action
  const [painTypeState, setPainTypeState] = useState(painTypeOptions.map(() => false));
  const [painLocationState, setPainLocationState] = useState(painLocationOptions.map(() => false));
  const [triggerState, setTriggerState] = useState(whatAreTheTriggersOptions.map(() => false));
  const [factorState, setFactorState] = useState(associatedFactorsOptions.map(() => false));

  // This function handles the press event, it toggles the state of the selected option
  const handlePress = (state, setter) => (index) => {
    const newState = [...state];
    newState[index] = !newState[index];
    setter(newState);
  };
// This function renders a set of options. Each set is divided into two ScrollView components.
  const renderContainers = (list, state, handler) => {
    const halfLength = Math.ceil(list.length / 2);
    const firstHalf = list.slice(0, halfLength);
    const secondHalf = list.slice(halfLength);
    // Returns two horizontal ScrollViews with options
    return (
      <>
        <ScrollView horizontal={true} contentContainerStyle={styles.userOptions}>
          <View style={styles.containerRow}>
            {firstHalf.map((text, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.containerItem,
                  {backgroundColor: state[index] ? '#e7e7ff' : '#f3f4f5'},
                ]}
                onPress={() => handler(index)}
              >
                <Text style={{ color: state[index] ? '#6a4eff' : '#000000' }}>{text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <ScrollView horizontal={true} contentContainerStyle={styles.userOptions}>
          <View style={styles.containerRow}>
            {secondHalf.map((text, index) => (
              <TouchableOpacity
                key={index + halfLength}
                style={[
                  styles.containerItem,
                  {backgroundColor: state[index + halfLength] ? '#e7e7ff' : '#f3f4f5'},
                ]}
                onPress={() => handler(index + halfLength)}
              >
                <Text style={{ color: state[index + halfLength] ? '#6a4eff' : '#000000' }}>{text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </>
    );
  };
// The main render function
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Text style={styles.title}>Pain</Text>
        <Text style={styles.subtitle}>How much pain do you feel?</Text>
        <View style={styles.sliderContainer}>
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>🥲</Text>
          </View>
          <Slider style={styles.slider} />
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>😍</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Pain Type</Text>
        {renderContainers(painTypeOptions, painTypeState, handlePress(painTypeState, setPainTypeState))}
        <Text style={styles.subtitle}>Pain Location</Text>
        {renderContainers(painLocationOptions, painLocationState, handlePress(painLocationState, setPainLocationState))}
        <Text style={styles.subtitle}>What Are The Triggers?</Text>
        {renderContainers(whatAreTheTriggersOptions, triggerState, handlePress(triggerState, setTriggerState))}
        <Text style={styles.subtitle}>Associated Factors</Text>
        {renderContainers(associatedFactorsOptions, factorState, handlePress(factorState, setFactorState))}
      </ScrollView>
    </SafeAreaView>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  innerContainer: {
    padding: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emojiContainer: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  slider: {
    flex: 1,
    marginHorizontal: 5,
    minimumTrackTintColor: '#3bbe52',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
  },
  emoji: {
    fontSize: 30,
  },
  userOptions: {
    padding: 0,
  },
  containerRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  containerItem: {
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
