import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from 'lucide-react';

type DashboardStatProps = {
  title: string;
  value: number;
  icon: LucideIcon;
  progressValue?: number;
  progressLabel?: string;
  progressValueLabel?: string;
  iconColorClass?: string;
  progressColorClass?: string;
  progressIndicatorClass?: string;
};

const DashboardStat = ({
  title,
  value,
  icon: Icon,
  progressValue = 0,
  progressLabel = 'Progress',
  progressValueLabel,
  iconColorClass = 'bg-blue-100 text-blue-700',
  progressColorClass = 'bg-blue-100',
  progressIndicatorClass = 'bg-blue-600'
}: DashboardStatProps) => {
  return (
    <Card className="border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all bg-white/70">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-3xl font-bold mt-1">
              {title === "Revenue" ? `€${value.toLocaleString('en-IE')}` : value}
            </h3>
          </div>
          <div className={`p-2 ${iconColorClass} rounded-lg`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {(progressValue !== undefined && progressValue > 0) && (
          <div className="mt-4">
            <div className="text-xs flex justify-between font-medium text-muted-foreground mb-1">
              <span>{progressLabel}</span>
              <span className="text-blue-700">{progressValueLabel || `${progressValue}%`}</span>
            </div>
            <Progress 
              value={progressValue} 
              className={`h-1.5 ${progressColorClass}`} 
              indicatorClassName={progressIndicatorClass} 
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardStat; 