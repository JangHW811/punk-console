import { BarChart3, Clock, FileText, TrendingUp } from "lucide-react";
import FeatureCard from "./FeatureCard";

const Welcome = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-10 relative">
      <div className="max-w-2xl w-full text-center space-y-8 z-10">
        <div className="space-y-4 animate-fade-in-up">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Welcome to <span className="text-indigo-600">PunkConsole</span>
          </h2>
          <p className="text-lg text-gray-500">
            AI와 대화하며 데이터를 분석하고 인사이트를 발견하세요.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          <FeatureCard
            icon={BarChart3}
            label="스마트 차트"
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <FeatureCard
            icon={TrendingUp}
            label="관계 그래프"
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <FeatureCard
            icon={Clock}
            label="시계열 분석"
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <FeatureCard
            icon={FileText}
            label="자동 리포트"
            bgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
