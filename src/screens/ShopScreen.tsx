import React, { VFC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShopScreen: VFC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ShopScreen</Text>
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {},
});
