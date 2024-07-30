import { SearchIcon } from '@chakra-ui/icons'
import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const AppTitle = () => {
  const {t} = useTranslation('common')
  return (
      <Box display="flex" alignItems="center">
        <Heading as="h1" size="lg">
          {t("apptitle")}
        </Heading>
        <SearchIcon ml={1} />
      </Box>
  )
}
