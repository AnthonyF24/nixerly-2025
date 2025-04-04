"use client";

import React, { useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Generate mock revenue data
const generateRevenueData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const yearlyData = {
    subscriptions: months.map(() => Math.floor(Math.random() * 6000) + 3000),
    jobPostings: months.map(() => Math.floor(Math.random() * 4000) + 1000),
    featuredListings: months.map(() => Math.floor(Math.random() * 2000) + 500),
    verifications: months.map(() => Math.floor(Math.random() * 1500) + 200),
  };
  
  // Calculate totals for each month
  const totalsByMonth = months.map((_, index) => {
    return Object.values(yearlyData).reduce((sum, source) => sum + source[index], 0);
  });
  
  return { months, data: yearlyData, totals: totalsByMonth };
};

const revenueData = generateRevenueData();

const AdminRevenueChart = () => {
  const [year, setYear] = React.useState("2024");
  
  useEffect(() => {
    const canvas = document.getElementById('revenueChart') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const drawChart = () => {
      const width = canvas.width;
      const height = canvas.height;
      const padding = 40;
      const chartWidth = width - padding * 2;
      const chartHeight = height - padding * 2;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Define colors for revenue sources
      const colors = {
        subscriptions: { fill: 'rgba(59, 130, 246, 0.7)', stroke: '#3b82f6' },
        jobPostings: { fill: 'rgba(139, 92, 246, 0.7)', stroke: '#8b5cf6' },
        featuredListings: { fill: 'rgba(249, 115, 22, 0.7)', stroke: '#f97316' },
        verifications: { fill: 'rgba(16, 185, 129, 0.7)', stroke: '#10b981' },
      };
      
      // Find max value for scaling
      const maxValue = Math.max(...revenueData.totals) * 1.1; // Add 10% headroom
      
      // Draw grid lines
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight - (i * chartHeight / 5));
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(padding + chartWidth, y);
        ctx.stroke();
      }
      
      // Draw axes
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, padding + chartHeight);
      ctx.lineTo(padding + chartWidth, padding + chartHeight);
      ctx.stroke();
      
      // Draw x-axis labels (months)
      ctx.fillStyle = '#64748b';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      
      revenueData.months.forEach((month, index) => {
        const x = padding + index * (chartWidth / (revenueData.months.length - 1));
        const y = padding + chartHeight + 20;
        ctx.fillText(month, x, y);
      });
      
      // Draw y-axis labels (revenue values)
      ctx.textAlign = 'right';
      
      for (let i = 0; i <= 5; i++) {
        const value = Math.round(maxValue * i / 5);
        const y = padding + chartHeight - (i * chartHeight / 5);
        ctx.fillText('$' + value.toLocaleString(), padding - 10, y + 5);
      }
      
      // Draw stacked bar chart
      const barWidth = chartWidth / revenueData.months.length / 1.5; // Slightly narrower than spacing
      
      revenueData.months.forEach((_, monthIndex) => {
        let y = padding + chartHeight; // Start from the bottom
        const centerX = padding + monthIndex * (chartWidth / (revenueData.months.length - 1));
        const x = centerX - barWidth / 2;
        
        // Draw each revenue source as a segment of the bar
        Object.entries(revenueData.data).forEach(([source, values]) => {
          const value = values[monthIndex];
          const height = (value / maxValue) * chartHeight;
          
          // Source-specific color
          const color = colors[source as keyof typeof colors];
          
          // Draw bar segment
          ctx.fillStyle = color.fill;
          ctx.strokeStyle = color.stroke;
          ctx.lineWidth = 1;
          
          ctx.beginPath();
          ctx.rect(x, y - height, barWidth, height);
          ctx.fill();
          ctx.stroke();
          
          // Move up for the next segment
          y -= height;
        });
        
        // Add total revenue text at the top of each bar
        const totalRevenue = revenueData.totals[monthIndex];
        ctx.fillStyle = '#334155';
        ctx.textAlign = 'center';
        ctx.font = 'bold 12px sans-serif';
        
        // Only add totals on even months to avoid overcrowding
        if (monthIndex % 2 === 0) {
          ctx.fillText('$' + totalRevenue.toLocaleString(), centerX, y - 10);
        }
      });
      
      // Draw legend
      const legendY = 20;
      let legendX = width - 200;
      const legendItemWidth = 120;
      const legendItemHeight = 20;
      
      Object.entries(colors).forEach(([source, color], index) => {
        // Draw colored rectangle
        ctx.fillStyle = color.fill;
        ctx.strokeStyle = color.stroke;
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.rect(legendX, legendY, 16, 16);
        ctx.fill();
        ctx.stroke();
        
        // Draw source label
        ctx.fillStyle = '#334155';
        ctx.textAlign = 'left';
        ctx.font = '12px sans-serif';
        ctx.fillText(source.charAt(0).toUpperCase() + source.slice(1), legendX + 22, legendY + 12);
        
        // Move to next legend item
        legendX += legendItemWidth;
        
        // Wrap to next line if needed
        if ((index + 1) % 2 === 0) {
          legendX = width - 200;
          legendY += legendItemHeight;
        }
      });
    };
    
    // Call the drawing function
    drawChart();
    
    // Clean up on unmount
    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [year]);
  
  // Calculate total revenue
  const totalRevenue = revenueData.totals.reduce((sum, month) => sum + month, 0);
  
  // Calculate revenue breakdown percentages
  const revenueBreakdown = Object.entries(revenueData.data).map(([source, values]) => {
    const total = values.reduce((sum, value) => sum + value, 0);
    const percentage = (total / totalRevenue * 100).toFixed(1);
    return { source, total, percentage };
  }).sort((a, b) => b.total - a.total);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Revenue Breakdown</h3>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {revenueBreakdown.map(({ source, total, percentage }) => (
          <div key={source} className="flex flex-col rounded-md border p-3">
            <div className="text-sm text-muted-foreground mb-1 capitalize">{source}</div>
            <div className="text-2xl font-bold">${total.toLocaleString()}</div>
            <div className="mt-1 flex items-center">
              <Badge variant="outline" className="text-xs bg-muted/50">
                {percentage}% of revenue
              </Badge>
            </div>
          </div>
        ))}
      </div>
      
      <div className="h-72 w-full">
        <canvas id="revenueChart" width="800" height="288" className="w-full h-full"></canvas>
      </div>
      
      <div className="flex justify-between items-center p-3 rounded-md bg-blue-50 border border-blue-100">
        <div className="text-blue-800">
          <div className="text-sm font-medium">Total annual revenue</div>
          <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
        </div>
        <div className="text-blue-800">
          <div className="text-sm font-medium">Monthly average</div>
          <div className="text-2xl font-bold">${(totalRevenue / 12).toFixed(0).toLocaleString()}</div>
        </div>
        <div className="text-blue-800">
          <div className="text-sm font-medium">Year-over-year growth</div>
          <div className="text-2xl font-bold">+24.8%</div>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenueChart; 