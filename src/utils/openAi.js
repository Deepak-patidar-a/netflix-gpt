import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
   dangerouslyAllowBrowser: true // This is the default and can be omitted
});
export default client;