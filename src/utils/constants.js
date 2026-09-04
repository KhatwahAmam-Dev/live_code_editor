export const TEMPLATE_LIBRARY = [
  {
    name: 'Todo App',
    description: 'Simple todo list dengan JavaScript',
    category: 'JavaScript',
    language: 'javascript',
    icon: '✅',
    content: `// Todo List App
const app = document.getElementById('app');

let todos = [];

function render() {
  app.innerHTML = \`
    <h2>📋 Todo List</h2>
    <div style="display:flex;gap:8px;margin-bottom:12px;">
      <input id="todo-input" placeholder="Add todo..." style="flex:1;padding:8px;border:1px solid #ddd;border-radius:4px;">
      <button id="add-btn" style="padding:8px 16px;background:#0e639c;color:white;border:none;border-radius:4px;cursor:pointer;">Add</button>
    </div>
    <ul style="list-style:none;padding:0;">
      \${todos.map((todo, i) => \`
        <li style="padding:8px;margin-bottom:4px;background:#f5f5f5;border-radius:4px;display:flex;justify-content:space-between;align-items:center;">
          <span style="\${todo.done ? 'text-decoration:line-through;color:#888;' : ''}">\${todo.text}</span>
          <div style="display:flex;gap:8px;">
            <button onclick="toggleTodo(\${i})" style="background:#4caf50;color:white;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;">✓</button>
            <button onclick="deleteTodo(\${i})" style="background:#f44336;color:white;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;">✕</button>
          </div>
        </li>
      \`).join('')}
    </ul>
    <p style="color:#888;font-size:12px;margin-top:8px;">\${todos.filter(t => !t.done).length} remaining</p>
  \`;

  document.getElementById('add-btn')?.addEventListener('click', () => {
    const input = document.getElementById('todo-input');
    if (input.value.trim()) {
      todos.push({ text: input.value, done: false });
      input.value = '';
      render();
    }
  });

  document.getElementById('todo-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('add-btn')?.click();
    }
  });
}

window.toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  render();
};

window.deleteTodo = (index) => {
  todos.splice(index, 1);
  render();
};

render();`
  },
  {
    name: 'Responsive Card',
    description: 'Card UI dengan CSS Grid',
    category: 'CSS',
    language: 'css',
    icon: '🎴',
    content: `/* Responsive Card Grid */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f0f2f5;
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #1a1a2e;
  margin-bottom: 30px;
  font-weight: 300;
  font-size: 2.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.07);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.12);
}

.card .icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.card h3 {
  color: #1a1a2e;
  margin-bottom: 8px;
  font-size: 1.2rem;
}

.card p {
  color: #6b7280;
  line-height: 1.6;
  font-size: 0.95rem;
}

.card .badge {
  display: inline-block;
  margin-top: 12px;
  padding: 4px 12px;
  background: #eef2ff;
  color: #4f46e5;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}`
  },
  {
    name: 'Clock Widget',
    description: 'Digital clock dengan JavaScript',
    category: 'JavaScript',
    language: 'javascript',
    icon: '🕐',
    content: `// Digital Clock
const app = document.getElementById('app');

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const date = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  app.innerHTML = \`
    <div style="text-align:center;padding:20px;font-family:'Courier New',monospace;">
      <div style="font-size:64px;font-weight:bold;color:#0e639c;letter-spacing:4px;">
        \${hours}:\${minutes}:\${seconds}
      </div>
      <div style="font-size:18px;color:#666;margin-top:12px;letter-spacing:2px;">
        \${date}
      </div>
      <div style="margin-top:20px;color:#888;font-size:14px;">
        ⏰ Live Clock
      </div>
    </div>
  \`;
}

updateClock();
setInterval(updateClock, 1000);`
  },
  {
    name: 'Basic HTML Page',
    description: 'Starter HTML dengan struktur lengkap',
    category: 'HTML',
    language: 'html',
    icon: '📄',
    content: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    h1 { color: #0e639c; margin-bottom: 20px; }
    p { margin-bottom: 16px; }
    .card {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #0e639c;
    }
  </style>
</head>
<body>
  <h1>🚀 Hello World!</h1>
  <p>Ini adalah halaman HTML dasar. Edit kode di editor untuk melihat perubahan.</p>
  <div class="card">
    <h3>💡 Tips</h3>
    <p>Kamu bisa menambahkan CSS, JavaScript, atau konten apapun di sini.</p>
  </div>
</body>
</html>`
  },
  {
    name: 'Python Hello',
    description: 'Python dasar dengan print',
    category: 'Python',
    language: 'python',
    icon: '🐍',
    content: `# Python Hello World
print("Hello World!")

# Variables
name = "Developer"
age = 25

# List
fruits = ["Apel", "Pisang", "Jeruk"]
print(f"Buah-buahan: {fruits}")

# Dictionary
person = {
    "name": name,
    "age": age,
    "skills": ["Python", "JavaScript", "CSS"]
}
print(f"Person: {person}")

# Loop
for i in range(5):
    print(f"Loop ke-{i+1}")

# Function
def greet(name):
    return f"Halo, {name}!"

print(greet("Mas Bro"))`
  },
  {
    name: 'Button Animasi',
    description: 'CSS animation untuk button',
    category: 'CSS',
    language: 'css',
    icon: '✨',
    content: `/* Button Animations */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #1a1a2e;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  gap: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 32px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  color: white;
}

/* Button 1 - Pulse */
.btn-pulse {
  background: #4f46e5;
}

.btn-pulse:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(79, 70, 229, 0.4);
}

.btn-pulse:active {
  transform: scale(0.95);
}

/* Button 2 - Slide */
.btn-slide {
  background: #0e639c;
  z-index: 1;
}

.btn-slide::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
  z-index: -1;
}

.btn-slide:hover::after {
  left: 100%;
}

/* Button 3 - Glow */
.btn-glow {
  background: #dc2626;
}

.btn-glow:hover {
  box-shadow: 0 0 30px rgba(220, 38, 38, 0.6);
  transform: translateY(-2px);
}

/* Button 4 - Border */
.btn-border {
  background: transparent;
  border: 2px solid #22c55e;
  color: #22c55e;
}

.btn-border:hover {
  background: #22c55e;
  color: white;
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
}

.container {
  text-align: center;
  color: white;
}

.container h2 {
  margin-bottom: 20px;
  font-weight: 300;
}

.btn-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}`
  }
];
