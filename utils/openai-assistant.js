
const THREAD_OPENAI_ENDPOINT = "https://api.openai.com/v1/threads/runs";


export async function fetchOpenAIAssistantResponse(userMessage, OPENAI_API_KEY, ASSISTANT_ID) {
    async function runThread() {
        const response = await fetch(THREAD_OPENAI_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
                'OpenAI-Beta': 'assistants=v1'
            },
            body: JSON.stringify({
                assistant_id: ASSISTANT_ID,
                thread: { messages: [{ "role": "user", "content": userMessage }] },
            }),
        });

        const data = await response.json();
        return data
    }

    async function getMessage(threadId) {
        const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
                'OpenAI-Beta': 'assistants=v1'
            },
        });

        return await response.json();
    }

    async function checkStatus(threadId, runId) {
        const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'OpenAI-Beta': 'assistants=v1'
            },
        });

        return await response.json();
    }


    const run = await runThread();
    await new Promise(resolve => setTimeout(resolve, 2000));
    const status = await checkStatus(run.thread_id, run.id)
    if (status.status === "completed") {
        const message = await getMessage(run.thread_id)
        return message.data[0].content[0].text.value.trim();
    }
    else {
        throw new Error(`OpenAI API request failed with status ${response.status}`);
    }

}
