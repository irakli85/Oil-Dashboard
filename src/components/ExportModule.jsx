import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as XLSX from 'xlsx'
import { Container, Hr, H2 } from './Measurment'
import {
  fetchExportItems,
  createExportItem,
  updateExportItem,
  fetchExportOptions,
  addExportOption,
  removeExportOption
} from '../services/exportApi'

const ACTIVE_COLUMNS = [
  { key: 'num', label: '№', width: 60 },
  { key: 'exporter', label: '1. ექსპორტიორი', width: 190 },
  { key: 'declarant', label: '2. დეკლარანტი', width: 190 },
  { key: 'goods', label: '3. საქონლის დასახელება', width: 180 },
  { key: 'code', label: '4. C-ნომერი', width: 130 },
  { key: 'regDate', label: '5. რეგ. თარიღი', width: 130 },
  { key: 'declarationNum', label: '6. დეკლარაცია №', width: 140 },
  { key: 'days', label: '7. ვადა (დღე)', width: 110 },
  { key: 'expDate', label: '8. ვადის გასვლა', width: 140 },
  { key: 'weight', label: '9. წონა ნეტო (კგ)', width: 140 },
  { key: 'status', label: 'სტატუსი', width: 140 },
  { key: 'note', label: '10. შენიშვნა', width: 230 }
]

const ARCHIVED_COLUMNS = [
  { key: 'num', label: '№', width: 60 },
  { key: 'exporter', label: '1. ექსპორტიორი', width: 180 },
  { key: 'declarant', label: '2. დეკლარანტი', width: 180 },
  { key: 'goods', label: '3. საქონლის დასახელება', width: 170 },
  { key: 'code', label: '4. C-ნომერი', width: 120 },
  { key: 'regDate', label: '5. რეგ. თარიღი', width: 120 },
  { key: 'declarationNum', label: '6. დეკლარაცია №', width: 130 },
  { key: 'expDate', label: '8. ვადის გასვლა', width: 130 },
  { key: 'weight', label: '9. წონა (კგ)', width: 120 },
  { key: 'shipName', label: '🚢 გემის სახელი', width: 170 },
  { key: 'departureDate', label: '📅 გასვლის თარიღი', width: 140 },
  { key: 'status', label: 'სტატუსი', width: 140 },
  { key: 'note', label: '10. შენიშვნა', width: 200 }
]

const EMPTY_FORM = {
  exporter: '',
  declarant: '',
  goods: '',
  code: '',
  regDate: '',
  declarationNum: '',
  days: '',
  expDate: '',
  weight: '',
  note: ''
}

const calculateExpiry = (regDate, days) => {
  const parsed = parseInt(days, 10)
  if (!regDate || isNaN(parsed) || parsed < 0) return ''
  const date = new Date(regDate)
  date.setDate(date.getDate() + parsed)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const ExportModule = ({ tab = 'active' }) => {
  const [currentTab, setCurrentTab] = useState(tab)
  const [items, setItems] = useState([])
  const [dropdowns, setDropdowns] = useState({ exporters: [], declarants: [], goods: [] })
  const [widths, setWidths] = useState(() => ACTIVE_COLUMNS.map((col) => col.width))
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pendingItemId, setPendingItemId] = useState(null)
  const [shipName, setShipName] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [form, setForm] = useState(EMPTY_FORM)
  const [newOptions, setNewOptions] = useState({ exporters: '', declarants: '', goods: '' })

  const loadData = async () => {
    setIsLoading(true)
    setLoadError('')
    try {
      const [itemsData, optionsData] = await Promise.all([
        fetchExportItems(),
        fetchExportOptions()
      ])
      setItems(itemsData)
      setDropdowns(optionsData)
    } catch {
      setLoadError('მონაცემების ჩატვირთვა ვერ მოხერხდა. შეამოწმეთ, რომ სერვერი გაშვებულია (npm run dev).')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    setCurrentTab(tab)
    setWidths((tab === 'archived' ? ARCHIVED_COLUMNS : ACTIVE_COLUMNS).map((col) => col.width))
  }, [tab])

  const columns = currentTab === 'archived' ? ARCHIVED_COLUMNS : ACTIVE_COLUMNS
  const filteredItems = items.filter((item) =>
    currentTab === 'archived' ? item.status === 'archived' : item.status === 'active'
  )

  const startResize = (event, index) => {
    event.preventDefault()
    const startX = event.clientX
    const startWidth = widths[index]

    const onMouseMove = (moveEvent) => {
      const nextWidth = Math.max(50, startWidth + (moveEvent.clientX - startX))
      setWidths((prev) => prev.map((width, i) => (i === index ? nextWidth : width)))
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const openModal = () => {
    setForm({
      ...EMPTY_FORM,
      exporter: dropdowns.exporters[0] || '',
      declarant: dropdowns.declarants[0] || '',
      goods: dropdowns.goods[0] || ''
    })
    setIsModalOpen(true)
  }

  const updateForm = (key, value) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'regDate' || key === 'days') {
        next.expDate = calculateExpiry(
          key === 'regDate' ? value : prev.regDate,
          key === 'days' ? value : prev.days
        )
      }
      return next
    })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    if (isSaving) return
    setIsSaving(true)
    try {
      const created = await createExportItem({
        exporter: form.exporter,
        declarant: form.declarant,
        goods: form.goods,
        code: form.code || 'C-000000',
        regDate: form.regDate || '-',
        declarationNum: form.declarationNum || '-',
        days: form.days || 0,
        expDate: form.expDate || '-',
        weight: form.weight || '0.00',
        status: 'active',
        shipName: '',
        departureDate: '',
        note: form.note || '-'
      })
      setItems((prev) => [...prev, created])
      setIsModalOpen(false)
    } catch (error) {
      alert(error?.serverMessage || 'შენახვა ვერ მოხერხდა')
    } finally {
      setIsSaving(false)
    }
  }

  const changeStatus = async (id, newStatus) => {
    if (newStatus === 'archived') {
      setPendingItemId(id)
      setShipName('')
      setDepartureDate(new Date().toISOString().split('T')[0])
      return
    }
    try {
      const updated = await updateExportItem(id, { status: 'active' })
      setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
    } catch (error) {
      alert(error?.serverMessage || 'სტატუსის შეცვლა ვერ მოხერხდა')
    }
  }

  const handleShipSubmit = async (event) => {
    event.preventDefault()
    if (isSaving) return
    const latinRegex = /^[A-Za-z0-9\s\-.]+$/
    if (!latinRegex.test(shipName.trim())) {
      alert('გემის სახელი უნდა შეიცავდეს მხოლოდ ლათინურ ასოებს!')
      return
    }
    setIsSaving(true)
    try {
      const updated = await updateExportItem(pendingItemId, {
        status: 'archived',
        shipName: shipName.trim().toUpperCase(),
        departureDate
      })
      setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
      setPendingItemId(null)
    } catch (error) {
      alert(error?.serverMessage || 'შენახვა ვერ მოხერხდა')
    } finally {
      setIsSaving(false)
    }
  }

  const exportToExcel = () => {
    if (filteredItems.length === 0) {
      alert('ჩამოტვირთვისთვის მონაცემები არ არის!')
      return
    }

    const rows = filteredItems.map((item, index) => {
      const base = {
        '№': index + 1,
        'ექსპორტიორი': item.exporter,
        'დეკლარანტი': item.declarant,
        'საქონლის დასახელება': item.goods,
        'C-ნომერი': item.code,
        'რეგისტრაციის თარიღი': item.regDate,
        'დეკლარაცია №': item.declarationNum,
        'ვადის გასვლის თარიღი': item.expDate,
        'წონა ნეტო (კგ)': item.weight
      }
      if (currentTab === 'active') {
        return { ...base, 'სტატუსი': 'აქტიური', 'შენიშვნა': item.note }
      }
      return {
        ...base,
        'გემის სახელი': item.shipName,
        'გასვლის თარიღი': item.departureDate,
        'სტატუსი': 'გასული',
        'შენიშვნა': item.note
      }
    })

    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ექსპორტის მონაცემები')
    XLSX.writeFile(workbook, currentTab === 'active' ? 'migdinare_eksporti.xlsx' : 'gasuli_eksporti.xlsx')
  }

  const addDropdownOption = async (category) => {
    const value = newOptions[category].trim()
    if (!value) return
    try {
      const list = await addExportOption(category, value)
      setDropdowns((prev) => ({ ...prev, [category]: list }))
      setNewOptions((prev) => ({ ...prev, [category]: '' }))
    } catch (error) {
      alert(error?.serverMessage || 'დამატება ვერ მოხერხდა')
    }
  }

  const removeDropdownOption = async (category, value) => {
    try {
      const list = await removeExportOption(category, value)
      setDropdowns((prev) => ({ ...prev, [category]: list }))
    } catch (error) {
      alert(error?.serverMessage || 'წაშლა ვერ მოხერხდა')
    }
  }

  const renderCell = (item, column, index) => {
    if (column.key === 'num') return index + 1
    if (column.key === 'status') {
      return (
        <StatusSelect
          $active={item.status === 'active'}
          value={item.status}
          onChange={(event) => changeStatus(item.id, event.target.value)}
        >
          <option value='active'>🟢 აქტიური</option>
          <option value='archived'>⚪ გასული</option>
        </StatusSelect>
      )
    }
    return item[column.key] || '-'
  }

  const settingsCards = [
    { category: 'exporters', title: '1. ექსპორტიორი', placeholder: 'ახალი ექსპორტიორი' },
    { category: 'declarants', title: '2. დეკლარანტი', placeholder: 'ახალი დეკლარანტი' },
    { category: 'goods', title: '3. საქონლის დასახელება', placeholder: 'ახალი საქონელი' }
  ]

  return (
    <Container>
      <HeaderBar>
        <HeaderContent>
          <HeaderIcon>📦</HeaderIcon>
          <div>
            <H2st>{currentTab === 'archived' ? 'გასული ექსპორტი' : currentTab === 'settings' ? 'ინფორმაციის დამატება' : 'მიმდინარე ექსპორტი'}</H2st>
            <HeaderSub>საექსპორტო განაცხადები, დასაწყობების ვადები</HeaderSub>
          </div>
        </HeaderContent>
        <HeaderActions>
          {currentTab !== 'settings' && (
            <GhostButton type='button' onClick={exportToExcel}>📥 Excel-ში ჩამოტვირთვა</GhostButton>
          )}
          {currentTab === 'active' && (
            <SolidButton type='button' onClick={openModal}>+ დამატება</SolidButton>
          )}
        </HeaderActions>
      </HeaderBar>
      <Hr />

      {loadError && <ErrorBanner>{loadError}</ErrorBanner>}

      {currentTab !== 'settings' ? (
        <TableWrapper>
          <ExportTable>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <ThX key={column.key} style={{ width: widths[index] }}>
                    {column.label}
                    <Resizer onMouseDown={(event) => startResize(event, index)} />
                  </ThX>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <TdX colSpan={columns.length} $empty>იტვირთება...</TdX>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <TdX colSpan={columns.length} $empty>ჩანაწერები არ არის</TdX>
                </tr>
              ) : (
                filteredItems.map((item, index) => (
                  <TrX key={item.id}>
                    {columns.map((column) => (
                      <TdX key={column.key} $highlight={column.key === 'shipName' || column.key === 'departureDate'}>
                        {renderCell(item, column, index)}
                      </TdX>
                    ))}
                  </TrX>
                ))
              )}
            </tbody>
          </ExportTable>
        </TableWrapper>
      ) : (
        <SettingsGrid>
          {settingsCards.map((card) => (
            <SettingsCard key={card.category}>
              <SettingsTitle>{card.title}</SettingsTitle>
              <SettingsInputRow>
                <SettingsInput
                  type='text'
                  value={newOptions[card.category]}
                  placeholder={card.placeholder}
                  onChange={(event) =>
                    setNewOptions((prev) => ({ ...prev, [card.category]: event.target.value }))
                  }
                />
                <AddButton type='button' onClick={() => addDropdownOption(card.category)}>+</AddButton>
              </SettingsInputRow>
              <SettingsList>
                {dropdowns[card.category].length === 0 ? (
                  <EmptyListItem>სია ცარიელია</EmptyListItem>
                ) : (
                  dropdowns[card.category].map((option, index) => (
                    <SettingsListItem key={`${option}-${index}`}>
                      <span>• {option}</span>
                      <DeleteButton
                        type='button'
                        title='წაშლა'
                        onClick={() => removeDropdownOption(card.category, option)}
                      >
                        ✕
                      </DeleteButton>
                    </SettingsListItem>
                  ))
                )}
              </SettingsList>
            </SettingsCard>
          ))}
        </SettingsGrid>
      )}

      {isModalOpen && (
        <Overlay>
          <ModalCard>
            <ModalTitle>ექსპორტი</ModalTitle>
            <ModalSub>ახალი საექსპორტო განაცხადის შექმნა</ModalSub>
            <ModalForm onSubmit={handleFormSubmit}>
              <Field>
                <FieldLabel>1. ექსპორტიორი <Required>*</Required></FieldLabel>
                <Select
                  required
                  value={form.exporter}
                  onChange={(event) => updateForm('exporter', event.target.value)}
                >
                  {dropdowns.exporters.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Select>
              </Field>
              <Field>
                <FieldLabel>2. დეკლარანტი <Required>*</Required></FieldLabel>
                <Select
                  required
                  value={form.declarant}
                  onChange={(event) => updateForm('declarant', event.target.value)}
                >
                  {dropdowns.declarants.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Select>
              </Field>
              <Field>
                <FieldLabel>3. საქონლის დასახელება</FieldLabel>
                <Select
                  value={form.goods}
                  onChange={(event) => updateForm('goods', event.target.value)}
                >
                  {dropdowns.goods.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Select>
              </Field>
              <Field>
                <FieldLabel>4. განაცხადის C ნომერი</FieldLabel>
                <TextInput
                  type='text'
                  placeholder='C-XXXXXX'
                  value={form.code}
                  onChange={(event) => updateForm('code', event.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel>5. რეგისტრაციის თარიღი</FieldLabel>
                <TextInput
                  type='date'
                  value={form.regDate}
                  onChange={(event) => updateForm('regDate', event.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel>6. ექსპორტის დეკლარაცია (№)</FieldLabel>
                <TextInput
                  type='number'
                  placeholder='10293847'
                  value={form.declarationNum}
                  onChange={(event) => updateForm('declarationNum', event.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel>7. დასაწყობების ვადა (დღე)</FieldLabel>
                <TextInput
                  type='number'
                  placeholder='30'
                  value={form.days}
                  onChange={(event) => updateForm('days', event.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel>8. ვადის გასვლის თარიღი (ავტო)</FieldLabel>
                <TextInput type='date' value={form.expDate} readOnly $disabled />
              </Field>
              <Field>
                <FieldLabel>9. წონა ნეტო (კგ)</FieldLabel>
                <TextInput
                  type='number'
                  step='0.01'
                  placeholder='0.00'
                  value={form.weight}
                  onChange={(event) => updateForm('weight', event.target.value)}
                />
              </Field>
              <Field />
              <Field $full>
                <FieldLabel>10. შენიშვნა</FieldLabel>
                <TextArea
                  rows={3}
                  placeholder='დამატებითი კომენტარი ან ინფორმაცია...'
                  value={form.note}
                  onChange={(event) => updateForm('note', event.target.value)}
                />
              </Field>
              <FormActions $full>
                <CancelButton type='button' onClick={() => setIsModalOpen(false)}>გაუქმება</CancelButton>
                <SubmitButton type='submit' disabled={isSaving}>
                  {isSaving ? 'ინახება...' : 'შენახვა'}
                </SubmitButton>
              </FormActions>
            </ModalForm>
          </ModalCard>
        </Overlay>
      )}

      {pendingItemId !== null && (
        <Overlay>
          <ShipModalCard>
            <ModalTitle>🚢 გემის და გასვლის მონაცემები</ModalTitle>
            <ModalSub>შეიყვანეთ გემის დასახელება (ლათინურად) და გასვლის თარიღი</ModalSub>
            <form onSubmit={handleShipSubmit}>
              <Field>
                <FieldLabel>გემის სახელი (Latin letters only) <Required>*</Required></FieldLabel>
                <TextInput
                  type='text'
                  required
                  pattern='[A-Za-z0-9\s\-.]+'
                  title='გთხოვთ გამოიყენოთ მხოლოდ ლათინური ასოები'
                  placeholder='e.g. M/V MAERSK BATUMI'
                  value={shipName}
                  onChange={(event) => setShipName(event.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel>გასვლის თარიღი <Required>*</Required></FieldLabel>
                <TextInput
                  type='date'
                  required
                  value={departureDate}
                  onChange={(event) => setDepartureDate(event.target.value)}
                />
              </Field>
              <FormActions>
                <CancelButton type='button' onClick={() => setPendingItemId(null)}>გაუქმება</CancelButton>
                <SubmitButton type='submit' disabled={isSaving}>
                  {isSaving ? 'ინახება...' : 'დადასტურება'}
                </SubmitButton>
              </FormActions>
            </form>
          </ShipModalCard>
        </Overlay>
      )}
    </Container>
  )
}

const HeaderBar = styled.div`
  width: 100%;
  border-radius: 1.5rem;
  min-height: 16rem;
  background: linear-gradient(135deg, #1aac83 0%, #0c5d47 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 3rem;
  flex-wrap: wrap;
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`

const HeaderIcon = styled.div`
  font-size: 3.4rem;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 1.4rem;
  padding: 1.2rem 1.6rem;
`

const H2st = styled(H2)`
  color: #fff;
  font-size: 3rem;
  margin-top: 0;
  text-align: left;
`

const HeaderSub = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.4rem;
  margin-top: 0.6rem;
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
`

const GhostButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: 600;
  font-size: 1.4rem;
  padding: 1.1rem 1.8rem;
  border-radius: 1.2rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

const SolidButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: #fff;
  color: #064e3b;
  font-weight: 700;
  font-size: 1.4rem;
  padding: 1.1rem 1.8rem;
  border-radius: 1.2rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: background 0.2s ease;

  &:hover {
    background: #ecfdf5;
  }
`

const ErrorBanner = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding: 1.4rem 2rem;
  border-radius: 1.2rem;
  background: #fee2e2;
  border: 1px solid #fca5a5;
  color: #991b1b;
  font-size: 1.5rem;
  font-weight: 600;
`

const TableWrapper = styled.div`
  width: 100%;
  margin-top: 2.5rem;
  background: #fff;
  border: 1px solid rgba(26, 172, 131, 0.15);
  border-radius: 1.4rem;
  overflow-x: auto;
  box-shadow: 0 2px 10px rgba(21, 29, 72, 0.05);
`

const ExportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`

const ThX = styled.th`
  position: relative;
  font-size: 1.3rem;
  text-align: left;
  padding: 1.4rem 1.2rem;
  background: #f8fafc;
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`

const Resizer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 6px;
  cursor: col-resize;
  background: rgba(0, 0, 0, 0.05);

  &:hover {
    background: #1aac83;
  }
`

const TrX = styled.tr`
  &:hover {
    background: rgba(26, 172, 131, 0.04);
  }
`

const TdX = styled.td`
  font-size: 1.4rem;
  padding: 1.2rem;
  border-bottom: 1px solid #f1f5f9;
  border-right: 1px solid #f1f5f9;
  color: ${({ $empty }) => ($empty ? '#94a3b8' : '#334155')};
  text-align: ${({ $empty }) => ($empty ? 'center' : 'left')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: ${({ $highlight }) => ($highlight ? 'rgba(26, 172, 131, 0.05)' : 'transparent')};
`

const StatusSelect = styled.select`
  font-size: 1.3rem;
  padding: 0.5rem 0.8rem;
  border-radius: 0.8rem;
  border: 1px solid ${({ $active }) => ($active ? '#6ee7b7' : '#cbd5e1')};
  background: ${({ $active }) => ($active ? '#d1fae5' : '#e2e8f0')};
  color: ${({ $active }) => ($active ? '#065f46' : '#334155')};
  font-weight: 600;
  cursor: pointer;
  outline: none;
`

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 2rem;
  width: 100%;
  margin-top: 2.5rem;
`

const SettingsCard = styled.div`
  background: #fff;
  border: 1px solid rgba(26, 172, 131, 0.15);
  border-radius: 1.4rem;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(21, 29, 72, 0.05);
`

const SettingsTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: #151d48;
  margin-bottom: 1.4rem;
`

const SettingsInputRow = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.4rem;
`

const SettingsInput = styled.input`
  width: 100%;
  padding: 0.9rem 1.2rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.9rem;
  font-size: 1.4rem;
  outline: none;

  &:focus {
    border-color: #1aac83;
    box-shadow: 0 0 0 3px rgba(26, 172, 131, 0.12);
  }
`

const AddButton = styled.button`
  background: #1aac83;
  color: #fff;
  border: none;
  border-radius: 0.9rem;
  padding: 0.9rem 1.6rem;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #158a69;
  }
`

const SettingsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style: none;
  padding: 0;
`

const EmptyListItem = styled.li`
  color: #94a3b8;
  font-style: italic;
  font-size: 1.6rem;
`

const SettingsListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background: rgba(26, 172, 131, 0.06);
  border: 1px solid rgba(26, 172, 131, 0.12);
  border-radius: 1rem;
  padding: 1rem 1.4rem;
  font-size: 1.6rem;
  color: #334155;
`

const DeleteButton = styled.button`
  border: none;
  background: transparent;
  color: #ef4444;
  font-size: 1.4rem;
  cursor: pointer;
  border-radius: 0.6rem;
  padding: 0.4rem 0.8rem;

  &:hover {
    background: #ef4444;
    color: #fff;
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 1000;
`

const ModalCard = styled.div`
  background: #fff;
  border-radius: 1.6rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 86rem;
  max-height: 90vh;
  overflow-y: auto;
  padding: 3rem;
`

const ShipModalCard = styled(ModalCard)`
  max-width: 46rem;
`

const ModalTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 800;
  color: #0f172a;
`

const ModalSub = styled.p`
  font-size: 1.3rem;
  color: #64748b;
  margin-top: 0.4rem;
  margin-bottom: 2rem;
`

const ModalForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Field = styled.div`
  grid-column: ${({ $full }) => ($full ? '1 / -1' : 'auto')};
`

const FieldLabel = styled.label`
  display: block;
  font-size: 1.3rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.6rem;
`

const Required = styled.span`
  color: #ef4444;
`

const inputStyles = `
  width: 100%;
  padding: 1rem 1.2rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.9rem;
  font-size: 1.4rem;
  background: #f8fafc;
  color: #1e293b;
  outline: none;

  &:focus {
    background: #fff;
    border-color: #1aac83;
    box-shadow: 0 0 0 3px rgba(26, 172, 131, 0.12);
  }
`

const TextInput = styled.input`
  ${inputStyles}
  background: ${({ $disabled }) => ($disabled ? '#f1f5f9' : '#f8fafc')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'text')};
`

const Select = styled.select`
  ${inputStyles}
`

const TextArea = styled.textarea`
  ${inputStyles}
  resize: none;
`

const FormActions = styled.div`
  grid-column: ${({ $full }) => ($full ? '1 / -1' : 'auto')};
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.4rem;
`

const CancelButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: #475569;
  background: transparent;
  border: none;
  border-radius: 0.9rem;
  cursor: pointer;

  &:hover {
    background: #f1f5f9;
  }
`

const SubmitButton = styled.button`
  padding: 1rem 2.4rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
  background: #1aac83;
  border: none;
  border-radius: 0.9rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(26, 172, 131, 0.35);

  &:hover {
    background: #158a69;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export default ExportModule
