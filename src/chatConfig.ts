export const CHAT_ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT as string | undefined;
export const CHAT_NOT_CONFIGURED_MESSAGE = 'Chatul nu este configurat. Lipsește endpoint-ul extern.';

export type ChatEndpointResponse = { reply?: string; message?: string; text?: string };

export const sendChatMessage = async (input: string) => {
  if (!CHAT_ENDPOINT) throw new Error(CHAT_NOT_CONFIGURED_MESSAGE);
  const response = await fetch(CHAT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: input })
  });
  if (!response.ok) throw new Error('Eroare la salvare');
  const data = await response.json() as ChatEndpointResponse;
  const reply = data.reply ?? data.message ?? data.text;
  if (!reply) throw new Error('Endpoint-ul de chat nu a returnat un răspuns valid.');
  return reply;
};
