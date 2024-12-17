'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"

interface LinkPreviewProps {
  url: string;
}

interface PreviewData {
  title: string;
  description: string;
  image: string;
}

export function LinkPreview({ url }: LinkPreviewProps) {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch preview data');
        }
        const data = await response.json();
        setPreviewData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching preview data:', err);
        setError('Failed to load preview');
        setLoading(false);
      }
    };

    fetchPreviewData();
  }, [url]);

  if (loading) {
    return <div className="text-muted-foreground">Loading preview...</div>;
  }

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }

  if (!previewData) {
    return null;
  }

  return (
    <Card className="mt-2 max-w-sm">
      <CardContent className="p-4">
        {previewData.image && (
          <img src={previewData.image} alt={previewData.title} className="w-full h-32 object-cover mb-2 rounded" />
        )}
        <h3 className="text-lg font-semibold mb-1">{previewData.title}</h3>
        <p className="text-sm text-muted-foreground">{previewData.description}</p>
      </CardContent>
    </Card>
  );
}

