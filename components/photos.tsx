'use client';

import { Input } from '@/components/ui/input';
import { getImageUrls } from '@/app/actions';
import { useState } from 'react';
import Image from 'next/image';
import { image } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SubmitButton from './submit-button';
import { toast } from 'sonner';
import { Image as ImageIcon } from 'lucide-react';
import { amountOptions } from '@/app/(dashboard)/(routes)/image/constants';

export default function Photos() {
  const [photos, setPhotos] = useState<image[]>([]);
  const [amount, setAmount] = useState<string>('1');

  const generateThumbnail = async (formData: FormData) => {
    const result = await getImageUrls(formData);

    if (result) {
      let message =
        amount === '1' ? '🎉 Created new photo' : '🎉 Created new photos';

      toast(message);
      setPhotos(result.imageUrls);
    }
  };
  // const surprise = () => {
  //   setIdx((prev) => {
  //     setUserParts(examplePropmts[idx]);
  //     return prev === 6 ? 0 : prev + 1;
  //   });
  // };
  return (
    <div>
      <form className='space-y-3' action={generateThumbnail}>
        <section className='gap-x-4 flex items-center'>
          <article className='bg-rose-200 p-2 rounded-md'>
            <ImageIcon className='w-4 h-4 sm:w-5 sm:h-5 text-rose-700' />
          </article>
          <h1 className='text-primary/50 font-semibold text-sm'>
            Start with a detailed description
          </h1>
        </section>
        <Input
          name='prompt'
          id='prompt'
          type='text'
          placeholder='A centered explosion of colorful powder on a black background'
          className='focus-visible:ring-0'
          required
          autoFocus
        />
        <section className='flex items-start gap-x-5 justify-end'>
          <Select onValueChange={setAmount} value={amount} defaultValue='1'>
            <SelectTrigger className='w-[180px] focus:ring-0 focus:ring-offset-0'>
              <SelectValue defaultValue='1' placeholder='1 Photo' />
            </SelectTrigger>
            <SelectContent>
              {amountOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* <SubmitButton
            variant='premium'
            className='w-32'
            text='Generate'
            size='lg'
            
          /> */}
          <Input type='hidden' name='amount' id='amount' value={amount} />
        </section>
      </form>

      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
        {photos?.length
          ? photos.map((photo) => (
              <div
                key={photo.id}
                className='relative aspect-square rounded-lg overflow-hidden'
              >
                <Image
                  src={photo.image}
                  alt='Thumbnail'
                  fill
                  className='hover:opacity-80 hover:cursor-pointer transition'
                  onClick={() => window.open(photo.image)}
                />
              </div>
            ))
          : null}
      </section>
    </div>
  );
}
