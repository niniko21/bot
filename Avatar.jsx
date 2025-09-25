import React from 'react'
import Lottie from 'lottie-react'
import idleAnim from './idle.json'
import happyAnim from './happy.json'

export default function Avatar({ mood }) {
  const animationData = mood === 'happy' ? happyAnim : idleAnim

  return (
    <div style={{ width: 200, margin: '0 auto' }}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  )
}
