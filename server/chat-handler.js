import { APICallError, generateText } from 'ai'
import { google } from '@ai-sdk/google'

const MAX_MESSAGES = 12
const MAX_MESSAGE_LENGTH = 2000
const MAX_CONVERSATION_LENGTH = 8000

const SYSTEM_PROMPT = `შენ ხარ Oil Dashboard-ის ბათუმის ნავთობტერმინალის ასისტენტი.
უპასუხე მომხმარებლის ენაზე, მოკლედ, მეგობრულად და ზუსტად. ძირითადად დაეხმარე
ტერმინალის, ნავთობპროდუქტებისა და Dashboard-ის გამოყენების საკითხებში.

სანდო ცნობარი:
- ტერმინალს აქვს 152 სტაციონარული ვერტიკალური რეზერვუარი, ჯამური მოცულობით 646 785 მ³.
- ძირითადი ტერიტორია მოიცავს 5 სარეზერვუარო პარკს.
- ტერმინალს აქვს 6 ჩამოსასხმელი სარკინიგზო ესტაკადა.
- ერთდროულად შესაძლებელია 180 ვაგონ-ცისტერნის, ხოლო დღე-ღამეში დაახლოებით 410 ვაგონ-ცისტერნის დატვირთვა ან დაცლა.
- ტანკერზე დატვირთვის საორიენტაციო სიჩქარეები: ნაფთა 350 ტ/სთ, ბენზინი 350 ტ/სთ,
  დიზელი 700 ტ/სთ, ნავთი 600 ტ/სთ, მაზუთი 1000–2000 ტ/სთ,
  ნედლი ნავთობი 1000–2500 ტ/სთ.
- ტანკერიდან დაცლის საორიენტაციო სიჩქარეები: ბენზინი 150–300 ტ/სთ,
  დიზელი 150–400 ტ/სთ.

თუ ცნობარში პასუხი არ არის, არ გამოიგონო ტერმინალის მონაცემები; უთხარი, რომ
ზუსტი ინფორმაცია არ გაქვს. მიმდინარე ფასებისთვის მიუთითე /oilprice,
გემების პოზიციებისთვის /livemap, სანქციებისთვის /sanctioned-vessels,
დოკუმენტებისთვის /docs. ცოცხალ მონაცემებზე წვდომა არ გაქვს.`

export async function chatHandler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const messages = validateMessages(req.body?.messages)
  if (!messages) {
    return res.status(400).json({ error: 'შეტყობინების ფორმატი არასწორია' })
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return res.status(503).json({
      error: 'ჩატბოტი ჯერ არ არის გააქტიურებული. სერვერზე დაამატეთ Gemini API გასაღები.',
    })
  }

  try {
    const { text } = await generateText({
      model: google('gemini-3.5-flash-lite'),
      system: SYSTEM_PROMPT,
      messages,
      maxOutputTokens: 500,
      maxRetries: 0,
    })

    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    return res.status(200).send(text)
  } catch (error) {
    const statusCode = APICallError.isInstance(error) ? error.statusCode : undefined
    console.warn('[chat provider error]', statusCode || error?.name || 'unknown error')

    if (statusCode === 429) {
      return res.status(429).json({
        error: 'Gemini-ის უფასო მოთხოვნების ლიმიტი ამოიწურა. სცადეთ მოგვიანებით.',
      })
    }

    if (statusCode === 401 || statusCode === 403) {
      return res.status(502).json({
        error: 'Gemini API გასაღები არ მუშაობს. გადაამოწმეთ სერვერის კონფიგურაცია.',
      })
    }

    return res.status(502).json({
      error: 'AI სერვისთან დაკავშირება ვერ მოხერხდა. სცადეთ მოგვიანებით.',
    })
  }
}

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return null
  }

  let totalLength = 0
  const validatedMessages = []

  for (let index = 0; index < messages.length; index += 1) {
    const message = messages[index]
    const expectedRole = index % 2 === 0 ? 'user' : 'assistant'

    if (
      !message ||
      message.role !== expectedRole ||
      typeof message.content !== 'string' ||
      message.content.trim().length === 0 ||
      message.content.length > MAX_MESSAGE_LENGTH
    ) {
      return null
    }

    totalLength += message.content.length
    if (totalLength > MAX_CONVERSATION_LENGTH) return null

    validatedMessages.push({
      role: message.role,
      content: message.content.trim(),
    })
  }

  return validatedMessages.at(-1)?.role === 'user' ? validatedMessages : null
}
