
import { Metadata } from 'next';
import { ToolLayout } from '@/components/tool-layout';
import { ImageToBase64 } from '@/components/tools/image-to-base64';
import { getToolById } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'Image to Base64 Converter - Encode Images Online',
  description: 'Convert images to Base64 encoded strings for embedding in code. Support for JPG, PNG, GIF, WebP, and SVG formats.',
  keywords: ['image to base64', 'base64 encoder', 'image encoder', 'data url', 'embed image'],
};

export default function ImageToBase64Page() {
  const tool = getToolById('image-to-base64')!;

  return (
    <ToolLayout tool={tool}>
      <ImageToBase64 />
    </ToolLayout>
  );
}
