import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from './src/components/CoinsStack';

export default function App() {

  return (
    <NavigationContainer>
      <CoinsStack />
    </NavigationContainer>
  );
}
