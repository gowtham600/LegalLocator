import ResultCard from "./ResultCard";
import { ProviderWithDistance } from "@shared/schema";

interface ResultsListProps {
  providers: ProviderWithDistance[];
  count: number;
  radius: number;
}

export default function ResultsList({ providers, count, radius }: ResultsListProps) {
  return (
    <section className="max-w-4xl mx-auto mb-8">
      <div className="mb-6">
        <h3 className="text-xl font-medium">Top Legal Service Providers Near You</h3>
        <p className="text-muted-foreground">
          {count} providers found within {radius}km of your location
        </p>
      </div>

      <div className="space-y-6">
        {providers.map((provider, index) => (
          <ResultCard 
            key={provider.provider.id} 
            provider={provider} 
            rank={index + 1} 
          />
        ))}
      </div>
    </section>
  );
}
