import { professionals } from '@/lib/data/professionals';
import ProfessionalCard from '@/components/cards/ProfessionalCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export default function ProfessionalsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Find Professionals</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Search by skill</label>
          <Input 
            className="w-full" 
            placeholder="e.g., Electrician, Plumbing, AutoCAD..." 
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <Input 
            className="w-full" 
            placeholder="e.g., Dublin, Cork, Galway..." 
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Availability</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Any availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any availability</SelectItem>
              <SelectItem value="available">Available now</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
              <SelectItem value="employed">Employed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end mb-6">
        <Button variant="default">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          Search
        </Button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div className="text-gray-600">
            Showing <span className="font-medium">{professionals.length}</span> professionals
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 text-sm">Sort by:</span>
            <Select defaultValue="experience">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="experience">Experience (High to Low)</SelectItem>
                <SelectItem value="rate">Hourly Rate (Low to High)</SelectItem>
                <SelectItem value="recent">Recently Updated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionals.map((professional) => (
          <ProfessionalCard 
            key={professional.id} 
            professional={professional} 
          />
        ))}
      </div>
      
      {/* For design purposes, this pagination is not functional */}
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center space-x-2">
          <Button variant="outline" size="icon" disabled>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="sr-only">Previous page</span>
          </Button>
          <Button variant="outline" size="sm" className="relative">1</Button>
          <Button variant="outline" size="sm" className="relative">2</Button>
          <Button variant="outline" size="sm" className="relative">3</Button>
          <span className="text-gray-400">...</span>
          <Button variant="outline" size="sm" className="relative">8</Button>
          <Button variant="outline" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="sr-only">Next page</span>
          </Button>
        </nav>
      </div>
    </div>
  );
} 