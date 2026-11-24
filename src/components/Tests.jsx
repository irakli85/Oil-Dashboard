import React, { useEffect, useMemo, useRef, useState } from 'react'
import quizData from '../data/quizData'
import testsIcon from '../assets/tests.svg'
import CategoryHeader from './CategoryHeader'
import './Tests.css'

const categories = [
  { id: 'all', label: 'ყველა' },
  { id: 'safety', label: 'შრომის უსაფრთხოება' },
  { id: 'privacy', label: 'პერსონალურ მონაცემთა დაცვა' },
  { id: 'infosec', label: 'ინფორმაციული უსაფრთხოება (RS)' },
]

function normalizeSearchText(text) {
  return String(text)
    .normalize('NFKC')
    .toLocaleLowerCase('ka-GE')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

function Tests() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [onlyCorrect, setOnlyCorrect] = useState(false)
  const searchRef = useRef(null)

  const filtered = useMemo(() => {
    const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean)
    return quizData.filter((item) => {
      if (category !== 'all' && item.category !== category) return false
      const words = normalizeSearchText(
        [item.question, ...(item.searchAliases || []), ...item.options].join(' ')
      ).split(/\s+/).filter(Boolean)
      return terms.every((term) => words.some((word) =>
        word === term ||
        (term.length >= 3 && word.startsWith(term)) ||
        (term.length >= 5 && word.includes(term))
      ))
    })
  }, [category, query])

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target
      const isEditing = target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      if ((event.key === '/' && !isEditing) ||
          ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
        event.preventDefault()
        searchRef.current?.focus()
        searchRef.current?.select()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const resetFilters = () => {
    setCategory('all')
    setQuery('')
  }

  return (
    <section className='tests-page' aria-labelledby='tests-title'>
      <div className='tests-page-heading'>
        <CategoryHeader
          title='ტესტების საძიებო ბაზა'
          titleId='tests-title'
          description='შრომის უსაფრთხოება • პერსონალურ მონაცემთა დაცვა • ინფორმაციული უსაფრთხოება (RS)'
          icon={testsIcon}
          action={(
            <button type='button' className='tests-print' onClick={() => window.print()}>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M17 17h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2m2 4h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Zm8-12V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4h10Z' />
              </svg>
              ბეჭდვა
            </button>
          )}
        />
      </div>
      <div className='tests-content'>
      <header className='tests-controls'>
        <div className='tests-search'>
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
            <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z' />
          </svg>
          <input ref={searchRef} type='search' value={query} onChange={(event) => setQuery(event.target.value)}
            aria-label='ძებნა კითხვის ან პასუხის მიხედვით' autoComplete='off'
            placeholder='ძებნა კითხვის ან პასუხის მიხედვით... (მაგ: ცეცხლმაქრი, ვიდეომონიტორინგი, ფიშინგი)' />
          {query && <button type='button' onClick={() => { setQuery(''); searchRef.current?.focus() }}>გასუფთავება</button>}
        </div>

        <div className='tests-categories' aria-label='კატეგორიები'>
          {categories.map((item) => (
            <button type='button' key={item.id} aria-pressed={category === item.id}
              className={`tests-badge-${item.id}${category === item.id ? ' tests-category-selected' : ''}`}
              onClick={() => setCategory(item.id)}>
              {item.label} <span>({item.id === 'all' ? quizData.length : quizData.filter((question) => question.category === item.id).length})</span>
            </button>
          ))}
        </div>
        <div className='tests-filter-row'>
          <span className='tests-counter' aria-live='polite'>ნაპოვნია {filtered.length} კითხვა</span>
          <label className='tests-toggle'>
            <input type='checkbox' checked={onlyCorrect} onChange={(event) => setOnlyCorrect(event.target.checked)} />
            <span className='tests-toggle-track' aria-hidden='true' />
            <span>მხოლოდ სწორი პასუხები</span>
          </label>
        </div>
      </header>

      <div className='tests-feed'>
        {filtered.length === 0 ? (
          <div className='tests-empty'>
            <h2>კითხვა ვერ მოიძებნა</h2>
            <p>თქვენი საძიებო სიტყვით შესაბამისი შედეგი არ მოიძებნა. სცადეთ სხვა საკვანძო სიტყვა ან შეამოწმეთ არჩეული კატეგორია.</p>
            <button type='button' onClick={resetFilters}>ფილტრების განულება</button>
          </div>
        ) : filtered.map((item) => (
          <article className='tests-card' key={item.id}>
            <div className='tests-card-meta'>
              <span className={`tests-badge tests-badge-${item.category}`}>{item.categoryLabel}</span>
              <span className='tests-number'>კითხვა #{item.num}</span>
            </div>
            <h2>{item.question}</h2>
            <div className='tests-options'>
              {item.options.filter((option) => !onlyCorrect || item.correct.includes(option)).map((option, index) => {
                const correct = item.correct.includes(option)
                return (
                  <div className={`tests-option${correct ? ' tests-option-correct' : ''}`} key={`${index}-${option}`}>
                    <span className='tests-option-marker' aria-hidden='true'>{correct ? '✓' : ''}</span>
                    <span className='tests-option-text'>{option}</span>
                    {correct && <span className='tests-correct-label'>✓ სწორი პასუხი</span>}
                  </div>
                )
              })}
            </div>
          </article>
        ))}
      </div>
      <footer className='tests-footer'>
        <span>სრული საძიებო კითხვარი: შრომის უსაფრთხოება (30) • პერსონალურ მონაცემთა დაცვა (50) • ინფორმაციული უსაფრთხოება (70)</span>
        <span>სულ: {quizData.length} კითხვა</span>
      </footer>
      </div>
    </section>
  )
}

export default Tests
