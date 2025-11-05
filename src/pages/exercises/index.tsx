import React from 'react'
import { Container } from '@mui/material'
import { ExercisesHeader, ExercisesFilter, ExercisesList, ExerciseModal } from '../../features/exercises'

const ExercisesPage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <ExercisesHeader />
      <ExercisesFilter />
      <ExercisesList />
      <ExerciseModal />
    </Container>
  )
}

export default ExercisesPage
