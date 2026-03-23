console.log('hello');


let userXP = 0;
let userDiamonds = 0;

const diamondDisplay = document.getElementById('diamond-count'); 
const xpDisplay = document.getElementById('xp-count');
const aiMessage = document.querySelector('.aibox');
const input = document.getElementById('task');
const container = document.querySelector('.container');
const btnCliked = document.getElementById('add');

btnCliked.addEventListener('click', function () {
    const inputText = input.value;
    if (inputText === "") return alert("আগে কিছু লিখুন!");
    aiMessage.style.display = 'none';

    let store = document.createElement('div');
    store.innerHTML = `<div class="card">${inputText} <input type="checkbox"> </div>`;
    
    const cardDiv = store.querySelector('.card');
    const chackbox = store.querySelector('input[type="checkbox"]');

    chackbox.addEventListener('change', function () {
        if (this.checked) {
            cardDiv.classList.add('checked');
            cardDiv.style.backgroundColor = "#2ecc71"; 
            userXP += 10;
            if (userXP >= 100) {
                userDiamonds += 1;
                userXP = 0;
                alert("অভিনন্দন! আপনি ১টি ডায়মন্ড পেয়েছেন!");
            }
            if (diamondDisplay) diamondDisplay.innerText = userDiamonds;
            if (xpDisplay) xpDisplay.innerText = userXP;
        } else {
            cardDiv.classList.remove('checked');
            cardDiv.style.backgroundColor = '#e74c3c'; 
        }
    });

    container.appendChild(store); 
    input.value = "";
});

container.addEventListener('dblclick', function(e) {
    if (e.target.classList.contains('card')) {
        e.target.parentElement.remove();
        if (container.children.length === 0) {
            aiMessage.style.display = 'block';
            aiMessage.querySelector('p').innerHTML = `<i class="ri-robot-2-line text-[#2ecc71]"></i> <strong>AI:</strong> আসসালামু আলাইকুম ভাই! আপনার সব কাজ শেষ।`;
        }
    }
});