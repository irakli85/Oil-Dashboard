export const VALID_CATEGORIES = ['exporters', 'declarants', 'goods']

export const DEFAULT_DROPDOWNS = {
  exporters: ['შპს ტრანს ლოჯისტიკი', 'შპს ჯორჯიან კარგო'],
  declarants: ['შპს გლობალ ფორვარდინგი', 'შპს ალიანს ლოჯისტიკი'],
  goods: ['ფეროშენადნობი', 'ცემენტი', 'მინერალური წყალი'],
}

export function createMemoryStore() {
  let nextId = 2
  const items = [
    {
      id: 1,
      exporter: 'შპს ტრანს ლოჯისტიკი',
      declarant: 'შპს გლობალ ფორვარდინგი',
      goods: 'ფეროშენადნობი',
      code: 'C-102938',
      regDate: '2026-09-21',
      declarationNum: '10293847',
      days: 30,
      expDate: '2026-10-21',
      weight: '24,500.00',
      status: 'active',
      shipName: '',
      departureDate: '',
      note: 'ტვირთი მზად არის საექსპორტო პროცედურისთვის',
    },
  ]
  const options = {
    exporters: [...DEFAULT_DROPDOWNS.exporters],
    declarants: [...DEFAULT_DROPDOWNS.declarants],
    goods: [...DEFAULT_DROPDOWNS.goods],
  }

  return {
    async getItems() {
      return items
    },
    async createItem(data) {
      const item = { id: nextId++, ...data }
      items.push(item)
      return item
    },
    async updateItem(id, patch) {
      const item = items.find((entry) => entry.id === Number(id))
      if (!item) return null
      Object.assign(item, patch)
      return item
    },
    async getOptions() {
      return options
    },
    async addOption(category, value) {
      if (!VALID_CATEGORIES.includes(category)) {
        const error = new Error('invalid_category')
        error.code = 'INVALID_CATEGORY'
        throw error
      }
      const trimmed = String(value || '').trim()
      if (!trimmed) {
        const error = new Error('empty_value')
        error.code = 'EMPTY_VALUE'
        throw error
      }
      if (!options[category].includes(trimmed)) {
        options[category].push(trimmed)
      }
      return options[category]
    },
    async removeOption(category, value) {
      if (!VALID_CATEGORIES.includes(category)) {
        const error = new Error('invalid_category')
        error.code = 'INVALID_CATEGORY'
        throw error
      }
      options[category] = options[category].filter((entry) => entry !== value)
      return options[category]
    },
  }
}
