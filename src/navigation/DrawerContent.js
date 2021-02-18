import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, Switch, TouchableRipple, Text} from 'react-native-paper';
import usePreferences from '../hooks/usePreferences';
const DrawerContent = props => {
  const {navigation} = props;
  const [active, setActive] = useState('home');
  const {theme, toggleTheme} = usePreferences();

  const onChageScreen = screen => {
    setActive(screen);
    navigation.navigate(screen);
  };
  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          label="Inicio"
          active={active === 'home'}
          onPress={() => onChageScreen('home')}
        />
        <Drawer.Item
          label="Películas Populares"
          active={active === 'popular'}
          onPress={() => onChageScreen('popular')}
        />
        <Drawer.Item
          label="Nuevas Películas"
          active={active === 'news'}
          onPress={() => onChageScreen('news')}
        />
      </Drawer.Section>
      <Drawer.Section title="Opciones">
        <TouchableRipple>
          <View style={styles.preferences}>
            <Text>Tema Oscuro</Text>
            <Switch
              value={theme === 'dark' ? true : false}
              onValueChange={toggleTheme}
            />
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  preferences: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
