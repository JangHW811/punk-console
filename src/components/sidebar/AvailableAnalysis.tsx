import { analysisCategories } from "@/data/analysisCategories";
import AnalysisCategoryItem from "./AnalysisCategoryItem";

const AvailableAnalysis = () => {
  return (
    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3 h-full overflow-auto">
      <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">
        Available Analysis
      </div>
      <div className="space-y-2">
        {analysisCategories.map((category) => (
          <AnalysisCategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default AvailableAnalysis;
