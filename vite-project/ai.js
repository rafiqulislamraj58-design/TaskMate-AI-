
const aisendBtn = document.getElementById('send-ai');
const aiUserInput = document.getElementById('ai-input');
const aiBox = document.getElementById('ai-message');
const myKey = import.meta.env.VITE_GROQ_KEY

async function loadAi(userText) {
    aiBox.innerHTML = `<i class="ri-robot-2-line text-[#2ecc71]"></i> <strong>AI:</strong> ভাবছি...`;

    try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${myKey}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                max_tokens: 300,
                messages: [
                    { role: "system", content: "তুমি একটি বাংলা AI assistant। সবসময় বাংলায় উত্তর দাও।" },
                    { role: "user", content: userText }
                ]
            })
        });

        const data = await res.json();

        if (data.choices && data.choices[0]) {
            aiBox.innerHTML = `<i class="ri-robot-2-line text-[#2ecc71]"></i> <strong>AI:</strong> ${data.choices[0].message.content}`;
        } else {
            console.error(data);
            aiBox.innerHTML = `<i class="ri-robot-2-line"></i> <strong>AI:</strong> উত্তর পাওয়া যায়নি।`;
        }

    } catch (error) {
        console.error("এরর:", error);
        aiBox.innerHTML = `<i class="ri-robot-2-line"></i> <strong>AI:</strong> নেটওয়ার্ক এরর!`;
    }
}

aisendBtn.addEventListener('click', function () {
    const text = aiUserInput.value.trim();
    if (!text) return alert("কিছু লিখুন আগে!");
    loadAi(text);
    aiUserInput.value = "";
});

aiUserInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') aisendBtn.click();
});