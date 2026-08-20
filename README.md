# Members Only

Projeto simples de mensagens privadas (MemberOnly) que permite que utilizadores se registem, se tornem membros ou administradores e publiquem mensagens. Foi estilizado com Tailwind CSS e usa EJS para templates.

**Demo:** https://members-only-chi-eight.vercel.app/

**Tecnologias principais**
- **Node.js / Express:** backend e rotas ([app.js](app.js)).
- **PostgreSQL:** base de dados, acessada com `pg` (pool em [db/db.js](db/db.js)).
- **Passport (local):** autenticação (ver [app.js](app.js)).
- **EJS:** views em [views/](views/).
- **Tailwind CSS:** estilos customizados via [public/css/input.css](public/css/input.css) e `npm run build:css` para gerar `output.css`.
- **Remixicon:** ícones usados nas views (incluídos nas templates).

**Scripts úteis**
- **Install:**

	npm install

- **Build/Watch Tailwind (dev):**

	npm run build:css

- **Start (development):**

	npm run dev

- **Start (production):**

	npm start


**Variáveis de ambiente (.env)**
- `CONNECTION_STRING` — string de ligação ao Postgres (ex: `postgresql://user:pass@host:5432/dbname`).
- `SECRET` — segredo para `express-session`.
- `PORT` — porta opcional (padrão 3000).

Cria um ficheiro `.env` na raiz com essas variáveis antes de correr a app.

**Esquema da base de dados (exemplo)**
Execute estas instruções no seu Postgres para criar as tabelas usadas pela app:

-- users
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	username VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	is_member BOOLEAN DEFAULT FALSE,
	is_admin BOOLEAN DEFAULT FALSE
);

-- messages
CREATE TABLE messages (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	text TEXT NOT NULL,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

**Estrutura do projecto**
- **app.js**: ponto de entrada e configuração do Passport, sessões e rotas.
- **db/**: conexão e queries ([db/db.js](db/db.js), [db/queries.js](db/queries.js)).
- **routes/**: rotas express (ex.: [routes/signupRouter.js](routes/signupRouter.js), [routes/loginRouter.js](routes/loginRouter.js)).
- **views/**: templates EJS (partials: [views/header.ejs](views/header.ejs), [views/footer.ejs](views/footer.ejs)).
- **public/css/**: Tailwind `input.css` e o `output.css` gerado.

**Notas e dicas**
- A app usa `passport-local` com `bcryptjs` para hash de passwords — não guarde senhas em texto claro.
- Use `npm run build:css` em desenvolvimento para gerar `public/css/output.css` (o ficheiro é referenciado nas views).
- O layout está baseado em `min-h-screen flex flex-col` para que o `main` ocupe o espaço restante entre `header` e `footer`.
- Ícones usam Remixicon via CDN — se preferires, instala localmente.

Se quiseres, posso:
- adicionar um script `db:init` para aplicar as migrations automaticamente;
- preparar um `Procfile` ou instruções específicas para deploy na Vercel/Heroku;
- gerar um ficheiro `.env.example` com as variáveis necessárias.

---
Atualizado por automação para incluir instruções de arranque, demo e esquema da base de dados.