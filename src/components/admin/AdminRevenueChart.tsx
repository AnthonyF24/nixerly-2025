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
  const chartInitialized = React.useRef(false);
  
  useEffect(() => {
    // Skip if chart already initialized and year hasn't changed
    if (chartInitialized.current && !year) return;
    
    const canvas = document.getElementById('revenueChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error("Revenue chart canvas not found");
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Could not get canvas context");
      return;
    }
    
    // Log canvas dimensions for debugging
    console.log("Canvas dimensions:", canvas.width, canvas.height);
    
    // Make sure the canvas has the correct dimensions initially
    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = canvas.parentElement?.clientHeight || 320;
    
    // Log updated dimensions
    console.log("Updated canvas dimensions:", canvas.width, canvas.height);
    
    // Define the chart drawing function first
    const drawChart = () => {
      // Reset context with new dimensions
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      
      // Basic dimensions
      const padding = 60;
      const chartWidth = width - padding * 2;
      const chartHeight = height - padding * 2;
      
      if (chartWidth <= 0 || chartHeight <= 0) {
        console.error("Chart dimensions too small:", chartWidth, chartHeight);
        return;
      }
      
      // Background
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, width, height);
      
      // Define colors for revenue sources
      const colors = {
        subscriptions: { fill: 'rgba(59, 130, 246, 0.7)', stroke: '#3b82f6' },
        jobPostings: { fill: 'rgba(139, 92, 246, 0.7)', stroke: '#8b5cf6' },
        featuredListings: { fill: 'rgba(249, 115, 22, 0.7)', stroke: '#f97316' },
        verifications: { fill: 'rgba(16, 185, 129, 0.7)', stroke: '#10b981' },
      };
      
      // Max value for scaling
      const maxValue = Math.max(...revenueData.totals) * 1.2;
      
      // Draw axes
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, padding + chartHeight);
      ctx.lineTo(padding + chartWidth, padding + chartHeight);
      ctx.stroke();
      
      // Draw bars
      const barWidth = Math.min(30, chartWidth / revenueData.months.length / 1.5);
      
      revenueData.months.forEach((month, index) => {
        // Skip if calculations would cause errors
        if (revenueData.months.length <= 1) return;
        
        // X position
        const x = padding + (index * chartWidth / (revenueData.months.length - 1));
        
        // Draw month label
        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(month, x, padding + chartHeight + 20);
        
        // Draw bar
        const totalHeight = (revenueData.totals[index] / maxValue) * chartHeight;
        const barX = x - barWidth/2;
        let barY = padding + chartHeight;
        
        // Draw bar segments for each revenue source
        Object.entries(revenueData.data).forEach(([source, values]) => {
          const value = values[index];
          const segmentHeight = (value / maxValue) * chartHeight;
          
          const color = colors[source as keyof typeof colors];
          
          // Draw segment
          ctx.fillStyle = color.fill;
          ctx.strokeStyle = color.stroke;
          ctx.lineWidth = 1;
          
          ctx.beginPath();
          ctx.rect(barX, barY - segmentHeight, barWidth, segmentHeight);
          ctx.fill();
          ctx.stroke();
          
          barY -= segmentHeight;
        });
        
        // Add value on top
        if (index % 2 === 0) {
          ctx.fillStyle = '#334155';
          ctx.textAlign = 'center';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText('€' + revenueData.totals[index].toLocaleString('en-IE'), x, barY - 8);
        }
      });
      
      // Draw legend
      ctx.textAlign = 'left';
      ctx.font = '12px sans-serif';
      let legendY = padding/2;
      
      Object.entries(colors).forEach(([source, color], i) => {
        const legendX = padding + 20 + (i * 150);
        
        // Draw color swatch
        ctx.fillStyle = color.fill;
        ctx.strokeStyle = color.stroke;
        ctx.beginPath();
        ctx.rect(legendX, legendY, 12, 12);
        ctx.fill();
        ctx.stroke();
        
        // Draw label
        ctx.fillStyle = '#334155';
        ctx.fillText(source.charAt(0).toUpperCase() + source.slice(1), legendX + 20, legendY + 10);
      });
    };
    
    // Set canvas dimensions to match container size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        drawChart();
      }
    };
    
    // Initial resize
    resizeCanvas();
    
    // Setup resize observer
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    
    // Make sure chart is visible in the DOM
    setTimeout(() => {
      resizeCanvas();
    }, 100);
    
    // Call the drawing function
    drawChart();
    
    // Mark chart as initialized
    chartInitialized.current = true;
    
    // Clean up on unmount
    return () => {
      // Only cleanup if canvas and context still exist
      if (canvas && canvas.parentElement) {
        try {
          resizeObserver.unobserve(canvas.parentElement);
          resizeObserver.disconnect();
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          console.log("Chart cleanup successful");
        } catch (error) {
          console.error("Error during chart cleanup:", error);
        }
      }
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
        <h3 className="text-lg font-semibold">Revenue Breakdown ({year})</h3>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-[100px]">
            <SelectValue>{year}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {revenueBreakdown.map(({ source, total, percentage }) => (
          <div key={source} className="flex flex-col rounded-md border p-3">
            <div className="text-sm text-muted-foreground mb-1 capitalize">{source}</div>
            <div className="text-xl md:text-2xl font-bold">€{total.toLocaleString('en-IE')}</div>
            <div className="mt-1 flex items-center">
              <Badge variant="outline" className="text-xs bg-muted/50">
                {percentage}% of revenue
              </Badge>
            </div>
          </div>
        ))}
      </div>
      
      <div className="w-full h-[300px] md:h-[350px] relative bg-white border border-gray-100 rounded-md p-2">
        <canvas id="revenueChart" className="w-full h-full block"></canvas>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-3 rounded-md bg-blue-50 border border-blue-100">
        <div className="text-blue-800 text-center sm:text-left w-full sm:w-auto">
          <div className="text-sm font-medium">Total annual revenue</div>
          <div className="text-xl md:text-2xl font-bold">€{totalRevenue.toLocaleString('en-IE')}</div>
        </div>
        <div className="text-blue-800 text-center sm:text-left w-full sm:w-auto">
          <div className="text-sm font-medium">Monthly average</div>
          <div className="text-xl md:text-2xl font-bold">€{(totalRevenue / 12).toFixed(0).toLocaleString('en-IE')}</div>
        </div>
        <div className="text-blue-800 text-center sm:text-left w-full sm:w-auto">
          <div className="text-sm font-medium">Year-over-year growth</div>
          <div className="text-xl md:text-2xl font-bold">+24.8%</div>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenueChart; 