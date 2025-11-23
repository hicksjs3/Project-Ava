# Ava - AI Sales Command Center

Automated Virtual Agent (Ava) is Sensor Tech's internal AI Sales Command Center built with Next.js, Tailwind CSS, Supabase, and Lucide React.

## Brand Identity

### Color Palette (Deep Ocean Dark Mode)
- **Background**: Dark Navy `#0F0E28` - Main canvas
- **Surface/Cards**: Deep Blue `#203F8D` - Component background
- **Primary Action**: Teal Green `#3AAC95` - Buttons, Active States, "Ava is talking"
- **Text**: Pure White `#FFFFFF`
- **Alerts**: Red `#C71F46` - Failed calls

### Typography
- **Headers**: Garet (fallback: Montserrat) - Bold, geometric
- **Data/Metrics**: DIN Next Condensed (fallback: Oswald) - Sensor Spec Sheet aesthetic
- **Body/Transcripts**: Verdana (fallback: Open Sans) - High readability

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Add your Supabase credentials
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app              # Next.js app router pages
/components       # Reusable React components
  /ui            # UI components (Button, Card, Layout, etc.)
/lib             # Utilities and configurations
  supabase.ts    # Supabase client setup
```

## Responsive Design

- **Mobile-First**: All views start as a single vertical stack
- **Adaptive**: Sidebar collapses to bottom nav on mobile
- **Reflexive**: Layouts expand to grids on tablet/desktop

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Supabase** - Backend and database
- **Lucide React** - Icon library
