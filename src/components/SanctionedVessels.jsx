import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import sanctioned from '../../sanctioned'
import sanctionIcon from '../assets/sanction.svg'
import { Container, H2, Table, Th, Td, Tr } from './Measurment'

const PAGE_SIZE = 10

const SHORT_CATEGORY_NAMES = [
  'სენსიტიური',
  'მოწინავე ტექნოლოგია',
  'ეკონომიკურად კრიტიკული',
  'ევროკავშირი → რუსეთი',
  'რუსეთი → ევროკავშირი',
  'ევროკავშირი → ბელარუსი',
  'ბელარუსი → ევროკავშირი',
  'აშშ: ფუფუნების საქონელი',
  'აშშ: ინდუსტრიული სექტორი',
  'აშშ: ექსპორტი',
  'აშშ: იმპორტი რუსეთიდან',
  'აშშ: ორმაგი დანიშნულება',
  'ორმაგი დანიშნულება',
  'სამხედრო',
]

const SANCTIONS_RESOURCES = [
  {
    title: 'პირების და კომპანიების სანქციების საძიებო სისტემები',
    links: [
      { label: 'სანქციების საძიებო — დიდი ბრიტანეთი (OFSI)', url: 'https://sanctionssearchapp.ofsi.hmtreasury.gov.uk/' },
      { label: 'სანქციების საძიებო — ევროკავშირი', url: 'https://www.sanctionsmap.eu/' },
      { label: 'ფიზიკური პირების და კომპანიების საძიებო — აშშ (OFAC)', url: 'https://sanctionssearch.ofac.treas.gov/' },
      { label: 'სანქციების საძიებო — დიდი ბრიტანეთი', url: 'https://search-uk-sanctions-list.service.gov.uk/' },
    ],
  },
  {
    title: 'აშშ',
    links: [
      { label: 'ფუფუნების საგნები (Supplement No. 5 to Part 746)', url: 'https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-746/appendix-Supplement%20No.%205%20to%20Part%20746' },
      { label: 'რუსეთის ინდუსტრიული სექტორის სანქციები (Supplement No. 2 to Part 746)', url: 'https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-746/appendix-Supplement%20No.%202%20to%20Part%20746' },
      { label: 'Supplement No. 4 to Part 746', url: 'https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-746/appendix-Supplement%20No.%204%20to%20Part%20746' },
      { label: 'აშშ-ის სეს ესნ კოდების საძიებო', url: 'https://uscensus.prod.3ceonline.com/' },
    ],
  },
  {
    title: 'ევროკავშირი',
    links: [
      { label: 'სანქცირებული საქონელი, ფიზიკური პირები და კომპანიები (ბელარუსი)', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A02006R0765-20230805' },
      { label: 'სანქცირებული საქონელი და კომპანიები (რუსეთი)', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A02014D0512-20231001' },
      { label: 'სანქცირებული ფიზიკური პირები და კომპანიები (რუსეთი)', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A02014D0145-20220421&qid=1654170753754' },
      { label: 'სანქცირებული ფიზიკური პირები და კომპანიები (ბელარუსი)', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A02014R0269-20220421' },
      { label: 'სანქცირებული ფიზიკური პირები და კომპანიები (ბელარუსი)', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A02014D0145-20220421' },
      { label: 'სანქცირებული ფიზიკური პირები და კომპანიები (ბელარუსი)', url: 'https://eur-lex.europa.eu/legal-content/GA/TXT/?uri=CELEX:32012D0642' },
      { label: 'სანქცირებული საქონელი და კომპანიები (რუსეთი)', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A02014R0833-20231001' },
      { label: 'მოწინავე ტექნოლოგიების ნუსხა (ორმაგების დამატება)', url: 'https://finance.ec.europa.eu/document/download/e5a807d3-6ca0-4bfb-8c6c-2f56f55e0b2e_en?filename=faqs-sanctions-russia-correlation-table%E2%80%93goods-regulation-833_en.xlsx' },
      { label: 'ევროპის სეს ესნ კოდების საძიებო', url: 'https://ec.europa.eu/search/?query_source=TAXUD&QueryText=' },
    ],
  },
  {
    title: 'სხვა ქვეყნები',
    links: [
      { label: 'ბრიტანეთი (რუსეთი)', url: 'https://www.legislation.gov.uk/uksi/2019/855/contents' },
      { label: 'ბრიტანეთი (ბელარუსი)', url: 'https://www.legislation.gov.uk/uksi/2019/600' },
      { label: 'კანადა (რუსეთი)', url: 'https://laws.justice.gc.ca/eng/regulations/sor-2014-58/fulltext.html' },
      { label: 'კანადა (ბელარუსი)', url: 'https://laws.justice.gc.ca/eng/regulations/SOR-2020-214/FullText.html' },
      { label: 'კორეა (ANEX 2-2)', url: 'https://russia.kosti.or.kr/user/Ct/Ct010L.do' },
    ],
  },
  {
    title: 'დიდი ბრიტანეთი და იაპონია',
    links: [
      { label: 'ბრიტანეთის სანქციების სრული სია', url: 'https://www.legislation.gov.uk/uksi/2019/855/data.xht?view=snippet&wrap=true' },
      { label: 'იაპონია — სანქცირებული საქონელი რუსეთიდან', url: 'https://sanctionsnews.bakermckenzie.com/japan-introduces-further-sanctions-against-russia-2/' },
      { label: 'იაპონია — ფუფუნების საგნები', url: 'https://www.meti.go.jp/policy/external_economy/trade_control/01_seido/04_seisai/downloadCrimea/20220329_shashihin.pdf' },
      { label: 'იაპონია — სანქცირებული საქონელი', url: 'https://www.meti.go.jp/files/000005475.pdf' },
    ],
  },
]

const SanctionedVessels = () => {
  const [activeTab, setActiveTab] = useState('vessels')
  const [nameQuery, setNameQuery] = useState('')
  const [imoQuery, setImoQuery] = useState('')
  const [goodsQuery, setGoodsQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [goodsData, setGoodsData] = useState(null)
  const [isLoadingGoods, setIsLoadingGoods] = useState(false)
  const [goodsLoadError, setGoodsLoadError] = useState('')
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [goodsPage, setGoodsPage] = useState(1)
  const [expandedRow, setExpandedRow] = useState(null)

  useEffect(() => {
    if (activeTab !== 'goods' || goodsData) return undefined

    const controller = new AbortController()
    setIsLoadingGoods(true)
    setGoodsLoadError('')

    fetch(`${import.meta.env.BASE_URL}sanctions-goods.json`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Sanctions data request failed: ${response.status}`)
        return response.json()
      })
      .then((data) => {
        if (!Array.isArray(data.categories) || !Array.isArray(data.records)) {
          throw new Error('Sanctions data has an invalid format')
        }
        setGoodsData(data)
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        console.error('[sanctions goods load]', error)
        setGoodsLoadError('საქონლის სანქციების მონაცემების ჩატვირთვა ვერ მოხერხდა.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoadingGoods(false)
      })

    return () => controller.abort()
  }, [activeTab, goodsData, loadAttempt])

  const filteredShips = useMemo(() => {
    const normalizedName = nameQuery.trim().toLowerCase()
    const normalizedImo = imoQuery.trim().toLowerCase()

    return sanctioned.filter((ship) => {
      const matchesName = !normalizedName || ship.name.toLowerCase().includes(normalizedName)
      const matchesImo = !normalizedImo || String(ship.imo).toLowerCase().includes(normalizedImo)
      return matchesName && matchesImo
    })
  }, [nameQuery, imoQuery])

  const filteredGoods = useMemo(() => {
    if (!goodsData) return []
    const query = goodsQuery.trim().toLowerCase().replace(/\s+/g, ' ')
    const normalizedQuery = query.replace(/[\s.\-_/]/g, '')

    return goodsData.records.filter((record) => {
      const [, code, description, markers] = record
      const matchesCategory = !categoryFilter ||
        markers.some(([categoryIndex]) => String(categoryIndex) === categoryFilter)
      if (!matchesCategory) return false
      if (!query) return true

      const categoryText = markers
        .map(([categoryIndex, value]) => `${goodsData.categories[categoryIndex]} ${value}`)
        .join(' ')
      const searchableText = `${code} ${description} ${categoryText}`
        .toLowerCase()
        .replace(/\s+/g, ' ')
      const normalizedSearchableText = searchableText.replace(/[\s.\-_/]/g, '')
      if (/^\d+$/.test(normalizedQuery)) {
        const normalizedCode = String(code).replace(/\D/g, '')
        return normalizedCode.startsWith(normalizedQuery)
      }
      return searchableText.includes(query) || normalizedSearchableText.includes(normalizedQuery)
    })
  }, [categoryFilter, goodsData, goodsQuery])

  const updateGoodsSearch = (setValue, value) => {
    setValue(value)
    setGoodsPage(1)
  }

  const clearVesselSearch = () => {
    setNameQuery('')
    setImoQuery('')
  }

  const clearGoodsSearch = () => {
    setGoodsQuery('')
    setCategoryFilter('')
    setGoodsPage(1)
  }

  const handleTabKeyDown = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const tabs = [...event.currentTarget.parentElement.querySelectorAll('[role="tab"]')]
    const currentIndex = tabs.indexOf(event.currentTarget)
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? tabs.length - 1
        : (currentIndex + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length
    tabs[nextIndex].focus()
    tabs[nextIndex].click()
  }

  const totalPages = Math.max(1, Math.ceil(filteredGoods.length / PAGE_SIZE))
  const currentPage = Math.min(goodsPage, totalPages)
  const firstVisibleItem = filteredGoods.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const lastVisibleItem = Math.min(currentPage * PAGE_SIZE, filteredGoods.length)
  const visibleGoods = filteredGoods.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const pageItems = totalPages <= 7
    ? Array.from({ length: totalPages }, (_, index) => index + 1)
    : [...new Set([
      1,
      ...(currentPage > 3 ? ['start-ellipsis'] : []),
      ...Array.from(
        { length: 3 },
        (_, index) => currentPage - 1 + index
      ).filter((page) => page > 1 && page < totalPages),
      ...(currentPage < totalPages - 2 ? ['end-ellipsis'] : []),
      totalPages,
    ])]
  return (
    <Container>
      <PageIntro>
        <Breadcrumb><span>საწყისი გვერდი</span><BreadcrumbDivider>/</BreadcrumbDivider>სანქციები</Breadcrumb>
        <Header>
          <LogoFrame>
            <SanctionLogo src={sanctionIcon} alt='' />
          </LogoFrame>
          <HeaderText>
            <PageTitle>სანქციები</PageTitle>
            <PageDescription>სანქცირებული გემების და საქონლის ძებნა</PageDescription>
          </HeaderText>
        </Header>
      </PageIntro>

      <Tabs role='tablist' aria-label='სანქციების კატეგორიები'>
        <TabButton
          id='sanctions-vessels-tab'
          type='button'
          role='tab'
          aria-selected={activeTab === 'vessels'}
          aria-controls='sanctions-vessels-panel'
          tabIndex={activeTab === 'vessels' ? 0 : -1}
          $active={activeTab === 'vessels'}
          onClick={() => setActiveTab('vessels')}
          onKeyDown={handleTabKeyDown}
        >
          გემები
        </TabButton>
        <TabButton
          id='sanctions-goods-tab'
          type='button'
          role='tab'
          aria-selected={activeTab === 'goods'}
          aria-controls='sanctions-goods-panel'
          tabIndex={activeTab === 'goods' ? 0 : -1}
          $active={activeTab === 'goods'}
          onClick={() => setActiveTab('goods')}
          onKeyDown={handleTabKeyDown}
        >
          საქონელი
        </TabButton>
        <TabButton
          id='sanctions-sources-tab'
          type='button'
          role='tab'
          aria-selected={activeTab === 'sources'}
          aria-controls='sanctions-sources-panel'
          tabIndex={activeTab === 'sources' ? 0 : -1}
          $active={activeTab === 'sources'}
          onClick={() => setActiveTab('sources')}
          onKeyDown={handleTabKeyDown}
        >
          წყაროები
        </TabButton>
      </Tabs>

      {activeTab === 'vessels' ? (
        <TabPanel
          id='sanctions-vessels-panel'
          role='tabpanel'
          aria-labelledby='sanctions-vessels-tab'
          tabIndex={0}
        >
          <SearchPanel>
            <SearchField>
              <Label>გემის სახელი</Label>
              <Input
                type='search'
                value={nameQuery}
                onChange={(event) => setNameQuery(event.target.value)}
                placeholder='მაგ: Angara'
              />
            </SearchField>

            <SearchField>
              <Label>IMO</Label>
              <Input
                type='search'
                value={imoQuery}
                onChange={(event) => setImoQuery(event.target.value)}
                placeholder='მაგ: 9179842'
              />
            </SearchField>
          </SearchPanel>

          <ResultMeta>
            <span aria-live='polite'>{filteredShips.length} სანქცირებული გემი</span>
            <ClearButton type='button' onClick={clearVesselSearch}>
              გასუფთავება
            </ClearButton>
          </ResultMeta>

          <TableWrapper>
            <ResultsTable>
              <thead>
                <Tr>
                  <Th>გემის სახელი</Th>
                  <Th>IMO</Th>
                  <Th>განაცხადის თარიღი</Th>
                </Tr>
              </thead>
              <tbody>
                {filteredShips.length > 0 ? (
                  filteredShips.map((ship, index) => (
                    <Tr key={`${ship.imo}-${index}`}>
                      <Td>{ship.name}</Td>
                      <Td>{ship.imo}</Td>
                      <Td>{ship.date}</Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={3}>ძებნის შედეგები არ მოიძებნა</Td>
                  </Tr>
                )}
              </tbody>
            </ResultsTable>
          </TableWrapper>
        </TabPanel>
      ) : activeTab === 'goods' ? (
        <TabPanel
          id='sanctions-goods-panel'
          role='tabpanel'
          aria-labelledby='sanctions-goods-tab'
          tabIndex={0}
        >
          {goodsLoadError ? (
            <LoadError role='alert'>
              <span>{goodsLoadError}</span>
              <ClearButton
                type='button'
                onClick={() => {
                  setGoodsLoadError('')
                  setLoadAttempt((attempt) => attempt + 1)
                }}
              >
                ხელახლა ცდა
              </ClearButton>
            </LoadError>
          ) : isLoadingGoods ? (
            <LoadingState role='status'>საქონლის სანქციების სია იტვირთება…</LoadingState>
          ) : (
            <GoodsTableCard>
              <GoodsTableToolbar>
                <ToolbarDescription>
                  <ToolbarTitle>საქონლის სანქციების რეესტრი</ToolbarTitle>
                  <ToolbarSubtitle>
                    {goodsData && `მონაცემები განახლებულია ${goodsData.updatedAt}-ის მდგომარეობით`}
                  </ToolbarSubtitle>
                </ToolbarDescription>
                <ToolbarFilters>
                  <SearchControl>
                    <SearchGlyph aria-hidden='true'>⌕</SearchGlyph>
                    <ToolbarInput
                      type='search'
                      aria-label='კოდით ან დასახელებით ძიება'
                      value={goodsQuery}
                      onChange={(event) => updateGoodsSearch(setGoodsQuery, event.target.value)}
                      placeholder='კოდი ან დასახელება...'
                    />
                  </SearchControl>
                  <ToolbarSelect
                    aria-label='სანქციის კატეგორია'
                    value={categoryFilter}
                    onChange={(event) => updateGoodsSearch(setCategoryFilter, event.target.value)}
                    disabled={!goodsData}
                  >
                    <option value=''>ყველა კატეგორია</option>
                    {goodsData?.categories.map((category, index) => (
                      <option value={String(index)} key={`${index}-${category}`}>
                        {SHORT_CATEGORY_NAMES[index] || category}
                      </option>
                    ))}
                  </ToolbarSelect>
                </ToolbarFilters>
              </GoodsTableToolbar>
              <TableToolbarMeta>
                <span aria-live='polite'>
                  {filteredGoods.length.toLocaleString('ka-GE')} შედეგი
                </span>
                <ClearButton type='button' onClick={clearGoodsSearch} disabled={!goodsData}>
                  გასუფთავება
                </ClearButton>
              </TableToolbarMeta>
              <GoodsTableScroll>
                <GoodsTable>
                  <thead>
                    <GoodsTableHeaderRow>
                      <GoodsTh>საქონლის კოდი</GoodsTh>
                      <GoodsTh>საქონლის აღწერა</GoodsTh>
                      <GoodsTh>შეზღუდვები / სია</GoodsTh>
                      <GoodsTh>დეტალები</GoodsTh>
                    </GoodsTableHeaderRow>
                  </thead>
                  <tbody>
                    {visibleGoods.length > 0 ? visibleGoods.map((record) => {
                      const [excelRow, code, description, markers] = record
                      const isExpanded = expandedRow === excelRow
                      return (
                        <React.Fragment key={excelRow}>
                          <GoodsTableRow>
                            <GoodsTd data-label='საქონლის კოდი'>
                              {code || <UnclassifiedLabel>—</UnclassifiedLabel>}
                            </GoodsTd>
                            <GoodsTd data-label='საქონლის აღწერა'>
                              <GoodsTableDescription>{description || '—'}</GoodsTableDescription>
                            </GoodsTd>
                            <GoodsTd data-label='შეზღუდვები / სია'>
                              {markers.length > 0 ? (
                                <CategoryList>
                                  {markers.slice(0, 2).map(([categoryIndex]) => (
                                    <CategoryBadge key={`${excelRow}-${categoryIndex}`}>
                                      {SHORT_CATEGORY_NAMES[categoryIndex] || goodsData.categories[categoryIndex]}
                                    </CategoryBadge>
                                  ))}
                                  {markers.length > 2 && (
                                    <MoreCategories>+{markers.length - 2}</MoreCategories>
                                  )}
                                </CategoryList>
                              ) : <UnclassifiedLabel>—</UnclassifiedLabel>}
                            </GoodsTd>
                            <GoodsTd data-label='დეტალები'>
                              <ExpandButton
                                type='button'
                                aria-expanded={isExpanded}
                                onClick={() => setExpandedRow(isExpanded ? null : excelRow)}
                              >
                                {isExpanded ? 'დახურვა' : 'ნახვა'}
                                <ExpandChevron $expanded={isExpanded}>⌄</ExpandChevron>
                              </ExpandButton>
                            </GoodsTd>
                          </GoodsTableRow>
                          {isExpanded && (
                            <GoodsTableRow $expanded>
                              <ExpandedCell colSpan={4}>
                                <ExpandedContent>
                                  <ExpandedHeading>ჩანაწერის დეტალები</ExpandedHeading>
                                  <ExpandedDescription>
                                    {description || 'აღწერა არ არის მითითებული'}
                                  </ExpandedDescription>
                                  <ExpandedBadges>
                                    {markers.length > 0 ? markers.map(([categoryIndex, value]) => (
                                      <CategoryBadge
                                        key={`detail-${excelRow}-${categoryIndex}`}
                                        title={goodsData.categories[categoryIndex]}
                                      >
                                        {goodsData.categories[categoryIndex]}{value !== 'კი' && ` · ${value}`}
                                      </CategoryBadge>
                                    )) : <UnclassifiedLabel>სანქციის კატეგორია მონიშნული არ არის</UnclassifiedLabel>}
                                  </ExpandedBadges>
                                </ExpandedContent>
                              </ExpandedCell>
                            </GoodsTableRow>
                          )}
                        </React.Fragment>
                      )
                    }) : goodsData && (
                      <GoodsTableRow>
                        <GoodsTd colSpan={4}>
                          <EmptyState>მითითებული კრიტერიუმებით ჩანაწერი ვერ მოიძებნა.</EmptyState>
                        </GoodsTd>
                      </GoodsTableRow>
                    )}
                  </tbody>
                </GoodsTable>
              </GoodsTableScroll>
              <TableFooter>
                <Pagination aria-label='საქონლის შედეგების გვერდები'>
                  <PageButton
                    type='button'
                    aria-label='წინა გვერდი'
                    disabled={currentPage === 1}
                    onClick={() => setGoodsPage(currentPage - 1)}
                  >
                    წინა
                  </PageButton>
                  {pageItems.map((item) => (
                    typeof item === 'number' ? (
                      <PageButton
                        type='button'
                        key={item}
                        aria-label={`გვერდი ${item}`}
                        aria-current={currentPage === item ? 'page' : undefined}
                        $active={currentPage === item}
                        onClick={() => setGoodsPage(item)}
                      >
                        {item}
                      </PageButton>
                    ) : (
                      <PageEllipsis key={item} aria-hidden='true'>…</PageEllipsis>
                    )
                  ))}
                  <PageButton
                    type='button'
                    aria-label='შემდეგი გვერდი'
                    disabled={currentPage === totalPages}
                    onClick={() => setGoodsPage(currentPage + 1)}
                  >
                    შემდეგი
                  </PageButton>
                </Pagination>
                <span>
                  ნაჩვენებია {firstVisibleItem.toLocaleString('ka-GE')}–{lastVisibleItem.toLocaleString('ka-GE')} / {filteredGoods.length.toLocaleString('ka-GE')}
                </span>
              </TableFooter>
            </GoodsTableCard>
          )}
        </TabPanel>
      ) : (
        <TabPanel
          id='sanctions-sources-panel'
          role='tabpanel'
          aria-labelledby='sanctions-sources-tab'
          tabIndex={0}
        >
          <SourcesIntro>
            <SourcesTitle>საძიებო სისტემები და წყაროები</SourcesTitle>
          </SourcesIntro>
          <SourcesGrid>
            {SANCTIONS_RESOURCES.map((group) => (
              <SourceCard key={group.title}>
                <SourceCardTitle>{group.title}</SourceCardTitle>
                <SourceLinkList>
                  {group.links.map((link) => (
                    <SourceLinkRow key={link.url}>
                      <SourceLinkText>{link.label}</SourceLinkText>
                      <SourceLink
                        href={link.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={`გარე ბმულის გახსნა: ${link.label}`}
                        title='გარე ბმულის გახსნა'
                      >
                        <svg aria-hidden='true' viewBox='0 0 24 24' fill='none'>
                          <path d='M14 4h6v6' />
                          <path d='M20 4 11 13' />
                          <path d='M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5' />
                        </svg>
                      </SourceLink>
                    </SourceLinkRow>
                  ))}
                </SourceLinkList>
              </SourceCard>
            ))}
          </SourcesGrid>
        </TabPanel>
      )}
    </Container>
  )
}

const PageIntro = styled.header`
  width: 100%;
  padding: 0.4rem 0 1.8rem;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  min-height: 13rem;
  padding: 2.2rem 2.6rem;
  border-radius: 1.5rem;
  background: linear-gradient(135deg, #1aac83 0%, #0c5d47 100%);

  @media (max-width: 560px) {
    min-height: 0;
    gap: 1.3rem;
    padding: 1.7rem 1.5rem;
    border-radius: 1.2rem;
  }
`

const LogoFrame = styled.div`
  display: grid;
  width: 7rem;
  height: 7rem;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);

  @media (max-width: 560px) {
    width: 5.5rem;
    height: 5.5rem;
  }
`

const SanctionLogo = styled.img`
  display: block;
  width: 5.8rem;
  height: 5.8rem;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(34%) sepia(47%) saturate(960%) hue-rotate(107deg) brightness(89%) contrast(94%);

  @media (max-width: 560px) {
    width: 4.6rem;
    height: 4.6rem;
  }
`

const HeaderText = styled.div`
  min-width: 0;
`

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
  color: #586578;
  font-size: 1.3rem;
  font-weight: 500;

  span {
    color: #8490a0;
  }
`

const BreadcrumbDivider = styled.span`
  color: #b2bac5 !important;
`

const PageTitle = styled(H2)`
  margin: 0;
  color: #fff;
  font-size: 2.7rem;
  text-align: left;
`

const PageDescription = styled.p`
  margin: 0.7rem 0 0;
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.45rem;
  line-height: 1.6;
`

const SourcesIntro = styled.div`
  margin: 0.5rem 0 1.2rem;
`

const SourcesTitle = styled.h3`
  margin: 0;
  color: #334155;
  font-size: 1.8rem;
  font-weight: 700;
`

const SourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 1.2rem;

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

const SourceCard = styled.article`
  min-width: 0;
  padding: 1.7rem 1.8rem 1.4rem;
  border: 1px solid #e2e7ec;
  border-radius: 1.1rem;
  background: #fff;
  box-shadow: 0 2px 5px rgba(24, 39, 58, 0.025);
`

const SourceCardTitle = styled.h4`
  margin: 0 0 1rem;
  color: #445166;
  font-size: 1.65rem;
  font-weight: 700;
`

const SourceLinkList = styled.div`
  display: grid;
  gap: 0.2rem;
`

const SourceLinkRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  min-width: 0;
  padding: 0.65rem 0;
  border-bottom: 1px solid #f0f2f5;

  &:last-child {
    border-bottom: 0;
  }
`

const SourceLinkText = styled.span`
  min-width: 0;
  color: #526078;
  font-size: 1.5rem;
  line-height: 1.55;
  overflow-wrap: anywhere;
`

const SourceLink = styled.a`
  display: grid;
  width: 3.8rem;
  height: 3.8rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #d5e9de;
  border-radius: 0.75rem;
  background: #f0f8f3;
  color: #168054;
  text-decoration: none;
  transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease, transform 0.18s ease;

  svg {
    width: 1.9rem;
    height: 1.9rem;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  &:hover {
    transform: translateY(-1px);
    border-color: #168054;
    background: #168054;
    color: #fff;
  }

  &:focus-visible {
    outline: 3px solid rgba(26, 172, 131, 0.3);
    outline-offset: 2px;
  }
`

const Tabs = styled.div`
  display: flex;
  width: 100%;
  gap: 0.2rem;
  margin: 0 0 1.4rem;
  padding: 0.35rem;
  overflow-x: auto;
  border: 1px solid #e0e6eb;
  border-radius: 0.9rem;
  background: #fff;
  -webkit-overflow-scrolling: touch;
`

const TabButton = styled.button`
  min-height: 3.8rem;
  flex: 1 0 max-content;
  padding: 0.8rem 1.6rem;
  border: 0;
  border-radius: 0.65rem;
  background: ${({ $active }) => ($active ? '#eaf5f0' : 'transparent')};
  color: ${({ $active }) => ($active ? '#0d7755' : '#667386')};
  font: inherit;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;

  &:focus-visible {
    outline: 3px solid rgba(26, 172, 131, 0.3);
    outline-offset: 2px;
  }
`

const TabPanel = styled.section`
  width: 100%;
  min-width: 0;
`

const SearchPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
  min-width: 0;
  gap: 1.5rem;
  margin-top: 1.2rem;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e2e7ec;
  border-radius: 1.1rem;
  box-shadow: 0 2px 5px rgba(24, 39, 58, 0.025);

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.2rem;
    padding: 1.2rem;
  }
`

const SearchField = styled.label`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
`

const Label = styled.span`
  color: #657286;
  font-size: 1.4rem;
  font-weight: 700;
`

const Input = styled.input`
  width: 100%;
  min-width: 0;
  min-height: 4.2rem;
  border: 1px solid #dfe5ea;
  border-radius: 0.75rem;
  padding: 0.9rem 1.2rem;
  font: inherit;
  font-size: 1.5rem;
  background: white;
  color: #151d48;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1aac83;
    box-shadow: 0 0 0 3px rgba(26, 172, 131, 0.1);
  }

  &::placeholder {
    color: rgba(21, 29, 72, 0.45);
  }
`

const ResultMeta = styled.div`
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1rem 0;
  color: #13845f;
  font-size: 1.8rem;
  font-weight: 700;
`

const ClearButton = styled.button`
  flex-shrink: 0;
  background: transparent;
  border: 1px solid rgba(26, 172, 131, 0.32);
  color: #087957;
  border-radius: 999px;
  padding: 0.8rem 1.4rem;
  font: inherit;
  font-size: 1.45rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(26, 172, 131, 0.08);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const TableWrapper = styled.div`
  width: 100%;
  max-height: 64rem;
  overflow: auto;
  margin-top: 1rem;
  border: 1px solid #e2e7ec;
  border-radius: 1.1rem;
  background: #fff;
  box-shadow: 0 2px 5px rgba(24, 39, 58, 0.025);

  &::-webkit-scrollbar {
    width: 1rem;
    height: 1rem;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #1aac83;
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #138a67;
  }
`

const ResultsTable = styled(Table)`
  margin-top: 0;
  width: 100%;
  background: #fff;
  border-collapse: collapse;

  thead th {
    position: sticky;
    top: 0;
    z-index: 2;
    background: #f8fafb;
    box-shadow: inset 0 -1px 0 #e7ebef;
    padding: 1.2rem 1rem;
    color: #728094;
    font-size: 1.35rem;
  }

  tbody td {
    background: #fff;
    padding: 1.15rem 1rem;
    color: #354258;
    font-size: 1.5rem;
    transition: background 0.2s ease;
  }

  tbody tr:hover td {
    background: #f8fbf9;
  }
`

const GoodsTableCard = styled.div`
  overflow: hidden;
  border: 1px solid #e2e7ec;
  border-radius: 1.1rem;
  background: #fff;
  box-shadow: 0 2px 5px rgba(24, 39, 58, 0.025);
`

const GoodsTableToolbar = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem;
  border-bottom: 1px solid #e9edf1;

  @media (max-width: 760px) {
    padding: 1.3rem;
  }
`

const ToolbarDescription = styled.div`
  min-width: 0;
`

const ToolbarTitle = styled.h3`
  margin: 0;
  color: #334155;
  font-size: 1.55rem;
  font-weight: 700;
`

const ToolbarSubtitle = styled.p`
  margin: 0.45rem 0 0;
  color: #8a95a4;
  font-size: 1.25rem;
`

const ToolbarFilters = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
  width: 100%;

  @media (max-width: 560px) {
    align-items: stretch;
    flex-direction: column;
    width: 100%;

    & > label {
      flex: 0 0 auto;
    }
  }
`

const SearchControl = styled.label`
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: 3.8rem;
  flex: 1 1 20rem;
  gap: 0.7rem;
  padding: 0 1rem;
  border: 1px solid #dfe5ea;
  border-radius: 0.7rem;
  background: #fff;

  &:focus-within {
    border-color: #1aac83;
    box-shadow: 0 0 0 3px rgba(26, 172, 131, 0.1);
  }
`

const SearchGlyph = styled.span`
  color: #98a3b1;
  font-size: 2rem;
  line-height: 1;
`

const ToolbarInput = styled.input`
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #344054;
  font: inherit;
  font-size: 1.4rem;

  &::placeholder {
    color: #98a3b1;
  }
`

const ToolbarSelect = styled.select`
  min-width: 14rem;
  min-height: 3.8rem;
  padding: 0 3rem 0 1rem;
  border: 1px solid #dfe5ea;
  border-radius: 0.7rem;
  background: #fff;
  color: #344054;
  font: inherit;
  font-size: 1.55rem;
  text-overflow: ellipsis;

  &:focus {
    outline: none;
    border-color: #1aac83;
    box-shadow: 0 0 0 3px rgba(26, 172, 131, 0.1);
  }

  @media (max-width: 560px) {
    width: 100%;
  }
`

const TableToolbarMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 4.2rem;
  padding: 0.5rem 1.5rem;
  border-bottom: 1px solid #edf0f3;
  color: #13845f;
  font-size: 1.4rem;
  font-weight: 700;
`

const GoodsTableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
`

const GoodsTable = styled.table`
  width: 100%;
  min-width: 76rem;
  border-collapse: collapse;
  table-layout: fixed;

  th:nth-child(1) { width: 15%; }
  th:nth-child(2) { width: 41%; }
  th:nth-child(3) { width: 34%; }
  th:nth-child(4) { width: 10%; }
`

const GoodsTableHeaderRow = styled.tr`
  background: #f8fafb;
`

const GoodsTh = styled.th`
  padding: 1.1rem 1.3rem;
  border-bottom: 1px solid #e8edf1;
  color: #738094;
  font-size: 1.3rem;
  font-weight: 500;
  text-align: left;
`

const GoodsTableRow = styled.tr`
  background: ${({ $expanded }) => ($expanded ? '#f9fbfa' : '#fff')};
  border-bottom: 1px solid #edf0f3;

  &:hover {
    background: #f8fbf9;
  }
`

const GoodsTd = styled.td`
  padding: 1.15rem 1.3rem;
  color: #364256;
  font-size: 1.4rem;
  vertical-align: middle;

  &:first-child {
    color: #4a586b;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
`

const GoodsTableDescription = styled.div`
  display: -webkit-box;
  overflow: hidden;
  color: #445166;
  font-size: 1.4rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`

const CategoryBadge = styled.span`
  max-width: 100%;
  padding: 0.45rem 0.75rem;
  border: 1px solid #e3e9f2;
  border-radius: 0.55rem;
  background: #f5f7fb;
  color: #53627c;
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.4;
  overflow-wrap: anywhere;
`

const MoreCategories = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.6rem;
  border-radius: 0.5rem;
  background: #f1f3f5;
  color: #64748b;
  font-size: 1rem;
  font-weight: 700;
`

const UnclassifiedLabel = styled.span`
  color: #9aa4b1;
  font-size: 1.35rem;
`

const EmptyState = styled.div`
  padding: 3rem 1.5rem;
  color: #64748b;
  text-align: center;
  font-size: 1.4rem;
`

const ExpandedCell = styled.td`
  padding: 0 !important;
  background: #f8faf9;
`

const ExpandedContent = styled.div`
  padding: 1.5rem 2rem;
  border-left: 3px solid #1aac83;
`

const ExpandedHeading = styled.h4`
  margin: 0;
  color: #334155;
  font-size: 1.4rem;
`

const ExpandedDescription = styled.p`
  margin: 0.7rem 0;
  color: #4b586b;
  font-size: 1.4rem;
  line-height: 1.65;
  overflow-wrap: anywhere;
`

const ExpandedBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`

const ExpandButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.8rem;
  border: 0;
  border-radius: 0.5rem;
  background: transparent;
  color: #52627a;
  font: inherit;
  font-size: 1.3rem;
  cursor: pointer;

  &:hover {
    background: #f1f5f3;
    color: #0d7755;
  }
`

const ExpandChevron = styled.span`
  display: inline-block;
  transform: rotate(${({ $expanded }) => ($expanded ? '180deg' : '0deg')});
  transition: transform 0.18s ease;
`

const TableFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 5.2rem;
  padding: 0.8rem 1.5rem;
  color: #8792a1;
  font-size: 1.3rem;
  direction: ltr;

  @media (max-width: 480px) {
    align-items: center;
    flex-wrap: wrap;
    direction: ltr;

    & > span {
      margin-left: auto;
      text-align: right;
    }
  }
`

const Pagination = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.45rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    justify-content: flex-start;
    flex: 1 1 100%;
    gap: 0.3rem;
  }
`

const PageButton = styled.button`
  display: inline-flex;
  min-width: 3.6rem;
  min-height: 3.6rem;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 0.85rem;
  border: 1px solid ${({ $active }) => ($active ? '#168054' : '#dce4e9')};
  border-radius: 0.65rem;
  background: ${({ $active }) => ($active ? '#168054' : '#fff')};
  color: ${({ $active, disabled }) => ($active ? '#fff' : disabled ? '#a7b0ba' : '#526078')};
  font: inherit;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover:not(:disabled):not([aria-current='page']) {
    border-color: #168054;
    color: #0d7755;
  }

  &:focus-visible {
    outline: 3px solid rgba(26, 172, 131, 0.28);
    outline-offset: 2px;
  }

  &:disabled {
    background: #f6f8f9;
  }
`

const PageEllipsis = styled.span`
  display: inline-flex;
  min-width: 2.4rem;
  min-height: 3.6rem;
  align-items: center;
  justify-content: center;
  color: #7c8796;
  font-size: 1.3rem;
`

const LoadingState = styled.div`
  padding: 4rem 1.5rem;
  color: #596176;
  text-align: center;
  font-size: 1.5rem;
`

const LoadError = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.2rem;
  padding: 1.5rem;
  border: 1px solid rgba(185, 28, 28, 0.2);
  border-radius: 1rem;
  background: #fff7f7;
  color: #991b1b;
  font-size: 1.4rem;

  @media (max-width: 560px) {
    align-items: flex-start;
    flex-direction: column;
  }
`

export default SanctionedVessels
