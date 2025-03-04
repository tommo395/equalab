# EquaLab - Equation Management System

EquaLab is a modern web application designed to help students, educators, and science enthusiasts store, explore, and solve mathematical and scientific equations. With an elegant interface and powerful features, EquaLab makes equation management intuitive and accessible.

![EquaLab Demo](https://via.placeholder.com/800x400?text=EquaLab+Demo)

## ✨ Features

- **Equation Storage & Management**: Store equations with their LaTeX formulas, descriptions, variables, and metadata
- **Interactive Equation Solving**: Solve for any variable without manual rearrangement of formulas
- **Beautiful LaTeX Rendering**: View equations in proper mathematical notation
- **Fuzzy Search**: Quickly find equations by name, tags, or formula
- **Categorization & Tagging**: Organize equations by subject and tags
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Beautiful Animations**: Smooth transitions between pages and states
- **Forest Green Theme**: Professional aesthetic with monochrome base and forest green accents

## 🛠️ Technologies

- **Frontend**: React.js, Next.js, TypeScript
- **Styling**: Tailwind CSS
- **Equation Rendering**: KaTeX
- **Equation Solving**: Math.js
- **Search**: Fuse.js for fuzzy searching
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form

## 📋 Prerequisites

- Node.js (v22.12.0 or later)
- npm (v10.9.0 or later)

## 🚀 Getting Started

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/equalab.git
   cd equalab
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📖 Usage Guide

### Home Page

The home page displays all equations in your collection. You can:
- Search for equations using the search bar in the top navigation
- Filter equations by category or tag using the dropdown menus
- Add new equations with the "Add Equation" button

### Adding an Equation

1. Click the "Add Equation" button on the home page
2. Fill in the equation details:
   - **Name**: A descriptive name for the equation
   - **LaTeX Formula**: The equation in LaTeX format (e.g., `E = mc^2`)
   - **Description**: An explanation of what the equation represents
   - **Category**: The subject area (e.g., Physics, Mathematics)
   - **Tags**: Keywords to help with searching and filtering

3. Add variables:
   - **Symbol**: The variable symbol (e.g., `E`)
   - **Description**: What the variable represents (e.g., "Energy")
   - **Unit**: The unit of measurement (e.g., "Joules")
   - **Default Value** (optional): A standard value if applicable

4. Click "Add Equation" to save

### Viewing and Solving Equations

1. Click on any equation card to view its details
2. On the equation page:
   - View the complete equation information
   - See a list of all variables with their descriptions and units
   - Use the equation solver to calculate unknown variables
   
3. To solve an equation:
   - Select the variable you want to solve for in the dropdown
   - Enter values for all other variables
   - Click "Calculate" to see the result

## 📁 Project Structure

```
equalab/
├── src/
│   ├── app/                    # Next.js App Router Pages
│   │   ├── (pages)/            # Main application pages
│   │   ├── about/              # About page
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── equations/          # Equation-specific components
│   │   └── ui/                 # General UI components
│   ├── context/                # React context providers
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions and services
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
├── package.json                # Project dependencies
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🎨 Customization

### Styling

EquaLab uses Tailwind CSS for styling. You can customize the appearance by modifying:

- `tailwind.config.js`: Change colors, fonts, and other theme settings
- `src/app/globals.css`: Update global styles

### Adding Custom Features

To extend EquaLab with new features:

1. Create new components in the appropriate directories
2. Update the equation service in `src/lib/equation-service.ts` to handle new data requirements
3. Modify the context provider in `src/context/EquationContext.tsx` to expose new functionality

## 🔄 Connecting to a Database

The current version of EquaLab uses an in-memory store for equations. To connect to a database:

1. Create a database service in `src/lib/database-service.ts`
2. Implement CRUD operations that match the interface of the current equation service
3. Replace the in-memory functions in `equation-service.ts` with calls to your database service

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Developments

- User authentication and personal equation collections
- Equation sharing and collaboration features
- Advanced equation visualization with graphs
- Step-by-step solution explanations
- Mobile app version

## 🙏 Acknowledgements

- [KaTeX](https://katex.org/) for LaTeX rendering
- [Math.js](https://mathjs.org/) for mathematical operations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Fuse.js](https://fusejs.io/) for fuzzy search