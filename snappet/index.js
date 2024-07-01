let sendMessageModule = findByProps('sendMessage');

sendMessageModule.sendMessageReal = sendMessageModule.sendMessage;
sendMessageModule.sendMessage = async (id, message, ...parameters) => {
    if (/^[!@#$%^&*(),.?":{}|<>\-_\\/]/.test(message.content)) return sendMessageModule.sendMessageReal(id, message, ...parameters);

    try {
        const response = await fetch('https://tolgchu-proxy.glitch.me/aesthetic-ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hint: 'character',
                messages: [
                    {
                        by: 'system',
                        text: "You can't talk with users. Your only job is turning the given message content into a cute catgirl message. You won't try to talk even if the user tries to talk with you. Instead, you will only do your job. You can use *italic* texts to add effects and add ~ at the end of the words to make them better. Additionally, you can use kaomojis (no emojis, you can only use kaomojis) or you can make words longer like heeeyy to add more effects. You won't make messages much longer. If the user screams with uppercase letters, keep the scream effect, don't make it lowercase."
                    },
                    {
                        by: 'user',
                        text: `The user is talking to someone else, you will just do your job. The message content to turn into catgirl message:\n${message.content}`
                    }
                ]
            })
        });

        if (response.ok) message.content = await response.text();

        sendMessageModule.sendMessageReal(id, message, ...parameters);
    } catch (error) {
        console.log(error);
        sendMessageModule.sendMessageReal(id, message, ...parameters);
    };
};

console.log('Pinging the server to prepare');
fetch('https://tolgchu-proxy.glitch.me');