import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Flex, HStack, NAMED_COLORS, Spinner } from '@ironfish/ui-kit'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import { AssetInformationGrid } from 'components/CustomAssets/AssetInformationGrid/AssetInformationGrid'
import { AssetHistory } from 'components/CustomAssets/AssetHistory/AssetHistory'
// import { AssetTransactionChart } from 'components/CustomAssets/AssetTransactionChart/AssetTransactionChart'
import useAsset from 'hooks/useAsset'
import { useMemo } from 'react'
import useAssetDescriptions from 'hooks/useAssetDescriptions'

export default function AssetInfo() {
  const router = useRouter()
  const { id } = router.query

  const asset = useAsset(id as string)

  const descriptions = useAssetDescriptions({
    asset: id as string,
  })

  if (asset.error) {
    throw asset.error
  }

  const assetDetails = useMemo(() => {
    if (!asset.loaded) {
      return {
        created_transaction_hash: '—',
        id: '—',
        identifier: '—',
        metadata: '—',
        name: 'Loading...',
        object: 'asset',
        owner: '—',
        supply: '—',
      }
    }

    return asset.data
  }, [asset])

  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Head>
        <title>Iron Fish: Block {id}</title>
      </Head>
      <Box mx={{ base: '2rem', lg: '15%' }} mb="6rem" zIndex={1}>
        <Flex mt="2.5rem">
          <Breadcrumbs />
        </Flex>
        <Flex mt="0.5rem" mb="2rem">
          <h3>Asset Information</h3>
        </Flex>
        <AssetInformationGrid
          loading={!asset.loaded}
          assetDetails={assetDetails}
        />
        <Box my="0.5rem">
          <h3>Asset History</h3>
        </Box>
        {descriptions.loaded ? (
          <AssetHistory assetHistory={descriptions.data} />
        ) : (
          <HStack justifyContent="center" py="6rem">
            <Spinner
              color={NAMED_COLORS.LIGHT_BLUE}
              emptyColor={NAMED_COLORS.LIGHT_GREY}
              size="xl"
              thickness="0.25rem"
              speed="0.75s"
            />
          </HStack>
        )}
        <Box mb="8rem" />
        {/* <Box mt="0.5rem" mb="2rem">
          <h3>Asset History Chart</h3>
        </Box>
        <AssetTransactionChart /> */}
      </Box>
    </main>
  )
}
