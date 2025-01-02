import React from 'react'
import { Tabs } from 'expo-router'
import { Pressable, StyleProp, ViewStyle } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from '@/constants/colors'
import { BlurView } from 'expo-blur'

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.dark.neutral_1,
        tabBarInactiveTintColor: colors.dark.neutral_8,
        tabBarStyle: {
          position: 'absolute',
          paddingHorizontal: 12,
          paddingTop: 24,
          height: 90,
          elevation: 0,
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={40}
            style={{
              flex: 1,
              borderRadius: 16,
              margin: 16,
              overflow: 'hidden',
              borderWidth: 2,
              borderColor: colors.green_2,
              backgroundColor: `${colors.green_2}B4`,
            }}
          />
        ),
        tabBarButton: (props) => (
          <Pressable
            {...props}
            android_ripple={null}
            style={props.style as StyleProp<ViewStyle>}
          />
        )
      }}
    >
      <Tabs.Screen
        name='stats'
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons name={focused ? 'chart-bar' : 'chart-bar-stacked'} size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name='tradehistory'
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons name={focused ? 'book-edit' : 'book-edit-outline'} size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name='tools'
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons name={focused ? 'wrench' : 'wrench-outline'} size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons name={focused ? 'account-cog' : 'account-cog-outline'} size={28} color={color} />
        }}
      />
    </Tabs>
  )
}

export default Layout