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

ბუნებრივი დანაკარგების მაქსიმალური ზღვრული ნორმები (დანაკარგი წონიდან):
- ბენზინი, სეს ესნ კოდები 2710 12 110, 2710 12 410, 2710 12 450, 2710 12 490:
  საზღვაო გადაზიდვა 0.35%, სარკინიგზო 0.24%, საავტომობილო 0.12%,
  რეზერვუარში შენახვა 0.25%, მიწისზედა რეზერვუარში 1 თვეზე მეტი შენახვა 0.35%.
- ნედლი ნავთობი, კოდი 2709 00 900: სარკინიგზო 0.04%, შენახვა 0.077%.
- დიზელი, კოდები 2710 19 430, 2710 19 460, 2710 19 470, 2710 19 480:
  საზღვაო 0.35%, სარკინიგზო 0.1%, საავტომობილო 0.05%, რეზერვუარში შენახვა 0.07%.
- ნავთი, კოდები 2710 19 210, 2710 19 250:
  საზღვაო 0.35%, სარკინიგზო 0.11%, საავტომობილო 0.06%, რეზერვუარში შენახვა 0.1%.
- მაზუთი, კოდები 2710 19 620, 2710 19 660, 2710 19 670:
  სარკინიგზო 1.05%, შენახვა 0.97%.
- საპოხი ზეთი, კოდი 2710 19 990: სარკინიგზო 0.1%;
  კოდი 2710 19 710: სარკინიგზო 0.98%.
- ბენზოლი, კოდი 2902 20 000: სარკინიგზო 0.24%.
- ვაკუუმური გაზოილი, კოდები 2710 19 310, 2710 19 350:
  სარკინიგზო 0.60%, შენახვა 0.56%.
- ბუნებრივი აირის კონდენსატი, კოდი 2709 00 100: სარკინიგზო 0.75%.
- გათხევადებული ნავთობის აირები, კოდი 2711: სარკინიგზო 0.90%, შენახვა 1.10%.
- აციკლური ნახშირწყალბადები, კოდი 2901: სარკინიგზო 0.90%, შენახვა 1.10%.
- პროპილისა და იზოპროპილის სპირტი, კოდი 2905 12: სარკინიგზო 0.80%.
- მეთილის სპირტი, კოდი 2905 11: სარკინიგზო 0.15%.
- პარაქსილოლი, კოდი 2902 43: სარკინიგზო 0.30%.
- პიროლიზური ფისი, კოდი 3911 90 990: სარკინიგზო 1.00%.
- მეთილ-ტრეტ ბუტილეთინის ეთერი, კოდი 2909 19 90: სარკინიგზო 0.39%.

ბუნებრივი დანაკარგების კითხვებზე გამოიყენე ეს მონაცემები და პასუხში მიუთითე
შესაბამისი ოპერაცია, პროცენტი და საჭიროებისას სეს ესნ კოდი. მეტი ინფორმაციისთვის
მიუთითე /wastage. თუ მონაცემი ამ სიაში არ არის, არ გამოიგონო.

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
