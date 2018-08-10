import React from 'react'
import { ImageBackground } from 'react-native'
import backgroundImage from '../../../assets/backgroundImage.png'

const pageLayout = (props) => (
    <ImageBackground source={backgroundImage} resizeMode="stretch" style={{ width: '100%', height: '100%' }}>
        {props.children}
    </ImageBackground>
);
export default pageLayout;