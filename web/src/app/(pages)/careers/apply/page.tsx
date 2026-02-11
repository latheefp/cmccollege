"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, UploadCloud, CheckCircle, ChevronRight, ChevronLeft, Briefcase, User, Phone, Mail, FileText, Camera } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function CareerApplication() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [uploadPreview, setUploadPreview] = useState<string | null>(null);
    const [cvPreview, setCvPreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        applyingPosition: "",
        qualification: "",
        experience: "",
        resume: null as File | null,
        cv: null as File | null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const cvInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                toast.error("Please upload only JPG, PNG, or WEBP images.");
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                toast.error("File size must be less than 2MB.");
                return;
            }
            setFormData((prev) => ({ ...prev, resume: file }));
            setUploadPreview(URL.createObjectURL(file));
        }
    };

    const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                toast.error("Please upload only JPG, PNG, or WEBP images for CV.");
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                toast.error("CV File size must be less than 2MB.");
                return;
            }
            setFormData((prev) => ({ ...prev, cv: file }));
            setCvPreview(URL.createObjectURL(file));
        }
    };

    const validateStep1 = () => {
        if (!formData.fullName || !formData.email || !formData.phone || !formData.applyingPosition) {
            toast.error("Please fill in all required fields.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (!formData.resume) {
            toast.error("Please upload your passport size photo.");
            return false;
        }
        if (!formData.cv) {
            toast.error("Please upload your CV (Image format).");
            return false;
        }
        return true;
    };

    const nextStep = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        }
    };

    const prevStep = () => {
        setStep(1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep2()) return;

        setLoading(true);

        const submissionData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) submissionData.append(key, value);
        });

        try {
            const response = await fetch("/api/career", {
                method: "POST",
                body: submissionData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success("Application Submitted Successfully!");

                // Construct WhatsApp message
                const whatsappMessage = `*New Career ApplicationNotification*\n\n*Name:* ${formData.fullName}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Position:* ${formData.applyingPosition}\n*Qualification:* ${formData.qualification || 'N/A'}\n*Experience:* ${formData.experience || 'N/A'} years`;
                const encodedMessage = encodeURIComponent(whatsappMessage);
                const whatsappUrl = `https://wa.me/916282592895?text=${encodedMessage}`;

                // Open WhatsApp in a new tab
                window.open(whatsappUrl, '_blank');

                // Reset form
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    applyingPosition: "",
                    qualification: "",
                    experience: "",
                    resume: null,
                    cv: null,
                });
                setUploadPreview(null);
                setCvPreview(null);
                setStep(1);
            } else {
                toast.error(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit application. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 pt-[140px] pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-2 font-agency uppercase">Join Our Team</h1>
                    <p className="text-zinc-600">Shape the future of education with CM College</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
                    {/* Progress Bar */}
                    <div className="h-2 bg-emerald-50 w-full">
                        <motion.div
                            className="h-full bg-emerald-600"
                            initial={{ width: "50%" }}
                            animate={{ width: step === 1 ? "50%" : "100%" }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">1</div>
                                            <h2 className="text-xl font-semibold text-zinc-900">Personal Information</h2>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-zinc-700 mb-1">Full Name *</label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                                                    <input
                                                        type="text"
                                                        name="fullName"
                                                        value={formData.fullName}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-200 text-black focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden transition-all placeholder:text-zinc-400"
                                                        placeholder="Name"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-zinc-700 mb-1">Email Address *</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                            className="w-full pl-10 pr-4 py-3 text-black rounded-lg border border-zinc-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden transition-all placeholder:text-zinc-400"
                                                            placeholder="john@example.com"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-zinc-700 mb-1">Phone Number *</label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleInputChange}
                                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-200 text-black focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden transition-all placeholder:text-zinc-400"
                                                            placeholder="+91 9876543210"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-zinc-700 mb-1">Position Applying For *</label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                                                    <select
                                                        name="applyingPosition"
                                                        value={formData.applyingPosition}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-zinc-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden transition-all bg-white text-zinc-800"
                                                    >
                                                        <option value="">Select a Position</option>
                                                        <option value="Assistant Professor">Assistant Professor</option>
                                                        <option value="Lab Assistant">Lab Assistant</option>
                                                        <option value="Administrative Staff">Administrative Staff</option>
                                                        <option value="Guest Lecturer">Guest Lecturer</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                className="flex items-center gap-2 px-6 py-3 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition-colors font-medium"
                                            >
                                                Next Step <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">2</div>
                                            <h2 className="text-xl font-semibold text-zinc-900">Professional Details</h2>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-zinc-700 mb-1">Highest Qualification</label>
                                                <div className="relative">
                                                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-700 w-5 h-5" />
                                                    <input
                                                        type="text"
                                                        name="qualification"
                                                        value={formData.qualification}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-10 pr-4 py-3 rounded-lg border text-zinc-700 placeholder:text-zinc-500 border-zinc-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden transition-all"
                                                        placeholder="e.g , Ph.D. in Computer Science"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-zinc-700 mb-1">Experience (Years)</label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-900 w-5 h-5" />
                                                    <input
                                                        type="number"
                                                        name="experience"
                                                        value={formData.experience}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-10 pr-4 py-3 text-zinc-900 rounded-lg border border-zinc-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-hidden transition-all placeholder:text-zinc-400"
                                                        placeholder="e.g , 5 Years"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-zinc-700 mb-2">
                                                    Passport Size Photo * <span className="text-zinc-400 font-normal">(Image only, max 2MB)</span>
                                                </label>

                                                <div
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${uploadPreview ? 'border-emerald-500 bg-emerald-50' : 'border-zinc-300 hover:border-emerald-500 hover:bg-zinc-50'
                                                        }`}
                                                >
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        accept="image/jpeg,image/png,image/webp"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                    />

                                                    {uploadPreview ? (
                                                        <div className="space-y-3 flex flex-col items-center">
                                                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                                                                <Image src={uploadPreview} alt="Preview" fill className="object-cover" />
                                                            </div>
                                                            <div className="flex items-center gap-2 text-emerald-700 font-medium">
                                                                <CheckCircle className="w-4 h-4" /> Photo Selected
                                                            </div>
                                                            <p className="text-xs text-zinc-500">Click to change</p>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center space-y-2">
                                                            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                                                                <Camera className="w-6 h-6" />
                                                            </div>
                                                            <p className="text-emerald-900 font-medium">Click to upload photo</p>
                                                            <p className="text-xs text-zinc-500">JPG, PNG, WEBP (Max 2MB)</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-zinc-700 mb-2">
                                                    Upload CV * <span className="text-zinc-400 font-normal">(Image only, max 2MB)</span>
                                                </label>

                                                <div
                                                    onClick={() => cvInputRef.current?.click()}
                                                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${cvPreview ? 'border-emerald-500 bg-emerald-50' : 'border-zinc-300 hover:border-emerald-500 hover:bg-zinc-50'
                                                        }`}
                                                >
                                                    <input
                                                        ref={cvInputRef}
                                                        type="file"
                                                        accept="image/jpeg,image/png,image/webp"
                                                        className="hidden"
                                                        onChange={handleCvChange}
                                                    />

                                                    {cvPreview ? (
                                                        <div className="space-y-3 flex flex-col items-center">
                                                            <div className="relative w-full max-w-[200px] h-32 rounded-lg overflow-hidden border-4 border-white shadow-md">
                                                                <Image src={cvPreview} alt="CV Preview" fill className="object-cover" />
                                                            </div>
                                                            <div className="flex items-center gap-2 text-emerald-700 font-medium">
                                                                <CheckCircle className="w-4 h-4" /> CV Selected
                                                            </div>
                                                            <p className="text-xs text-zinc-500">Click to change</p>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center space-y-2">
                                                            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                                                                <FileText className="w-6 h-6" />
                                                            </div>
                                                            <p className="text-emerald-900 font-medium">Click to upload CV</p>
                                                            <p className="text-xs text-zinc-500">JPG, PNG, WEBP (Max 2MB)</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-4">
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="flex items-center gap-2 px-6 py-3 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors font-medium"
                                            >
                                                <ChevronLeft className="w-4 h-4" /> Back
                                            </button>

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className={`flex items-center gap-2 px-8 py-3 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition-all font-medium shadow-lg hover:shadow-xl active:scale-95 hover:cursor-pointer disabled:opacity-70 disabled:pointer-events-none`}
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                                                    </>
                                                ) : (
                                                    <>Submit Application</>
                                                )}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
