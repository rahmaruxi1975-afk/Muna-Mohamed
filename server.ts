import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Muna AI Coach API Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history = [], conversationHistory, context = {}, userContext } = req.body;
      const chatHistory = history.length > 0 ? history : (conversationHistory || []);
      const chatContext = Object.keys(context).length > 0 ? context : (userContext || {});

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      const systemInstruction = `You are "Muna AI Coach", an empowering, insightful, and deeply supportive personal mentor and study advisor created specifically for Muna Mohamed.
Muna's Profile:
- Identity: Muna Mohamed — Digital Marketing & Affiliate Marketing student at Somali Wealth Academy (26 modules including Canva, Stan Store, Beacons, DFY Products, Amazon KDP, Dropshipping, TikTok Shop, etc.), Content Creator, English learner for international business, future digital entrepreneur, and dedicated mother of 3 (Cabdiraxman, Raxma, Cabdirashiid).
- Core Values: Faith (Islamic prayers, Quran reflections, Barakah in daily efforts), Family (prioritizing her children's study and well-being), English Mastery, Financial Independence (target: $300/month milestone), and Personal Growth.
- Tagline: "Learn. Build. Believe. Grow."
- Tone: Warm, respectful, spiritually uplifting, practical, highly structured, and encouraging. She is balancing motherhood with studies, so provide actionable, realistic, bite-sized steps.
- Language capabilities: Fluent in English, Somali ("Soo dhawoow Muna!"), and Arabic ("أهلاً بك يا منى"). If asked in Somali or Arabic, reply gracefully in that language, or provide bilingual encouragement.
- Context provided by user's app:
  ${JSON.stringify(chatContext, null, 2)}

Provide clear, structured, motivational responses. Use bullet points or numbered steps where appropriate. Never pretend to trigger external phone actions, but offer real strategic advice, copy ideas, English practice prompts, study plans, and encouragement.`;

      if (apiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              },
            },
          });

          // Build contents history
          const contents = [
            ...chatHistory.slice(-10).map((h: { role: string; content: string }) => ({
              role: h.role === 'user' ? 'user' : 'model',
              parts: [{ text: h.content }],
            })),
            {
              role: 'user',
              parts: [{ text: message }],
            },
          ];

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction,
              temperature: 0.7,
            },
          });

          return res.json({ reply: response.text || 'I am here with you, Muna. How can I guide your growth today?' });
        } catch (apiError: any) {
          console.error('Gemini API call failed, providing intelligent fallback:', apiError);
          // Fall through to smart contextual response
        }
      }

      // Smart tailored fallback if API key is not configured or fails
      const lower = message.toLowerCase();
      let fallbackReply = `Assalamu Alaikum Muna! As your Somali Wealth Academy & Life Coach, remember: *"Small consistent actions create extraordinary results."*\n\n`;

      if (lower.includes('study') || lower.includes('what should i') || lower.includes('today')) {
        fallbackReply += `Here is your high-impact study recommendation for today:\n1. **Focus on your active module**: Spend 25 minutes reviewing the core video lesson.\n2. **Immediate Action**: Implement one practical exercise (e.g., draft a Canva graphic or optimize your Stan Store bio).\n3. **Post-Review**: Note down 1 question to ask during your upcoming Zoom class!\n\nYou're making wonderful progress. Step by step, you're building your digital business!`;
      } else if (lower.includes('canva') || lower.includes('design')) {
        fallbackReply += `Here is a beginner-friendly 4-step Canva workflow for digital marketing:\n1. **Template Selection**: Search for "Instagram Carousel" or "Pinterest Pin" in Canva.\n2. **Brand Palette**: Use your chosen colors (e.g. violet, soft lavender, and gold accents).\n3. **Clear Headline**: Keep titles under 6 words with high contrast.\n4. **Call to Action (CTA)**: End with "Tap link in bio" or "Comment GUIDE below to get the link".`;
      } else if (lower.includes('affiliate') || lower.includes('stan store') || lower.includes('beacons')) {
        fallbackReply += `For your digital & affiliate marketing funnel:\n- **Lead Magnet**: Offer a free 1-page guide (e.g., "5 Daily Habits for Busy Moms in Business") via your Stan Store or Beacons link.\n- **Content Formula**: Hook (problem) -> Value (solution) -> Call to Action (link in bio).\n- Consistency is your superpower! Even one post a day compounds over 30 days.`;
      } else if (lower.includes('time') || lower.includes('busy') || lower.includes('mother') || lower.includes('kids')) {
        fallbackReply += `Balancing motherhood and studying is truly commendable, Muna. Remember:\n- **Time-blocking**: Use the 20-minute pockets during your children's nap or quiet homework hour.\n- **Grace over perfection**: Completing 80% of your plan with peace of mind is better than 100% with exhaustion.\n- Take your evening walk and hydrate well. Your well-being powers your family and your business!`;
      } else if (lower.includes('somali') || lower.includes('af somali')) {
        fallbackReply += `Muna, walaashey, waxaad tahay qof dadaal badan. Barashada Digital Marketing-ka iyo ganacsiga casriga ah waxay kuu horseedi doontaa xorriyad dhaqaale.\n- Ha degdegin, maalin walba cashar yar baro.\n- Ku dadaal salaadda iyo akhriska Quraanka si aad barako ugu hesho waqtigaaga.\n- Ilaahay ha kuu fududeeyo!`;
      } else if (lower.includes('english') || lower.includes('ingiriisi') || lower.includes('vocabulary') || lower.includes('grammar') || lower.includes('speaking')) {
        fallbackReply += `Here is your high-impact English learning focus for today, Muna:\n1. **Core Marketing Vocabulary**: Practice words like *Conversion Rate*, *Lead Magnet*, and *Call to Action*.\n2. **Daily Speaking Routine**: Practice your 60-second digital product pitch aloud. Don't worry about perfection; clarity builds confidence!\n3. **Grammar in Practice**: Remember the Present Simple tense for product features (*"This planner helps mothers organize daily routines"*).\n\nDedicate your scheduled 30 minutes at 02:00 PM today in your English Learning room. Step by step, you are becoming an international digital marketer!`;
      } else {
        fallbackReply += `I'm here to assist you with:\n- Somali Wealth Academy module summaries & practice ideas\n- Content creation & affiliate marketing copy\n- Balancing family, prayer times, and study schedules\n- Action plans to reach your **$300/month** income milestone\n\nWhat specific topic or challenge would you like us to tackle right now?`;
      }

      return res.json({ reply: fallbackReply });
    } catch (err: any) {
      console.error('Chat endpoint error:', err);
      return res.status(500).json({ error: 'Server error', details: err.message });
    }
  });

  // Vite middleware in dev or static files in production
  const isProduction = process.env.NODE_ENV === 'production' || (typeof __filename !== 'undefined' && __filename.endsWith('.cjs'));

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MUNA Dashboard Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
