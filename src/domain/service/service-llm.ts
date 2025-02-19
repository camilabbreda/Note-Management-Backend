import { iNote } from '../../common/interface/entity-note';
import { AppException } from '../../common/error/app-exception';
import { Ollama } from 'ollama';

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';
const MODEL_NAME = process.env.LLM_MODEL_NAME || 'smollm2:latest';

export default class ServiceLLM {
  static async generateTitle(noteContent: string): Promise<iNote> {
    if (!noteContent) {
      throw new AppException('Note content is required.', 400);
    }

    const messages = await this.createMessagesPrompt(noteContent);

    try {
      const ollama = new Ollama({ host: OLLAMA_HOST });

      const response = await ollama.chat({
        model: MODEL_NAME,
        messages,
        keep_alive: 0,
      });

      if (response.message && response.message.content) {
        const generatedTitle = response.message.content;
        return {
          title: generatedTitle.trim().replace(/^"|"$/g, ''),
          content: noteContent,
        };
      } else {
        throw new AppException('Failed to get the title.', 404);
      }
    } catch (error) {
      throw new AppException(`Failed to generate title: ${error}`, 500);
    }
  }

  static async createMessagesPrompt(noteContent: string): Promise<any[]> {
    if (!noteContent) {
      throw new AppException('Note content is required.', 400);
    }

    const systemMessage = {
      role: 'system',
      content:
        'You are an AI language model designed to suggest a brief and concise title for user notes.\
        Your only response should be the suggested title, without the word title,  with 3 or 4 words maximum and without any additional commentary or explanation or thoughts. For each user message forget what was said before',
    };

    const userMessage = {
      role: 'user',
      content: `Please suggest a concise and small title for this note: ${noteContent}`,
    };

    return [systemMessage, userMessage];
  }
}
