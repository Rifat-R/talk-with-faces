# talk-with-faces
An express js web app that uses D-ID and OpenAI API's to be able to talk with certain figures. Using OpenAI's assistant feature.
<img width="1913" height="979" alt="image" src="https://github.com/user-attachments/assets/ba29fd70-3675-46ca-b2b6-1ad7c5f3fc5f" />

Used within a Texas museum expo to show the general public about the future of AI and re-creating old characters. Was a success!

## Setup

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root of the project and add the following environment variables:
    ```
    DID_API_KEY=your_d-id_api_key
    OPENAI_API_KEY=your_openai_api_key
    ASSISTANT_ID=your_openai_assistant_id
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```