import RandomWords from '@/components/RandomWords';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <RandomWords />
      
      {/* Optional central message */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center opacity-30 hover:opacity-80 transition-opacity duration-500">
          <h1 className="text-6xl font-bold text-foreground mb-4 animate-pulse">
            WORD UNIVERSE
          </h1>
          <p className="text-xl text-muted-foreground">
            Click any word to relocate it
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
