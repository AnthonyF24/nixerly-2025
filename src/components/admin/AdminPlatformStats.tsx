"use client";

import React, { useState } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DownloadIcon, LineChart } from "lucide-react";

// Generate random data for charts
const generateData = (months = 12, base = 100, growth = 10, variance = 0.2) => {
  const data = [];
  let currentValue = base;
  
  for (let i = 0; i < months; i++) {
    // Random variance between -20% and +20% from the trend line
    const randomFactor = 1 + (Math.random() * variance * 2 - variance);
    // Apply growth trend plus random variance
    currentValue = currentValue * (1 + growth / 100) * randomFactor;
    data.push(Math.round(currentValue));
  }
  
  return data;
};

// Generate labels for the x-axis (last 12 months)
const generateMonthLabels = () => {
  const months = [];
  const date = new Date();
  for (let i = 11; i >= 0; i--) {
    const month = new Date(date.getFullYear(), date.getMonth() - i, 1);
    months.push(month.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
  }
  return months;
};

// Generate mock data for different metrics
const mockChartData = {
  users: generateData(12, 100, 8, 0.1),
  jobs: generateData(12, 50, 12, 0.2),
  professionals: generateData(12, 70, 5, 0.15),
  businesses: generateData(12, 30, 7, 0.1),
  revenue: generateData(12, 5000, 15, 0.2),
  sessions: generateData(12, 2000, 10, 0.3),
};

// Month labels for the x-axis
const monthLabels = generateMonthLabels();

const AdminPlatformStats = () => {
  const [timeRange, setTimeRange] = useState("year");
  const [activeTab, setActiveTab] = useState("users");
  
  // Function to get filtered data based on time range
  const getFilteredData = (data: number[]) => {
    switch (timeRange) {
      case "month":
        return data.slice(-1); // Last month only
      case "quarter":
        return data.slice(-3); // Last 3 months
      case "all":
        return data; // All data
      case "year":
      default:
        return data; // Last 12 months (default)
    }
  };
  
  // Function to get filtered labels based on time range
  const getFilteredLabels = () => {
    switch (timeRange) {
      case "month":
        return monthLabels.slice(-1); // Last month only
      case "quarter":
        return monthLabels.slice(-3); // Last 3 months
      case "all":
        return monthLabels; // All months
      case "year":
      default:
        return monthLabels; // Last 12 months (default)
    }
  };

  // Function to draw the chart
  const drawChart = (ctx: HTMLCanvasElement) => {
    if (!ctx) return;
    
    const canvas = ctx.getContext('2d');
    if (!canvas) return;
    
    const width = ctx.width;
    const height = ctx.height;
    const padding = 60; // Increased padding for more space
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Clear canvas
    canvas.clearRect(0, 0, width, height);
    
    // Draw grid lines
    canvas.strokeStyle = '#e5e7eb';
    canvas.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + chartHeight - (i * chartHeight / 5);
      canvas.beginPath();
      canvas.moveTo(padding, y);
      canvas.lineTo(padding + chartWidth, y);
      canvas.stroke();
    }
    
    // Get data for the current tab and filter by time range
    const fullData = mockChartData[activeTab as keyof typeof mockChartData];
    const data = getFilteredData(fullData);
    const labels = getFilteredLabels();
    
    const maxValue = Math.max(...data) * 1.1; // Add 10% headroom
    
    // Draw axes
    canvas.strokeStyle = '#94a3b8';
    canvas.lineWidth = 2;
    canvas.beginPath();
    canvas.moveTo(padding, padding);
    canvas.lineTo(padding, padding + chartHeight);
    canvas.lineTo(padding + chartWidth, padding + chartHeight);
    canvas.stroke();
    
    // Draw data line
    canvas.strokeStyle = '#3b82f6';
    canvas.lineWidth = 3;
    canvas.beginPath();
    
    // Draw data points and line
    data.forEach((value, index) => {
      const x = padding + index * (chartWidth / (data.length - 1 || 1)); // Prevent division by zero
      const y = padding + chartHeight - (value / maxValue * chartHeight);
      
      if (index === 0) {
        canvas.moveTo(x, y);
      } else {
        canvas.lineTo(x, y);
      }
    });
    canvas.stroke();
    
    // Draw fill
    canvas.fillStyle = 'rgba(59, 130, 246, 0.1)';
    canvas.beginPath();
    data.forEach((value, index) => {
      const x = padding + index * (chartWidth / (data.length - 1 || 1)); // Prevent division by zero
      const y = padding + chartHeight - (value / maxValue * chartHeight);
      
      if (index === 0) {
        canvas.moveTo(x, y);
      } else {
        canvas.lineTo(x, y);
      }
    });
    canvas.lineTo(padding + chartWidth, padding + chartHeight);
    canvas.lineTo(padding, padding + chartHeight);
    canvas.closePath();
    canvas.fill();
    
    // Draw data points
    canvas.fillStyle = '#ffffff';
    canvas.strokeStyle = '#3b82f6';
    canvas.lineWidth = 2;
    
    data.forEach((value, index) => {
      const x = padding + index * (chartWidth / (data.length - 1 || 1)); // Prevent division by zero
      const y = padding + chartHeight - (value / maxValue * chartHeight);
      
      canvas.beginPath();
      canvas.arc(x, y, 5, 0, Math.PI * 2);
      canvas.fill();
      canvas.stroke();
    });
    
    // Draw x-axis labels
    canvas.fillStyle = '#64748b';
    canvas.font = '12px sans-serif';
    canvas.textAlign = 'center';
    
    labels.forEach((month, index) => {
      const x = padding + index * (chartWidth / (labels.length - 1 || 1)); // Prevent division by zero
      const y = padding + chartHeight + 20;
      canvas.fillText(month, x, y);
    });
    
    // Draw y-axis labels and value indicators for the data points
    canvas.textAlign = 'right';
    
    for (let i = 0; i <= 5; i++) {
      const value = Math.round(maxValue * i / 5);
      const y = padding + chartHeight - (i * chartHeight / 5);
      canvas.fillText(value.toLocaleString(), padding - 10, y + 5);
    }
    
    // Draw data values above points
    canvas.fillStyle = '#1e40af';
    canvas.textAlign = 'center';
    
    data.forEach((value, index) => {
      const x = padding + index * (chartWidth / (data.length - 1 || 1)); // Prevent division by zero
      const y = padding + chartHeight - (value / maxValue * chartHeight);
      
      // Only show alternate values to avoid crowding or all if only a few points
      if (data.length <= 3 || index % 2 === 0) {
        canvas.fillText(value.toLocaleString(), x, y - 15);
      }
    });
  };
  
  React.useEffect(() => {
    const ctx = document.getElementById('statsChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    // Set canvas dimensions to match container size
    const resizeCanvas = () => {
      const container = ctx.parentElement;
      if (container) {
        ctx.width = container.clientWidth;
        ctx.height = container.clientHeight;
        drawChart(ctx);
      }
    };
    
    // Initial sizing
    resizeCanvas();
    
    // Setup resize observer
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    if (ctx.parentElement) {
      resizeObserver.observe(ctx.parentElement);
    }
    
    // Clean up on unmount
    return () => {
      if (ctx.parentElement) {
        resizeObserver.unobserve(ctx.parentElement);
      }
      resizeObserver.disconnect();
    };
  }, [activeTab, timeRange]);

  // Format the percentage change
  const getPercentageChange = () => {
    // Get appropriate data based on time range
    const fullData = mockChartData[activeTab as keyof typeof mockChartData];
    const data = getFilteredData(fullData);
    
    if (data.length < 2) return "0.0"; // Prevent errors if not enough data
    
    const lastValue = data[data.length - 1];
    const previousValue = data[data.length - 2];
    const percentChange = ((lastValue - previousValue) / previousValue) * 100;
    
    return percentChange.toFixed(1);
  };
  
  // Get appropriate title for the chart
  const getChartTitle = () => {
    switch (activeTab) {
      case "users":
        return "User Growth";
      case "jobs":
        return "Job Postings";
      case "professionals":
        return "Professional Accounts";
      case "businesses":
        return "Business Accounts";
      case "revenue":
        return "Revenue (€)";
      case "sessions":
        return "Platform Sessions";
      default:
        return "Platform Data";
    }
  };
  
  const percentChange = getPercentageChange();
  const isPositive = parseFloat(percentChange) >= 0;
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap w-full gap-1">
            <TabsTrigger value="users" className="flex-1 min-w-[80px]">Users</TabsTrigger>
            <TabsTrigger value="jobs" className="flex-1 min-w-[80px]">Jobs</TabsTrigger>
            <TabsTrigger value="professionals" className="flex-1 min-w-[120px]">Professionals</TabsTrigger>
            <TabsTrigger value="businesses" className="flex-1 min-w-[120px]">Businesses</TabsTrigger>
            <TabsTrigger value="revenue" className="flex-1 min-w-[80px]">Revenue</TabsTrigger>
            <TabsTrigger value="sessions" className="flex-1 min-w-[80px]">Sessions</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue>
                {timeRange === "month" ? "Last Month" : 
                 timeRange === "quarter" ? "Last Quarter" : 
                 timeRange === "year" ? "Last Year" : "All Time"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h3 className="text-lg font-medium">{getChartTitle()}</h3>
              <p className="text-sm text-muted-foreground">
                {timeRange === "year" ? "Last 12 months" : timeRange === "quarter" ? "Last 3 months" : timeRange === "month" ? "Last 30 days" : "All time"}
              </p>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <span className="text-2xl font-bold">
                  {isPositive ? '+' : ''}{percentChange}%
                </span>
                <span className="text-sm ml-2">vs prev. period</span>
              </div>
            </div>
          </div>
          
          <div className="w-full h-80">
            <canvas id="statsChart" width="800" height="320" className="w-full h-full"></canvas>
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center p-3 border rounded-md bg-muted/20">
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground">Total</div>
                <div className="text-xl font-bold mt-1">
                  {activeTab === "revenue" ? "€" : ""}
                  {getFilteredData(mockChartData[activeTab as keyof typeof mockChartData])
                    .slice(-1)[0].toLocaleString('en-IE')}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center p-3 border rounded-md bg-muted/20">
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground">Average</div>
                <div className="text-xl font-bold mt-1">
                  {activeTab === "revenue" ? "€" : ""}
                  {Math.round(getFilteredData(mockChartData[activeTab as keyof typeof mockChartData])
                    .reduce((sum, val) => sum + val, 0) / 
                    getFilteredData(mockChartData[activeTab as keyof typeof mockChartData]).length)
                    .toLocaleString('en-IE')}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center p-3 border rounded-md bg-muted/20">
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground">Highest</div>
                <div className="text-xl font-bold mt-1">
                  {activeTab === "revenue" ? "€" : ""}
                  {Math.max(...getFilteredData(mockChartData[activeTab as keyof typeof mockChartData]))
                    .toLocaleString('en-IE')}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center p-3 border rounded-md bg-muted/20">
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground">Growth Rate</div>
                <div className="text-xl font-bold mt-1">
                  {(() => {
                    const filteredData = getFilteredData(mockChartData[activeTab as keyof typeof mockChartData]);
                    if (filteredData.length < 2) return "N/A";
                    
                    return (((filteredData[filteredData.length - 1] - 
                             filteredData[0]) / 
                             filteredData[0]) * 100).toFixed(1) + "%";
                  })()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPlatformStats; 