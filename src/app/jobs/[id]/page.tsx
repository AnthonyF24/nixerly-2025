import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: {
    id: string;
  }
}

export default function JobDetailPage(props: PageProps) {
  const { params } = props;
  const id = params.id;
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/jobs" className="text-blue-600 hover:text-blue-800 flex items-center">
          ← Back to Jobs
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Job Detail #{id}</h1>
        <p className="mb-4">This is a placeholder for job details.</p>
        <Button asChild>
          <Link href="/dashboard">
            Go to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
} 