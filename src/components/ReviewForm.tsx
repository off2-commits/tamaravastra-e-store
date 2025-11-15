import { useState } from 'react';
import { toast } from 'sonner';
import { Star, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from './StarRating';
import { addReview, verifyPurchaser } from '@/lib/reviews';

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted?: () => void;
}

export function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const [step, setStep] = useState<'verify' | 'review'>('verify');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState('');
  const [verifyPhone, setVerifyPhone] = useState('');
  const [verifyError, setVerifyError] = useState('');

  const [formData, setFormData] = useState({
    reviewerName: '',
    reviewerEmail: '',
    reviewerPhone: '',
    rating: 0,
    title: '',
    text: '',
    images: [] as string[]
  });

  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const handleVerify = () => {
    setVerifyError('');

    if (!verifyEmail && !verifyPhone) {
      setVerifyError('Please enter either email or phone number');
      return;
    }

    if (verifyEmail && !verifyEmail.includes('@')) {
      setVerifyError('Please enter a valid email');
      return;
    }

    if (!verifyPurchaser(verifyEmail, verifyPhone, productId)) {
      setVerifyError('No verified purchase found with this email or phone number');
      return;
    }

    setFormData(prev => ({
      ...prev,
      reviewerEmail: verifyEmail,
      reviewerPhone: verifyPhone
    }));
    setStep('review');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && imagePreview.length < 3) {
      Array.from(files).forEach((file) => {
        if (imagePreview.length < 3) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setImagePreview(prev => [...prev, event.target?.result as string]);
            setFormData(prev => ({
              ...prev,
              images: [...prev.images, event.target?.result as string]
            }));
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const removeImage = (index: number) => {
    setImagePreview(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyError('');

    if (!formData.reviewerName || !formData.rating || !formData.title || !formData.text) {
      setVerifyError('Please fill in all required fields');
      return;
    }

    if (formData.rating === 0) {
      setVerifyError('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      addReview({
        productId,
        reviewerName: formData.reviewerName,
        reviewerEmail: formData.reviewerEmail,
        reviewerPhone: formData.reviewerPhone,
        rating: formData.rating,
        title: formData.title,
        text: formData.text,
        images: formData.images,
        verified: true,
        orderId: ''
      });

      toast.success('Review submitted successfully!');
      setFormData({
        reviewerName: '',
        reviewerEmail: '',
        reviewerPhone: '',
        rating: 0,
        title: '',
        text: '',
        images: []
      });
      setImagePreview([]);
      setStep('verify');
      setVerifyEmail('');
      setVerifyPhone('');
      onReviewSubmitted?.();
    } catch (error) {
      setVerifyError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'verify') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Share Your Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Only verified purchasers can leave reviews. Please enter the email or phone number associated with your purchase.
            </p>

            {verifyError && (
              <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-lg text-sm text-destructive">
                {verifyError}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2">Email (from order)</label>
                <Input
                  type="email"
                  value={verifyEmail}
                  onChange={(e) => setVerifyEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>

              <p className="text-center text-xs text-muted-foreground">OR</p>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number (from order)</label>
                <Input
                  type="tel"
                  value={verifyPhone}
                  onChange={(e) => setVerifyPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <Button
              onClick={handleVerify}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Verify & Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Share Your Review</CardTitle>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setStep('verify')}
        >
          Back
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {verifyError && (
            <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-lg text-sm text-destructive">
              {verifyError}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Your Name *</label>
            <Input
              name="reviewerName"
              value={formData.reviewerName}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Rating *</label>
            <div className="flex gap-2">
              <StarRating
                rating={formData.rating}
                onRatingChange={(rating) =>
                  setFormData(prev => ({ ...prev, rating }))
                }
                interactive
                size="lg"
              />
              {formData.rating > 0 && (
                <span className="text-sm font-medium text-muted-foreground">
                  {formData.rating}/5
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Review Title *</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Brief summary of your review"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Review *</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="Share your experience with this product..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Add Photos (Optional, max 3)</label>
            {imagePreview.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {imagePreview.map((image, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-border">
                    <img src={image} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {imagePreview.length < 3 && (
              <label className="block border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-accent transition-smooth">
                <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload photo</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
