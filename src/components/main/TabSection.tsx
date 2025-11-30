import { BarChart3, TrendingUp } from "lucide-react";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const TabSection = () => {
  return (
    <section className="flex-1 flex flex-col min-w-0 px-4 py-12">
      <Tabs defaultValue="eda1">
        <TabsList>
          <TabsTrigger value="eda1">
            <BarChart3 className="size-4 text-blue-600" />
            <span>EDA: 탐색적 데이터 분석</span>
            <span className="ml-1 flex items-center gap-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-gray-600">
                5
              </span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="trend">
            <TrendingUp className="size-4" />
            <span>트렌드 분석</span>
            <span className="ml-1 flex items-center gap-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                2
              </span>
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="eda1" className="mt-6">
          <Label>EDA: 탐색적 데이터 분석 콘텐츠</Label>
        </TabsContent>
        <TabsContent value="trend" className="mt-6">
          <Label>트렌드 분석 콘텐츠</Label>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default TabSection;
