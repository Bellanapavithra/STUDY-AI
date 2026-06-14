document.addEventListener('DOMContentLoaded', function() {
    const notesInput = document.getElementById('notesInput');
    const explainBtn = document.getElementById('explainBtn');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const quizBtn = document.getElementById('quizBtn');
    const flashcardsBtn = document.getElementById('flashcardsBtn');
    const outputContainer = document.getElementById('outputContainer');
    const loading = document.getElementById('loading');

    function simulateAIResponse(action, text) {
        // In a real app, this would be a fetch() to your backend AI API
        // This is a mock response for demonstration
        const responses = {
            explain: `<h3><i class="fas fa-lightbulb"></i> Simplified Explanation</h3>
                      <p>Here's a breakdown of the key concept in simpler terms:</p>
                      <ul>
                        <li><strong>Core Idea:</strong> ${text.substring(0, 80)}...</li>
                        <li><strong>In Plain English:</strong> Imagine you're explaining it to a 10-year-old. The main point is about understanding relationships between parts.</li>
                        <li><strong>Example:</strong> Think of it like baking a cake: you need ingredients (components) and steps (process) to get the final result.</li>
                        <li><strong>Why It Matters:</strong> This concept helps build a foundation for more advanced topics.</li>
                      </ul>`,
            summarize: `<h3><i class="fas fa-compress"></i> Summary</h3>
                       <p>Key points from your notes:</p>
                       <ol>
                         <li>First major point: ${text.substring(0, 60)}...</li>
                         <li>Second important concept: ${text.substring(60, 120)}...</li>
                         <li>Third takeaway: Relates to practical applications.</li>
                         <li>Final conclusion: Mastering this improves overall understanding.</li>
                       </ol>`,
            quiz: `<h3><i class="fas fa-question-circle"></i> Generated Quiz</h3>
                   <p>Test your knowledge with these questions:</p>
                   <div class="quiz-item">
                     <p><strong>1. What is the primary function described in the text?</strong></p>
                     <ul>
                       <li><button class="option">A) To analyze data</button></li>
                       <li><button class="option">B) To simplify complex ideas</button></li>
                       <li><button class="option">C) To generate code</button></li>
                       <li><button class="option">D) To visualize networks</button></li>
                     </ul>
                   </div>
                   <div class="quiz-item">
                     <p><strong>2. Which analogy was used in the explanation?</strong></p>
                     <ul>
                       <li><button class="option">A) Building a house</button></li>
                       <li><button class="option">B) Baking a cake</button></li>
                       <li><button class="option">C) Driving a car</button></li>
                       <li><button class="option">D) Planting a tree</button></li>
                     </ul>
                   </div>
                   <p><em>Click an option to see feedback. In a full version, this would be interactive with scoring.</em></p>`,
            flashcards: `<h3><i class="fas fa-layer-group"></i Flashcards</h3>
                        <p>Here are your study flashcards:</p>
                        <div class="flashcard-grid">
                          <div class="flashcard">
                            <div class="front"><strong>Term 1</strong></div>
                            <div class="back">Definition: ${text.substring(0, 40)}...</div>
                          </div>
                          <div class="flashcard">
                            <div class="front"><strong>Term 2</strong></div>
                            <div class="back">Definition: A key principle that guides the process.</div>
                          </div>
                          <div class="flashcard">
                            <div class="front"><strong>Term 3</strong></div>
                            <div class="back">Definition: The outcome when all components work together.</div>
                          </div>
                        </div>
                        <p><button id="exportBtn"><i class="fas fa-download"></i> Export as PDF/Anki</button></p>`
        };
        return responses[action] || `<p>Action not recognized. Please try again.</p>`;
    }

    function handleAction(action) {
        const text = notesInput.value.trim();
        if (!text) {
            outputContainer.innerHTML = `<p class="error"><i class="fas fa-exclamation-triangle"></i> Please paste or type some study material first.</p>`;
            return;
        }

        // Show loading
        loading.style.display = 'block';
        outputContainer.innerHTML = '';

        // Simulate API delay
        setTimeout(() => {
            const resultHTML = simulateAIResponse(action, text);
            outputContainer.innerHTML = resultHTML;
            loading.style.display = 'none';

            // Add interactivity to quiz options (demo only)
            if (action === 'quiz') {
                document.querySelectorAll('.option').forEach(btn => {
                    btn.addEventListener('click', function() {
                        this.style.backgroundColor = '#d4edda';
                        this.innerHTML += ' <i class="fas fa-check"></i>';
                    });
                });
            }

            // Add flip effect to flashcards (demo only)
            if (action === 'flashcards') {
                document.querySelectorAll('.flashcard').forEach(card => {
                    card.addEventListener('click', function() {
                        this.classList.toggle('flipped');
                    });
                });
            }
        }, 1200);
    }

    // Event listeners
    explainBtn.addEventListener('click', () => handleAction('explain'));
    summarizeBtn.addEventListener('click', () => handleAction('summarize'));
    quizBtn.addEventListener('click', () => handleAction('quiz'));
    flashcardsBtn.addEventListener('click', () => handleAction('flashcards'));

    // Pre-fill with sample text for demo
    notesInput.value = "Photosynthesis is the process used by plants, algae and certain bacteria to harness energy from sunlight and turn it into chemical energy. Here, we describe the general principles of photosynthesis and highlight how scientists are studying this natural process to help develop clean fuels and sources of renewable energy. There are two types of photosynthetic processes: oxygenic photosynthesis and anoxygenic photosynthesis. The general principles of anoxygenic and oxygenic photosynthesis are very similar, but oxygenic photosynthesis is the most common and is seen in plants, algae and cyanobacteria.";
});