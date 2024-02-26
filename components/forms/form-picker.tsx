"use client";

import { defaultImages } from "@/constants/images";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { FormError } from "@/components/forms/form-error";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setIamges] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const imagesResult = result.response as Array<Record<string, any>>;
          setIamges(imagesResult);
        } else {
          toast.error("Failed to get images from unsplash");
        }
      } catch (error) {
        setIamges(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader className="h-6 w-6 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2 mx-3">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer rounded-md aspect-video relative group transition hover:opacity-75 bg-muted",
              pending && "cursor-auto hover:opacity-50 opacity-50"
            )}
            id={image.id}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.thumb}
              alt=""
              fill
              className="rounded-sm object-cover"
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 hidden md:block group-hover:opacity-100 h-[0.5rem] absolute bottom-0 pb-8 w-full text-[10px] truncate text-white hover:underline pl-[0.3rem] bg-black/50"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormError id="image" errors={errors} />
    </div>
  );
};
