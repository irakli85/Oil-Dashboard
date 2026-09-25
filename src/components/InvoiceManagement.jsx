import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  createClearance,
  createInvoice,
  createVessel,
  deleteClearance,
  deleteInvoice,
  fetchVessels,
} from '../services/invoiceApi'

const Page = styled.div`
  --invoice-green: #087b58;
  --invoice-green-dark: #075f46;
  --invoice-ink: #192b32;
  --invoice-muted: #728188;
  color: var(--invoice-ink);
  font-size: 1.6rem;
  line-height: 1.5;

  * {
    box-sizing: border-box;
    font-size: unset;
  }
  button, input { font-family: inherit; }

  @media (max-width: 768px) {
    button, input, p, small, label, th, td, span {
      font-size: max(1.6rem, 14px) !important;
    }
  }
`

const Banner = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;
  padding: 2.2rem 2.6rem;
  color: white;
  background: linear-gradient(112deg, #075f46, #0b8960 70%, #2a9a70);
  border-radius: 1.2rem;
  margin-bottom: 2rem;

  @media (max-width: 650px) { align-items: flex-start; flex-direction: column; }
`

const BannerTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;
  h1 { margin: 0; font-size: 2.4rem; line-height: 1.3; }
  p { margin: .5rem 0 0; color: #e3f4ec; font-size: 1.4rem; line-height: 1.5; }
`

const BannerActions = styled.div`
  display: flex;
  gap: .8rem;
  flex-wrap: wrap;
`

const ShipMark = styled.span`
  display: grid;
  place-items: center;
  width: 5.2rem;
  height: 5.2rem;
  border-radius: .8rem;
  background: rgba(255,255,255,.14);
  font-size: 2.4rem;
`

const Button = styled.button`
  border: 0;
  border-radius: .6rem;
  min-height: 4rem;
  padding: .8rem 1.3rem;
  background: ${({ $tone }) => $tone === 'light' ? '#fff' : $tone === 'green' ? 'var(--invoice-green)' : $tone === 'danger' ? '#c63c3c' : '#edf1f1'};
  color: ${({ $tone }) => $tone === 'light' ? 'var(--invoice-green-dark)' : ['green', 'danger'].includes($tone) ? '#fff' : '#34464d'};
  font: inherit;
  font-size: 1.4rem;
  line-height: 1.35;
  font-weight: 700;
  cursor: pointer;
  transition: background .16s ease, transform .16s ease;
  &:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(.96); }
  &:disabled { opacity: .48; cursor: not-allowed; }
  &:focus-visible { outline: 3px solid #176b53; outline-offset: 3px; }
`

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  padding: 1.5rem;
  border: 1px solid #dce7e4;
  border-radius: .9rem;
  background: #fff;
  margin-bottom: 1.6rem;
  @media (max-width: 600px) { align-items: stretch; flex-direction: column; }
`

const Search = styled.input`
  width: min(100%, 36rem);
  min-height: 4.4rem;
  border: 1px solid #d8e1df;
  border-radius: .6rem;
  padding: .9rem 1.2rem;
  color: var(--invoice-ink);
  background: #f8faf9;
  font: inherit;
  outline: none;
  &:focus { border-color: var(--invoice-green); box-shadow: 0 0 0 3px #087b581c; }
  &::placeholder { color: #75858a; opacity: 1; }
`

const Count = styled.p`
  margin: 0;
  color: var(--invoice-muted);
  white-space: nowrap;
  strong { color: var(--invoice-green); }
`

const VesselGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 30rem), 1fr));
  gap: 1.2rem;
`

const VesselCard = styled.button`
  width: 100%;
  padding: 1.6rem;
  border: 1px solid #dce7e4;
  border-radius: .8rem;
  background: #fff;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color .15s ease, box-shadow .15s ease, transform .15s ease;
  &:hover { transform: translateY(-2px); border-color: #86b9a7; box-shadow: 0 8px 24px #1c57421a; }
  &:focus-visible { outline: 3px solid var(--invoice-green); outline-offset: 3px; }
`

const CardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #edf1ef;
  h2 { margin: 0 0 .5rem; font-size: 1.8rem; line-height: 1.35; overflow-wrap: anywhere; }
  p { margin: 0; color: #5f7076; font-size: 1.4rem; line-height: 1.45; }
`

const Tag = styled.span`
  padding: .55rem .8rem;
  border-radius: .5rem;
  background: #e9f4ef;
  color: #116b50;
  font-size: 1.35rem;
  line-height: 1.4;
  font-weight: 700;
  max-width: 45%;
  overflow-wrap: anywhere;
`

const MetricList = styled.div`
  display: grid;
  gap: .8rem;
  padding-top: 1.2rem;
`

const MetricLine = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--invoice-muted);
  font-size: 1.4rem;
  line-height: 1.45;
  span:last-child { color: ${({ $color }) => $color || 'var(--invoice-ink)'}; font-weight: 700; font-variant-numeric: tabular-nums; text-align: right; }
`

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  @media (max-width: 900px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 500px) { grid-template-columns: 1fr; }
`

const Stat = styled.div`
  min-width: 0;
  padding: 1.7rem;
  border: 1px solid #dce7e4;
  border-radius: .8rem;
  background: #fff;
  p { margin: 0 0 .8rem; color: #5f7076; font-size: 1.4rem; line-height: 1.4; }
  strong { display: block; overflow-wrap: anywhere; font-size: 2rem; line-height: 1.35; color: ${({ $color }) => $color || 'var(--invoice-ink)'}; font-variant-numeric: tabular-nums; }
  small { display: block; margin-top: .5rem; color: #5f7076; font-size: 1.3rem; line-height: 1.45; }
`

const Panel = styled.section`
  border: 1px solid #dce7e4;
  border-radius: .8rem;
  background: #fff;
  overflow: hidden;
`

const PanelHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  padding: 1.7rem;
  border-bottom: 1px solid #e8eeec;
  h2 { margin: 0 0 .5rem; font-size: 1.9rem; line-height: 1.35; }
  p { margin: 0; color: #5f7076; font-size: 1.4rem; line-height: 1.5; }
  @media (max-width: 600px) { align-items: flex-start; flex-direction: column; }
`

const TableWrap = styled.div`overflow-x: auto;`

const Table = styled.table`
  width: 100%;
  min-width: 980px;
  border-collapse: collapse;
  text-align: left;
  font-size: 1.4rem;
  th, td { padding: 1.25rem 1rem; border-bottom: 1px solid #edf1ef; vertical-align: middle; line-height: 1.45; }
  th { background: #f6f9f7; color: #52636a; font-size: 1.3rem; font-weight: 700; white-space: nowrap; }
  tbody tr:hover { background: #f8fbf9; }
  tfoot td { background: #f6f9f7; font-weight: 700; }
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: .5rem;
  white-space: nowrap;
  ${Button} { min-height: 3.8rem; padding: .7rem .9rem; font-size: 1.3rem; }
`

const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: .6rem;
  min-width: 9rem;
  div { height: .7rem; flex: 1; overflow: hidden; border-radius: 1rem; background: #e9efec; }
  i { display: block; height: 100%; border-radius: inherit; background: var(--invoice-green); }
  span { color: #5f7076; font-size: 1.3rem; font-variant-numeric: tabular-nums; }
`

const Badge = styled.span`
  display: inline-block;
  padding: .5rem .75rem;
  border-radius: 2rem;
  background: ${({ $tone }) => $tone === 'done' ? '#dff2e8' : $tone === 'partial' ? '#fff1d6' : '#edf1f1'};
  color: ${({ $tone }) => $tone === 'done' ? '#146344' : $tone === 'partial' ? '#8c5d00' : '#56666b'};
  white-space: nowrap;
  font-size: 1.3rem;
  font-weight: 700;
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  overflow-y: auto;
  padding: 1.6rem;
  background: #13231f88;
  backdrop-filter: blur(3px);
`

const Dialog = styled.div`
  width: min(100%, ${({ $wide }) => $wide ? '68rem' : '46rem'});
  max-height: calc(100vh - 3.2rem);
  overflow-y: auto;
  padding: 2rem;
  border: 1px solid #dce7e4;
  border-radius: .9rem;
  background: #fff;
  box-shadow: 0 20px 65px #10231d40;
  h2 { margin: 0 0 .6rem; font-size: 2rem; line-height: 1.35; }
  > p { margin: 0 0 1.8rem; color: #5f7076; font-size: 1.4rem; line-height: 1.5; }
`

const Form = styled.form`
  display: grid;
  gap: 1.2rem;
  label { display: grid; gap: .65rem; color: #30434a; font-weight: 700; font-size: 1.4rem; line-height: 1.4; }
  input { width: 100%; min-width: 0; min-height: 4.4rem; padding: .95rem 1.1rem; border: 1px solid #cbd8d4; border-radius: .55rem; background: #f8faf9; color: var(--invoice-ink); font: inherit; }
  input:focus { outline: 2px solid #087b5840; border-color: var(--invoice-green); }
`

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: .8rem;
  padding-top: 1.2rem;
  border-top: 1px solid #e8eeec;
  margin-top: .4rem;
`

const Message = styled.p`
  margin: 0;
  padding: .9rem 1rem;
  border-radius: .55rem;
  background: ${({ $error }) => $error ? '#fff0ee' : '#eef6f2'};
  color: ${({ $error }) => $error ? '#a52e26' : '#315b49'};
  font-size: 1.4rem;
  line-height: 1.5;
`

const Empty = styled.div`
  padding: 4rem 1.5rem;
  text-align: center;
  color: var(--invoice-muted);
  font-size: 1.4rem;
  line-height: 1.5;
`

const today = () => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const number = (value) => Number(value || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })
const sumInvoices = (vessel) => vessel.invoices.reduce((sum, invoice) => sum + invoice.totalQty, 0)
const sumClearances = (invoice) => invoice.clearances.reduce((sum, clearance) => sum + clearance.qty, 0)

const InvoiceManagement = () => {
  const [vessels, setVessels] = useState([])
  const [selectedVesselId, setSelectedVesselId] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [modal, setModal] = useState(null)
  const [formError, setFormError] = useState('')

  const loadVessels = async () => {
    setLoadError('')
    try {
      setVessels(await fetchVessels())
    } catch (error) {
      setLoadError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadVessels() }, [])

  const selectedVessel = vessels.find((vessel) => vessel.id === selectedVesselId)
  const openModal = (type, invoiceId) => {
    setFormError('')
    setModal({ type, invoiceId })
  }

  const submit = async (event) => {
    event.preventDefault()
    if (saving) return
    setSaving(true)
    setFormError('')
    const values = Object.fromEntries(new FormData(event.currentTarget).entries())
    try {
      if (modal.type === 'vessel') await createVessel(values)
      if (modal.type === 'invoice') await createInvoice(selectedVesselId, values)
      if (modal.type === 'clearance') await createClearance(modal.invoiceId, values)
      setModal(null)
      await loadVessels()
    } catch (error) {
      setFormError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const removeInvoice = async () => {
    if (saving) return
    setSaving(true)
    try {
      await deleteInvoice(modal.invoiceId)
      setModal(null)
      await loadVessels()
    } catch (error) {
      setFormError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const removeClearance = async (clearanceId) => {
    if (!window.confirm('ნამდვილად გსურთ ამ ჩამოწერის გაუქმება? ნაშთი ავტომატურად აღდგება.')) return
    try {
      await deleteClearance(clearanceId)
      await loadVessels()
    } catch (error) {
      setLoadError(error.message)
    }
  }

  const filteredVessels = vessels.filter((vessel) => vessel.name.toLowerCase().includes(search.trim().toLowerCase()))
  const selectedInvoice = selectedVessel?.invoices.find((invoice) => invoice.id === modal?.invoiceId)

  return (
    <Page>
      <Banner>
        <BannerTitle>
          <ShipMark aria-hidden="true">🚢</ShipMark>
          <div>
            <h1>ინვოისების მართვა</h1>
            <p>ტვირთების აღრიცხვა და ინვოისების განაშთვა</p>
          </div>
        </BannerTitle>
        <BannerActions>
          {selectedVessel && <Button $tone="light" onClick={() => setSelectedVesselId(null)}>← გემების სია</Button>}
          {!selectedVessel && <Button $tone="light" onClick={() => openModal('vessel')}>+ ახალი გემი</Button>}
        </BannerActions>
      </Banner>

      {loadError && <Message $error>{loadError}</Message>}

      {!selectedVessel ? (
        <>
          <Toolbar>
            <Search value={search} onChange={(event) => setSearch(event.target.value)} placeholder="გემის სახელით ძიება..." aria-label="გემის სახელით ძიება" />
            <Count>ნაპოვნია: <strong>{filteredVessels.length}</strong> გემი</Count>
          </Toolbar>
          {loading ? <Empty>მონაცემები იტვირთება...</Empty> : filteredVessels.length === 0 ? (
            <Empty>{loadError ? 'მონაცემები ვერ ჩაიტვირთა' : vessels.length ? 'გემები არ მოიძებნა' : 'გემები ჯერ არ არის დამატებული'}</Empty>
          ) : (
            <VesselGrid>
              {filteredVessels.map((vessel) => {
                const invoiced = sumInvoices(vessel)
                return (
                  <VesselCard key={vessel.id} onClick={() => setSelectedVesselId(vessel.id)}>
                    <CardHead>
                      <div><h2>{vessel.name}</h2><p>რეგისტრაცია: {vessel.date}</p></div>
                      <Tag>{vessel.goods}</Tag>
                    </CardHead>
                    <MetricList>
                      <MetricLine><span>სრული ტვირთი</span><span>{number(vessel.totalQty)} კგ</span></MetricLine>
                      <MetricLine $color="#2167a5"><span>გაწერილი ინვოისები</span><span>{number(invoiced)} კგ</span></MetricLine>
                      <MetricLine $color="#087b58"><span>თავისუფალი ნაშთი</span><span>{number(vessel.totalQty - invoiced)} კგ</span></MetricLine>
                    </MetricList>
                  </VesselCard>
                )
              })}
            </VesselGrid>
          )}
        </>
      ) : (
        <>
          {(() => {
            const invoiced = sumInvoices(selectedVessel)
            const cleared = selectedVessel.invoices.reduce((sum, invoice) => sum + sumClearances(invoice), 0)
            return (
              <StatGrid>
                <Stat><p>გემის დასახელება</p><strong>{selectedVessel.name}</strong><small>რეგ. თარიღი: {selectedVessel.date}</small></Stat>
                <Stat><p>სრული ტვირთი</p><strong>{number(selectedVessel.totalQty)} კგ</strong><small>{selectedVessel.goods}</small></Stat>
                <Stat $color="#2167a5"><p>გაწერილი ინვოისები</p><strong>{number(invoiced)} კგ</strong><small>ინვოისების ჯამი</small></Stat>
                <Stat $color="#087b58"><p>დარჩენილი ტვირთი</p><strong>{number(selectedVessel.totalQty - invoiced)} კგ</strong><small>განაშთულია {number(cleared)} კგ</small></Stat>
              </StatGrid>
            )
          })()}
          <Panel>
            <PanelHead>
              <div><h2>გემის ინვოისები</h2><p>ინვოისები, საბაჟო დოკუმენტები და განაშთვის სტატუსები</p></div>
              <Button $tone="green" disabled={selectedVessel.totalQty <= sumInvoices(selectedVessel)} onClick={() => openModal('invoice')}>+ ინვოისის დამატება</Button>
            </PanelHead>
            <TableWrap>
              <Table>
                <thead><tr><th>№</th><th>ინვოისის №</th><th>თარიღი</th><th>სრული რაოდენობა</th><th>განაშთული</th><th>დარჩენილი</th><th>პროგრესი</th><th>სტატუსი</th><th>მოქმედება</th></tr></thead>
                <tbody>
                  {selectedVessel.invoices.length === 0 ? <tr><td colSpan="9"><Empty>ინვოისები ჯერ არ არის დამატებული</Empty></td></tr> : selectedVessel.invoices.map((invoice, index) => {
                    const cleared = sumClearances(invoice)
                    const remaining = invoice.totalQty - cleared
                    const progress = Math.min(100, Math.round((cleared / invoice.totalQty) * 100))
                    const status = cleared === 0 ? ['გაუნაშთავი', ''] : remaining <= 0 ? ['სრულად განაშთული', 'done'] : ['ნაწილობრივ', 'partial']
                    return <tr key={invoice.id}>
                      <td>{index + 1}</td><td><strong>{invoice.num}</strong></td><td>{invoice.date}</td>
                      <td>{number(invoice.totalQty)} კგ</td><td style={{ color: '#087b58' }}>{number(cleared)} კგ</td><td style={{ color: '#9b6500' }}>{number(remaining)} კგ</td>
                      <td><Progress><div><i style={{ width: `${progress}%` }} /></div><span>{progress}%</span></Progress></td>
                      <td><Badge $tone={status[1]}>{status[0]}</Badge></td>
                      <td><Actions>
                        <Button $tone="green" disabled={remaining <= 0} onClick={() => openModal('clearance', invoice.id)}>განაშთვა</Button>
                        <Button onClick={() => openModal('history', invoice.id)}>დოკუმენტები ({invoice.clearances.length})</Button>
                        <Button $tone="danger" title="ინვოისის წაშლა" aria-label={`${invoice.num}-ის წაშლა`} onClick={() => openModal('delete', invoice.id)}>წაშლა</Button>
                      </Actions></td>
                    </tr>
                  })}
                </tbody>
                {selectedVessel.invoices.length > 0 && <tfoot><tr>
                  <td colSpan="3" style={{ textAlign: 'right' }}>სულ ჯამი:</td>
                  <td>{number(sumInvoices(selectedVessel))} კგ</td>
                  <td>{number(selectedVessel.invoices.reduce((sum, invoice) => sum + sumClearances(invoice), 0))} კგ</td>
                  <td>{number(selectedVessel.invoices.reduce((sum, invoice) => sum + invoice.totalQty - sumClearances(invoice), 0))} კგ</td>
                  <td colSpan="3" />
                </tr></tfoot>}
              </Table>
            </TableWrap>
          </Panel>
        </>
      )}

      {modal && modal.type !== 'history' && modal.type !== 'delete' && (
        <Overlay onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) setModal(null) }}>
          <Dialog role="dialog" aria-modal="true" aria-labelledby="invoice-dialog-title">
            <h2 id="invoice-dialog-title">{modal.type === 'vessel' ? 'ახალი გემის რეგისტრაცია' : modal.type === 'invoice' ? 'ინვოისის დამატება' : 'ინვოისის განაშთვა'}</h2>
            <p>{modal.type === 'vessel' ? 'შეიყვანეთ გემის და ტვირთის მონაცემები' : modal.type === 'invoice' ? `არჩეული გემი: ${selectedVessel?.name}` : `ინვოისი № ${selectedInvoice?.num}. დარჩენილი: ${number((selectedInvoice?.totalQty || 0) - sumClearances(selectedInvoice || { clearances: [] }))} კგ`}</p>
            <Form onSubmit={submit}>
              {modal.type === 'vessel' && <>
                <label>გემის სახელი *<input name="name" required placeholder="M/V MAERSK BATUMI" /></label>
                <label>თარიღი *<input name="date" type="date" required defaultValue={today()} /></label>
                <label>საქონლის დასახელება *<input name="goods" required placeholder="დიზელის საწვავი" /></label>
                <label>ტვირთის სრული რაოდენობა (კგ) *<input name="totalQty" type="number" min="0.01" step="0.01" required placeholder="0.00" /></label>
              </>}
              {modal.type === 'invoice' && <>
                <label>ინვოისის ნომერი *<input name="num" required placeholder="INV-2026-001" /></label>
                <label>თარიღი *<input name="date" type="date" required defaultValue={today()} /></label>
                <label>რაოდენობა (კგ) *<input name="totalQty" type="number" min="0.01" step="0.01" required placeholder="0.00" /></label>
              </>}
              {modal.type === 'clearance' && <>
                <label>საბაჟო დოკუმენტი (დეკლარაციის №) *<input name="doc" required placeholder="მაგ: 10293/0" /></label>
                <label>ჩამოსაწერი რაოდენობა (კგ) *<input name="qty" type="number" min="0.01" step="0.01" max={(selectedInvoice?.totalQty || 0) - sumClearances(selectedInvoice || { clearances: [] })} required placeholder="0.00" /></label>
              </>}
              {formError && <Message $error>{formError}</Message>}
              <FormActions><Button type="button" disabled={saving} onClick={() => setModal(null)}>გაუქმება</Button><Button type="submit" $tone="green" disabled={saving}>{saving ? 'ინახება...' : modal.type === 'clearance' ? 'ჩამოწერა' : 'შენახვა'}</Button></FormActions>
            </Form>
          </Dialog>
        </Overlay>
      )}

      {modal?.type === 'history' && selectedInvoice && (
        <Overlay onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null) }}>
          <Dialog $wide role="dialog" aria-modal="true" aria-labelledby="invoice-history-title">
            <h2 id="invoice-history-title">ჩამოწერების ისტორია</h2><p>ინვოისი № {selectedInvoice.num}</p>
            <TableWrap><Table style={{ minWidth: '54rem' }}><thead><tr><th>თარიღი/დრო</th><th>საბაჟო დოკუმენტი</th><th>რაოდენობა</th><th>მოქმედება</th></tr></thead>
              <tbody>{selectedInvoice.clearances.length === 0 ? <tr><td colSpan="4"><Empty>ჩამოწერები არ მოიძებნა</Empty></td></tr> : selectedInvoice.clearances.map((clearance) => <tr key={clearance.id}>
                <td>{new Date(clearance.timestamp).toLocaleString('ka-GE')}</td><td><strong>{clearance.doc}</strong></td><td>{number(clearance.qty)} კგ</td><td><Button $tone="danger" onClick={() => removeClearance(clearance.id)}>გაუქმება</Button></td>
              </tr>)}</tbody></Table></TableWrap>
            <FormActions><Button onClick={() => setModal(null)}>დახურვა</Button></FormActions>
          </Dialog>
        </Overlay>
      )}

      {modal?.type === 'delete' && selectedInvoice && (
        <Overlay onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) setModal(null) }}>
          <Dialog role="alertdialog" aria-modal="true" aria-labelledby="invoice-delete-title">
            <h2 id="invoice-delete-title">ინვოისის წაშლა</h2>
            <p>ნამდვილად გსურთ {selectedInvoice.num}-ის წაშლა? მასთან დაკავშირებული საბაჟო ჩამოწერებიც წაიშლება.</p>
            {formError && <Message $error>{formError}</Message>}
            <FormActions><Button disabled={saving} onClick={() => setModal(null)}>გაუქმება</Button><Button $tone="danger" disabled={saving} onClick={removeInvoice}>{saving ? 'იშლება...' : 'წაშლა'}</Button></FormActions>
          </Dialog>
        </Overlay>
      )}
    </Page>
  )
}

export default InvoiceManagement