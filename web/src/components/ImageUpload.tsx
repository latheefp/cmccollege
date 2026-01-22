'use client';

import { useState, useRef } from 'react';
import { ImageKitProvider, IKUpload } from 'imagekitio-next';
import { Loader2, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

const authenticator = async () => {
    try {
        const response = await fetch("/api/imagekit/auth");
        if (!response.ok) throw new Error('Authentication failed');
        return await response.json();
    } catch (error) {
        throw new Error(`Authentication request failed: ${error}`);
    }
};

interface ImageUploadProps {
    currentImage: string;
    onUploadComplete: (url: string) => void;
    folder?: string;
}

export default function ImageUpload({ currentImage, onUploadComplete, folder = '/general' }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const ikUploadRef = useRef<HTMLInputElement>(null);

    const onError = (err: any) => {
        console.error("Upload Error", err);
        setIsUploading(false);
        alert("Upload failed");
    };

    const onSuccess = (res: any) => {
        setIsUploading(false);
        onUploadComplete(res.url);
    };

    if (!publicKey || !urlEndpoint) return <div className="text-red-500 text-sm">Missing ImageKit Configuration</div>;

    return (
        <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
            <div className="space-y-4">
                <div
                    className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-colors cursor-pointer group ${currentImage ? 'border-emerald-500/50 bg-emerald-50/50' : 'border-zinc-300 hover:border-emerald-500 hover:bg-zinc-50'
                        }`}
                    onClick={() => ikUploadRef.current?.click()}
                >
                    <IKUpload
                        ref={ikUploadRef}
                        onError={onError}
                        onSuccess={onSuccess}
                        useUniqueFileName={true}
                        folder={folder}
                        className="hidden"
                        onUploadStart={() => setIsUploading(true)}
                    />

                    {isUploading ? (
                        <div className="py-8 flex flex-col items-center text-emerald-600">
                            <Loader2 className="w-8 h-8 animate-spin mb-2" />
                            <span className="text-sm font-medium">Uploading...</span>
                        </div>
                    ) : currentImage ? (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-zinc-100">
                            <Image src={currentImage} alt="Uploaded" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white font-medium flex items-center gap-2">
                                    <UploadCloud size={18} /> Change Image
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="py-8 flex flex-col items-center text-zinc-500 group-hover:text-emerald-600 transition-colors">
                            <div className="p-3 bg-zinc-100 rounded-full mb-3 group-hover:bg-emerald-100 transition-colors">
                                <UploadCloud className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-medium">Click to upload image</span>
                            <span className="text-xs text-zinc-400 mt-1">JPG, PNG, WEBP up to 5MB</span>
                        </div>
                    )}
                </div>
            </div>
        </ImageKitProvider>
    );
}
