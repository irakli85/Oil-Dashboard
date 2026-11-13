import React, { useState } from 'react'
import styled from 'styled-components'
import CategoryHeader from './CategoryHeader'
import calculatorIcon from '../assets/calculator.svg'

const initialValues = {
  quantity: '',
  customsValue: '',
  exciseRate: '',
}

const formatNumber = (value) => value.toLocaleString('ka-GE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const formatCurrency = (value) => `${value.toLocaleString('ka-GE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})} ლარი`

const PenaltyCalculator = () => {
  const [values, setValues] = useState(initialValues)
  const quantity = Number(values.quantity)
  const customsValue = Number(values.customsValue)
  const exciseRate = Number(values.exciseRate)
  const hasExciseInputs = values.quantity !== '' && values.exciseRate !== ''
  const hasAllInputs = hasExciseInputs && values.customsValue !== ''
  const excise = quantity * exciseRate / 1000
  const vat = (customsValue + excise) * 0.18
  const total = excise + vat

  const updateValue = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  return (
    <Page>
      <CategoryHeader
        title='ჯარიმის კალკულატორი'
        description='შეიყვანეთ მონაცემები აქციზისა და დღგ-ის ჯამური თანხის გამოსათვლელად'
        icon={calculatorIcon}
      />

      <Card>
        <CardHeading>
          <CalculatorBadge aria-hidden='true'>
            <CalculatorIcon />
          </CalculatorBadge>
          <div>
            <CardTitle>საწყისი მონაცემები</CardTitle>
          </div>
        </CardHeading>

        <Fields>
          <Field>
            <Label htmlFor='penalty-quantity'>
              <span>საქონლის რაოდენობა</span>
              <Unit>კილოგრამი</Unit>
            </Label>
            <Input
              id='penalty-quantity'
              name='quantity'
              type='number'
              min='0'
              step='any'
              inputMode='decimal'
              placeholder='მაგ. 1000'
              value={values.quantity}
              onChange={updateValue}
            />
          </Field>
          <Field>
            <Label htmlFor='penalty-customs-value'>
              <span>საქონლის საბაჟო ღირებულება</span>
              <Unit>ლარი</Unit>
            </Label>
            <Input
              id='penalty-customs-value'
              name='customsValue'
              type='number'
              min='0'
              step='any'
              inputMode='decimal'
              placeholder='მაგ. 1000'
              value={values.customsValue}
              onChange={updateValue}
            />
          </Field>
          <Field>
            <Label htmlFor='penalty-excise-rate'>
              <span>აქციზის განაკვეთი</span>
              <Unit>ლარი / ტონა</Unit>
            </Label>
            <Input
              id='penalty-excise-rate'
              name='exciseRate'
              type='number'
              min='0'
              step='any'
              inputMode='decimal'
              placeholder='მაგ. 500'
              value={values.exciseRate}
              onChange={updateValue}
            />
          </Field>
        </Fields>
      </Card>

      <Card>
        <ResultsTitle>გამოთვლის შედეგები</ResultsTitle>
        <ResultList>
          <ResultRow>
            <Step>1</Step>
            <ResultDetails>
              <ResultLabel>აქციზის გადასახადი</ResultLabel>
              {hasExciseInputs && (
                <Formula>
                  {formatNumber(quantity)} კგ × ({formatCurrency(exciseRate)} / 1,000 კგ) = {formatCurrency(excise)}
                </Formula>
              )}
            </ResultDetails>
            <ResultAmount>{hasExciseInputs ? formatCurrency(excise) : '—'}</ResultAmount>
          </ResultRow>
          <ResultRow>
            <Step>2</Step>
            <ResultDetails>
              <ResultLabel>დღგ (18%)</ResultLabel>
              {hasAllInputs && (
                <Formula>
                  ({formatCurrency(customsValue)} + {formatCurrency(excise)}) × 18%
                </Formula>
              )}
            </ResultDetails>
            <ResultAmount>{hasAllInputs ? formatCurrency(vat) : '—'}</ResultAmount>
          </ResultRow>
          <ResultRow $total>
            <Step>3</Step>
            <ResultDetails>
              <ResultLabel>ჯარიმის თანხა</ResultLabel>
              {hasAllInputs && <Formula>{formatCurrency(excise)} + {formatCurrency(vat)}</Formula>}
            </ResultDetails>
            <ResultAmount $total>{hasAllInputs ? formatCurrency(total) : '—'}</ResultAmount>
          </ResultRow>
        </ResultList>
      </Card>
    </Page>
  )
}

const Page = styled.div`
  width: 100%;
  color: #273142;
`

const Card = styled.section`
  width: 100%;
  margin-top: 1.6rem;
  padding: 2.2rem;
  border: 1px solid #e1e4e3;
  border-radius: 1.2rem;
  background: #fff;

  @media (max-width: 560px) {
    padding: 1.6rem;
  }
`

const CardHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2rem;
`

const CalculatorBadge = styled.span`
  display: grid;
  width: 3.8rem;
  height: 3.8rem;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 0.8rem;
  background: #e8f4ef;
  color: #278568;
`

const CalculatorIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
    <rect x='5' y='3' width='14' height='18' rx='2' stroke='currentColor' strokeWidth='1.8' />
    <path d='M8 7h8M8 11h2m4 0h2m-8 4h2m4 0h2m-8 3h2m4 0h2' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
  </svg>
)

const CardTitle = styled.h2`
  color: #303b4b;
  font-size: 1.6rem;
  font-weight: 700;
`

const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`

const Field = styled.div`
  min-width: 0;
`

const Label = styled.label`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.8rem;
  margin-bottom: 0.6rem;
  color: #4a5564;
  font-size: 1.6rem;
  font-weight: 600;
`

const Unit = styled.span`
  flex-shrink: 0;
  color: #9098a2;
  font-size: 1rem;
  font-weight: 400;
`

const Input = styled.input`
  width: 100%;
  min-height: 4rem;
  padding: 0 1.2rem;
  border: 1px solid #dfe3e2;
  border-radius: 0.7rem;
  outline: none;
  background: #fff;
  color: #303b4b;
  font-size: 1.3rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus-visible {
    border-color: #278568;
    box-shadow: 0 0 0 3px rgba(39, 133, 104, 0.18);
  }
`

const ResultsTitle = styled.h2`
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #e8eae9;
  color: #303b4b;
  font-size: 1.7rem;
  font-weight: 700;
`

const ResultList = styled.div`
  width: 100%;
`

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  min-height: 7rem;
  padding: 1.2rem 0;
  border-bottom: 1px solid #e8eae9;

  &:last-child {
    border-bottom: 0;
  }

  @media (max-width: 560px) {
    flex-wrap: wrap;
  }
`

const Step = styled.span`
  display: grid;
  width: 2.6rem;
  height: 2.6rem;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 0.7rem;
  background: #e8f4ef;
  color: #278568;
  font-size: 1.2rem;
  font-weight: 700;
`

const ResultDetails = styled.div`
  min-width: 0;
  flex: 1;
`

const ResultLabel = styled.p`
  color: #4a5564;
  font-size: 1.3rem;
  font-weight: 600;
`

const Formula = styled.p`
  margin-top: 0.4rem;
  color: #89929d;
  font-size: 1.1rem;
  line-height: 1.5;
`

const ResultAmount = styled.p`
  flex: 0 0 auto;
  color: ${({ $total }) => ($total ? '#278568' : '#303b4b')};
  font-size: 1.4rem;
  font-weight: 700;

  @media (max-width: 560px) {
    margin-left: 3.8rem;
  }
`

export default PenaltyCalculator
