import type { NextPage } from 'next'
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Home: NextPage = () => {
const Theme: any = useTheme();
const currentTheme = Theme.enabled
const toggleTheme = Theme.toggleTheme
const L:React.CSSProperties = {
  backgroundColor:"red"
}
const D:React.CSSProperties = {
  backgroundColor:"transparent"
}
  return (
    <>
      <div style={currentTheme ? D : L} onClick={() => { toggleTheme() }} >Mr.Hotels</div>
    </>

  );
}

export default Home
