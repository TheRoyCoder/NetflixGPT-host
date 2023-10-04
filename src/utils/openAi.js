import OpenAI from "openai";
const OPENAI_KEY = process.env.REACT_APP_openAI_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: false,
});

export default openai;
