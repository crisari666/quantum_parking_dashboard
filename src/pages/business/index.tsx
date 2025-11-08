import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import { BusinessesControls, BusinessesList } from '../../features/business/components'

export function BusinessView(): JSX.Element {
  const { t } = useTranslation()

  return (
    <section>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('business.title')}
        </Typography>

        <BusinessesControls />
        <BusinessesList />
      </Box>
    </section>
  )
}

