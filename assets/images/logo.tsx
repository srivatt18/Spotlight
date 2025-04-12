// Logo.tsx
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Svg, { SvgProps } from 'react-native-svg';
import GradientCircle from './gradient-circle.svg'; 
import Clapboard from './clapboard.png'; 

interface LogoProps {
  size?: number;
  withClapboard?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 100, withClapboard = true }) => {
  return (
    <View style={{ width: size, height: size }}>
      <GradientCircle width={size} height={size} />
      {withClapboard && (
        <Image
          source={Clapboard}
          style={[styles.clapboard, { width: size * 0.5, height: size * 0.5 }]}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  clapboard: {
    position: 'absolute',
    top: '25%',
    left: '25%',
  },
});

export default Logo;

